
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { BackendUrlProvider } from "./components/BackendUrl.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import CartCheckoutPage from "./pages/CartCheckout.jsx";
import ClickyConfigurator from "./pages/ClickyConfigurator.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Models from "./pages/Models.jsx";
import Signup from "./pages/Signup.jsx";
import SingleModel from "./pages/SingleModel.jsx";
import SuccessCheckoutPage from "./pages/SuccessCheckout.jsx";
import Purchase from "./pages/Purchase.jsx";
import Navbar from './components/Navbar.jsx';
import Profile from './pages/Profile.jsx'

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3004";

export default function App() {
  const [user, setUser] = useState(() => {
    // Reading value of Cookie with name 'user
    const loggedInUser = Cookies.get("user");
    console.log(`user: ${loggedInUser}`);
    if (loggedInUser) {
      // Storing cookie value in user
      return JSON.parse(loggedInUser);
    }
    return {};
  });
  return (
    <BackendUrlProvider backendUrlData={BACKEND_URL}>
      <Router>
        <Navbar user={user}/>
        <Routes>
          <Route path="/" element={<Landing user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/clicky" element={<ClickyConfigurator />} />
          <Route path="/models" element={<Models />} />
          <Route path="/model" element={<SingleModel />} />
          <Route path="/cart-checkout" element={<CartCheckoutPage />} />
          <Route path="/success-checkout" element={<SuccessCheckoutPage />} />
          <Route element={<PrivateRoutes />}>
            {/* all protected routes here */}
            <Route path='/profile' element={<Profile user={user} setUser={setUser}/>} />
            <Route path='/profile/purchase' element={<Purchase user={user}/>} />
          </Route>
        </Routes>
      </Router>
    </BackendUrlProvider>
  );
}
