// URL de tu Apps Script publicado
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby5LChdZKruNxKxkjIJBe_tNvCZMs6s6s-Oy7CoSy0c1uBfrGtDYXJxYGEkWaRv2F7pPA/exec";

// Función que anima el contador desde 0 hasta el número target
function animateCounter(element, target) {
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 100)); // velocidad: 100 pasos aprox

  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    element.textContent = current;
  }, 20); // cada 20ms
}

// Función que recibe el número desde el backend y dispara la animación
function updateCounter(data) {
  const cntEl = document.getElementById("cnt-1");
  animateCounter(cntEl, data.count);
}

// Función para cargar el contador al entrar (JSONP)
function loadCounter() {
  const script = document.createElement("script");
  script.src = SCRIPT_URL + "?callback=updateCounter";
  document.body.appendChild(script);
}

// Función para incrementar el contador al enviar formulario
function enviarFormulario() {
  fetch(SCRIPT_URL, {method: "POST"})
    .then(res => res.json())
    .then(data => {
      console.log("Respuesta del script (POST):", data);
      const cntEl = document.getElementById("cnt-1");
      animateCounter(cntEl, data.count); // 👈 también animamos al nuevo valor
    })
    .catch(err => console.error("Error incrementando contador:", err));
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", loadCounter);
