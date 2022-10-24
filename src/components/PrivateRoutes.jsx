import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BackendUrlContext from "./BackendUrl.jsx";

const PrivateRoutes = ({ user }) => {
  const [verification, setVerification] = useState(
    !(user && Object.keys(user).length === 0)
  );
  const { backendUrl } = useContext(BackendUrlContext);
  const navigate = useNavigate();

  const verifyCookies = async () => {
    // verify cookies
    if (verification) {
      axios
        .get(`${backendUrl}/verify-cookie`)
        .then((response) => {
          if (response.data === true) {
            setVerification(true);
          } else {
            console.log("[ERROR] unable to verify user");
            navigate("/");
          }
        })
        .catch((error) => {
          console.log("[ERROR] unable to verify cookie: ", error);
          navigate("/access-denied");
        });
    } else {
      navigate("/access-denied");
    }
  };

  useEffect(() => {
    if (!verification) {
      verifyCookies();
    }
  });

  return <Outlet />;
};

export default PrivateRoutes;
