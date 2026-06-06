# 🎵 Musix Node API

[![Node.js Version](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v5.2.1-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen.svg)](https://www.mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

A professional, scalable backend API for a music streaming service, designed as a Spotify clone. Melodify provides robust music management, role-based access control, and a social layer for artists and listeners to interact.

## ✨ Core Features

- **🔐 Advanced Authentication**: Secure user registration and login using JWT (JSON Web Tokens) and `bcryptjs` for password hashing.
- **🛡️ Role-Based Access Control (RBAC)**: Differentiated permissions for `User`, `Artist`, and `Admin` roles to ensure secure resource management.
- **💿 Music & Album Management**: Full CRUD capabilities for tracks and albums, allowing artists to upload and manage their discography.
- **🖼️ Cloud Image Storage**: Integrated image upload functionality using `Multer` and **ImageKit** for optimized asset delivery.
- **📱 Social Integration**: Implementation of posts and notes to enable community engagement and content sharing.
- **🛠️ Layered Architecture**: Built with a clean separation of concerns following the `Routes` $\rightarrow$ `Middlewares` $\rightarrow$ `Controllers` $\rightarrow$ `Services` $\rightarrow$ `Models` pattern.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: JWT, bcryptjs
- **Storage**: Multer, ImageKit
- **Testing**: Jest
- **Development**: Nodemon, Dotenv

## 📂 Project Structure

```text
backend/
├── src/
│   ├── controllers/      # Request handlers & business logic orchestration
│   │   ├── auth.controller.js
│   │   ├── music.controller.js
│   │   ├── album.controller.js
│   │   ├── post.controller.js
│   │   └── note.controller.js
│   ├── middlewares/      # Express middlewares for auth, validation & error handling
│   │   ├── authenticate.middleware.js
│   │   ├── authorize.middleware.js
│   │   ├── error.middleware.js
│   │   ├── logger.middleware.js
│   │   └── multer.middleware.js
│   ├── models/           # Mongoose schemas & data definitions
│   │   ├── user.model.js
│   │   ├── music.model.js
│   │   ├── album.model.js
│   │   ├── post.model.js
│   │   └── note.model.js
│   ├── routes/           # API endpoint definitions
│   │   ├── auth.routes.js
│   │   ├── music.routes.js
│   │   ├── post.routes.js
│   │   └── note.routes.js
│   ├── services/         # External service integrations (e.g., ImageKit)
│   │   └── storage.service.js
│   └── app.js            # Express application configuration
├── test/                 # Jest test cases
├── .env                  # Environment variables (local)
├── package.json          # Project dependencies & scripts
└── server.js             # Server entry point
```

## ⚙️ Environment Configuration

Create a `.env` file in the root directory and configure the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/melodify

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# ImageKit Storage
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_ID=https://ik.imagekit.io/your_id/
```

## 🛠️ Installation & Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/shahxada20/musix-node-api-backend.git
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create the `.env` file as specified in the [Environment Configuration](#-environment-configuration) section.

4. **Start the server**
   ```bash
   # Development mode with hot-reload
   npm run dev

   # Production mode
   npm start
   ```

5. **Run Tests**
   ```bash
   npm test
   ```

## 🛣️ Core API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new account |
| `POST` | `/auth/login` | Authenticate user & get token |
| `POST` | `/auth/logout` | Clear authentication session |

### 🎵 Music Management
| Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- |
| `GET` | `/music/list` | Get all tracks | All |
| `GET` | `/music/list/:id` | Get specific track details | All |
| `POST` | `/music/add` | Upload a new track | Artist |
| `PATCH` | `/music/update/:id` | Update track metadata/image | Artist |
| `DELETE` | `/music/delete/:id` | Remove a track | Artist |

### 📝 Social & Content
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/posts/all` | Fetch all community posts |
| `POST` | `/posts/create` | Create a new post with image |
| `PATCH` | `/posts/update/:id` | Update post content |
| `DELETE` | `/posts/delete/:id` | Delete a post |
| `GET` | `/notes/all` | Get all system/user notes |
| `POST` | `/notes/` | Create a new note |

---
Developed with ❤️ by [Shahzad](https://github.com/your-github-username)
