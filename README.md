# 🏗 MOGEN Bathroom Product Catalog Website

A premium corporate website for a sanitaryware brand, focused on product catalog display, brand positioning, and SEO optimization.

## 🚀 Project Overview

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Backend**: Strapi 5 (Headless CMS)
- **Database**: PostgreSQL (Dockerized)
- **Architecture**: REST API with Server Components

---

## 🛠 Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: v20 or newer
- **Docker Desktop**: Running (required for the database and CMS)
- **npm**: v10 or newer

---

## 🏃‍♂️ Getting Started

### 1. Start the Backend (Docker)

The backend consists of a PostgreSQL database and the Strapi CMS.

1.  From the root directory, run:
    ```bash
    docker compose up -d
    ```
2.  The Strapi Admin Panel will be available at: [http://localhost:1337/admin](http://localhost:1337/admin)
3.  **Initial Setup**:
    - Create your first Admin User.
    - Go to **Settings** > **Users & Permissions Plugin** > **Roles** > **Public**.
    - Under **Permissions**, enable `find` and `findOne` for **Category**, **Collection**, and **Product**.
    - Click **Save**.

### 2. Start the Frontend (Next.js)

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and visit: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```text
.
├── backend/            # Strapi 5 Headless CMS
│   ├── src/api/        # Content types (Category, Collection, Product)
│   ├── Dockerfile      # Backend build configuration
│   └── .env            # Backend environment variables
├── frontend/           # Next.js 16 App Router
│   ├── src/app/        # Pages and Routing
│   ├── src/components/ # UI and Layout components
│   ├── src/lib/api.ts  # Strapi API integration logic
│   └── .env.local      # Frontend environment variables
└── docker-compose.yml  # Orchestrates PostgreSQL and Strapi
```

---

## 💡 Development Tips

- **Mock Data**: If the backend is not running, the frontend will automatically fall back to mock data defined in `frontend/src/lib/api.ts` to ensure the UI remains interactive.
- **Styling**: The project uses **Tailwind CSS** for a minimal, premium aesthetic. Custom configurations can be found in `frontend/tailwind.config.ts`.
- **API Logic**: All Strapi fetching logic is centralized in `frontend/src/lib/api.ts`. Use Server Components by default for better SEO and performance.

---

## 📄 License

This project is proprietary. All rights reserved.
