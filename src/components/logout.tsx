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
    <div className="flex flex-row flex-wrap justify-center w-full bg-white h-80">
      <div className="flex flex-col items-center justify-center w-1/3 h-48 border-dashed border-3 border-slate-300">
        <h1 className="pb-5 text-2xl underline decoration-orange-300">Login</h1>
        <button
          onClick={() => {
            handleLogout(setApplications, setCodeChallenges);
            setLoggedIn(false);
            setPage("table");
          }}
          className="underline bg-yellow-theme"
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
