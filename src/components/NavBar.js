import { Link } from "react-router-dom";
function NavBar(){
    return (
        <>
            <Link to="home">Home</Link>
            <Link to="login">Login</Link>
        </>
    )
}

export default NavBar;