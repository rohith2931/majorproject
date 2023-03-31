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
import ShowUser from "./ShowUser.js";

function OrganizationDash(props) {
  const [buffer, setBuffer] = useState();
  const [ind,setInd]=useState(0);
  const [account, setAccount] = useState("");
  const [userContract, setUserContract] = useState();
  const [comContract, setComContract] = useState("");
  const [userCount, setUserCount] = useState('');
  const [orgCount, setComCount] = useState('');
  const [username, setUsername] = useState('');
  const [userid, setUserId] = useState('');
  const [instituteContract, setInstituteContract] = useState("");
  const [companyContract, setCompanyContract] = useState("");

  const [upost, setUPost] = useState({});
  const [certIssueDate,setCertIssueDate]=useState();
  const { isCompany, isInstitute } = props;
  const navigate = useNavigate();
  useEffect(() => {
    var paths = window.location.href.split('/')
    if (paths[paths.length - 1] === "instituteDash" && localStorage.getItem('Login') !== "institute") {
      console.log("adddddddddddd", localStorage.getItem('Login'))
      navigate('/instituteLogin')
    }
    if (paths[paths.length - 1] === "companyDash" && localStorage.getItem('Login') !== "company") {
      navigate('/companyLogin')
    }
    // if(localStorage.getItem("isCompanyLogin")==="false"){
    //   navigate('/companyLogin');
    // }
    loadWeb3();

  }, []);
  const handleUsername = (e) => {
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
    console.log(certIssueDate);
    await addCert(username, cid,certIssueDate);
  }
  const handleContracts = async () => {
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


  async function handleExperience(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const experience = e.target.employment.value+' '+e.target.date.value;
    await addExp(username, experience);
  }
  async function addExp(a, b) {
    console.log(a, b)
    b=b+' '+localStorage.getItem("CompanyName");
    console.log(a, b)
    console.log("Experience ", userContract)
    await userContract.methods.addExperience(a, b).send({ from: account }).on('transactionHash', (hash) => {
      console.log(hash)
    })
  }


  async function addCert(a, b, d) {
    // a=parseInt(a)
    // a=a-1
    console.log(a, b)
    console.log("certificatesinside", userContract)
    let c;
    if (isCompany) {
      c = localStorage.getItem("CompanyName");
    }
    else {
      c = localStorage.getItem("InstituteName");
    }
    await userContract.methods.addCertificate(a, b, c, d).send({ from: account }).on('transactionHash', (hash) => {
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
      console.log(account, networkId)
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
  async function checkUser(name, id) {
    console.log(userContract)
    console.log(name, id)
    const Count = await userContract.methods.getCount().call()
    for (let i = 0; i < Count; i++) {
      const post = await userContract.methods.getUser(i).call()
      console.log(post)
      if (post[1] == name) {
        console.log("succesful login")
        // await addCert(i,'p')
      }
    }

  }
  const handleUser = async (e) => {
    e.preventDefault();
    console.log(username, userContract, userid)
    await checkUser(username, userid)
  }
  // const select =  (e,ind) => {
  //   setInd(ind)
  // }

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(userContract)
    console.log(e.target.username.value)
    const Count = await userContract.methods.getCount().call()
    for (let i = 0; i < Count; i++) {
      const post = await userContract.methods.getUser(i).call()
      console.log(post)
      if (post[1] == e.target.username.value) {
        console.log("succesful login")
        setUPost(post);
        console.log(upost)
        console.log(post)
        // navigate("/userDash",{state:{username:username,userid:userid,post:post}})
      }
    }
  }

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    // window.location.reload();
    navigate('/home')
  }
  const setCSS = (e) => {
    const zero = document.getElementById('zero');
    const one = document.getElementById('one');
    const two = document.getElementById('two');
    if(one!=null){
      one.style.backgroundColor ='white';
      one.style.color='black';
    }
    zero.style.backgroundColor ='white';
    zero.style.color='black';
    two.style.backgroundColor ='white';
    two.style.color='black';

    e.target.style.backgroundColor='#00B0FF'
    e.target.style.color='white'
  }
  const active = () => {
const links = document.querySelectorAll('.nav-link');
if (links.length) {
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      links.forEach((link) => {
          link.classList.remove('active');
      });
      e.preventDefault();
      link.classList.add('active');
    });
  });
}
}
const boxShadow ={
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px" 
}

const buttenCSS={
  color :"white",
  padding :"8px 40px",
  borderRadius:"10px",
  backgroundColor:"#00B0FF",

}
  return (
    <>
      {/* <div className="d-flex justify-content-end">
        <button className="btn btn-primary m-2" onClick={handleLogout}>Logout</button>
      </div> */}
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary" onClick={handleContracts}>load contract</button> <br />
      </div>

      <div className="container row mt-4">
        { isCompany && <div className="col d-flex justify-content-center" >
           <button className="btn w-100"  id='one' onClick={(e)=>{setInd(1);setCSS(e);}}>Update employment Status</button>
        </div>}
        <div className="col d-flex justify-content-center">
          <button className="btn w-100" id='zero' style={{backgroundColor:"#00B0FF",color:"white"}} onClick={(e)=>{setInd(0);setCSS(e);}}>Add Certificate</button>
        </div>
        <div className="col d-flex justify-content-center">
          <button className="btn  w-100" id='two' onClick={(e)=>{setInd(2);setCSS(e);}}>Search User</button>
        </div>
      </div>

      <div>

        <div className="row d-flex justify-content-center">
          {/* <div className="col-4"></div> */}

        {isCompany && ind===1 &&
  
          <div className="col-sm-4 bg-light mt-4 p-4 m-2" style={boxShadow} id="registration">
          <div className="text-success h3">Update employment Status</div>
            
              <form onSubmit={handleExperience}>
                <div className="form-group m-3">
                  <label for="username" className="input-label m-1">Username</label>
                  <input type="text" name="username" className="form-control m-1" />
                </div>
                
                <div className="form-group m-3">
                  
                  <label for="employment">Select :</label>
              <select name="employment" id="employment" className="form-select">
                <option value="Start Date" defaultChecked>Start</option>
                <option value="End Date">End</option>
              </select>
                </div>
                <div className="form-group m-3">
                  
                    <label for="date" className="input-label m-1">Enter Date :</label>
                    <input  className="form-control m-1" type="date" id="date"></input>
                </div>
                <div className="form-group d-flex justify-content-center m-3">
                  <button type="submit" className="" style={buttenCSS} >Update </button>
                </div>

              </form>
          </div>}

          {ind===0 &&<div className="col-sm-4 bg-light mt-4 p-4 m-2" style={boxShadow} id="registration">
            <div className="text-success h3">Add certificates</div>
            <form onSubmit={e => { handleUser(e) }}>
              <div className="form-group m-3">
                <label for="username" className="input-label m-1">Username</label>
                <input type="text" name="username" className="form-control m-1" id="name" placeholder="Username" onChange={handleUsername} />
              </div>
              <div className="form-group m-3">
                <label for="post" className="input-label m-1"></label>
                <input className="form-control m-1" type="file" name="image" accept=".png, .jpg, .jpeg" onChange={e => captureFile(e)} />
              </div>
              <div className="form-group m-3">
                  
                    <label for="date" className="input-label m-1">Enter Issue Date </label>
                    <input onChange={(e)=>setCertIssueDate(e.target.value)} className="form-control m-1"  type="date" id="date"></input>
                </div>
              <div className="form-group d-flex justify-content-center m-3">
                <button type="submit"  style={buttenCSS}>Validate</button>
              </div>
              <div className="form-group d-flex justify-content-center m-3">
                <button onClick={storeFiles} style={buttenCSS}>Add </button>
              </div>
            </form>
          </div>}


          {ind===2 &&<div className="col-sm-3 bg-light mt-4 p-4 m-2" style={boxShadow} id="registration">
          <div className="text-success h3">Search User</div>
            
            <form onSubmit={(e) => handleSearch(e)}>
              <div className="form-group m-3">
                <label for="username" className="input-label m-1">Username</label>
                <input type="text" name="username" className="form-control m-1" />
              </div>
              <div className="form-group d-flex justify-content-center m-3 mt-4">
                <button type="submit" style={buttenCSS}>Search</button>
              </div>

            </form>
          </div>}
        </div>
      </div>
      {Object.keys(upost).length !== 0 && <ShowUser state={{ post: upost }} />}
    </>
  );
}

export default OrganizationDash;