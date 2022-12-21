import ApplicationForm from "./applicationForm";
import { useState } from "react";
import Application from "../utils/Application";

const DashBoard = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  return (
    <div className="flex flex-row justify-center h-screen bg-slate-50">
      <ApplicationForm setApplications={setApplications}></ApplicationForm>
    </div>
  );
};

export default DashBoard;
