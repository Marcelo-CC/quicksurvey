// --- ESTRUCTURA DE DATOS (Estado de la Aplicación) ---
const questionsData = [
  {
    id: "p1",
    title: "¿Cuál es tu nivel de satisfacción con las clases virtuales?",
    type: "radio",
    required: true,
    options: ["Excelente", "Bueno", "Regular", "Deficiente"]
  },
  {
    id: "p2",
    title: "¿Qué herramientas utilizas con mayor frecuencia?",
    type: "checkbox",
    required: false,
    options: ["Zoom / Teams", "Moodle / Canvas", "Google Classroom", "Foros"]
  },
  {
    id: "p3",
    title: "Escribe alguna sugerencia para mejorar la experiencia académica:",
    type: "text",
    required: true
  }
];

// --- ESTADO GLOBAL ---
let currentIndex = 0;
let userAnswers = {};

// --- SELECCIÓN DE ELEMENTOS DEL DOM ---
const questionContainer = document.querySelector("#question-container");
const progressBar = document.querySelector("#progress-bar");
const progressText = document.querySelector("#progress-text");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const btnFinish = document.querySelector("#btn-finish");
const btnRestart = document.querySelector("#btn-restart");
const validationMsg = document.querySelector("#validation-message");
const summaryContainer = document.querySelector("#summary-container");
const summaryContent = document.querySelector("#summary-content");
const surveyFooter = document.querySelector(".survey-footer");

// --- FUNCIONES DE RENDERIZADO ---

function renderQuestion() {
  // Limpiar pregunta anterior
  while (questionContainer.firstChild) {
    questionContainer.firstChild.remove();
  }

  hideValidation();

  const currentQ = questionsData[currentIndex];

  // Crear tarjeta
  const card = document.createElement("div");
  card.classList.add("question-card");

  // Crear título
  const titleEl = document.createElement("h2");
  titleEl.classList.add("question-title");

  titleEl.textContent = `${currentIndex + 1}. ${currentQ.title}`;

  // Asterisco para preguntas obligatorias
  if (currentQ.required) {
    const asterisk = document.createElement("span");
    asterisk.classList.add("required-asterisk");
    asterisk.textContent = " *";
    titleEl.appendChild(asterisk);
  }

  card.appendChild(titleEl);

  // Contenedor de opciones
  const optionsGroup = document.createElement("div");
  optionsGroup.classList.add("options-group");

  // Radio o checkbox
  if (
    currentQ.type === "radio" ||
    currentQ.type === "checkbox"
  ) {
    currentQ.options.forEach((optText) => {
      const label = document.createElement("label");
      label.classList.add("option-label");

      const input = document.createElement("input");

      input.setAttribute("type", currentQ.type);
      input.setAttribute("name", currentQ.id);
      input.setAttribute("value", optText);

      // Recuperar respuesta guardada
      const saved = userAnswers[currentQ.id];

      if (
        currentQ.type === "radio" &&
        saved === optText
      ) {
        input.checked = true;
      }

      if (
        currentQ.type === "checkbox" &&
        Array.isArray(saved) &&
        saved.includes(optText)
      ) {
        input.checked = true;
      }

      input.addEventListener("change", saveAnswer);

      label.appendChild(input);
      label.appendChild(
        document.createTextNode(` ${optText}`)
      );

      optionsGroup.appendChild(label);
    });
  }

  // Input de texto
  else if (currentQ.type === "text") {
    const input = document.createElement("input");

    input.setAttribute("type", "text");
    input.classList.add("text-input");
    input.setAttribute(
      "placeholder",
      "Escribe tu respuesta aquí..."
    );

    // Recuperar respuesta guardada
    if (userAnswers[currentQ.id]) {
      input.value = userAnswers[currentQ.id];
    }

    input.addEventListener("input", saveAnswer);

    optionsGroup.appendChild(input);
  }

  card.appendChild(optionsGroup);
  questionContainer.appendChild(card);

  updateProgress();
  updateButtons();
}

// --- GUARDAR RESPUESTA ---

function saveAnswer() {
  const currentQ = questionsData[currentIndex];

  // Radio
  if (currentQ.type === "radio") {
    const selected = questionContainer.querySelector(
      `input[name="${currentQ.id}"]:checked`
    );

    userAnswers[currentQ.id] = selected
      ? selected.value
      : "";
  }

  // Checkbox
  else if (currentQ.type === "checkbox") {
    const checkedBoxes = questionContainer.querySelectorAll(
      `input[name="${currentQ.id}"]:checked`
    );

    userAnswers[currentQ.id] = Array.from(
      checkedBoxes
    ).map((checkbox) => checkbox.value);
  }

  // Texto
  else if (currentQ.type === "text") {
    const textInput =
      questionContainer.querySelector(".text-input");

    userAnswers[currentQ.id] = textInput
      ? textInput.value.trim()
      : "";
  }
}

// --- VALIDAR PREGUNTA ---

function validateCurrentQuestion() {
  const currentQ = questionsData[currentIndex];

  // Si no es obligatoria, siempre es válida
  if (!currentQ.required) {
    return true;
  }

  const val = userAnswers[currentQ.id];

  let isValid = false;

  // Radio
  if (currentQ.type === "radio") {
    isValid = Boolean(val && val.length > 0);
  }

  // Texto
  else if (currentQ.type === "text") {
    isValid = Boolean(val && val.length > 0);
  }

  // Checkbox
  else if (currentQ.type === "checkbox") {
    isValid =
      Array.isArray(val) &&
      val.length > 0;
  }

  if (!isValid) {
    showValidation(
      "Esta pregunta es obligatoria. Por favor, responde para continuar."
    );
  } else {
    hideValidation();
  }

  return isValid;
}

// --- VALIDACIÓN VISUAL ---

function showValidation(msg) {
  validationMsg.textContent = msg;
  validationMsg.classList.remove("hidden");
}

function hideValidation() {
  validationMsg.classList.add("hidden");
  validationMsg.textContent = "";
}

// --- ACTUALIZAR PROGRESO ---

function updateProgress() {
  const total = questionsData.length;

  const percentage =
    ((currentIndex + 1) / total) * 100;

  progressBar.style.width = `${percentage}%`;

  progressText.textContent =
    `Pregunta ${currentIndex + 1} de ${total}`;
}

// --- ACTUALIZAR BOTONES ---

function updateButtons() {
  // Botón anterior
  if (currentIndex === 0) {
    btnPrev.classList.add("hidden");
  } else {
    btnPrev.classList.remove("hidden");
  }

  // Botón siguiente / finalizar
  if (currentIndex === questionsData.length - 1) {
    btnNext.classList.add("hidden");
    btnFinish.classList.remove("hidden");
  } else {
    btnNext.classList.remove("hidden");
    btnFinish.classList.add("hidden");
  }
}

// --- MOSTRAR RESUMEN ---

function showSummary() {
  questionContainer.classList.add("hidden");
  surveyFooter.classList.add("hidden");

  document
    .querySelector(".progress-container")
    .classList.add("hidden");

  summaryContainer.classList.remove("hidden");

  // Limpiar resumen anterior
  while (summaryContent.firstChild) {
    summaryContent.firstChild.remove();
  }

  let answeredCount = 0;

  // Recorrer preguntas
  questionsData.forEach((q, idx) => {
    const item = document.createElement("div");
    item.classList.add("summary-item");

    // Título
    const title = document.createElement("strong");

    title.textContent =
      `${idx + 1}. ${q.title}`;

    // Respuesta
    const answerP = document.createElement("p");

    const val = userAnswers[q.id];

    const hasAnswer =
      val &&
      (
        Array.isArray(val)
          ? val.length > 0
          : val !== ""
      );

    if (hasAnswer) {
      answeredCount++;

      const answerText = Array.isArray(val)
        ? val.join(", ")
        : val;

      answerP.textContent =
        `Respuesta: ${answerText}`;
    } else {
      answerP.textContent =
        "Respuesta: (Sin responder)";
    }

    item.appendChild(title);
    item.appendChild(answerP);

    summaryContent.appendChild(item);
  });

  // Estadísticas
  const stats = document.createElement("div");
  stats.classList.add("summary-stats");

  const totalQ = questionsData.length;

  const completionRate = Math.round(
    (answeredCount / totalQ) * 100
  );

  stats.innerHTML = `
    <p><strong>Preguntas respondidas:</strong> ${answeredCount} de ${totalQ}</p>
    <p><strong>Porcentaje de completitud:</strong> ${completionRate}%</p>
  `;

  summaryContent.appendChild(stats);
}

// --- REINICIAR ENCUESTA ---

function restartSurvey() {
  currentIndex = 0;

  userAnswers = {};

  summaryContainer.classList.add("hidden");

  questionContainer.classList.remove("hidden");

  surveyFooter.classList.remove("hidden");

  document
    .querySelector(".progress-container")
    .classList.remove("hidden");

  renderQuestion();
}

// --- EVENTO: SIGUIENTE ---

btnNext.addEventListener("click", () => {
  saveAnswer();

  if (validateCurrentQuestion()) {
    currentIndex++;
    renderQuestion();
  }
});

// --- EVENTO: ANTERIOR ---

btnPrev.addEventListener("click", () => {
  saveAnswer();

  hideValidation();

  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
});

// --- EVENTO: FINALIZAR ---

btnFinish.addEventListener("click", () => {
  saveAnswer();

  if (validateCurrentQuestion()) {
    showSummary();
  }
});

// --- EVENTO: REINICIAR ---

btnRestart.addEventListener(
  "click",
  restartSurvey
);

// --- INICIALIZAR APLICACIÓN ---

renderQuestion();