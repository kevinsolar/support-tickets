# Sistema de Tickets de Suporte

Este projeto é uma API RESTful simples para gerenciar tickets de suporte de TI. Foi construído utilizando Node.js puro, sem o uso de frameworks externos, como uma forma de explorar e demonstrar os conceitos fundamentais do desenvolvimento backend com Node.

## Funcionalidades

- **Criar tickets:** Registrar um novo chamado de suporte.
- **Listar tickets:** Visualizar todos os chamados, com a opção de filtrar por status.
- **Atualizar tickets:** Modificar as informações de um ticket existente.
- **Fechar tickets:** Marcar um ticket como "fechado" e adicionar uma solução.
- **Deletar tickets:** Remover um ticket do sistema.

## Decisões de Arquitetura e Design

A estrutura do projeto foi pensada para ser simples, modular e didática. As principais decisões foram:

### 1. Node.js Puro (Vanilla)

O projeto foi construído utilizando apenas os módulos nativos do Node.js (`http`, `fs`, `crypto`), sem recorrer a frameworks como Express ou Fastify.

- **Por quê?** Essa abordagem permite um entendimento mais profundo de como o Node.js funciona por baixo dos panos. Ela força a implementação de funcionalidades que são normalmente abstraídas por frameworks, como o roteamento de requisições e o parsing do corpo (body) de uma requisição. O resultado é um projeto leve, sem dependências externas (`node_modules`).

### 2. Roteamento Customizado

Foi implementado um sistema de roteamento do zero para lidar com as requisições HTTP.

- **Como funciona?**
    - O utilitário `src/utils/parseRoutePath.js` converte os caminhos das rotas (ex: `/tickets/:id`) em expressões regulares (RegExp). Isso permite capturar parâmetros dinâmicos da URL (como o `id`).
    - O `src/middlewares/routeHandler.js` intercepta cada requisição, compara o método e a URL com a lista de rotas definidas e, se encontrar uma correspondência, extrai os parâmetros da rota e da query string.
    - Por fim, ele invoca a função de `controller` associada àquela rota.

### 3. Banco de Dados Simples (JSON)

Para simplificar o setup e o desenvolvimento, o projeto utiliza um arquivo JSON (`src/database/db.json`) como banco de dados.

- **Por quê?** A classe `Database` em `src/database/database.js` abstrai a leitura e escrita neste arquivo, simulando um comportamento de um banco de dados NoSQL simples com operações como `insert`, `select`, `update` e `delete`. Isso evita a necessidade de configurar e gerenciar um serviço de banco de dados externo, tornando o projeto autocontido e fácil de executar.
- **Nota:** Esta abordagem é ideal para prototipagem e desenvolvimento, mas não é recomendada para produção devido a possíveis condições de corrida e limitações de performance.

### 4. Estrutura Modular e Middlewares

O código é organizado de forma modular, separando responsabilidades em diferentes diretórios:

- `controllers`: Contêm a lógica de negócio de cada endpoint.
- `routes`: Definem os endpoints da API e os associam aos seus respectivos controllers.
- `database`: Gerencia a persistência dos dados.
- `utils`: Funções auxiliares e genéricas.
- `middlewares`: Funções que atuam sobre a requisição antes de chegar ao controller final. O `jsonHandler.js`, por exemplo, é responsável por processar o corpo de requisições JSON.

## Endpoints da API

| Método | Caminho                  | Descrição                                            | Corpo (Body) da Requisição                               |
|--------|--------------------------|--------------------------------------------------------|-----------------------------------------------------------|
| `POST` | `/tickets`               | Cria um novo ticket de suporte.                        | `{ "equipament": "string", "description": "string", "user_name": "string" }` |
| `GET`  | `/tickets`               | Lista todos os tickets. Pode filtrar por `?status=...` | N/A                                                       |
| `PUT`  | `/tickets/:id`           | Atualiza o equipamento e a descrição de um ticket.     | `{ "equipament": "string", "description": "string" }`     |
| `PATCH`| `/tickets/:id/close`     | Fecha um ticket e adiciona a solução.                  | `{ "solution": "string" }`                                |
| `DELETE`| `/tickets/:id`          | Deleta um ticket específico.                           | N/A                                                       |

## Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd support-tickets
    ```

2.  **Inicie o servidor:**
    Como o projeto não possui dependências externas, não é necessário executar `npm install`.
    Para iniciar o servidor em modo de desenvolvimento (com recarregamento automático), execute:
    ```bash
    npm run dev
    ```

3.  O servidor estará rodando em `http://localhost:3300`.
