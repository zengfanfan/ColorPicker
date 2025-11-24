import * as vs from 'vscode';
import * as config from './config';
import * as util from './util';
import { Color } from './util';

type NullNum = number | null;

let cfg: config.Config;
let precision = 2;
const reInteger = /^[-+]?[0-9]+$/;

//#region viewer (detect)

function match2color(match: RegExpExecArray, cs: config.Component[]): Color | null {
    let [r, g, b, a]: [NullNum, NullNum, NullNum, number] = [null, null, null, 1];
    let [w, h, s, l]: [NullNum, NullNum, NullNum, NullNum] = [null, null, null, null];

    for (let i = 0; i < cs.length; i++) {
        const c = cs[i];
        const v = match[i + 1];
        if (!v) return null;
        if (c.type == 'hex') {
            let f = parseInt(v.length == 1 ? v.repeat(2) : v, 16) / 255.0;
            /**/ if (c.name === 'R') r = f;
            else if (c.name === 'G') g = f;
            else if (c.name === 'B') b = f;
            else if (c.name === 'A') a = f;
            else if (c.name === 'W') w = f;
            else if (c.name === 'H') h = f;
            else if (c.name === 'S') s = f;
            else if (c.name === 'L') l = f;
        } else {
            let [hit, f] = [false, parseFloat(v)];
            if (!hit && c.type.includes('%') && v.endsWith('%')) {// percentage
                const min = util.ifNaN(c.min, 0);
                const max = util.ifNaN(c.max, 100);
                if (f >= min && f <= max) {
                    hit = true;
                    f /= 100.0;
                }
            }
            if (!hit && c.type.includes('i') && v.match(reInteger)) {// integer
                const min = util.ifNaN(c.min, 0);
                const max = util.ifNaN(c.max, 255);
                if (f >= min && f <= max) {
                    hit = true;
                    f = (f - min) / (max - min);
                }
            }
            if (!hit && c.type.includes('f')) {// float
                const min = util.ifNaN(c.min, 0);
                const max = util.ifNaN(c.max, 1);
                if (f >= min && f <= max) {
                    hit = true;
                    precision = Math.max(precision, v.trim().split('.')[1]?.length ?? 0);
                    precision = Math.min(precision, 9);
                }
            }
            if (!hit) return null;
            /**/ if (c.name === 'r') r = f;
            else if (c.name === 'g') g = f;
            else if (c.name === 'b') b = f;
            else if (c.name === 'a') a = f;
            else if (c.name === 'w') w = f;
            else if (c.name === 'h') h = f;
            else if (c.name === 's') s = f;
            else if (c.name === 'l') l = f;
        }
    }

    // 1: try rgb
    if (!util.isAnyNull(r, g, b)) return new Color(r!, g!, b!, a);
    // 2: try hsl
    if (!util.isAnyNull(h, s, l)) return Color.fromHSLA(h!, s!, l!, a);
    // 3: try gray
    if (!util.isAnyNull(w)) return new Color(w!, w!, w!, a);
    // 4: fallback
    return new Color(0, 0, 0, a);
}

function line2colorinfos(lineno: number, text: string): vs.ColorInformation[] {
    let ret: vs.ColorInformation[] = [];
    for (let i = 0; i < cfg.detectors.length; i++) {
        const re = cfg.detectRegexes[i];
        const cs = cfg.components[i];
        for (const match of text.matchAll(re)) {
            const color = match2color(match, cs);
            if (color === null) continue;
            let from = match.index ?? 0;
            ret.push(new vs.ColorInformation(
                new vs.Range(lineno, from, lineno, from + match[0].length),
                color.vscolor,
            ));
        }
    }
    return ret;
}

//#endregion
//#region picker (insert)

function isFormatMatched(match: RegExpMatchArray, cs: config.Component[]): boolean {
    for (let i = 0; i < cs.length; i++) {
        const c = cs[i];
        const v = match[i + 1];
        if (!v) return false;
        if (c.type == 'hex') continue; // hex
        let f = parseFloat(v);
        if (c.type.includes('%') && v.endsWith('%')) {// percentage
            const min = util.ifNaN(c.min, 0);
            const max = util.ifNaN(c.max, 100);
            if (f >= min && f <= max) continue;
        }
        if (c.type.includes('i') && v.match(reInteger)) {// integer
            const min = util.ifNaN(c.min, 0);
            const max = util.ifNaN(c.max, 255);
            if (f >= min && f <= max) continue;
        }
        if (c.type.includes('f')) {// float
            const min = util.ifNaN(c.min, 0);
            const max = util.ifNaN(c.max, 1);
            if (f >= min && f <= max) continue;
        }
        return false;
    }
    return true;
}

function guessInsertFormat(text: string): string | null {
    for (let i = 0; i < cfg.detectors.length; i++) {
        const re = cfg.detectRegexesWhole[i];
        const cs = cfg.components[i];
        const match = text.match(re);
        if (match && isFormatMatched(match, cs)) {
            return cfg.detectors[i];
        }
    }
    return null;
}

function vscolor2str(color: Color, format: string): string {
    return format.replaceAll('!', '').replace(config.reInserter, (v, ...args) => {
        v = v.replace(/^\s*{+|}+\s*$/g, '');
        let name = v[0];
        // hex
        if ('RGBAWHSL'.includes(name)) {
            const onechar = v.length == 1;
            if (name == 'R') return onechar ? color.rsHex1 : color.rsHex2;
            if (name == 'G') return onechar ? color.gsHex1 : color.gsHex2;
            if (name == 'B') return onechar ? color.bsHex1 : color.bsHex2;
            if (name == 'A') return onechar ? color.asHex1 : color.asHex2;
            if (name == 'W') return onechar ? color.wsHex1 : color.wsHex2;
            if (name == 'H') return onechar ? color.hsHex1 : color.hsHex2;
            if (name == 'S') return onechar ? color.ssHex1 : color.ssHex2;
            if (name == 'L') return onechar ? color.lsHex1 : color.lsHex2;
            return v;
        }
        // rgbawhsl...
        const g = args.at(-1);
        const c = {
            name: name,
            type: [...new Set(g.type)].join(''),
            min: parseFloat(g.min),
            max: parseFloat(g.max),
        } as config.Component;
        let f: NullNum = null;
        /**/ if (name == 'r') f = color.r;
        else if (name == 'g') f = color.g;
        else if (name == 'b') f = color.b;
        else if (name == 'a') f = color.a;
        else if (name == 'w') f = color.w;
        else if (name == 'h') f = color.h;
        else if (name == 's') f = color.s;
        else if (name == 'l') f = color.l;
        if (f != null) {
            let ret: string = '';
            if (c.type.includes('%')) { // percentage
                const min = util.ifNaN(c.min, 0);
                const max = util.ifNaN(c.max, 100);
                ret = Math.round(f * (max - min) + min) + '%';
            } else if (c.type.includes('i')) { // integer
                const min = util.ifNaN(c.min, 0);
                const max = util.ifNaN(c.max, 255);
                ret = Math.round(f * (max - min) + min).toString();
            } else if (c.type.includes('f')) { // float
                const min = util.ifNaN(c.min, 0);
                const max = util.ifNaN(c.max, 1);
                ret = util.float2str(f * (max - min) + min, precision);
            }
            if (ret) return ret;
        }
        // fallback
        return v;
    });
}

//#endregion

class ColorProvider implements vs.DocumentColorProvider {
    private from = 0;
    private to = Infinity;
    constructor(from?: number, to?: number) { // from & to: lineno, specify ranges
        this.from = from ?? this.from;
        this.to = to ?? this.to;
    }

    // preview color in the editor
    provideDocumentColors(
        document: vs.TextDocument,
        token: vs.CancellationToken
    ): vs.ProviderResult<vs.ColorInformation[]> {
        let colors: vs.ColorInformation[] = [];
        for (let i = 0; i < document.lineCount; ++i) {
            if (i >= this.from && i <= this.to) {
                let line = document.lineAt(i).text;
                colors = colors.concat(line2colorinfos(i, line));
            }
        }
        return colors; // <= 500, see https://github.com/microsoft/vscode/issues/44615#issuecomment-396497187
    }

    // insert string after pick
    private cacheInsert: {
        file: string,
        pos: vs.Position,
        fmts: string[]
    } | null = null;
    provideColorPresentations(
        vscolor: vs.Color,
        context: { document: vs.TextDocument, range: vs.Range },
        token: vs.CancellationToken
    ): vs.ProviderResult<vs.ColorPresentation[]> {
        const [doc, range] = [context.document, context.range];
        const presentations: vs.ColorPresentation[] = []; // cycle through these when clicking the title of picker

        let insertFormat = cfg.insertFormat;
        if (!insertFormat.trim()) {
            let text = doc.getText(range);
            insertFormat = guessInsertFormat(text) ?? insertFormat;
        }

        let lables = [insertFormat].concat(cfg.titles);
        let cache = this.cacheInsert;
        if (cache && doc.fileName == cache.file && range.start.isEqual(cache.pos) && cache.fmts.length > 0) {
            lables = cache.fmts;
        } else cache = {
            file: doc.fileName,
            pos: range.start,
            fmts: lables,
        };

        const color = new Color(vscolor);
        for (const label of lables) {
            const str = vscolor2str(color, label);
            if (str) presentations.push(Object.assign(new vs.ColorPresentation(str), {
                label: config.release ? str : label,
                textEdit: vs.TextEdit.replace(context.range, str),
            }));
        }

        return presentations;
    }
}

//#region updater

let listener0: vs.Disposable;
let listener1: vs.Disposable;
let listeners: vs.Disposable[] = [];
const ANTI_SHAKE = 3;
const EXTRA_LINE = ANTI_SHAKE * 3;
let lastVisibleStart = -ANTI_SHAKE - 999;
let lastActiveEditor: vs.TextEditor | undefined = undefined;

function updateColorProvider(force: boolean = false) {
    const aEditor = vs.window.activeTextEditor;
    if (lastActiveEditor != aEditor) {
        lastActiveEditor = aEditor;
        force = true;
    }

    let ranges = aEditor?.visibleRanges ?? [];
    const range0 = ranges[0], rangeN = ranges[ranges.length - 1];
    if (!range0 || !rangeN) return;

    const from = range0.start.line, to = rangeN.end.line;
    if (!force && Math.abs(from - lastVisibleStart) < ANTI_SHAKE) return;
    lastVisibleStart = from;

    // to update(repaint) ui: re-register color provider
    for (const listener of listeners) listener.dispose();
    listeners = [];
    let cp = new ColorProvider(from - EXTRA_LINE, to + EXTRA_LINE);
    for (const file of cfg.files) listeners.push(vs.languages.registerColorProvider({ pattern: file }, cp));
    listeners.push(vs.languages.registerColorProvider(cfg.langs, cp));
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

//#endregion updater
//#region init and deinit

export function activate() {
    cfg = config.read();
    changedTime = Date.now();
    updateTimer = setTimeout(onUpdateTimer, UPDATE_MIN_INTERVAL);
    /** [onDidChangeTextEditorVisibleRanges]
     * An Event which fires when the visible ranges of an editor has changed.
     */
    listener0 = vs.window.onDidChangeTextEditorVisibleRanges((event) => {
        let editor = event.textEditor;
        // file filter
        let matched = vs.languages.match(cfg.langs, editor.document) > 0;
        for (const file of cfg.files) {
            matched = matched || vs.languages.match({ pattern: file }, editor.document) > 0;
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
    listener1 = vs.window.onDidChangeActiveTextEditor(event => {
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

//#endregion
