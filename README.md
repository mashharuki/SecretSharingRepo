# SecretSharingRepo
秘密分散スクリプト実装用のリポジトリです。

## 注意事項！！
このリポジトリで使用している秘密鍵は全て開発用！  
絶対に本番環境では使用しないこと！

### Typescriptファイルの動かし方

```zsh
npm run start
```

### 秘密鍵からSignerオブジェクトを生成するサンプルコード

```ts
 // ethers.js をインポート
 const ethers = require('ethers')
 
 // 秘密鍵
 let privateKey = "0x9729e15de7c9c0ec06ebc2ab7f4dcf796f24d5add48ddf3c424a8019e9061ad8"
 
 // 秘密鍵からウォレットのインスタンスを作成
 let wallet = new ethers.Wallet(privateKey)
 
 // ウォレットのアドレスを取得
 let address = wallet.address
 console.log("address:", address)
 // => 0xfC12b50bD2D04d3754BfC1cFB6c303fb9EAcA118
```

#### メモ 
ゼロ知識証明を活かした鍵管理の仕組みはどうか？？

### 参考文献
1. [blockchain-ts](https://github.com/mashharuki/blockchain-ts?organization=mashharuki&organization=mashharuki)
2. [シャミアの秘密分散による マルチシグの実装](https://block-chain.jp/others/shamir-secret-sharing/)
3. [【npm】shamirs-secret-sharing ](https://www.npmjs.com/package/shamirs-secret-sharing)
4. [TypeScript + Node.js プロジェクトのはじめかた2020](https://qiita.com/notakaos/items/3bbd2293e2ff286d9f49)
5. [Ethers Docs](https://docs.ethers.io/v5/)