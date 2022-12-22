import React, { useState } from "react";
import CodeChallenge from "../utils/CodeChallenge";
import dateToString from "../utils/DateToString";

interface ITableProps {
  codeChallenges: CodeChallenge[];
  setCodeChallenge: React.Dispatch<React.SetStateAction<CodeChallenge[]>>;
}

const CodeChallengeTable = ({
  codeChallenges,
  setCodeChallenge,
}: ITableProps) => {
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: -1,
  });

  const [newChallenge, setNewChallenge] = useState("");
  const [newChallengeURL, setNewChallengeURL] = useState("");
  const [newCreatedAt, setNewCreatedAt] = useState("");

  const onEdit = (
    id: number,
    currChallenge: string,
    currChallengeURL: string,
    currCreateAt: string
  ) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setNewChallenge(currChallenge);
    setNewChallengeURL(currChallengeURL);
    setNewCreatedAt(currCreateAt);
  };

  const onSave = (
    id: number,
    newChallenge: string,
    newChallengeURL: string,
    newCreatedAt: string
  ) => {
    CodeChallenge.updateCodeChallenge(
      newChallenge,
      newChallengeURL,
      newCreatedAt,
      id
    ).then(async () => {
      onCancel();
      await CodeChallenge.getCodeChallenges().then(
        (challenges: CodeChallenge[]) => {
          setCodeChallenge(challenges);
        }
      );
    });
  };

  const remove = (id: number) => {
    CodeChallenge.removeCodeChallenge(id).then(async () => {
      onCancel();
      await CodeChallenge.getCodeChallenges().then(
        (challenges: CodeChallenge[]) => {
          setCodeChallenge(challenges);
        }
      );
    });
  };

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: -1,
    });
    setNewChallenge("");
    setNewChallengeURL("");
    setNewCreatedAt("");
  };

  return (
    <table className="w-3/5 text-left border table-auto">
      <thead>
        <tr className="text-white bg-sky-300">
          <th className="px-6 py-3">Code Challenge</th>
          <th className="px-6 py-3">Code Challenge URL</th>
          <th className="px-6 py-3">Finish Date</th>
          <th className="px-6 py-3">Edit</th>
        </tr>
      </thead>
      <tbody className="text-slate-700">
        {codeChallenges.map((codeChallenge) => {
          if (inEditMode.status && inEditMode.rowKey === codeChallenge.id) {
            return (
              <tr key={codeChallenge.id}>
                <td>
                  <input
                    value={newChallenge}
                    onChange={(event) => setNewChallenge(event.target.value)}
                    className="px-6 py-3"
                    size={10}
                  />
                </td>
                <td>
                  <input
                    value={newChallengeURL}
                    onChange={(event) => setNewChallengeURL(event.target.value)}
                    className="px-6 py-3"
                    size={10}
                  />
                </td>
                <td>
                  <input
                    type={"Date"}
                    value={dateToString(new Date(newCreatedAt))}
                    onChange={(event) => setNewCreatedAt(event.target.value)}
                    className="px-6 py-3"
                    size={10}
                  />
                </td>
                <td>
                  <button
                    onClick={() =>
                      onSave(
                        codeChallenge.id,
                        newChallenge,
                        newChallengeURL,
                        newCreatedAt
                      )
                    }
                    className="underline bg-sky-200"
                  >
                    Save
                  </button>
                  <span>, </span>
                  <button
                    onClick={() => remove(codeChallenge.id)}
                    className="underline bg-red-200"
                  >
                    Remove
                  </button>
                  <span>, </span>
                  <button
                    onClick={() => onCancel()}
                    className="underline bg-yellow-theme"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            );
          } else {
            return (
              <tr key={codeChallenge.id} className="border-b">
                <td className="px-6 py-3">{codeChallenge.challenge} </td>
                <td className="px-6 py-3">{codeChallenge.challengeURL} </td>
                <td className="px-6 py-3">{codeChallenge.createdAt} </td>
                <td className="px-6 py-3">
                  <button
                    className={"btn-primary bg-yellow-theme underline"}
                    onClick={() =>
                      onEdit(
                        codeChallenge.id,
                        codeChallenge.challenge,
                        codeChallenge.challengeURL,
                        codeChallenge.createdAt
                      )
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
};

export default CodeChallengeTable;
