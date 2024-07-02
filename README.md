# Proyecto de Visualización 3D TIC en Procesos Mineros

Este proyecto utiliza la biblioteca Three.js para visualizar datos tridimensionales en un navegador web, permitiendo una comprensión intuitiva y visual de los procesos mineros.

## Descripción

El proyecto carga datos de archivos de texto y visualiza cubos tridimensionales que representan diferentes puntos de datos con propiedades específicas, como posición y color. Además, ofrece diversas funcionalidades de filtrado y personalización.

## Funcionalidades

- **Filtrado por**:
  - Periodo de extracción
  - Ley
  - Tipo de roca
  - Secciones transversales

- **Selección de Escenarios**:
  - Los escenarios se deben ubicar en la carpeta `assets`.
  - Para reconocer estos archivos, deben cambiarse los nombres de los posibles archivos a leer en el archivo `constants.js` dentro de la carpeta `src/utils` en la variable `SCENARIOS`.

- **Personalización de Parámetros**:
  - **Rangos Válidos**: Editar en la variable `VALID_RANGES` en `constants.js` para definir los tipos de roca.
  - **Periodos de Extracción**: Definir en la variable `PERIODS`.
  - **Tipos de Roca**: Editar en la variable `ROCK_TYPES`.
  - **Costo de Extracción y Precio del Mineral**: Editar en las variables `EXTRACTION_COST_PER_BLOCK` y `MINERAL_PRICE` respectivamente.

## Requisitos

- Navegador web moderno con soporte para WebGL
- Node.js y npm instalados

## Instalación

1. Clona este repositorio en tu máquina local.
2. Abre el proyecto en tu editor de código favorito.
3. En un terminal, ejecuta:
   ```bash
   npm install
   npx vite
   ```
4. Abre http://localhost:5173 en tu navegador.

## Uso

El proyecto permite cargar datos de un archivo de texto y visualizar cubos tridimensionales en función de estos datos. Los usuarios pueden filtrar la visualización según sus necesidades y seleccionar diferentes escenarios para análisis detallados.

## Estructura del proyecto
```
src/
├── assets/
│   ├── MinePlan.txt
│   ├── RockTypes.txt
│   ├── Scenario00.txt
│   ├── Scenario01.txt
│   ├── Scenario02.txt
│   ├── Scenario03.txt
│   ├── Scenario04.txt
│   ├── Scenario05.txt
│   ├── Scenario06.txt
│   ├── Scenario07.txt
│   ├── Scenario08.txt
│   └── Scenario09.txt
├── components/
├── context/
├── helpers/
│   ├── loadData.js
│   └── statistics.js
├── hooks/
│   └── useFilter.js
├── utils/
│   ├── constants.js
│   └── routes.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## Posibles Cambios y Mejoras

### Refactorización

1. **Cambio de nombres de variables**: Utilizar nombres de variables más descriptivos para mejorar la legibilidad y mantenimiento del código.
   - `scenarioData` podría ser `dataEscenario`.
   - `oreley` podría ser `oreLaw`

2. **Modularización del código**: Dividir funciones largas en funciones más pequeñas y específicas para mejorar la organización y reutilización del código.

### Adición de Futuras Funcionalidades

1. **Mejora de la Interfaz de Usuario**:
   - Implementar una interfaz de usuario más amigable y visualmente atractiva utilizando frameworks modernos como React o Vue.js.
   - Añadir una barra lateral o un menú desplegable para facilitar la selección de escenarios y filtros.

2. **Optimización del Rendimiento**:
   - Implementar técnicas de carga diferida para mejorar el tiempo de carga inicial.
   - Utilizar Web Workers para realizar cálculos intensivos en segundo plano sin bloquear la interfaz de usuario.

3. **Interacción y Visualización Mejorada**:
   - Añadir funcionalidades de zoom y panorámica más avanzadas.
   - Implementar la capacidad de guardar y cargar configuraciones de visualización personalizadas.

4. **Documentación y Pruebas**:
   - Mejorar la documentación del código para facilitar la comprensión y colaboración.
   - Añadir pruebas unitarias y de integración para asegurar la calidad y fiabilidad del código.

5. **Soporte Multilingüe**:
   - Implementar soporte para múltiples idiomas para hacer la aplicación accesible a una audiencia más amplia.


## Referencias

- [Three.js](https://threejs.org): Biblioteca utilizada para la visualización 3D.
- [OrbitControls.js](https://threejs.org/docs/#examples/en/controls/OrbitControls): Controles de órbita para la cámara.

## Contribuidores

- [Ignacio Molina](https://github.com/MolodyGs)
- [Marcos Silva Gonzalez](https://github.com/marcosilva)
- [Joaquin Pinto](https://github.com/pintosoUCN)
- [Matías Núñez](https://github.com/matiias23)
- [Victor Caicedo](https://github.com/caicedov)

