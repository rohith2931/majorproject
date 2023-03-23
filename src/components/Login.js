import { userabi } from "../config";
import { useradrs } from "../config";
import { instabi } from "../config";
import { instadrs } from "../config";
import { comabi } from "../config";
import { comadrs } from "../config";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import bcrypt from 'bcryptjs';
import React, { useRef } from 'react';

function Login(props){
  const [account,setAccount]=useState('');
  
  // Stakeholders Contracts
  const [userContract,setUserContract]=useState();
  const [instituteContract, setInstituteContract] = useState("");
  const [companyContract, setCompanyContract] = useState("");

  // Counts
  const [userCount,setUserCount]=useState('');
  const [orgCount,setOrgCount]=useState('');

  const [username,setUsername]=useState('');
  const [userid,setUserId]=useState('');
  
  const {isUser,isInstitute,isCompany}=props;
  const navigate=useNavigate();

  // Login References
  const getUserName = localStorage.getItem("userData");
  const getInstituteName = localStorage.getItem("instituteData");
  const getCompanyName = localStorage.getItem("companyData");

  useEffect(() => {
    loadWeb3();
  }, []);

  
  // const handleSubmit=(event)=>{
  //   // const target = event.target;
  //   // const name = target.name;
  //   // const value = target.value;
  //   // console.log(value)
  //   // this.setState(prevState=>{
  //   //     let oldvalues=prevState.values
  //   //     oldvalues[name]=value
  //   //     return{
  //   //         values:oldvalues
  //   //     }
  //   // })
  //   // console.log(this.state.values)
  //   console.log(event)
  //   event.PreventDefault();
  // }

  const handleUsername=(e)=>{
    setUsername(e.target.value)
    console.log(username)
  }

  const handleUserId=(e)=>{
    setUserId(e.target.value)
    console.log(userid)
  }
  const handleContracts= async ()=>{
    const web3 = window.web3;
    const usContract = await new web3.eth.Contract(userabi, useradrs);
    console.log(usContract);
    // userContract=usContract;
    setUserContract(usContract);
    console.log(userContract)

    const instContract = await new web3.eth.Contract(instabi, instadrs);
    setInstituteContract(instContract);
    console.log(instContract);
    
    const comContract = await new web3.eth.Contract(comabi, comadrs);
    setCompanyContract(comContract);
    console.log(comContract);
    
    const accounts = await web3.eth.getAccounts();
    console.log(accounts)
    // this.setState({ account: accounts[0] });
    setAccount(accounts[0]);
  }
  async function checkUser(name,id){
    console.log(userContract)
    console.log(name,id)
    const Count=await userContract.methods.getCount().call()
    for(let i=0;i<Count;i++){
      const post=await userContract.methods.getUser(i).call()
      console.log(post)
      if(post[1]==name&&bcrypt.compareSync(id,post[2])){
        console.log("succesful login")
        // localStorage.setItem("isUserLogin",true);
        // localStorage.setItem("userData", name);
        localStorage.setItem("Login", "user");
        navigate("/userDash",{state:{post:post}})
      }
    }   
  }
  async function checkCompany(name,id){
    console.log(companyContract)
    console.log(name,id)
    const Count=await companyContract.methods.getCount().call()
    for(let i=0;i<Count;i++){
      const post=await companyContract.methods.getCompany(i).call()
      console.log(post)
      if(post[1]==name&&bcrypt.compareSync(id,post[2])){
        console.log("succesful login")
        // localStorage.setItem("isCompanyLogin",true);
        // localStorage.setItem("companyData", name);
        localStorage.setItem("Login", "company");
        localStorage.setItem("CompanyName",post[3]);
        navigate("/companyDash");
      }
    }
  }

  async function checkInstitite(name,id){
    console.log(instituteContract)
    console.log(name,id)
    const Count=await instituteContract.methods.getCount().call()
    for(let i=0;i<Count;i++){
      const post = await instituteContract.methods.getInstitute(i).call()
      console.log(post)
      if(post[1]==name&&bcrypt.compareSync(id,post[2])){
        console.log("succesful login")
        //localStorage.setItem("isInstituteLogin",true);
        //localStorage.setItem("instituteData", name);
        localStorage.setItem("Login", "institute");
        localStorage.setItem("InstituteName",post[3]);
        navigate("/instituteDash");
      }
    }
  }


  const handleUser=async (e)=>{
    e.preventDefault();
    console.log(username,userContract,userid)
    await checkUser(username,userid)
  }

  const handleInstitute=async (e)=>{
    e.preventDefault();
    await checkInstitite(username,userid);
  }

  const handleCompany=async (e)=>{
    e.preventDefault();
    await checkCompany(username,userid);
  }
  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    await loadBlockchainData();
  }
  // async function storeContracts(usContract,orContract){
  //   setUserContract(usContract);
  //   setOrgContract(orContract);
  // }

  
  async function loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts)
    // this.setState({ account: accounts[0] });
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    console.log(networkId)
    if (networkId === 11155111) {
      const usContract = await new web3.eth.Contract(userabi, useradrs);
      console.log(usContract);
      console.log(account,networkId)
      // userContract=usContract;
      setUserContract(usContract);
      console.log(userContract)
      
      
      const instContract = await new web3.eth.Contract(instabi, instadrs);
      setInstituteContract(instContract);
      console.log(instContract);
      
      const comContract = await new web3.eth.Contract(comabi, comadrs);
      setCompanyContract(comContract);
      console.log(comContract);
      // this.setState({ userContract: userContract });
      // await storeContracts(usContract,orContract)
      console.log("blabla")
      // console.log(usContract,orContract);
      console.log("haha")
      // console.log(userContract,orgContract);
      console.log("Gg")
      // this.setState({ orgContract: orgContract });
      
      const userCount = await userContract.methods.getCount().call();
      // const orgCount = await orgContract.methods.getCount().call();
      // this.setState({ userCount });
      setUserCount(userCount);
      // this.setState({ orgCount });
      setOrgCount(orgCount);
      console.log(userCount, orgCount);
      console.log(userContract.methods);
      // console.log(orgContract.methods);
      console.log(account);
      setUserContract(usContract);
      console.log(userContract);  
    } else {
      window.alert("Decentragram contract not deployed to detected network.");
    }
  }
  return (
    <>
      <div>Login</div>
      <button onClick={handleContracts}>load contract</button>
      <label>Your Wallet Id is:</label>
      <input type="text" readOnly value={account}></input>
      {isUser && <form onSubmit={e => {handleUser(e)}}>
          <div className="form-group w-75">
              <label for="username">username
                  <textarea name="username" className="form-control w-100" id="name" rows="2" onChange={handleUsername}/>
              </label>
              <br/>
              <br/>
              <label for="userid">Password
                  <textarea name="userid" className="form-control w-100" id="id" rows="2" onChange={handleUserId}/>
              </label>
              <br/>
              <br/>
          </div>
          <button type="submit"  className="btn btn-primary mb-2">Log in</button>
      </form>}


      {
        isCompany && 
        <form onSubmit={e=>handleCompany(e)}>
           <div className="form-group w-75">
              <label for="username">Company Name
                  <textarea name="username" className="form-control w-100" id="name" rows="2" onChange={handleUsername}/>
              </label>
              <br/>
              <br/>
              <label for="userid">Password
                  <textarea name="userid" className="form-control w-100" id="id" rows="2" onChange={handleUserId}/>
              </label>
              <br/>
              <br/>
          </div>
          <button type="submit">Log in </button>
        </form>
      }

{
        isInstitute && 
        <form onSubmit={e=>handleInstitute(e)}>
           <div className="form-group w-75">
              <label for="username">Institute Name
                  <textarea name="username" className="form-control w-100" id="name" rows="2" onChange={handleUsername}/>
              </label>
              <br/>
              <br/>
              <label for="userid">Password
                  <textarea name="userid" className="form-control w-100" id="id" rows="2" onChange={handleUserId}/>
              </label>
              <br/>
              <br/>
          </div>
          <button type="submit" >Log in </button>
        </form>
      }
      
    </>
  );
}



export default Login;