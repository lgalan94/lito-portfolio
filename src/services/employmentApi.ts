import api from './api';
import type { Employment } from '../types';

export const getAllEmployment = async (): Promise<Employment[]> => {
  const res = await api.get('/employment');
  return res.data;
};
