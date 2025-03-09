import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import TaskList, { Task } from "./TaskList";
import { CheckIcon } from "@heroicons/react/24/outline";
import { getUser } from "../utils/storage";

interface Project {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
  user_id: number;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  project?: Project;
}

export default function ProjectModal({
  isOpen,
  onClose,
  onSave,
  project,
}: ProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Initialize form with project data
  useEffect(() => {
    if (project) {
      setProjectName(project.name);
      setProjectDescription(project.description);
      setTasks([...project.tasks]);
    } else {
      setProjectName("");
      setProjectDescription("");
      setTasks([]);
    }
  }, [project]);

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    const user = await getUser();

    onSave({
      ...project,
      user_id: user?.id,
      name: projectName,
      description: projectDescription,
      tasks,
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="ease-in duration-200"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900 mb-4"
                >
                  {project?.id ? "Edit Project" : "Add Project"}
                </Dialog.Title>

                <form onSubmit={handleSaveProject}>
                  <div className="space-y-6">
                    {/* Project Details Section */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">
                        Project Details
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="projectName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Project Name
                          </label>
                          <input
                            type="text"
                            id="projectName"
                            placeholder="Enter project name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="mt-1 block w-full px-2 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="projectDescription"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <textarea
                            id="projectDescription"
                            placeholder="Enter project description"
                            value={projectDescription}
                            onChange={(e) =>
                              setProjectDescription(e.target.value)
                            }
                            rows={3}
                            className="mt-1 block w-full px-2 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Tasks Section */}
                    <TaskList tasks={tasks} onTasksChange={setTasks} />
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <div
                      onClick={onClose}
                      className="inline-flex cursor-pointer justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Cancel
                    </div>
                    <button
                      type="submit"
                      className="inline-flex cursor-pointer justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <CheckIcon className="w-5 h-5  text-lime-800 hover:text-lime-900" />
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
