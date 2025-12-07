const express = require('express');
const router = express.Router();
const usageController = require('../controllers/usageController');

/**
 * @swagger
 * tags:
 *   name: Utilização
 *   description: Controle de uso dos veículos
 */

/**
 * @swagger
 * /utilizacao:
 *   post:
 *     summary: Registra a saída de um automóvel (Início de uso)
 *     tags: [Utilização]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 * 
 *               - automovelId
 *               - motoristaId *               
 *               - motivo
 *             properties:
 *               
 *               automovelId:
 *                 type: string
 *               motoristaId:
 *                 type: string
 *               motivo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilização iniciada
 *       409:
 *         description: Automóvel já está em uso
 */
router.post('/', usageController.create);

/**
 * @swagger
 * /utilizacao:
 *   get:
 *     summary: Lista todo o histórico de utilizações
 *     tags: [Utilização]
 *     responses:
 *       200:
 *         description: Histórico retornado
 */
router.get('/', usageController.list);

/**
 * @swagger
 * /utilizacao/{id}/finalizar:
 *   put:
 *     summary: Finaliza o uso de um automóvel (Devolução)
 *     tags: [Utilização]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilização finalizada com sucesso
 */
router.put('/:id/finalizar', usageController.finish);

module.exports = router;