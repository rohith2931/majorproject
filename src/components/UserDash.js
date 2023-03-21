import { useLocation } from "react-router-dom";
function UserDash(props) {
  const { state } = useLocation();
  const { username, userid, post } = state;
  console.log(post);
  let posts=[];
  for (let i = 0; i < post[3].length; i++) {
    posts.push(
      <div className="card mt-5 w-100 shadow-lg" key={i}>
        <div className="card-body">
          {post[3][i].indexOf(".ipfs.w3s.link/image.png") != -1 && (
            <div class="embed-responsive embed-responsive-21by9">
              <img src={"https://" + post[3][i]} alt="" style={{ height: "800px", width: "800px" }}></img>
              <br/>
              <div>{post[4][i]}</div>
            </div>

          )}
        </div>
      </div>
    );
  }

  let employee_status =false; // false indicate unemployed

  if (post[5].length>0){
      let sts =post[5][post[5].length-1].split(' ')[0].toLowerCase()

      if(sts =="end"){
        employee_status = false;
      }
      else{
        employee_status = true;
      }
  }

  return (
    <>
      <div>User Dashbord</div>
      <div>
        welcome {username},your user id is {userid}
      </div>

      <h3>Working Status:</h3>
      {employee_status && <stron>Working</stron>}
      {!employee_status && <stron>Unemployed</stron>}

      <div>Your Experience:</div>
      <ul reversed>{post[5].slice().reverse().map(exp=><strong><li>{exp}</li></strong>)}</ul>

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

export default UserDash;
