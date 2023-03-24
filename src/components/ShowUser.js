import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
function ShowUser(props) {
  const navigate=useNavigate();

  const { state } = useLocation();
  const { post } = state||props.state;
  const username=post[1] 
  console.log(post);
  

  let posts=[];
  for (let i = 0; i < post[3].length; i++) {
    posts.push(
      <div className="card mt-5 w-100 shadow-lg" key={i}>
        <div className="card-body">
          {post[3][i].indexOf(".ipfs.w3s.link/image.png") != -1 && (
            <div className="embed-responsive embed-responsive-21by9">
              <img src={"https://" + post[3][i]} alt="" style={{ height: "800px", width: "800px" }}></img>
              <br/>
              <div>{post[4][i]}</div>
            </div>

          )}
          
        </div>
        <div className="card-footer">
            <strong>Issued by: </strong>{post[5]}
        </div>
      </div>
    );
  }

  let employee_status =false; // false indicate unemployed

  if (post[6].length>0){
      let sts =post[6][post[6].length-1].split(' ')[0].toLowerCase()

      if(sts =="end"){
        employee_status = false;
      }
      else{
        employee_status = true;
      }
  }

   // Logout
   const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <>
      
         <div><strong>Name :</strong>{post[8]}</div>
      
      <h3>Working Status:</h3>
      {employee_status && <strong>Working</strong>}
      {!employee_status && <strong>Unemployed</strong>}

      <div>Your Experience:</div>
      <ul reversed>{post[6].slice().reverse().map((exp,index)=><strong key={index}><li>{exp}</li></strong>)}</ul>

      <div>your available certificates are:</div>

      {
        (posts.length>0) && posts.map(post => post)
      }
      {
        posts.length==0 &&<strong>No certificates are uploaded till now...</strong>
      }

    </>
  );
}

export default ShowUser;