// URL de tu Apps Script publicado
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz-5b_ex1P2ZVOKtrLqMAKgVwr7IogVBTBgpL1xwqTVVlWyqoYNmM8wxqgP1xjB8VNiyA/exec";

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
