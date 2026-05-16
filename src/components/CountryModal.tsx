"use client";

import { Country } from "@/types/country";

interface CountryModalProps {
    country: Country;
    onClose: () => void;
}

export default function CountryModal({ country, onClose }: CountryModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-100 animate-slide-up">

                {/* Imagen de la Bandera */}
                <div className="relative h-56 bg-stone-100">
                    <img
                        src={country.flags.svg}
                        alt={country.name.common}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/80 backdrop-blur-md text-stone-800 p-2 rounded-full hover:bg-white transition-colors shadow-sm cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Cuerpo del Modal */}
                <div className="p-6 space-y-5">
                    <div>
                        {/* Región y Subregión */}
                        <p className="text-xs font-bold uppercase tracking-wider text-andean-emerald mb-1">
                            {country.region} {country.subregion ? `• ${country.subregion}` : ""}
                        </p>            
                        <h3 className="text-2xl font-black text-andean-dark tracking-tight mt-0.5">{country.name.common}</h3>
                        <p className="text-xs text-stone-400 font-medium mt-1">Nombre oficial: {country.name.official}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-stone-100 pt-4">
                        <div>
                            <p className="text-xs text-stone-400 font-medium">Población total</p>
                            <p className="text-base font-bold text-andean-dark">{country.population.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-stone-400 font-medium">Capital del Estado</p>
                            <p className="text-base font-bold text-andean-dark">{country.capital?.[0] || "N/A"}</p>
                        </div>
                    </div>

                    <div className="space-y-3 border-t border-stone-100 pt-4">
                        <div>
                            <p className="text-xs text-stone-400 font-medium mb-1">Moneda(s)</p>
                            <div className="flex flex-wrap gap-1.5">
                                {country.currencies ? (
                                    Object.values(country.currencies).map((curr) => (
                                        <span key={curr.name} className="text-xs bg-stone-100 text-stone-700 px-3 py-1 rounded-lg font-medium">
                                            {curr.name} ({curr.symbol})
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs text-stone-500">N/A</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs text-stone-400 font-medium mb-1">Idioma(s)</p>
                            <div className="flex flex-wrap gap-1.5">
                                {country.languages ? (
                                    Object.values(country.languages).map((lang) => (
                                        <span key={lang} className="text-xs bg-emerald-50 text-andean-emerald px-3 py-1 rounded-lg font-medium border border-emerald-100/50">
                                            {lang}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs text-stone-500">N/A</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}