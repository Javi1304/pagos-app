document.getElementById('paymentForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const destinatario = document.getElementById('destinatario').value.trim();
  const monto = document.getElementById('monto').value.trim();
  const metodo = document.getElementById('metodo').value.trim();
  const cuenta = document.getElementById('cuenta').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();

  // Validaciones
  if (!destinatario || !monto || !metodo || !cuenta) {
    alert("Todos los campos son obligatorios");
    return;
  }
  if (isNaN(monto) || parseFloat(monto) <= 0) {
    alert("El monto debe ser un número válido");
    return;
  }

  try {
    const response = await fetch('/create_preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destinatario, monto, descripcion })
    });

    const data = await response.json();
    if (data.init_point) {
      window.location.href = data.init_point; // Redirige a Mercado Pago
    } else {
      alert("Error al iniciar el pago");
    }
  } catch (error) {
    console.error(error);
    alert("Error en la conexión con el servidor");
  }
});