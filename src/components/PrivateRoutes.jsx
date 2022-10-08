import React, { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import BackendUrlContext from "./BackendUrl.jsx";

const PrivateRoutes = () => {
  const [verification, setVerification] = useState(null);
  const { backendUrl } = useContext(BackendUrlContext);
  const navigate = useNavigate();

  const verifyCookies = async () => {
    // verify cookies
    axios
      .get(`${backendUrl}/verify-cookie`)
      // update useState
      .then((response) => {
        // if cookies are verified
        if (response.data === true) {
          setVerification(true);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    if (!verification) {
      verifyCookies();
    }
  });

  return <Outlet />;
};

export default PrivateRoutes;
