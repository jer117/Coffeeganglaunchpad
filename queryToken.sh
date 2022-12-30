#Cosmwasm smart contract
CONTRACT=stars10hm2p3ll26zkzwmm202mfdmqy0x0qaxjtqcu6y9cl45razea84hs62p5zn

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

# Call Find Token Owners
FindTokenOwners
