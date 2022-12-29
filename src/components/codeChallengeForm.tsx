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
    <div className="w-4/5 p-5 border-dashed md:w-3/5 border-slate-300 border-3 min-h-48 h-fit">
      <h1 className="pb-5 text-xl text-center underline decoration-2 decoration-sky-300 declaration-3">
        Add Code Challenge
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row flex-wrap justify-center gap-4"
      >
        <div className="w-48">
          <label>Code Challenge:</label>
          <br></br>
          <input
            type="text"
            onChange={(event) => setChallenge(event.target.value)}
            value={challenge}
            className="w-full p-1 mt-1 border text-slate-600 border-slate-800"
            required
          />
        </div>
        <div className="w-48">
          <label>Company URL:</label>
          <br></br>
          <input
            type="text"
            onChange={(event) => setChallengeURL(event.target.value)}
            value={challengeURL}
            className="w-full p-1 mt-1 border text-slate-600 border-slate-800"
            required
          />
        </div>

        <div className="w-48">
          <label>Completed Date:</label>
          <br></br>
          <input
            type="Date"
            onChange={(event) => setCreatedAt(event.target.value)}
            value={createdAt}
            className="w-full p-1 mt-1 border text-slate-600 border-slate-800"
          />
        </div>
        <div className="h-0 basis-full"></div>
        <button type="submit" className="underline bg-sky-300">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CodeChallengeForm;
