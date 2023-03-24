// import Navbar from "Navbar.js"
import Home1 from "../assets/Home1.svg";
import Home2 from "../assets/Home2.svg";
import "../css/home.css"
function Home(props) {
  return(
  <>
    
    <div className="screen row g-0">
      <div className="col-8 home-text">
        <p className="main-title">
          One stop solution for tracking applicant credentials
        </p>
        <p className="main-subtitle">
          <strong>CredTracker</strong> is a software platform that helps
          streamline the process of collecting, verifying, and managing
          candidate credentials. This platform typically includes features such
          as Employement Status,and document storage, which allows recruiters
          and hiring managers to easily track and manage the progress of each
          candidate throughout the hiring process. By providing a decentralized
          platform for tracking applicant credentials, this solution can help
          save time, reduce errors, and improve the overall efficiency of the
          hiring process.
        </p>
      </div>
      <div className="col-4">
        <img src={Home1} alt="" />
      </div>
    </div>
    <div className="screen row g-0">
      <div className="col-4">
        <img src={Home2} alt="" />
      </div>
      <div className="col-8 home-text">
        <p className="main-title">Blockchain as Infrastructure</p>
        <p className="main-subtitle">
          It's decentralized, tamper-resistant, and trustless nature makes it an
          ideal infrastructure. provides a secure and transparent platform for
          data storage and smart contract execution. blockchain-based
          infrastructure can help establish trust and reduce the risks
          associated with third-party intermediaries, enabling more direct and
          efficient interactions between parties.
        </p>
      </div>
    </div>

  </>
  )
}

export default Home;
