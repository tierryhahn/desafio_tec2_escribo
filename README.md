--- 

# API de Autenticação de Usuários

Uma API RESTful para autenticação de usuários, que permite operações de cadastro, autenticação e recuperação de informações do usuário.

## Endpoints

### 1. Cadastrar Usuário (Sign Up)

- **URL:** `/signup`
- **Método:** `POST`
- **Input:**
  ```json
  {
    "nome": "string",
    "email": "string",
    "senha": "senha",
    "telefones": [{"numero": "123456789", "ddd": "11"}]
  }
  ```
- **Output (Sucesso):**
  ```json
  {
    "id" : "GUID/ID",
    "data_criacao": "data",
    "data_atualizacao": "data",
    "ultimo_login": "data",
    "token": "GUID/JWT"
  }
  ```
- **Erro:**
  - E-mail já cadastrado: 
    ```json
    {"mensagem": "E-mail já existente"}
    ```

### 2. Autenticar Usuário (Sign In)

- **URL:** `/signin`
- **Método:** `POST`
- **Input:**
  ```json
  {
    "email": "string",
    "senha": "senha"
  }
  ```
- **Output (Sucesso):**
  ```json
  {
    "id": "GUID/ID",
    "data_criacao": "data",
    "data_atuaizacao": "data",
    "ultimo_login": "data",
    "token": "GUID/JWT"
  }
  ```
- **Erros:**
  - E-mail não cadastrado ou senha incorreta:
    ```json
    {"mensagem": "Usuário e/ou senha inválidos"}
    ```
  - Senha incorreta (status 401):
    ```json
    {"mensagem": "Usuário e/ou senha inválidos"}
    ```

### 3. Buscar Usuário

- **URL:** `/user`
- **Método:** `GET`
- **Requisição:**
  - Header Authentication com valor "Bearer {token}"
- **Erros:**
  - Token inválido:
    ```json
    {"mensagem": "Não autorizado"}
    ```
  - Token expirado (mais de 30 minutos):
    ```json
    {"mensagem": "Sessão inválida"}
    ```

## Requisitos Técnicos

- **Persistência de Dados:** PostgreSQL com Prisma ORM.
- **Sistema de Build:** JavaScript para desenvolvimento e produção.
- **Padronização de Estilo:** ESLint.
- **Framework:** Express.

## Executando Localmente

1. Clone o repositório.
2. Instale as dependências usando `npm install`.
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Execute o projeto com `npm run dev`.

## Testes Unitários

Execute os testes unitários com o comando:

```json
  npm test
```

## Deploy

A API está disponível em https://desafio-tec2-escribo.vercel.app/.

## Contribuições

Contribuições são bem-vindas! Se encontrar problemas ou tiver sugestões, sinta-se à vontade para abrir uma issue ou enviar um pull request.

--- 
