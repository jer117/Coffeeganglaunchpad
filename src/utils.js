"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidHttpUrl = exports.toStars = void 0;
var cosmwasm_1 = require("cosmwasm");
var toStars = function (addr) {
    try {
        var _a = (0, cosmwasm_1.fromBech32)(addr), prefix = _a.prefix, data = _a.data;
        // limit to prefixes coin type 118, known to work with keplr
        // https://medium.com/chainapsis/keplr-explained-coin-type-118-9781d26b2c4e
        var compatiblePrefixes = ['osmo', 'cosmos', 'stars', 'regen'];
        if (!compatiblePrefixes.includes(prefix)) {
            throw new Error('Address not compatible with Keplr: ' + addr);
        }
        var starsAddr = (0, cosmwasm_1.toBech32)('stars', data);
        // wallet address length 20, contract address length 32
        if (![20, 32].includes(data.length)) {
            throw new Error('Invalid address: ' + addr + ' ' + starsAddr);
        }
        addr = starsAddr;
        return addr;
    }
    catch (e) {
        throw new Error('Invalid address: ' + addr + ',' + e);
    }
};
exports.toStars = toStars;
var isValidHttpUrl = function (uri) {
    var url;
    try {
        url = new URL(uri);
    }
    catch (_) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
};
exports.isValidHttpUrl = isValidHttpUrl;
