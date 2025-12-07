const driverRepository = require('../repositories/driverRepository');
const AppError = require('../utils/AppError');

class DriverService {
  createDriver(data) {
    if (!data.nome) {
      throw new AppError('O nome do motorista é obrigatório');
    }
    return driverRepository.create(data);
  }

  listDrivers(filters) {
    return driverRepository.findAll(filters);
  }

  getDriverById(id) {
    const driver = driverRepository.findById(id);
    if (!driver) {
      throw new AppError('Motorista não encontrado', 404);
    }
    return driver;
  }

  updateDriver(id, data) {
    const driver = driverRepository.findById(id);
    if (!driver) {
      throw new AppError('Motorista não encontrado para atualização', 404);
    }
    return driverRepository.update(id, data);
  }

  deleteDriver(id) {
    const deleted = driverRepository.delete(id);
    if (!deleted) {
      throw new AppError('Motorista não encontrado para exclusão', 404);
    }
  }
}

module.exports = new DriverService();