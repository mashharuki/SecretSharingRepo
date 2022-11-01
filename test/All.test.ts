/**
 * ================================================
 * test code for secret sharing
 * ================================================
 */

import { 
    createShares,
    recover
} from "../sample/src/index";

// wallet address
const ADDRESS = "0xfC12b50bD2D04d3754BfC1cFB6c303fb9EAcA118";

describe('test code for secret sharing', () => {
    test('create shares', () => {
        // crateshares
        createShares();
    });

    test('recover', () => {
        // get address
        var address = recover();
        // check
        expect(address).toBe(ADDRESS);
    });
});