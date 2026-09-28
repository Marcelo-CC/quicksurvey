# 📋 QuickSurvey — Encuesta Interactiva Web

**QuickSurvey** es una aplicación web interactiva y responsiva desarrollada con HTML5, CSS3 y JavaScript moderno (ES6+). Permite a los usuarios responder encuestas dinámicas paso a paso, con validación de preguntas obligatorias, cálculo en tiempo real del progreso y un resumen interactivo al finalizar.

🚀 Características Principales

Renderizado Dinámico: Generación de preguntas (radio, checkbox y text) mediante manipulaciones del DOM en tiempo real a partir de una estructura de datos en JS.

Barra de Progreso Interactiva: Indicador visual que se actualiza automáticamente conforme el usuario avanza en las preguntas.

Navegación Fluida: Control de flujo mediante botones (Anterior, Siguiente, Finalizar y Reiniciar).

Persistencia de Respuestas: Mantiene las respuestas seleccionadas o escritas si el usuario retrocede o avanza entre las preguntas.

Validación de Datos: Bloqueo de avance si una pregunta marcada como obligatoria (required: true) no ha sido respondida, mostrando alertas visuales.

Resumen y Estadísticas: Pantalla final que consolida las respuestas ingresadas, junto con el cálculo del porcentaje de completitud de la encuesta.

Diseño Responsivo: Interfaz limpia adaptada a pantallas móviles, tablets y de escritorio.

🛠️ Tecnologías Utilizadas

HTML5: Estructura semántica del documento (main, header, section, footer).

CSS3: Estilos modernos utilizando variables CSS, Flexbox, sombras (box-shadow) y transiciones suaves.

JavaScript (ES6+): Lógica de control, eventos del DOM, Template Literals, manipulación de arreglos (map, forEach, Array.from) y gestión del estado de la aplicación

📂 Estructura del Proyecto

quicksurvey/
│
├── index.html     # Estructura principal de la aplicación
├── style.css      # Hoja de estilos y diseño visual
├── script.js      # Lógica dinámica, eventos y renderizado
├── entrega.md     # Documento con datos del equipo y entrega
└── README.md      # Documentación del repositorio

👥 Integrantes del Equipo (Grupo G0203)

Castañeda Cano, Marcelo Giovanni

De La Cruz Cardenas, Antony Marcelo

Huamani Rodriguez, Jean Piero

📄 Licencia
Este proyecto fue desarrollado con fines académicos para el curso de Ingeniería Web de la Universidad Continental.
