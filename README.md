# FullStack_Project_React-killuash-1

# Front-End

# 📋 CherryCo

- A aplicação está disponível em full-stack-project-react-killuash-1-h94ne9yr0-killuash-1.vercel.app

## 🚀 Instruções para rodar o projeto

Este projeto consiste em uma aplicação web em Node.js com um cliente front-end em React.

Siga os passos abaixo para executá-lo em sua máquina.

### 🔑 Pré-requisitos

- PostgreSQL instalado na máquina
- Arquivo .env configurado baseado no arquivo .env.example
- Yarn instalado

### 💻 Instalação

Passo a passo para instalação do projeto.

### ▶️ Como rodar

1. Entre na pasta `back-end-nodejs` e rode `yarn`
2. Crie um banco de dados no `PostgreSQL`
3. Rode `yarn migration:run` para rodar as migrations
4. Rode `yarn dev` para inicializar o servidor
5. Entre na pasta `front-end` e rode `yarn`
6. Rode `yarn` dev e acesse a rota disponibilizada no seu navegador de preferência

# Back-end

<h2 align="center" style='font-family: sans-serif'>
	CherryCo API | API REST (Back-end)
</h2>

<p align = "center">
Este é o backend da aplicação CherryCo API para gerenciamento de clientes e contatos.
</p>

<li>A API está disponível em https://cherryco.onrender.com</li>

<h2 align ='center'>Clientes (Endpoints)</h2>

## **Rotas Sem Autenticação**

<li style='font-size: 20px'>Criação de um Cliente:</li>

<br/>

Observação: O campo "phone" precisa ter 11 digitos

`POST /users - FORMATO DA REQUISIÇÃO - STATUS 201`

```json
{
  "name": "lucas souza",
  "password": "12345678",
  "email": "kasa1@mail.com",
  "telephone": "123456456"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /users - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "801c092e-5f74-4bce-b9d1-3a90fbf6e220",
  "name": "lucas souza",
  "email": "kasa1@mail.com",
  "phone": "99934561234",
  "created_at": "2023-03-22T18:03:24.787Z"
}
```

<br/>

<li style='font-size: 20px'>Login do Cliente</li>

<br/>

`POST /login - FORMATO DA REQUISIÇÃO - STATUS 201`

```json
{
  "email": "kasa1@mail.com",
  "password": "12345678"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /login - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imthc2ExQG1haWwuY29tIiwiaWF0IjoxNjgwMjg4MDA1LCJleHAiOjE2ODA3MjAwMDUsInN1YiI6IjgwMWMwOTJlLTVmNzQtNGJjZS1iOWQxLTNhOTBmYmY2ZTIyMCJ9.4YLDJgDGLArBrDETI2TJ3NzwwVqiexi2I1jTjZECjKk"
}
```

Caso dê um erro irá retornar o seguinte erro:

```json
{
  "message": "Incorrect Email or Password"
}
```

## **Rotas Com Autenticação**

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Após o usuário estar logado, ele deve conseguir acessar os contatos que ele adicionou até agora.

> Caso você tente acessar os endpoints sem um token válido receberá o seguinte erro

<br/>

`(Exemplo) POST /contacts - 401 Sem Autorização`

```json
{
  "message": "Invalid token"
}
```

<br/>

> Caso seja informado um id inválido ou diferente do id do usuário logado irá retornar:

```json
{
  "message": "Invalid Id"
}
```

## <br/>

<li style='font-size: 20px'>Podemos acessar um cliente específico utilizando o endpoint:</li>

<br/>

`GET /users/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "87756338-817f-496d-b7e1-c568cfc5e82b",
  "name": "matheus",
  "email": "matheus@gmail.com",
  "phone": "99934561234",
  "registered_date": "2023-03-22T18:03:24.787Z",
  "is_active": true,
  "contacts": []
}
```

<li style='font-size: 20px'>Atualização de um cliente</li>

<br/>

`PATCH /users/:id - FORMATO DA REQUISIÇÃO`

```json
{ "name": "Alice", "email": "warmercolor@gmail.com" }
```

Caso dê tudo certo, a resposta será assim:

`PATCH /clients/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "87756338-817f-496d-b7e1-c568cfc5e82b",
  "name": "Alice",
  "email": "warmercolor@gmail.com",
  "phone": "99934561234",
  "registered_date": "2023-03-22T18:03:24.787Z",
  "is_active": true,
  "contacts": []
}
```

<li style='font-size: 20px'>Podemos deletar um cliente específico utilizando o endpoint:</li>

<br/>

`DELETE /clients/:client_id - FORMATO DA RESPOSTA - STATUS 204`

```json
{}
```

<br/>

<li style='font-size: 20px'>Outra Possível Mensagem de Erro:</li>

<br/>

```json
{
  "message": "Id invalid"
}
```

<h2 align ='center'>Contatos (Endpoints)</h2>

<li style='font-size: 20px'>Criando um contato a partir do cliente logado:</li>

<br/>

`POST /contacts - FORMATO DA REQUISIÇÃO`

```json
{
  "name": "mariana souza",
  "email": "mari@mail.com",
  "telephone": "123456456"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /contacts - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "name": "mariana souza",
  "email": "mari@mail.com",
  "telephone": "123456456",
  "user": {
    "id": "801c092e-5f74-4bce-b9d1-3a90fbf6e220",
    "name": "lucas souza",
    "email": "kasa1@mail.com",
    "telephone": "123456456",
    "created_at": "2023-03-31T18:06:35.003Z"
  },
  "id": "4e0c0e59-ef34-4452-8939-8ba5bf5fcc8f",
  "created_at": "2023-04-01T01:41:47.521Z"
}
```

<li style='font-size: 20px'>Acessando um contato</li>

<br/>

`GET /contacts/:contact_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "4e0c0e59-ef34-4452-8939-8ba5bf5fcc8f",
  "name": "mariana souza",
  "email": "mari@mail.com",
  "telephone": "123456456",
  "created_at": "2023-04-01T01:41:47.521Z"
}
```

<li style='font-size: 20px'>Atualização de um cliente</li>

<br/>

`PATCH /contacts/:contact_id - FORMATO DA REQUISIÇÃO`

```json
{
  "name": "moira",
  "email": "moira@gmail.com"
}
```

<li style='font-size: 20px'>Caso dê tudo certo, a resposta será assim:</li>

`PATCH /contacts/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "name": "moira",
  "email": "moira@gmail.com",
  "telephone": "123456456"
}
```

<li style='font-size: 20px'>Podemos deletar um contato específico utilizando o endpoint:</li>

<br/>

`DELETE /contacts/:id - FORMATO DA RESPOSTA - STATUS 204`

```json
{}
```

<br/>

<li style='font-size: 20px'>Outra Possível Mensagem de Erro:</li>

<br/>

```json
{
  "message": "Invalid id"
}
```
