import { useEffect, useState } from "react";
import Navbar from "./components/navbar";

import "./index.css";

// utils
import checkLogin from "./utils/checkLogin";
import Status from "./utils/Status";
import Application from "./utils/Application";
import CodeChallenge from "./utils/CodeChallenge";

// components
import Header from "./components/header";
import DashBoard from "./components/dashboard";
import Graphs from "./components/graphs";
import Login from "./components/login";
import Logout from "./components/logout";
import About from "./components/about";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function App() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [codeChallenges, setCodeChallenges] = useState<CodeChallenge[]>([]);
  const [statusesMap, setStatusesMap] = useState<Map<number, Status>>(
    new Map()
  );

  const [page, setPage] = useState("table");
  const [loggedIn, setLoggedIn] = useState(false);

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

  const fetchStatuses = async () => {
    Status.getStatusesMap().then((statusesMap) => {
      setStatusesMap(statusesMap);
    });
  };

  const runCheckLogin = async () => {
    return checkLogin();
  };

  const initializeState = async () => {
    if (await runCheckLogin()) {
      fetchApplications();
      fetchCodeChallenges();
      fetchStatuses();
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    initializeState();
  }, []);

  let pageContent;

  if (page === "table") {
    if (loggedIn) {
      pageContent = (
        <DashBoard
          applications={applications}
          setApplications={setApplications}
          codeChallenges={codeChallenges}
          setCodeChallenges={setCodeChallenges}
          statusesMap={statusesMap}
          setStatusesMap={setStatusesMap}
        ></DashBoard>
      );
    } else {
      pageContent = (
        <Login
          setApplications={setApplications}
          setCodeChallenges={setCodeChallenges}
          setLoggedIn={setLoggedIn}
          setStatusesMap={setStatusesMap}
        ></Login>
      );
    }
  } else if (page === "about") {
    pageContent = <About></About>;
  } else if (page === "graph") {
    if (loggedIn) {
      pageContent = (
        <div>
          <Graphs
            applications={applications}
            codeChallenges={codeChallenges}
            statuses={statusesMap}
          ></Graphs>
        </div>
      );
    } else {
      pageContent = (
        <Login
          setApplications={setApplications}
          setCodeChallenges={setCodeChallenges}
          setLoggedIn={setLoggedIn}
          setStatusesMap={setStatusesMap}
        ></Login>
      );
    }
  } else if (page == "logout") {
    if (loggedIn) {
      pageContent = (
        <div>
          <Logout
            setApplications={setApplications}
            setCodeChallenges={setCodeChallenges}
            setLoggedIn={setLoggedIn}
            setPage={setPage}
          ></Logout>
        </div>
      );
    }
  }

  return (
    <div>
      <Header></Header>
      <div className="w-full h-0.5 bg-slate-800 mb-5"></div>
      <Navbar loggedIn={loggedIn} page={page} setPage={setPage}></Navbar>
      {pageContent}
    </div>
  );
}

export default App;
