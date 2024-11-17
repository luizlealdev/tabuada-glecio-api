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
   DATABASE_URL='mysql://user:password@path.aws.com:00000/database?ssl-mode=REQUIRED'
   JWT_SECRET='xxxxxxxxxxxxxxxxxxxxxxxxx'
   JWT_EXPIRES_IN='1d'
   ```
4. Rode as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```

## Endpoints

### Autenticação

#### `POST /api/v1/auth/local/register`

Cria um novo usuário

-  _Request_

```json
{
   "name": "Glécio Raimundo",
   "email": "glecio@prof.ce.gov.br",
   "class": "Infor 3",
   "password": "123456",
   "avatar_id": 22
}
```

-  _Response_

```json
{
   "status_code": 201,
   "message": "User Created Successfully",
   "result": {
      "user": {
         "id": 1,
         "name": "Glécio Raimundo",
         "class": "Infor 3",
         "avatar_id": 22
      },
      "token": "eyJhbGCiOiJIUzI1NiIOInR5cCI6IkpXVCJ9.eyJzdWIiOjIyLCJlbWFpbCI6ImdsZWNpb0Bwcm9mLmNlLmdvdi5iciIsImlhdCI6MTcyODc3OTI2OSwiZXhwIjoxNzI5OTg4ODY5fQ.6nH3WyFaiPKppQogRY3vUT_zl6StGuh14x_9QxjUqmI"
   }
}
```

#### `POST /api/v1/auth/local/login`

Autentica um usuário e retorna um token JWT

-  _Request_

```json
{
   "email": "glecio@prof.ce.gov.br",
   "password": "123456"
}
```

-  _Response_

```json
{
   "status_code": 201,
   "message": "User Logged Successfully",
   "result": {
      "user": {
         "id": 1,
         "name": "Glécio Raimundo",
         "class": "Infor 3",
         "avatar_id": 22,
         "is_admin": true
      },
      "token": "eyJhbGCiOiJIUzI1NiIOInR5cCI6IkpXVCJ9.eyJzdWIiOjIyLCJlbWFpbCI6ImdsZWNpb0Bwcm9mLmNlLmdvdi5iciIsImlhdCI6MTcyODc3OTI2OSwiZXhwIjoxNzI5OTg4ODY5fQ.6nH3WyFaiPKppQogRY3vUT_zl6StGuh14x_9QxjUqmI"
   }
}
```

---

### Usuários

#### `GET /api/v1/user/:id`

Pega as informações de um usuário específico

-  _Headers_

```
Authorization: Bearer {token}
```

-  _Response_

```json
{
   "status_code": 200,
   "message": "User Fetched Successfully",
   "result": {
      "id": 1,
      "name": "Glécio Raimundo",
      "class": "Infor 3",
      "max_score": 48,
      "created_at": "2024-10-19T18:30:11.582Z",
      "is_admin": true,
      "avatar": {
         "id": 22,
         "path_default": "<API_URL>/api/v1/avatars/default/22",
         "path_128px": "<API_URL>/api/v1/avatars/256/22",
         "path_256px": "<API_URL>/api/v1/avatars/128/22",
         "is_special": false
      }
   }
}
```

#### `PUT /api/v1/user/update`

Edita as informações públicas do usuário

-  _Headers_

```
Authorization: Bearer {token}
```

-  _Request_

```json
{
   "name": "Glécio Prof",
   "class": "Math",
   "avatar_id": 30
}
```

-  _Response_

```json
{
   "status_code": 200,
   "message": "User Updated Successfully",
   "result": {
      "id": 1,
      "name": "Glécio Prof",
      "class": "Math",
      "avatar": {
         "id": 30,
         "path_default": "<API_URL>/api/v1/avatars/default/30",
         "path_128px": "<API_URL>/api/v1/avatars/256/30",
         "path_256px": "<API_URL>/api/v1/avatars/128/30",
         "is_special": false
      }
   }
}
```

#### `PUT /api/v1/user/update/password`

Edita a senha do usuário

-  _Headers_

```
Authorization: Bearer {token}
```

-  _Request_

```json
{
   "old_password": "123456",
   "new_password": "654321"
}
```

-  _Response_

```json
{
   "status_code": 200,
   "message": "User Password Updated Successfully"
}
```

---

### Avatars

#### `GET /api/v1/avatars/all`

Retorna a lista de todos os avatars

-  _Response_

```json
{
   "status_code": 200,
   "message": "Avatars List Fetched Sucessfully",
   "result": [
      {
         "id": 1,
         "path_default": "<API_URL>/api/v1/avatars/default/1",
         "path_128px": "<API_URL>/api/v1/avatars/256/1",
         "path_256px": "<API_URL>/api/v1/avatars/128/1",
         "is_special": false
      },
      {
         "id": 2,
         "path_default": "<API_URL>/api/v1/avatars/default/2",
         "path_128px": "<API_URL>/api/v1/avatars/256/2",
         "path_256px": "<API_URL>/api/v1/avatars/128/2",
         "is_special": false
      },
      {
         "id": 3,
         "path_default": "<API_URL>/api/v1/avatars/default/3",
         "path_128px": "<API_URL>/api/v1/avatars/256/3",
         "path_256px": "<API_URL>/api/v1/avatars/128/3",
         "is_special": false
      },
      {
         "id": 4,
         "path_default": "<API_URL>/api/v1/avatars/default/4",
         "path_128px": "<API_URL>/api/v1/avatars/256/4",
         "path_256px": "<API_URL>/api/v1/avatars/128/4",
         "is_special": false
      },
      {
         "id": 5,
         "path_default": "<API_URL>/api/v1/avatars/default/5",
         "path_128px": "<API_URL>/api/v1/avatars/256/5",
         "path_256px": "<API_URL>/api/v1/avatars/128/5",
         "is_special": false
      }
   ]
}
```

---

### Ranking

#### `POST /api/v1/ranking`

Cria uma nova entry nos rankings

-  _Headers_

```
Authorization: Bearer {token}
```

-  _Request_

```json
{
   "score": 50
}
```

-  _Response_

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

#### `GET /api/v1/ranking/normal`

Retorna a lista de todas os dados do ranking normal ordenados de forma decrescente

-  _Headers_

```
Authorization: Bearer {token}
```

-  _Response_

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

#### `GET /api/v1/ranking/global`

Retorna a lista de todos os dados do ranking global ordenados de forma decrescente

-  _Headers_

```
Authorization: Bearer {token}
```

-  _Response_

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
      }
   ]
}
```

#### `DELETE /api/v1/ranking`

Limpa o ranking normal

> [!WARNING]  
> Apenas usuários com acesso de Admin podem fazer essa ação

-  _Headers_

```
Authorization: Bearer {token}
```

-  _Response_

```json
{
   "status_code": 200,
   "message": "Ranking Entries Deleted Successfully"
}
```

---

## Licença

Projeto sob [Licença MIT](./LICENSE)
