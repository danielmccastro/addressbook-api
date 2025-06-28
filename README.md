# Addressbook API

A secure and organized RESTful API for managing users and their contact list. Built with **Node.js**, **Express**, **Sequelize**, **JWT**, and **SQLite**.

---

## Features

- User registration and login with JWT authentication  
- Secure CRUD operations for users and contacts  
- Token-based route protection  
- HTTPS support using SSL certificates  
- Clean and modular structure with RESTful routes  

---

## Technologies Used

- Node.js  
- Express.js  
- Sequelize ORM  
- SQLite  
- Bcrypt  
- JSON Web Token (JWT)  

---

## Installation

```bash
git clone https://github.com/your-username/addressbook-api.git
cd addressbook-api
npm install
```

---

## Environment Setup

### Step 1 – Create your `.env` file

```bash
cp .env.example .env
```

---

### Step 2 – Set up SSL certificates for HTTPS

```bash
mkdir cert
cd cert
```

Generate your SSL certificate and key:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout server.key -out server.cert -days 365
```

Your `/cert` directory should contain:

```
/cert
  ├── server.cert
  └── server.key
```

---

## Run the API

```bash
npm start
```

API will be available at:

```
https://localhost:3000/
```

---

## API Endpoints

### Base

| Method | Endpoint | Description         |
|--------|----------|---------------------|
| GET    | `/`      | Welcome message     |

---

### Authentication

#### POST `/login`

**Body Parameters:**

```json
{
  "email": "",
  "password": ""
}
```

| Method | Endpoint | Description             |
|--------|----------|-------------------------|
| POST   | `/login` | Login and receive a JWT |

---

### Users

#### POST `/users`

```json
{
  "email": "",
  "password": ""
}
```

#### PUT `/users/:id_user`

```json
{
  "email": "",
  "password": ""
}
```

| Method | Endpoint           | Auth Required | Description                        |
|--------|--------------------|---------------|------------------------------------|
| POST   | `/users`           | ❌            | Register a new user                |
| GET    | `/users/:id_user`  | ✅            | Get a single user by ID            |
| PUT    | `/users/:id_user`  | ✅            | Update a user (only your own data) |
| DELETE | `/users/:id_user`  | ✅            | Delete a user (only your own data) |

> ⚠️ Users can only update or delete their own data. Validation is done via JWT token.

---

### Contacts

#### POST `/contacts`

```json
{
  "first_name": "",
  "last_name": "",
  "email": "",
  "phone_number": "",
  "address": ""
}
```

#### PUT `/contacts/:id_contact`

```json
{
  "first_name": "",
  "last_name": "",
  "email": "",
  "phone_number": "",
  "address": ""
}
```

| Method | Endpoint                | Auth Required | Description             |
|--------|-------------------------|---------------|-------------------------|
| GET    | `/contacts`             | ✅            | Get all user's contacts |
| POST   | `/contacts`             | ✅            | Create a new contact    |
| PUT    | `/contacts/:id_contact` | ✅            | Update a contact by ID  |
| DELETE | `/contacts/:id_contact` | ✅            | Delete a contact by ID  |

---

## Authorization Header

For protected routes, include the JWT token in the request header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Example Responses

### Success

```json
{
  "message": "Contact deleted successfully"
}
```

### Error

```json
{
  "error": "Contact not found or not authorized"
}
```