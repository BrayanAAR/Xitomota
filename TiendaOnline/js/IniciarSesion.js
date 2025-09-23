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

    // 1️⃣ Validar administrador predeterminado
    const adminEmail = "admin@duoc.cl";
    const adminPassword = "admin123";

    if (email === adminEmail && contraseña === adminPassword) {
      alert("✅ Bienvenido Administrador");
      localStorage.setItem("usuarioLogueado", email);
      localStorage.setItem("rolUsuario", "Administrador");
      window.location.href = "../Administrador/HomeAdmin.html";
      return;
    }

    // 2️⃣ Validar usuarios registrados en localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.contraseña === contraseña);

    if (usuarioEncontrado) {
      localStorage.setItem("usuarioLogueado", email);
      localStorage.setItem("rolUsuario", usuarioEncontrado.rol);
      
      // Redirigir según el rol
      switch(usuarioEncontrado.rol) {
        case "Administrador":
          alert("✅ Bienvenido Administrador");
          window.location.href = "../Administrador/HomeAdmin.html";
          break;
        case "Vendedor":
          alert("✅ Bienvenido Vendedor");
          window.location.href = "../Administrador/HomeVendedor.html";
          break;
        case "Cliente":
          alert("✅ Bienvenido Cliente");
          window.location.href = "../Tienda/Home.html";
          break;
        default:
          alert("✅ Bienvenido");
          window.location.href = "../Tienda/Home.html";
      }
    } else {
      alert("❌ Correo o contraseña incorrectos.");
    }
  });
}
