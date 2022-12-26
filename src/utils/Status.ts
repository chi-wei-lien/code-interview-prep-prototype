class Status {
  public value;
  public userId;

  constructor(value: string, userId: number) {
    this.value = value;
    this.userId = userId;
  }

  static getStatuses = async (): Promise<Status[]> => {
    const fetchedStatuses: Status[] = [];
    return new Promise(async (resolve, reject) => {
      await fetch(`${process.env.REACT_APP_API}/status`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          for (const status of response.statuses) {
            fetchedStatuses.push(new Status(status.value, status.userId));
          }
          resolve(fetchedStatuses);
        })
        .catch((err) => reject(err));
    });
  };

  static addStatus = async (value: string) => {
    await fetch(`${process.env.REACT_APP_API}/status`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  static removeStatus = async (value: string) => {
    await fetch(`${process.env.REACT_APP_API}/status`, {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify({
        value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}

export default Status;
