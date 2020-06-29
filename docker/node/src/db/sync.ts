import db from './'
import samples from './samples'

//dev環境でなければ終了
if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') process.exit()

//テーブルを作成する
db.sync({
  force: true

}).then(async () => { //サンプルデータを挿入する
  for (let [key, value] of Object.entries(samples)) {

    //連結オプションを作成する
    const include = Object.entries(db.model(key).associations).map(([_, v]) => v.as)

    //データをインサートする
    await db.model(key).bulkCreate(value, {include})
  }

  //接続を閉じる
}).then(() => db.close())
