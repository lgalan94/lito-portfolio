import api from "./api";
import type { Certificate } from "../types";

// Get all certificates
export const getAllCertificates = async (): Promise<Certificate[]> => {
  const res = await api.get("/certificates");
  return res.data;
};