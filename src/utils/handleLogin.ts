import { Dispatch } from "react";
import Application from "./Application";
import { CredentialResponse } from "@react-oauth/google";

const handleLogin = async (
  credentialResponse: CredentialResponse,
  setApplications: Dispatch<React.SetStateAction<Application[]>>
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
