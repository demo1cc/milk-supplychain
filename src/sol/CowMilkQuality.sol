// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

contract CowMilkQualityCRUD {
    // Struct to represent a user
    struct CowMilkQuality {
        string _id; // Custom identifier
        string cowId;
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

    mapping(address => CowMilkQuality[] ) public cowMilkQualitys;


    // event LogMessage(string message);


    // Event to log user creation
    event CowMilkQualityCreated(string indexed _id, address indexed userAddress, string cowId, string quantity, uint256 created);

    // Function to create a new user
    function createData(
        string memory _id,
        string memory _cowId,
        string memory _quantity,
        string memory _temperature,
        string memory _fat,
        string memory _protein
    ) public {

        address newUserAddress = msg.sender;
        // Add user ID to the mapping for the Ethereum address
        // userAddresses[newUserAddress].push(_id);
        
        CowMilkQuality memory newData = CowMilkQuality({
            _id:_id,
            cowId:_cowId,
            quantity: _quantity,
            quality : Quality(_temperature, _fat, _protein),
            created: block.timestamp,
            updated: block.timestamp
        });

        cowMilkQualitys[msg.sender].push(newData);
        emit CowMilkQualityCreated(_id, newUserAddress, _cowId, _quantity, block.timestamp);
    }

    // Function to get user details by user ID
    function getCowMilkQualitys(address _owner) public view returns (CowMilkQuality[] memory ){
        return cowMilkQualitys[_owner];
    }
}
