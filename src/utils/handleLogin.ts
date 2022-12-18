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

// const handleLogin = async (
//   response: GoogleLoginResponse | GoogleLoginResponseOffline
// ) => {
//   console.log("called");
//   if (!isGoogleLoginResponse(response)) {
//     console.log("rejected");
//     console.log(response);
//     return;
//   }
//   console.log("fetched");
//   const res = await fetch("http://localhost:8080/api/auth/google", {
//     method: "POST",
//     body: JSON.stringify({
//       token: response.tokenId,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await res.json();
// };

// const isGoogleLoginResponse = (
//   response: GoogleLoginResponse | GoogleLoginResponseOffline
// ): response is GoogleLoginResponse => {
//   return (
//     !!response &&
//     typeof response === "object" &&
//     !!(response as GoogleLoginResponse).tokenObj
//   );
// };

export default handleLogin;
