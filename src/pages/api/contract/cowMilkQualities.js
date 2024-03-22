import Web3 from "web3";

// import userABI from "@/sol/abis/UserABI";
import ABI from "@/sol/abis/CowMilkQualityABI";

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://${process.env.NETWORK}.infura.io/v3/${process.env.INFURA_KEY}`,
  ),
);

const contractAddress = "0x37DC3Fc973297EC7097C672C610E3A289855fBa2";

const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.PRIVATE_KEY
);

web3.eth.accounts.wallet.add(signer);

const contract = new web3.eth.Contract(
    ABI,
    contractAddress,
);

// console.log(signer);

import bigIntReplacer from "@/utils/bigIntReplacer";

export default async function handler(req, res) {

    switch (req.method ) {
        case "GET":
            const data =  await contract.methods.getCowMilkQualitys(process.env.PUBLIC_KEY).call()
            // console.log(users[users.length - 1])
            const jsonString = JSON.stringify(data, bigIntReplacer);
            res.status(200).send(jsonString);
            
            break

        
        case "POST":
            let qualityData = {
                _id: req.body._id ? req.body._id:"",
                cowId:req.body.cowId ? req.body.cowId: "",
                quantity:req.body.quantity ? req.body.quantity: "",
                temperature:req.body.temperature ? req.body.temperature: "",
                fat:req.body.fat ? req.body.fat: "",
                protein:req.body.protein ? req.body.protein: "", 
            }
            const method_abi = contract.methods.createData(
                qualityData._id,
                qualityData.cowId,
                String(qualityData.quantity),
                String(qualityData.temperature),
                String(qualityData.fat),
                String(qualityData.protein),
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