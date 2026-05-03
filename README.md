# 🌦️ Weather Frontend M4

Aplicación web que muestra el clima de distintas ciudades de Chile, incluyendo clima actual, pronóstico semanal y estadísticas generadas dinámicamente.

---

## 📌 Descripción

Este proyecto corresponde al desarrollo progresivo de una aplicación web que permite visualizar el clima actual y el pronóstico semanal de distintas ciudades de Chile.

El usuario puede recorrer distintas localidades desde la página principal y acceder a una vista de detalle, donde se muestra información más completa como temperatura, estado del tiempo, humedad, viento y pronóstico para los próximos días.

En esta versión (Módulo 4), se incorporan cálculos y lógica en JavaScript para generar estadísticas climáticas de forma automática.

---

## 🎯 Objetivo del proyecto

Evolucionar la aplicación desarrollada en módulos anteriores, incorporando:

- Modelado de datos en JavaScript
- Lógica para procesamiento de información
- Cálculo de estadísticas climáticas
- Generación dinámica de contenido en el DOM
- Mantener una interfaz clara, modular y responsiva

---

## 🆕 Módulo 4 – Lógica y Estadísticas en JavaScript

En esta versión se implementa la lógica principal de la aplicación, permitiendo trabajar con los datos del clima y generar resultados dinámicos.

Se incorpora:

- Uso de arreglos y objetos para representar datos
- Recorrido de datos mediante ciclos (`for`)
- Uso de condicionales (`if / else`)
- Cálculo de:
  - Temperatura mínima semanal
  - Temperatura máxima semanal
  - Promedio de temperatura
  - Cantidad de días por tipo de clima
- Generación automática de resumen climático semanal
- Renderización dinámica en el DOM (sin datos hardcodeados en HTML)

---

## 🛠️ Tecnologías utilizadas

- HTML5 (estructura semántica)
- CSS3 + SASS (SCSS)
- Bootstrap 5
- JavaScript (Vanilla JS)
- LocalStorage
- Git & GitHub

---

## 🧩 Funcionalidades principales

- Visualización del clima actual de distintas ciudades
- Cards dinámicas con:
  - Imagen de la ciudad
  - Temperatura
  - Estado del clima
  - Icono representativo
- Navegación a vista de detalle
- Información detallada:
  - Temperatura actual
  - Estado del clima
  - Humedad
  - Viento
- Pronóstico semanal por ciudad
- Cálculo automático de estadísticas:
  - Temperatura mínima
  - Temperatura máxima
  - Promedio semanal
  - Conteo de tipos de clima
- Generación de resumen climático dinámico
- Navegación entre páginas

---

## 📊 Modelado de datos

Los datos del clima están definidos en el archivo `data.js` como un arreglo de objetos:

```js
const ciudades = [
  {
    id: "santiago",
    nombre: "Santiago",
    temperatura: 12,
    estado: "Nublado",
    pronosticoSemanal: [
      { dia: "Lunes", min: 9, max: 13, estado: "Lluvia" }
    ]
  }
];
Cada ciudad contiene:

Información actual del clima
Un arreglo pronosticoSemanal con los datos diarios

Esto permite procesar la información dinámicamente mediante JavaScript.

⚙️ Lógica implementada

Se implementaron funciones para:

Buscar ciudades por ID
Recorrer arreglos mediante ciclos
Calcular estadísticas climáticas
Contar tipos de clima (soleado, nublado, lluvia)
Generar resumen textual dinámico
Renderizar contenido en el DOM
🎨 Metodología de estilos (BEM)

Se utilizó la metodología BEM (Block, Element, Modifier).

Ejemplo:
place-card
place-card__title
place-card__button
place-card--sunny
Esto permite:

Mejor organización del código
Reutilización de componentes
Evitar conflictos de estilos

🎯 Uso de SASS (SCSS)

Se utilizó SASS con el patrón 7-1, organizando los estilos en distintas carpetas.

Se trabajó con:

Variables
Mixins
Anidación
Modularización de archivos

Se utilizó @use para importar módulos de forma ordenada.

scss/
├── abstracts/
│   ├── _variables.scss
│   └── _mixins.scss
│
├── base/
│   ├── _reset.scss
│   ├── _base.scss
│   └── _typography.scss
│
├── layout/
│   ├── _header.scss
│   ├── _main.scss
│   └── _footer.scss
│
├── components/
│   ├── _button.scss
│   ├── _card.scss
│   ├── _detalle.scss
│   ├── _hero.scss
│   └── _pronostico.scss
│
├── pages/
│   ├── _home.scss
│   └── _detalle-page.scss
│
├── themes/
│   └── (no utilizado)
│
├── vendors/
│   └── (no utilizado)
│
└── main.scss

⚙️ Funcionamiento

El archivo main.scss centraliza todos los estilos y se compila en:

assets/css/main.css

Este archivo es el que se enlaza al HTML.

Estructura del Proyecto
weather-frontend-m4/
│
├── index.html
├── detalle.html
├── README.md
│
├── scss/
│   └── (estructura SASS)
│
├── assets/
│   ├── css/
│   │   └── main.css
│   │
│   ├── js/
│   │   ├── data.js
│   │   ├── main.js
│   │   └── detalle.js
│   │
│   └── img/
│       ├── ciudades/
│       └── clima/

🔗 Proyectos anteriores
Módulo 2: https://github.com/Paula-front/weather-frontend-m2
Módulo 3: https://github.com/Paula-front/weather-frontend-m3

👩‍💻 Autor

Paula Pérez Valenzuela

📅 Año

2026


---
