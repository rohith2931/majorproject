import { Link } from "react-router-dom";
function NavBar(){
    return (
        <>
            <Link to="/home"> Home </Link>
            <Link to="/userLogin"> User Login </Link>
            <Link to="/organizationLogin"> Organization Login </Link>
            <Link to="/signUp"> Sign Up </Link>
        </>
    )
}

export default NavBar;