// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract certificates{
    address public owner;
    uint256 private counter;
    constructor() {
        counter = 0;
        owner = msg.sender;
    }
    struct user{
        address poster;
        uint256 id;
        string name;
        string user_id;
        address[] addrs_certificates;
        string[] certificates;
    }
    mapping(uint256 => user) Users;
    event userCreated (
        address poster,
        uint256 id,
        string name,
        string user_id
    );

    function getUser(uint256 id) public view returns (address, string memory, string memory,string[] memory, address[] memory){
        require(id < counter, "No such user");

        user storage p = Users[id];
        return (p.poster,p.name,p.user_id,p.certificates,p.addrs_certificates);
    }
    function loginUser(string memory uname,string memory uid) public payable {
            require(msg.value == (0 ether), "Please submit 0 matic");
            user storage newUser = Users[counter];
            newUser.name = uname;
            newUser.user_id = uid;
            newUser.poster = msg.sender;
            newUser.id = counter;
            // newPost.comments=new Comment[](100);
            emit userCreated(
                msg.sender, 
                counter, 
                uname, 
                uid
            );
            counter++;

            payable(owner).transfer(msg.value);
    }
    function addCertificate(uint256 id,string memory certTxt) public {
        require (bytes(certTxt).length > 0, "Invalid");
        require(id < counter, "No such post");
        Users[id].certificates.push(certTxt);
        Users[id].addrs_certificates.push(msg.sender);
    }
    

    function getCount() public view returns(uint256){
        return counter;
    }
}