import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import {  useNavigate } from "react-router-dom";
function NavBar(){
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear();
  }
    return (
        <>  
        <nav className="navbar navbar-expand-lg bg-body-tertiary" >
  <div className="container">
    <a className="navbar-brand" href="/"><img src={Logo} alt="" style={{width:"150%"}} /></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          
          <Link to="/home" className="nav-item nav-link"> Home </Link>
        </li>
        <li className="nav-item">
          
        {localStorage.getItem("Login")==null &&  <Link to="/accountAccess" className="nav-item nav-link"> Login </Link>}
        
        </li>
        <li className="nav-item">

        {localStorage.getItem("Login")==null && <Link to="/signUp"className="nav-item nav-link"> Sign Up </Link>}
        </li>
        <li className="nav-item">
        
        {localStorage.getItem("Login") && <Link to="/" onClick={()=>handleLogout()} className="nav-item nav-link"> Logout </Link>}
        </li>
      </ul>
    </div>
  </div>
</nav>
        {/* <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
             <Link to="/home" className="nav-item nav-link active"> Home </Link>
            <Link to="/userLogin"className="nav-item nav-link"> User Login </Link>
            <Link to="/instituteLogin"className="nav-item nav-link"> Institute Login </Link>
            <Link to="/companyLogin"className="nav-item nav-link"> Company Login </Link>
            <Link to="/signUp"className="nav-item nav-link"> Sign Up </Link>
          </div>
        </div>
      </nav> */}
        </>
    )
}

export default NavBar;