import Web3 from "web3";
import { useEffect, useState } from "react";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";
import { userabi } from "../config";
import { useradrs } from "../config";
import { orgabi } from "../config";
import { orgadrs } from "../config";

function OrganizationDash(props) {
  const [buffer, setBuffer] = useState();
  const [account, setAccount] = useState("");
  const [userContract, setUserContract] = useState();
  const [orgContract, setOrgContract] = useState("");
  const [userCount,setUserCount]=useState('');
  const [orgCount,setOrgCount]=useState('');
  const [username,setUsername]=useState('');
  const [userid,setUserId]=useState('');

  useEffect(() => {
    loadWeb3();
  }, []);
  const handleUsername=(e)=>{
    setUsername(e.target.value)
    console.log(username)
  }

  const handleUserId=(e)=>{
    setUserId(e.target.value)
    console.log(userid)
  }
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
    await addCert(userid,cid);
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
  async function addCert(a,b) {
    a=parseInt(a)
    a=a-1
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
    setOrgContract(orContract);
  }
  async function loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    // this.setState({ account: accounts[0] });
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    if (networkId === 11155111) {
      const usContract = await new web3.eth.Contract(userabi, useradrs);
      console.log(usContract);
      console.log(account, networkId);
      // userContract=usContract;
      setUserContract(usContract);
      console.log(userContract);
      const orContract = await new web3.eth.Contract(orgabi, orgadrs);
      setOrgContract(orContract);
      // this.setState({ userContract: userContract });
      await storeContracts(usContract, orContract);
      console.log("blabla");
      console.log(usContract, orContract);
      console.log("haha");
      console.log(userContract, orgContract);
      console.log("Gg");
      // this.setState({ orgContract: orgContract });

      const userCount = await usContract.methods.getCount().call();
      const orgCount = await orContract.methods.getCount().call();
      // this.setState({ userCount });
      setUserCount(userCount);
      // this.setState({ orgCount });
      setOrgCount(orgCount);
      console.log(userCount, orgCount);
      console.log(usContract.methods);
      console.log(orContract.methods);
      console.log(account);
      setUserContract(usContract);
      console.log(userContract);
      await storeContracts();
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
      if(post[1]==name&&post[2]==id){
        console.log("succesful login")
        await addCert(i,'p')
      }
    }
        
  }
  const handleUser=async (e)=>{
    e.preventDefault();
    console.log(username,userContract,userid)
    await checkUser(username,userid)
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
              <label for="userid">userid
                  <textarea name="userid" className="form-control w-100" id="id" rows="2" onChange={handleUserId}/>
              </label>
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
      </div>
    </>
  );
}

export default OrganizationDash;
