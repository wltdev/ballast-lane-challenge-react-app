import { FC, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DeleteModal } from "./DeleteModal";

export interface Project {
  id: number;
  name: string;
  description: string;
  user_id: number;
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
  handleDeleteProject: (id: number) => void;
};

export const Project: FC<Props> = ({
  project,
  handleEditProject,
  handleDeleteProject,
}) => {
  const [modelDelete, setModelDelete] = useState(false);

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "pending":
        return "bg-gray-300 text-gray-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleDelete = () => {
    handleDeleteProject(project.id);
    setModelDelete(false);
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
        <div className="flex justify-between items-center mt-6 gap-4">
          <TrashIcon
            className="w-6 h-6 text-red-500 cursor-pointer"
            onClick={() => setModelDelete(true)}
          />
          <PencilSquareIcon
            className="w-6 h-6 text-gray-500 cursor-pointer"
            onClick={() => handleEditProject(project)}
          />
        </div>

        <DeleteModal
          isOpen={modelDelete}
          onClose={() => setModelDelete(false)}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};
