# demo-micro-api

## サンプルデータベース作成
```
$ docker-compose exec node yarn sync
```
`/src/db/models`の内容がDBの構造として反映される。
`/src/db/samples`の内容がDBのデータとしてインサートされる。

## tsコンパイル
```
$ docker-compose exec node yarn build
```
tsファイルをコンパイル
