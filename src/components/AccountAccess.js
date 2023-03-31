import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/accountAccess.css";
import user from "../assets/user.svg";
import institute from "../assets/institute.svg";
import company from "../assets/company.svg";
function AccountAccess() {
  const navigate = useNavigate();
  return (
    <>
      <div className="account-access row text-center ">
        <div className="col-4">
          <div class="comp">
            <div className="account-ioc">
              <img src={company} />
            </div>
            <h2>
              For <em>Companies</em>
            </h2>
            <p>Hiring a right person which Fosters Business Growth and  Maximizes Productivity </p>
            <button className="account-access-company-login"  onClick={() => navigate("/companyLogin")}>login </button>
          </div>
        </div>

        <div className="col-4">
          <div>
            <div className="account-ioc">
              <img src={institute} />
            </div>
            <h2>
              For <em>Institutions</em>
            </h2>
            <p>Issues Certificate to user using <strong>CredTracker</strong> which cannot be counterfeited </p>

            <button className="account-access-institute-login"   onClick={() => navigate("/instituteLogin")}>
              login
            </button>
          </div>
        </div>

        <div className="col-4">
          <div>
            <div className="account-ioc">
              <img src={user} />
            </div>
            <h2>
              {" "}
              For <em>Users</em>{" "}
            </h2>
            <p> Get into the space of  network reliability, by securing your Certificate and employee history </p>
            <button className="account-access-user-login"   onClick={() => navigate("/userLogin")}>login </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountAccess;
