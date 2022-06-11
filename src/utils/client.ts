import {
  SigningCosmWasmClient,
  DirectSecp256k1HdWallet,
  GasPrice,
} from 'cosmwasm';

const mnemonic = 'REPLACEME';

export const gasPrice = GasPrice.fromString('0ustars');

export async function getClient() {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: 'stars',
  });

  return await SigningCosmWasmClient.connectWithSigner(
    'https://rpc.double-double-1.stargaze-apis.com/',
    wallet,
    { gasPrice }
  );
}
