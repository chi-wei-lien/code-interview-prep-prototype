import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import handleLogin from "./utils/handleLogin";
import handleLogout from "./utils/handleLogout";
import Application from "./utils/Application";
import CodeChallenge from "./utils/CodeChallenge";
import Navbar from "./components/navbar";

// components
import Header from "./components/header";

import "./index.css";
import DashBoard from "./components/dashboard";
import Graphs from "./components/graphs";

function App() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [codeChallenges, setCodeChallenges] = useState<CodeChallenge[]>([]);

  const [page, setPage] = useState("table");

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

  let pageContent;

  if (page === "table") {
    pageContent = (
      <DashBoard
        applications={applications}
        setApplications={setApplications}
        codeChallenges={codeChallenges}
        setCodeChallenges={setCodeChallenges}
      ></DashBoard>
    );
  } else if (page === "about") {
    pageContent = <div>about</div>;
  } else if (page === "graph") {
    pageContent = (
      <div>
        <Graphs
          applications={applications}
          codeChallenges={codeChallenges}
        ></Graphs>
      </div>
    );
  }

  return (
    <div>
      <Header></Header>
      <div className="w-full h-0.5 bg-slate-800 mb-5"></div>
      <Navbar page={page} setPage={setPage}></Navbar>
      {pageContent}
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
