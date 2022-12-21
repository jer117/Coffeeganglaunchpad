import { calculateFee, coins, GasPrice } from "@cosmjs/stargate";
import log from "loglevel";
import { allRaritiesUrl, metaUrl, rarityUrl, thumbUrl } from "./UrlHelper";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";



class NftHelper {
  config;
  signingClient;
  readOnlyClient;
  limit = 30;
  constructor({ client, offlineSigner, readOnlyClient }, config) {
    // console.log(client);
    this.offlineSigner = offlineSigner;
    this.signingClient = client;
    this.readOnlyClient = readOnlyClient;
    this.config = config;
  }

  getAllRarities = async () => {
    const r = await window.fetch(allRaritiesUrl());
    return await r.json();
  };

  // Load files from AWS
  getNftData = async (tokenId) => {
    const rarityP = await window.fetch(rarityUrl(tokenId));
    const metaP = await window.fetch(metaUrl(tokenId));

    const rarity = await rarityP.json();
    const meta = await metaP.json();

    return {
      tokenId,
      imageUrl: thumbUrl(tokenId),
      rarity,
      meta,
      total: this.config.totalNumMints,
    };
  };

  // Get chain info
  getTokenInfo = async (tokenId) => {
    const tokenQuery = await this.readOnlyClient.queryContractSmart(
      this.config.sg721,
      {
        all_nft_info: { token_id: tokenId },
      }
    );
    console.log(tokenQuery);
    return tokenQuery;
  };

  // https://github.com/public-awesome/stargaze-contracts/blob/main/contracts/sg721/schema/query_msg.json
  getProgress = async () => {
    const tokenQuery = await this.readOnlyClient.queryContractSmart(
      this.config.sg721,
      {
        num_tokens: {},
      }
    );
    return {
      minted: tokenQuery.count,
      total: this.config.totalNumMints,
    };
  };

  getMyMintedTokens = async (accountId, startAfter) => {
    const q = {
      tokens: {
        owner: accountId,
        limit: this.limit,
      },
    };
    if (startAfter) {
      q.tokens.start_after = startAfter;
    }

    const { tokens } = await this.signingClient.queryContractSmart(
      this.config.sg721,
      q
    );

    return tokens;
  };

  getMyMintedRockets = async (accountId, startAfter) => {
    const q = {
      tokens: {
        owner: accountId,
        limit: this.limit,
      },
    };
    if (startAfter) {
      q.tokens.start_after = startAfter;
    }

    const { tokens } = await this.signingClient.queryContractSmart(
      this.config.sg721Rockets,
      q
    );

    return tokens;
  };

  getMyMintedFuels = async (accountId, startAfter) => {
    const q = {
      tokens: {
        owner: accountId,
        limit: this.limit,
      },
    };
    if (startAfter) {
      q.tokens.start_after = startAfter;
    }

    const { tokens } = await this.signingClient.queryContractSmart(
      this.config.sg721Fuels,
      q
    );

    return tokens;
  };

  getAllMintedTokens = async (accountId, startAfter) => {
    const q = {
      all_tokens: {
        owner: accountId,
        limit: this.limit,
      },
    };
    if (startAfter) {
      q.all_tokens.start_after = startAfter;
    }
    // console.log("getAllMintedTokens", q);
    const { tokens } = await this.readOnlyClient.queryContractSmart(
      this.config.sg721,
      q
    );
    return tokens;
  };

  mintSender = async () => {
    const offlineSigner = window.getOfflineSigner(this.config.chainId);
    const accounts = await offlineSigner.getAccounts();

    const MINT_FEE = coins(this.config.mintPriceStars * 1000000, "ustars");

    const gasPrice = GasPrice.fromString("0ustars");
    const executeFee = calculateFee(300_000, gasPrice);
    const msg = {approve: {spender: this.config.account, token_id:'3'}};

    const client = await SigningCosmWasmClient.connectWithSigner(
      this.config.rpcEndpoint,
      offlineSigner
  )

    const result = await client.execute(
      accounts[0].address,
      this.config.sg721,
      msg,
      executeFee,
    );

    /*// This is pure hack, not sure why my other client isn't working.
    const { client } = await KeplrClient(this.config);
    const result = await client.execute(
      accounts[0].address,
      this.config.sg721,
      msg,
      executeFee,
    );*/
    const wasmEvent = result.logs[0].events.find((e) => e.type === "wasm");
    const tokenId = wasmEvent.attributes.find((a) => a.key === "token_id");
    log.debug(`Burned token id:${tokenId.value}`);
    return tokenId.value;
  };

  approveRocket = async (rocketId) => {
    const offlineSigner = window.getOfflineSigner(this.config.chainId);
    const accounts = await offlineSigner.getAccounts();
    const gasPrice = GasPrice.fromString("0ustars");
    const executeFee = calculateFee(300_000, gasPrice);
    const msg = {approve: {spender: this.config.account, token_id:rocketId}};

    const client = await SigningCosmWasmClient.connectWithSigner(
      this.config.rpcEndpoint,
      offlineSigner
  )

    const result = await client.execute(
      accounts[0].address,
      this.config.sg721Rockets,
      msg,
      executeFee,
    );

    const wasmEvent = result.logs[0].events.find((e) => e.type === "wasm");
    const tokenId = wasmEvent.attributes.find((a) => a.key === "token_id");
    log.debug(`Approved token id:${tokenId.value}`);
    return "ROCKETAPPROVED" + tokenId.value;
  };

  approveFuel = async (fuelId) => {
    const offlineSigner = window.getOfflineSigner(this.config.chainId);
    const accounts = await offlineSigner.getAccounts();
    const gasPrice = GasPrice.fromString("0ustars");
    const executeFee = calculateFee(300_000, gasPrice);
    const msg = {approve: {spender: this.config.account, token_id:fuelId}};

    const client = await SigningCosmWasmClient.connectWithSigner(
      this.config.rpcEndpoint,
      offlineSigner
  )

    const result = await client.execute(
      accounts[0].address,
      this.config.sg721Fuels,
      msg,
      executeFee,
    );

    const wasmEvent = result.logs[0].events.find((e) => e.type === "wasm");
    const tokenId = wasmEvent.attributes.find((a) => a.key === "token_id");
    log.debug(`Approved token id:${tokenId.value}`);
    return "FUELAPPROVED" + tokenId.value;
  };

  transmuteToken = async (rocketIdBurn, fuelIdBurn) => {

  const offlineSigner = window.getOfflineSigner(this.config.chainId);
  const accounts = await offlineSigner.getAccounts();
  const starsRecipient = accounts[0].address;
  const msg = { mint_to: { recipient: starsRecipient } };

  const getJSON = async (url) => {
      const response = await fetch(url);
      if(!response.ok) // check if response worked (no 404 errors etc...)
        throw new Error(response.statusText);

      const data = response.json(); // get JSON from the response
      return data; // returns a promise, which resolves to this data value
    }

  const getText = async (url) => {
      const response = await fetch(url);
      if(!response.ok) // check if response worked (no 404 errors etc...)
        throw new Error(response.statusText);

      const data = response.text(); // get text from the response
      return data; // returns a promise, which resolves to this data value
    }

  let pfpMinter = null;
  pfpMinter = this.config.minterHumans;


  console.log('pfpMinter =',pfpMinter);
  const urlParams = "&starsAddress=" + starsRecipient + "&pfpMinter=" + pfpMinter;
  console.log('urlParams =', urlParams);
  const result4 = urlParams
  console.log('result4 =',result4);
  return result4;

  /* const result = await client.execute(
    "stars1dqf384y0f3epc9mldqpgwklxvylxu8qulvynnn",
    pfpMinter,
     msg,
     'auto',
     'memo'
   );

  const result2 = await client.execute(
  "stars1dqf384y0f3epc9mldqpgwklxvylxu8qulvynnn",
  this.config.sg721Fuels,
  { burn: { token_id: fuelIdBurn } },
   'auto',
   'memo'
 );

  const result3 = await client.execute(
  "stars1dqf384y0f3epc9mldqpgwklxvylxu8qulvynnn",
  this.config.sg721Rockets,
  { burn: { token_id: rocketIdBurn } },
   'auto',
   'memo'
 ); */

 /*// This is pure hack, not sure why my other client isn't working.
 const { client } = await KeplrClient(this.config);
 const result = await client.execute(
   accounts[0].address,
   this.config.sg721,
   msg,
   executeFee,
 );
 const wasmEvent = result.logs[0].events.find((e) => e.type === "wasm");
 const tokenId = wasmEvent.attributes.find((a) => a.key === "token_id");
 log.debug(`Burned token id:${tokenId.value}`);
 return tokenId.value;

*/


  };


}

export default NftHelper;
