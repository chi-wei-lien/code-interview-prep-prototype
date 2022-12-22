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
    <div className="w-4/5 p-5 border-dashed border-slate-300 border-3 min-h-48 h-fit ">
      <h1 className="pb-5 text-xl text-center underline decoration-orange-300 declaration-3">
        Add Job Application
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row flex-wrap justify-center gap-4"
      >
        <div className="w-48">
          <label>Company:</label>
          <br></br>
          <input
            type="text"
            onChange={(event) => setCompany(event.target.value)}
            value={company}
            className="w-full p-1 mt-1 border text-slate-600 border-slate-800"
            required
          />
        </div>
        <div className="w-48">
          <label>Company URL:</label>
          <br></br>
          <input
            type="text"
            onChange={(event) => setCompanyURL(event.target.value)}
            value={companyURL}
            className="w-full p-1 mt-1 border text-slate-600 border-slate-800"
            required
          />
        </div>

        <div className="w-48">
          <label>Role:</label>
          <br></br>
          <input
            type="text"
            onChange={(event) => setRole(event.target.value)}
            value={role}
            className="w-full p-1 mt-1 border text-slate-600 border-slate-800"
            required
          />
        </div>

        <div className="w-48">
          <label>Applied Date:</label>
          <br></br>
          <input
            type="Date"
            onChange={(event) => setCreatedAt(event.target.value)}
            value={createdAt}
            className="w-full p-1 mt-1 border text-slate-600 border-slate-800"
          />
        </div>
        <div className="h-0 basis-full"></div>
        <button type="submit" className="underline bg-orange-300">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
