# Blockstack Oracle
Blockstack Oracle is a sample clarity smart contract for the Stacks Blockchain. 
The repo includes an oracle script which updates the bitcoin price using a public 
smart contract function based on the API results. This script can be run
periodically using a cron script.

## Key considerations
     
* Only the contract owner can update the oracle address using update-oracle-address public function.
     
* Only the oracle address can update the bitcoin price using update-bitcoin-price public function.

## Getting Started

1) Install npm and nodejs

2) Install cli-blockstack

   ```
   git clone https://github.com/blockstack/cli-blockstack.git
   cd cli-blockstack
   git checkout feature/stacks-2.0-tx
   npm install
   npm run build
   npm link blockstack
   sudo npm link
   cd ..
   ```

3) Clone blockstack_oracle Repo

   ```
   git clone https://github.com/viraja1/blockstack_oracle.git
   ```
   
4) Change directory

   ```
   cd blockstack_oracle
   ```

5) Install Packages
   
   ```
   npm install
   ```
   
6) Run tests

   ```
   npm test 
   ```

7) Create STX addresses and save keychain details for testnet   
   
   Address to deploy contract
   ```
   blockstack make_keychain -t > owner_keychain.txt
   ```
   
   Address for oracle
   ```
   blockstack make_keychain -t > oracle_keychain.txt
   ```
   
   You will need privateKey and address from both the keychain files for the further steps
   
8) Fund both the addresses using testnet faucet

   https://testnet-explorer.blockstack.org/sandbox?tab=faucet
   
9) Update addresses in contracts/oracle.clar and test/oracle.ts

   Update oracle-address and contract-owner with the value of address from owner_keychain.txt
   
10) Deploy the contract using the credentials from owner_keychain.txt

    ```
    cd contracts
    blockstack deploy_contract ./oracle.clar oracle 2000 {nonce} {privateKey} -t
    ```
    In the above command replace {privateKey} with the value from owner_keychain.txt
   
    Nonce value can be fetched from the following command
    ```
    blockstack balance {address} -t
    ```
   
    In the above command replace {address} with the value from owner_keychain.txt
    
11) Update oracle address
    
    ```
    blockstack call_contract_func {address} oracle update-oracle-address 2000 {nonce} {privateKey} -t
    ```
    
    In the above command replace {privateKey} and {address} with the value from owner_keychain.txt
   
    Nonce value can be fetched from the following command
    ```
    blockstack balance {address} -t
    ```
    
    The prompt will then ask for oracle address. Fill it with the value of address from oracle_keychain.txt
    
12) Update the env variables for oracle script based on owner_keychain.txt and oracle_keychain.txt
 
     ```
     export CONTRACT_ADDRESS={ownerAddress}
     export CONTRACT_NAME=oracle
     export STACKS_ADDRESS={oracleAddress}
     export STACKS_PRIVATE_KEY={oraclePrivateKey}
     ```
 
     In the above commands, replace {ownerAddress} with the address value from owner_keychain.txt
     and replace {oraclePrivateKey} and {oracleAddress} with the privateKey and address value from oracle_keychain.txt
     
13) Run the oracle script
    ```
    cd ..
    ./oracle_update_price.sh
    ```