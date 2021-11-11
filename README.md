# AIIT cloud server front

クラウドサーバ構築特論で使うフロントエンド実装です。

## Requirements
- nodejs
- npm

## Installation
```shell
npm install
```

## Usage
### Develop
```shell
npm run start
```

を実行すると、 http://localhost:8080 で実行結果を見られます。

### Production
```shell
npm run prod
```

を実行後、 `public/index.html` と、生成された `public/bundle.js` をサーバにアップロードしてください。
