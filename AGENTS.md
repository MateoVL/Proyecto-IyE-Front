# 🤖 Instrucciones para Agentes de IA (Frontend - Cronicotrak)

Este documento define el contexto, las convenciones de UI/UX, y las reglas técnicas que cualquier Agente de IA debe seguir al generar o modificar código en este repositorio.

---

## 1. Contexto del Proyecto
*   **Nombre:** Cronicotrak (Frontend)
*   **Descripción:** Interfaz de usuario para la gestión de pacientes crónicos. Debe ser usable, responsiva y segura.
*   **Stack Principal:** React 18, TypeScript, Vite, Tailwind CSS v4, Radix UI, Keycloak JS, Axios.

## 2. Reglas de Arquitectura y Código
*   **TypeScript Estricto:** Usa TypeScript para todo. No uses `any`. Define interfaces o types para las respuestas de la API, props de componentes y estados.
*   **Estructura de Componentes:** 
    *   Mantén los componentes pequeños y de responsabilidad única.
    *   Separa componentes "Tontos" (UI pura) de componentes "Inteligentes" (manejo de estado y llamadas a API).
*   **Llamadas a la API:** Centraliza todas las llamadas HTTP (usando Axios) en archivos de servicios (ej. `services/patientService.ts`). Nunca hagas un `axios.get` directamente dentro de un `useEffect` en un componente de UI, aíslalo.
*   **Estilos:** Utiliza Tailwind CSS para el estilado y los componentes primitivos de Radix UI para la accesibilidad. Mantén un diseño limpio, moderno (glassmorphism sutil, bordes redondeados, paleta coherente).

## 3. Seguridad y Sesiones
*   **Keycloak JS:** El flujo de autenticación y manejo de tokens recae completamente en la librería `keycloak-js`.
*   **Protección de Rutas:** Asegúrate de que las rutas privadas (React Router) comprueben el estado de autenticación de Keycloak antes de renderizar, redirigiendo al login si es necesario.
*   **Manejo del Token:** Para todas las peticiones a la API del backend, adjunta el token JWT (Bearer Token) interceptando las peticiones de Axios de forma centralizada.

## 4. Estándar de Prompts para la IA
Para solicitar la creación de un nuevo flujo o componente complejo, el prompt proporcionado a la IA debe incluir:
1.  **Diseño Esperado:** Una descripción de la UI o referencia visual.
2.  **Estado:** Qué variables de estado maneja la pantalla (ej. "estado de carga", "lista de pacientes", "errores de validación").
3.  **Interacciones:** Qué sucede al hacer clic en los botones (ej. "Llamar al endpoint X y mostrar un Toast de éxito").
4.  **Criterio de Éxito:** Qué debe pasar para considerar la tarea finalizada (ej. "El componente renderiza sin errores en consola y se adapta a móviles").

## 5. Proceso de Revisión (Para el Equipo Humano)
1.  **Revisión de UI/UX:** Al revisar el código generado por IA (mediante un PR), comprueba localmente que la UI no se rompa, que los colores coincidan con el tema del proyecto y que sea responsivo.
2.  **Auditoría de Dependencias:** La IA a veces inventa librerías o usa versiones obsoletas. Revisa el `package.json` en los PRs.
3.  **Actualización de Reglas:** Si la IA asume convenciones incorrectas (ej. prefiere usar Material UI en vez de Radix UI), añade una regla explícita en este archivo prohibiendo ese comportamiento.

---
*Nota: Este archivo es la "fuente de la verdad" para el comportamiento agéntico en el Frontend. Manténganlo actualizado con cada iteración.*
