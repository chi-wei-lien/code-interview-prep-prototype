import React from "react";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import handleLogin from "./utils/handleLogin";
import handleLogout from "./utils/handleLogout";

function App() {
  const [company, setCompany] = useState("");
  const [companyURL, setCompanyURL] = useState("");
  const [role, setRole] = useState("");
  const [createdAt, setCreateAt] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch("http://localhost:8080/application", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        company,
        companyURL,
        role,
        createdAt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="App">
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => {
          console.error("Login Failed");
        }}
      />
      <button onClick={handleLogout}>logout</button>
      <form onSubmit={handleSubmit}>
        <label>
          Enter company:
          <input
            type="text"
            onChange={(event) => setCompany(event.target.value)}
          />
        </label>
        <label>
          Enter companyURL:
          <input
            type="text"
            onChange={(event) => setCompanyURL(event.target.value)}
          />
        </label>
        <label>
          Enter role:
          <input
            type="text"
            onChange={(event) => setRole(event.target.value)}
          />
        </label>
        <label>
          Enter createdAt:
          <input
            type="Date"
            onChange={(event) => setCreateAt(event.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
