class DriverRepository {
  constructor() {
    this.drivers = [];
    this.currentId = 1;
  }

  create(driver) {
    const newDriver = { id: this.currentId++, ...driver };
    this.drivers.push(newDriver);
    return newDriver;
  }

  findAll(filters = {}) {
    let result = this.drivers;

    if (filters.nome) {
      result = result.filter(d => 
        d.nome.toLowerCase().includes(filters.nome.toLowerCase())
      );
    }
    return result;
  }

  findById(id) {
    return this.drivers.find(d => d.id === parseInt(id));
  }

  update(id, data) {
    const index = this.drivers.findIndex(d => d.id === parseInt(id));
    if (index === -1) return null;
    
    this.drivers[index] = { ...this.drivers[index], ...data };
    return this.drivers[index];
  }

  delete(id) {
    const index = this.drivers.findIndex(d => d.id === parseInt(id));
    if (index === -1) return false;
    
    this.drivers.splice(index, 1);
    return true;
  }
}

module.exports = new DriverRepository();