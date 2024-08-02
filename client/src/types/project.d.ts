export interface Project {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ProjectContextType {
    projects: Project[];
    addProject: (project: Project) => void;
    updateProject: (project: Project) => void;
    deleteProject: (projectId: string) => void;
  }
  