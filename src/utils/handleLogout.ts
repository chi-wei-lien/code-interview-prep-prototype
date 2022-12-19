import { CredentialResponse } from "@react-oauth/google";

const handleLogout = async () => {
  const res = await fetch("http://localhost:8080/api/auth/google/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default handleLogout;
