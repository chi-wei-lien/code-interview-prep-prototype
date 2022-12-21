import { Dispatch } from "react";
import Application from "./Application";

const handleLogout = async (
  setApplications: Dispatch<React.SetStateAction<Application[]>>
) => {
  await fetch(`${process.env.REACT_APP_API}/api/auth/google/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    setApplications([]);
  });
};

export default handleLogout;
