import { FC } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export interface Project {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  title: string;
  status: "pending" | "in_progress" | "completed";
}

type Props = {
  project: Project;
  handleEditProject: (project: Project) => void;
};

export const Project: FC<Props> = ({ project, handleEditProject }) => {
  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800";
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
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {project.name}
            </h2>
            <p className="mt-1 text-gray-600">{project.description}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tasks</h3>
          <div className="space-y-3">
            {project.tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg"
              >
                <span className="text-gray-900">{task.title}</span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    task.status
                  )}`}
                >
                  {formatStatus(task.status)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end items-center mt-6">
          <PencilSquareIcon
            className="w-6 h-6 text-gray-500 cursor-pointer"
            onClick={() => handleEditProject(project)}
          />
        </div>
      </div>
    </div>
  );
};
