// tests/usageService.test.js
const usageService = require('../src/services/usageService');

// Mockamos os repositórios para não depender dos dados reais em memória
// Isso isola o teste apenas na LÓGICA do Service
jest.mock('../src/repositories/usageRepository');
jest.mock('../src/repositories/carRepository');
jest.mock('../src/repositories/driverRepository');

const usageRepository = require('../src/repositories/usageRepository');
const carRepository = require('../src/repositories/carRepository');
const driverRepository = require('../src/repositories/driverRepository');
const AppError = require('../src/utils/AppError');

describe('UsageService Unit Tests', () => {
  
  // Limpa os mocks antes de cada teste para não haver interferência
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUsage', () => {
    const mockData = {
      automovelId: 'car-123',
      motoristaId: 'driver-456',
      motivo: 'Teste de unidade'
    };

    it('Deve criar uma utilização com sucesso quando tudo estiver livre', async () => {
      // Cenário: Motorista existe, Carro existe, Ninguém está usando nada
      driverRepository.findById.mockReturnValue({ id: 'driver-456', nome: 'João' });
      carRepository.findById.mockReturnValue({ id: 'car-123', placa: 'ABC-1234' });
      usageRepository.findActiveUsageByCarId.mockReturnValue(null); // Carro livre
      usageRepository.findActiveUsageByDriverId.mockReturnValue(null); // Motorista livre
      usageRepository.create.mockReturnValue({ ...mockData, id: 'usage-789', dataInicio: new Date(), dataFim: null });

      const result = usageService.createUsage(mockData);

      expect(result).toHaveProperty('id');
      expect(usageRepository.create).toHaveBeenCalledTimes(1);
    });

    it('Deve lançar erro se o Motorista não existir', () => {
      driverRepository.findById.mockReturnValue(null); // Motorista não encontrado

      expect(() => {
        usageService.createUsage(mockData);
      }).toThrow(AppError);
      
      expect(() => {
        usageService.createUsage(mockData);
      }).toThrow('Motorista não encontrado');
    });

    it('Deve lançar erro se o Automóvel não existir', () => {
      driverRepository.findById.mockReturnValue({ id: 'driver-456' });
      carRepository.findById.mockReturnValue(null); // Carro não encontrado

      expect(() => {
        usageService.createUsage(mockData);
      }).toThrow('Automóvel não encontrado');
    });

    it('REGRA 1: Deve bloquear se o carro já estiver em uso (Erro 409)', () => {
      driverRepository.findById.mockReturnValue({ id: 'driver-456' });
      carRepository.findById.mockReturnValue({ id: 'car-123' });
      
      // Simula que o carro JÁ TEM um uso ativo
      usageRepository.findActiveUsageByCarId.mockReturnValue({ id: 'usage-antigo', dataFim: null });

      try {
        usageService.createUsage(mockData);
      } catch (e) {
        expect(e).toBeInstanceOf(AppError);
        expect(e.statusCode).toBe(409);
        expect(e.message).toBe('Este automóvel já está em uso por outro motorista.');
      }
    });

    it('REGRA 2: Deve bloquear se o motorista já estiver dirigindo outro carro (Erro 409)', () => {
      driverRepository.findById.mockReturnValue({ id: 'driver-456' });
      carRepository.findById.mockReturnValue({ id: 'car-123' });
      
      // Carro está livre...
      usageRepository.findActiveUsageByCarId.mockReturnValue(null);
      // MAS o motorista já está ocupado
      usageRepository.findActiveUsageByDriverId.mockReturnValue({ id: 'usage-outro-carro', dataFim: null });

      try {
        usageService.createUsage(mockData);
      } catch (e) {
        expect(e).toBeInstanceOf(AppError);
        expect(e.statusCode).toBe(409);
        expect(e.message).toBe('Este motorista já está utilizando um automóvel no momento.');
      }
    });
  });

  describe('finishUsage', () => {
    it('Deve finalizar uma utilização ativa', () => {
      const activeUsage = { id: 'usage-1', dataFim: null };
      usageRepository.findById.mockReturnValue(activeUsage);
      usageRepository.update.mockReturnValue({ ...activeUsage, dataFim: new Date() });

      const result = usageService.finishUsage('usage-1');

      expect(result.dataFim).not.toBeNull();
      expect(usageRepository.update).toHaveBeenCalledWith('usage-1', expect.objectContaining({ dataFim: expect.any(Date) }));
    });

    it('Deve impedir finalização de uso inexistente', () => {
      usageRepository.findById.mockReturnValue(null);
      expect(() => usageService.finishUsage('999')).toThrow('Registro de utilização não encontrado');
    });
  });
});