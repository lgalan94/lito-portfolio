import type { Project } from '../types';
import api from './api'; // Axios instance

/**
 * Fetch all projects from backend
 */
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const { data } = await api.get<Project[]>('/projects'); 
    
    return data;
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch projects');
  }
};
