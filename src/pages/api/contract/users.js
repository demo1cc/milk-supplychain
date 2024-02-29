import Web3 from "web3";

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://${process.env.NETWORK}.infura.io/v3/${process.env.INFURA_KEY}`,
  ),
);

const contractAddress = "";

const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.PRIVATE_KEY
);

web3.eth.accounts.wallet.add(signer);

const contract = new web3.eth.Contract(
    abi,
    contractAddress,
);

// console.log(signer);

export default async function handler(req, res) {

    switch (req.method ) {
        case "GET":
            res.status(200).send('Get Method Called'); 
        
        case "POST":
            res.status(200).send('Post Method Called');

    }
}