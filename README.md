# API DA TABUADA DO GLÉCIO

Esse projeto é uma API para o jogo da tabuada do professor Glécio Raimundo da escola profissional de Aracati.

## Instalação
1. Clone o repositório
    ```bash 
    git clone https://github.com/luizlealdev/tabuada-glecio-api
    ```

2. Instale as dependências:
   ```bash
   npm install
   ```


3. Crie um arquivo chamado .env e coloque as seguintes infmações 
   ```bash
   DATABASE_URL='mysql://xxxxxx@yyyyyyyyy.us-east-1.aws:5432/zzzzz?sslmode=require'
   JWT_SECRET='xxxxxxxxxxxxxxxxxxxxxxxxx'
   JWT_EXPIRES_IN='1d'
   ```
4. Rode as migrações do banco de dados (caso esteja usando Prisma):
   ```bash
   npx prisma migrate dev
   ```

## Endpoints

### Autenticação

#### `POST /auth/local/register`
Cria um novo usuário

- *Request*
```json 
{
  "name": "Glécio Raimundo",
  "email": "glecio@prof.ce.gov.br",
  "class": "Infor 3",
  "password": "123456"
}
```
- *Response*
```json
{
    "status_code": 201,
    "message": "User Created Successfully",
    "result": {
        "token": "eyJhbGCiOiJIUzI1NiIOInR5cCI6IkpXVCJ9.eyJzdWIiOjIyLCJlbWFpbCI6ImdsZWNpb0Bwcm9mLmNlLmdvdi5iciIsImlhdCI6MTcyODc3OTI2OSwiZXhwIjoxNzI5OTg4ODY5fQ.6nH3WyFaiPKppQogRY3vUT_zl6StGuh14x_9QxjUqmI"
    }
}
```

#### `POST /auth/local/login`
Autentica um usuário e retorna um token JWT

- *Request*
```json 
{
  "email": "glecio@prof.ce.gov.br",
  "password": "123456"
}
```
- *Response*
```json
{
    "status_code": 201,
    "message": "User Logged Successfully",
    "result": {
        "token": "eyJhbGCiOiJIUzI1NiIOInR5cCI6IkpXVCJ9.eyJzdWIiOjIyLCJlbWFpbCI6ImdsZWNpb0Bwcm9mLmNlLmdvdi5iciIsImlhdCI6MTcyODc3OTI2OSwiZXhwIjoxNzI5OTg4ODY5fQ.6nH3WyFaiPKppQogRY3vUT_zl6StGuh14x_9QxjUqmI"
    }
}
```
---

### Usuários

#### `GET /user/:id`
Pega as informações de um usuário específico

- *Headers* 
```
Authorization: Bearer {token}
```

- *Response*
```json
{
    "status_code": 200,
    "message": "User Fetched Successfully",
    "result": {
        "id": 2,
        "name": "Glécio Raimundo",
        "class": "Infor 3",
        "created_at": "2024-10-19T18:30:11.582Z",
        "is_admin": false
    }
}
```


#### `PUT /user/update`
Edita as informações públicas do usuário

- *Headers* 
```
Authorization: Bearer {token}
```

- *Request*
```json 
{
  "name": "Glécio Prof",
  "class": "Math"
}
```
- *Response*
```json
{
    "status_code": 200,
    "message": "User Updated Successfully",
    "result": {
        "id": 23,
        "name": "Glécio Prof",
        "class": "Math"
    }
}
```

#### `PUT /user/update/password`
Edita a senha do usuário

- *Headers* 
```
Authorization: Bearer {token}
```

- *Request*
```json 
{
  "old_password": "123456",
  "new_password": "654321"
}
```
- *Response*
```json
{
    "status_code": 200,
    "message": "User Password Updated Successfully"
}
```
---

### Ranking

#### `POST /ranking/normal`
Cria uma nova entry no ranking (normal)

- *Headers* 
```
Authorization: Bearer {token}
```

- *Request*
```json 
{
  "score": 50
}
```
- *Response*
```json
{
    "status_code": 201,
    "message": "Ranking Entry Created Successfully",
    "result": {
        "score": 50,
        "user_id": 23
    }
}
```

#### `GET /ranking/normal`
Retorna a lista de todas os dados do ranking normal ordenados de forma decrescente

- *Headers* 
```
Authorization: Bearer {token}
```

- *Response*
```json
{
    "status_code": 200,
    "message": "Ranking Entries Fetched Successfully",
    "result": [
        {
            "id": 3,
            "score": 60,
            "user": {
                "id": 19,
                "name": "Hiago",
                "class": "Inf 3"
            }
        },
        {
            "id": 5,
            "score": 55,
            "user": {
                "id": 21,
                "name": "Luiz",
                "class": "Inf"
            }
        },
        {
            "id": 6,
            "score": 50,
            "user": {
                "id": 23,
                "name": "Glécio Prof",
                "class": "Math"
            }
        },
        {
            "id": 2,
            "score": 25,
            "user": {
                "id": 18,
                "name": "Meteus Ferreira",
                "class": "Guia 1"
            }
        }
    ]
}
```

#### `DELETE /ranking/normal`
Limpa o ranking

> [!WARNING]  
> Apenas usuários com acesso de Admin podem fazer essa ação

- *Headers* 
```
Authorization: Bearer {token}
```

- *Response*
```json
{
    "status_code": 200,
    "message": "Ranking Entries Deleted Successfully"
}
```
---

### Ranking Global

#### `POST /ranking/global`
Cria uma nova entry no ranking (global)

> [!NOTE]  
> Ao contrário do Ranking Normal, nesse ranking o request será enviado apenas se o usuário atingir seu recorde de pontros.

- *Headers* 
```
Authorization: Bearer {token}
```

- *Request*
```json 
{
  "score": 50
}
```
- *Response*
```json
{
    "status_code": 201,
    "message": "Ranking Entry Created Successfully",
    "result": {
        "score": 50,
        "user_id": 23
    }
}
```

#### `GET /ranking/global`
Retorna a lista de todos os dados do ranking global ordenados de forma decrescente

- *Headers* 
```
Authorization: Bearer {token}
```

- *Response*
```json
{
    "status_code": 200,
    "message": "Ranking Entries Fetched Successfully",
    "result": [
        {
            "id": 3,
            "score": 60,
            "user": {
                "id": 19,
                "name": "Hiago",
                "class": "Inf 3"
            }
        },
        {
            "id": 5,
            "score": 50,
            "user": {
                "id": 21,
                "name": "Glecio Prof",
                "class": "Math"
            }
        },
    ]
}
```

---

## Licença
Projeto sob [Licença MIT](./LICENSE)