/* Elementos principales */
const modal = document.querySelector("#modal-cotizacion");
const formulario = document.querySelector("#formulario-cotizacion");
const campoFecha = document.querySelector("#fecha");

const numeroWhatsApp = "527772755235";

/* Abrir el formulario desde los botones de la página */
document.querySelectorAll("[data-abrir-cotizacion]").forEach((boton) => {
  boton.addEventListener("click", abrirFormulario);
});

/* Cerrar el formulario con el botón × */
document.querySelector("#cerrar-cotizacion").addEventListener(
  "click",
  cerrarFormulario
);

/* Establecer fecha mínima (hoy) */
const hoy = new Date();
const anio = hoy.getFullYear();
const mes = String(hoy.getMonth() + 1).padStart(2, "0");
const dia = String(hoy.getDate()).padStart(2, "0");
campoFecha.min = `${anio}-${mes}-${dia}`;

/* Abrir y cerrar formulario */
function abrirFormulario() {
  modal.classList.add("activo");
  document.querySelector("#nombre").focus();
}

function cerrarFormulario() {
  modal.classList.remove("activo");
  formulario.reset();
}

/* Cerrar al hacer clic fuera */
modal.addEventListener("click", (evento) => {
  if (evento.target === modal) {
    cerrarFormulario();
  }
});

/* Tecla ESC para cerrar */
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && modal.classList.contains("activo")) {
    cerrarFormulario();
  }
});

/* Formatear fecha */
function formatearFecha(fechaSeleccionada) {
  const fecha = new Date(`${fechaSeleccionada}T00:00:00`);
  const opciones = {
    day: "numeric",
    month: "long",
    year: "numeric"
  };
  return fecha.toLocaleDateString("es-MX", opciones);
}

/* Obtener nombre del horario */
function obtenerHorario(valor) {
  const horarios = {
    morning: "Por la mañana (7:00 - 12:00)",
    midday: "Al mediodía (12:00 - 15:00)",
    afternoon: "Por la tarde (15:00 - 18:00)",
    flexible: "Horario flexible"
  };
  return horarios[valor] || valor;
}

/* Calcular volumen de la piscina */
function calcularVolumen(largo, ancho, profundidad) {
  return (largo * ancho * profundidad).toFixed(2);
}

/* Generar y enviar mensaje */
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = document.querySelector("#nombre").value.trim();
  const largo = document.querySelector("#largo").value;
  const ancho = document.querySelector("#ancho").value;
  const profundidad = document.querySelector("#profundidad").value;
  const ubicacion = document.querySelector("#ubicacion").value.trim();
  const fecha = document.querySelector("#fecha").value;
  const horarioSeleccionado = document.querySelector("#horario").value;
  const comentarios = document.querySelector("#comentarios").value.trim();

  const fechaFormateada = formatearFecha(fecha);
  const horario = obtenerHorario(horarioSeleccionado);
  const volumen = calcularVolumen(largo, ancho, profundidad);

  const mensaje = `Hola, José Luis.

Vi la página de Lool Beh Services y me gustaría solicitar una cotización para limpieza de piscinas.

DATOS DEL CLIENTE

Nombre: ${nombre}

MEDIDAS APROXIMADAS DE LA PISCINA

Largo: ${largo} metros
Ancho: ${ancho} metros
Profundidad: ${profundidad} metros
Volumen aproximado: ${volumen} m³

UBICACIÓN

Colonia o ubicación: ${ubicacion}

FECHA Y HORARIO PREFERIDOS

Fecha: ${fechaFormateada}
Horario: ${horario}

COMENTARIOS

${comentarios || "Sin comentarios adicionales."}

Quedo pendiente de tu cotización y disponibilidad. Gracias.`;

  const mensajeCodificado = encodeURIComponent(mensaje);
  const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

  window.open(enlaceWhatsApp, "_blank", "noopener,noreferrer");
  cerrarFormulario();
});
