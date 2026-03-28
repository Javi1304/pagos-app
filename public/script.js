document.getElementById("pagoForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // Capturamos los datos del formulario
  const destinatario = document.getElementById("destinatario").value;
  const monto = document.getElementById("monto").value;
  const descripcion = document.getElementById("descripcion").value;
  const tipoTarjeta = document.getElementById("tipoTarjeta").value;
  const numeroTarjeta = document.getElementById("numeroTarjeta").value;
  const fechaVencimiento = document.getElementById("fechaVencimiento").value;
  const cvv = document.getElementById("cvv").value;
  const nombreTitular = document.getElementById("nombreTitular").value;
  const documentoTitular = document.getElementById("documentoTitular").value;

  // Guardamos en localStorage para que confirmacion.html los pueda leer después
  localStorage.setItem("destinatario", destinatario);
  localStorage.setItem("monto", monto);
  localStorage.setItem("descripcion", descripcion);
  localStorage.setItem("tipoTarjeta", tipoTarjeta);
  localStorage.setItem("numeroTarjeta", numeroTarjeta);
  localStorage.setItem("fechaVencimiento", fechaVencimiento);
  localStorage.setItem("cvv", cvv);
  localStorage.setItem("nombreTitular", nombreTitular);
  localStorage.setItem("documentoTitular", documentoTitular);

  // LA SOLUCIÓN DEL PROFE: 
  // En lugar de llamar a tu servidor, mandamos al usuario directo al link que él te dio.
  window.location.href = "https://mpago.la/32FJKrx";
});