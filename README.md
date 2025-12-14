# Sweet Shop Management System

A comprehensive full-stack web application designed to streamline inventory management, sales, and customer interactions for a modern sweet shop. Built with a strong emphasis on Test-Driven Development (TDD), this project features a secure Flask backend and a dynamic React frontend.

---

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [AI Integration](#-ai-integration)
- [License](#-license)

---

## ✨ Features

### 🔐 Role-Based Authentication
- **Secure Access**: JWT-based authentication ensures data security.
- **User Roles**: Distinct interfaces and permissions for **Admins** (Inventory Managers) and **Customers**.

### 📦 Inventory Management
- **Real-Time Tracking**: Automatic stock deduction upon purchase.
- **Restocking**: Admins can easily replenish stock levels.
- **Visual Indicators**: Low stock and out-of-stock alerts.

### 🍭 Digital Storefront
- **Dynamic Catalog**: Browse a wide variety of sweets with rich details.
- **Smart Search & Filter**: Instantly filter items by category, price range, or name.
- **Interactive UI**: Responsive design with smooth animations and intuitive navigation.

### 🛠️ Admin Dashboard
- **CRUD Operations**: Add, update, and delete sweet listings.
- **Analytics**: At-a-glance view of total inventory and category distribution.

---

## 💻 Technology Stack

### Frontend
- **Framework**: [React.js](https://reactjs.org/) (powered by [Vite](https://vitejs.dev/))
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for rapid, modern UI development.
- **State Management**: [React Query](https://tanstack.com/query/latest) for efficient server state handling.
- **Routing**: [React Router](https://reactrouter.com/) for seamless navigation.
- **Testing**: [Vitest](https://vitest.dev/) for unit and integration testing.

### Backend
- **Framework**: [Flask](https://flask.palletsprojects.com/) (Python) with Blueprints for modularity.
- **Database**: [SQLAlchemy](https://www.sqlalchemy.org/) ORM with SQLite (Development).
- **Authentication**: [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/).
- **Testing**: [Pytest](https://docs.pytest.org/) for robust backend testing.

---

## 📂 Project Structure

```bash
Sweet-Shop-TDD/
├── backend/
│   ├── app/
│   │   ├── routes/         # API Route definitions
│   │   ├── services/       # Business logic layer
│   │   ├── models.py       # Database models
│   │   └── config.py       # App configuration
│   ├── tests/              # Backend verification tests
│   ├── init_db.py          # Database initialization script
│   └── run.py              # Application entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main application views
│   │   ├── contexts/       # React Context (Auth)
│   │   ├── services/       # API integration
│   │   └── test/           # Frontend tests
│   ├── index.css           # Global styles & Tailwind
│   └── main.jsx            # React entry point
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### 1. Verification & Repository Setup
Clone the repository:
```bash
git clone https://github.com/nupur0309/Sweet-Shop-Management-TDD.git
cd Sweet-Shop-Management-TDD
```

### 2. Backend Setup
Initialize the Python environment and database.

```bash
cd backend
# Create and activate virtual environment
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Initialize database with sample data
python init_db.py

# Run the server
python run.py
```
*The backend will start at `http://localhost:5000`*

### 3. Frontend Setup
Install dependencies and start the React app.

```bash
cd frontend
# Install packages
npm install

# Start development server
npm run dev
```
*The frontend will start at `http://localhost:5173`*

### 🔑 Default Credentials

| Role  | Username | Password | Access |
|-------|----------|----------|--------|
| **Admin** | `admin` | `admin123` | Full Access (Inventory Management) |
| **User**  | `user`  | `user123`  | Customer Access (Browsing & Purchasing) |

---

## 📡 API Documentation

### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Authenticate and receive JWT.

### Sweets (Protected)
- `GET /api/sweets`: Retrieve all sweets.
- `GET /api/sweets/search`: Filter sweets by parameters.
- `POST /api/sweets`: Create a new sweet (Admin).
- `PUT /api/sweets/<id>`: Update sweet details (Admin).
- `DELETE /api/sweets/<id>`: Remove a sweet (Admin).

### Inventory (Protected)
- `POST /api/inventory/<id>/purchase`: Decrease stock quantity.
- `POST /api/inventory/<id>/restock`: Increase stock quantity (Admin).

---

## 🧪 Testing

This project adheres to TDD principles to ensure reliability.

### Backend Tests
Run the `pytest` suite to verify API endpoints and business logic.
```bash
cd backend
python -m pytest
```

### Frontend Tests
Run `vitest` to verify component rendering and user interactions.
```bash
cd frontend
npm run test
```

---

## 🤖 AI Integration

This project leverages modern AI tools to enhance development workflow, code quality, and productivity.

### Tools Utilized
- **ChatGPT (OpenAI)**: Acted as an architectural advisor, assisting with Flask blueprint structure, SQLAlchemy relationships, and authenticating flows. It provided rapid solutions for complex backend logic.
- **Cursor (AI IDE)**: Accelerated frontend development by scaffolding React components, generating Tailwind CSS layouts, and assisting with context-aware code completion.
- **Claude (Anthropic)**: Served as a code reviewer and documentation assistant, refining test cases, improving error handling, and helping structure this documentation.

### Philosophy
AI tools were integrated not to replace fundamental understanding, but to act as a "force multiplier"—handling boilerplate, suggesting optimizations, and allowing the focus to remain on core logic and user experience.

---

## 📄 License

This project is licensed under the MIT License.
