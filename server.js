const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MercadoPagoConfig, Preference } = require('mercadopago');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Esto sirve tus archivos de la carpeta public

// CONFIGURACIÓN CON TU TOKEN DE PRUEBA
const client = new MercadoPagoConfig({
  accessToken: 'TEST-3443141972996989-032419-8f5c2b4a469e5a06600fd04a6839d4f6-2653101234'
});

app.post('/create_preference', async (req, res) => {
  try {
    const { monto, descripcion } = req.body;

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: descripcion || "Pago de prueba",
            unit_price: Number(monto),
            quantity: 1,
            currency_id: 'MXN' 
          }
        ],
        back_urls: {
          success: "https://beauteously-superambitious-brigitte.ngrok-free.dev/confirmacion.html",
          failure: "https://beauteously-superambitious-brigitte.ngrok-free.dev/error.html",
          pending: "https://beauteously-superambitious-brigitte.ngrok-free.dev/pendiente.html"
        },
        auto_return: "approved",
      }
    });

    // IMPORTANTE: En SDK v2, los datos están en la raíz de 'response'
    if (response && response.init_point) {
      console.log("Enlace de pago creado:", response.init_point);
      res.json({ init_point: response.init_point });
    } else {
      res.status(500).json({ error: 'No se recibió init_point' });
    }
  } catch (error) {
    console.error("Error en Mercado Pago:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor listo en http://localhost:3000');
});