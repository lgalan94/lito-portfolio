import api from './api';
import type { HeroData } from '../types';

export const getHeroData = async (): Promise<HeroData> => {
  const response = await api.get('/public-profile');
  return response.data; // directly usable
};

