const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

/**
 * @swagger
 * tags:
 *   name: Motoristas
 *   description: Gerenciamento de motoristas
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
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Motorista criado
 */
router.post('/', driverController.create);

router.get('/:id', driverController.getById);
router.put('/:id', driverController.update);
router.delete('/:id', driverController.delete);

module.exports = router;