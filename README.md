# The XYZ Affair

Generates a list of x/y/z Spherical Mercator tiles based on a bounding box and a zoom level.

# Installation

    npm install xyz-affair

# Usage

```js
    var xyz = require("xyz-affair");

    var bounds = [
      [
        -0.2959442138671875, //minimum longitude (west)
        51.355060037261666, //minimum latitude (south)
      ],
      [
        0.1160430908203125, //maximum longitude (east)
        51.65424090518717 //maximum latitude (north)
      ]
    ];

    var zoom = 13; //probably between 1-19 for a typical webmap

    var tiles = xyz(bounds,zoom);
    /*
      Returns an array of x/y/z objects, like:
      [
        {
          "z": 13,
          "x": 4089,
          "y": 2718
        },
        {
          "z": 13,
          "x": 4089,
          "y": 2719
        },
        ...
      ]
    */
```

Those x/y/z coordinates can be used with standard map tile systems and URLs.

You can also supply an optional third argument to get back a list that covers multiple zoom levels:

//You'll get back tiles for zooms 13 through 18. This will be a very long list.

```js
var tiles = xyz(bounds,13,18);
```

# Credit

Made by [Noah Veltman](https://twitter.com/veltman) but [Vladimir Agafonkin](https://github.com/mourner) and other [Leaflet](https://github.com/Leaflet/Leaflet) contributors did most of the work. This just reworks certain math functions in Leaflet to be used headlessly for this purpose.