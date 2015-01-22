
    var R = 6378137,
        sphericalScale = 0.5 / (Math.PI * R);

    module.exports = function(bounds, minZoom, maxZoom) {

      var min,
          max,
          tiles = [];

      if (!maxZoom) {
        max = min = minZoom;
      } else if (maxZoom < minZoom) {
        min = maxZoom;
        max = minZoom;
      } else {
        min = minZoom;
        max = maxZoom;
      }

      for (var z = min; z <= max; z++) {
        tiles = tiles.concat(xyz(bounds,z));
      }

      return tiles;

    };

    /* Adapted from: https://gist.github.com/mourner/8825883 */
    function xyz(bounds, zoom) {


          //north,west
      var min = project(bounds[1][1],bounds[0][0], zoom),
          //south,east
          max = project(bounds[0][1],bounds[1][0], zoom),
          tiles = [];

      for (var x = min.x; x <= max.x; x++) {
        for (var y = min.y; y <= max.y; y++) {
            tiles.push({
              x: x,
              y: y,
              z: zoom
            });
        }
      }

      return tiles;

    }

    /* 
       Adapts a group of functions from Leaflet.js to work headlessly
       https://github.com/Leaflet/Leaflet
       
       Combines/modifies the following methods:
       L.Transformation._transform (src/geometry/Transformation.js)
       L.CRS.scale (src/geo/crs/CRS.js)
       L.CRS.latLngToPoint (src/geo/crs/CRS.js)
       L.Projection.SphericalMercator.project (src/geo/projection/Projection.SphericalMercator.js)
    */
    function project(lat,lng,zoom) {
      var d = Math.PI / 180,
          max = 1 - 1E-15,
          sin = Math.max(Math.min(Math.sin(lat * d), max), -max),
          scale = 256 * Math.pow(2, zoom);

      var point = {
        x: R * lng * d,
        y: R * Math.log((1 + sin) / (1 - sin)) / 2
      };

      point.x = tiled(scale * (sphericalScale * point.x + 0.5));
      point.y = tiled(scale * (-sphericalScale * point.y + 0.5));

      return point;
    }

    function tiled(num) {
      return Math.floor(num/256);
    }