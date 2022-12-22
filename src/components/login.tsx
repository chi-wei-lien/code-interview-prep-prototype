import { GoogleLogin } from "@react-oauth/google";
import { Dispatch } from "react";
import CodeChallenge from "../utils/CodeChallenge";
import Application from "../utils/Application";
import handleLogin from "../utils/handleLogin";

interface ILoginProps {
  setApplications: Dispatch<React.SetStateAction<Application[]>>;
  setCodeChallenges: Dispatch<React.SetStateAction<CodeChallenge[]>>;
  setLoggedIn: Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({
  setApplications,
  setCodeChallenges,
  setLoggedIn,
}: ILoginProps) => {
  return (
    <div className="flex flex-row flex-wrap justify-center w-full bg-white h-80">
      <div className="flex flex-col items-center justify-center w-1/3 h-48 border-dashed border-3 border-slate-300">
        <h1 className="pb-5 text-2xl underline decoration-orange-300">Login</h1>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            handleLogin(credentialResponse, setApplications, setCodeChallenges);
            setLoggedIn(true);
          }}
          onError={() => {
            console.error("Login Failed");
          }}
        />
      </div>
    </div>
  );
};

export default Login;
