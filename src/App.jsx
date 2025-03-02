import { NavLink, Route, Routes } from "react-router-dom";
import SignUpForm from "./components/signUp";
import LogIn from "./components/login";
import { ToastContainer } from "react-toastify";
import Home from "./components/home/home";
import Search from "./components/search/search";
import Create from "./components/create/create";
import Profile from "./components/profile/profile";

function App() {
  return (
    <div>
      <NavLink to="/signup">
        Signup Page
      </NavLink>
      <NavLink to="/login">
        Login Page
      </NavLink>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LogIn />} />

        <Route path="/search" element={<Search />} />
        <Route path="/create" element={<Create />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
