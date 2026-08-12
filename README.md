# Inventory Management

A full-stack Inventory Management System built using Laravel REST API, React.js, MySQL, and Laravel Sanctum.

## Tech Stack

- Laravel
- React.js
- MySQL
- Laravel Sanctum
- Bootstrap
- Axios

## Features

- User Authentication (Login/Logout)
- Product Management
- Category Management
- Dashboard
- Protected APIs

## Installation

### Backend

```bash
git clone [<repository-url>] : (https://github.com/azimkhan07/inventory-management)
cd backend

composer install

cp .env.example .env

php artisan key:generate
```

Configure your MySQL database in the `.env` file.

Run:

```bash
php artisan migrate --seed
```

Start Laravel:

```bash
php artisan serve
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

## Test Login

Email:

```
admin@test.com
```

Password:

```
password
```

## API Authentication

Laravel Sanctum is used for API authentication.
