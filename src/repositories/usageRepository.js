const { v4: uuidv4 } = require('uuid');

class UsageRepository {
  constructor() {
    this.usages = [];
    this.currentId = 1;
  }

  create(usage) {
    const newUsage = { 
      id: uuidv4(), 
      dataInicio: new Date(), // Data de início é automática
      dataFim: null,          // Começa sem data de fim (em aberto)
      ...usage 
    };
    this.usages.push(newUsage);
    return newUsage;
  }

  findAll() {
    return this.usages;
  }

  findById(id) {
    return this.usages.find(u => u.id === id);
  }

  // Busca se existe algum registro para este carro que ainda não foi finalizado (dataFim === null)
  findActiveUsageByCarId(carId) {
    return this.usages.find(u => u.automovelId === carId && u.dataFim === null);
  }

  // Busca se existe algum registro para este motorista que ainda não foi finalizado (dataFim === null)
  findActiveUsageByDriverId(driverId) {
    return this.usages.find(u => u.motoristaId === driverId && u.dataFim === null);
  }

  update(id, data) {
    const index = this.usages.findIndex(u => u.id === id);
    if (index === -1) return null;
    
    this.usages[index] = { ...this.usages[index], ...data };
    return this.usages[index];
  }
}

module.exports = new UsageRepository();