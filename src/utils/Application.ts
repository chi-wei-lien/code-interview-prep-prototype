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

  static addApplication = async (
    company: string,
    companyURL: string,
    role: string,
    createdAt: string
  ) => {
    fetch("http://localhost:8080/application", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        company,
        companyURL,
        role,
        createdAt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  static updateApplication = async (
    company: string,
    companyURL: string,
    createdAt: string,
    role: string,
    id: number
  ) => {
    fetch("http://localhost:8080/application", {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        company,
        companyURL,
        role,
        createdAt,
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  static removeApplication = async (id: number) => {
    fetch("http://localhost:8080/application", {
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

export default Application;
