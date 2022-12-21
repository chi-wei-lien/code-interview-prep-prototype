import { Dispatch } from "react";
import Application from "./Application";
import { CredentialResponse } from "@react-oauth/google";
import CodeChallenge from "./CodeChallenge";

const handleLogin = async (
  credentialResponse: CredentialResponse,
  setApplications: Dispatch<React.SetStateAction<Application[]>>,
  setCodeChallenges: Dispatch<React.SetStateAction<CodeChallenge[]>>
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
  });
};

export default handleLogin;
