const Joi = require('joi');
const usageService = require('../services/usageService');
const AppError = require('../utils/AppError');

const usageSchema = Joi.object({
  motoristaId: Joi.string().required(),
  automovelId: Joi.string().required(),
  motivo: Joi.string().required().messages({
    'any.required': 'O motivo da utilização é obrigatório'
  })
});

class UsageController {
  create = async (req, res, next) => {
    try {
      const { error, value } = usageSchema.validate(req.body);
      if (error) throw new AppError(error.details[0].message, 400);

      const newUsage = usageService.createUsage(value);
      return res.status(201).json(newUsage);
    } catch (error) {
      next(error);
    }
  };

  list = async (req, res, next) => {
    try {
      const usages = usageService.listUsages();
      return res.status(200).json(usages);
    } catch (error) {
      next(error);
    }
  };

  finish = async (req, res, next) => {
    try {
      const { id } = req.params;
      const finishedUsage = usageService.finishUsage(id);
      return res.status(200).json({
        message: 'Utilização finalizada com sucesso',
        usage: finishedUsage
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UsageController();