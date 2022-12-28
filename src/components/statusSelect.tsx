import { ChangeEvent, Dispatch, useEffect, useState } from "react";
import Status from "../utils/Status";

interface IStatusSelectProps {
  statusesMap: Map<number, Status>;
  newStatus: string;
  setNewStatus: Dispatch<React.SetStateAction<string>>;
}

const StatusSelect = ({
  statusesMap,
  newStatus,
  setNewStatus,
}: IStatusSelectProps) => {
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

  const statusesHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setShowStatuses(true);
    setNewStatus(event.target.value);
  };

  return (
    <div>
      <input
        className="border-2 border-slate-800"
        onChange={statusesHandler}
        value={newStatus}
      ></input>
      {showStatuses && (
        <div className="">
          {statusOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => setNewStatus(option.value)}
              className="px-2 rounded-full w-fit hover:cursor-pointer"
              style={{ backgroundColor: option.color }}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusSelect;
