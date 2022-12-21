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

function App() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [codeChallenges, setCodeChallenges] = useState<CodeChallenge[]>([]);

  const fetchApplications = async () => {
    await Application.getApplications().then((apps: Application[]) => {
      setApplications(apps);
    });
  };

  const fetchCodeChallenges = async () => {
    console.log("called");
    CodeChallenge.getCodeChallenges().then((challenges: CodeChallenge[]) => {
      setCodeChallenges(challenges);
    });
  };

  useEffect(() => {
    fetchApplications();
    fetchCodeChallenges();
  }, []);

  return (
    <div className="App">
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
      <ApplicationForm setApplications={setApplications}></ApplicationForm>
      <ApplicationTable
        applications={applications}
        setApplications={setApplications}
      ></ApplicationTable>
      <CodeChallengeForm
        setCodeChallenges={setCodeChallenges}
      ></CodeChallengeForm>
      <CodeChallengeTable
        codeChallenges={codeChallenges}
        setCodeChallenge={setCodeChallenges}
      ></CodeChallengeTable>
    </div>
  );
}

export default App;
