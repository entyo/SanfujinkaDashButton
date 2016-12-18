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
      if (error) {
        console.error('エラー: ' + error + '\n');
      }
      if (response.statusCode != 200) {
        console.error('エラー: Slack APIが HTTP ' + http.statusCode + "を返しました。\n");
      } 
      else {
        console.log("投稿に成功しました。\n");
      }
    });
  }

};

module.exports = Slack;