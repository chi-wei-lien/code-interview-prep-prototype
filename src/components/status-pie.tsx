import { Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import Application from "../utils/Application";
import Status from "../utils/Status";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Status Pie Chart",
    },
  },
};

interface IStatusPieProps {
  applications: Application[];
  statuses: Map<number, Status>;
}

const StatusPie = ({ applications, statuses }: IStatusPieProps) => {
  const statusIndexMap = new Map();
  let statusIndex = 0;

  const statusData = new Array(statuses.size).fill(0);
  const statusLabel: string[] = [];

  statuses.forEach((status: Status, key: number) => {
    statusIndexMap.set(status.value, statusIndex);
    statusLabel.push(status.value);
    statusIndex++;
  });

  // for (const status of statuses.keys()) {
  //   statusIndexMap.set(statuses.get(status).value, statusIndex);
  //   statusLabel.push(status.value);
  //   statusIndex++;
  // }
  let statusId;
  let statusValue;
  for (const application of applications) {
    statusId = application.statusId;
    statusValue = statuses.get(statusId)!.value;
    statusData[statusIndexMap.get(statusValue)]++;
  }

  const data = {
    labels: statusLabel,
    datasets: [
      {
        label: "Applications",
        data: statusData,
        backgroundColor: "#fdba74",
        hoverOffset: 4,
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
};

export default StatusPie;
