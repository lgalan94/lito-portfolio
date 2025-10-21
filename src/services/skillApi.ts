import type { Skill } from '../types';
import api from './api'; // Axios instance

export interface SkillsResponse {
  [category: string]: Skill[];
}

/**
 * Fetch skills from the backend
 */
export const getSkills = async (): Promise<SkillsResponse> => {
  try {
    const { data } = await api.get<SkillsResponse>('/skills'); // Axios auto-parses JSON
    return data;
  } catch (error: any) {
    console.error('Error fetching skills:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch skills');
  }
};
