import { Line } from "react-chartjs-2";
import Application from "../utils/Application";
import CodeChallenge from "../utils/CodeChallenge";
import dateToString from "../utils/DateToString";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 90,
          },
        },
      ],
    },
  },
};

interface IProgressLineProps {
  applications: Application[];
  codeChallenges: CodeChallenge[];
}

const ProgressLine = ({ applications, codeChallenges }: IProgressLineProps) => {
  const applicationMap = new Map();
  const codeChallengeMap = new Map();
  let dateKey;

  for (let i = 0; i < applications.length; ++i) {
    dateKey = dateToString(new Date(applications[i].createdAt));
    if (applicationMap.has(dateKey)) {
      applicationMap.set(dateKey, applicationMap.get(dateKey) + 1);
    } else {
      applicationMap.set(dateKey, 1);
    }
  }

  for (let i = 0; i < codeChallenges.length; ++i) {
    dateKey = dateToString(new Date(codeChallenges[i].createdAt));
    if (codeChallengeMap.has(dateKey)) {
      codeChallengeMap.set(dateKey, codeChallengeMap.get(dateKey) + 1);
    } else {
      codeChallengeMap.set(dateKey, 1);
    }
  }

  const now = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);
  const dateLabels: string[] = [];

  for (let date = start; date <= now; date.setDate(date.getDate() + 1)) {
    dateLabels.push(dateToString(date));
  }

  const applicationData = [];
  for (let i = 0; i < dateLabels.length; ++i) {
    if (applicationMap.has(dateLabels[i])) {
      applicationData.push(applicationMap.get(dateLabels[i]));
    } else {
      applicationData.push(0);
    }
  }

  const codeChallengeData = [];
  for (let i = 0; i < dateLabels.length; ++i) {
    if (codeChallengeMap.has(dateLabels[i])) {
      codeChallengeData.push(codeChallengeMap.get(dateLabels[i]));
    } else {
      codeChallengeData.push(0);
    }
  }

  const data = {
    labels: dateLabels,
    datasets: [
      {
        label: "Applications",
        data: applicationData,
        borderColor: "#fdba74",
        backgroundColor: "#fdba74",
      },
      {
        label: "Code Challenge",
        data: codeChallengeData,
        borderColor: "#7dd3fc",
        backgroundColor: "#7dd3fc",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default ProgressLine;
