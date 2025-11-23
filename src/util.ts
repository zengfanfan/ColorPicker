import * as vs from 'vscode';

export class Color {
    private _r: number = 0;
    private _g: number = 0;
    private _b: number = 0;
    private _a: number = 1;

    private _h: number = 0;
    private _s: number = 0;
    private _l: number = 0;

    //#region pre-defined colors

    static readonly black = new Color(0, 0, 0);
    static readonly white = new Color(1, 1, 1);
    static readonly red = new Color(1, 0, 0);
    static readonly green = new Color(0, 1, 0);
    static readonly blue = new Color(0, 0, 1);
    static readonly yellow = new Color(1, 1, 0);
    static readonly cyan = new Color(0, 1, 1);
    static readonly magenta = new Color(1, 0, 1);

    //#endregion
    //#region contructor / creator

    constructor();
    constructor(r: number, g: number, b: number);
    constructor(r: number, g: number, b: number, a: number);
    constructor(vscolor: vs.Color);
    constructor(...args: any[]) {
        if (args.length == 0) return;
        const r = args[0];
        if (r instanceof vs.Color) {
            this._r = r.red;
            this._g = r.green;
            this._b = r.blue;
            this._a = r.alpha;
        } else {
            this._r = r || 0;
            this._g = args[1] || 0;
            this._b = args[2] || 0;
            this._a = args[3] || 1;
        }
        this.updateHSL();
    }
    static fromHSLA(h: number, s: number, l: number, a: number = 1) {
        const c = new Color;
        [c._h, c._s, c._l, c._a] = [h, s, l, a];
        c.updateRGB();
        return c;
    }

    //#endregion
    //#region basic properties

    get vscolor(): vs.Color { return new vs.Color(this._r, this._g, this._b, this._a); }
    get a(): number { return this._a; }
    set a(v: number) { this._a = v; }
    get w(): number { return Color.rgba2gray(this._r, this._g, this._b); }
    set w(v: number) { this._r = this._g = this._b = v; this.updateHSL(); }

    get r(): number { return this._r; }
    get g(): number { return this._g; }
    get b(): number { return this._b; }
    set r(v: number) { if (this._r != v) { this._r = v; this.updateHSL(); } }
    set g(v: number) { if (this._g != v) { this._g = v; this.updateHSL(); } }
    set b(v: number) { if (this._b != v) { this._b = v; this.updateHSL(); } }
    get rgb(): [number, number, number] { return [this._r, this._g, this._b]; }
    get rgba(): [number, number, number, number] { return [this._r, this._g, this._b, this._a]; }

    private updateRGB() { [this._r, this._g, this._b] = Color.hsl2rgb(this._h, this._s, this._l); }
    private updateHSL() { [this._h, this._s, this._l] = Color.rgb2hsl(this._r, this._g, this._b); }

    get h(): number { return this._h; }
    get s(): number { return this._s; }
    get l(): number { return this._l; }
    set h(v: number) { if (this._h != v) { this._h = v; this.updateRGB(); } }
    set s(v: number) { if (this._s != v) { this._s = v; this.updateRGB(); } }
    set l(v: number) { if (this._l != v) { this._l = v; this.updateRGB(); } }
    get hsl(): [number, number, number] { return [this._h, this._s, this._l]; }
    get hsla(): [number, number, number, number] { return [this._h, this._s, this._l, this._a]; }

    //#endregion
    //#region hex string

    /** "RRGGBB" | "RRGGBBAA" */
    get hex(): string {
        const oc = false;
        let ret = Color.float2hex(this._r, oc) + Color.float2hex(this._g, oc) + Color.float2hex(this._b, oc);
        if (this._a < 1) ret += Color.float2hex(this._a, oc);
        return ret;
    }

    get rsHex1(): string { return Color.float2hex(this._r, true) }
    get gsHex1(): string { return Color.float2hex(this._g, true) }
    get bsHex1(): string { return Color.float2hex(this._b, true) }
    get asHex1(): string { return Color.float2hex(this._a, true) }
    get wsHex1(): string { return Color.float2hex(this.w, true) }
    get hsHex1(): string { return Color.float2hex(this._h, true) }
    get ssHex1(): string { return Color.float2hex(this._s, true) }
    get lsHex1(): string { return Color.float2hex(this._l, true) }

    get rsHex2(): string { return Color.float2hex(this._r, false) }
    get gsHex2(): string { return Color.float2hex(this._g, false) }
    get bsHex2(): string { return Color.float2hex(this._b, false) }
    get asHex2(): string { return Color.float2hex(this._a, false) }
    get wsHex2(): string { return Color.float2hex(this.w, false) }
    get hsHex2(): string { return Color.float2hex(this._h, false) }
    get ssHex2(): string { return Color.float2hex(this._s, false) }
    get lsHex2(): string { return Color.float2hex(this._l, false) }

    //#endregion
    //#region other functions

    /**
    * Converts an float(0.0~1.0) color value to Hex(0~F) string.
    * 0.0 => 0/00, 0.5 => 8/88, 1.0 => F/FF
    *
    * @param   {number}  value     The float value
    * @return  {string}            The hex string
    */
    static float2hex(value: number, onechar: boolean): string {
        if (onechar) return Math.round(value * 0xf).toString(16);
        else return Math.round(value * 0xff).toString(16).padStart(2, '0');
    }

    static rgba2gray(r: number, g: number, b: number): number {
        let gray = r * 0.3 + g * 0.59 + b * 0.11;
        return gray;
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
    static hsl2rgb(h: number, s: number, l: number): [number, number, number] {
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
    static rgb2hsl(r: number, g: number, b: number): [number, number, number] {
        let a = Math.max(r, g, b), n = a - Math.min(r, g, b), f = (1 - Math.abs(a + a - n - 1));
        let h = n && ((a == r) ? (g - b) / n : ((a == g) ? 2 + (b - r) / n : 4 + (r - g) / n));
        return [(h < 0 ? h + 6 : h) / 6, f ? n / f : 0, (a + a - n) / 2];
    }

    //#endregion
}
