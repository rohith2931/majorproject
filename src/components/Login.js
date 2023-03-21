import { userabi } from "../config";
import { useradrs } from "../config";
import { orgabi } from "../config";
import { orgadrs } from "../config";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

function Login(props){
  const [account,setAccount]=useState('');
  const [userContract,setUserContract]=useState();
  // var  userContract;
  const [orgContract,setOrgContract]=useState('');
  const [userCount,setUserCount]=useState('');
  const [orgCount,setOrgCount]=useState('');
  const [username,setUsername]=useState('');
  const [userid,setUserId]=useState('');
  const {isUser}=props;
  const navigate=useNavigate();

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
    const orContract = await new web3.eth.Contract(orgabi, orgadrs);
    setOrgContract(orContract);
    console.log(orgContract);
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
      if(post[1]==name&&post[2]==id){
        console.log("succesful login")
        navigate("/userDash",{state:{username:username,userid:userid,post:post}})
      }
    }
        
  }
  async function checkOrg(name,id){
    console.log(orgContract)
    console.log(name,id)
    const Count=await orgContract.methods.getCount().call()
    for(let i=0;i<Count;i++){
      const post=await orgContract.methods.getOrganization(i).call()
      console.log(post)
      if(post[1]==name&&post[2]==id){
        console.log("succesful login")
        navigate("/organizationDash");
      }
    }
  }
  const handleUser=async (e)=>{
    e.preventDefault();
    console.log(username,userContract,userid)
    await checkUser(username,userid)
  }

  const handleOrganization=async (e)=>{
    e.preventDefault();
    await checkOrg(username,userid);
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
  async function storeContracts(usContract,orContract){
    setUserContract(usContract);
    setOrgContract(orContract);
  }
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
      const orContract = await new web3.eth.Contract(orgabi, orgadrs);
      setOrgContract(orContract);
      // this.setState({ userContract: userContract });
      await storeContracts(usContract,orContract)
      console.log("blabla")
      console.log(usContract,orContract);
      console.log("haha")
      console.log(userContract,orgContract);
      console.log("Gg")
      // this.setState({ orgContract: orgContract });
      
      const userCount = await userContract.methods.getCount().call();
      const orgCount = await orgContract.methods.getCount().call();
      // this.setState({ userCount });
      setUserCount(userCount);
      // this.setState({ orgCount });
      setOrgCount(orgCount);
      console.log(userCount, orgCount);
      console.log(userContract.methods);
      console.log(orgContract.methods);
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
        !isUser && 
        <form onSubmit={e=>handleOrganization(e)}>
           <div className="form-group w-75">
              <label for="username">Organization Name
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
          <button type="submit" >Submit </button>
        </form>
      }
      
    </>
  );
}



export default Login;
