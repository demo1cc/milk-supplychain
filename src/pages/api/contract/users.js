import Web3 from "web3";

import userABI from "@/sol/abis/UserABI";

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://${process.env.NETWORK}.infura.io/v3/${process.env.INFURA_KEY}`,
  ),
);

const contractAddress = "0xf43B7ea3fA7aE5D614395E554d391114c3B8a96e";

const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.PRIVATE_KEY
);

web3.eth.accounts.wallet.add(signer);

const contract = new web3.eth.Contract(
    userABI,
    contractAddress,
);

// console.log(signer);

export default async function handler(req, res) {

    switch (req.method ) {
        case "GET":
            const users =  await contract.methods.getUsers(process.env.PUBLIC_KEY).call()
            console.log(users[users.length - 1])
            res.status(200).send("fdfa");
            
            break
        
        case "POST":
            let userData = {
                _id: req.body._id ? req.body._id:"",
                name:req.body.name ? req.body.name: "",
                role:req.body.role ? req.body.role: "",
                mobile:req.body.mobile ? req.body.mobile: "",
                password:req.body.password ? req.body.password: "",
                email:req.body.email ? req.body.email: "", 
                address1:req.body.address1 ? req.body.address1: "",
                address2:req.body.address2 ? req.body.address2: "",
                city:req.body.city ? req.body.city: "",
                state:req.body.state ? req.body.state: "",
                pin:req.body.pin ? req.body.pin: ""
            }
            const method_abi = contract.methods.createUser(
                userData._id,
                userData.name,
                userData.role,
                userData.mobile,
                userData.password,
                userData.email,
                userData.address1,
                userData.address2,
                userData.city,
                userData.state,
                userData.pin
              ).encodeABI();
        
            const tx = {
              from: signer.address,
              to: contract.options.address,
              data: method_abi,
              value: '0',
              gasPrice: '100000000000',
            };
        
            const gas_estimate = await web3.eth.estimateGas(tx);
            tx.gas = gas_estimate;
            const signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey);
            // console.log("Raw transaction data: " + ( signedTx).rawTransaction);
        
            const receipt = await web3.eth
            .sendSignedTransaction(signedTx.rawTransaction)
            .once("transactionHash", (txhash) => {
              console.log(`Mining transaction ...`);
            //   console.log(`https://${process.env.NETWORK}.etherscan.io/tx/${txhash}`);
              res.status(200).send({
                "url": `https://${process.env.NETWORK}.etherscan.io/tx/${txhash}`
            });

              
            });
          // The transaction is now on chain!
            console.log(`Mined in block ${receipt.blockNumber}`);

            res.status(200).send('Post Method Called');
            break

    }
}