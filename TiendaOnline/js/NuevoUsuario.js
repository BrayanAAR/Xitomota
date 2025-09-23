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

    const run = document.getElementById("run");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const contraseña = document.getElementById("contraseña");
    const confirmar = document.getElementById("confirmarContraseña");
    const direccion = document.getElementById("direccion");

    // Validación RUN
    if (!/^[0-9]{7,8}[0-9Kk]{1}$/.test(run.value) || !validarRUN(run.value)) {
      run.style.borderColor = "red";
      valido = false;
    } else run.style.borderColor = "";

    // Nombre
    if (nombre.value.trim() === "" || nombre.value.length > 50) {
      nombre.style.borderColor = "red";
      valido = false;
    } else nombre.style.borderColor = "";

    // Correo
    const patronEmail = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!patronEmail.test(email.value) || email.value.length > 100) {
      email.style.borderColor = "red";
      valido = false;
    } else email.style.borderColor = "";

    // Contraseña
    if (contraseña.value.length < 4 || contraseña.value.length > 10) {
      contraseña.style.borderColor = "red";
      valido = false;
    } else contraseña.style.borderColor = "";

    // Confirmar contraseña
    if (confirmar.value !== contraseña.value || confirmar.value === "") {
      confirmar.style.borderColor = "red";
      valido = false;
    } else confirmar.style.borderColor = "";

    // Dirección
    if (direccion.value.trim() === "" || direccion.value.length > 300) {
      direccion.style.borderColor = "red";
      valido = false;
    } else direccion.style.borderColor = "";

    if (valido) {
      // Recuperar usuarios existentes o crear lista vacía
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      
      // Crear objeto usuario nuevo
      const nuevoUsuario = {
        run: run.value,
        nombre: nombre.value,
        email: email.value,
        contraseña: contraseña.value,
        direccion: direccion.value,
        region: selectRegion.value,
        comuna: selectComuna.value,
        rol: document.getElementById("tipoUsuario") ? document.getElementById("tipoUsuario").value : "Usuario",
        fechaRegistro: new Date().toLocaleDateString()
      };

      // Agregar nuevo usuario a la lista
      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      
      localStorage.setItem("email", email.value);          // email correcto
      localStorage.setItem("contraseña", contraseña.value); // contraseña correcta

      alert("✅ Usuario registrado correctamente");
      form.reset();
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