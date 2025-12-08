const carService = require('../services/carService');
const driverService = require('../services/driverService');

const runSeed = () => {
  try {
    console.log('🌱 Populando banco de dados em memória...');
    
    // Criar Carros
    const car1 = carService.createCar({ placa: 'ABC-1234', cor: 'Prata', marca: 'Toyota' });
    const car2 = carService.createCar({ placa: 'XYZ-9876', cor: 'Preto', marca: 'Honda' });
    
    // Criar Motoristas
    const driver1 = driverService.createDriver({ nome: 'João Silva' });
    const driver2 = driverService.createDriver({ nome: 'Maria Oliveira' });

    console.log('✅ Dados iniciais criados!');
    console.log(`🚗 Carros: ${car1.placa}, ${car2.placa}`);
    console.log(`👤 Motoristas: ${driver1.nome}, ${driver2.nome}`);
  } catch (error) {
    console.error('Erro ao popular dados:', error.message);
  }
};

module.exports = runSeed;