const { v4: uuidv4 } = require('uuid');

class CarRepository {
  constructor() {
    // Simulação do Banco de Dados
    this.cars = [];
  }

  // Cria um novo carro [cite: 8]
  create(data) {
    const newCar = {
      id: uuidv4(),
      placa: data.placa,
      cor: data.cor,
      marca: data.marca, // [cite: 34, 36, 37]
      createdAt: new Date()
    };
    this.cars.push(newCar);
    return newCar;
  }

  // Atualiza um carro existente [cite: 10]
  update(id, data) {
    const index = this.cars.findIndex(car => car.id === id);
    if (index === -1) return null;

    // Mantém o ID e Data, atualiza o resto
    this.cars[index] = { ...this.cars[index], ...data };
    return this.cars[index];
  }

  // Exclui um carro [cite: 12]
  delete(id) {
    const index = this.cars.findIndex(car => car.id === id);
    if (index === -1) return false;

    this.cars.splice(index, 1);
    return true;
  }

  // Busca por ID [cite: 14]
  findById(id) {
    return this.cars.find(car => car.id === id);
  }

  // Lista com filtros opcionais (Cor e Marca) 
  findAll(filters = {}) {
    return this.cars.filter(car => {
      let isValid = true;
      
      // Filtro por Cor (Case insensitive para melhor UX)
      if (filters.cor) {
        isValid = isValid && car.cor.toLowerCase() === filters.cor.toLowerCase();
      }

      // Filtro por Marca
      if (filters.marca) {
        isValid = isValid && car.marca.toLowerCase() === filters.marca.toLowerCase();
      }

      return isValid;
    });
  }
}

// Exportamos uma instância única (Singleton) para manter os dados vivos na memória
module.exports = new CarRepository();