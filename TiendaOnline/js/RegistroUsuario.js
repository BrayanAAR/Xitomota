document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("miFormulario");

  // Regiones y comunas
  const regiones = {
    "Región Metropolitana": ["Santiago", "Puente Alto", "Maipú", "La Florida"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
    "Biobío": ["Concepción", "Talcahuano", "Chillán", "Los Ángeles"]
  };

  const selectRegion = document.getElementById("region");
  const selectComuna = document.getElementById("comuna");

  // Poblar regiones
  for (let region in regiones) {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    selectRegion.appendChild(option);
  }

  // Cambiar comunas al seleccionar región
  selectRegion.addEventListener("change", () => {
    selectComuna.innerHTML = '<option value="">-- Selecciona Comuna --</option>';
    const comunaList = regiones[selectRegion.value];
    if (comunaList) {
      comunaList.forEach(c => {
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        selectComuna.appendChild(option);
      });
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;
    let errores = [];

    const run = document.getElementById("run");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const contraseña = document.getElementById("contraseña");
    const confirmar = document.getElementById("confirmarContraseña");
    const direccion = document.getElementById("direccion");

    // Limpiar bordes previos
    [run, nombre, email, contraseña, confirmar, direccion, selectRegion, selectComuna].forEach(campo => {
      campo.style.borderColor = "";
    });

    // Validación RUN
    if (!/^[0-9]{7,8}[0-9Kk]{1}$/.test(run.value) || !validarRUN(run.value)) {
      run.style.borderColor = "red";
      errores.push("RUN inválido. Formato correcto: 12345678-9");
      valido = false;
    }

    // Nombre
    if (nombre.value.trim() === "" || nombre.value.length > 50) {
      nombre.style.borderColor = "red";
      errores.push("El nombre es obligatorio y no debe superar los 50 caracteres");
      valido = false;
    }

    // Correo
    const patronEmail = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!patronEmail.test(email.value) || email.value.length > 100) {
      email.style.borderColor = "red";
      errores.push("Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com (máximo 100 caracteres)");
      valido = false;
    }

    // Contraseña
    if (contraseña.value.length < 4 || contraseña.value.length > 10) {
      contraseña.style.borderColor = "red";
      errores.push("La contraseña debe tener entre 4 y 10 caracteres");
      valido = false;
    }

    // Confirmar contraseña
    if (confirmar.value !== contraseña.value || confirmar.value === "") {
      confirmar.style.borderColor = "red";
      errores.push("Las contraseñas no coinciden");
      valido = false;
    }

    // Dirección
    if (direccion.value.trim() === "" || direccion.value.length > 300) {
      direccion.style.borderColor = "red";
      errores.push("La dirección es obligatoria y no debe superar los 300 caracteres");
      valido = false;
    }

    // Validación de región y comuna
    if (selectRegion.value === "") {
      selectRegion.style.borderColor = "red";
      errores.push("Debes seleccionar una región");
      valido = false;
    }

    if (selectComuna.value === "") {
      selectComuna.style.borderColor = "red";
      errores.push("Debes seleccionar una comuna");
      valido = false;
    }

    // Mostrar errores si los hay
    if (!valido) {
      alert("❌ Errores encontrados:\n\n• " + errores.join("\n• "));
      return;
    }

    // Si llegamos aquí, las validaciones básicas pasaron
    // Obtener la lista de usuarios existentes
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    // Verificar si el email ya existe
    const emailExiste = usuarios.some(u => u.email === email.value);
    if (emailExiste) {
      alert("❌ Ya existe un usuario registrado con este email");
      email.style.borderColor = "red";
      return;
    }

    // Verificar si el RUN ya existe
    const runExiste = usuarios.some(u => u.run === run.value);
    if (runExiste) {
      alert("❌ Ya existe un usuario registrado con este RUN");
      run.style.borderColor = "red";
      return;
    }

    // Crear el nuevo usuario
    const nuevoUsuario = {
      run: run.value,
      nombre: nombre.value,
      email: email.value,
      contraseña: contraseña.value,
      direccion: direccion.value,
      region: selectRegion.value,
      comuna: selectComuna.value,
      rol: "Cliente", // Por defecto los usuarios que se registran son clientes
      fechaRegistro: new Date().toLocaleString()
    };

    // Agregar el nuevo usuario al array
    usuarios.push(nuevoUsuario);
    
    // Guardar el array actualizado en localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("✅ Usuario registrado correctamente. Ahora puedes iniciar sesión.");
    form.reset();
    
    // Limpiar las opciones de región y comuna
    selectComuna.innerHTML = '<option value="">-- Selecciona Comuna --</option>';
    
    // Opcional: redirigir al login después del registro exitoso
    if (confirm("¿Deseas ir a la página de inicio de sesión ahora?")) {
      window.location.href = "../Tienda/IniciarSesion.html";
    }
  });

  // Validar RUN
  function validarRUN(run) {
    run = run.toUpperCase();
    let cuerpo = run.slice(0, -1);
    let dv = run.slice(-1);

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += multiplo * parseInt(cuerpo[i]);
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    let dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

    return dv === dvEsperado;
  }
});

// Botón Ingresar
const btnIngresar = document.getElementById("irIngresarCuenta");
btnIngresar.addEventListener("click", () => {
  // Cambia la ruta según tu archivo
  window.location.href = "../Tienda/IniciarSesion.html";
});
