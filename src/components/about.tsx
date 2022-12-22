const About = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center w-full gap-4 mb-10 bg-white h-fit">
      <div className="flex flex-col items-center justify-center border-dashed w-96 h-fit border-3 border-slate-300">
        <h1 className="px-5 pb-5 mt-5 text-2xl underline decoration-orange-300 decoration-3">
          What is Code Interview Prep?
        </h1>
        <p className="px-5 pb-5 text-justify text-slate-700">
          Code Interview Prep is an open source website that helps you keep
          track of your <span className="bg-orange-300">job applications</span>{" "}
          and set daily goals for solving{" "}
          <span className="bg-sky-300">code challenges</span>. These days,
          landing a software engineering job/internship is not easy. Companies
          are looking for candidates with not only a solid CS background but
          also strong problem-solving skills. As a result, solving code
          challenges has become an unavoidable stage in a tech company’s hiring
          process. This website is meant to help you do at least{" "}
          <span className="underline decoration-3 decoration-orange-300">
            one code challenge a day
          </span>{" "}
          and{" "}
          <span className="underline decoration-3 decoration-sky-300">
            apply to one company a day
          </span>{" "}
          during recruiting season.
        </p>
      </div>
      <div className="w-0 basis-full sm:basis-0"></div>
      <div className="flex flex-col items-center justify-center border-dashed w-96 h-fit border-3 border-slate-300">
        <h1 className="px-5 pb-5 mt-5 text-2xl underline decoration-orange-300 decoration-3">
          How this website is built
        </h1>
        <p className="px-5 pb-5 text-justify text-slate-700">
          This website’s frontend is mainly built with React, Typescript, and
          Tailwind.CSS. As for the backend, I used Express.js, Typescript,
          Postgresql, and Prisma. The whole project is open source and its
          source code can be found here:
        </p>
      </div>
    </div>
  );
};

export default About;
