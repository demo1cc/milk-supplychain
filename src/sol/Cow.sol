// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

contract CowCRUD {
    // Struct to represent a user
    struct Cow {
        string _id; // Custom identifier
        string farmerId;
        uint256 cowNumber;
        string food;
        string milkingSystem; // Note: This is not recommended for storing sensitive information on the blockchain
        string breed;
        uint256 age;
        uint256 created;
        uint256 updated;
    }


    // Mapping to associate Ethereum addresses with user IDs
    // mapping(address => string[]) public userAddresses;

    // Mapping to store user data by their unique user ID
    // mapping(string => User) public users;

    mapping(address => Cow[] ) public cows;


    event LogMessage(string message);


    // Event to log user creation
    event CowCreated(string indexed _id, address indexed userAddress, string farmerId, uint256 cowNumber, string milkingSystem, uint256 created);

    // Function to create a new user
    function createUser(
        string memory _id,
        string memory _farmerId,
        uint256 _cowNumber,
        string memory _food,
        string memory _milkingSystem,
        string memory _breed,
        uint256 _age
    ) public {

        address newUserAddress = msg.sender;
        // Add user ID to the mapping for the Ethereum address
        // userAddresses[newUserAddress].push(_id);
        
        Cow memory newUser = Cow({
            _id:_id,
        farmerId:_farmerId,
        cowNumber:_cowNumber,
        food: _food,
        milkingSystem: _milkingSystem,
        breed:_breed,
        age:_age,
        created: block.timestamp,
        updated: block.timestamp
        });

        cows[msg.sender].push(newUser);
        emit CowCreated(_id, newUserAddress, _farmerId, _cowNumber, _milkingSystem, block.timestamp);
    }

    // Function to get user details by user ID
    function getCows(address _owner) public view returns (Cow[] memory ){
        return cows[_owner];
    }

}
