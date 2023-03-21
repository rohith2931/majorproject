import { Link } from "react-router-dom";
function NavBar(){
    return (
        <>  
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
             <Link to="/home" class="nav-item nav-link active"> Home </Link>
            <Link to="/userLogin"class="nav-item nav-link"> User Login </Link>
            <Link to="/organizationLogin"class="nav-item nav-link"> Organization Login </Link>
            <Link to="/signUp"class="nav-item nav-link"> Sign Up </Link>
          </div>
        </div>
      </nav>
        </>
    )
}

export default NavBar;