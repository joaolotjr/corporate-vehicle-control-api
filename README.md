# 🚗 Corporate Vehicle Control API

Solução Back-end para o desafio técnico da **Seidor**.
Esta API atua como uma unidade de controle central para operações de frota, garantindo a alocação ideal de recursos e prevenindo conflitos de agendamento através de regras de negócio estritas.

---

## 🎯 Funcionalidades Principais

O sistema foi construído com mecanismos de controle rígidos para garantir a integridade dos dados:

* **Alocação Sem Conflitos (Business Rules):**
    * Um automóvel não pode ser utilizado por mais de um motorista simultaneamente.
    * Um motorista não pode utilizar mais de um automóvel ao mesmo tempo.
* **Gestão de Ativos (CRUD):** Gerenciamento completo de **Automóveis** (com filtro por cor/marca) e **Motoristas** (com filtro por nome).
* **Rastreabilidade de Uso:** Registro de saídas e devoluções de veículos, incluindo datas e motivos de utilização.
* **Seed Automático:** O sistema pré-carrega dados iniciais ao iniciar para facilitar os testes manuais.

## 🛠️ Tech Stack & Arquitetura

* **Node.js & Express:** Runtime de alta performance.
* **Clean Architecture:** Separação de responsabilidades em camadas (**Controllers** ↔ **Services** ↔ **Repositories**).
* **In-Memory Persistence:** Estratégia otimizada para operações de baixa latência usando padrões Singleton.
* **TDD & Jest:** Testes unitários cobrindo as regras de negócio críticas.
* **Swagger/OpenAPI:** Documentação interativa e automática da API.
* **Joi:** Validação robusta de dados de entrada.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* Node.js (v14 ou superior)
* NPM

### Instalação e Execução

1.  **Clone o repositório e instale as dependências:**
    ```bash
    npm install
    ```

2.  **Inicie o Servidor:**
    ```bash
    npm start
    ```
    
    > **Note:** Ao iniciar, você verá o script de **Seed** rodando automaticamente:
    > ```text
    > 🌱 Populando banco de dados em memória...
    > ✅ Dados iniciais criados!
    > 🚗 Carros: ABC-1234, XYZ-9876
    > 👤 Motoristas: João Silva, Maria Oliveira
    > ```

3.  **Acesse a Documentação (Swagger):**
    Abra seu navegador em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🧪 Testes e Qualidade de Código

O projeto utiliza **Jest** para garantir a confiabilidade das regras de negócio, especialmente no `UsageService`, onde residem as validações de conflito de agenda.

Para rodar os testes:
```bash
npm test
```

---

##  📊 Cobertura de Testes (Coverage)

Abaixo o relatório de cobertura gerado automaticamente, destacando a alta cobertura nas regras de negócio (services):


File                  | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
All files             |   37.61 |    26.66 |   16.66 |   43.61 |
 services             |      80 |    68.75 |      50 |      80 |
  usageService.js     |      80 |    68.75 |      50 |      80 |
 utils                |     100 |    33.33 |     100 |     100 |
  AppError.js         |     100 |    33.33 |     100 |     100 |
----------------------|---------|----------|---------|---------|
Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total

---

## 📂 Estrutura do Projeto

```
/src
  /config         # Configurações (Swagger, Env)
  /controllers    # Camada de Interface (HTTP, Validação de entrada)
  /middlewares    # Tratamento de Erros Global
  /repositories   # Camada de Acesso a Dados (In-Memory DB)
  /routes         # Definição de Rotas da API
  /services       # Regras de Negócio e Lógica de Domínio
  /utils          # Classes utilitárias (AppError, Seed)
  app.js          # Configuração do Express
  server.js       # Entry point
/tests            # Testes Unitários (Jest)

```

---

## 🔌 Principais Endpoints 

| Recurso     | Método | Rota                     | Descrição                                  |
| :---        | :---   | :---                     | :---                                       |
| **Automóveis** | `POST` | `/api/automoveis`        | Cria um novo veículo                       |
|             | `GET`  | `/api/automoveis`        | Lista veículos (Filtros: `cor`, `marca`)   |
|             | `GET`  | `/api/automoveis/{id}`   | Recupera um veículo pelo ID                |
|             | `PUT`  | `/api/automoveis/{id}`   | Atualiza os dados de um veículo            |
|             | `DELETE`| `/api/automoveis/{id}`  | Remove um veículo do sistema               |
| **Motoristas** | `POST` | `/api/motoristas`        | Cria um novo motorista                     |
|             | `GET`  | `/api/motoristas`        | Lista motoristas (Filtro: `nome`)          |
|             | `GET`  | `/api/motoristas/{id}`   | Recupera um motorista pelo ID              |
|             | `PUT`  | `/api/motoristas/{id}`   | Atualiza os dados de um motorista          |
|             | `DELETE`| `/api/motoristas/{id}`  | Remove um motorista do sistema             |
| **Utilização** | `POST` | `/api/utilizacao`        | **Inicia** o uso (Motorista + Carro)       |
|             | `GET`  | `/api/utilizacao`        | Lista o histórico completo de utilizações  |
|             | `PUT`  | `/api/utilizacao/{id}/finalizar` | **Finaliza** o uso atual (Devolução)       |
---

## 🔮 Melhorias Futuras (Roadmap)

Visando a evolução do projeto para um ambiente de produção real, os seguintes pontos seriam abordados:

* **Persistência Real:** Substituição dos Repositórios em memória por um ORM (Prisma/TypeORM) conectado a um banco de dados (PostgreSQL ou MongoDB).
* **Containerização:** Criação de `Dockerfile` e `docker-compose.yml` para facilitar o deploy.
* **Autenticação:** Implementação de JWT (JSON Web Tokens) para proteger as rotas de escrita.
* **CI/CD:** Pipeline no GitHub Actions para rodar os testes automaticamente a cada Push.

---

## 👨‍💻 Autor

Desenvolvido por **João Carlos Lot Junior**.

* **LinkedIn:** [https://www.linkedin.com/in/joao-carlos-lot-junior/]
* **GitHub:** [https://github.com/joaolotjr]

