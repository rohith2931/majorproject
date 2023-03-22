import Web3 from "web3";
import { useEffect, useState } from "react";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";
import { userabi } from "../config";
import { useradrs } from "../config";
import { comabi } from "../config";
import { comadrs } from "../config";
import { instabi } from "../config";
import { instadrs } from "../config";
import { useNavigate } from "react-router-dom";
import UserDash from "./UserDash.js";
function OrganizationDash(props) {
  const [buffer, setBuffer] = useState();
  const [account, setAccount] = useState("");
  const [userContract, setUserContract] = useState();
  const [comContract, setComContract] = useState("");
  const [userCount,setUserCount]=useState('');
  const [orgCount,setComCount]=useState('');
  const [username,setUsername]=useState('');
  const [userid,setUserId]=useState('');
  const [instituteContract, setInstituteContract] = useState("");
  const [companyContract, setCompanyContract] = useState("");

  const [upost,setUPost] = useState({});
  const {isCompany,isInstitute} = props;
  const navigate=useNavigate();
  useEffect(() => {
    var paths= window.location.href.split('/')
    if(paths[paths.length-1]==="instituteDash" && localStorage.getItem('isInstituteLogin')=="false"){
      navigate('/instituteLogin')
    }
    if(paths[paths.length-1]==="companyDash" && localStorage.getItem('isCompanyLogin')=="false"){
      navigate('/companyLogin')
    }    
    // if(localStorage.getItem("isCompanyLogin")==="false"){
    //   navigate('/companyLogin');
    // }
    loadWeb3();

  }, []);
  const handleUsername=(e)=>{
    setUsername(e.target.value)
    console.log(username)
  }

  // const handleUserId=(e)=>{
  //   setUserId(e.target.value)
  //   console.log(userid)
  // }
  async function storeFiles() {
    let file = buffer;
    let blob = new Blob([file], { type: "image/png" });
    const client = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGEyYTcxNEZFNzBiQTU5NTE0OTc5NThGMDJCOEFhRUU3NjI2MWJkZjYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzg2NDM2NTk2NDYsIm5hbWUiOiJNeSBGaXJzdCBUb2tlbiJ9.U9znwU-_tOLORo5GcDiSBFbDRDbgi6V4AC_u2C7oBcs",
    });
    let cid = await client.put([new File([blob], "image.png")]);
    console.log(cid);
    cid = cid + ".ipfs.w3s.link/image.png";
    console.log(cid);
    await addCert(username,cid);
  }
  const handleContracts= async ()=>{
    const web3 = window.web3;
    const usContract = await new web3.eth.Contract(userabi, useradrs);
    console.log(usContract);
    // userContract=usContract;
    setUserContract(usContract);
    console.log(userContract)
    const orContract = await new web3.eth.Contract(comabi, comadrs);
    setComContract(orContract);
    console.log(comContract);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts)
    // this.setState({ account: accounts[0] });
    setAccount(accounts[0]);
  }


  async function handleExperience(e){
    e.preventDefault();
    const username=e.target.username.value;
    const experience=e.target.experience.value;
    await addExp(username, experience);
  }
  async function addExp(a,b) {
    console.log(a,b)
    console.log("Experience ",userContract)
    await userContract.methods.addExperience(a,b).send({from:account}).on('transactionHash', (hash) => {
      console.log(hash)
    })
  }


  async function addCert(a,b) {
    // a=parseInt(a)
    // a=a-1
    console.log(a,b)
    console.log("certificatesinside",userContract)
    await userContract.methods.addCertificate(a,b).send({from:account}).on('transactionHash', (hash) => {
      console.log(hash)
    })
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
  async function storeContracts(usContract, orContract) {
    setUserContract(usContract);
    setComContract(orContract);
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
      // setOrgCount(orgCount);
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
  
  function captureFile(event) {
    //console.log(event)
    event.preventDefault();
    const file = event.target.files[0];
    console.log(event.target.files);
    console.log(event.target.files[0]);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      console.log("pp");
      console.log(reader.result);
    //   this.setState({ Buffer: reader.result });
      setBuffer(reader.result);
    };
    console.log(buffer);
  }
  async function checkUser(name,id){
    console.log(userContract)
    console.log(name,id)
    const Count=await userContract.methods.getCount().call()
    for(let i=0;i<Count;i++){
      const post=await userContract.methods.getUser(i).call()
      console.log(post)
      if(post[1]==name){
        console.log("succesful login")
        // await addCert(i,'p')
      }
    }
        
  }
  const handleUser=async (e)=>{
    e.preventDefault();
    console.log(username,userContract,userid)
    await checkUser(username,userid)
  }


  const handleSearch=async(e)=>{
    e.preventDefault();
    console.log(userContract)
    console.log(e.target.username.value)
    const Count=await userContract.methods.getCount().call()
    for(let i=0;i<Count;i++){
      const post=await userContract.methods.getUser(i).call()
      console.log(post)
      if(post[1]==e.target.username.value){
        console.log("succesful login")
        setUPost(post);
        console.log(upost)
        // navigate("/userDash",{state:{username:username,userid:userid,post:post}})
      }
    }   
  }
  return (
    <>
      <div>Organization Dashboard</div>
      <button onClick={handleContracts}>load contract</button>
      <div>
      <form onSubmit={e => {handleUser(e)}}>
          <div className="form-group w-75">
              <label for="username">username
                  <textarea name="username" className="form-control w-100" id="name" rows="2" onChange={handleUsername}/>
              </label>
              <br/>
              <br/>
              {/* <label for="userid">userid
                  <textarea name="userid" className="form-control w-100" id="id" rows="2" onChange={handleUserId}/>
              </label> */}
              <br/>
              <label for="post">
                    <input type="file" name="image" accept=".png, .jpg, .jpeg" onChange={e=>captureFile(e)}/>
              </label>
              <br/>
          </div>
          <button type="submit"  className="btn btn-primary mb-2">add Post</button>
          {/* {buffer && <div>{buffer.byteength}</div>} */}
      </form>
      <button onClick={storeFiles}  className="btn btn-primary mb-2">addCertificate</button>

      {isCompany &&
        <form onSubmit={handleExperience}>
        <label for="username">Username</label>
        <input type="text" name="username"/>
        
        <label for ="experience">Experience</label>
        <input type="text" id="experience" name="exper"/>

      <button type="submit" className="btn btn-primary mb-2">add experience</button>

        
      </form>}


      <form onSubmit={(e)=>handleSearch(e)}>
        <label for="username">Username</label>
        <input type="text" name="username"/>
        <button type="submit" className="btn btn-primary mb-2">Search</button>
      </form>
      
      </div>
      {Object.keys(upost).length !== 0 && <UserDash state={{post:upost}}/>}
    </>
  );
}

export default OrganizationDash;
