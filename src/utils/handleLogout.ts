import { Dispatch } from "react";
import Application from "./Application";

const handleLogout = async (
  setApplications: Dispatch<React.SetStateAction<Application[]>>
) => {
  await fetch("http://localhost:8080/api/auth/google/logout", {
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
