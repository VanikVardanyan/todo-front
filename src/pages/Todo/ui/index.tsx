"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { FixedSizeList as List } from "react-window";

import { addTodo, completeTodo, getTodos } from "../api";
import { ITodos } from "../types";
import { TaskItem } from "./TaskItem";

import useLoading from "@/hooks/useLoading";

export const TaskManager: React.FC = () => {
  const { isLoading, withLoading } = useLoading();
  const [tasks, setTasks] = useState<ITodos[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const getAndSetTodos = async () => {
    const response = await withLoading(getTodos);
    if (response) {
      setTasks(response);
    }
  };

  useEffect(() => {
    withLoading(getAndSetTodos);
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim() === "") {
      return;
    }
    await withLoading(() => addTodo(newTask));
    await getAndSetTodos();
    setNewTask("");
  };

  const handleCompleteTask = async (taskId: string) => {
    await withLoading(() => completeTodo(taskId));
    getAndSetTodos();
  };

  return (
    <div className="relative">
      <ToastContainer />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader text-white">Loading...</div>
        </div>
      )}
      <div className="max-w-md mx-auto my-8 p-4 bg-gray-100 rounded-md shadow-md">
        {tasks.length === 0 && (
          <p className="text-center text-gray-600 font-bold text-lg">
            Нет задач
          </p>
        )}
        {tasks.length > 0 && (
          <List
            height={400}
            itemCount={tasks.length}
            itemSize={100}
            width="100%"
          >
            {({ index, style }) => (
              <div style={style}>
                <TaskItem
                  task={tasks[index]}
                  handleCompleteTask={handleCompleteTask}
                />
              </div>
            )}
          </List>
        )}
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mt-4"
          placeholder="Введите задачу"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleAddTask}
          disabled={isLoading}
        >
          Добавить задачу
        </button>
      </div>
    </div>
  );
};
