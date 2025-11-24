import * as vs from 'vscode';

export const name = "Zeng's Color-picker";
export const id = "zeng-color-picker";
export const release = true;// turn on(false) or off(true) debug message

export function debug(message?: any, ...optionalParams: any[]): void {
    if (!release) {
        const d = new Date();
        const pad = (n: number, len = 2) => n.toString().padStart(len, "0");
        const ts = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`;
        console.log(`[${ts}]`, message, ...optionalParams);
    }
}
export function toast(message: string, ...items: string[]): void {
    if (!release) {
        vs.window.showInformationMessage(message, ...items);
    }
}

const wordBoundary = '(?:(?<=[^\\w])|(?=[^\\w]))'; /* use [^\w] instead of \W, because upper W represents grayscale. */
function escapeRegExp(s: string): string {
    // $&: matched part
    return s.replace(/[.*+?^$()|\[\]\\]/g, '\\$&');
}

export type Component = {
    name: string,
    type: string,
    min: number,
    max: number,
};

export type Config = {
    detectors: string[],
    detectRegexes: RegExp[],
    detectRegexesWhole: RegExp[],
    components: Component[][], // paired with {detectors} and matched groups
    insertFormat: string,
    titles: string[],
    langs: string[],
    files: string[],
};

export const reDetector = /!|\{%[0-9a-fA-F]{2}\}|R+|G+|B+|A+|W+|H+|S+|L+|\s*\{[rgbawhsl](?<type>[if%]+)(:(?<min>(\\\+|-)?[0-9]+(\\\.[0-9]+)?)~(?<max>(\\\+|-)?[0-9]+(\\\.[0-9]+)?))?\}\s*/g;
export const reInserter = /!|\{%[0-9a-fA-F]{2}\}|R+|G+|B+|A+|W+|H+|S+|L+|\{[rgbawhsl](?<type>[if%]+)(:(?<min>(\+|-)?[0-9]+(\.[0-9]+)?)~(?<max>(\+|-)?[0-9]+(\.[0-9]+)?))?\}/g;

export function read(): Config {
    const cfg = vs.workspace.getConfiguration("zeng-color-picker");
    const detectors = cfg.get<string[]>("Preview.MatchPatterns") ?? [];
    const insert = cfg.get<string>("Picker.InsertAfterPick") ?? "";
    const titles = cfg.get<string[]>("Picker.AdditionalLabels") ?? [];
    const langs = cfg.get<string>("Filter.ApplyForTheseLanguages") ?? "";
    const files = cfg.get<string>("Filter.ApplyForTheseFiles") ?? "";

    const detectRegexes: RegExp[] = [];
    const detectRegexesWhole: RegExp[] = [];
    const components: Component[][] = [];
    for (let i = 0; i < detectors.length; i++) {
        const cs: Component[] = components[i] = [];
        const dt = detectors[i];
        let pattern = escapeRegExp(dt.replace(/^!+|!+$/, '')).replace(reDetector, (s, ...args) => {
            s = s.replace(/^\s*{+|}+\s*$/g, '');
            const name = s[0];
            // word boundary
            if (s === '!') return wordBoundary;
            // ascii
            if (name === '%') {
                const ascii = parseInt(s.slice(1), 16);
                const char = String.fromCharCode(ascii);
                return escapeRegExp(char);
            }
            // hex
            if ('RGBAWHSL'.includes(name)) {
                cs.push({ name: name, type: 'hex', min: NaN, max: NaN });
                return `([0-9a-fA-F]{${s.length}})`;
            }
            // rgbawhsl...
            const g = args.at(-1);
            const c = {
                name: name,
                type: [...new Set(g.type)].join(''),
                min: parseFloat(g.min),
                max: parseFloat(g.max),
            } as Component;
            cs.push(c);
            const fps = '(?:[+-]?[0-9]+(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?|[+-]?\\.[0-9]+(?:[eE][+-]?[0-9]+)?)';
            if (c.type.includes('%')) { // (int | float)%
                return `\\s*(${fps}%${c.type.length > 1 ? '?' : ''})\\s*`;
            } else if (c.type === 'i') { // int
                return `\\s*([+-]?[0-9]+)\\s*`;
            } else { // float
                return `\\s*(${fps})\\s*`;
            }
        });
        detectRegexesWhole[i] = new RegExp(`^${pattern}$`);
        if (dt.startsWith('!')) pattern = `${wordBoundary}${pattern}`;
        if (dt.endsWith('!')) pattern = `${pattern}${wordBoundary}`;
        detectRegexes[i] = new RegExp(pattern, 'g');
    }

    return {
        detectors: detectors,
        detectRegexes: detectRegexes,
        detectRegexesWhole: detectRegexesWhole,
        components: components,
        insertFormat: insert,
        titles: titles,
        langs: langs.split(',').map(s => s.trim()).filter(s => s),
        files: files.split(',').map(s => s.trim()).filter(s => s),
    };
}
