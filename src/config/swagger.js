const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Controle de Automóveis',
      version: '1.0.0',
      description: 'API para gerenciamento de frota e utilização de veículos [cite: 5]',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      schemas: {
        Car: {
          type: 'object',
          required: ['placa', 'cor', 'marca'],
          properties: {
            id: { type: 'string', description: 'ID gerado automaticamente (UUID)' },
            placa: { type: 'string', description: 'Placa do veículo' },
            cor: { type: 'string', description: 'Cor do veículo' },
            marca: { type: 'string', description: 'Marca/Fabricante' },
          },
          example: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            placa: 'ABC-1234',
            cor: 'Preto',
            marca: 'Toyota',
          },
        },
      },
    },
  },
  // Aponta para onde estarão as rotas com a documentação
  apis: ['./src/routes/*.js'], 
};

const specs = swaggerJsdoc(options);
module.exports = specs;