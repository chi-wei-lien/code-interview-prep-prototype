interface INavbarProps {
  loggedIn: boolean;
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = ({ loggedIn, page, setPage }: INavbarProps) => {
  let logoutButton;
  if (loggedIn) {
    logoutButton = (
      <button
        className={`px-5 py-1 font-bold border-2 rounded-full border-slate-800 ${
          page === "logout" ? "bg-yellow-theme" : ""
        }`}
        onClick={() => {
          setPage("logout");
        }}
      >
        Logout
      </button>
    );
  }
  return (
    <div className="flex justify-center gap-4 mb-7">
      <button
        className={`px-5 py-1 font-bold border-2 rounded-full border-slate-800 ${
          page === "table" ? "bg-yellow-theme" : ""
        }`}
        onClick={() => {
          setPage("table");
        }}
      >
        Table
      </button>
      <button
        className={`px-5 py-1 font-bold border-2 rounded-full border-slate-800 ${
          page === "graph" ? "bg-yellow-theme" : ""
        }`}
        onClick={() => {
          setPage("graph");
        }}
      >
        Graph
      </button>
      <button
        className={`px-5 py-1 font-bold border-2 rounded-full border-slate-800 ${
          page === "about" ? "bg-yellow-theme" : ""
        }`}
        onClick={() => {
          setPage("about");
        }}
      >
        About
      </button>
      {logoutButton}
    </div>
  );
};

export default Navbar;
