import * as vscode from 'vscode';
import * as config from './config';

let cfg: config.Config;

function int2hex(i: number, width: number = 2): string {
    let ret = i.toString(16);
    if (ret.length < width) {
        ret = '0'.repeat(width - ret.length) + ret;
    }
    return ret.substring(0, width);
}

function rgba2gray(r: number, g: number, b: number, a: number): number {
    let gray = r*0.3 + g*0.59 + b*0.11;
    return gray * a/255.0;
}
function gray2rgba(gray: number): [number,number,number,number] {
    return [gray, gray, gray, 255];
}

function line2colorinfos(lineno: number, text: string, cfg: config.Config): vscode.ColorInformation[] {
    let ret:vscode.ColorInformation[] = [];

    for (let i = 0; i < cfg.detectors.length; i++) {
        // match detector
        const detector = cfg.detectors[i];
        const re = cfg.detectRegexs[i];
        for (const match of text.matchAll(re)) {
            // take color components
            let [rs,gs,bs,as,ws] = ["","","","",""];
            let mi = 1;
            for (let j = 0; j < detector.length; j++) {
                switch (detector[j]) {
                    case 'R':
                        rs += match[mi++]||'';
                        break;
                    case 'G':
                        gs += match[mi++]||'';
                        break;
                    case 'B':
                        bs += match[mi++]||'';
                        break;
                    case 'A':
                        as += match[mi++]||'';
                        break;
                    case 'W':
                        ws += match[mi++]||'';
                        break;
                }
            }
            // calculate color components
            let [r,g,b,a,w] = [0,0,0,255,0];
            if (rs) { r = +("0x" + (rs+rs+'0').substring(0,2)); }
            if (gs) { g = +("0x" + (gs+gs+'0').substring(0,2)); }
            if (bs) { b = +("0x" + (bs+bs+'0').substring(0,2)); }
            if (as) { a = +("0x" + (as+as+'0').substring(0,2)); }
            if (ws) { w = +("0x" + (ws+ws+'0').substring(0,2)); }
            // assemble
            // config.debug(`[${detector}] ${match[0]} => ${r},${g},${b},${a},${w} [${rs}/${gs}/${bs}/${as}/${ws}]`);
            if (w) {// grayscale conquer others
                [r,b,g,a] = gray2rgba(w);
            }
            let from = match.index||0;
            ret.push(new vscode.ColorInformation(
                new vscode.Range(lineno, from, lineno, from + match[0].length),
                new vscode.Color(r/255.0, g/255.0, b/255.0, a/255.0)
            ));
        }
    }

    return ret;
}

function vscolor2str(color: vscode.Color, text: string, cfg: config.Config): string|null {
    const [ri, gi, bi, ai] = [color.red*255, color.green*255, color.blue*255, color.alpha*255];
    const wi = rgba2gray(ri,gi,bi,ai);
    let [rs, gs, bs, as, ws] = [int2hex(ri), int2hex(gi), int2hex(bi), int2hex(ai), int2hex(wi)];
    let insert = cfg.insert;

    if (!insert) {// let's guess ...
        for (let i = 0; i < cfg.detectors.length; i++) {
            const re = cfg.insertRegexs[i];
            if (text.match(re)) {
                insert = cfg.detectors[i];
                break;
            }
        }
    }

    if (!insert) {// guess fail
        config.debug("guess fail!");
        return null;
    }

    let ret = '';

    for (const c of insert) {
        switch (c) {
            case 'R':
                ret += rs[0];
                rs = rs.substring(1);
                break;
            case 'G':
                ret += gs[0];
                gs = gs.substring(1);
                break;
            case 'B':
                ret += bs[0];
                bs = bs.substring(1);
                break;
            case 'A':
                ret += as[0];
                as = as.substring(1);
                break;
            case 'W':
                ret += ws[0];
                ws = ws.substring(1);
                break;
            case '!':
                break;
            default:
                ret += c;
                break;
        }
    }

    // config.debug(`${text} => ${ret}`);
    return ret;
}

class ColorProvider implements vscode.DocumentColorProvider
{
    private from = 0;
    private to = Infinity;
    constructor(from?: number, to?: number) { // from & to: lineno, specify ranges
        this.from = from || this.from;
        this.to = to || this.to;
    }

    // preview color in the editor
    provideDocumentColors(
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.ColorInformation[]>
    {
        let colors:vscode.ColorInformation[] = [];
        for (let i = 0; i < document.lineCount; ++i) {
            if (i>this.from && i <this.to) {
                let line = document.lineAt(i).text;
                colors = colors.concat(line2colorinfos(i, line, cfg));
            }
        }
        return colors; // <= 500, see https://github.com/microsoft/vscode/issues/44615#issuecomment-396497187
    }

    // insert string after pick
    provideColorPresentations(
        color: vscode.Color,
        context: {document: vscode.TextDocument, range: vscode.Range},
        token: vscode.CancellationToken
        ): vscode.ProviderResult<vscode.ColorPresentation[]>
    {
        let text = context.document.getText(context.range);
        let clrstr: string|null = null;
        if (text) {
            clrstr = vscolor2str(color, text, cfg);
        }
        if (clrstr) {
            return [new vscode.ColorPresentation(clrstr)];
        } else {
            return null;
        }
    }
}

// init and deinit

let listener0:vscode.Disposable;
let listener1:vscode.Disposable;
let listeners:vscode.Disposable[] = [];
const ANTI_SHAKE = 20;
let last_vstart = -ANTI_SHAKE-999;

function updateColorProvider(force: boolean = false) {
    let ranges = vscode.window.activeTextEditor?.visibleRanges ?? [];
    const range0 = ranges[0], rangeN = ranges[ranges.length-1];
    if (!range0 || !rangeN) { return; }
    const from = range0.start.line, to = rangeN.end.line;
    if (!force && Math.abs(from-last_vstart) < ANTI_SHAKE/2) { return; }
    last_vstart = from;
    // update: re-register color provider
    for (const listener of listeners) {
        listener.dispose();
    }
    listeners = [];
    let cp = new ColorProvider(from-ANTI_SHAKE, to+ANTI_SHAKE);
    for (const file of cfg.files) {
        listeners.push(vscode.languages.registerColorProvider({pattern: file}, cp));
    }
    listeners.push(vscode.languages.registerColorProvider(cfg.langs, cp));
}

export function activate() {
    cfg = config.read();
    updateColorProvider();
    listener0 = vscode.window.onDidChangeTextEditorVisibleRanges((event)=>{
        let editor = event.textEditor;
        // file filter
        let matched = vscode.languages.match(cfg.langs, editor.document) > 0;
        for (const file of cfg.files) {
            matched=matched || vscode.languages.match({pattern: file}, editor.document) > 0;
            if (matched) { break; }
        }
        if (!matched) { return; }
        // update
        updateColorProvider();
    });
    listener1 = vscode.window.onDidChangeActiveTextEditor(event=>{
        updateColorProvider(true);
    });
}

export function deactivate() {
    for (const listener of listeners) {
        listener.dispose();
    }
    listener0.dispose();
    listener1.dispose();
}
