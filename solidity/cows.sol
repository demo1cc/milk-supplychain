// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;
// pragma experimental ABIEncoderV2;


contract CowManagement {
    // Struct to represent a cow
    struct Cow {
        string _id; // Custom identifier
        string farmerId; // Reference to farmer's ID
        string food;
        string milkingSystem;
        string breed;
        uint256 age;
        uint256 created;
        uint256 updated;
    }

    // Mapping to store cow data by a unique cow ID
    mapping(string => Cow) public cows;

    // Event to log cow creation
    event CowCreated(string indexed _id, string indexed farmerId, string food, string milkingSystem, string breed, uint256 age, uint256 created);

    // Function to create a new cow
    function createCow(
        string memory _id,
        string memory _farmerId,
        string memory _food,
        string memory _milkingSystem,
        string memory _breed,
        uint256 _age
    ) public {
        Cow storage newCow = cows[_id];

        newCow._id = _id;
        newCow.farmerId = _farmerId;
        newCow.food = _food;
        newCow.milkingSystem = _milkingSystem;
        newCow.breed = _breed;
        newCow.age = _age;
        newCow.created = block.timestamp;
        newCow.updated = block.timestamp;

        emit CowCreated(_id, _farmerId, _food, _milkingSystem, _breed, _age, block.timestamp);
    }

    // Function to get cow details by cow ID
    function getCowDetails(string memory _id) public view returns (string memory, string memory, string memory, string memory, uint256) {
        Cow storage currentCow = cows[_id];
        return (currentCow.farmerId, currentCow.food, currentCow.milkingSystem, currentCow.breed, currentCow.age);
    }

    // Function to update cow details by cow ID
    function updateCowDetails(string memory _id, string memory _food, string memory _milkingSystem, string memory _breed, uint256 _age) public {
        Cow storage currentCow = cows[_id];

        currentCow.food = _food;
        currentCow.milkingSystem = _milkingSystem;
        currentCow.breed = _breed;
        currentCow.age = _age;
        currentCow.updated = block.timestamp;
    }

    // Function to delete cow by cow ID
    function deleteCow(string memory _id) public {
        // Delete the cow data
        delete cows[_id];
    }
}
