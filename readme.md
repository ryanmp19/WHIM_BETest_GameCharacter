<h2>Game Characters</h2>

This application is created for PT WHIM Management Indonesia (Evos E-sports) Back End technical test. This project is made with Test-Driven Development. Tech Stack:
* Language: Javascript
* Web App Framework: Express Js
* Database: PostgreSQL
* ORM: Sequelize
* Test: Jest, Supertest
* Transpiler: Babel

<h3>Documentation</h3>

All Routes need to prefixed with `http://localhost:3000/api/v1`

<h4>Character API</h4>

**URI:** `GET /characters`

**Description:** `Return  All Existing Characters`

**Success Response:**
Code: `200`
Content:
```
[
  {
    id: [integer]
    name: [string]
    power: [string]
    value: [string]
  },
  { ... }
]
```

**Error Response:**
Code: `400` or `500`
Content:
```
{
  message: [string]
}
```

<hr>

**URI:** `POST /characters`

**Description:** `Create A New Characters`

**Data Parameter:**
```
{
  name: [string, required]
  character_code: [integer, required]
  power: [decimal, required]
}

Content-Type: application/json or application/x-www-form-urlencoded
```

**Success Response:**
Code: `201`
Content:
```
{
  "message": [string]
  "created: {
    id: [integer]
    name: [string]
    power: [string]
    value: [string]
  }
}
```

**Error Response:**
Code: `400` or `500`
Content:
```
{
  message: [string]
}
```

<hr>

**URI:** `PUT /characters/{characterID}`

**Description:** `Update Name or Power Of A Character Based On ID`

**Data Parameter:**

```
{
  name: [string]
  power: [decimal]
}

Content-Type: application/json or application/x-www-form-urlencoded
```

**Success Response:**
Code: `201`
Content:
```
{
  "message": [string]
  "updated: {
    id: [integer]
    name: [string]
    power: [string]
    value: [string]
  }
}
```

**Error Response:**
Code: `400` or `403` or `500`
Content:
```
{
  message: [string]
}
```

<hr>

<h3>Database Structure</h3>

| Fields | Type |
| :--- | :--- |
| `id` | `integer` |
| `name` | `string` |
| `power` | `decimal` |
| `value` | `decimal` |
| `createdAt` | `date` |
| `updatedAt` | `date` |
