const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

/**
 * @swagger
 * tags:
 *   - name: Automóveis
 *     description: Gerenciamento de veículos da frota
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
 *             required: [placa, cor, marca]
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
 *       409:
 *         description: Carro com esta placa já existe
 */
router.post('/', carController.create);

/**
 * @swagger
 * /automoveis/{id}:
 *   get:
 *     summary: Recupera um automóvel pelo ID
 *     tags: [Automóveis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do automóvel
 *     responses:
 *       200:
 *         description: Dados do automóvel
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Automóvel não encontrado
 */
router.get('/:id', carController.getById);

/**
 * @swagger
 * /automoveis/{id}:
 *   put:
 *     summary: Atualiza os dados de um automóvel
 *     tags: [Automóveis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do automóvel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *               cor:
 *                 type: string
 *               marca:
 *                 type: string
 *     responses:
 *       200:
 *         description: Automóvel atualizado com sucesso
 *       404:
 *         description: Automóvel não encontrado
 */
router.put('/:id', carController.update);

/**
 * @swagger
 * /automoveis/{id}:
 *   delete:
 *     summary: Remove um automóvel
 *     tags: [Automóveis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do automóvel
 *     responses:
 *       204:
 *         description: Automóvel removido com sucesso
 *       404:
 *         description: Automóvel não encontrado
 */
router.delete('/:id', carController.delete);

module.exports = router;
