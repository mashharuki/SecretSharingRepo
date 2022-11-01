const sss = require('shamirs-secret-sharing');
const fs = require('fs');
const ethers = require('ethers');

/**
 * create shares
 * @return shares Array of Buffer
 */
export function createShares() {
  // get Secret Key from file
  const secret = fs.readFileSync('./sample/data/privatekey.txt')
  // create shares
  const shares = sss.split(secret, { shares: 3, threshold: 2 });
  console.log("shares:", shares);

  // output
  for (var i=0; i < shares.length; i++ ) {
    fs.writeFileSync(`./sample/data/shares${i+1}.txt`, shares[i], "utf-8");
  }
}

/**
 * recovered private key
 */
 export function recover(): string {

  var shareDatas = [];

  // get shares
  const share1 = fs.readFileSync('./sample/data/shares1.txt');
  const share2 = fs.readFileSync('./sample/data/shares2.txt');
  const share3 = fs.readFileSync('./sample/data/shares3.txt');

  shareDatas.push(share1);
  shareDatas.push(share2);
  shareDatas.push(share3);
  console.log("shareDatas:", shareDatas)

  // recovered by shares
  const recovered = sss.combine(shareDatas.slice(1, 3));
  console.log("recovered:", recovered);

  // get wallet address
  var address = createWallet(recovered.toString());
  return address;
}

/**
 * create Wallet Instace
 * @parma recovered data
 * @return wallet address
 */
 export function createWallet(recovered: string): string {
  // create instance from private
  let wallet = new ethers.Wallet(recovered);
  // get wallet address
  let address = wallet.address
  return address;
}


/**
 * test code
 */
function main(): string {
  
  // create shares
  createShares();
  // recover data
  var address = recover();

  return address;
}
  
console.log(main());
