import { format } from "date-fns";

import { ITaskItemProps } from "../types";

export const TaskItem: React.FC<ITaskItemProps> = ({
  task,
  handleCompleteTask,
}) => (
  <div className="mt-4 border p-4 rounded-md bg-white">
    <div className="flex justify-between items-center">
      <p className="text-gray-600">{format(task.createdAt, "dd.MM.yyyy")}</p>
      <button
        className={`${
          task.completed ? "bg-green-500" : "bg-yellow-500"
        } text-white px-3 py-1 rounded-md ${
          task.completed ? "cursor-not-allowed" : "hover:bg-green-600"
        } focus:outline-none`}
        onClick={
          task.completed ? undefined : () => handleCompleteTask(task._id)
        }
        disabled={task.completed}
      >
        {task.completed ? "Готово" : "В архив"}
      </button>
    </div>
    <p
      className={`mt-2 ${
        task.completed ? "line-through text-gray-500" : "text-black"
      }`}
    >
      {task.description}
    </p>
  </div>
);
