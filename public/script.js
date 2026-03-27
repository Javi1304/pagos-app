document.getElementById("pagoForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const destinatario = document.getElementById("destinatario").value;
  const monto = document.getElementById("monto").value;
  const descripcion = document.getElementById("descripcion").value;

  const tipoTarjeta = document.getElementById("tipoTarjeta").value;
  const numeroTarjeta = document.getElementById("numeroTarjeta").value;
  const fechaVencimiento = document.getElementById("fechaVencimiento").value;
  const cvv = document.getElementById("cvv").value;
  const nombreTitular = document.getElementById("nombreTitular").value;
  const documentoTitular = document.getElementById("documentoTitular").value;

  // Guardar datos en localStorage
  localStorage.setItem("destinatario", destinatario);
  localStorage.setItem("monto", monto);
  localStorage.setItem("descripcion", descripcion);
  localStorage.setItem("tipoTarjeta", tipoTarjeta);
  localStorage.setItem("numeroTarjeta", numeroTarjeta);
  localStorage.setItem("fechaVencimiento", fechaVencimiento);
  localStorage.setItem("cvv", cvv);
  localStorage.setItem("nombreTitular", nombreTitular);
  localStorage.setItem("documentoTitular", documentoTitular);

  try {
    const response = await fetch("/create_preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destinatario,
        monto,
        descripcion,
        tipoTarjeta,
        numeroTarjeta,
        fechaVencimiento,
        cvv,
        nombreTitular,
        documentoTitular
      })
    });

    const data = await response.json();
    console.log("Respuesta del backend:", data);

    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      alert("Error al iniciar el pago: no se recibió init_point");
    }
  } catch (error) {
    console.error("Error en el frontend:", error);
    alert("Error al iniciar el pago");
  }
});
