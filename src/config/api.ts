export const API_BASE_URL = "https://restcountries.com/v3.1";

export const API_ENDPOINTS = {
  // Aplicamos de una vez el filtro obligatorio de campos que descubrimos en la documentación
  getAllCountries: `${API_BASE_URL}/all?fields=name,capital,region,population,flags,currencies,
  languages,subregion`,
  getCountryByName: (name: string) => `${API_BASE_URL}/name/${name}`,
};