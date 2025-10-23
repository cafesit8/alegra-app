# 🖼️ Alegra Image Race – Reto Técnico

![Vue](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Aplicación web desarrollada como reto técnico para **Alegra**, centrada en ofrecer una experiencia interactiva y amigable donde los usuarios pueden buscar imágenes mediante palabras clave, elegir sus favoritas y competir por puntos asignados a vendedores.

> ⚡ **Característica destacada**: Cuando un vendedor alcanza el puntaje máximo, la app genera automáticamente una factura real usando la API de Alegra.

## 🎯 Objetivo del Proyecto

Este proyecto fue desarrollado como reto técnico para demostrar:

- ✅ **Dominio de Vue 3 + TypeScript**
- ✅ **Integración con APIs externas** (Alegra, Unsplash, Gemini)
- ✅ **Uso de IA generativa** para mejorar la experiencia del usuario
- ✅ **Diseño UI/UX** funcional y moderno
- ✅ **Arquitectura escalable** y código mantenible

## 🚀 Funcionalidades Principales

### 🔍 Búsqueda Inteligente de Imágenes

- **Búsqueda por palabras clave** - Los usuarios pueden buscar imágenes escribiendo una palabra clave
- **IA para mejoras de búsqueda** - Usa Gemini 2.5 Flash Lite para ofrecer 3 recomendaciones optimizadas
- **Resultados visuales** - Muestra imágenes relevantes de Unsplash

### 🖼️ Selección Interactiva

- **Selección de imágenes** - Los usuarios eligen entre las imágenes mostradas
- **Asignación de puntos** - Cada selección otorga puntos al vendedor asociado
- **Experiencia gamificada** - Interfaz engaging y responsive

### 🏆 Sistema de Puntuación

- **Puntuación dinámica** - Cada vendedor acumula puntos según las imágenes elegidas
- **Modal de ganador** - Al alcanzar el puntaje límite, se muestra el vendedor ganador
- **Celebración visual** - Efectos confetti al declarar ganador

### 💫 Facturación Automática

- **Integración con Alegra** - Generación automática de facturas reales
- **Datos del vendedor** - Factura incluye información completa del vendedor ganador
- **Confirmación visual** - Vista de confirmación con datos de la factura creada

## 🧠 Integración con Inteligencia Artificial

### Gemini 2.5 Flash Lite

La aplicación utiliza **Gemini 2.5 Flash Lite** mediante `@google/genai` para:

- **Sugerencias inteligentes** - Mejora las búsquedas con términos relacionados
- **Búsquedas precisas** - Resultados más relevantes y contextuales
- **Experiencia fluida** - Interacciones más naturales e intuitivas

**Ejemplo de uso:**

> Si el usuario busca _"playa"_, la IA puede sugerir:
>
> - "océano tropical"
> - "vacaciones en el mar"
> - "atardecer costero"

## 🛠️ Stack Tecnológico

| Tecnología             | Descripción                                                  |
| ---------------------- | ------------------------------------------------------------ |
| **Vue 3 + TypeScript** | Framework principal para la construcción de la app           |
| **Pinia**              | Manejo del estado global (vendedores, puntuaciones, ganador) |
| **Tailwind CSS**       | Estilado moderno, fluido y completamente responsive          |
| **@google/genai**      | Integración con IA Gemini 2.0 Flash Lite                     |
| **@unpic/vue**         | Optimización y carga eficiente de imágenes                   |
| **js-confetti**        | Efectos visuales para celebrar al ganador                    |
| **OGL**                | Renderizado del componente "Aurora" (fondo animado)          |
| **Alegra API**         | Creación y gestión de facturas reales                        |
