const express = require('express');
const router = express.Router();
// Importar Controller (que chamará o Service) - Fase seguinte
// const carController = require('../controllers/carController');

/**
 * @swagger
 * tags:
 * name: Automóveis
 * description: Gerenciamento de veículos da frota
 */

/**
 * @swagger
 * /automoveis:
 * get:
 * summary: Lista todos os automóveis
 * tags: [Automóveis]
 * parameters:
 * - in: query
 * name: cor
 * schema:
 * type: string
 * description: Filtrar por cor do veículo
 * - in: query
 * name: marca
 * schema:
 * type: string
 * description: Filtrar por marca do veículo
 * responses:
 * 200:
 * description: Lista de automóveis retornada com sucesso
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Car'
 */
router.get('/', (req, res) => {
    // carController.list(req, res)
    res.json({ message: "Rota implementada na próxima fase" }); 
});

/**
 * @swagger
 * /automoveis:
 * post:
 * summary: Cadastra um novo automóvel
 * tags: [Automóveis]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - placa
 * - cor
 * - marca
 * properties:
 * placa:
 * type: string
 * cor:
 * type: string
 * marca:
 * type: string
 * responses:
 * 201:
 * description: Automóvel criado
 */
router.post('/', (req, res) => {
    // carController.create(req, res)
    res.json({ message: "Rota implementada na próxima fase" });
});

module.exports = router;