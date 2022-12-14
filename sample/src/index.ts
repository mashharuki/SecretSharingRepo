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
  // create shares(3つに分割)
  const shares = sss.split(secret, { shares: 3, threshold: 2 });
  //console.log("shares:", shares);

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
  //console.log("shareDatas:", shareDatas)

  // recovered by shares
  const recovered = sss.combine(shareDatas.slice(1, 3));
  //console.log("recovered:", recovered);

  return recovered.toString();
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
  let address = wallet.address;
  return address;
}

/**
 * send ETH function
 * @parma recovered data
 * @param RPC URL
 * @param to send address
 * @param value amount of send
 * @return tx result
 */
export async function sendEth(recovered: string, rpc_url: string, to: string, value: string): Promise<any> {
  // create instance from private
  let wallet = new ethers.Wallet(recovered);
  // create provider 
  var provider = new ethers.providers.JsonRpcProvider(rpc_url);
  // connect to provider
  var signer = wallet.connect(provider);

  // crate tx data
  const tx = {
    to: to,
    value: ethers.utils.parseEther(value)
  }

  // send Tx
  var res = signer.sendTransaction(tx);
  
  return res;
}

/**
 * test code
 */
function main(): string {
  
  // create shares
  createShares();
  // recover data
  var recoverd = recover();
  // get wallet address
  var address = createWallet(recoverd.toString());

  return address;
}
  
console.log(main());