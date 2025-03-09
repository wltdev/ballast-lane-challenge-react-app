import { useEffect, useState, useRef } from "react";
import { Project } from "../components/Project";
import { api } from "../utils/api";
import { toast } from "react-toastify";

export const useProject = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const hasFetchedRef = useRef(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<{ data: Project[] }>("/projects");
      setProjects(data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<Partial<Project> | null>(null);

  const handleAddProject = () => {
    // Create a new empty project template
    const newProject: Omit<Project, "id"> = {
      name: "",
      description: "",
      tasks: [],
    };

    setSelectedProject(newProject);
    setIsProjectModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleStateProjects = (updatedProject: Project) => {
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

  const handleSaveProject = async (updatedProject: Project) => {
    try {
      let responseData = {} as Project;
      if (updatedProject.id) {
        // Update existing project
        const { data } = await api.put<{ data: Project }>(
          `/projects/${updatedProject.id}`,
          updatedProject
        );

        responseData = data.data;
      } else {
        // Add new project
        const { data } = await api.post<{ data: Project }>(
          "/projects",
          updatedProject
        );

        responseData = data.data;
      }

      handleStateProjects(responseData);

      toast.success("Project saved successfully");
      setIsProjectModalOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteProject = async (id: number) => {
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
      toast.success("Project deleted successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Only fetch projects once on mount
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchProjects();
    }
  }, []);

  return {
    projects,
    loading,
    isProjectModalOpen,
    selectedProject,
    handleAddProject,
    handleEditProject,
    handleSaveProject,
    setIsProjectModalOpen,
    handleDeleteProject,
  };
};
