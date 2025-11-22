# Test and check list

## Colors

### Hex

#### RGBA

1. #RGB!
    + "#900" = dark red
    +  #060  = dark green
    + :#009, = dark blue
    + (#f0f) = magenta
    + {#ff0} = yellow
    + <#0ff> = cyan
2. #RGBA!
    + #0f07 = dark green
    + #f0f7 = dark magenta
    + #f00f = red
    + #0fff = cyan
3. #RRGGBB!
    + #ff0000 = red
    + #00ff00 = green
    + #0000ff = blue
    + #00AEEF = light blue
    + #8DC63F = light green
    + #F26522 = orange (more red)
    + #FFC20E = orange (more yellow)
4. #RRGGBBAA!
    + #00ff0077 = dark green
    + #ff00ff77 = dark magenta
    + #ff0000ff = red
    + #00ffffff = cyan
5. #BGR!
    + #900 = dark blue
    + #060 = dark green
    + #009 = dark red
    + #f0f = magenta
    + #ff0 = cyan
    + #0ff = yellow
6. !BBRRGG!
    +  990000  = dark blue
    + ?006600  = dark red
    +  000099  = dark green
    + "ff000ff = cyan
    + :ffff00  = magenta
    +  00ffff, = yellow
7. grey("W")
    + grey("0") = black
    + grey("f") = white
    + grey("8") = 50% grey
8. grey("WW")
    + grey("0f") = black
    + grey("f0") = white
    + grey("aa") = 33% grey

#### HSL

1. #HSL!
    + "#900" = hsl(216, 000%, 000%) = black
    + "#0f4" = hsl(000, 100%, 027%) = dark red
    +  #060  = hsl(000, 040%, 000%) = black
    +  #5f3  = hsl(120, 100%, 020%) = dark green
    + :#009, = hsl(000, 000%, 060%) = grey
    + :#af5, = hsl(240, 100%, 033%) = dark blue
    + (#f0f) = hsl(360, 000%, 100%) = white
    + (#cf8) = hsl(288, 100%, 053%) = dark magenta
    + {#ff0} = hsl(360, 100%, 000%) = black
    + {#2f8} = hsl(048, 100%, 053%) = orange (more yellow)
    + <#0ff> = hsl(000, 100%, 100%) = white
    + <#8f8> = hsl(192, 100%, 053%) = light blue
2. #HHSSLL!
    + #00ff44 = hsl(000, 100%, 027%) = dark red
    + #55ff33 = hsl(120, 100%, 020%) = dark green
    + #aaff55 = hsl(240, 100%, 033%) = dark blue
    + #ccff88 = hsl(288, 100%, 053%) = dark magenta
    + #22ff88 = hsl(048, 100%, 053%) = orange (more yellow)
    + #88ff88 = hsl(192, 100%, 053%) = light blue
3. #SLH!
    + #40f = hsl(000, 100%, 027%) = dark red
    + #35f = hsl(120, 100%, 020%) = dark green
    + #5af = hsl(240, 100%, 033%) = dark blue
    + #8cf = hsl(288, 100%, 053%) = dark magenta
    + #82f = hsl(048, 100%, 053%) = orange (more yellow)
    + #88f = hsl(192, 100%, 053%) = light blue
4. #SHL!
    + #f04 = hsl(000, 100%, 027%) = dark red
    + #f53 = hsl(120, 100%, 020%) = dark green
    + #fa5 = hsl(240, 100%, 033%) = dark blue
    + #fc8 = hsl(288, 100%, 053%) = dark magenta
    + #f28 = hsl(048, 100%, 053%) = orange (more yellow)
    + #f88 = hsl(192, 100%, 053%) = light blue

### Integer

#### RGBA

1. !rgb(ri, gi, bi)
    + rgb(153, 000, 000) = dark red
    + !rgb(+00,+102,+00) = dark green
    + rgb(00 , 00 , 153) = dark blue
    + rgb(255, 000, 255) = magenta
    + rgb(255, 255, 000) = yellow
    + rgb(000, 255, 255) = cyan
    + argb(00, 255, 255) = invalid
    + rgb(-33, 000, 255) = invalid
    + rgb(000, 256, 255) = invalid
    + rgb(000, 250  255) = invalid
    + rgb( 000 255 255 ) = invalid
2. !rgba(ri, gi, bi, ai)
    + rgba(000, 255, 000, 119) = dark green
    + rgba(255, 000, 255, 119) = dark magenta
    + rgba(255, 000, 000, 255) = red
    + rgba(000, 255, 255, 255) = cyan
3. !rgba(gi, ri, bi, af)
    + rgba(255, 000, 000, 1.0) = green
    + rgba(255, 000, 000, 0.5) = dark green
    + rgba(000, 255, 255, .99) = magenta
    + rgba(000, 255, 255, .55) = dark magenta
    + rgba(000, 255, 000, 1  ) = red
    + rgba(255, 000, 255, 001) = cyan
    + rgba(255, 000, 255, -1)  = invalid
    + rgba(255, 000, 255, 1.1) = invalid
    + rgba(255, 000, 255, 100) = invalid
4. !abc(bi,ri,gi)
    +  abc(000,255,000) = red
    + ?abc(255, 00,255) = cyan
    + =abc( 255 , 0,0 ) = blue
    + :abc( 0 ,255,255) = yellow
5. 123{ri ,gi ,bi }
    +  123(000,255,000) = dark green
    + a123(255, 00,255) = dark magenta
    + ?123( 255 , 0,0 ) = red
    +  123( 0 ,255,255) = cyan
6. xyz(ri0~100,gi0~360,bi)
    +  xyz(000,255,000) = dark green
    + axyz(255, 00,255) = dark magenta
    + ?xyz( 255 , 0,0 ) = red
    +  xyz( 0 ,255,255) = cyan
7. !qwerty( ri , bi , gi )
    + qwerty(000,255,000)   = dark green
    + qwerty(255, 00,255)   = dark magenta
    + qwerty( 255 , 0 , 0 ) = red
    + qwerty( 0 ,255,255)   = cyan

#### HSL

1. !hsl(hi0~360, si, li)
    + hsl(216, 000, 000) = black
    + hsl(000, 100, 027) = dark red
    + hsl(000, 040, 000) = black
    + hsl(120, 100, 020) = dark green
    + hsl(000, 000, 060) = grey
    + hsl(240, 100, 033) = dark blue
    + hsl(360, 000, 100) = white
    + hsl(288, 100, 053) = dark magenta
    + hsl(360, 100, 000) = black
    + hsl(048, 100, 053) = orange (more yellow)
    + hsl(000, 100, 100) = white
    + hsl(192, 100, 053) = light blue
2. !hsl(hi, si, li)
    + hsl(000, 100, 027) = dark red
    + hsl(33 , 100, 020) = dark green
    + hsl( 67, 100, 033) = dark blue
    + hsl(80, 100, 053)  = dark magenta
    + hsl(13.3, 100, 53) = orange (more yellow)
    + ????hsl(53,100,53) = light blue
3. !SxLxH(si, li, hi)
    + SxLxH(100, 027, 00) = dark red
    + SxLxH(100, 020, 33) = dark green
    + SxLxH(100, 033, 67) = dark blue
    + SxLxH(100, 053, 80) = dark magenta
    + SxLxH(100, 053, 13) = orange (more yellow)
    + SxLxH(100, 053, 53) = light blue
4. SHL(si, hi, li)
    + SHL(100, 00, 027) = dark red
    + SHL(100, 33, 020) = dark green
    + SHL(100, 66, 033) = dark blue
    + SHL(100, 80, 053) = dark magenta
    + SHL(100, 13, 053) = orange (more yellow)
    + SHL(100, 53, 053) = light blue

### Float

#### RGBA

1. !rgb(rf, gf, bf)
    + rgb(0.6, 0.0, 0.0) = dark red
    + !!rgb(0.0,0.4,0.0) = dark green
    + rgb( 0 , 0  , 0.6) = dark blue
    + rgb(0.9, 0.0, 0.9) = magenta
    + rgb(+0.78,+1,+0)   = yellow (more green)
    + ??????rgb(0, 1, 1) = cyan
    + argb(0.0, 1.0, 1.0)= invalid
    + rgb(-1, 0.0, 1.0)  = invalid
    + rgb(0.0, 1.1, 1.0) = invalid
    + rgb(0.0, 0.9  1.0) = invalid
2. !rgba(rf, gf, bf, af)
    + rgba(0, 1, 0, 0.5) = dark green
    + rgba(1, 0, 1, +.5) = dark magenta
    + rgba(1, 0, 0, 1)   = red
    + rgba(0, 1, 1, 1)   = cyan
3. !abc(bf,rf,gf)
    +  abc(0,1,0) = red
    + ?abc(1,0,1) = cyan
    + =abc(1,0,0) = blue
    + :abc(0,1,1) = yellow

#### HSL

1. !hsl(hf1.0~2, sf, lf)
    + hsl(1.6, 0.0, 0.0) = black
    + hsl(1.0, 1, 0.27)  = dark red
    + hsl(1.0, 0.4, 0.0) = black
    + hsl(1.333, 1, 0.2) = dark green
    + hsl(1.0, 0, 0.6)   = grey
    + hsl(1.66, 1, 0.33) = dark blue
    + hsl(2, 0, 1)       = white
    + hsl(1.8, 1, 0.53)  = dark magenta
    + hsl(1, 1, 0.0)     = black
    + hsl(1.13, 1, 0.53) = orange (more yellow)
    + hsl(1.0, 1, 1.00)  = white
    + hsl(1.53, 1, 0.53) = light blue
2. !SxLxH(sf, lf, hf)
    + SxLxH(1, 0.27, .00) = dark red
    + SxLxH(1, 0.20, .33) = dark green
    + SxLxH(1, 0.33, .67) = dark blue
    + SxLxH(1, 0.53, .80) = dark magenta
    + SxLxH(1, 0.53, .13) = orange (more yellow)
    + SxLxH(1, 0.53, .53) = light blue

### Percentage

#### RGBA

1. !rgb(r%, g%, b%)
    + rgb(60%, 0%, 0%)     = dark red
    + !rgb(0.0%,40.5%,0%)  = dark green
    + rgb( 0% , 0% , 60%)  = dark blue
    + rgb(90%, 0%, 90%)    = magenta
    + rgb(+78%,+100%,+0%)  = yellow (more green)
    + rgb(0%, 100%, 100%)  = cyan
    + argb(0%, 100%, 100%) = invalid
    + rgb(-1%, 0%, 1%)     = invalid
    + rgb(0%, 1%, 101%)    = invalid
    + rgb(0%, 9%  1%)      = invalid
2. !rgba(r%, g%, b%, a%)
    + rgba(000%, 100%, 000%, 0.50%) = dark green
    + rgba(100%, 000%, 100%, +.50%) = dark magenta
    + rgba(100%, 000%, 000%, 100%)  = red
    + rgba(000%, 100%, 100%, 100%)  = cyan
3. !abc(b%,r%,g%)
    +  abc(000%,100%,000%) = red
    + ?abc(100%,000%,100%) = cyan
    + =abc(100%,000%,000%) = blue
    + :abc(000%,100%,100%) = yellow

#### HSL

1. !hsl(h%100~200, s%, l%)
    + hsl(000%, 100%, 27%) = dark red
    + hsl(33.3%,100%, 20%) = dark green
    + hsl(066%, 100%, 33%) = dark blue
    + hsl(080%, 100%, 53%) = dark magenta
    + hsl(013%, 100%, 53%) = orange (more yellow)
    + hsl(053%, 100%, 53%) = light blue
2. !SxLxH(s%, l%, h%)
    + SxLxH(100%, 27%, 00%) = dark red
    + SxLxH(100%, 20%, 33%) = dark green
    + SxLxH(100%, 33%, 67%) = dark blue
    + SxLxH(100%, 53%, 80%) = dark magenta
    + SxLxH(100%, 53%, 13%) = orange (more yellow)
    + SxLxH(100%, 53%, 53%) = light blue

### Mixed (i/f/%)

1. !rgb(rf%, gif, bi%)
    + rgb(60%, 0, 0)     = dark red
    + !!!rgb(0,0.4,0%)   = dark green
    + rgb(0.1 , 0 , 153) = dark blue
    + rgb(0.9, 0, 90%)   = magenta
    + rgb(+78%,+1.0,+0%) = yellow (more green)
    + rgb(0%, 255, 100%) = cyan
    + argb(0%, 100%, 1)  = invalid
    + rgb(2, -1, 1%)     = invalid
    + rgb(0, 1, 101%)    = invalid
    + rgb(0%, 9%, 1%)    = invalid
2. !rgb(rif%, gif%, bif%)
    + rgb(153, 0, 0)     = dark red
    + rgb(0.1,0.6,0.1)   = dark green
    + rgb( 10%, 0%, 60%) = dark blue
    + rgb(222, 0.1, 90%) = magenta
    + rgb(+0.78,+100%,+0)= yellow (more green)
    + rgb(0%, 255, 1.0)  = cyan
    + argb(0%, 100%, 1)  = invalid
    + rgb(2, -1, 1%)     = invalid
    + rgb(0, 1, 101%)    = invalid
    + rgb(0%, 9%, 1%)    = invalid

## Other features

### settings

1. settings description
2. file filter
3. language filter
4. click title of picker: switches to next label

### package.json

1. update version

### CHANGELOG.md

1. add changelog
