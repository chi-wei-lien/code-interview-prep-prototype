import Application from "../utils/Application";
import CodeChallenge from "../utils/CodeChallenge";
import Status from "../utils/Status";

import ProgressLine from "./progress-line";
import StatusPie from "./status-pie";

interface IGraphsProps {
  applications: Application[];
  codeChallenges: CodeChallenge[];
  statuses: Map<number, Status>;
}

const Graphs = ({ applications, codeChallenges, statuses }: IGraphsProps) => {
  return (
    <div className="flex flex-row flex-wrap justify-center w-full bg-white">
      <div className="flex justify-center w-full rounded h-96 sm:w-96">
        <ProgressLine
          applications={applications}
          codeChallenges={codeChallenges}
        ></ProgressLine>
      </div>
      <div className="flex justify-center w-full rounded h-96 sm:w-96">
        <StatusPie applications={applications} statuses={statuses}></StatusPie>
      </div>
    </div>
  );
};
export default Graphs;
