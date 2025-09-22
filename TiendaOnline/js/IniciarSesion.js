//iniciar sesion
const IniciarSesion = document.getElementById('IniciarSesion');

if (IniciarSesion) {
    IniciarSesion.addEventListener('submit', function(evento){
        evento.preventDefault();

        const email = document.getElementById('email').value.trim();
        const contraseña = document.getElementById('contraseña').value.trim();

        // Validación contra los datos esperados
        if (email === "cristian@mail.com" && contraseña === "12345") {
            
            alert("Inicio de sesión exitoso");
            console.log("Usuario validado correctamente.");

            localStorage.setItem("email", email);
            window.location.href = "../Tienda/Home.html";

        } else {
            alert("Datos incorrectos. Intenta nuevamente.");
            console.log("Error: los datos no coinciden.");
        }
    });
}