const carRepository = require('../repositories/carRepository');
const AppError = require('../utils/AppError'); 

class CarService {
  constructor(repository) {
    this.repository = repository;
  }

  createCar(data) {
    // Verificar se placa já existe
    const existingCars = this.repository.findAll();
    const duplicate = existingCars.find(c => c.placa === data.placa);
    
    if (duplicate) {
      throw new AppError('Um carro com esta placa já está cadastrado.', 409);
    }

    return this.repository.create(data);
  }

  updateCar(id, data) {
    const updatedCar = this.repository.update(id, data);
    if (!updatedCar) {
      throw new AppError('Carro não encontrado.', 404);
    }
    return updatedCar;
  }

  deleteCar(id) {
    const deleted = this.repository.delete(id);
    if (!deleted) {
      throw new AppError('Carro não encontrado para exclusão.', 404);
    }
    return { message: 'Carro excluído com sucesso.' };
  }

  getCarById(id) {
    const car = this.repository.findById(id);
    if (!car) {
      throw new AppError('Carro não encontrado.', 404);
    }
    return car;
  }

  listCars(filters) {
    // Repassa filtros de cor e marca para o repositório 
    return this.repository.findAll(filters);
  }
}

// Injeção de dependência manual
module.exports = new CarService(carRepository);