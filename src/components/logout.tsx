import { Dispatch } from "react";

import handleLogout from "../utils/handleLogout";
import Application from "../utils/Application";
import CodeChallenge from "../utils/CodeChallenge";

interface ILogoutProps {
  setApplications: Dispatch<React.SetStateAction<Application[]>>;
  setCodeChallenges: Dispatch<React.SetStateAction<CodeChallenge[]>>;
  setLoggedIn: Dispatch<React.SetStateAction<boolean>>;
  setPage: Dispatch<React.SetStateAction<string>>;
}

const Logout = ({
  setApplications,
  setCodeChallenges,
  setLoggedIn,
  setPage,
}: ILogoutProps) => {
  return (
    <button
      onClick={() => {
        handleLogout(setApplications, setCodeChallenges);
        setLoggedIn(false);
        setPage("table");
      }}
    >
      logout
    </button>
  );
};

export default Logout;
