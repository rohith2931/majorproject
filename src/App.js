import Home from "./components/Home";
import Login from "./components/Login";
import { Routes, Route } from 'react-router-dom'
// import {Switch} from "react-router"
import NavBar from "./components/NavBar";
import StudentDash from "./components/StudentDash";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/studentDash" element={<StudentDash />} />
      </Routes>
    </div>
  );
}

export default App;
