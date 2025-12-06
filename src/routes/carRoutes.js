const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

/**
 * @swagger
 * tags:
 *   name: Automóveis
 *   description: Gerenciamento de veículos da frota
 */

/**
 * @swagger
 * /automoveis:
 *   get:
 *     summary: Lista todos os automóveis
 *     tags: [Automóveis]
 *     parameters:
 *       - in: query
 *         name: cor
 *         schema:
 *           type: string
 *         description: Filtrar por cor do veículo
 *       - in: query
 *         name: marca
 *         schema:
 *           type: string
 *         description: Filtrar por marca do veículo
 *     responses:
 *       200:
 *         description: Lista de automóveis retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */
router.get('/', carController.list);

/**
 * @swagger
 * /automoveis:
 *   post:
 *     summary: Cadastra um novo automóvel
 *     tags: [Automóveis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - placa
 *               - cor
 *               - marca
 *             properties:
 *               placa:
 *                 type: string
 *               cor:
 *                 type: string
 *               marca:
 *                 type: string
 *     responses:
 *       201:
 *         description: Automóvel criado
 */
router.post('/', carController.create);

router.get('/:id', carController.getById);
router.put('/:id', carController.update);
router.delete('/:id', carController.delete);

module.exports = router;