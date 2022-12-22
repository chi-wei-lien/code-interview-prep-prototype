const Header = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 ">
        <div className="p-5 border-2 rounded-lg shadow-2xl w-60 sm:w-72 md:w-80 bg-yellow-theme border-slate-800">
          <h1 className="text-2xl font-bold text-center underline text-slate-800 decoration-sky-300 decoration-3">
            Code Interview Prep
          </h1>
          <h3 className="text-sm text-slate-700">/kəʊd/ˈɪn.tə.vjuː/prep/</h3>
          <h3>
            Code interview prep is like your ex, you hate it but you cannot
            avoid it
          </h3>
        </div>
        <div className="pt-8 text-center w-72">
          Start tracking your{" "}
          <span className="underline decoration-sky-300 decoration-3">
            code interview preperation
          </span>{" "}
          and{" "}
          <span className="underline decoration-orange-300 decoration-3">
            job applications
          </span>
        </div>
        <div className="animate-bounce">⌄</div>
      </div>
    </div>
  );
};

export default Header;
