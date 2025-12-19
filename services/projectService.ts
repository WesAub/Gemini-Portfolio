
import { MOCK_PROJECTS } from '../constants';
import { Project } from '../types';
import { API_BASE_URL, isBackendConfigured } from './apiConfig';

let localProjects = [...MOCK_PROJECTS];

export const fetchProjects = async (): Promise<Project[]> => {
  if (isBackendConfigured) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error fetching projects from RDS backend:', error);
      return [];
    }
  }

  // Fallback to local data if no backend is configured yet
  return new Promise((resolve) => {
    setTimeout(() => resolve(localProjects), 500);
  });
};

export const createProject = async (project: Omit<Project, 'id' | 'createdAt' | 'imageUrl'> & { imageUrl?: string }, file?: File): Promise<boolean> => {
  try {
    if (isBackendConfigured) {
      const formData = new FormData();
      formData.append('title', project.title);
      formData.append('category', project.category);
      formData.append('description', project.description);
      formData.append('year', project.year);
      if (file) formData.append('image', file);

      const response = await fetch(`${API_BASE_URL}/api/projects`, {
        method: 'POST',
        body: formData, // FormData automatically sets correct headers for file uploads
      });

      return response.ok;
    } else {
      // Local fallback for demo/development
      const newProject: Project = {
        ...project,
        imageUrl: project.imageUrl || 'https://picsum.photos/800/600',
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      } as Project;
      localProjects = [newProject, ...localProjects];
      return true;
    }
  } catch (error) {
    console.error('Error creating project:', error);
    return false;
  }
};
