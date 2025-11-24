# Test and check list

## Colors

### Minimal Test

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
    + #00ffff00 = cyan
5. !rgb({ri}, {gi}, {bi})
    + rgb(153, 000, 000) = dark red
    + !rgb(+00,+102,+00) = dark green
    + rgb(00 , 00 , 153) = dark blue
    + rgb(255, 000, 255) = magenta
    + rgb(255, 255, 000) = yellow
    + rgb(000, 255, 255) = cyan
    + rgb{000, 255, 255} = invalid
    + argb(00, 255, 255) = invalid
    + rgb(-33, 000, 255) = invalid
    + rgb(000, 256, 255) = invalid
    + rgb(000, 250  255) = invalid
    + rgb( 000 255 255 ) = invalid
6. !rgba({ri}, {gi}, {bi}, {af})
    + rgba(198, 36, 36, 001) = red
    + rgba(255, 000, 00,0.5) = dark red
    + rgba(0, 255, 255, .99) = cyan
    + rgba(255, 0, 255, .55) = dark magenta
    + rgba(000, 255, 00, 1 ) = green
    + rgba(255, 00, 255, 01) = magenta
7. !hsl({hi:0~360}, {s%}, {l%})
    + hsl(000, 100%, 027%) = dark red
    + hsl(120, 100%, 020%) = dark green
    + hsl(240, 100%, 033%) = dark blue
    + hsl(288, 100%, 040%) = dark magenta
    + hsl(048, 100%, 053%) = orange (more yellow)
    + hsl(192, 100%, 053%) = light blue

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
    + "ff00ff = cyan
    + :ffff00  = magenta
    +  00ffff, = yellow
7. gray("W")
    + gray("0") = black
    + gray("f") = white
    + gray("8") = 50% gray
8. gray("WW")
    + gray("0f") = black
    + gray("f0") = white
    + gray("aa") = 33% gray

#### HSL

1. #HSL!
    + "#900" = hsl(216, 000%, 000%) = black
    + "#0f4" = hsl(000, 100%, 027%) = dark red
    +  #060  = hsl(000, 040%, 000%) = black
    +  #5f3  = hsl(120, 100%, 020%) = dark green
    + :#009, = hsl(000, 000%, 060%) = gray
    + :#af5, = hsl(240, 100%, 033%) = dark blue
    + (#f0f) = hsl(360, 000%, 100%) = white
    + (#cf6) = hsl(288, 100%, 040%) = dark magenta
    + {#ff0} = hsl(360, 100%, 000%) = black
    + {#2f8} = hsl(048, 100%, 053%) = orange (more yellow)
    + <#0ff> = hsl(000, 100%, 100%) = white
    + <#8f8> = hsl(192, 100%, 053%) = light blue
2. #HHSSLL!
    + #00ff44 = hsl(000, 100%, 027%) = dark red
    + #55ff33 = hsl(120, 100%, 020%) = dark green
    + #aaff55 = hsl(240, 100%, 033%) = dark blue
    + #ccff66 = hsl(288, 100%, 040%) = dark magenta
    + #22ff88 = hsl(048, 100%, 053%) = orange (more yellow)
    + #88ff88 = hsl(192, 100%, 053%) = light blue
3. #SLH!
    + #f40 = hsl(000, 100%, 027%) = dark red
    + #f35 = hsl(120, 100%, 020%) = dark green
    + #f5a = hsl(240, 100%, 033%) = dark blue
    + #f6c = hsl(288, 100%, 040%) = dark magenta
    + #f82 = hsl(048, 100%, 053%) = orange (more yellow)
    + #f88 = hsl(192, 100%, 053%) = light blue
4. #SHL!
    + #f04 = hsl(000, 100%, 027%) = dark red
    + #f53 = hsl(120, 100%, 020%) = dark green
    + #fa5 = hsl(240, 100%, 033%) = dark blue
    + #fc6 = hsl(288, 100%, 040%) = dark magenta
    + #f28 = hsl(048, 100%, 053%) = orange (more yellow)
    + #f88 = hsl(192, 100%, 053%) = light blue

### Integer

#### RGBA

1. !rgb({ri}, {gi}, {bi})
    + rgb(153, 000, 000) = dark red
    + !rgb(+00,+102,+00) = dark green
    + rgb(00 , 00 , 153) = dark blue
    + rgb(255, 000, 255) = magenta
    + rgb(255, 255, 000) = yellow
    + rgb(000, 255, 255) = cyan
    + rgb{000, 255, 255} = invalid
    + argb(00, 255, 255) = invalid
    + rgb(-33, 000, 255) = invalid
    + rgb(000, 256, 255) = invalid
    + rgb(000, 250  255) = invalid
    + rgb( 000 255 255 ) = invalid
2. !rgba({ri},{gi},{bi},{ai})
    + rgba(000, 255, 000, 119) = dark green
    + rgba(255, 000, 255, 119) = dark magenta
    + rgba(255, 000, 000, 255) = red
    + rgba(000, 255, 255, 255) = cyan
3. !grba({gi}, {ri}, {bi}, {af})
    + grba(255, 000, 000, 1.0) = green
    + grba(255, 000, 000, 0.5) = dark green
    + grba(000, 255, 255, .99) = magenta
    + grba(000, 255, 255, .55) = dark magenta
    + grba(000, 255, 000, 1  ) = red
    + grba(255, 000, 255, 001) = cyan
    + grba(255, 000, 255, -1)  = invalid
    + grba(255, 000, 255, 1.1) = invalid
    + grba(255, 000, 255, 100) = invalid
4. !abc({bi},{ri},{gi})
    +  abc(000,255,000) = red
    + ?abc(255, 00,255) = cyan
    + =abc( 255 , 0,0 ) = blue
    + :abc( 0 ,255,255) = yellow
5. 123{{ri} ,{gi} ,{bi} }
    +  123{000,255,000} = dark green
    + a123{155, 00,155} = dark magenta
    + ?123{ 255 , 0,0 } = red
    +  123{ 0 ,255,255} = cyan
6. xyz({ri:0~100},{gi:0~360},{bi})
    +  xyz(000,222,000) = dark green
    + axyz( 66, 00,155) = dark magenta
    + ?xyz( 099 , 0,0 ) = red
    +  xyz( 0 ,355,255) = cyan
7. !qwerty( {ri} , {bi} , {gi} )
    + qwerty(000,255,000)   = blue
    + qwerty(255, 00,255)   = yellow
    + qwerty( 255 , 0 , 0 ) = red
    + qwerty( 0 ,255,255)   = cyan

#### HSL

1. !hsl({hi:0~360}, {si}, {li})
    + hsl(216, 000, 000) = black
    + hsl(000, 255, 069) = dark red
    + hsl(000, 102, 000) = black
    + hsl(120, 255, 051) = dark green
    + hsl(000, 000, 153) = gray
    + hsl(240, 255, 084) = dark blue
    + hsl(360, 000, 255) = white
    + hsl(288, 255, 102) = dark magenta
    + hsl(360, 255, 000) = black
    + hsl(048, 255, 135) = orange (more yellow)
    + hsl(000, 255, 255) = white
    + hsl(192, 255, 135) = light blue
2. !hsl({hi}, {si}, {li})
    + hsl(000, 255, 069) = dark red
    + hsl(84 , 255, 051) = dark green
    + hsl(171, 255, 084) = dark blue
    + hsl(204, 255, 102) = dark magenta
    + hsl( 32, 255, 135) = orange (more yellow)
    + ??hsl(136,255,135) = light blue
3. !sxlxh({si}, {li}, {hi})
    + sxlxh(255, 069, 00) = dark red
    + sxlxh(255, 051, 84) = dark green
    + sxlxh(255, 084,171) = dark blue
    + sxlxh(255, 102,204) = dark magenta
    + sxlxh(255, 135, 32) = orange (more yellow)
    + sxlxh(255, 135,136) = light blue
4. shl({si}, {hi}, {li})
    +  shl(255, 00, 069) = dark red
    +  shl(255, 84, 051) = dark green
    + ashl(255,166, 84 ) = dark blue
    + :shl(255,204, 135) = dark magenta
    +  shl(255, 32, 135) = orange (more yellow)
    + _shl(255,135, 135) = light blue

### Float

#### RGBA

1. !rgb({rf}, {gf}, {bf})
    + rgb(0.6, 0.0, 0.0) = dark red
    + !!rgb(0.0,0.4,0.0) = dark green
    + rgb( 0 , 0  , 0.6) = dark blue
    + rgb(0.9, 0.0, 0.9) = magenta
    + rgb(+0.78,+1,-0)   = yellow (more green)
    + ??????rgb(0, 1, 1) = cyan
    + argb(0.0, 1.0, 1.0)= invalid
    + rgb(-1, 0.0, 1.0)  = invalid
    + rgb(0.0, 1.1, 1.0) = invalid
    + rgb(0.0, 0.9  1.0) = invalid
2. !rgba({rf}, {gf}, {bf}, {af})
    + rgba(0, 1, 0, 0.5) = dark green
    + rgba(1, 0, 1, +.5) = dark magenta
    + rgba(1, 0, 0, 1)   = red
    + rgba(0, 1, 1, 1)   = cyan
3. !abc({bf},{rf},{gf})
    +  abc(0,1,0) = red
    + ?abc(1,0,1) = cyan
    + =abc(1,0,0) = blue
    + :abc(0,1,1) = yellow

#### HSL

1. !hsl({hf:1.0~2}, {sf}, {lf})
    + hsl(1.6, 0.0, 0.0) = black
    + hsl(1.0, 1, 0.27)  = dark red
    + hsl(1.0, 0.4, 0.0) = black
    + hsl(1.333, 1, 0.2) = dark green
    + hsl(1.0, 0, 0.6)   = gray
    + hsl(1.66, 1, 0.33) = dark blue
    + hsl(2, 0, 1)       = white
    + hsl(1.8, 1, 0.53)  = dark magenta
    + hsl(1, 1, 0.0)     = black
    + hsl(1.13, 1, 0.53) = orange (more yellow)
    + hsl(1.0, 1, 1.00)  = white
    + hsl(1.53, 1, 0.529) = light blue
2. !sxlxh({sf}, {lf}, {hf})
    + sxlxh(1, 0.27, .00) = dark red
    + sxlxh(1, 0.20, .33) = dark green
    + sxlxh(1, 0.33, .67) = dark blue
    + sxlxh(1, 0.53, .80) = dark magenta
    + sxlxh(1, 0.53, .13) = orange (more yellow)
    + sxlxh(1, 0.53, .53) = light blue

### Percentage

#### RGBA

1. !rgb({r%}, {g%}, {b%})
    + rgb(60%, 0%, 0%)    = dark red
    + !rgb(0.0%,40.5%,0%) = dark green
    + rgb( 0% , 0% , 60%) = dark blue
    + rgb(90%, 0%, 90%)   = magenta
    + rgb(+78%,+100%,-0%) = yellow (more green)
    + rgb(0%, 100%, 100%) = cyan
    + argb(0%, 100%, 100%)  = invalid
    + rgb(-1%, 0%, 1%)      = invalid
    + rgb(0%, 1%, 101%)     = invalid
    + rgb(0%, 9%  1%)       = invalid
2. !rgba({r%}, {g%}, {b%}, {a%})
    + rgba(000%, 100%, 000%,  50%) = dark green
    + rgba(100%, 000%, 100%, +50%) = dark magenta
    + rgba(100%, 000%, 000%, 100%)  = red
    + rgba(000%, 100%, 100%, 100%)  = cyan
3. !abc({b%},{r%},{g%})
    +  abc(000%,100%,000%) = red
    + ?abc(100%,000%,100%) = cyan
    + =abc(100%,000%,000%) = blue
    + :abc(000%,100%,100%) = yellow

#### HSL

1. !hsl({h%:100~200}, {s%},{l%})
    + hsl(100%, 100%, 27%) = dark red
    + hsl(133.3%,100%, 20%)= dark green
    + hsl(166%, 100%, 33%) = dark blue
    + hsl(180%, 100%, 40%) = dark magenta
    + hsl(113%, 100%, 53%) = orange (more yellow)
    + hsl(153%, 100%, 53%) = light blue
2. !sxlxh({s%}, {l%}, {h%})
    + sxlxh(100%, 27%, 00%) = dark red
    + sxlxh(100%, 20%, 33%) = dark green
    + sxlxh(100%, 33%, 67%) = dark blue
    + sxlxh(100%, 53%, 80%) = dark magenta
    + sxlxh(100%, 53%, 13%) = orange (more yellow)
    + sxlxh(100%, 53%, 53%) = light blue

### Mixed (i/f/%)

1. !rgb({rf%}, {gif}, {bi%})
    + rgb(60%, 0, 0)     = dark red
    + !!!rgb(0,0.4,0%)   = dark green
    + rgb(0.1 , 0 , 153) = dark blue
    + rgb(0.9, 0, 90%)   = magenta
    + rgb(+78%,+1.0,+0%) = yellow (more green)
    + rgb(0%, 255, 100%) = cyan
    + argb(0%, 100%, 1)    = invalid
    + rgb(2, -1, 1%)       = invalid
    + rgb(0, 1, 101%)      = invalid
    + rgb(0%, 9%, 1%)      = invalid
2. !rgb({rif%}, {gif%}, {bif%})
    + rgb(153, 0, 0)     = dark red
    + rgb(0.1,0.6,0.1)   = dark green
    + rgb( 10%, 0%, 60%) = dark blue
    + rgb(222, 0.1, 90%) = magenta
    + rgb(+0.78,+100%,+0)= yellow (more green)
    + rgb(0%, 255, 1.0)  = cyan
    + argb(0%, 100%, 1)    = invalid
    + rgb(2, -1, 1%)       = invalid
    + rgb(0, 1, 101%)      = invalid
    + rgb(0%, 9%, 1.1)     = invalid

## Other features

### settings

1. settings description
2. file filter
3. language filter
4. click title of picker: switches to next label
5. float precision init as 2 and increasing to the precision of the color being picked

### package.json

1. update version

### CHANGELOG.md

1. add changelog
