import Home from "./components/Home";
import Login from "./components/Login";
import { Routes, Route } from 'react-router-dom'
// import {Switch} from "react-router"
import NavBar from "./components/NavBar";
import UserDash from "./components/UserDash";
import OrganizationDash from "./components/OrganizationDash";
import SignUp from "./components/SignUp";

function App() {
  localStorage.setItem("isUserLogin",false);
  localStorage.setItem("isCompanyLogin",false);
  localStorage.setItem("isInstituteLogin",false);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/userLogin" element={<Login isUser={true}/>} />
        <Route exact path="/instituteLogin" element={<Login isInstitute={true}/>} />
        <Route exact path="/companyLogin" element={<Login isCompany={true}/>} />
        <Route exact path="/signUp" element={<SignUp/>} />
        <Route exact path="/userDash" element={<UserDash />} />
        <Route exact path="/instituteDash" element={<OrganizationDash isInstitute={true}/>} />
        <Route exact path="/companyDash" element={<OrganizationDash isCompany={true}/>} />
      </Routes>
    </div>
  );
}

export default App;
