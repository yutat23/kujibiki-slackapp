function doPost(e) {
  try {
    // リクエストからパラメータを解析
    var params = e.parameter.text.split(" ");
    var numberOfDraws = parseInt(params[0]); // くじを引く回数
    var candidates = params.slice(1).join(" ").split(","); // くじ候補者のリスト

    // フォーマットの検証
    if (isNaN(numberOfDraws) || candidates.length === 0 || params.length < 2) {
      throw new Error("Invalid format");
    }

    // 候補者からランダムに選ぶ
    var winners = drawLottery(candidates, numberOfDraws);

    // Slackへの応答メッセージを作成
    var response = {
      "response_type": "in_channel",
      "text":"くじびきの結果: " + winners.join(", ")
      };
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // エラーログを記録
    console.error("Error in doPost: " + error.message);
    return ContentService.createTextOutput(JSON.stringify({}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function drawLottery(candidates, numberOfDraws) {
  var winners = [];
  for (var i = 0; i < numberOfDraws; i++) {
    if (candidates.length === 0) {
      break; // 候補者がいなくなったら終了
    }
    var index = Math.floor(Math.random() * candidates.length);
    winners.push(candidates[index]);
    candidates.splice(index, 1); // 選ばれた候補者をリストから削除
  }
  return winners;
}

function doPostTest() {
  //eの作成
 var e = {
    parameter : {
        text : "2 aaa,bbb,ccc,ddd,eee"
    }
 };
 doPost(e);
}