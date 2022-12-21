import React, { useState } from "react";
import Application from "../utils/Application";

interface ITableProps {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
}

const Table = ({ applications, setApplications }: ITableProps) => {
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: -1,
  });

  const [newCompany, setNewCompany] = useState("");
  const [newCompanyURL, setNewCompanyURL] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newCreatedAt, setNewCreatedAt] = useState("");

  const onEdit = (
    id: number,
    currCompany: string,
    currCompanyURL: string,
    currRole: string,
    currCreateAt: string
  ) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setNewCompany(currCompany);
    setNewCompanyURL(currCompanyURL);
    setNewRole(currRole);
    setNewCreatedAt(currCreateAt);
  };

  const onSave = (
    id: number,
    newCompany: string,
    newCompanyURL: string,
    newRole: string,
    newCreatedAt: string
  ) => {
    Application.updateApplication(
      newCompany,
      newCompanyURL,
      newCreatedAt,
      newRole,
      id
    ).then(async () => {
      onCancel();
      await Application.getApplications().then((apps: Application[]) => {
        setApplications(apps);
      });
    });
  };

  const remove = (id: number) => {
    Application.removeApplication(id).then(async () => {
      onCancel();
      await Application.getApplications().then((apps: Application[]) => {
        setApplications(apps);
      });
    });
  };

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: -1,
    });
    setNewCompany("");
    setNewCompanyURL("");
    setNewRole("");
    setNewCreatedAt("");
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Company URL</th>
          <th>Applied Date</th>
          <th>Applied Role</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application) => {
          if (inEditMode.status && inEditMode.rowKey === application.id) {
            return (
              <tr key={application.id}>
                <td>
                  <input
                    value={newCompany}
                    onChange={(event) => setNewCompany(event.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={newCompanyURL}
                    onChange={(event) => setNewCompanyURL(event.target.value)}
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
                  <input
                    value={newRole}
                    onChange={(event) => setNewRole(event.target.value)}
                  />
                </td>
                <td>
                  <button
                    onClick={() =>
                      onSave(
                        application.id,
                        newCompany,
                        newCompanyURL,
                        newRole,
                        newCreatedAt
                      )
                    }
                  >
                    Save
                  </button>
                  <button onClick={() => remove(application.id)}>Remove</button>

                  <button onClick={() => onCancel()}>Cancel</button>
                </td>
              </tr>
            );
          } else {
            return (
              <tr key={application.id}>
                <td>{application.company} </td>
                <td>{application.companyURL} </td>
                <td>{application.createdAt} </td>
                <td>{application.role} </td>
                <td>
                  <button
                    className={"btn-primary"}
                    onClick={() =>
                      onEdit(
                        application.id,
                        application.company,
                        application.companyURL,
                        application.role,
                        application.createdAt
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

export default Table;
