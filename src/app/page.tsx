"use client";

import { useState, useEffect } from "react";
import { Country } from "@/types/country";
import { fetchAllCountries } from "@/services/countryService";
import CountryCard from "@/components/CountryCard";
import CountryModal from "@/components/CountryModal";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  // Estados para los tres filtros simultáneos
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [subRegionFilter, setSubRegionFilter] = useState("");

  // Lista de subregiones dinámicas que cambian según la región seleccionada
  const [availableSubRegions, setAvailableSubRegions] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [showTopButton, setShowTopButton] = useState(false);

  // Consumo inicial de la API
  useEffect(() => {
    const getCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err: any) {
        setError(err.message || "Ocurrió un inconveniente al sincronizar los destinos.");
      } finally {
        setLoading(false);
      }
    };
    getCountries();
  }, []);

  // Cambio de la region se habilita subregiones que existen en esa zona
  useEffect(() => {
    // Reinicio del filtro de la subregion anterior
    setSubRegionFilter("");

    if (!regionFilter) {
      setAvailableSubRegions([]);
      return;
    }

    // Filtro de paises de la region seleccionada y extraemos sus subregiones unicas
    const countriesInRegion = countries.filter((c) => c.region === regionFilter);
    const subRegionsSet = new Set(
      countriesInRegion.map((c) => c.subregion).filter(Boolean) as string[]
    );

    // arreglo ordenado alfabeticamente
    setAvailableSubRegions(Array.from(subRegionsSet).sort());
  }, [regionFilter, countries]);

  // Filtrado combinada en tiempo real Buscador + Región + Subregión
  useEffect(() => {
    let result = countries;

    if (search) {
      result = result.filter((c) =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (regionFilter) {
      result = result.filter((c) => c.region === regionFilter);
    }

    if (subRegionFilter) {
      result = result.filter((c) => c.subregion === subRegionFilter);
    }

    setFilteredCountries(result);
  }, [search, regionFilter, subRegionFilter, countries]);

  // mostrar u ocultar el botón
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-andean-bone text-andean-dark font-sans selection:bg-emerald-200">

      {/* Header Premium */}
      <header className="bg-white border-b border-stone-200/80 sticky top-0 z-40 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-andean-emerald animate-pulse" />
            <h1 className="text-xl font-bold tracking-tight uppercase text-stone-900">
              Andean <span className="text-andean-emerald font-light">Explorations</span>
            </h1>
          </div>
          <span className="text-xs bg-emerald-50 text-andean-emerald font-medium px-3 py-1 rounded-full border border-emerald-200/50">
            Internal TI Panel
          </span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Busqueda y filtros */}
        <section className="bg-white p-6 rounded-3xl border border-stone-200/60 shadow-sm mb-10">
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
            
            {/* Input de Nombre */}
            <div className="relative w-full flex flex-col gap-1.5">
              <span className="absolute bottom-[14px] left-0 flex items-center pl-4 text-stone-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input
                type="text"
                placeholder="Buscar por nombre..."
                className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-andean-emerald/20 focus:border-andean-emerald transition-all text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Región Principal */}
            <div className="w-full flex flex-col gap-1.5">
              <select
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-andean-emerald/20 focus:border-andean-emerald transition-all text-sm cursor-pointer text-stone-600 font-medium"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                <option value="">Todas las regiones</option>
                <option value="Africa">África</option>
                <option value="Americas">Américas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europa</option>
                <option value="Oceania">Oceanía</option>
              </select>
            </div>

            {/* Subregión */}
            <div className="w-full flex flex-col gap-1.5">
              <select
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-andean-emerald/20 focus:border-andean-emerald transition-all text-sm cursor-pointer text-stone-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                value={subRegionFilter}
                onChange={(e) => setSubRegionFilter(e.target.value)}
                disabled={!regionFilter}
              >
                <option value="">Todas las subregiones</option>
                {availableSubRegions.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Boton para borrar */}
            <div className="w-full h-full flex items-center">
              <button
                onClick={() => {
                  setSearch("");
                  setRegionFilter("");
                  setSubRegionFilter("");
                }}
                disabled={!(search || regionFilter || subRegionFilter)}
                className="w-full h-[46px] font-medium text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] border
                  disabled:bg-stone-50 disabled:text-stone-400 disabled:border-stone-200 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100
                  enabled:bg-red-50 enabled:hover:bg-red-100 enabled:text-red-600 enabled:border-red-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Limpiar filtros
              </button>
            </div>

          </div>
        </section>

        {/* Estados de Carga y Error */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-andean-emerald border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-stone-500">Cargando catálogo de destinos...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-2xl text-center max-w-xl mx-auto my-12">
            <p className="font-semibold text-lg mb-2">Conexión interrumpida</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredCountries.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
                <p className="text-stone-400 font-medium">No encontramos ningún destino con los filtros aplicados.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCountries.map((country) => (
                  <CountryCard
                    key={country.name.official}
                    country={country}
                    onExplore={() => setSelectedCountry(country)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal Modular */}
      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}

      {/* Botón Flotante para Regresar Arriba */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[var(--color-andean-emerald)] hover:bg-[var(--color-andean-emerald-hover)] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer z-50 flex items-center justify-center animate-bounce"
          title="Volver al inicio"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </main>
  );
}