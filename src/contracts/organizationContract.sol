// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract organizations{
    address public owner;
    uint256 private counter;
    constructor() {
        counter = 0;
        owner = msg.sender;
    }
    struct organization{
        address poster;
        uint256 id;
        string organization_name;
        string password;
    }
    mapping(uint256 => organization) Organizations;
    event organizationCreated (
        address poster,
        uint256 id,
        string organization_name,
        string password
    );

    function getOrganization(uint256 id) public view returns (address, string memory, string memory){
        require(id < counter, "No such organization");

        organization storage o = Organizations[id];
        return (o.poster,o.organization_name,o.password);
    }

    function loginOrganization(string memory uname,string memory _password) public payable {
            require(msg.value == (0 ether), "Please submit 0 matic");
            organization storage newOraganization = Organizations[counter];
            newOraganization.organization_name = uname;
            newOraganization.password = _password;
            newOraganization.poster = msg.sender;
            newOraganization.id = counter;
            // newPost.comments=new Comment[](100);
            emit organizationCreated(
                msg.sender, 
                counter, 
                uname, 
                _password
            );
            counter++;

            payable(owner).transfer(msg.value);
    }
    function getCount() public view returns(uint256){
        return counter;
    }
}