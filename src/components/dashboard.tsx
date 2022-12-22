import { useState, useEffect } from "react";

import Application from "../utils/Application";
import CodeChallenge from "../utils/CodeChallenge";

import ApplicationForm from "./applicationForm";
import ApplicationTable from "./applicationTable";
import CodeChallengeForm from "./codeChallengeForm";

const DashBoard = () => {
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
    <div className="flex flex-row flex-wrap justify-center w-full bg-slate-50">
      <ApplicationForm setApplications={setApplications}></ApplicationForm>
      <div className="h-4 basis-full"></div>
      <CodeChallengeForm
        setCodeChallenges={setCodeChallenges}
      ></CodeChallengeForm>
      <div className="h-4 basis-full"></div>
      <ApplicationTable
        applications={applications}
        setApplications={setApplications}
      ></ApplicationTable>
    </div>
  );
};

export default DashBoard;
