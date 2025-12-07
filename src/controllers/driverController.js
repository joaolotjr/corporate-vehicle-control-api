const Joi = require('joi');
const driverService = require('../services/driverService');
const AppError = require('../utils/AppError');

const driverSchema = Joi.object({
  nome: Joi.string().required().min(3).messages({
    'any.required': 'O nome é obrigatório',
    'string.min': 'O nome deve ter pelo menos 3 caracteres'
  })
});

class DriverController {
  create = async (req, res, next) => {
    try {
      const { error, value } = driverSchema.validate(req.body);
      if (error) throw new AppError(error.details[0].message, 400);

      const newDriver = driverService.createDriver(value);
      return res.status(201).json(newDriver);
    } catch (error) {
      next(error);
    }
  };

  list = async (req, res, next) => {
    try {
      const { nome } = req.query;
      const drivers = driverService.listDrivers({ nome });
      return res.status(200).json(drivers);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const driver = driverService.getDriverById(id);
      return res.status(200).json(driver);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nome } = req.body; // Validação simples para update
      
      if (!nome) throw new AppError('O nome é obrigatório para atualização');

      const updatedDriver = driverService.updateDriver(id, { nome });
      return res.status(200).json(updatedDriver);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      driverService.deleteDriver(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new DriverController();