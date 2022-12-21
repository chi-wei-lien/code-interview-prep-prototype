import { useState } from "react";

import Application from "../utils/Application";
import CodeChallenge from "../utils/CodeChallenge";

import ApplicationForm from "./applicationForm";
import CodeChallengeForm from "./codeChallengeForm";

const DashBoard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [codeChallenges, setCodeChallenges] = useState<CodeChallenge[]>([]);

  return (
    <div className="flex flex-row flex-wrap justify-center w-full bg-slate-50">
      <ApplicationForm setApplications={setApplications}></ApplicationForm>
      <div className="h-4 basis-full"></div>
      <CodeChallengeForm
        setCodeChallenges={setCodeChallenges}
      ></CodeChallengeForm>
    </div>
  );
};

export default DashBoard;
