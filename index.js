"use strict";
const dash_button = require('node-dash-button');
const Slack = require('./slack.js');
const GLocation = require('./g_location.js');

// DashボタンのMACアドレス
const dash = dash_button('88:71:e5:3f:34:b0', null, null, 'all');

const gLocation = new GLocation(
    process.env.GLOCATION_KEY,
    "産婦人科",
    "35.6766071",
    "139.7605659",
    "50000",
    "distance"
);

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
      slack = new Slack(
        process.env.SLACK_WEBHOOK_URL, 
        "Google Places API のレスポンスのパースに失敗しました。", 
        e
      );
      slack.post();
    }
    // Slackに産婦人科情報をPOSTする
    let slack;
    try {
      slack = new Slack(
        process.env.SLACK_WEBHOOK_URL, 
        place["name"], 
        place["formatted_address"]
      );
    }
    catch (e) {
      slack = new Slack(
        process.env.SLACK_WEBHOOK_URL, 
        "営業中の産婦人科の取得に失敗しました…", 
        "近くに産婦人科がないか、近くの産婦人科は営業を終了しています。"
      );
    }
    slack.post();
  }).catch(function onRejected(error){
    slack = new Slack(
      process.env.SLACK_WEBHOOK_URL, 
      "Google Places API関係のエラーが発生しました。", 
      error
    );
  });

});
