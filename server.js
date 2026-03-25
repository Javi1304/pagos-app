const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mercadopago = require('mercadopago');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Configuración Mercado Pago
mercadopago.configure({
  access_token: 'TEST-3443141972996989-032419-8f5c2b4a469e5a06600fd04a6839d4f6-2653101234'
});

// Crear preferencia
app.post('/create_preference', async (req, res) => {
  try {
    const { destinatario, monto, descripcion } = req.body;

    if (!destinatario || !monto) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    const preference = {
      items: [
        {
          title: descripcion || "Pago en línea",
          unit_price: parseFloat(monto),
          quantity: 1,
        }
      ],
      back_urls: {
        success: "http://localhost:3000/confirmacion.html",
        failure: "http://localhost:3000/index.html",
        pending: "http://localhost:3000/index.html"
      },
      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear preferencia' });
  }
});

// Webhook
app.post('/webhook', (req, res) => {
  try {
    console.log("Webhook recibido:", req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
