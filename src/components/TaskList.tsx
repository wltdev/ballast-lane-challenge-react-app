import { FC, useState } from "react";

import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export interface Task {
  id: number;
  title: string;
  status: "pending" | "in_progress" | "completed";
}

interface TaskListProps {
  tasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
}

const TaskList: FC<TaskListProps> = ({ tasks, onTasksChange }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");
  const [editingTaskStatus, setEditingTaskStatus] =
    useState<Task["status"]>("pending");

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask = {
      title: newTaskTitle,
      status: "pending",
    };

    onTasksChange([...tasks, newTask as Task]);
    setNewTaskTitle("");
  };

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskTitle(task.title);
    setEditingTaskStatus(task.status);
  };

  const handleSaveTaskEdit = () => {
    if (!editingTaskId) return;

    onTasksChange(
      tasks.map((task) =>
        task.id === editingTaskId
          ? { ...task, title: editingTaskTitle, status: editingTaskStatus }
          : task
      )
    );

    setEditingTaskId(null);
    setEditingTaskTitle("");
    setEditingTaskStatus("pending");
  };

  const handleRemoveTask = (taskId: number) => {
    onTasksChange(tasks.filter((task) => task.id !== taskId));

    if (editingTaskId === taskId) {
      setEditingTaskId(null);
      setEditingTaskTitle("");
      setEditingTaskStatus("pending");
    }
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "pending":
        return "bg-gray-300 text-gray-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Tasks</h4>

      {/* Add New Task */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="New task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="block w-full px-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
        />
        <button
          type="button"
          onClick={handleAddTask}
          className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Task Editing */}
      {editingTaskId && (
        <div className="mb-4 p-3 border border-gray-300 rounded-md">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Edit Task</h5>
          <div className="flex mb-2">
            <input
              type="text"
              value={editingTaskTitle}
              onChange={(e) => setEditingTaskTitle(e.target.value)}
              className="block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
            />
            <select
              value={editingTaskStatus}
              onChange={(e) =>
                setEditingTaskStatus(e.target.value as Task["status"])
              }
              className="ml-2 block rounded-md px-3 py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end items-center">
            <div
              onClick={() => setEditingTaskId(null)}
              className="mr-2 inline-flex cursor-pointer items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </div>
            <div
              onClick={handleSaveTaskEdit}
              className="mr-2 inline-flex cursor-pointer items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <CheckIcon className="w-5 h-5  text-lime-800 hover:text-lime-900" />
            </div>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-3">No tasks added yet</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-gray-200"
            >
              <div className="flex items-center">
                <span className="text-gray-900 mr-2">{task.title}</span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    task.status
                  )}`}
                >
                  {formatStatus(task.status)}
                </span>
              </div>
              <div className="flex space-x-2 items-center">
                <PencilSquareIcon
                  className="w-5 h-5 cursor-pointer text-indigo-600 hover:text-indigo-900"
                  onClick={() => handleEditTask(task)}
                />

                <TrashIcon
                  className="w-5 h-5 cursor-pointer text-red-600 hover:text-red-900"
                  onClick={() => handleRemoveTask(task.id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
