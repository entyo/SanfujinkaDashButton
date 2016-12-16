"use strict";
const request = require('request')

class Slack {
  constructor(name, address) {
    this.options = {
      uri: 'https://hooks.slack.com/services/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',
      headers: {
        'Content-Type': 'application/json'
      },
      json: {
        attachments: [
          {
            fallback: "最寄りの産婦人科情報",
            color: '#ED225D',
            title: name,
            fields: [
              {
                "value": address,
                "short": false
              }
            ]
          }
        ]
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