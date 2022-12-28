import { GoogleLogin } from "@react-oauth/google";
import { Dispatch } from "react";
import CodeChallenge from "../utils/CodeChallenge";
import Application from "../utils/Application";
import handleLogin from "../utils/handleLogin";
import Status from "../utils/Status";

interface ILoginProps {
  setApplications: Dispatch<React.SetStateAction<Application[]>>;
  setCodeChallenges: Dispatch<React.SetStateAction<CodeChallenge[]>>;
  setStatusesMap: Dispatch<React.SetStateAction<Map<number, Status>>>;
  setLoggedIn: Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({
  setApplications,
  setCodeChallenges,
  setStatusesMap,
  setLoggedIn,
}: ILoginProps) => {
  return (
    <div className="flex flex-row flex-wrap justify-center w-full bg-white h-80">
      <div className="flex flex-col items-center justify-center h-48 border-dashed min-w-fit border-3 border-slate-300">
        <h1 className="pb-5 text-2xl underline decoration-orange-300">Login</h1>
        <div className="p-5">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleLogin(
                credentialResponse,
                setApplications,
                setCodeChallenges,
                setStatusesMap
              );
              setLoggedIn(true);
              // localStorage.setItem("loggedIn", JSON.stringify(true));
            }}
            onError={() => {
              console.error("Login Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
