CONTRACT=stars10hm2p3ll26zkzwmm202mfdmqy0x0qaxjtqcu6y9cl45razea84hs62p5zn
TOKEN_ID=1984

QUERY=$(echo '{"all_nft_info":{"token_id":"'$TOKEN_ID'"}}' | base64)
echo $QUERY
curl -s "https://rest.elgafar-1.stargaze-apis.com/cosmwasm/wasm/v1/contract/$CONTRACT/smart/$QUERY"
