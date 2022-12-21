import React, { useEffect } from "react";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import handleLogin from "./utils/handleLogin";
import handleLogout from "./utils/handleLogout";
import Application from "./utils/Application";
import ApplicationTable from "./components/applicationTable";

function App() {
  const [applications, setApplications] = useState<Application[]>([]);

  const [company, setCompany] = useState("");
  const [companyURL, setCompanyURL] = useState("");
  const [role, setRole] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const callGetApplication = async () => {
    await Application.getApplications().then((apps: Application[]) => {
      setApplications(apps);
    });
  };
  useEffect(() => {
    callGetApplication();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await Application.addApplication(company, companyURL, role, createdAt).then(
      async () => {
        await Application.getApplications().then((apps: Application[]) => {
          setApplications(apps);
          setCompany("");
          setCompanyURL("");
          setCreatedAt("");
          setRole("");
        });
      }
    );
  };

  return (
    <div className="App">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleLogin(credentialResponse, setApplications);
        }}
        onError={() => {
          console.error("Login Failed");
        }}
      />
      <button
        onClick={() => {
          handleLogout(setApplications);
        }}
      >
        logout
      </button>
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
      <ApplicationTable
        applications={applications}
        setApplications={setApplications}
      ></ApplicationTable>
    </div>
  );
}

export default App;
