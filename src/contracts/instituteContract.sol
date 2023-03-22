// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract institutions{
    address public owner;
    uint256 private counter;
    constructor() {
        counter = 0;
        owner = msg.sender;
    }
    struct institute{
        address poster;
        uint256 id;
        string institute_name;
        string password;
    }
    mapping(uint256 => institute) Institutes;
    event instituteCreated (
        address poster,
        uint256 id,
        string institute_name,
        string password
    );

    function getInstitute(uint256 id) public view returns (address, string memory, string memory){
        require(id < counter, "No such Institute");

        institute storage inst = Institutes[id];
        return (inst.poster,inst.institute_name,inst.password);
    }

    function loginInstitute(string memory uname,string memory _password) public payable {
            require(msg.value == (0 ether), "Please submit 0 matic");
            institute storage newInstitute = Institutes[counter];
            newInstitute.institute_name = uname;
            newInstitute.password = _password;
            newInstitute.poster = msg.sender;
            newInstitute.id = counter;
            // newPost.comments=new Comment[](100);
            emit instituteCreated(
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