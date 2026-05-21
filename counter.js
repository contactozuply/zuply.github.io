// URL de tu Apps Script publicado
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxZDiigLA1Medq2Ijbb8PJaVnWJrbnNvcVO6AOA_WAVmbsgLYGWcICvDeBW2PRSemN3mw/exec";

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
  console.log("Callback recibido:", data); // 👈 para depurar
  const cntEl = document.getElementById("cnt-1");
  animateCounter(cntEl, data.count);
}

// Cargar contador (JSONP)
function loadCounter() {
  const script = document.createElement("script");
  script.src = SCRIPT_URL + "?callback=updateCounter";
  document.body.appendChild(script);
}

// 👇 Aquí incorporas handleSignup, al mismo nivel que las demás funciones
function handleSignup() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const comuna = document.getElementById("comuna").value;

  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ nombre, email, comuna }),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.json())
  .then(data => {
    const cntEl = document.getElementById("cnt-1");
    animateCounter(cntEl, data.count);

    document.getElementById("success-state").style.display = "block";
  })
  .catch(err => console.error("Error incrementando contador:", err));
}

// Observador + polling
document.addEventListener("DOMContentLoaded", () => {
  const cntEl = document.getElementById("cnt-1");
  const cntObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadCounter(); // primera carga
      cntObserver.disconnect();

      // 👇 Polling cada 10 segundos
      setInterval(loadCounter, 10000);
    }
  });
  cntObserver.observe(cntEl);
});
