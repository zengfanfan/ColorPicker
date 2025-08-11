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
    let gray = r * 0.3 + g * 0.59 + b * 0.11;
    return gray * a / 255.0;
}
function gray2rgba(gray: number): [number, number, number, number] {
    return [gray, gray, gray, 255];
}

const reRGBA = /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/g; // e.g. rgb(255, 102, 0)
const reHSLA = /hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+)\s*)?\)/g; // e.g. hsl(24, 100%, 50%)
function line2colorinfos(lineno: number, text: string, cfg: config.Config): vscode.ColorInformation[] {
    let ret: vscode.ColorInformation[] = [];

    // RGB(A)
    if (cfg.detectRGBA) {
        for (const m of text.matchAll(reRGBA)) {
            const r = parseFloat(m[1]) / 255;
            const g = parseFloat(m[2]) / 255;
            const b = parseFloat(m[3]) / 255;
            const a = parseFloat(m[4] || '1');
            let from = m.index || 0;
            ret.push(new vscode.ColorInformation(
                new vscode.Range(lineno, from, lineno, from + m[0].length),
                new vscode.Color(r, g, b, a)
            ));
        }
    }

    // HSL(A)
    if (cfg.detectHSLA) {
        for (const m of text.matchAll(reHSLA)) {
            const h = parseFloat(m[1]) / 360;
            const s = parseFloat(m[2]) / 100;
            const l = parseFloat(m[3]) / 100;
            const [r, g, b] = hsl2rgb(h, s, l);
            const a = parseFloat(m[4] || '1');
            let from = m.index || 0;
            ret.push(new vscode.ColorInformation(
                new vscode.Range(lineno, from, lineno, from + m[0].length),
                new vscode.Color(r, g, b, a)
            ));
        }
    }

    // Hex
    for (let i = 0; i < cfg.detectors.length; i++) {
        // match detector
        const detector = cfg.detectors[i];
        const re = cfg.detectRegexs[i];
        for (const match of text.matchAll(re)) {
            // take color components
            let [rs, gs, bs, as, ws] = ["", "", "", "", ""];
            let mi = 1;
            for (let j = 0; j < detector.length; j++) {
                switch (detector[j]) {
                    case 'R':
                        rs += match[mi++] || '';
                        break;
                    case 'G':
                        gs += match[mi++] || '';
                        break;
                    case 'B':
                        bs += match[mi++] || '';
                        break;
                    case 'A':
                        as += match[mi++] || '';
                        break;
                    case 'W':
                        ws += match[mi++] || '';
                        break;
                }
            }
            // calculate color components
            let [r, g, b, a, w] = [0, 0, 0, 255, 0];
            if (rs) { r = +("0x" + (rs + rs + '0').substring(0, 2)); }
            if (gs) { g = +("0x" + (gs + gs + '0').substring(0, 2)); }
            if (bs) { b = +("0x" + (bs + bs + '0').substring(0, 2)); }
            if (as) { a = +("0x" + (as + as + '0').substring(0, 2)); }
            if (ws) { w = +("0x" + (ws + ws + '0').substring(0, 2)); }
            // assemble
            // config.debug(`[${detector}] ${match[0]} => ${r},${g},${b},${a},${w} [${rs}/${gs}/${bs}/${as}/${ws}]`);
            if (w) {// grayscale conquer others
                [r, b, g, a] = gray2rgba(w);
            }
            let from = match.index || 0;
            ret.push(new vscode.ColorInformation(
                new vscode.Range(lineno, from, lineno, from + match[0].length),
                new vscode.Color(r / 255.0, g / 255.0, b / 255.0, a / 255.0)
            ));
        }
    }

    return ret;
}

function vscolor2str(color: vscode.Color, text: string, cfg: config.Config): string | null {
    const [ri, gi, bi, ai] = [color.red * 255, color.green * 255, color.blue * 255, color.alpha * 255];
    const wi = rgba2gray(ri, gi, bi, ai);
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

function vscolor2hex(color: vscode.Color): string { // e.g. #112233 or #11223344
    const r = Math.round(color.red * 255);
    const g = Math.round(color.green * 255);
    const b = Math.round(color.blue * 255);
    const a = Math.round(color.alpha * 255);
    const astr = a < 255 ? int2hex(a) : '';
    return `#${int2hex(r)}${int2hex(g)}${int2hex(b)}${astr}`;
}

function vscolor2rgba(color: vscode.Color): string { // e.g. rgb(111, 22, 3) or rgba(111, 22, 3, 0.5)
    const r = Math.round(color.red * 255);
    const g = Math.round(color.green * 255);
    const b = Math.round(color.blue * 255);
    const a = color.alpha;
    const astr = a < 1 ? `, ${a.toFixed(2)}` : '';
    return `rgb(${r}, ${g}, ${b}${astr})`;
}

function vscolor2hsla(color: vscode.Color): string { // e.g. hsl(11, 22%, 33%) or hsla(11, 22%, 33%, 0.5)
    let [h, s, l] = rgb2hsl(color.red, color.green, color.blue);
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    const a = color.alpha;
    const astr = a < 1 ? `, ${a.toFixed(2)}` : '';
    return `hsl(${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%${astr})`;
}

/**
 * Converts an HSL color value to RGB.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 1].
 * see:
 *      * https://en.wikipedia.org/wiki/HSL_and_HSV
 *      * https://stackoverflow.com/a/64090995/29947112
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hsl2rgb(h: number, s: number, l: number): [number, number, number] {
    let a: number = s * Math.min(l, 1 - l);
    let f = (n: number, k = (n + h * 12) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return [f(0), f(8), f(4)];
}

/**
 * Converts an RGB color value to HSL.
 * Assumes r, g, and b are contained in the set [0, 1] and
 * returns h, s, and l in the set [0, 1].
 * see:
 *      * https://en.wikipedia.org/wiki/HSL_and_HSV
 *      * https://stackoverflow.com/a/64090995/29947112
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
function rgb2hsl(r: number, g: number, b: number): [number, number, number] {
    let a = Math.max(r, g, b), n = a - Math.min(r, g, b), f = (1 - Math.abs(a + a - n - 1));
    let h = n && ((a == r) ? (g - b) / n : ((a == g) ? 2 + (b - r) / n : 4 + (r - g) / n));
    return [(h < 0 ? h + 6 : h) / 6, f ? n / f : 0, (a + a - n) / 2];
}


class ColorProvider implements vscode.DocumentColorProvider {
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
    ): vscode.ProviderResult<vscode.ColorInformation[]> {
        let colors: vscode.ColorInformation[] = [];
        for (let i = 0; i < document.lineCount; ++i) {
            if (i > this.from && i < this.to) {
                let line = document.lineAt(i).text;
                colors = colors.concat(line2colorinfos(i, line, cfg));
            }
        }
        return colors; // <= 500, see https://github.com/microsoft/vscode/issues/44615#issuecomment-396497187
    }

    // insert string after pick
    provideColorPresentations(
        color: vscode.Color,
        context: { document: vscode.TextDocument, range: vscode.Range },
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.ColorPresentation[]> {
        let presentations: string[] = [];

        // Add Hex formats
        let text = context.document.getText(context.range);
        if (text) {
            let s = vscolor2str(color, text, cfg);
            if (s) presentations.push(s);
            else presentations.push(vscolor2hex(color));
        }

        if (!cfg.insert) {
            // Add RGB(A) format
            presentations.push(vscolor2rgba(color));
            // Add HSL(A) format
            presentations.push(vscolor2hsla(color));
        }

        return presentations.map(p => new vscode.ColorPresentation(p));
    }
}

// init and deinit

let listener0: vscode.Disposable;
let listener1: vscode.Disposable;
let listeners: vscode.Disposable[] = [];
const ANTI_SHAKE = 4;
let lastVisibleStart = -ANTI_SHAKE - 999;
let lastActiveEditor: vscode.TextEditor | undefined = undefined;

function updateColorProvider(force: boolean = false) {
    const aEditor = vscode.window.activeTextEditor;
    if (lastActiveEditor != aEditor) {
        lastActiveEditor = aEditor;
        force = true;
    }

    let ranges = aEditor?.visibleRanges ?? [];
    const range0 = ranges[0], rangeN = ranges[ranges.length - 1];
    if (!range0 || !rangeN) return;

    const from = range0.start.line, to = rangeN.end.line;
    if (!force && Math.abs(from - lastVisibleStart) < ANTI_SHAKE / 2) return;
    lastVisibleStart = from;

    // to update(repaint) ui: re-register color provider
    for (const listener of listeners) {
        listener.dispose();
    }
    listeners = [];
    let cp = new ColorProvider(from - ANTI_SHAKE, to + ANTI_SHAKE);
    for (const file of cfg.files) {
        listeners.push(vscode.languages.registerColorProvider({ pattern: file }, cp));
    }
    listeners.push(vscode.languages.registerColorProvider(cfg.langs, cp));
}

const UPDATE_MIN_INTERVAL = 50; // ms
const UPDATE_MAX_INTERVAL = 1000; // ms
const UPDATE_DURATION = 3000; // ms
let changedTime: number = UPDATE_DURATION; // ms since 1970-1-1
let lastUpdateTime: number = 0; // ms since 1970-1-1
let updateTimer: number = -1;
function onUpdateTimer() {
    const now = Date.now();
    if (updateTimer < 0) return;
    const expiredMin = now - changedTime < UPDATE_DURATION;
    const expiredMax = now - lastUpdateTime > UPDATE_MAX_INTERVAL;
    if (expiredMin || expiredMax) {
        updateColorProvider(expiredMin);
        lastUpdateTime = now;
    }
    updateTimer = setTimeout(onUpdateTimer, UPDATE_MIN_INTERVAL);
}

export function activate() {
    cfg = config.read();
    changedTime = Date.now();
    updateTimer = setTimeout(onUpdateTimer, UPDATE_MIN_INTERVAL);
    /** [onDidChangeTextEditorVisibleRanges]
     * An Event which fires when the visible ranges of an editor has changed.
     */
    listener0 = vscode.window.onDidChangeTextEditorVisibleRanges((event) => {
        let editor = event.textEditor;
        // file filter
        let matched = vscode.languages.match(cfg.langs, editor.document) > 0;
        for (const file of cfg.files) {
            matched = matched || vscode.languages.match({ pattern: file }, editor.document) > 0;
            if (matched) break;
        }
        if (!matched) return;
        // update
        changedTime = Date.now();
    });
    /** [onDidChangeActiveTextEditor]
     * An Event which fires when the active editor has changed.
     * Note that the event also fires when the active editor changes to undefined
     */
    listener1 = vscode.window.onDidChangeActiveTextEditor(event => {
        changedTime = Date.now();
    });
}

export function deactivate() {
    clearTimeout(updateTimer);
    updateTimer = -1;
    for (const listener of listeners) {
        listener.dispose();
    }
    listeners = [];
    listener0.dispose();
    listener1.dispose();
}
