#!/bin/bash


NONCE=$(node -pe 'JSON.parse(process.argv[1]).nonce' "$(blockstack balance $STACKS_ADDRESS -t)")
BITCOIN_PRICE_USD=$(node -pe 'JSON.parse(process.argv[1])["USD"]["15m"]' "$(curl https://blockchain.info/ticker)")
BITCOIN_PRICE_USD=${BITCOIN_PRICE_USD%.*}
echo $BITCOIN_PRICE_USD
echo $NONCE
echo $BITCOIN_PRICE_USD | (blockstack call_contract_func $CONTRACT_ADDRESS $CONTRACT_NAME update-bitcoin-price 2000 $NONCE $STACKS_PRIVATE_KEY -t)