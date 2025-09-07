# MERN Store

A minimal **MERN** app (MongoDB + Express + React + Node) to create, list, update, and delete products.

---

## Quickstart

```bash
# 1) Enable pnpm (once)
corepack enable
corepack prepare pnpm@latest --activate

# 2) Clone & install deps
git clone <YOUR_REPO_URL> mern-store
cd mern-store
pnpm install

# 3) Start MongoDB (Docker)
docker run --name mern-mongo -d -p 27017:27017 -v mern_data:/data/db mongo:7

# 4) Configure backend env
printf "PORT=5050\nMONGO_URI=mongodb://localhost:27017/mern_store\n" > backend/.env
# (Windows PowerShell)
# Set-Content -Path backend/.env -Value "PORT=5050`nMONGO_URI=mongodb://localhost:27017/mern_store"

# 5) Run everything (from project root)
pnpm dev

# Frontend: http://localhost:5173
# Backend:  http://localhost:5050
```

---

## Prerequisites

- **Node.js** 18+ (20+ recommended)
- **pnpm** (installed via Corepack)
- **MongoDB**
    - Docker: `mongo:7` image (recommended for local dev), or
    - MongoDB Atlas (cloud), or
    - Local MongoDB install

---

## Project Structure

```
mern-store/
  backend/
    controllers/
      products.controller.js
    db/
      db.js
    models/
      product.model.js
    router/
      product.route.js
    server.js
    .env                  # you create this (see below)
  frontend/
    src/
      components/
        Navbar/
          index.jsx
        ProductCard/
          index.jsx
      pages/
        Create/
          index.jsx
        Home/
          index.jsx
      store/
        product.js
      App.jsx
      main.jsx
    index.html
    vite.config.js        # dev proxy: /api -> http://localhost:5050
  package.json            # root scripts to run both apps
  pnpm-workspace.yaml
  README.md
```

---

## Installation

1. **Clone the repo & install dependencies**
   ```bash
   git clone https://github.com/vorobel/mern-store
   cd mern-store
   corepack enable
   corepack prepare pnpm@latest --activate
   pnpm install
   ```

2. **Start MongoDB**

   **Option A — Docker (recommended)**
   ```bash
   docker run --name mern-mongo -d -p 27017:27017 -v mern_data:/data/db mongo:7
   ```
   Mongo URI: `mongodb://localhost:27017/mern_store`

   **Option B — MongoDB Atlas (cloud)**
    - Create a free cluster, add a DB user, allow your IP.
    - Copy your connection string (e.g., `mongodb+srv://...`).

   **Option C — Local install**
    - Ensure MongoDB is running and reachable on port `27017`.

3. **Create backend environment file**

   Create `backend/.env` with:

   ```dotenv
   PORT=5050
   MONGO_URI=mongodb://localhost:27017/mern_store
   ```
   > If using Atlas, replace `MONGO_URI` with your Atlas URI.

---

## Running the App

**Single command from the project root:**
```bash
pnpm dev
```

- Frontend (Vite): **http://localhost:5173**
- Backend (Express): **http://localhost:5050**

The frontend is configured with a **Vite proxy** so any request to `/api/**` is forwarded to the backend—no CORS during development.

---

## API Endpoints

Base URL (dev): `http://localhost:5050/api`

| Method | Path                | Description        | Body (JSON)                                         |
|-------:|---------------------|--------------------|-----------------------------------------------------|
|   GET  | `/products`         | List products      | —                                                   |
|  POST  | `/products`         | Create product     | `{ "name": string, "price": number, "image": string }` |
|   PUT  | `/products/:id`     | Update product     | —                                                     |
| DELETE | `/products/:id`     | Delete product     | —                                                   |

**Example (curl):**
```bash
# Create
curl -X POST http://localhost:5050/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":19.99,"image":"https://picsum.photos/400"}'

# List
curl http://localhost:5050/api/products

# Update (replace <id>)
curl -X PUT http://localhost:5050/api/products/<id> \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name","price":25,"image":"https://picsum.photos/401"}'

# Delete (replace <id>)
curl -X DELETE http://localhost:5050/api/products/<id>
```

---

## Root Scripts

Run these **from the project root**:

```json
{
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "dev:frontend": "pnpm --filter frontend dev",
    "dev:backend": "pnpm --filter backend dev",
    "build": "pnpm -r build",
    "start": "pnpm --filter backend start",
    "lint": "pnpm -r lint"
  }
}
```

Workspaces (root `pnpm-workspace.yaml`):
```yaml
packages:
  - "frontend"
  - "backend"
```

---

## Troubleshooting

- **Mongo connection error (`ECONNREFUSED`)**  
  Ensure MongoDB is running (Docker container up, or Atlas URI correct).

- **CORS errors**  
  Use the dev proxy (call **`/api/...`** from the frontend); do not hardcode the backend origin in frontend during dev.

- **Port already in use**  
  Change `PORT` in `backend/.env`. If you change it, update the `frontend/vite.config.js` proxy target.

- **Products not showing**  
  Check DevTools → Network for `GET /api/products` and backend logs for errors.

---

## Tech Stack

- **Backend:** Node.js, Express 5, Mongoose
- **Frontend:** React (Vite), Chakra UI, React Router, Zustand
- **Database:** MongoDB
