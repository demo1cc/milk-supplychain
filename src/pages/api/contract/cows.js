import Web3 from "web3";

// import userABI from "@/sol/abis/UserABI";
import cowABI from "@/sol/abis/CowABI";

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://${process.env.NETWORK}.infura.io/v3/${process.env.INFURA_KEY}`,
  ),
);

const contractAddress = "0xc53096c3F2A36413bFC1DD61B963614d9902f627";

const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.PRIVATE_KEY
);

web3.eth.accounts.wallet.add(signer);

const contract = new web3.eth.Contract(
    cowABI,
    contractAddress,
);

// console.log(signer);
import bigIntReplacer from "@/utils/bigIntReplacer";

export default async function handler(req, res) {

    switch (req.method ) {
        case "GET":
            const cows =  await contract.methods.getCows(process.env.PUBLIC_KEY).call()
            const jsonString = JSON.stringify(cows, bigIntReplacer);
            res.status(200).send(jsonString);
            
            break

        
        case "POST":
            let cowData = {
                _id: req.body._id ? req.body._id:"",
                farmerId:req.body.farmerId ? req.body.farmerId: "",
                cowNumber:req.body.cowNumber ? req.body.cowNumber: "",
                food:req.body.food ? req.body.food: "",
                milkingSystem:req.body.milkingSystem ? req.body.milkingSystem: "",
                breed:req.body.breed ? req.body.breed: "", 
                age:req.body.age ? req.body.age: "",
            }
            const method_abi = contract.methods.createCow(
                cowData._id,
                cowData.farmerId,
                cowData.cowNumber,
                cowData.food,
                cowData.milkingSystem,
                cowData.breed,
                cowData.age
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