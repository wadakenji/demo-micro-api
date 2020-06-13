const models = require('./models')
const samples = require('./samples')

//dev環境でなければ終了
if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') return

//テーブルを作成する
models.sequelize.sync({
  force: true

}).then(async () => { //サンプルデータを挿入する
  for (let [key, value] of Object.entries(samples)) {

    //連結オプションを作成する
    const include = Object.entries(models[key].associations).map(([k, v]) => ({model: v.target}))

    //データをインサートする
    await models[key].bulkCreate(value, {include})
  }

  //接続を閉じる
}).then(() => models.sequelize.close())
