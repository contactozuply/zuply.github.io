// URL de tu Apps Script publicado
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxnYoMc2BWS1a0-xjd5KSpVSJPujjDbBDO6sTdS9LMx8v9S0v-QOzby7uGC9lEls0uyaQ/exec";

// Animación
function animateCounter(element, target) {
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 100));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    element.textContent = current;
  }, 20);
}

// Actualizar con animación
function updateCounter(data) {
  const cntEl = document.getElementById("cnt-1");
  animateCounter(cntEl, data.count);
}

// Cargar contador (JSONP)
function loadCounter() {
  const script = document.createElement("script");
  script.src = SCRIPT_URL + "?callback=updateCounter";
  document.body.appendChild(script);
}

// Incrementar al enviar formulario
function enviarFormulario() {
  fetch(SCRIPT_URL, {method: "POST"})
    .then(res => res.json())
    .then(data => {
      const cntEl = document.getElementById("cnt-1");
      animateCounter(cntEl, data.count);
    })
    .catch(err => console.error("Error incrementando contador:", err));
}

// 👇 Observador: dispara la carga solo cuando el contador entra en pantalla
document.addEventListener("DOMContentLoaded", () => {
  const cntEl = document.getElementById("cnt-1");
  const cntObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadCounter();
      cntObserver.disconnect(); // solo una vez
    }
  });
  cntObserver.observe(cntEl);
});
