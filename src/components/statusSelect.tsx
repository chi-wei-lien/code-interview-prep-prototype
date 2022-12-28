import { ChangeEvent, useEffect, useState } from "react";
import Status from "../utils/Status";

interface IStatusSelectProps {
  statusesMap: Map<number, Status>;
}

const StatusSelect = ({ statusesMap }: IStatusSelectProps) => {
  const statusOptions: Status[] = [];
  const [showStatuses, setShowStatuses] = useState(false);

  statusesMap.forEach((value: Status, key: number) => {
    statusOptions.push(value);
  });

  useEffect(() => {
    const hideStatusHandler = () => {
      setShowStatuses(false);
    };

    window.addEventListener("click", hideStatusHandler);
    return () => {
      window.removeEventListener("click", hideStatusHandler);
    };
  });

  const showStatusesHandler = (event: ChangeEvent) => {
    event.stopPropagation();
    setShowStatuses(true);
  };

  return (
    <div>
      <input
        className="border-2 border-slate-800"
        onChange={showStatusesHandler}
      ></input>
      {showStatuses && (
        <div>
          {statusOptions.map((option) => (
            <div key={option.id}>{option.value}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusSelect;
