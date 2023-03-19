import { Component } from "react";
import { userabi } from "../config";
import { useradrs } from "../config";
import { orgabi } from "../config";
import { orgadrs } from "../config";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

function Login(){
  const [account,setAccount]=useState('');
  const [userContract,setUserContract]=useState();
  // var  userContract;
  const [orgContract,setOrgContract]=useState('');
  const [userCount,setUserCount]=useState('');
  const [orgCount,setOrgCount]=useState('');
  const [username,setUsername]=useState('');
  const [userid,setUserId]=useState('');
  const navigate=useNavigate();
  useEffect(() => {
    loadWeb3();
  }, []);

  
  const handleSubmit=(event)=>{
    // const target = event.target;
    // const name = target.name;
    // const value = target.value;
    // console.log(value)
    // this.setState(prevState=>{
    //     let oldvalues=prevState.values
    //     oldvalues[name]=value
    //     return{
    //         values:oldvalues
    //     }
    // })
    // console.log(this.state.values)
    console.log(event)
    event.PreventDefault();
  }

  const handleUsername=(e)=>{
    setUsername(e.target.value)
    console.log(username)
  }

  const handleUserId=(e)=>{
    setUserId(e.target.value)
    console.log(userid)
  }
  
  async function checkStudent(name,id){
    console.log(userContract)
    const Count=await userContract.methods.getCount().call()
    for(let i=0;i<Count;i++){
      const post=await userContract.methods.getUser(i).call()
      console.log(post)
    }
  }
  const handleStudent=async (e)=>{
    await checkStudent(username,userid)
    
    
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
    // this.setState({ account: accounts[0] });
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    if (networkId === 5) {
      const usContract = await new web3.eth.Contract(userabi, useradrs);
      console.log(usContract);
      // userContract=usContract;
      setUserContract(usContract);
      console.log(userContract)
      const orContract = await new web3.eth.Contract(orgabi, orgadrs);
      setOrgContract(orContract);
      // this.setState({ userContract: userContract });
      // await storeContracts(usContract,orContract)
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
      await checkStudent("","");
    } else {
      window.alert("Decentragram contract not deployed to detected network.");
    }
  }
  return (
    <>
      <div>Login</div>
      <label>Your Wallet Id is:</label>
      <input type="text" readOnly value={account}></input>
      <form onSubmit={handleStudent}>
          <div className="form-group w-75">
              <label for="username">username
                  <textarea name="username" className="form-control w-100" id="name" rows="2" onChange={handleUsername}/>
              </label>
              <br/>
              <br/>
              <label for="userid">userid
                  <textarea name="userid" className="form-control w-100" id="id" rows="2" onChange={handleUserId}/>
              </label>
              <br/>
              <br/>
          </div>
          <button type="submit"  className="btn btn-primary mb-2">add Post</button>
      </form>
      {/* <form onSubmit={handleStudent}>
        
        <label>Login As</label>
        <select>
          <option value="organization">Organization</option>
          <option value="Student">Student</option>
        </select>
        <button type="submit">Submit</button>
      </form> */}
    </>
  );
}

/*
class Logizn extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  async loadWeb3() {
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
  }
  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    if (networkId === 5) {
      const userContract = new web3.eth.Contract(userabi, useradrs);
      const orgContract = new web3.eth.Contract(orgabi, orgadrs);
      this.setState({ userContract: userContract });
      this.setState({ orgContract: orgContract });
      const userCount = await userContract.methods.getCount().call();
      const orgCount = await orgContract.methods.getCount().call();
      this.setState({ userCount });
      this.setState({ orgCount });
      console.log(userCount, orgCount);
      console.log(userContract.methods);
      console.log(orgContract.methods);
      console.log(this.state.account);
    } else {
      window.alert("Decentragram contract not deployed to detected network.");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      values:{},
      userContract: null,
      orgContract: null,
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStudent = this.handleStudent.bind(this);    
  }
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    console.log(value)
    this.setState(prevState=>{
        let oldvalues=prevState.values
        oldvalues[name]=value
        return{
            values:oldvalues
        }
    })
    console.log(this.state.values)
  }
  async checkStudent(name,id){
    
  }
  async handleStudent(event) {

    event.PreventDefault();
    await this.checkStudent(this.state.values["name"],this.state.values["ud"])
    console.log(event)
  }

  render() {
    return (
      <>
        <div>Login</div>
        <form onSubmit={this.handleSubmit}>
            <div className="form-group w-75">
                <label for="username">username
                    <textarea name="username" className="form-control w-100" id="name" rows="2" onChange={this.handleChange}/>
                </label>
                <br/>
                <br/>
                <label for="userid">userid
                    <textarea name="userid" className="form-control w-100" id="id" rows="2" onChange={this.handleChange}/>
                </label>
                <br/>
                <br/>
            </div>
            <button type="submit"  className="btn btn-primary mb-2">add Post</button>
        </form>
        <form onSubmit={this.handleStudent}>
          <label>Your Wallet Id is:</label>
          <input type="text" readOnly value={this.state.account}></input>
          <label>Login As</label>
          <select>
            <option value="organization">Organization</option>
            <option value="Student">Student</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}*/

export default Login;
