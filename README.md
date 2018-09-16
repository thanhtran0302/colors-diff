## Colors diff

A litle library that allows you to detect the difference between 2 given colors.

For example: if you have your text color is black, and the background color is white. Then the function will just return the black color, because the difference between these 2 colors is too much to return a new one.

Otherwise, if your background and text color is the same, the function will computed the difference between 2 colors, and the `difference ratio` is 1, then the function will return a new one.

Ratio = 1, it means that 2 colors are the same. Lower the ratio is, your color will be visible.

### Usage
You have one main function, is `colorsDiff`. This function takes 4 parameters like this:

```javascript
colorsDiff(fColor, sColor, acptRatio, rplColors)
```

* `fColor` is the first color that you give to the function. This parameter can be in RGB or HEX format.
* `sColor` is the second color that you give to the function. This parameter can be in RGB or HEX format.
* `acptRatio`, you can specify the `accepted ratio`, if the function has a ratio that upper than the one you specified, the function will automacatilly pick a new color from the `rplColors` array. So that's why I highly recommaned to specify the `rplColors` array.
* `rplColors`, if the function detects a collision between 2 given colors. This one will pick a color with the lowest ratio, and return it.

**NOTE:** the returned result will be replace the `fColor` and not the `sColor`