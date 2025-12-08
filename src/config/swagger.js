const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Controle de Automóveis',
      version: '1.0.0',
      description: 'API para gerenciamento de frota e utilização de veículos. Desenvolvido para o teste técnico Seidor/4tax.',
      contact: {
        name: 'Suporte API',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor Local',
      },
    ],
    components: {
      schemas: {
        // --- Schema de Automóvel ---
        Car: {
          type: 'object',
          required: ['placa', 'cor', 'marca'],
          properties: {
            id: { 
              type: 'string', 
              format: 'uuid', 
              description: 'ID único do automóvel' 
            },
            placa: { 
              type: 'string', 
              description: 'Placa do veículo' 
            },
            cor: { 
              type: 'string', 
              description: 'Cor predominante' 
            },
            marca: { 
              type: 'string', 
              description: 'Fabricante do veículo' 
            },
          },
          example: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            placa: 'ABC-1234',
            cor: 'Prata',
            marca: 'Toyota',
          },
        },

        // --- Schema de Motorista ---
        Driver: {
          type: 'object',
          required: ['nome'],
          properties: {
            id: { 
              type: 'string', 
              format: 'uuid', 
              description: 'ID único do motorista' 
            },
            nome: { 
              type: 'string', 
              description: 'Nome completo do motorista' 
            },
          },
          example: {
            id: '987fcdeb-51a2-43d1-a987-526614174000',
            nome: 'João da Silva',
          },
        },

        // --- Schema de Utilização (Input para criação) ---
        UsageInput: {
          type: 'object',
          required: ['motoristaId', 'automovelId', 'motivo'],
          properties: {
            motoristaId: { 
              type: 'string', 
              format: 'uuid',
              description: 'ID do motorista que utilizará o veículo' 
            },
            automovelId: { 
              type: 'string', 
              format: 'uuid',
              description: 'ID do automóvel a ser utilizado' 
            },
            motivo: { 
              type: 'string', 
              description: 'Justificativa do uso' 
            },
          },
          example: {
            motoristaId: '987fcdeb-51a2-43d1-a987-526614174000',
            automovelId: '123e4567-e89b-12d3-a456-426614174000',
            motivo: 'Visita ao cliente XYZ',
          },
        },

        // --- Schema de Utilização (Objeto Completo) ---
        Usage: {
          type: 'object',
          properties: {
            id: { 
              type: 'string', 
              format: 'uuid' 
            },
            dataInicio: { 
              type: 'string', 
              format: 'date-time',
              description: 'Data e hora do início do uso'
            },
            dataFim: { 
              type: 'string', 
              format: 'date-time', 
              nullable: true,
              description: 'Data e hora da devolução (null se em andamento)'
            },
            motoristaId: { type: 'string', format: 'uuid' },
            automovelId: { type: 'string', format: 'uuid' },
            motivo: { type: 'string' },
          },
          example: {
            id: '550e8400-e29b-41d4-a716-446655440000',
            dataInicio: '2023-10-25T08:00:00.000Z',
            dataFim: null,
            motoristaId: '987fcdeb-51a2-43d1-a987-526614174000',
            automovelId: '123e4567-e89b-12d3-a456-426614174000',
            motivo: 'Visita ao cliente XYZ',
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;