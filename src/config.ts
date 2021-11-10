import * as vscode from 'vscode';

export const name = "Zeng's Color-picker";
export const id = "zeng-color-picker";
export const release = true;

export function debug(message?: any, ...optionalParams: any[]): void {
    if (!release) {
        console.log(message, ...optionalParams);
    }
}

function escapeRegExp(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export type Config = {
    insert: string,
    detectors: string[],
    detectRegexs: RegExp[],
    insertRegexs: RegExp[],
    langs: string[],
    files: string[],
};

export function read(): Config {
    const cfg = vscode.workspace.getConfiguration("zeng-color-picker");

    const insert = cfg.get<string>("Picker.InsertAfterPick")||"";
    const detectors = cfg.get<string[]>("Preview.MatchPatterns")||[];
    const langs = cfg.get<string>("Filter.ApplyForTheseLanguages")||"";
    const files = cfg.get<string>("Filter.ApplyForTheseFiles")||"";

    let detectRegexs: RegExp[] = [];
    for (let i = 0; i < detectors.length; i++) {
        const d = detectors[i];
        const re = new RegExp('(?<=\\W)'+ escapeRegExp(d).replace(/[RGBAW]/g, "([0-9a-fA-F])") + '(?=\\W)', 'g');
        detectRegexs[i] = re;
    }
    let insertRegexs: RegExp[] = [];
    for (let i = 0; i < detectors.length; i++) {
        const d = detectors[i];
        const re = new RegExp('^'+ escapeRegExp(d).replace(/[RGBAW]/g, "([0-9a-fA-F])") + '$');
        insertRegexs[i] = re;
    }

    let langlist = [];
    for (const lang of langs.split(',')) {
        if (lang) {
            langlist.push(lang);
        }
    }

    let filelist = [];
    for (const file of files.split(' ')) {
        if (file) {
            filelist.push(file);
        }
    }

    return {
        insert: insert,
        detectors: detectors,
        detectRegexs: detectRegexs,
        insertRegexs: insertRegexs,
        langs: langlist,
        files: filelist,
    };
}
