// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract companies{
    address public owner;
    uint256 private counter;
    constructor() {
        counter = 0;
        owner = msg.sender;
    }
    struct company{
        address poster;
        uint256 id;
        string company_name;
        string company_full_name;
        string password;
    }
    mapping(uint256 => company) Companies;
    event companyCreated (
        address poster,
        uint256 id,
        string company_name,
        string company_full_name,
        string password
    );

    function getCompany(uint256 id) public view returns (address, string memory, string memory,string memory){
        require(id < counter, "No such Company");

        company storage com = Companies[id];
        return (com.poster,com.company_name,com.password,com.company_full_name);
    }

    function loginCompany(string memory uname,string memory _password,string memory _company_full_name) public payable {
            require(msg.value == (0 ether), "Please submit 0 matic");
            company storage newCompany = Companies[counter];
            newCompany.company_name = uname;
            newCompany.password = _password;
            newCompany.poster = msg.sender;
            newCompany.company_full_name=_company_full_name;
            newCompany.id = counter;
            // newPost.comments=new Comment[](100);
            emit companyCreated(
                msg.sender, 
                counter, 
                uname,
                _company_full_name,
                _password
            );
            counter++;

            payable(owner).transfer(msg.value);
    }
    function getCount() public view returns(uint256){
        return counter;
    }
}