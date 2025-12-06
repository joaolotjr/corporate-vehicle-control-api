const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const errorHandler = require('./middlewares/errorHandler');

// Importar Rotas
const carRoutes = require('./routes/carRoutes');

const app = express();

// Middlewares Globais
app.use(express.json());
app.use(cors());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rotas da API
app.use('/api/automoveis', carRoutes);

// Rota padrão para 404
app.all(/(.*)/, (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Rota ${req.originalUrl} não encontrada neste servidor.`
  });
});

// Middleware Global de Erros (Sempre o último)
app.use(errorHandler);

module.exports = app;