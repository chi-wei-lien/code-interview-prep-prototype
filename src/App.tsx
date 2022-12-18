import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import handleLogin from "./utils/handleLogin";

function App() {
  return (
    <div className="App">
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => {
          console.error("Login Failed");
        }}
      />
    </div>
  );
}

export default App;
