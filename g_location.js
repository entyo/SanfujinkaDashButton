"use strict";

class GLocation {

  constructor(key, query, lon, lat, radius, sortBy) {

    this.url = "https://maps.googleapis.com/maps/api/place/textsearch/json?"
                + "key=" + key                          // APIキー
                + "&query=" + encodeURIComponent(query) // 検索文字列
                + "&location=" + lon + ',' + lat        // (緯度, 経度)
                + "&radius=" + radius                   // [メートル]
                + "&opennow";                           // 営業中
                
  }
  
  get() {
    const url = this.url;
    console.log(url);
    return new Promise(function (resolve, reject) {
      const request = require('request');
      request.get(url, function (error, res) {
        if (error) {
          reject(new Error(error));
        }
        if (res.statusCode === 200) {
          resolve(res.body);
        }
        else {
          reject(new Error(res.statusCode));
        }
      }).on('error', function(e) {
        reject(new Error(e.message));
      });
    })
  }

}

module.exports = GLocation;