import { useState } from "react";
function SignUp(props){
    const [username,setUsername] = useState('');
    const [userid,setUserid] = useState('');
    const [role,setRole] = useState('');
    const handleFormSubmit = (e)=>{
        e.preventDefault();

        setUsername(e.target.username.value)
        setUserid(e.target.userid.value)
        setRole(e.target.role.value)


    }
    console.log(username,userid,role);
    return(
        <>
            <div>Sign Up</div>
            <form onSubmit={e=>handleFormSubmit(e)}>
                <label>Enter Username :</label>
                <input type={"text"} name="username"/> 
                <label>Enter User id :</label>
                <input type={"text"} name="userid"/> 
                <label>Enter Role:</label>
                <select name="role">
                    <option value="user" defaultChecked>User</option>
                    <option value="organization">Organization</option>
                </select>
                <button type={"submit"}>Submit</button>
            </form>
        </>
    )
}

export default SignUp;