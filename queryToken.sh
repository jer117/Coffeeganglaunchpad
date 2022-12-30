CONTRACT=stars10hm2p3ll26zkzwmm202mfdmqy0x0qaxjtqcu6y9cl45razea84hs62p5zn
TOKEN_ID=1984

QUERY=$(echo '{"all_nft_info":{"token_id":"'$TOKEN_ID'"}}' | base64)
echo $QUERY
curl -s "https://rest.elgafar-1.stargaze-apis.com/cosmwasm/wasm/v1/contract/$CONTRACT/smart/$QUERY" | jq -r .data.access.owner


# create an empty array
results=()

# loop 10 times between 1980 and 1990
for i in {1980..1990}
do
  # curl the website and store the result in a variable
  QUERY=$(echo '{"all_nft_info":{"token_id":"'$i'"}}' | base64)
  result=$(curl -s "https://rest.elgafar-1.stargaze-apis.com/cosmwasm/wasm/v1/contract/$CONTRACT/smart/$QUERY" | jq -r .data.access.owner)

  # add the result to the array
  results+=("$result")
done

# print the array
echo "${results[@]}"
