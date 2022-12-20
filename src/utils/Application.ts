// export interface IApplication {
//   company: string;
//   companyURL: string;
//   createAt: Date;
//   id: number;
// }

class Application {
  public company;
  public companyURL;
  public createdAt;
  public id;
  public role;

  constructor(
    company: string,
    companyURL: string,
    createdAt: string,
    id: number,
    role: string
  ) {
    this.company = company;
    this.companyURL = companyURL;
    this.createdAt = new Date(createdAt).toDateString();
    this.id = id;
    this.role = role;
  }

  static getApplications = async (): Promise<Application[]> => {
    const fetchedApplications: Application[] = [];
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8080/application", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          for (const application of response.applications) {
            fetchedApplications.push(
              new Application(
                application.company,
                application.companyURL,
                application.createdAt,
                application.id,
                application.role
              )
            );
          }
          resolve(fetchedApplications);
        })
        .catch((err) => reject(err));
    });
  };
}

export default Application;
