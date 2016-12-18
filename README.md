# これはなに
最寄りの産婦人科情報を教えてくれるAmazon Dash Button用botです。

[node-dash-button](https://github.com/hortinstein/node-dash-button)を使って、ボタンが押されるとGoogle Places APIを使って近くの産婦人科情報を所得し、Slack Webhook URL宛にPOSTを飛ばします。

# つかいかた
SlackのWebhook URLとGoogle Places APIのAPIキーを環境変数に保存する必要があります。

```
export GLOCATION_KEY = XXXXXX...
export SLACK_WEBHOOK_URL = XXXXX...
```
をシェルで実行するなどしておいてください。

また、環境変数とは別にコマンドライン引数を取ります。(nodejs初めて書いたんでconfig.jsonとか知らなかったです今度やっときます:bow:)

node index.jsを実行すると、
```
node index.js

Usage: sudo node /home/entyo/sanfujinka-dash-button/index.js [longitude] [latitude] [max_distance](meter) [dashbutton_mac_address]
 Example) sudo node /home/entyo/sanfujinka-dash-button/index.js 35.670000 139.76000000 50000 88:71:e5:3f:34:b4

 ・You must set GLOCATION_KEY and SLACK_WEBHOOK_URL.
 ・You can use of node_modules/node-dash-button/bin/findbutton to specify your dash button.

 To get more information, please check README.md out.
```
みたいな感じでusageが出ます。