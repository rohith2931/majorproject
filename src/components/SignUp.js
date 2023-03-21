import { userabi } from "../config";
import { useradrs } from "../config";
import { orgabi } from "../config";
import { orgadrs } from "../config";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
function SignUp(props) {
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [role, setRole] = useState("");
  const [account, setAccount] = useState("");
  const [userContract, setUserContract] = useState();
  // var  userContract;
  const [orgContract, setOrgContract] = useState("");
  const [userCount, setUserCount] = useState("");
  const [orgCount, setOrgCount] = useState("");
  const { isUser } = props;
  const navigate = useNavigate();

  useEffect(() => {
    loadWeb3();
  }, []);

  const handleFormSubmit = async(e) => {
    e.preventDefault();

    setUsername(e.target.username.value);
    setUserid(e.target.userid.value);
    setRole(e.target.role.value);
    if(await checkUser(e.target.username.value, e.target.userid.value)||await checkOrg(e.target.username.value, e.target.userid.value)){
        alert("user already registered")
    }
    else{
        if(e.target.role.value=="user"){
            await userContract.methods.loginUser(e.target.username.value, e.target.userid.value).send({from:account}).on('transactionHash', (hash) => {
                console.log(hash)
              })
            alert("registered")
        }
        else{
            await orgContract.methods.loginOrganization(e.target.username.value, e.target.userid.value).send({from:account}).on('transactionHash', (hash) => {
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
        return true;
      }

    }
    console.log("here")
    return false;  
  }
  async function checkOrg(name,id){
    console.log(orgContract)
    console.log(name,id)
    const Count=await orgContract.methods.getCount().call()
    for(let i=0;i<Count;i++){
      const post=await orgContract.methods.getOrganization(i).call()
      console.log(post)
      if(post[1]==name&&post[2]==id){
        return true;
      }
    }
    console.log("hhere")
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
  console.log(username, userid, role);
  return (
    <>
      <div>Sign Up</div>
      <button onClick={handleContracts}>load contract</button>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <label>Enter Username :</label>
        <input type={"text"} name="username" />
        <label>Enter User id :</label>
        <input type={"text"} name="userid" />
        <label>Enter Role:</label>
        <select name="role">
          <option value="user" defaultChecked>
            User
          </option>
          <option value="organization">Organization</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default SignUp;
