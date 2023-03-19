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
        string name;
        string organization_id;
    }
    mapping(uint256 => organization) Organizations;
    event organizationCreated (
        address poster,
        uint256 id,
        string name,
        string organization_id
    );

    function getOrganization(uint256 id) public view returns (address, string memory, string memory){
        require(id < counter, "No such organization");

        organization storage o = Organizations[id];
        return (o.poster,o.name,o.organization_id);
    }
    function loginOrganization(string memory uname,string memory uid) public payable {
            require(msg.value == (0 ether), "Please submit 0 matic");
            organization storage newOraganization = Organizations[counter];
            newOraganization.name = uname;
            newOraganization.organization_id = uid;
            newOraganization.poster = msg.sender;
            newOraganization.id = counter;
            // newPost.comments=new Comment[](100);
            emit organizationCreated(
                msg.sender, 
                counter, 
                uname, 
                uid
            );
            counter++;

            payable(owner).transfer(msg.value);
    }
    function getCount() public view returns(uint256){
        return counter;
    }
}