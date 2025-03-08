import { useState } from "react";
import ProjectModal from "../components/ProjectModal";
import { Project } from "../components/Project";

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
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Website Redesign",
      description: "Redesign company website with modern UI",
      tasks: [
        { id: 1, title: "Design Homepage", status: "pending" },
        { id: 2, title: "Implement Contact Form", status: "in_progress" },
        { id: 3, title: "Mobile Responsiveness", status: "completed" },
      ],
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Develop iOS and Android mobile applications",
      tasks: [
        { id: 4, title: "User Authentication", status: "in_progress" },
        { id: 5, title: "Push Notifications", status: "completed" },
      ],
    },
  ]);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleAddProject = () => {
    // Create a new empty project template
    const newProject: Project = {
      id: Date.now(),
      name: "New Project",
      description: "Project description",
      tasks: [],
    };
    setSelectedProject(newProject);
    setIsProjectModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (updatedProject: Project) => {
    setProjects((currentProjects) => {
      // Check if it's a new project or an update to an existing one
      const projectExists = currentProjects.some(
        (p) => p.id === updatedProject.id
      );

      if (projectExists) {
        // Update existing project
        return currentProjects.map((project) =>
          project.id === updatedProject.id ? updatedProject : project
        );
      } else {
        // Add new project
        return [...currentProjects, updatedProject];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <button
              onClick={handleAddProject}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Project
            </button>
          </div>
          <div className="space-y-8">
            {projects.map((project) => (
              <Project
                key={project.id}
                project={project}
                handleEditProject={handleEditProject}
              />
            ))}
          </div>
        </div>
      </div>
      {selectedProject && (
        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          onSave={handleSaveProject}
          project={selectedProject}
        />
      )}
    </div>
  );
}
