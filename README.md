
# UserHubAPI

Nossa API de Gerenciamento de Usuários é uma ferramenta poderosa para criar, atualizar e autenticar usuários em seu sistema com facilidade e segurança. Projetada para simplificar o processo de gerenciamento de usuários, nossa API oferece uma variedade de funcionalidades essenciais, desde o registro inicial até a atualização de informações e o login seguro.

Com uma documentação abrangente e fácil de entender, estamos aqui para guiá-lo através de todas as etapas necessárias para integrar e utilizar nossa API em seu aplicativo. Explore nossa documentação para descobrir como começar a utilizar nossa API, entender os diferentes endpoints disponíveis e aprender as melhores práticas para garantir a segurança e eficácia de sua integração.


## Stack utilizada

- Node
- TypeScript
- Express
- Prisma
- cpf-cnpj-validator
- Axios
- PostgreSQL
- Bcrypt
- JsonWebToken
- Tsyringe
- Zod

## Funcionalidades

- Cadastr de usuário
- Vizualização das informações de todos os usuário
- Atualização da informações dos usuarios
- Autenticação
- Deleção de cadastro


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL`

`PORT`

`SECRET_HASH`

`SECRET_KEY_TOKEN`


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/andreycaetano/UserHubAPI
```

Entre no diretório do projeto

```bash
  cd UserHubAPI
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```


# Documentação da API

### Registro de novo usuario

```http
  POST /register
```

#### Corpo da requisição
```json
{
  "fName": "João",
  "lName": "Silva",
  "email": "joao.silva@example.com",
  "password": "P@ssw0rd!",
  "birthDate": "1990-05-15",
  "ethnicity": "White",
  "maritalStatus": "Single",
  "CPF": "158.968.367-67",
  "address": {
    "cep": "29172330",
    "numberHouse": 1,
    "complement": "Apt 101"
  }
}
```

#### Retorno
```json
status 201 CREATED

{
    "id": 1,
    "fName": "João",
    "lName": "Silva",
    "email": "joao.silva@example.com",
    "birthDate": "1990-05-15",
    "ethnicity": "White",
    "maritalStatus": "Single",
    "CPF": "15896836767",
    "address": {
        "id": 1,
        "CEP": 29172330,
        "numberHouse": 1,
        "complement": "Apt 101",
        "street": "Rua das Purpurinas",
        "neighborhood": "Feu Rosa",
        "city": "Feu Rosa",
        "state": "ES"
    }
}
```

#### Especificações do Corpo da requisição
```typescript
{
    fName: string;
    lName: string;
    email: string;
    password: string;
    birthDate: string;
    ethnicity: "White" | "Black" | "Asian" | "Latino" | "MixedRace" | "Other";
    maritalStatus: "Single" | "Married" | "Divorced" | "Widowed" | "Separated" | "DomesticPartnership" | "Other";
    CPF: string;
    address: {
   cep: string;
    numberHouse: number;
    complement: string | null;
    };
}
```

### Retorna lista de usuarios
```http
  GET /
```

#### Exemplo de Retorno
```json
status 200 OK

[
    {
        "id": 1,
        "fName": "João",
        "lName": "Silva",
        "email": "joao.silva@example.com",
        "birthDate": "1990-05-15",
        "ethnicity": "White",
        "maritalStatus": "Single",
        "CPF": "15896836767",
        "address": {
            "id": 1,
            "CEP": 29172330,
            "numberHouse": 1,
            "complement": "Apt 101",
            "street": "Rua das Purpurinas",
            "neighborhood": "Feu Rosa",
            "city": "Feu Rosa",
            "state": "ES"
        }
    }
]
```

### Atualizar informações do usuario
```http
    PATCH /:id
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuário que será atualizado |
| `token`   | `string` | **Obrigatório**. Token de autenticação obrigatório, de um usuário administrador ou do próprio usuário que está sendo atualizado. |


#### Exemplo do corpo da requisição
```json
{
  "fName": "André",
  "lName": "Souza",
  "email": "andre.souza@example.com",
  "password": "0123456Po!",
  "birthDate": "1990-05-15",
  "ethnicity": "White",
  "maritalStatus": "Married",
  "CPF": "158.968.367-67",
  "address": {
    "cep": "35162079",
    "numberHouse": 10,
    "complement": ""
  }
}
```
#### Exemplo de resposta
```json
status 200 OK

{
    "id": 1,
    "fName": "André",
    "lName": "Souza",
    "email": "andre.souza@example.com",
    "birthDate": "1990-05-15",
    "ethnicity": "White",
    "maritalStatus": "Married",
    "CPF": "158.968.367-67",
    "address": {
        "id": 1,
        "CEP": 35162079,
        "numberHouse": 10,
        "complement": "",
        "street": "Rua Javari",
        "neighborhood": "Iguaçu",
        "city": "Iguaçu",
        "state": "MG"
    }
}
```
### Login
```http
    POST /login
```

#### Exemplo de Corpo da requisição
```json
{
    "email": "joao.silva@example.com",
    "password": "P@ssw0rd!"
}
```

#### Exemplo de resposta
```json
status 200 OK

{
    "id": 1,
    "user": "joao.silva@example.com",
    "admin": false,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOmZhbHNlLCJpYXQiOjE3MTIxNjA0MzEsImV4cCI6MTcxMjE2NDAzMX0.S7CFya0z_xsp1rkVC1KJl4TDsGsZSwRr_o6t2wjElBA"
}
```

### Delete
```http
    DELETE /:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuário que será atualizado |
| `token`   | `string` | **Obrigatório**. Token de autenticação obrigatório, de um usuário administrador ou do próprio usuário que está sendo atualizado. |

#### Exemplo de retorno
```http
204 no content
```
## Referência

- [@viacep](https://viacep.com.br/)
## Autores

- [@andreycaetano](https://github.com/andreycaetano)

