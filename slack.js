"use strict";
const request = require('request')

class Slack {

  constructor(uri) {
    this.uri = uri;
  }

  post(title, text){
    this.options = {
      uri: this.uri,
      headers: {
        'Content-Type': 'application/json'
      },
      json: {
        attachments: [{
          fallback: "最寄りの産婦人科情報",
          color: '#ED225D',
          title: title,
          fields: [{
            "value": text,
            "short": false
          }]
        }]
      }
    };
    request.post(this.options, function (error, response, body) {
      if (error || response.statusCode != 200) {
        console.error('error: ' + response.statusCode + '\n' + response.body);
      } else {
        console.log(body);
      }
    });
  }

};

module.exports = Slack;