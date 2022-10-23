import { createContext } from "react";

const BackendUrlContext = createContext();

export function BackendUrlProvider({ children, backendUrlData }) {
  return (
    <BackendUrlContext.Provider value={{ backendUrl: backendUrlData }}>
      {children}
    </BackendUrlContext.Provider>
  );
}

export default BackendUrlContext;
