import React, { useEffect } from "react";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import handleLogin from "./utils/handleLogin";
import handleLogout from "./utils/handleLogout";
import Application from "./utils/Application";
import ApplicationTable from "./components/applicationTable";
import CodeChallenge from "./utils/CodeChallenge";
import CodeChallengeTable from "./components/codeChallengeTable";
import ApplicationForm from "./components/applicationForm";
import CodeChallengeForm from "./components/codeChallengeForm";

// components
import Header from "./components/header";

import "./index.css";
import DashBoard from "./components/dashboard";

function App() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [codeChallenges, setCodeChallenges] = useState<CodeChallenge[]>([]);

  const fetchApplications = async () => {
    await Application.getApplications().then((apps: Application[]) => {
      setApplications(apps);
    });
  };

  const fetchCodeChallenges = async () => {
    CodeChallenge.getCodeChallenges().then((challenges: CodeChallenge[]) => {
      setCodeChallenges(challenges);
    });
  };

  useEffect(() => {
    fetchApplications();
    fetchCodeChallenges();
  }, []);

  return (
    <div>
      <Header></Header>
      <DashBoard></DashBoard>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleLogin(credentialResponse, setApplications, setCodeChallenges);
        }}
        onError={() => {
          console.error("Login Failed");
        }}
      />
      <button
        onClick={() => {
          handleLogout(setApplications, setCodeChallenges);
        }}
      >
        logout
      </button>
    </div>
  );
}

export default App;
