"use strict";

// Dashボタンの設定
const dash_button = require('node-dash-button');
const dash = dash_button('88:71:e5:3f:34:b0', null, null, 'all');

// Google Location APIの設定
const GLocation = require('./g_location.js');
const gLocation = new GLocation(
    process.env.GLOCATION_KEY,
    "産婦人科",
    "35.6766071",
    "139.7605659",
    "50000"
);

// Slack APIの設定
const Slack = require('./slack.js');
const slack = new Slack(process.env.SLACK_WEBHOOK_URL);

// ボタンをクリックしたときのアクション
// クリックしてから数秒遅延する
dash.on('detected', () => {

  // Google Location APIで、近くの営業中の産婦人科情報を1件取得する
  gLocation.get().then(function onFullfilled(res){
    let place;
    try {
      let resObj = JSON.parse(res);
      place  = resObj["results"][0];
    }
    catch (e) {
      slack.post("Google Places API のレスポンスのパースに失敗しました。",
                 "近くに産婦人科がないか、近くの産婦人科が営業を終了しているかもです。");
    }
    
    // 取得成功 :)
    // Slackに産婦人科情報をPOSTする  
    slack.post(place["name"], place["formatted_address"]);

  }).catch(function onRejected(error){
    slack.post("Google Places API関係のエラーが発生しました。", error);
  });

});
