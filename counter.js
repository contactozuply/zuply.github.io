// URL de tu Apps Script publicado
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxyJrC_Ymnxx4MVz0J4ekhRKdAdILRitiAkKCZQTlC4DjXcARFCN2lthOyhiviGcgq0Yw/exec";

// Función para cargar el contador al entrar
function loadCounter() {
  fetch(SCRIPT_URL)
    .then(res => res.json())
    .then(data => {
      document.getElementById("cnt-1").textContent = data.count;
    })
    .catch(err => console.error("Error cargando contador:", err));
}

// Función para incrementar el contador al enviar formulario
function enviarFormulario() {
  fetch(SCRIPT_URL, {method: "POST"})
    .then(res => res.json())
    .then(data => {
      document.getElementById("cnt-1").textContent = data.count;
    })
    .catch(err => console.error("Error incrementando contador:", err));
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", loadCounter);
