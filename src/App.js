import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login/Login";
import ForgotPassword from "./Auth/Forgot Password/ForgotPassword";
import ConfirmCode from "./Auth/Confirm Code/ConfirmCode";
import NewPassword from "./Auth/Create New Password/NewPassword";
import HomePage from "./Pages/Home Page/HomePage";
import AllTypes from "./Pages/Types/All Types/AllTypes";
import Container from "./Pages/Container/Container";
import AllMessages from "./Pages/Messages/AllMessages/AllMessages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ConfirmCode" element={<ConfirmCode />} />
        <Route path="/NewPassword" element={<NewPassword />} />
        
        {/* Static Navbar and Sidebar */}
        <Route path="/HomePage" element={<HomePage />}>
          <Route index element={<Container />} /> {/* Default child */}
          <Route path="/HomePage/AllTypes" element={<AllTypes />} />
          <Route path="/HomePage/AllMessages" element={<AllMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
