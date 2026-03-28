# Product Management System

## Overview

A full stack web application where:

* Admin can add, edit, delete products
* Users can view products

Built using React, Node.js, Express, and PostgreSQL.

---

## Tech Stack

Frontend: React.js (Vite), Axios, React Router
Backend: Node.js, Express.js
Database: PostgreSQL

---

## Features

* Add Product
* View Products
* Edit Product
* Delete Product

---

## Setup Instructions

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Database Setup

```sql
CREATE DATABASE product_management;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price NUMERIC,
    description TEXT,
    image TEXT,
    category VARCHAR(100),
    stock INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Endpoints

* POST /api/products
* GET /api/products
* PUT /api/products/:id
* DELETE /api/products/:id
