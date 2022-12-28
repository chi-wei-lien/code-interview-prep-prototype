import React, { Dispatch } from "react";
import Application from "./Application";
import { CredentialResponse } from "@react-oauth/google";
import CodeChallenge from "./CodeChallenge";
import Status from "./Status";

const handleLogin = async (
  credentialResponse: CredentialResponse,
  setApplications: Dispatch<React.SetStateAction<Application[]>>,
  setCodeChallenges: Dispatch<React.SetStateAction<CodeChallenge[]>>,
  setStatusesMap: Dispatch<React.SetStateAction<Map<number, Status>>>
) => {
  await fetch(`${process.env.REACT_APP_API}/api/auth/google`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      token: credentialResponse.credential,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async () => {
    await Application.getApplications().then((apps: Application[]) => {
      setApplications(apps);
    });
    await CodeChallenge.getCodeChallenges().then(
      (challenges: CodeChallenge[]) => {
        setCodeChallenges(challenges);
      }
    );
    await Status.getStatusesMap().then((statusesMap) => {
      setStatusesMap(statusesMap);
    });
  });
};

export default handleLogin;
