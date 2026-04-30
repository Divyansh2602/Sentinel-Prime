# 🛡️ Sentinel Prime

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Sentinel Prime** is an enterprise-grade Vulnerability Management & Remediation platform. It provides a fortified interface for security operatives to monitor infrastructure health, track CVEs, and orchestrate rapid remediation flows.

---

## ✨ Key Features

- 🔒 **Unified Auth**: Secure JWT-based authentication with encrypted operative credentials.
- 📡 **Global Scan**: Automated dependency mapping and configuration auditing.
- 📊 **Security Metrics**: High-density dashboard with real-time health scoring and alert prioritization.
- 🛠️ **Remediation Hub**: Intelligent fix suggestions with integrated code diffing.
- 🌫️ **Glassmorphic UI**: Premium "Dark Mode" aesthetic using curated HSL palettes and backdrop blurs.

---

## 🛠️ Architecture

### Backend (`/backend`)
- **Framework**: FastAPI (Python 3.13)
- **Database**: MongoDB (Motor Async Driver)
- **Security**: Passlib (Bcrypt) & PyJWT
- **Validation**: Pydantic v2

### Frontend (`/frontend`)
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Custom HSL System)
- **Routing**: React Router v7
- **Icons**: Material Symbols Outlined

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- MongoDB instance (Local or Atlas)

### 1. Clone & Setup Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Environment Variables
Create a `.env` in the root (or set directly in `main.py` for dev):
```env
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_super_secret_key
```

---

## 📸 Interface Preview

*Note: The interface uses a high-density "Sovereign Sentinel" design language.*

| Dashboard | Remediation Hub |
|-----------|-----------------|
| ![Dashboard](https://via.placeholder.com/400x225?text=Sentinel+Dashboard) | ![Remediation](https://via.placeholder.com/400x225?text=Sentinel+Remediation) |

---

## ⚖️ License
Distributed under the MIT License. See `LICENSE` for more information.

---
Developed with ⚡ for high-trust security operations.
