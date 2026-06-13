// formulario.js - Zuply Lógica Segura y Centralizada

const SCRIPT_URL_SEGURO = "https://script.google.com/macros/s/AKfycbzxQoAhYD1jmBBdpWoqEIxcOqb8xGjMy_55mQ4_BOU1rNvP2Dyuuozxvy3G2imm-JC_qg/exec";

// 1. Animación del contador
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('es-CL');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// 2. Carga dinámica del contador vía JSONP (Evita bloqueos CORS de forma limpia)
function loadCounter() {
  // Limpiar scripts de consultas anteriores para no saturar el DOM
  const oldScript = document.getElementById('jsonp-counter-script');
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.id = 'jsonp-counter-script';
  script.src = SCRIPT_URL_SEGURO + "?callback=updateCounter&t=" + new Date().getTime();
  document.body.appendChild(script);
}

function updateCounter(data) {
  const cntEl = document.getElementById('cnt-1');
  if (cntEl && data && data.count !== undefined) {
    animateCounter(cntEl, data.count);
  }
}

// Inicializar observador del contador al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  const cntEl = document.getElementById('cnt-1');
  if (cntEl) {
    const cntObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadCounter();
        cntObserver.disconnect();
        // Polling discreto cada 20 segundos
        setInterval(loadCounter, 20000);
      }
    });
    cntObserver.observe(cntEl);
  }

  // Activar efectos de revelado al hacer scroll
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObserver.observe(el));
});

// 3. ENVÍO DEL FORMULARIO DE REGISTRO DE LEADS
async function handleSignup() {
  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const comunaInput = document.getElementById('comuna');

  const nombre = nombreInput.value.trim();
  const email = emailInput.value.trim();
  const comuna = comunaInput.value;

  if (!nombre || !email || !comuna) {
    [!nombre && 'nombre', !email && 'email', !comuna && 'comuna'].forEach(id => {
      if (!id) return;
      const el = document.getElementById(id);
      el.style.borderColor = '#ff4757';
      el.style.animation = 'shake 0.4s ease';
      setTimeout(() => { el.style.borderColor = ''; el.style.animation = ''; }, 1200);
    });
    return;
  }

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email)) {
    emailInput.style.borderColor = '#ff4757';
    setTimeout(() => emailInput.style.borderColor = '', 1200);
    return;
  }
  
  const boton = document.querySelector('.btn-signup');
  const textoOriginalBoton = boton.innerHTML;
  boton.innerHTML = '⌛ Procesando...';
  boton.disabled = true;

  const datosUsuario = { tipo: 'lead', nombre, email, comuna };

  try {
    const respuesta = await fetch(SCRIPT_URL_SEGURO, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(datosUsuario)
    });

    const resultado = await respuesta.json();

    if (resultado.status === 'success') {
      document.getElementById('form-content').style.display = 'none';
      document.getElementById('success-state').style.display = 'block';
      loadCounter();
    } else {
      alert('Hubo un inconveniente en el procesamiento. Por favor, vuelve a intentarlo.');
      boton.innerHTML = textoOriginalBoton;
      boton.disabled = false;
    }
  } catch (error) {
    console.error('Error en registro:', error);
    alert('Error en la conexión. Verifica tu acceso a internet.');
    boton.innerHTML = textoOriginalBoton;
    boton.disabled = false;
  }
}
