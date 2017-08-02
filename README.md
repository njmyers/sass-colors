# Sass Color Palette Generator

This is a color-generator that will create sass variables `$color-shade` using rgba color codes. Since secondary and especially tertiary color names are not completely synchronized I have created the naming system as follows.

#### Primary colors
Red

Blue

Green

#### Secondary colors
Magenta (Red and Blue)

Cyan (Blue and Green)

Yellow (Red and Green)

#### Tertiary Colors
Rose (Red and Magenta)

Purple (Blue and Magenta)

Cobalt (Cyan and Blue)

Aqua (Cyan and Green)

Lime (Yellow and Green)

Orange (Yellow and Red)

#### Modifier
Lighest

Lighter

Light

Dark

Darker

Darkest

So $lime-lightest would be three shades lighter then the absolute combination of yellow and green. The shades can can be changed by a modifier so that the shading can be as fine or as coarse as you wish. In addition to the shade modifier there is also an alpha channel modifier to create transparent shades of the same colors. Since this is basically a Sass variable sheet there is no reason not to create your very own sheet and include it in your files as it will not affect the size of your final compiled CSS files.