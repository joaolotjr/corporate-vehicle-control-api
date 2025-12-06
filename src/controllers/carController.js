const Joi = require('joi');
const carService = require('../services/carService');
const AppError = require('../utils/AppError');

// (Joi)
const carSchema = Joi.object({
  placa: Joi.string().required().messages({'any.required': 'A placa é obrigatória'}),
  cor: Joi.string().required().messages({'any.required': 'A cor é obrigatória'}),
  marca: Joi.string().required().messages({'any.required': 'A marca é obrigatória'})
});

const updateCarSchema = Joi.object({
  placa: Joi.string(),
  cor: Joi.string(),
  marca: Joi.string()
});

class CarController {
  
  // Criar Automóvel
  create = async (req, res, next) => {
    try {
      // 1. Validar Input
      const { error, value } = carSchema.validate(req.body);
      if (error) {
        throw new AppError(error.details[0].message, 400);
      }

      // 2. Chamar Service
      const newCar = carService.createCar(value);

      // 3. Responder
      return res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  };

  // Listar Automóveis (com filtros)
  list = async (req, res, next) => {
    try {
      const { cor, marca } = req.query;
      const cars = carService.listCars({ cor, marca });
      return res.status(200).json(cars);
    } catch (error) {
      next(error);
    }
  };

  // Buscar por ID
  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const car = carService.getCarById(id);
      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  };

  // Atualizar
  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      
      const { error, value } = updateCarSchema.validate(req.body);
      if (error) throw new AppError(error.details[0].message, 400);

      const updatedCar = carService.updateCar(id, value);
      return res.status(200).json(updatedCar);
    } catch (error) {
      next(error);
    }
  };

  // Deletar
  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      carService.deleteCar(id);
      return res.status(204).send(); // 204 No Content
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CarController();