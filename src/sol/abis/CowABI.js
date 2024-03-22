const cowABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "_id",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "farmerId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "cowNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "milkingSystem",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "created",
				"type": "uint256"
			}
		],
		"name": "CowCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_farmerId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_cowNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_food",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_milkingSystem",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_breed",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "createCow",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "LogMessage",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "cows",
		"outputs": [
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "farmerId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "cowNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "food",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "milkingSystem",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "breed",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "created",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "updated",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getCows",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "_id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "farmerId",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "cowNumber",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "food",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "milkingSystem",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "breed",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "created",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "updated",
						"type": "uint256"
					}
				],
				"internalType": "struct CowCRUD.Cow[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


export default cowABI