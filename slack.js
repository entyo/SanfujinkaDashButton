"use strict";
const request = require('request')

class Slack {

  constructor(uri, name, address) {
    this.options = {
      uri: uri,
      headers: {
        'Content-Type': 'application/json'
      },
      json: {
        attachments: [{
          fallback: "最寄りの産婦人科情報",
          color: '#ED225D',
          title: name,
          fields: [{
            "value": address,
            "short": false
          }]
        }]
      }
    };
  }

  post(){
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