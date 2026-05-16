"use client";

import { Country } from "@/types/country";

interface CountryCardProps {
  country: Country;
  onExplore: () => void;
}

export default function CountryCard({ country, onExplore }: CountryCardProps) {
  return (
    <div className="group bg-white rounded-3xl border border-stone-200/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Vista de la bandera */}
      <div className="relative h-44 bg-stone-100 overflow-hidden">
        <img
          src={country.flags.svg || country.flags.png}
          alt={`Bandera de ${country.name.common}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      
      {/* Información básica del catálogo */}
      <div className="p-5 flex flex-col grow justify-between gap-4">
        <div>
          <h2 className="font-bold text-lg text-stone-900 tracking-tight mb-2 group-hover:text-andean-emerald transition-colors">
            {country.name.common}
          </h2>
          <div className="space-y-1 text-xs text-stone-500">
            <p><strong className="font-semibold text-stone-700">Capital:</strong> {country.capital?.[0] || "N/A"}</p>
            <p><strong className="font-semibold text-stone-700">Región:</strong> {country.region}</p>
          </div>
        </div>
        
        {/* Dispara la acción de ver el detalle completo */}
        <button
          onClick={onExplore}
          className="w-full bg-andean-dark hover:bg-andean-emerald text-white font-medium text-xs py-2.5 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-1 cursor-pointer"
        >
          Explorar detalles
        </button>
      </div>
    </div>
  );
}