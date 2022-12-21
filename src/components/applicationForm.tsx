import { useState, Dispatch } from "react";
import Application from "../utils/Application";

interface IApplicationForm {
  setApplications: Dispatch<React.SetStateAction<Application[]>>;
}

const ApplicationForm = ({ setApplications }: IApplicationForm) => {
  const [company, setCompany] = useState("");
  const [companyURL, setCompanyURL] = useState("");
  const [role, setRole] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await Application.addApplication(company, companyURL, role, createdAt).then(
      async () => {
        await Application.getApplications().then((apps: Application[]) => {
          setApplications(apps);
          setCompany("");
          setCompanyURL("");
          setCreatedAt("");
          setRole("");
        });
      }
    );
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter company:
        <input
          type="text"
          onChange={(event) => setCompany(event.target.value)}
          value={company}
        />
      </label>
      <label>
        Enter companyURL:
        <input
          type="text"
          onChange={(event) => setCompanyURL(event.target.value)}
          value={companyURL}
        />
      </label>
      <label>
        Enter role:
        <input
          type="text"
          onChange={(event) => setRole(event.target.value)}
          value={role}
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

export default ApplicationForm;
