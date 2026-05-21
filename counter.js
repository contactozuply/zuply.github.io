// URL de tu Apps Script publicado
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby5LChdZKruNxKxkjIJBe_tNvCZMs6s6s-Oy7CoSy0c1uBfrGtDYXJxYGEkWaRv2F7pPA/exec";

// Función para cargar el contador al entrar
function loadCounter() {
  const script = document.createElement("script");
  script.src = SCRIPT_URL + "?callback=updateCounter";
  document.body.appendChild(script);
}

function updateCounter(data) {
  document.getElementById("cnt-1").textContent = data.count;
}

function updateCounter(data) {
  document.getElementById("cnt-1").textContent = data.count;
}

function updateCounter(data) {
  document.getElementById("cnt-1").textContent = data.count;
}

// Función para incrementar el contador al enviar formulario
function enviarFormulario() {
  fetch(SCRIPT_URL, {method: "POST"})
    .then(res => res.json())
    .then(data => {
      console.log("Respuesta del script (POST):", data); // 👈 aquí ves qué devuelve
      document.getElementById("cnt-1").textContent = data.count;
    })
    .catch(err => console.error("Error incrementando contador:", err));
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", loadCounter);
