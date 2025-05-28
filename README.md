# CodeSovereigns

## Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Team Members](#team-members)
- [Mentor](#mentor)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Database Setup](#database-setup)
  - [Prisma Setup](#prisma-setup)
  - [Populate Database](#populate-database)
  - [Start the Server](#start-the-server)

---

## Project Description

CodeSovereigns presents a complete e-commerce website for electronic products like laptops, mobiles, monitors, keyboards, and more. The homepage features clear navigation with dedicated sections for each category. A product filter helps users find items based on their preferences. Customers can browse products, view details, and add them to a cart or wishlist. User accounts allow login and easy preference management.

---

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Build Tool:** Vite
- **Other Tools:** Prisma, npm

---

## Team Members

- **injaamam** (Team Leader)
- **riadkabir45**
- **mony820**

---

## Mentor

- **naimjeem**

---

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm run install:all
```

### Database Setup

1. Open the `psql` shell.
2. Run the following commands:
   ```sql
   CREATE USER soverign WITH PASSWORD 'postgressoverign';
   CREATE DATABASE soverign OWNER soverign;
   ```

### Prisma Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run the following commands:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
3. Update the `DATABASE_URL` variable in the `.env` file by replacing `the password` with your PostgreSQL password.

### Populate Database

```bash
npm run dinit
```

### Start the Server

```bash
npm run dev
```

### Contributing

We welcome contributions of all kinds! Whether it's fixing bugs, improving documentation, adding new features, or suggesting ideas, your help is greatly appreciated. Any type of contribution, big or small, is valued. Just send a pull request.

### Visuals

![x](https://github.com/user-attachments/assets/21e020ea-3a08-4f3b-a7c7-2c444ef7a80b)
