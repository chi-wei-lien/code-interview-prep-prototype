import { Dispatch } from "react";

import handleLogout from "../utils/handleLogout";
import Application from "../utils/Application";
import CodeChallenge from "../utils/CodeChallenge";

interface ILogoutProps {
  setApplications: Dispatch<React.SetStateAction<Application[]>>;
  setCodeChallenges: Dispatch<React.SetStateAction<CodeChallenge[]>>;
  setLoggedIn: Dispatch<React.SetStateAction<boolean>>;
}

const Logout = ({
  setApplications,
  setCodeChallenges,
  setLoggedIn,
}: ILogoutProps) => {
  return (
    <button
      onClick={() => {
        handleLogout(setApplications, setCodeChallenges);
        setLoggedIn(false);
      }}
    >
      logout
    </button>
  );
};

export default Logout;
