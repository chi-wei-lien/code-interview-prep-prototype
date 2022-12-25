import Application from "../utils/Application";
import CodeChallenge from "../utils/CodeChallenge";

import ProgressLine from "./line";

interface IGraphsProps {
  applications: Application[];
  codeChallenges: CodeChallenge[];
}

const Graphs = ({ applications, codeChallenges }: IGraphsProps) => {
  return (
    <div className="flex flex-row flex-wrap justify-center w-full bg-white">
      <div className="w-1/2 rounded">
        <ProgressLine
          applications={applications}
          codeChallenges={codeChallenges}
        ></ProgressLine>
      </div>
    </div>
  );
};
export default Graphs;
