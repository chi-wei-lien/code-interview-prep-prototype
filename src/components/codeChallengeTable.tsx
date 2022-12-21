import React, { useState } from "react";
import CodeChallenge from "../utils/CodeChallenge";

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
    <table>
      <thead>
        <tr>
          <th>Code Challenge</th>
          <th>Code Challenge URL</th>
          <th>Finish Date</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {codeChallenges.map((codeChallenge) => {
          if (inEditMode.status && inEditMode.rowKey === codeChallenge.id) {
            return (
              <tr key={codeChallenge.id}>
                <td>
                  <input
                    value={newChallenge}
                    onChange={(event) => setNewChallenge(event.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={newChallengeURL}
                    onChange={(event) => setNewChallengeURL(event.target.value)}
                  />
                </td>
                <td>
                  <input
                    type={"Date"}
                    value={newCreatedAt}
                    onChange={(event) => setNewCreatedAt(event.target.value)}
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
                  >
                    Save
                  </button>
                  <button onClick={() => remove(codeChallenge.id)}>
                    Remove
                  </button>

                  <button onClick={() => onCancel()}>Cancel</button>
                </td>
              </tr>
            );
          } else {
            return (
              <tr key={codeChallenge.id}>
                <td>{codeChallenge.challenge} </td>
                <td>{codeChallenge.challengeURL} </td>
                <td>{codeChallenge.createdAt} </td>
                <td>
                  <button
                    className={"btn-primary"}
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
