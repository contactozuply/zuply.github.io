const formulario = document.querySelector('form');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se vuelva loca y se recargue

    // Recolectamos los datos de tus inputs (asegúrate de que los IDs coincidan con tu HTML)
    const datosUsuario = {
        nombre: document.querySelector('#nombre').value,
        email: document.querySelector('#email').value,
        comuna: document.querySelector('#comuna').value
    };

    try {
        // Hacemos el envío silencioso a Google Sheets
        const respuesta = await fetch('https://script.google.com/macros/s/AKfycbyphShIWERe3UrEB_wwXX3x7Yu_5uhhiegF_3bxzu-4T-3GDXU2sc6lLA1ey7AkROEC/exec', {
            method: 'POST',
            mode: 'cors', // Evita problemas de bloqueo del navegador
            headers: {
                'Content-Type': 'text/plain', // Google prefiere text/plain para Apps Scripts
            },
            body: JSON.stringify(datosUsuario)
        });

        const resultado = await respuesta.json();

        if (resultado.status === 'success') {
            alert('¡Registrado con éxito! Te avisaremos apenas estemos listos.');
            formulario.reset(); // Limpia el formulario en la pantalla
        } else {
            alert('Hubo un problema. Inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión.');
    }
});
