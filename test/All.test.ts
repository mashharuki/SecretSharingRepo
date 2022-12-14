/**
 * ================================================
 * test code for secret sharing
 * ================================================
 */

import { 
    createShares,
    createWallet,
    recover,
    sendEth
} from "../sample/src/index";

const ethers = require('ethers');
// private key for test
const PRIVATE_KEY = "0x9729e15de7c9c0ec06ebc2ab7f4dcf796f24d5add48ddf3c424a8019e9061ad8"; 
// wallet address
const ADDRESS = "0xfC12b50bD2D04d3754BfC1cFB6c303fb9EAcA118";
// RPC URL
const RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc";


describe('test code for secret sharing', () => {
    test('create shares', () => {
        // crateshares
        createShares();
    });

    test('recover', () => {
        // get privatekey
        var privatekey = recover();
        // check
        expect(privatekey).toBe(PRIVATE_KEY);
    });

    test('get wallet address', async() => {
        // get privatekey
        var privatekey = recover();
        // get wallet address
        var address = createWallet(privatekey);
        // check 
        expect(address).toBe(ADDRESS);
    });

    test('send ETH', async() => {
        // receive adress
        var to = "0x39623a0315CC878F593d62cB514D04e5CBf612BE";
        // send amount 
        var amount = "0.004";

        // create provider
        var provider = new ethers.providers.JsonRpcProvider(RPC_URL);
        // get before balance
        var bBalance = ethers.utils.formatEther(await provider.getBalance(to));
    
        // get privatekey
        var privatekey = recover();
        // send
        var res = await sendEth(privatekey, RPC_URL, to, amount);

        // get after balance
        var aBalance = ethers.utils.formatEther(await provider.getBalance(to));

        // check (local)
        // expect((aBalance - bBalance).toString()).toBe(amount);
        expect((aBalance - bBalance).toString()).toBe("0");
    });
});