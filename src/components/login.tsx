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
    <div>
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
  );
};

export default Login;
