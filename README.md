# demo-micro-api

## サンプルデータベース作成
```$xslt
$ docker-compose exec node yarn sync
```
`/src/db/models`の内容がDBの構造として反映される。
`/src/db/samples`の内容がDBのデータとしてインサートされる。

## tsコンパイル
```$xslt
$ docker-compose exec node yarn build
```
tsファイルをコンパイル

## subscription込でdev起動
```$xslt
$ docker-compose exec node yarn subscription-dev
```
通常の`yarn dev`ではmicro-devで起動しwebsocketサーバーは立たない状態

## subscription込でstart
```$xslt
$ docker-compose exec node yarn subscription-start
```
