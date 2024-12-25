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
   DATABASE_URL='mysql://user:password@databaseurl:0000/database?sslmode=require'

   JWT_SECRET='xxxxxxxxxxxxxxxxxxxxxxxx'
   JWT_TEMP_SECRET='yyyyyyyyyyyyyyyyyyyyyyy'
   JWT_EXPIRES_IN='15d'

   SMTP_HOST='smtp.gmail.com'
   SMTP_PORT='587'
   SMTP_USER='example@gmail.com'
   SMTP_PASS='xxx xxx xxx xxx'
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
    "avatar_id": 1,
    "name": "Glécio Raimundo",
    "course_id": 1,
    "email": "glecio@prof.ce.gov.br",
    "password": "123456"
}
```

-  _Response_

```json
{
    "status_code": 201,
    "message": "Usuário criado com sucesso.",
    "result": {
        "user": {
            "id": 7,
            "name": "Glécio Raimundo",
            "course_id": 1,
            "course": {
                "name": "Informática"
            },
            "avatar_id": 1,
            "avatar": {
                "path_default": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/default/avatar_1.webp",
                "path_256px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/256/avatar_1.webp",
                "path_128px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/128/avatar_1.webp"
            },
            "is_admin": false
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsImVtYWlsIjoiZ2zDqWNpb0Bwcm9mLmNlLmdvdi5iciIsImlhdCI6MTczNTE0NzI4OSwiZXhwIjoxNzM2NDQzMjg5fQ.Nlx64JgXFTvX34yahIYCoVGY_6yqu8B7InYmgwFxL4g"
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
    "status_code": 200,
    "message": "Usuário logado com sucesso.",
    "result": {
        "user": {
            "id": 7,
            "name": "Glécio Raimundo",
            "course_id": 1,
            "course": {
                "name": "Informática"
            },
            "avatar_id": 1,
            "avatar": {
                "path_default": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/default/avatar_1.webp",
                "path_256px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/256/avatar_1.webp",
                "path_128px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/128/avatar_1.webp"
            },
            "is_admin": false
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcsImVtYWlsIjoiZ2zDqWNpb0Bwcm9mLmNlLmdvdi5iciIsImlhdCI6MTczNTE0NzM2NCwiZXhwIjoxNzM2NDQzMzY0fQ.gUSMlRdCvYcdSNpDpIVJHO6IfPqRb65dMowAWDKJKso"
    }
}
```

#### `POST /api/auth/password-reset/request`

Envia um e-mail que será usada para resetar a senha do usuário

-  _Request_

```json
{
   "email": "glecio@prof.ce.gov.br",
}
```

-  _Response_

```json
{
    "status_code": 200,
    "message": "Email enviado com sucesso. Verifique sua caixa de entrada."
}
```

![Screenshot from gmail](https://i.imgur.com/SgmzB8x.png)

#### `POST /api/auth/password-reset/confirm`

Recebe a nova senha do usuário e muda ela no banco de dados

-  _Headers_

```
Authorization: Bearer {token}
```
> [!NOTE]  
> O token JWT usado nesta requisição é um token temporário (5 minutos) que é enviado no link do e-mail do usuário, como mostado abaixo.

```
https://tabuadadoglecio.vercel.app/password-reset/confirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoiY29udGF0ZXN0ZXNlaWxhMTJAZ21haWwuY29tIiwiaWF0IjoxNzM1MTQ5ODY5LCJleHAiOjE3MzUxNTAxNjl9.dF6FCotMzxR32giSgfp5ptbld4rJxEvvDOCJhOIV2mA
```

> [!TIP]
> No front-end, mantenha as rotas para redefinir a senha do usuário como `/reset-password/request` para a solicitação e `/reset-password/confirm` para o envio da nova senha.

-  _Request_

```json
{
   "new_password": "glecio-3.1415",
}
```

-  _Response_

```json
{
    "status_code": 200,
    "message": "Senha resetada com sucesso."
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
    "message": "Informações do usuário consultadas com sucesso.",
    "result": {
        "id": 1,
        "name": "Glécio Raimundo",
        "max_score": 0,
        "created_at": "2024-12-25T17:21:28.278Z",
        "is_admin": false,
        "course": {
            "id": 1,
            "name": "Informática"
        },
        "avatar": {
            "id": 1,
            "path_default": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/default/avatar_1.webp",
            "path_256px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/256/avatar_1.webp",
            "path_128px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/128/avatar_1.webp"
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
    "avatar_id": 10,
    "course_id": 2
}
```

-  _Response_

```json
{
    "status_code": 200,
    "message": "Informações do usuário atualizadas com sucesso.",
    "result": {
        "id": 7,
        "name": "Glécio Prof",
        "course": {
            "id": 2,
            "name": "Enfermagem"
        },
        "avatar": {
            "id": 10,
            "path_default": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/default/avatar_10.webp",
            "path_256px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/256/avatar_10.webp",
            "path_128px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/128/avatar_10.webp"
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
    "message": "Senha do usuário atualizada com sucesso."
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
    "message": "Avatares listados com sucesso.",
    "result": [
        {
            "id": 1,
            "path_default": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/default/avatar_1.webp",
            "path_256px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/256/avatar_1.webp",
            "path_128px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/128/avatar_1.webp"
        },
        {
            "id": 2,
            "path_default": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/default/avatar_2.webp",
            "path_256px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/256/avatar_2.webp",
            "path_128px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/128/avatar_2.webp"
        },
        {
            "id": 3,
            "path_default": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/default/avatar_3.webp",
            "path_256px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/256/avatar_3.webp",
            "path_128px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/128/avatar_3.webp"
        },
        {
            "id": 4,
            "path_default": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/default/avatar_4.webp",
            "path_256px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/256/avatar_4.webp",
            "path_128px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/128/avatar_4.webp"
        },
        {
            "id": 5,
            "path_default": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/default/avatar_5.webp",
            "path_256px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/256/avatar_5.webp",
            "path_128px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/128/avatar_5.webp"
        }
        //... //
    ]
}
```

---

### Cursos

#### `GET /api/v1/avatars/all`

Retorna a lista de todos os cursos

-  _Response_
```json 
{
    "status_code": 200,
    "message": "Cursos listados com sucesso.",
    "result": [
        {
            "id": 1,
            "name": "Informática",
            "is_special": false,
            "is_active": true
        },
        {
            "id": 2,
            "name": "Enfermagem",
            "is_special": false,
            "is_active": true
        },
        {
            "id": 2,
            "name": "Sist. Energia Renovável",
            "is_special": false,
            "is_active": true
        },
        {
            "id": 2,
            "name": "Guia de Turismo",
            "is_special": false,
            "is_active": true
        },
        //...//
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
    "message": "Entrada no ranking criada com sucesso.",
    "result": {
        "score": 30,
        "user_id": 1
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
    "message": "Entradas do ranking listada com sucesso.",
    "result": [
        {
            "id": 2,
            "score": 24,
            "user": {
                "id": 4,
                "name": "Hiago",
                "course_id": 1,
                "course": {
                    "name": "Informática"
                },
                "avatar_id": 30,
                "avatar": {
                    "path_default": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/default/avatar_30.webp",
                    "path_256px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/256/avatar_30.webp",
                    "path_128px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/128/avatar_30.webp"
                }
            }
        },
        {
            "id": 2,
            "score": 53,
            "user": {
                "id": 6,
                "name": "Mateus Ferreira",
                "course_id": 1,
                "course": {
                    "name": "Informática"
                },
                "avatar_id": 23,
                "avatar": {
                    "path_default": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/default/avatar_23.webp",
                    "path_256px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/256/avatar_23.webp",
                    "path_128px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/128/avatar_23.webp"
                }
            }
        },
        {
            "id": 3,
            "score": 30,
            "user": {
                "id": 1,
                "name": "Glécio Prof",
                "course_id": 2,
                "course": {
                    "name": "Enfermagem"
                },
                "avatar_id": 10,
                "avatar": {
                    "path_default": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/default/avatar_10.webp",
                    "path_256px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/256/avatar_10.webp",
                    "path_128px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/128/avatar_10.webp"
                }
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
    "message": "Entradas do ranking listada com sucesso.",
    "result": [
        {
            "id": 2,
            "score": 24,
            "user": {
                "id": 4,
                "name": "Hiago",
                "course_id": 1,
                "course": {
                    "name": "Informática"
                },
                "avatar_id": 30,
                "avatar": {
                    "path_default": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/default/avatar_30.webp",
                    "path_256px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/256/avatar_30.webp",
                    "path_128px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/128/avatar_30.webp"
                }
            }
        },
        {
            "id": 2,
            "score": 53,
            "user": {
                "id": 6,
                "name": "Mateus Ferreira",
                "course_id": 1,
                "course": {
                    "name": "Informática"
                },
                "avatar_id": 23,
                "avatar": {
                    "path_default": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/default/avatar_23.webp",
                    "path_256px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/256/avatar_23.webp",
                    "path_128px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/128/avatar_23.webp"
                }
            }
        },
        {
            "id": 3,
            "score": 30,
            "user": {
                "id": 1,
                "name": "Glécio Prof",
                "course_id": 2,
                "course": {
                    "name": "Enfermagem"
                },
                "avatar_id": 10,
                "avatar": {
                    "path_default": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/default/avatar_10.webp",
                    "path_256px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/256/avatar_10.webp",
                    "path_128px": "https://raw.githubusercontent.com/luizlealdev/tabuada-glecio-api/refs/heads/master/uploads/images/avatars/128/avatar_10.webp"
                }
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
   "message": "Entradas no ranking deletadas com sucesso."
}
```

---

## Licença

Projeto sob [Licença MIT](./LICENSE)
