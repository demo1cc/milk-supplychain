const ABI = [
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
				"name": "cowId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "quantity",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "created",
				"type": "uint256"
			}
		],
		"name": "CowMilkQualityCreated",
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
		"name": "cowMilkQualitys",
		"outputs": [
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "cowId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "quantity",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "temperature",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fat",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "protein",
						"type": "string"
					}
				],
				"internalType": "struct CowMilkQualityCRUD.Quality",
				"name": "quality",
				"type": "tuple"
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
				"internalType": "string",
				"name": "_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_cowId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_quantity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_temperature",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fat",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_protein",
				"type": "string"
			}
		],
		"name": "createData",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "getCowMilkQualitys",
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
						"name": "cowId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "quantity",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "temperature",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "fat",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "protein",
								"type": "string"
							}
						],
						"internalType": "struct CowMilkQualityCRUD.Quality",
						"name": "quality",
						"type": "tuple"
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
				"internalType": "struct CowMilkQualityCRUD.CowMilkQuality[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export default ABI