import { useLocation } from "react-router-dom";
function UserDash(props) {
  const { state } = useLocation();
  const { username, userid, post } = state;
  console.log(post);
  let posts=[];
  for (let i = 0; i < post[3].length; i++) {
    posts.push(
      <div className="card mt-5 w-100 shadow-lg">
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
  return (
    <>
      <div>User Dashbord</div>
      <div>
        welcome {username},your user id is {userid}
      </div>
      <div>your available certificates are:</div>

      {
        posts.map(post => post)
      }

    </>
  );
}

export default UserDash;
