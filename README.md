# Fresh Market - Online Vegetable Store

A professional e-commerce application for selling fresh vegetables, built with modern web technologies.

## Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (via TypeORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod

## Features (Implemented)
- **User Authentication**: Register and Login with JWT.
- **Product Listing**: View available vegetables with images and prices.
- **Database Integration**: PostgreSQL connected via TypeORM.
- **Docker Support**: Full `docker-compose` setup for easy deployment.

## Prerequisites
- Node.js (v18+)
- Docker & Docker Compose

## Getting Started

### Quick Start with Docker (Recommended)
You can run the entire application (Database + Backend + Frontend) using Docker:

```bash
docker-compose up --build
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Manual Setup

#### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Ensure you have a PostgreSQL database running and update `.env` with your credentials.

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login to account
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details

## Project Structure
- `frontend/`: React application source code
- `backend/`: Express server source code
- `docker-compose.yml`: Container orchestration
