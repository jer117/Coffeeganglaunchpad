#Cosmwasm smart contract
CONTRACT=stars10hm2p3ll26zkzwmm202mfdmqy0x0qaxjtqcu6y9cl45razea84hs62p5zn

# Function to check what address has an NFT at a specific time.
FindOwnerOf() {
    # create an empty array
    owner_of=()

    # loop 10 times between 1980 and 1990
    for i in {1983..1984}
    do
    # curl the website and store the result in a variable
    QUERY=$(echo '{"owner_of":{"token_id":"'$i'"}}' | base64)
    result=$(curl -s "https://rest.elgafar-1.stargaze-apis.com/cosmwasm/wasm/v1/contract/$CONTRACT/smart/$QUERY" | jq -r .data.owner)

    # add the result to the array
    owner_of+=("$result")
    done


    echo "Printing Owner."
    #Print first array.
    echo "${owner_of[@]}"

}

GetTokens() {

    # curl the website and store the result in a variable
    QUERY=$(echo '{"num_tokens":{}}' | base64)
    result=$(curl -s "https://rest.elgafar-1.stargaze-apis.com/cosmwasm/wasm/v1/contract/$CONTRACT/smart/$QUERY" | jq )
    echo "$result"

}

FindNftInfo() {

    # curl the website and store the result in a variable
    QUERY=$(echo '{"nft_info":{"token_id":"'1984'"}}' | base64)
    result=$(curl -s "https://rest.elgafar-1.stargaze-apis.com/cosmwasm/wasm/v1/contract/$CONTRACT/smart/$QUERY" | jq )

    echo "$result"

}

# Function to check what address has an NFT at a specific time.
FindTokenOwners() {
    # create an empty array
    first_snapshot=()

    # loop 10 times between 1980 and 1990
    for i in {1983..1984}
    do
    # curl the website and store the result in a variable
    QUERY=$(echo '{"all_nft_info":{"token_id":"'$i'"}}' | base64)
    result=$(curl -s "https://rest.elgafar-1.stargaze-apis.com/cosmwasm/wasm/v1/contract/$CONTRACT/smart/$QUERY" | jq -r .data.access.owner)

    # add the result to the array
    first_snapshot+=("$result")
    done

    #Print first array.
    echo "${first_snapshot[@]}"

    #Sleep for a random amount of seconds to get 2 snapshot instances then compare.
    # Generate a random number between 1 and 10
    random_number=$(expr $RANDOM % 5 + 1)

    # Pause the script for the random number of seconds
    sleep $random_number

    # Echo the sleeping time
    echo "Slept for $random_number seconds"

    # create an empty array
    second_snapshot=()

    # loop 10 times between 1980 and 1990
    for i in {1983..1984}
        do
        # curl the website and store the result in a variable
        QUERY=$(echo '{"all_nft_info":{"token_id":"'$i'"}}' | base64)
        result=$(curl -s "https://rest.elgafar-1.stargaze-apis.com/cosmwasm/wasm/v1/contract/$CONTRACT/smart/$QUERY" | jq -r .data.access.owner)

    # add the result to the array
    second_snapshot+=("$result")
    done

    # print the second array
    echo "${second_snapshot[@]}"

    # Compare elements of first snapshot with elements of second snapshot.
    for element in ${first_snapshot[@]}
        do
            for other_element in ${second_snapshot[@]}
                do
        if [ "$element" = "$other_element" ] && [ "$element" != "null" ]
        then
        echo "$element"
        fi
    done
    done

}

SendRewards() {

    # loop through the array and download the HTML content of each URL
    for elements in "${element[@]}"
    do
        # send rewards to one address.
        cmd=$(/Users/jer/Development/CoffeeGangStargaze/Coffeeganglaunchpad/bin/starsd tx bank send --yes stars1fmk9s7wpky6f0quv42lxa3p5z50p9qp98qst92 $element 1000000ustars --chain-id elgafar-1 --node https://stargaze-testnet-rpc.polkachu.com:443 --fees 50000ustars )
        if [ $? -ne 0 ]; then
            echo "$element failed to send transaction to this nft holder.."
            #Add alerting here, add a slack hook o telegram hook to inform us that reward payment failed.
        fi
    done

}

#Get number of tokens in circulation.
GetTokens

# Find all nft info for a specific token id.
FindNftInfo

# Call Find Token Owners
FindTokenOwners

#FindOwnerOf
FindOwnerOf

#Send Rewards to other wallets.
SendRewards
