import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImageComponent } from "./ImageComponent";
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
      <div className="col">
      <div className="card mt-5 w-100 shadow-lg" key={i}>
        {/* <div className="card-body"> */}
          {post[3][i].indexOf(".ipfs.w3s.link/image.png") != -1 && (
            <div className="embed-responsive embed-responsive-21by9">
              <ImageComponent src={"https://" + post[3][i]} alt="" height="100%" width="100%"></ImageComponent>
              <br/>
              <div>{post[4][i]}</div>
            </div>

          )}
          
        {/* </div> */}
        <div className="card-footer">
            <strong>Issued by: </strong>{post[5][i]}
            <br/>
            <strong>Issue Date: </strong>{post[9][i]}
        </div>
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
      
         
      
  <div className="d-flex justify-content-center m-4" >
  <div className="card" style={{borderRadius:'10px',boxShadow:'2px 2px 4px black'}}>
    <ul className="list-group list-group-flush">
     <li className="list-group-item">
     <div><strong>Name :&nbsp;</strong>{post[8]}</div>
      </li> 
    <li className="list-group-item"><h5>Working Status : 
      {employee_status && <p className="d-inline">&nbsp;Working</p>}
      {!employee_status && <p className="d-inline">Unemployed</p>}
      </h5></li>
    <li className="list-group-item"><div>His/Her Experience:</div>
      <ul reversed>{post[6].slice().reverse().map((exp,index)=><strong key={index}><li>{exp}</li></strong>)}</ul>
      </li>
  </ul>
  </div>  
  </div>   

      <div className="d-flex justify-content-center display-6" style={{fontSize:"30px"}}><b>His/Her available certificates are:</b></div>
      <div className="row row-cols-2 row-cols-md-3 g-3">
      {
        (posts.length>0) && posts.map(post => post)
      }
      {
        posts.length==0 &&<strong>No certificates are uploaded till now...</strong>
      }
      </div>

    </>
  );
}

export default ShowUser;