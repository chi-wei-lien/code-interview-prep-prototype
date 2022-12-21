import { useState, Dispatch } from "react";
import CodeChallenge from "../utils/CodeChallenge";

interface ICodeChallengeForm {
  setCodeChallenges: Dispatch<React.SetStateAction<CodeChallenge[]>>;
}

const CodeChallengeForm = ({ setCodeChallenges }: ICodeChallengeForm) => {
  const [challenge, setChallenge] = useState("");
  const [challengeURL, setChallengeURL] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await CodeChallenge.addCodeChallenge(
      challenge,
      challengeURL,
      createdAt
    ).then(async () => {
      await CodeChallenge.getCodeChallenges().then(
        (challenges: CodeChallenge[]) => {
          setCodeChallenges(challenges);
          setChallenge("");
          setChallengeURL("");
          setCreatedAt("");
        }
      );
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter code challenge:
        <input
          type="text"
          onChange={(event) => setChallenge(event.target.value)}
          value={challenge}
        />
      </label>
      <label>
        Enter code challenge url:
        <input
          type="text"
          onChange={(event) => setChallengeURL(event.target.value)}
          value={challengeURL}
        />
      </label>
      <label>
        Enter createdAt:
        <input
          type="Date"
          onChange={(event) => setCreatedAt(event.target.value)}
          value={createdAt}
        />
      </label>
      <input type="submit" />
    </form>
  );
};

export default CodeChallengeForm;
