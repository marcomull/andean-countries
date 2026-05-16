# Andean Explorations - Panel Interno TI - Prueba Tecnica 

Aplicación web interactiva desarrollada para la gestión y exploración de destinos globales, consumiendo la API pública de países. Diseñada con un enfoque de código limpio, modular y resiliente a errores.

## Tecnologías
- **Framework:** Next.js 16.2.6
- **Lenguaje:** TypeScript 
- **Estilos:** Tailwind CSS v4

## Características Principales
- **Filtro Combinado Simultáneo:** Búsqueda en tiempo real por Nombre, Región y Subregión con selectores dependientes.
- **UI Consistente:** Botón estático de "Limpiar Filtros" (con estados enabled/disabled) y botón de "Volver Arriba" para evitar scroll excesivo.
- **Manejo de Errores:** Captura controlada de caídas de red o errores HTTP (como un 404), mostrando un banner de alerta sin romper la interfaz.
- **Modales Modulares:** Ventanas responsivas e independientes para ver el detalle de cada país.

## Instalación y Uso

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/marcomull/andean-countries.git](https://github.com/marcomull/andean-countries.git)
   ```
2. Dependencias 
   ```bash
   npm install
   ```
3. Ejecucion 
   ```bash
   npm run dev
   ```

