document.getElementById("pagoForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // 1. Capturar los valores del formulario
  const destinatario = document.getElementById("destinatario").value;
  const monto = document.getElementById("monto").value;
  const descripcion = document.getElementById("descripcion").value;
  const tipoTarjeta = document.getElementById("tipoTarjeta").value;
  const numeroTarjeta = document.getElementById("numeroTarjeta").value;
  const fechaVencimiento = document.getElementById("fechaVencimiento").value;
  const cvv = document.getElementById("cvv").value;
  const nombreTitular = document.getElementById("nombreTitular").value;
  const documentoTitular = document.getElementById("documentoTitular").value;

  // 2. Crear un objeto para el historial
  const nuevoPago = {
    destinatario: destinatario,
    monto: monto,
    descripcion: descripcion,
    fecha: new Date().toLocaleString(), // Guarda fecha y hora actual
    referencia: Math.floor(Math.random() * 1000000) // Genera un ID al azar
  };

  // 3. Guardar en el Historial General (Lista de todos los pagos)
  let historial = JSON.parse(localStorage.getItem("historialPagos")) || [];
  historial.push(nuevoPago);
  localStorage.setItem("historialPagos", JSON.stringify(historial));

  // 4. Guardar datos individuales (Para que confirmacion.html los lea)
  localStorage.setItem("destinatario", destinatario);
  localStorage.setItem("monto", monto);
  localStorage.setItem("descripcion", descripcion);
  localStorage.setItem("tipoTarjeta", tipoTarjeta);
  localStorage.setItem("numeroTarjeta", numeroTarjeta);
  localStorage.setItem("fechaVencimiento", fechaVencimiento);
  localStorage.setItem("cvv", cvv);
  localStorage.setItem("nombreTitular", nombreTitular);
  localStorage.setItem("documentoTitular", documentoTitular);

  // 5. Redirigir al link del profesor
  window.location.href = "https://mpago.la/32FJKrx";
});