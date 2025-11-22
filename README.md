# Color Picker

This color picker is an extension of vscode.

If you encounter any problem, please [let us know](https://github.com/zengfanfan/ColorPicker/issues).

## Features

1. Custom color format easily:
    - Use `UPPER` letters (R,G,B,A,W,H,S,L) to indicate hex color components (red, green, blue, alpha, grayscale, hue, saturation, lightness).
    - Use `lower+i` (ri,gi,bi,ai,hi,si,li) to indicate integer (0-255) color components (red, green, blue, alpha, hue, saturation, lightness).
    - Use `lower+f` (rf,gf,bf,af,hf,sf,lf) to indicate float (0.0-1.0) color components (red, green, blue, alpha, hue, saturation, lightness).
    - Use `lower+%` (r%,g%,b%,a%,h%,s%,l%) to indicate percentage (0%-100%) color components (red, green, blue, alpha, hue, saturation, lightness).
    - Use `hi0~360` to indicate hue (0-360).
    - Use sigh mark `!` to announce a word boundary.
    - Similiar items, such as *RGBA* and *ARGB*, will confuse the detector, hence should be avoided.
    - Example: `#RRGGBB!`, `!rgb(ri, gi, bi)`, `!hsla(hi0~360, s%, l%, af)`
2. File filter, by language or by path pattern;
3. Support gray scale.

## Disable the builtin picker

Sometimes you may see more than one color blocks for each color string (such as in css files). The other one is created by [vscode builtin color picker](https://code.visualstudio.com/docs/languages/css#_syntax-coloring-color-preview). You can disable the builtin one by adding the following [settings](https://code.visualstudio.com/docs/configure/settings):
```json
    // globally
    "editor.colorDecorators": false,
    // for specific language (e.g. css)
    "[css]": {
        "editor.colorDecorators": false,
    }
```

## Settings

This extension contributes the following settings:

* `zeng-color-picker.Filter.ApplyForTheseLanguages`: filter files by language
* `zeng-color-picker.Filter.ApplyForTheseFiles`: filter files by [glob pattern](https://code.visualstudio.com/api/references/vscode-api#GlobPattern)
* `zeng-color-picker.Preview.MatchPatterns`: specify what color strings looks like
* `zeng-color-picker.Picker.InsertAfterPick`: specify how to insert a color string after pick

## Release Notes

See [ChangeLog](CHANGELOG.md).
