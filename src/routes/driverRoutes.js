const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

/**
 * @swagger
 * tags:
 *   - name: Motoristas
 *     description: Gerenciamento de motoristas
 */

/**
 * @swagger
 * /motoristas:
 *   get:
 *     summary: Lista todos os motoristas
 *     tags: [Motoristas]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Filtrar por nome
 *     responses:
 *       200:
 *         description: Lista de motoristas
 */
router.get('/', driverController.list);

/**
 * @swagger
 * /motoristas:
 *   post:
 *     summary: Cadastra um novo motorista
 *     tags: [Motoristas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome]
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Motorista criado
 */
router.post('/', driverController.create);

/**
 * @swagger
 * /motoristas/{id}:
 *   get:
 *     summary: Recupera um motorista pelo ID
 *     tags: [Motoristas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do motorista
 *     responses:
 *       200:
 *         description: Dados do motorista
 *       404:
 *         description: Motorista não encontrado
 */
router.get('/:id', driverController.getById);

/**
 * @swagger
 * /motoristas/{id}:
 *   put:
 *     summary: Atualiza os dados de um motorista
 *     tags: [Motoristas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       200:
 *         description: Motorista atualizado
 *       404:
 *         description: Motorista não encontrado
 */
router.put('/:id', driverController.update);

/**
 * @swagger
 * /motoristas/{id}:
 *   delete:
 *     summary: Remove um motorista
 *     tags: [Motoristas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Motorista removido
 *       404:
 *         description: Motorista não encontrado
 */
router.delete('/:id', driverController.delete);

module.exports = router;
