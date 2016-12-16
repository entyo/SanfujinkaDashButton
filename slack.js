const request = require('request')

var options = {
  uri: 'https://hooks.slack.com/services/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',
  headers: { 
    'Content-Type': 'application/json' 
  },
  json: {
    attachments: [
      {
        fallback: "最寄りの産婦人科情報",
        color: '#ED225D',
        title: '中野産婦人科医院', // name
        fields: [
          {
            "value":"日本, 〒187-0025 東京都小平市津田町１丁目４−８", // formatted address
            "short":false
          }
        ]
      }
    ]
  }
};

module.exports = {
  post: function() {
    request.post(options, function(error, response, body){
      if (error || response.statusCode != 200) {
        console.error('error: '+ response.statusCode + '\n' + response.body);
      }
      else {
        console.log(body);
      }
    });
  }
};