# Desafio Haytek: Catálogo de Produtos E-commerce

Este é um projeto full-stack que implementa um catálogo de produtos para um e-commerce. A aplicação permite o registro e login de usuários, além do gerenciamento completo (CRUD - Criar, Ler, Atualizar e Deletar) de produtos.

O projeto foi desenvolvido com foco em boas práticas, separação de responsabilidades, e portabilidade, utilizando Docker para orquestrar todo o ambiente.

---

## Tecnologias Utilizadas

O projeto é dividido em duas partes principais: o frontend e o backend.

**Frontend:**
* **Framework:** React com Vite
* **Linguagem:** TypeScript
* **Estilização:** TailwindCSS
* **Validação de Formulários:** React Hook Form & Zod
* **Cliente HTTP:** Axios

**Backend:**
* **Framework:** NestJS
* **Linguagem:** TypeScript
* **Banco de Dados:** MongoDB com Mongoose
* **Autenticação:** JWT (JSON Web Tokens) com Passport.js
* **Validação:** Class-validator e Class-transformer
* **Documentação da API:** Swagger (OpenAPI)

**Ambiente:**
* **Contêineres:** Docker
* **Orquestração:** Docker Compose

---

## Como Executar o Projeto

A maneira mais simples e recomendada de executar a aplicação é utilizando Docker e Docker Compose.

### Pré-requisitos

* **Docker:** [Instale o Docker](https://docs.docker.com/get-docker/)
* **Docker Compose:** Geralmente já vem incluído com o Docker Desktop.

### Passo a Passo

1.  **Clone o Repositório**
    Se você ainda não o fez, clone o projeto para a sua máquina local.

2.  **Suba os Contêineres**
    execute o seguinte comando no seu terminal:

    ```bash
    docker compose up 
    ```
    Aguarde até que todos os serviços sejam iniciados. Você verá os logs de cada serviço no seu terminal.

4.  **Acesse a Aplicação**
    Após a inicialização, os serviços estarão disponíveis nos seguintes endereços:

    * **Aplicação Frontend:** [http://localhost:5173](http://localhost:5173)
    * **API Backend:** [http://localhost:3000](http://localhost:3000)
    * **Documentação da API (Swagger):** [http://localhost:3000/api](http://localhost:3000/api)


## Estrutura do Projeto


```bash
├── backend/           # Contém a aplicação NestJS (API)
├── frontend/          # Contém a aplicação React (Interface do Usuário)
└── docker-compose.yml # Arquivo de orquestração do Docker
```

---

## Testes

Os testes unitários para o backend foram escritos com Jest. Para executá-los, você pode entrar no contêiner do backend e rodar o comando de teste.

1.  **Encontre o nome do contêiner do backend:**
    ```bash
    docker ps
    ```
    (Procure por um nome como `desafio-backend-1`)

2.  **Acesse o terminal do contêiner:**
    ```bash
    docker exec -it <nome-do-container-backend> sh
    ```

3.  **Rode os testes:**
    ```bash
    npm run test
    ```