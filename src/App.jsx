import axios from "axios";
import Cookies from "js-cookie"; // i realize we are using both react-cookie and js-cookie
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { BackendUrlProvider } from "./components/BackendUrl.jsx";
import NavBar from "./components/Navbar";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import AccessDeniedPage from "./pages/AccessDenied.jsx";
import AboutUs from "./pages/admin/AboutUs";
import ContactUs from "./pages/admin/ContactUs";
import Delivery from "./pages/admin/Delivery";
import ReturnsPolicy from "./pages/admin/ReturnsPolicy";
import CartPage from "./pages/Cart.jsx";
import CartCheckoutPage from "./pages/CartCheckout.jsx";
import ClickyConfigurator from "./pages/ClickyConfigurator.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Models from "./pages/Models.jsx";
import Signup from "./pages/Signup.jsx";
import SingleModel from "./pages/SingleModel.jsx";
import SuccessCheckoutPage from "./pages/SuccessCheckout.jsx";

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3004";

export default function App() {
  const [user, setUser] = useState(() => {
    // Reading value of Cookie with name 'user
    const loggedInUser = Cookies.get("user");
    if (loggedInUser) {
      // Storing cookie value in user
      return JSON.parse(loggedInUser);
    }
    return {};
  });

  return (
    <BackendUrlProvider backendUrlData={BACKEND_URL}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/clicky" element={<ClickyConfigurator />} />
          <Route path="/models" element={<Models />} />
          <Route path="/model" element={<SingleModel />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/access-denied" element={<AccessDeniedPage />} />
          <Route path="/admin/contact-us" element={<ContactUs />} />
          <Route path="/admin/returns-policy" element={<ReturnsPolicy />} />
          <Route path="/admin/delivery" element={<Delivery />} />
          <Route path="/admin/about-us" element={<AboutUs />} />
          <Route element={<PrivateRoutes user={user} />}>
            <Route
              path="/cart-checkout"
              element={<CartCheckoutPage user={user} />}
            />
            <Route path="/success-checkout" element={<SuccessCheckoutPage />} />
            {/* all protected routes here */}
          </Route>
        </Routes>
      </Router>
    </BackendUrlProvider>
  );
}
