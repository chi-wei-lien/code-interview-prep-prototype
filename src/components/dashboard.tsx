import { useState, useEffect, Dispatch } from "react";

import Application from "../utils/Application";
import CodeChallenge from "../utils/CodeChallenge";
import Status from "../utils/Status";

import ApplicationForm from "./applicationForm";
import ApplicationTable from "./applicationTable";
import CodeChallengeForm from "./codeChallengeForm";
import CodeChallengeTable from "./codeChallengeTable";

interface IDashBoardProps {
  applications: Application[];
  setApplications: Dispatch<React.SetStateAction<Application[]>>;
  codeChallenges: CodeChallenge[];
  setCodeChallenges: Dispatch<React.SetStateAction<CodeChallenge[]>>;
  statuses: Map<number, Status>;
  setStatuses: React.Dispatch<React.SetStateAction<Map<number, Status>>>;
}

const DashBoard = ({
  applications,
  setApplications,
  codeChallenges,
  setCodeChallenges,
  statuses,
  setStatuses,
}: IDashBoardProps) => {
  return (
    <div className="flex flex-row flex-wrap justify-center w-full bg-white">
      <ApplicationForm setApplications={setApplications}></ApplicationForm>
      <div className="h-4 basis-full"></div>
      <CodeChallengeForm
        setCodeChallenges={setCodeChallenges}
      ></CodeChallengeForm>
      <div className="h-4 basis-full"></div>
      <ApplicationTable
        applications={applications}
        setApplications={setApplications}
        statuses={statuses}
        setStatuses={setStatuses}
      ></ApplicationTable>
      <div className="h-4 basis-full"></div>

      <CodeChallengeTable
        codeChallenges={codeChallenges}
        setCodeChallenge={setCodeChallenges}
      ></CodeChallengeTable>
    </div>
  );
};

export default DashBoard;
