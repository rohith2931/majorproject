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

function SignUp(props) {
 
  const [account, setAccount] = useState("");
  const [userContract, setUserContract] = useState();
  // var  userContract;
  const [instituteContract, setInstituteContract] = useState("");
  const [companyContract, setCompanyContract] = useState("");
  const [userCount, setUserCount] = useState("");
  const [orgCount, setOrgCount] = useState("");
  const { isUser } = props;
  const navigate = useNavigate();

  useEffect(() => {
    loadWeb3();
  }, []);

  const handleFormSubmit = async(e) => {
    e.preventDefault();

    const hashedPwd = bcrypt.hashSync(e.target.password.value, 8);
    

    if(e.target.role.value=="user"){
      if(await checkUser(e.target.username.value, hashedPwd)){
        alert("user already registered")
      }
      else{
        await userContract.methods.loginUser(e.target.username.value, hashedPwd,e.target.fullname.value).send({from:account}).on('transactionHash', (hash) => {
          console.log(hash)
        })
        alert("registered")
      }
    }

    else if(e.target.role.value=="institute"){
      if(await checkInstitite(e.target.username.value, hashedPwd)){
        alert("Institute already registered")
      }
      else{
        await instituteContract.methods.loginInstitute(e.target.username.value, hashedPwd,e.target.fullname.value).send({from:account}).on('transactionHash', (hash) => {
          console.log(hash)
        })
        alert("registered")
      }
    }

    else{
      if(await checkCompany(e.target.username.value, hashedPwd)){
        alert("Company already registered")
      }
      else{
        await companyContract.methods.loginCompany(e.target.username.value, hashedPwd, e.target.fullname.value).send({from:account}).on('transactionHash', (hash) => {
          console.log(hash)
        })
        alert("registered")
      }
    }
  };
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
  
  async function checkUser(name,hashedPwd){
    console.log(userContract)
    console.log(name,hashedPwd)
    const Count=await userContract.methods.getCount().call()
    for(let i=0;i<Count;i++){
      const post=await userContract.methods.getUser(i).call()
      console.log(post)
      if(post[1]==name){
        return true;
      }

    }
    console.log("uhere")
    return false;  
  }

  async function checkInstitite(name,hashedPwd){
    console.log(instituteContract)
    console.log(name,hashedPwd)
    const Count=await instituteContract.methods.getCount().call()
    for(let i=0;i<Count;i++){
      const post=await instituteContract.methods.getInstitute(i).call()
      console.log(post)
      if(post[1]==name){
        return true;
      }
    }
    console.log("ihere")
    return false;
  }

  
  async function checkCompany(name,hashedPwd){
    console.log(companyContract)
    console.log(name,hashedPwd)
    const Count=await companyContract.methods.getCount().call()
    for(let i=0;i<Count;i++){
      const post=await companyContract.methods.getCompany(i).call()
      console.log(post)
      if(post[1]==name){
        return true;
      }
    }
    console.log("ohere")
    return false;
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
      console.log(userContract,companyContract,instituteContract);
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
  // console.log(username, password, role);
  return (
    <>
      <div>Sign Up</div>
      <button onClick={handleContracts} class="btn btn-primary">load contract</button>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <label>Enter Name :</label>
        <input type={"text"} class="form-control" name="fullname"/>
        <label>Enter Username :</label>
        <input type={"text"} class="form-control" name="username"/>
        <label>Enter Password :</label>
        <input type={"password"} name="password" />
        <label>Enter Role:</label>
        <select name="role">
          <option value="user" defaultChecked>
            User
          </option>
          <option value="institute">Institute</option>
          <option value="company">Company</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
    
  );
}

export default SignUp;