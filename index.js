const dash_button = require('node-dash-button');
const slack = require('./slack.js');

// DashボタンのMACアドレス
const dash = dash_button('88:71:e5:3f:34:b0', null, null, 'all');

// ボタンをクリックしたときのアクション
// クリックしてから数秒遅延する
dash.on('detected', () => {
  slack.post();
  // console.log("Pushed!");
});
