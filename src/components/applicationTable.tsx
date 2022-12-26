import React, { useState } from "react";
import Application from "../utils/Application";
import dateToString from "../utils/DateToString";

interface ITableProps {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
}

const ApplicationTable = ({ applications, setApplications }: ITableProps) => {
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: -1,
  });

  const [newCompany, setNewCompany] = useState("");
  const [newCompanyURL, setNewCompanyURL] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newCreatedAt, setNewCreatedAt] = useState("");

  const onEdit = (
    id: number,
    currCompany: string,
    currCompanyURL: string,
    currRole: string,
    currStatus: string,
    currCreateAt: string
  ) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setNewCompany(currCompany);
    setNewCompanyURL(currCompanyURL);
    setNewRole(currRole);
    setNewStatus(currStatus);
    setNewCreatedAt(currCreateAt);
  };

  const onSave = (
    id: number,
    newCompany: string,
    newCompanyURL: string,
    newRole: string,
    newStatus: string,
    newCreatedAt: string
  ) => {
    Application.updateApplication(
      newCompany,
      newCompanyURL,
      newCreatedAt,
      newRole,
      newStatus,
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
    setNewStatus("");
  };

  return (
    <table className="w-4/5 text-center border table-fixed sm:text-left border-slate-800">
      <thead>
        <tr className="text-white bg-orange-300 border border-slate-800">
          <th className="text-sm border sm:text-md sm:py-3 sm:px-6 border-slate-800">
            Company
          </th>
          <th className="text-sm border sm:text-md sm:py-3 sm:px-6 border-slate-800">
            Applied Date
          </th>
          <th className="text-sm border sm:text-md sm:py-3 sm:px-6 border-slate-800">
            Applied Role
          </th>
          <th className="text-sm border sm:text-md sm:py-3 sm:px-6 border-slate-800">
            Status
          </th>
          <th className="text-sm border sm:text-md sm:py-3 sm:px-6 border-slate-800">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="text-slate-700">
        {applications.map((application) => {
          if (inEditMode.status && inEditMode.rowKey === application.id) {
            return (
              <tr key={application.id}>
                <td>
                  <label className="pl-6">Company Name:</label>
                  <input
                    value={newCompany}
                    onChange={(event) => setNewCompany(event.target.value)}
                    className="px-6 py-1 mb-1 border border-slate-800"
                    size={10}
                  />
                  <br></br>
                  <label className="pl-6">Company URL: </label>
                  <input
                    value={newCompanyURL}
                    onChange={(event) => setNewCompanyURL(event.target.value)}
                    className="px-6 py-1 border border-slate-800"
                    size={10}
                  />
                </td>
                <td>
                  <input
                    type={"Date"}
                    value={dateToString(new Date(newCreatedAt))}
                    onChange={(event) => setNewCreatedAt(event.target.value)}
                    className="px-6 py-1 border border-slate-800"
                    size={10}
                  />
                </td>
                <td>
                  <input
                    value={newRole}
                    onChange={(event) => setNewRole(event.target.value)}
                    className="px-6 py-1 border border-slate-800"
                    size={10}
                  />
                </td>
                <td>
                  <input
                    value={newStatus}
                    onChange={(event) => setNewStatus(event.target.value)}
                    className="px-6 py-1 border border-slate-800"
                    size={10}
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
                        newStatus,
                        newCreatedAt
                      )
                    }
                    className="underline bg-sky-200"
                  >
                    Save
                  </button>
                  <span>, </span>
                  <button
                    onClick={() => remove(application.id)}
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
              <tr
                key={application.id}
                className="text-center border-b border-slate-800 sm:text-left"
              >
                <td className="text-sm underline sm:text-md sm:py-3 sm:px-6">
                  <a href={application.companyURL} target="_blank">
                    {application.company}
                  </a>
                </td>
                {/* <td className="px-6 py-3">{application.companyURL} </td> */}
                <td className="text-sm sm:text-md sm:py-3 sm:px-6">
                  {application.createdAt}{" "}
                </td>
                <td className="text-sm sm:text-md sm:py-3 sm:px-6">
                  {application.role}{" "}
                </td>
                <td className="text-sm sm:text-md sm:py-3 sm:px-6">
                  {application.status}{" "}
                </td>
                <td className="text-sm sm:text-md sm:py-3 sm:px-6">
                  <button
                    className={"btn-primary bg-yellow-theme underline"}
                    onClick={() =>
                      onEdit(
                        application.id,
                        application.company,
                        application.companyURL,
                        application.role,
                        application.status,
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

export default ApplicationTable;
