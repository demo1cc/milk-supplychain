// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

contract ProductQualityCRUD {
    // Struct to represent a user
    struct ProductQuality {
        string _id; // Custom identifier
        string centerId;
        string productName;
        string quantity;
        Quality quality;
        uint256 created;
        uint256 updated;
    }

    // Struct to represent the address
    struct Quality {
        string temperature;
        string fat;
        string protein;
    }

    // Mapping to associate Ethereum addresses with user IDs
    // mapping(address => string[]) public userAddresses;

    // Mapping to store user data by their unique user ID
    // mapping(string => User) public users;

    mapping(address => ProductQuality[] ) public ProductQualitys;


    // event LogMessage(string message);


    // Event to log user creation
    event ProductQualityCreated(string indexed _id, address indexed userAddress, string centerId, string quantity, uint256 created);

    // Function to create a new user
    function createData(
        string memory _id,
        string memory _centerId,
        string memory _productName,
        string memory _quantity,
        string memory _temperature,
        string memory _fat,
        string memory _protein
    ) public {

        address newUserAddress = msg.sender;
        // Add user ID to the mapping for the Ethereum address
        // userAddresses[newUserAddress].push(_id);
        
        ProductQuality memory newData = ProductQuality({
            _id:_id,
            centerId:_centerId,
            productName: _productName,
            quantity: _quantity,
            quality : Quality(_temperature, _fat, _protein),
            created: block.timestamp,
            updated: block.timestamp
        });

        ProductQualitys[msg.sender].push(newData);
        emit ProductQualityCreated(_id, newUserAddress, _centerId, _quantity, block.timestamp);
    }

    // Function to get user details by user ID
    function getProductQualitys(address _owner) public view returns (ProductQuality[] memory ){
        return ProductQualitys[_owner];
    }
}