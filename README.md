# Color Picker

This color picker is an extension of vscode.

If you encounter any problem, please [let us know](https://github.com/zengfanfan/ColorPicker/issues).

## Features

1. Custom color format easily:
    - Use `UPPER` letters (R,G,B,A,W,H,S,L) to represent hex components (red, green, blue, alpha, grayscale, hue, saturation, lightness).
    - Use `{lower+i}` ({ri},{gi},{bi},{ai},{hi},{si},{li}) to represent integer (0-255) components (red, green, blue, alpha, hue, saturation, lightness).
    - Use `{lower+f}` ({rf},{gf},{bf},{af},{hf},{sf},{lf}) to represent float (0.0-1.0) components (red, green, blue, alpha, hue, saturation, lightness).
    - Use `{lower+%}` ({r%},{g%},{b%},{a%},{h%},{s%},{l%}) to represent percentage (0%-100%) components (red, green, blue, alpha, hue, saturation, lightness).
    - Use `{hi:0~360}` to represent the hue (0-360).
    - Use `{%xx}` to represent an ASCII character, with `xx` being its two-digit hex [ASCII code](https://wikipedia.org/wiki/ASCII#Character_set). (e.g. `{%7b}` -> `{`)
    - Use sigh mark `!` to announce a word boundary.
    - Example: `#RRGGBB!`, `!rgb({ri}, {gi}, {bi})`, `!hsla({hi:0~360}, {s%}, {l%}, {af})`
    - ... See [test.md](test/test.md) for more examples ...
2. File filter, by language or by path pattern;
3. Support gray scale.

## Settings

This extension contributes the following settings:

* `zeng-color-picker.Filter.ApplyForTheseLanguages`: filter files by language
* `zeng-color-picker.Filter.ApplyForTheseFiles`: filter files by [glob pattern](https://code.visualstudio.com/api/references/vscode-api#GlobPattern)
* `zeng-color-picker.Preview.MatchPatterns`: specify what color strings looks like
* `zeng-color-picker.Picker.InsertAfterPick`: specify how to insert a color string after pick

## Release Notes

See [ChangeLog](CHANGELOG.md).
