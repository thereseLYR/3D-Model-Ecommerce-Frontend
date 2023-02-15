import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <CookiesProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </CookiesProvider>
  // </React.StrictMode>
);
