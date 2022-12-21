class CodeChallenge {
  public challenge;
  public challengeURL;
  public createdAt;
  public id;
  public static path = "code-challenge";

  constructor(
    challenge: string,
    challengeURL: string,
    createdAt: string,
    id: number
  ) {
    this.challenge = challenge;
    this.challengeURL = challengeURL;
    this.createdAt = new Date(createdAt).toDateString();
    this.id = id;
  }

  static getCodeChallenges = async (): Promise<CodeChallenge[]> => {
    const fetchedCodeChallenges: CodeChallenge[] = [];
    return new Promise(async (resolve, reject) => {
      await fetch(`${process.env.REACT_APP_API}/${CodeChallenge.path}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          for (const challenge of response.challenges) {
            fetchedCodeChallenges.push(
              new CodeChallenge(
                challenge.challenge,
                challenge.challengeURL,
                challenge.createdAt,
                challenge.id
              )
            );
          }
          console.log(fetchedCodeChallenges);
          resolve(fetchedCodeChallenges);
        })
        .catch((err) => reject(err));
    });
  };

  static addCodeChallenge = async (
    challenge: string,
    challengeURL: string,
    createdAt: string
  ) => {
    await fetch(`${process.env.REACT_APP_API}/${CodeChallenge.path}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        challenge,
        challengeURL,
        createdAt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  static updateCodeChallenge = async (
    challenge: string,
    challengeURL: string,
    createdAt: string,
    id: number
  ) => {
    await fetch(`${process.env.REACT_APP_API}/${CodeChallenge.path}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        challenge,
        challengeURL,
        createdAt,
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  static removeCodeChallenge = async (id: number) => {
    await fetch(`${process.env.REACT_APP_API}/${CodeChallenge.path}`, {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}

export default CodeChallenge;
