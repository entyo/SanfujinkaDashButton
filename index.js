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

const slack = new Slack(
  process.env.SLACK_WEBHOOK_URL, 
  "さんふじんか", 
  "とうきょう ちよだく"
);

// ボタンをクリックしたときのアクション
// クリックしてから数秒遅延する
dash.on('detected', () => {
  gLocation.get();
  slack.post();
});
