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
        string full_name;
        string password;
        address[] addrs_certificates;
        string[] certificates;
        string[] certificateIssuer;
        address[] addrs_experience;
        string[] experience;
        string[] certificates_issue_dates;
    }
    mapping(uint256 => user) Users;
    mapping(string => uint256) IdResolver;
    event userCreated (
        address poster,
        uint256 id,
        string name,
        string full_name,
        string password
    );

    function getUser(uint256 id) public view returns (address, string memory, string memory,string[] memory, address[] memory,string[] memory,string[] memory, address[] memory,string memory,string[] memory){
        require(id < counter, "No such user");

        user storage p = Users[id];
        return (p.poster,p.name,p.password,p.certificates,p.addrs_certificates,p.certificateIssuer,p.experience,p.addrs_experience,p.full_name,p.certificates_issue_dates);
    }
    
    function loginUser(string memory uname,string memory _password,string memory _full_name) public payable {
            require(msg.value == (0 ether), "Please submit 0 matic");
            user storage newUser = Users[counter];
            newUser.name = uname;
            newUser.password = _password;
            newUser.poster = msg.sender;
            newUser.id = counter;
            newUser.full_name=_full_name;
            IdResolver[uname]=counter;
            // newPost.comments=new Comment[](100);
            emit userCreated(
                msg.sender, 
                counter, 
                uname,
                _full_name,
                _password
            );
            counter++;

            payable(owner).transfer(msg.value);
    }
    function addCertificate(string memory uname,string memory certTxt,string memory Issuer,string memory issue_date) public {
        require (bytes(certTxt).length > 0, "Invalid");
        require(IdResolver[uname] < counter, "No such post");
        Users[IdResolver[uname]].certificates.push(certTxt);
        Users[IdResolver[uname]].addrs_certificates.push(msg.sender);
        Users[IdResolver[uname]].certificateIssuer.push(Issuer);
        Users[IdResolver[uname]].certificates_issue_dates.push(issue_date);
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