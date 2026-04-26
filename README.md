API para adoção de animais

```bash
# 1. Instale as dependências
yarn

# 2. Configure o ambiente
cp .env.example .env

# 3. Suba o banco de dados (PostgreSQL)
docker-compose up -d

# 4. Gere as tabelas no banco
npx prisma migrate dev

# 5. Inicie a API
yarn dev

# 6. Importa o arquivo CSV para a API
yarn csv

# 7. Visualize os dados no navegador
npx prisma studio
```
---

### POST /orgs
 Rota para cadastrar uma Organização 

Body:
 
```json
  {
    "name": "Org name",
    "email": "org@primeira.org.com",
    "password": "123456",
    "city": "address org",
    "phone": "1199999999"
  }
```

---

### POST /orgs/auth
 Rota de login para uma ORG

 Body:

```json
  {
    "email": "org@primeira.org.com",
    "password": "123456"
  }
```

---

### POST /pets
 Rota para cadastrar um pet (A org precisa estar logada para fazer o cadastro)

 Body:

```json
  {
    "name": "my pet",
    "description": "about my pet",
    "age": "1",
    "adopted": false, // parâmetro opcional
    "images": ["my-pet.png"],
    "petAttributes": [] // parâmetro opcional
  }
```

---

### POST /pets/attributes
 Rota para cadastrar as características de um pet

  Query:

```json
  "petId": "f4eae614-67a6-48bf-8007-ffb4afbc38fa"
```

 Body:

```json
  {
    "petAttributes": []
  }
```

---


### GET /pets
 Rota para listar pets

 Query:

```json
  "city": "Fortaleza",
  "petAttributes": "dog, cat" // parâmetro opcional
```

---


### GET /pets/details
 Rota para visualizar os detalhes de um pet

 Query:

```json
  "petId": "f4eae614-67a6-48bf-8007-ffb4afbc38fa"
```
