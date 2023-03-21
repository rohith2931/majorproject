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
        string password;
        address[] addrs_certificates;
        string[] certificates;
        address[] addrs_experience;
        string[] experience;
    }
    mapping(uint256 => user) Users;
    mapping(string => uint256) IdResolver;
    event userCreated (
        address poster,
        uint256 id,
        string name,
        string password
    );

    function getUser(uint256 id) public view returns (address, string memory, string memory,string[] memory, address[] memory,string[] memory, address[] memory){
        require(id < counter, "No such user");

        user storage p = Users[id];
        return (p.poster,p.name,p.password,p.certificates,p.addrs_certificates,p.experience,p.addrs_experience);
    }
    
    function loginUser(string memory uname,string memory _password) public payable {
            require(msg.value == (0 ether), "Please submit 0 matic");
            user storage newUser = Users[counter];
            newUser.name = uname;
            newUser.password = _password;
            newUser.poster = msg.sender;
            newUser.id = counter;
            IdResolver[uname]=counter;
            // newPost.comments=new Comment[](100);
            emit userCreated(
                msg.sender, 
                counter, 
                uname, 
                _password
            );
            counter++;

            payable(owner).transfer(msg.value);
    }
    function addCertificate(string memory uname,string memory certTxt) public {
        require (bytes(certTxt).length > 0, "Invalid");
        require(IdResolver[uname] < counter, "No such post");
        Users[IdResolver[uname]].certificates.push(certTxt);
        Users[IdResolver[uname]].addrs_certificates.push(msg.sender);
    }
    function addExperience(string memory uname,string memory exp) public {
        require (bytes(exp).length > 0, "Invalid");
        require(IdResolver[uname] < counter, "No such post");
        Users[IdResolver[uname]].experience.push(exp);
        Users[IdResolver[uname]].addrs_experience.push(msg.sender);
    }
    function getCount() public view returns(uint256){
        return counter;
    }
}