
# 🔀 Combination Generator API

A Node.js RESTful API for generating combinations based on input item IDs and a desired length, then storing and retrieving them using MySQL.

## 📦 Features

- Accepts item IDs and generates all unique combinations of a given length.
- Resolves item IDs to their names from the database.
- Stores combinations and references in a structured way.
- Returns a unique `id` for each generated request for future reference.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/combination-generator-api.git
cd combination-generator-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the root directory with your MySQL database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdbname
```

---

## 🗃️ Database Schema

Run these SQL queries to set up the necessary tables:

```sql
CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE combinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  items JSON NOT NULL
);

CREATE TABLE responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  combination_ids JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Add sample data to `items` for testing:

```sql
INSERT INTO items (name) VALUES 
('A1'), ('B1'), ('B2'), 
('C1'), ('C2'), ('C3'), ('C4'), ('C5'), ('C6'), 
('D1');
```

---

## 🧪 API Usage

### Endpoint

```http
POST /api/v1/generate
```

### Request Body

```json
{
  "items": [1, 2, 6, 1],
  "length": 3
}
```

### Successful Response

```json
{
  "id": 12,
  "combination": [
    ["A1", "B1", "C1"],
    ["A1", "B1", "C2"],
    ...
  ]
}
```

- `id`: ID from the `responses` table.
- `combination`: Array of item name combinations.



## 🧰 Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [dotenv](https://www.npmjs.com/package/dotenv)

