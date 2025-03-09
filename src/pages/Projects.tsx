import { useState } from "react";
import ProjectModal from "../components/ProjectModal";
import { Project } from "../components/Project";
import { useProject } from "../hooks/projectHook";
import { UserInfo } from "../components/UserInfo";

interface Task {
  id: number;
  title: string;
  status: "pending" | "in_progress" | "completed";
}

interface Project {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
}

export default function Projects() {
  const {
    projects,
    loading,
    isProjectModalOpen,
    selectedProject,
    setIsProjectModalOpen,
    handleAddProject,
    handleEditProject,
    handleSaveProject,
    handleDeleteProject,
  } = useProject();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <UserInfo />
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="!text-2xl font-bold text-gray-900 !sm:text-2xl">
              Projects
            </h1>
            <button
              onClick={handleAddProject}
              className="
              inline-flex 
              items-center 
              px-4 
              py-2 
              !sm:px-1
              !sm:py-1 
              border 
              border-transparent 
              text-sm 
              font-medium 
              rounded-md 
              text-white 
              bg-indigo-600 
              hover:bg-indigo-700 
              focus:outline-none 
              focus:ring-2 
              focus:ring-offset-2 
              focus:ring-indigo-500"
            >
              Add Project
            </button>
          </div>
          <div className="space-y-8">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <Project
                  key={project.id}
                  project={project}
                  handleEditProject={handleEditProject}
                  handleDeleteProject={handleDeleteProject}
                />
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                No projects found. Click "Add Project" to create one.
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedProject && (
        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          onSave={handleSaveProject}
          project={selectedProject as Project}
        />
      )}
    </div>
  );
}
