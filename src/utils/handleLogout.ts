import { Dispatch } from "react";
import Application from "./Application";
import CodeChallenge from "./CodeChallenge";

const handleLogout = async (
  setApplications: Dispatch<React.SetStateAction<Application[]>>,
  setCodeChallenges: Dispatch<React.SetStateAction<CodeChallenge[]>>
) => {
  await fetch(`${process.env.REACT_APP_API}/api/auth/google/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    setApplications([]);
    setCodeChallenges([]);
  });
};

export default handleLogout;
