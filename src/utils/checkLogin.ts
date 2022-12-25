const checkLogin = (): Promise<Boolean> => {
  return new Promise<Boolean>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/check`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        resolve(response.isLoggedIn);
      })
      .catch((err) => reject(err));
  });
};

export default checkLogin;
