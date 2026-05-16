import { API_ENDPOINTS } from "@/config/api";
import { Country } from "@/types/country";

export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(API_ENDPOINTS.getAllCountries);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: Falló la sincronización con el servidor.`);
    }
    
    const data: Country[] = await response.json();
    
    // Devolvemos los datos ordenados alfabéticamente
    return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } catch (error) {
    console.error("Error en fetchAllCountries:", error);
    throw error;
  }
};