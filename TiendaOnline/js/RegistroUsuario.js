// Seleccionar el formulario por su ID
const miFormulario = document.getElementById('miFormulario');

// Añadir un "escuchador de eventos" para el evento 'submit'
miFormulario.addEventListener('submit', function(evento) {
    // Prevenir el comportamiento por defecto del envío del formulario
    evento.preventDefault();

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    // Ahora puedes hacer algo con los datos, por ejemplo, mostrarlos en la consola
    console.log('Nombre:', nombre);
    console.log('Email:', email);

    // O puedes enviar los datos a un servidor, validar, etc.
});