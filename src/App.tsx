import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import handleLogin from "./utils/handleLogin";
import handleLogout from "./utils/handleLogout";

function App() {
  return (
    <div className="App">
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => {
          console.error("Login Failed");
        }}
      />
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default App;
