const IniciarSesion = document.getElementById('IniciarSesion');

if (IniciarSesion) {
  IniciarSesion.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const email = document.getElementById('email').value.trim();
    const contraseña = document.getElementById('contraseña').value.trim();

    // Validaciones de formato
    const emailRegex = /^[^\s@]+@(duoc.cl|profesor.duoc.cl|gmail.com)$/;

    if (email === "") {
      alert("❌ El correo es obligatorio.");
      return;
    }
    if (email.length > 100) {
      alert("❌ El correo no debe superar los 100 caracteres.");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("❌ Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
      return;
    }
    if (contraseña === "") {
      alert("❌ La contraseña es obligatoria.");
      return;
    }
    if (contraseña.length < 4 || contraseña.length > 10) {
      alert("❌ La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }

    // 1️⃣ Validar administrador
    const adminEmail = "admin@duoc.cl";
    const adminPassword = "admin123";

    if (email === adminEmail && contraseña === adminPassword) {
      alert("✅ Bienvenido Administrador");
      localStorage.setItem("usuarioLogueado", email);
      window.location.href = "../Administrador/HomeAdmin.html";
      return;
    }

    // 2️⃣ Validar usuario registrado en localStorage
    const emailGuardado = localStorage.getItem("email"); // debe haberse guardado al registrarse
    const contraseñaGuardada = localStorage.getItem("contraseña");

    if (email === emailGuardado && contraseña === contraseñaGuardada) {
      alert("✅ Inicio de sesión exitoso");
      localStorage.setItem("usuarioLogueado", email);
      window.location.href = "../Tienda/Home.html";
    } else {
      alert("❌ Correo o contraseña incorrectos.");
    }
  });
}
