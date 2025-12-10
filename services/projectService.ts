import { supabase, isSupabaseConfigured } from './supabaseClient';
import { MOCK_PROJECTS } from '../constants';
import { Project } from '../types';

// Simple in-memory store for the session if Supabase isn't active
let localProjects = [...MOCK_PROJECTS];

export const fetchProjects = async (): Promise<Project[]> => {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
    return data.map((d: any) => ({
      id: d.id,
      title: d.title,
      description: d.description,
      category: d.category,
      imageUrl: d.image_url || '',
      year: d.year,
      createdAt: d.created_at,
    }));
  }

  // Return mock data if no Supabase
  return new Promise((resolve) => {
    setTimeout(() => resolve(localProjects), 500);
  });
};

export const createProject = async (project: Omit<Project, 'id' | 'createdAt' | 'imageUrl'> & { imageUrl?: string }, file?: File): Promise<boolean> => {
  try {
    let publicUrl = project.imageUrl;

    // 1. Upload Image if exists and Supabase is configured
    if (file && isSupabaseConfigured && supabase) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath);
      publicUrl = data.publicUrl;
    }

    // 2. Insert Record
    if (isSupabaseConfigured && supabase) {
      const { error: dbError } = await supabase
        .from('projects')
        .insert([{
          title: project.title,
          description: project.description,
          category: project.category,
          year: project.year,
          image_url: publicUrl,
        }]);
      
      if (dbError) throw dbError;
    } else {
      // Local fallback
      const newProject: Project = {
        ...project,
        imageUrl: publicUrl || 'https://picsum.photos/800/600', // Fallback image
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      } as Project;
      localProjects = [newProject, ...localProjects];
    }

    return true;
  } catch (error) {
    console.error('Error creating project:', error);
    return false;
  }
};