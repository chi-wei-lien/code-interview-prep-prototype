import { CredentialResponse } from "@react-oauth/google";

const handleLogin = async (credentialResponse: CredentialResponse) => {
  console.log(credentialResponse);
  const res = await fetch("http://localhost:8080/api/auth/google", {
    method: "POST",
    body: JSON.stringify({
      token: credentialResponse.credential,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default handleLogin;
