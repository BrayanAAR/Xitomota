// REgistro usuarioo
const miFormulario = document.getElementById('miFormulario');

const usuarioEsperado = "Cristian Ormazabal";
const emailEsperado = "cristian@mail.com";
const contraseñaEsperada = "12345";

miFormulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const contraseña = document.getElementById('contraseña').value.trim();
    const confirmarContraseña = document.getElementById('confirmarContraseña').value.trim(); // ojo aquí

    if (nombre === usuarioEsperado && 
        email === emailEsperado && 
        contraseña === contraseñaEsperada && 
        contraseña === confirmarContraseña) {
        
        alert("Registro exitoso, datos correctos.");
        console.log("Usuario validado correctamente.");

        // Guardar en localStorage SOLO si es correcto
        localStorage.setItem("usuario", nombre);
        localStorage.setItem("email", email);

    } else {
        alert("Datos incorrectos. Intenta nuevamente.");
        console.log("Error: los datos no coinciden.");
    }
});

document.getElementById("irIngresarCuenta").onclick = function() {
    window.location.href = "../Tienda/IniciarSesion.html"
};