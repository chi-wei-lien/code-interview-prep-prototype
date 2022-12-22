import React, { useEffect } from "react";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import handleLogin from "./utils/handleLogin";
import handleLogout from "./utils/handleLogout";
import Application from "./utils/Application";
import CodeChallenge from "./utils/CodeChallenge";

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
      <div className="w-full h-0.5 bg-slate-800 mb-5"></div>
      <div className="flex justify-center gap-4 mb-7">
        <button className="px-5 py-1 font-bold border-2 rounded-full bg-yellow-theme border-slate-800">
          Table
        </button>
        <button className="px-5 py-1 font-bold border-2 rounded-full border-slate-800">
          Graph
        </button>
        <button className="px-5 py-1 font-bold border-2 rounded-full border-slate-800">
          About
        </button>
      </div>
      <DashBoard
        applications={applications}
        setApplications={setApplications}
        codeChallenges={codeChallenges}
        setCodeChallenges={setCodeChallenges}
      ></DashBoard>
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
