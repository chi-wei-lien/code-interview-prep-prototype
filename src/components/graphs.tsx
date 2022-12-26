import Application from "../utils/Application";
import CodeChallenge from "../utils/CodeChallenge";
import Status from "../utils/Status";

import ProgressLine from "./progress-line";
import StatusPie from "./status-pie";

interface IGraphsProps {
  applications: Application[];
  codeChallenges: CodeChallenge[];
  statuses: Status[];
}

const Graphs = ({ applications, codeChallenges, statuses }: IGraphsProps) => {
  return (
    <div className="flex flex-row flex-wrap justify-center w-full bg-white">
      <div className="w-1/2 rounded">
        <ProgressLine
          applications={applications}
          codeChallenges={codeChallenges}
        ></ProgressLine>
        <StatusPie applications={applications} statuses={statuses}></StatusPie>
      </div>
    </div>
  );
};
export default Graphs;
