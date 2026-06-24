// formulario.js - Zuply Lógica Segura y Centralizada

const SCRIPT_URL_SEGURO = "https://script.google.com/macros/s/AKfycbzxQoAhYD1jmBBdpWoqEIxcOqb8xGjMy_55mQ4_BOU1rNvP2Dyuuozxvy3G2imm-JC_qg/exec";

// 1. BASE DE DATOS NACIONAL Y FILTRADO DINÁMICO ───
// 👇 Diccionario de datos real con las 16 regiones y todas las comunas de Chile
const comunasPorRegion = {
  "AYP": ["Arica", "Camarones", "General Lagos", "Putre"],
  "TAP": ["Alto Hospicio", "Iquique", "Camiña", "Colchane", "Huara", "Pica", "Pozo Almonte"],
  "ANF": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "María Elena", "Tocopilla"],
  "ATC": ["Chañaral", "Diego de Almagro", "Caldera", "Copiapó", "Tierra Amarilla", "Alto del Carmen", "Freirina", "Huasco", "Vallenar"],
  "COQ": ["Canela", "Illapel", "Los Vilos", "Salamanca", "Andacollo", "Coquimbo", "La Higuera", "La Serena", "Paihuano", "Vicuña", "Combarbalá", "Monte Patria", "Ovalle", "Punitaqui", "Río Hurtado"],
  "VAL": ["Isla de Pascua", "Calle Larga", "Los Andes", "Rinconada", "San Esteban", "Limache", "Olmué", "Quilpué", "Villa Alemana", "Cabildo", "La Ligua", "Papudo", "Petorca", "Zapallar", "Hijuelas", "La Calera", "Nogales", "Quillota", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "Catemu", "Llaillay", "Panquehue", "Putaendo", "San Felipe", "Santa María", "Casablanca", "Juan Fernández", "Puchuncaví", "Quintero", "Valparaíso", "Viña del Mar", "Concón"],
  "RM": ["Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina", "Conchalí", "El Bosque", "El Monte", "Estación Central", "Huechuraba", "Independencia", "Isla de Maipo", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Lampa", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Melipilla", "Ñuñoa", "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Pirque", "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo", "San Miguel", "San Pedro", "San Ramón", "Santiago", "Talagante", "Tiltil", "Vitacura"],
  "OHI": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "Pichilemu", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "San Fernando", "Santa Cruz"],
  "MAU": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
  "NUB": ["Chillán", "Bulnes", "Chillán Viejo", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Quirihue", "Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Ránquil", "Trehuaco", "San Carlos", "Coihueco", "San Fabián", "San Nicolás"],
  "BIO": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualpén", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
  "ARA": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
  "LR": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
  "LL": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
  "AYS": ["Coyhaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
  "MAG": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
};

function filtrarComunas() {
  const regionSelect = document.getElementById("region");
  const comunaSelect = document.getElementById("comuna");
  const regionSeleccionada = regionSelect.value;

  comunaSelect.innerHTML = '<option value="" disabled selected>📍 Selecciona tu comuna</option>';

  if (regionSeleccionada && comunasPorRegion[regionSeleccionada]) {
    comunaSelect.disabled = false;
    comunasPorRegion[regionSeleccionada].forEach(comuna => {
      const option = document.createElement("option");
      option.value = comuna;
      option.textContent = comuna;
      comunaSelect.appendChild(option);
    });
  } else {
    comunaSelect.disabled = true;
  }
}

// 2. Animación del contador
function animateCounter(el, target, duration = 1800) {
  // 1. Leemos lo que hay actualmente en pantalla. Si no es un número o es 0, partimos de 0.
  // Eliminamos puntos de miles para poder parsearlo correctamente (.replace(/\./g, ''))
  const currentText = el.textContent.replace(/\./g, '');
  const startValue = parseInt(currentText, 10) || 0;
  
  // Si el nuevo total es igual o menor al que ya mostramos, no animamos nada
  if (target <= startValue) {
    el.textContent = target.toLocaleString('es-CL');
    return;
  }

  // Calculamos la diferencia exacta que aumentó
  const change = target - startValue;
  let startTime = 0;

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    
    // Aplicamos el mismo efecto de aceleración/desaceleración (Cubic Ease Out)
    const eased = 1 - Math.pow(1 - progress, 3);
    
    // El nuevo valor es: El valor inicial + (el progreso * lo que aumentó)
    const currentValue = Math.floor(startValue + (eased * change));
    
    el.textContent = currentValue.toLocaleString('es-CL');
    
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      // Al finalizar, aseguramos el número exacto por si los decimales varían
      el.textContent = target.toLocaleString('es-CL');
    }
  };
  
  requestAnimationFrame(step);
}

// 3. Carga dinámica del contador vía JSONP (Evita bloqueos CORS de forma limpia)
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
        // Polling discreto cada 5 segundos
        setInterval(loadCounter, 5000);
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

// 4. ENVÍO DEL FORMULARIO DE REGISTRO DE LEADS ───
async function handleSignup() {
  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const regionInput = document.getElementById('region'); 
  const comunaInput = document.getElementById('comuna');

  const nombre = nombreInput.value.trim();
  const email = emailInput.value.trim();
  const regionText = regionInput.options[regionInput.selectedIndex]?.text || ''; 
  const comuna = comunaInput.value;

  if (!nombre || !email || !regionInput.value || !comuna) {
    [!nombre && 'nombre', !email && 'email', !regionInput.value && 'region', !comuna && 'comuna'].forEach(id => {
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        el.style.borderColor = '#ff4757';
        el.style.animation = 'shake 0.4s ease';
        setTimeout(() => { el.style.borderColor = ''; el.style.animation = ''; }, 1200);
      }
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

  try {
    // Convertimos los datos a URLSearchParams para saltarnos de forma limpia el bloqueo de CORS
    const params = new URLSearchParams();
    params.append('tipo', 'lead');
    params.append('nombre', nombre);
    params.append('email', email);
    params.append('region', regionText);
    params.append('comuna', comuna);

    await fetch(SCRIPT_URL_SEGURO, {
      method: 'POST',
      mode: 'no-cors', // 👈 'no-cors' garantiza que los datos viajen sin restricciones del navegador
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    // Como 'no-cors' devuelve una respuesta opaca (status 0), asumimos éxito si no cae al catch
    document.getElementById('form-content').style.display = 'none';
    document.getElementById('success-state').style.display = 'block';
    if (typeof loadCounter === 'function') loadCounter();

  } catch (error) {
    console.error('Error en registro:', error);
    alert('Error en la conexión. Verifica tu acceso a internet.');
    boton.innerHTML = textoOriginalBoton;
    boton.disabled = false;
  }
}
