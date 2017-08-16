<h1 class="big">Sass Palette Generator</h1>

This is a color generator that will create sass variables `$color-shade: rgba()` using rgba color codes. Since secondary and especially tertiary color names are not standardized I have made the naming system as follows.

#### Primary colors

* Red
* Blue
* Green

#### Secondary colors

* Magenta (Red and Blue)
* Cyan (Blue and Green)
* Yellow (Red and Green)

#### Tertiary Colors

* Rose (Red and Magenta)
* Purple (Blue and Magenta)
* Cobalt (Cyan and Blue)
* Aqua (Cyan and Green)
* Lime (Yellow and Green)
* Orange (Yellow and Red)
* Grey (Magenta, Cyan and Yellow)

#### Modifier

* Lighest
* Lighter
* Light
* Dark
* Darker
* Darkest

The color `$rose-darkest` would be three shades darker then the combination of red and magenta while `$lime-light` would be one shade lighter then yellow and green. The shades can can be changed by a modifier so that the shading can be as fine or as coarse as you wish. 

In addition to the shade modifier there is also an alpha channel modifier to create transparent shades of the same colors.

Since this is a sass variable sheet you can include it in your `style.sass` and it will not affect the size of your final compiled CSS files.
