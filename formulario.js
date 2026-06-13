// formulario.js - Lógica e información sensible fuera del HTML

// 1. Animación del contador de la página
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

const cntEl = document.getElementById('cnt-1');
const cntObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounter(cntEl, 247);
    cntObserver.disconnect();
  }
});
if (cntEl) cntObserver.observe(cntEl);

// 2. Efecto de revelado al hacer scroll
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));


// 3. FUNCIÓN PRINCIPAL: CAPTURA Y ENVÍO REAL A GOOGLE SHEETS
async function handleSignup() {
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const comuna = document.getElementById('comuna').value;

  // Validación de campos vacíos + Efecto de vibración (Shake)
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

  // Validación de formato de correo
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email)) {
    const el = document.getElementById('email');
    el.style.borderColor = '#ff4757';
    setTimeout(() => el.style.borderColor = '', 1200);
    return;
  }

  const datosUsuario = { nombre, email, comuna };
  
  // Bloqueamos el botón temporalmente para evitar múltiples clics
  const boton = document.querySelector('.btn-signup');
  const textoOriginalBoton = boton.innerHTML;
  boton.innerHTML = '⌛ Procesando...';
  boton.disabled = true;

  try {
    // Aquí queda guardada tu URL de Google de forma ordenada
    const respuesta = await fetch('https://script.google.com/macros/s/AKfycbyphShIWERe3UrEB_wwXX3x7Yu_5uhhiegF_3bxzu-4T-3GDXU2sc6lLA1ey7AkROEC/exec', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(datosUsuario)
    });

    const resultado = await respuesta.json();

    if (resultado.status === 'success') {
      // Si Google responde éxito, mostramos los fuegos artificiales 🎉
      document.getElementById('form-content').style.display = 'none';
      document.getElementById('success-state').style.display = 'block';
    } else {
      alert('Hubo un problema en el servidor. Inténtalo de nuevo.');
      boton.innerHTML = textoOriginalBoton;
      boton.disabled = false;
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión. Revisa tu internet.');
    boton.innerHTML = textoOriginalBoton;
    boton.disabled = false;
  }
}

// Estilos para el efecto de vibración de errores
const style = document.createElement('style');
style.textContent = `@keyframes shake {
  0%,100%{transform:translateX(0)}
  20%{transform:translateX(-6px)}
  40%{transform:translateX(6px)}
  60%{transform:translateX(-4px)}
  80%{transform:translateX(4px)}
}`;
document.head.appendChild(style);
