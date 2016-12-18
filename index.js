"use strict";

// コマンドライン引数の取得
const argv = process.argv;
if (argv.length < 6) {
  console.log(
    "\n",
    "Usage: sudo node", argv[1], "[longitude] [latitude] [max_distance](meter) [dashbutton_mac_address]\n",
    "Example) sudo node" , argv[1], "35.670000 139.76000000 50000 88:71:e5:3f:34:b4\n\n",
    "・You must set GLOCATION_KEY and SLACK_WEBHOOK_URL.\n",
    "・You can use of node_modules/node-dash-button/bin/findbutton to specify your dash button.\n\n",
    "To get more information, please check README.md out."
  );
  process.exit(0);
}

const lon = argv[2];
const lat = argv[3];
const maxDist = argv[4];
const dashButtonAddr = argv[5];

// Dashボタンの設定
const dash_button = require('node-dash-button');
let dash;
try {
  dash = dash_button('88:71:e5:3f:34:b0', null, null, 'all');
}
catch (e) {
  console.error("エラー: Dash ButtonのMACアドレスが不正です\n");
  process.exit(1);
}
console.log("ボタン押下を待っています…");

// Google Location APIの設定
const GLocation = require('./g_location.js');
const gLocation = new GLocation(
  process.env.GLOCATION_KEY,
  "産婦人科",
  lon,
  lat,
  maxDist
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
