import React, { useEffect } from "react";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import handleLogin from "./utils/handleLogin";
import handleLogout from "./utils/handleLogout";
import Application from "./utils/Application";

function App() {
  const [company, setCompany] = useState("");
  const [companyURL, setCompanyURL] = useState("");
  const [role, setRole] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const callGetApplication = async () => {
      await Application.getApplications().then((apps: Application[]) => {
        setApplications(apps);
      });
    };
    callGetApplication();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch("http://localhost:8080/application", {
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
    }).then(async () => {
      await Application.getApplications().then((apps: Application[]) => {
        setApplications(apps);
      });
      setCompany("");
      setCompanyURL("");
      setCreatedAt("");
      setRole("");
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
            value={company}
          />
        </label>
        <label>
          Enter companyURL:
          <input
            type="text"
            onChange={(event) => setCompanyURL(event.target.value)}
            value={companyURL}
          />
        </label>
        <label>
          Enter role:
          <input
            type="text"
            onChange={(event) => setRole(event.target.value)}
            value={role}
          />
        </label>
        <label>
          Enter createdAt:
          <input
            type="Date"
            onChange={(event) => setCreatedAt(event.target.value)}
            value={createdAt}
          />
        </label>
        <input type="submit" />
      </form>
      {applications.map((application) => {
        return (
          <div key={application.id}>
            <span>{application.company} </span>
            <span>{application.companyURL} </span>
            <span>{application.createdAt} </span>
            <span>{application.role} </span>
          </div>
        );
      })}
    </div>
  );
}

export default App;
