# 📋 QuickSurvey — Encuesta Interactiva Web

**QuickSurvey** es una aplicación web interactiva desarrollada con **HTML5, CSS3 y JavaScript ES6+**. El sistema permite responder una encuesta de manera secuencial, mostrando una pregunta a la vez y proporcionando navegación entre preguntas, validación de respuestas obligatorias, una barra de progreso y un resumen final.

---

## 🚀 Características principales

### 📝 Encuesta dinámica

Las preguntas de la encuesta se encuentran definidas en una estructura de datos en JavaScript y se generan dinámicamente mediante manipulación del DOM.

Actualmente, la encuesta contiene **3 preguntas**:

* Una pregunta de tipo **radio**, donde se puede seleccionar una sola alternativa.
* Una pregunta de tipo **checkbox**, donde se pueden seleccionar varias alternativas.
* Una pregunta de tipo **text**, donde el usuario puede escribir una respuesta.

Las preguntas y sus opciones se administran mediante el arreglo `questionsData`.

### 📊 Barra de progreso

La aplicación cuenta con una barra de progreso que indica visualmente el avance de la encuesta.

También muestra el texto correspondiente a la pregunta actual, por ejemplo:

> Pregunta 1 de 3

El porcentaje de la barra se actualiza automáticamente conforme el usuario avanza.

### ⬅️➡️ Navegación

El usuario puede desplazarse por la encuesta mediante los botones:

* **Anterior**
* **Siguiente**
* **Finalizar**

El botón **Anterior** se oculta en la primera pregunta y el botón **Finalizar** aparece únicamente en la última pregunta.

### 💾 Conservación de respuestas

Las respuestas se almacenan en el objeto `userAnswers`.

Cuando el usuario retrocede a una pregunta, las respuestas previamente seleccionadas o escritas vuelven a mostrarse. Esto permite navegar por la encuesta sin perder la información ingresada.

### ✅ Validación de preguntas obligatorias

Las preguntas pueden configurarse mediante la propiedad:

```javascript
required: true
```

Cuando una pregunta obligatoria no ha sido respondida, el sistema impide continuar y muestra el siguiente mensaje:

> Esta pregunta es obligatoria. Por favor, responde para continuar.

En la encuesta actual, la pregunta **p1** y la pregunta **p3** son obligatorias, mientras que **p2** es opcional.

### 📋 Resumen de respuestas

Al finalizar la encuesta, se oculta el formulario y se muestra una sección de **Resumen de Respuestas**.

Esta sección presenta:

* Número de pregunta.
* Texto de la pregunta.
* Respuesta ingresada.
* Preguntas que quedaron sin responder.
* Cantidad total de preguntas respondidas.
* Porcentaje de completitud.

El sistema calcula el porcentaje mediante la cantidad de preguntas respondidas respecto al total.

### 🔄 Reiniciar encuesta

El botón **Reiniciar encuesta** permite regresar al inicio y eliminar las respuestas almacenadas, comenzando nuevamente desde la primera pregunta.

---

## 🛠️ Tecnologías utilizadas

### HTML5

Se utiliza HTML5 para construir la estructura principal de la aplicación.

La página contiene elementos semánticos como:

* `<main>`
* `<header>`
* `<section>`
* `<footer>`

También se incluyen los elementos necesarios para mostrar la encuesta, la barra de progreso, los mensajes de validación y el resumen final.

### CSS3

El diseño se desarrolla utilizando CSS3.

Entre los recursos utilizados se encuentran:

* Variables CSS.
* Flexbox.
* `box-shadow`.
* Transiciones.
* Bordes redondeados.
* Colores personalizados.
* Diseño adaptable.
* Clases para ocultar elementos.

La aplicación utiliza variables como `--primary`, `--secondary`, `--success`, `--danger` y `--bg` para organizar los estilos.

La tarjeta principal tiene un ancho máximo de **600 px** y utiliza sombras, bordes redondeados y espaciado interno para presentar la encuesta.

### JavaScript ES6+

JavaScript se utiliza para controlar toda la lógica de la aplicación.

Entre las características utilizadas se encuentran:

* Variables `let` y `const`.
* Funciones.
* Objetos y arreglos.
* Template Literals.
* Manipulación del DOM.
* Eventos.
* `forEach()`.
* `Array.from()`.
* `map()`.
* `querySelector()`.
* `querySelectorAll()`.
* Gestión del estado de la encuesta.

---

## 📂 Estructura del proyecto

```text
quicksurvey/
│
├── index.html
├── style.css
├── script.js
├── entrega.md
└── README.md
```

### Descripción de archivos

| Archivo      | Descripción                                                        |
| ------------ | ------------------------------------------------------------------ |
| `index.html` | Contiene la estructura principal de la aplicación.                 |
| `style.css`  | Contiene los estilos y diseño visual de la encuesta.               |
| `script.js`  | Contiene la lógica, preguntas, validaciones, navegación y resumen. |
| `entrega.md` | Documento destinado a la información de entrega del proyecto.      |
| `README.md`  | Documentación del proyecto.                                        |

---

## ⚙️ Funcionamiento

El funcionamiento de QuickSurvey se basa en un flujo de preguntas paso a paso.

```text
┌──────────────────────┐
│      Iniciar         │
│      encuesta        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Mostrar pregunta     │
│ actual               │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Guardar respuesta    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ ¿Pregunta obligatoria│
│ sin responder?       │
└───────┬────────┬─────┘
        │ Sí     │ No
        ▼        ▼
┌────────────┐  ┌─────────────────┐
│ Mostrar    │  │ Avanzar a la    │
│ validación │  │ siguiente       │
└────────────┘  └────────┬────────┘
                         │
                         ▼
                 ┌─────────────────┐
                 │ ¿Es la última   │
                 │ pregunta?      │
                 └───────┬─────────┘
                         │
                    ┌────┴────┐
                    │         │
                   No        Sí
                    │         │
                    ▼         ▼
               Siguiente   Resumen
                              │
                              ▼
                         Estadísticas
                              │
                              ▼
                          Reiniciar
```

---

## 📋 Tipos de preguntas

QuickSurvey permite trabajar con diferentes tipos de entrada:

### Radio

Permite seleccionar **una sola opción**.

Ejemplo:

```javascript
{
  id: "p1",
  title: "¿Cuál es tu nivel de satisfacción con las clases virtuales?",
  type: "radio",
  required: true,
  options: [
    "Excelente",
    "Bueno",
    "Regular",
    "Deficiente"
  ]
}
```

### Checkbox

Permite seleccionar **una o varias opciones**.

Ejemplo:

```javascript
{
  id: "p2",
  title: "¿Qué herramientas utilizas con mayor frecuencia?",
  type: "checkbox",
  required: false,
  options: [
    "Zoom / Teams",
    "Moodle / Canvas",
    "Google Classroom",
    "Foros"
  ]
}
```

### Text

Permite ingresar una respuesta escrita.

```javascript
{
  id: "p3",
  title: "Escribe alguna sugerencia para mejorar la experiencia académica:",
  type: "text",
  required: true
}
```

---

## 👥 Integrantes del equipo

### Grupo G0203

* **Castañeda Cano, Marcelo Giovanni**
* **De La Cruz Cardenas, Antony Marcelo**
* **Huamani Rodriguez, Jean Piero**

---

## 🎓 Información académica

**Universidad:** Universidad Continental
**Curso:** Ingeniería Web
**Grupo:** G0203

---

## 📄 Licencia

Este proyecto fue desarrollado con **fines académicos** para el curso de **Ingeniería Web de la Universidad Continental**.
