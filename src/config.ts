import * as vscode from 'vscode';

export const name = "Zeng's Color-picker";
export const id = "zeng-color-picker";
export const release = false;// turn on(false) or off(true) debug message

export function debug(message?: any, ...optionalParams: any[]): void {
    if (!release) {
        console.log(message, ...optionalParams);
    }
}
export function toast(message: string, ...items: string[]): void {
    if (!release) {
        vscode.window.showInformationMessage(message, ...items);
    }
}

function escapeRegExp(s: string): string {
    // $&: matched part
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace('!', '(?=(^|\\b|$))');
}

export type Component = {
    name: string,
    type: string,
    min: number,
    max: number,
};

export type Config = {
    insert: string,
    detectors: string[],
    detectRegexs: RegExp[],
    insertRegexs: RegExp[], // used to guess when inserting
    components: Component[][], // paired with {detectors} and matched groups
    langs: string[],
    files: string[],
};

const reDetector = /R+|G+|B+|A+|W+|H+|S+|L+|[rgbawhsl](?<type>[if%]+)((?<min>(\\\+|-)?[0-9]+(\\\.[0-9]+)?)~(?<max>(\\\+|-)?[0-9]+(\\\.[0-9]+)?))?/g;
export function read(): Config {
    const cfg = vscode.workspace.getConfiguration("zeng-color-picker");
    const insert = cfg.get<string>("Picker.InsertAfterPick") || "";
    const detectors = cfg.get<string[]>("Preview.MatchPatterns") || [];
    const langs = cfg.get<string>("Filter.ApplyForTheseLanguages") || "";
    const files = cfg.get<string>("Filter.ApplyForTheseFiles") || "";

    let detectRegexs: RegExp[] = [];
    let insertRegexs: RegExp[] = [];
    let components: Component[][] = [];
    for (let i = 0; i < detectors.length; i++) {
        let cs: Component[] = components[i] = [];
        const pattern = escapeRegExp(detectors[i]).replace(reDetector, (s, ...args) => {
            if (!s) return s;
            // hex
            if ('RGBAWHSL'.includes(s[0])) {
                cs.push({ name: s[0], type: 'hex', min: NaN, max: NaN });
                return `([0-9a-fA-F]{${s.length}})`;
            }
            // rgbawhsl...
            const g = args.at(-1);
            const c = {
                name: s[0],
                type: [...new Set(g.type)].join(''),
                min: parseFloat(g.min),
                max: parseFloat(g.max),
            } as Component;
            cs.push(c);
            const fps = '[+-]?[0-9]+(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?';
            if (c.type.includes('%')) { // (int | float)%
                return `(${fps}%${c.type.length > 1 ? '?' : ''})`;
            } else if (c.type === 'i') { // int
                return `([+-]?[0-9]+)`;
            } else { // float
                return `(${fps})`;
            }
        });
        detectRegexs[i] = new RegExp(pattern, 'g');
        insertRegexs[i] = new RegExp(`^${pattern}\$`);
    }

    return {
        insert: insert,
        detectors: detectors,
        detectRegexs: detectRegexs,
        insertRegexs: insertRegexs,
        components: components,
        langs: langs.split(',').map(s => s.trim()).filter(s => s),
        files: files.split(',').map(s => s.trim()).filter(s => s),
    };
}
