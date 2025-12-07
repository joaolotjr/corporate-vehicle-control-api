const usageRepository = require('../repositories/usageRepository');
const carRepository = require('../repositories/carRepository');
const driverRepository = require('../repositories/driverRepository');
const AppError = require('../utils/AppError');

class UsageService {
  createUsage(data) {
    const { automovelId, motoristaId, motivo } = data;

    // 1. Verificar se o Motorista existe
    const driver = driverRepository.findById(motoristaId);
    if (!driver) {
      throw new AppError('Motorista não encontrado', 404);
    }

    // 2. Verificar se o Automóvel existe
    const car = carRepository.findById(automovelId);
    if (!car) {
      throw new AppError('Automóvel não encontrado', 404);
    }

    // 3. REGRA DE OURO 1: Verificar se o carro já está em uso
    // (Corrigido o nome da variável na verificação)
    const carActiveUsage = usageRepository.findActiveUsageByCarId(automovelId);
    if (carActiveUsage) {
      throw new AppError('Este automóvel já está em uso por outro motorista.', 409);
    }

    // 4. REGRA DE OURO 2: Verificar se o motorista já está usando outro carro
    // (Corrigido: estava passando automovelId, o correto é motoristaId)
    const driverActiveUsage = usageRepository.findActiveUsageByDriverId(motoristaId);
    if (driverActiveUsage) {
      throw new AppError('Este motorista já está utilizando um automóvel no momento.', 409);
    }

    // Se passou por tudo, cria o registro
    return usageRepository.create({ automovelId, motoristaId, motivo });
  }

  listUsages() {
    const usages = usageRepository.findAll();

    // Requisito: Retornar com nome do motorista e dados do carro 
    // Mapeamos cada uso para buscar os objetos completos
    return usages.map(usage => {
      const driver = driverRepository.findById(usage.motoristaId);
      const car = carRepository.findById(usage.automovelId);

      return {
        id: usage.id,
        dataInicio: usage.dataInicio,
        dataFim: usage.dataFim,
        motivo: usage.motivo,        
        motorista: driver ? { id: driver.id, nome: driver.nome } : null,
        automovel: car ? { id: car.id, placa: car.placa, marca: car.marca, cor: car.cor } : null
      };
    });
  }

  finishUsage(id) {
    const usage = usageRepository.findById(id);
    
    if (!usage) {
      throw new AppError('Registro de utilização não encontrado', 404);
    }

    if (usage.dataFim !== null) {
      throw new AppError('Esta utilização já foi finalizada anteriormente', 400);
    }

    // Atualiza a data fim para o momento atual
    return usageRepository.update(id, { dataFim: new Date() });
  }
}

module.exports = new UsageService();