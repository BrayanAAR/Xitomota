document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContacto");
  const mensajeExito = document.getElementById("mensajeExito");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;

    // Validar Nombre
    const nombre = document.getElementById("nombre");
    if (nombre.value.trim() === "" || nombre.value.length > 100) {
      nombre.classList.add("is-invalid");
      valido = false;
    } else {
      nombre.classList.remove("is-invalid");
    }

    // Validar Correo
    const correo = document.getElementById("correo");
    const patronCorreo = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    if (!patronCorreo.test(correo.value) || correo.value.length > 100) {
      correo.classList.add("is-invalid");
      valido = false;
    } else {
      correo.classList.remove("is-invalid");
    }

    // Validar Comentario
    const comentario = document.getElementById("comentario");
    if (comentario.value.trim() === "" || comentario.value.length > 500) {
      comentario.classList.add("is-invalid");
      valido = false;
    } else {
      comentario.classList.remove("is-invalid");
    }

    // Si todo está bien
    if (valido) {
      mensajeExito.classList.remove("d-none");
      form.reset();
    }
  });
});
