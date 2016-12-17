"use strict";
const request = require('request')

class GLocation {

  constructor(key, query, lon, lat, radius, sortBy) {

    this.url = "https://maps.googleapis.com/maps/api/place/textsearch/json?"
                + "key=" + key
                + "&query=" + encodeURIComponent(query)
                + "&location=" + lon + ',' + lat // [緯度, 経度]
                + "&radius=" + radius; // [メートル]
                + "&rankby=" + sortBy // prominence(重要度) / distance(近い順)
                
  }

  get() {
    request.get(this.url, function (error, response, body) {
      if (error || response.statusCode != 200) {
        console.error('error: ' + response.statusCode + '\n' + response.body);
      } else {
        console.log(body);
      }
    });
  }

}

module.exports = GLocation;