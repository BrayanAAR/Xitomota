document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("miFormulario");
  
  // Verificar si estamos editando un usuario
  const urlParams = new URLSearchParams(window.location.search);
  const editIndex = urlParams.get('edit');
  let usuarioEditando = null;
  
  if (editIndex !== null) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarioEditando = usuarios[parseInt(editIndex)];
    
    if (usuarioEditando) {
      document.querySelector('.registro_top p').textContent = 'Editar Usuario';
    }
  }

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
  
  // Cargar datos del usuario si estamos editando
  if (editIndex !== null && usuarioEditando) {
    setTimeout(() => {
      cargarDatosUsuario(usuarioEditando);
    }, 100);
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
      
      // Crear objeto usuario con los datos del formulario
      const datosUsuario = {
        run: run.value,
        nombre: nombre.value,
        email: email.value,
        contraseña: contraseña.value,
        direccion: direccion.value,
        region: selectRegion.value,
        comuna: selectComuna.value,
        rol: document.getElementById("tipoUsuario") ? document.getElementById("tipoUsuario").value : "Usuario",
        fechaRegistro: usuarioEditando ? usuarioEditando.fechaRegistro : new Date().toLocaleDateString()
      };

      if (editIndex !== null && usuarioEditando) {
        // Editar usuario existente
        usuarios[parseInt(editIndex)] = datosUsuario;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        
        alert("✅ Usuario actualizado correctamente");
        
        // Redirigir al listado después de editar
        window.location.href = "ListadoUsuarios.html";
      } else {
        // Crear nuevo usuario
        usuarios.push(datosUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        
        alert("✅ Usuario registrado correctamente");
        form.reset();
      }
      
      localStorage.setItem("email", email.value);          // email correcto
      localStorage.setItem("contraseña", contraseña.value); // contraseña correcta
    }
  });

  // Configurar botón Cancelar
  const btnCancelar = document.getElementById("irIngresarCuenta");
  if (btnCancelar) {
    btnCancelar.addEventListener("click", () => {
      window.location.href = "ListadoUsuarios.html";
    });
  }

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

  // Función para cargar datos del usuario en el formulario (para edición)
  function cargarDatosUsuario(usuario) {
    document.getElementById("run").value = usuario.run || '';
    document.getElementById("nombre").value = usuario.nombre || '';
    document.getElementById("email").value = usuario.email || '';
    document.getElementById("contraseña").value = usuario.contraseña || '';
    document.getElementById("confirmarContraseña").value = usuario.contraseña || '';
    document.getElementById("direccion").value = usuario.direccion || '';
    
    // Cargar tipo de usuario si existe
    if (document.getElementById("tipoUsuario")) {
      document.getElementById("tipoUsuario").value = usuario.rol || "Cliente";
    }
    
    // Función para cargar región y comuna
    function cargarRegionComuna() {
      if (selectRegion.options.length > 1 && usuario.region) {
        selectRegion.value = usuario.region;
        
        // Disparar evento change para cargar comunas
        const event = new Event('change');
        selectRegion.dispatchEvent(event);
        
        // Esperar a que se carguen las comunas y luego seleccionar
        setTimeout(() => {
          if (selectComuna.options.length > 1 && usuario.comuna) {
            selectComuna.value = usuario.comuna;
          }
        }, 150);
      }
    }
    
    // Intentar cargar región y comuna
    cargarRegionComuna();
    
    // Si no funcionó, intentar de nuevo después de un momento
    setTimeout(cargarRegionComuna, 200);
  }
});

function cerrarSesion() {
  if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("rolUsuario");
    alert("✅ Sesión cerrada exitosamente");
    window.location.href = "../Tienda/IniciarSesion.html";
  }
}