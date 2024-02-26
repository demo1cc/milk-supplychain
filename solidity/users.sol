// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

contract UserCRUD {
    // Struct to represent a user
    struct User {
        string _id; // Custom identifier
        string name;
        string role;
        string mobile;
        string password; // Note: This is not recommended for storing sensitive information on the blockchain
        string email;
        addressData addressInfo;
        uint256 created;
        uint256 updated;
    }

    // Struct to represent the address
    struct addressData {
        string address1;
        string address2;
        string city;
        string state;
        string pin;
    }

    // Mapping to associate Ethereum addresses with user IDs
    // mapping(address => string[]) public userAddresses;

    // Mapping to store user data by their unique user ID
    mapping(string => User) public users;

    // Event to log user creation
    event UserCreated(string indexed _id, address indexed userAddress, string name, string role, string mobile, string email, uint256 created);

    // Function to create a new user
    function createUser(
        string memory _id,
        string memory _name,
        string memory _role,
        string memory _mobile,
        string memory _password,
        string memory _email,
        string memory _address1,
        string memory _address2,
        string memory _city,
        string memory _state,
        string memory _pin
    ) public {

        address newUserAddress = msg.sender;

        // Add user ID to the mapping for the Ethereum address
        // userAddresses[newUserAddress].push(_id);

        User storage newUser = users[_id];

        newUser._id = _id;
        newUser.name = _name;
        newUser.role = _role;
        newUser.mobile = _mobile;
        newUser.password = _password; // Not recommended for sensitive data
        newUser.email = _email;
        newUser.addressInfo = addressData(_address1, _address2, _city, _state, _pin);
        newUser.created = block.timestamp;
        newUser.updated = block.timestamp;

        emit UserCreated(_id, newUserAddress, _name, _role, _mobile, _email, block.timestamp);
    }

    // Function to get user details by user ID
    function getUserDetails(string memory _id) public view returns (string memory, string memory, string memory, string memory, string memory) {
        User storage currentUser = users[_id];
        return (currentUser.name, currentUser.role, currentUser.mobile, currentUser.email, currentUser.password);
    }

    // Function to update user details by user ID
    function updateUserDetails(string memory _id, string memory _name, string memory _role, string memory _mobile, string memory _email) public {
        User storage currentUser = users[_id];

        currentUser.name = _name;
        currentUser.role = _role;
        currentUser.mobile = _mobile;
        currentUser.email = _email;
        currentUser.updated = block.timestamp;
    }
}
