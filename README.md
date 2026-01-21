# Clutch Mind
## Basketball Decision Exploration Tool

**Clutch Mind** is an AI-powered decision-support prototype for basketball: users describe a game situation, and the app returns 5 recommended on-court decisions with explanations (powered by Gemini).
The frontend is built with **React (Vite)**, **Tailwind CSS**, and **shadcn/ui**. 
The backend is a **Spring Boot** application that integrates with **Gemini API** for generating recommendations.

--- 
## 📂 Project Structure 
```text
clutch-mind/
├── backend/                  # Spring Boot backend
│   ├── src/main/java/
│       ├── controller/       # Decision recommendation endpoints
│       ├── service/          # Scenario processing & AI integration
│       ├── model/            # Domain models & enums
│       ├── dto/              # Scenario & decision DTOs
│   ├── src/main/resources/
│       ├── data/             # Clutch scenario JSON dataset
│   ├── pom.xml
│
├── frontend/                 # React application
│   ├── src/
│       ├── components/       # Search form, cards, carousel, skeletons
│       ├── blocks/           # Reusable UI blocks
│       ├── pages/            # Main views
│       ├── styles/           # Tailwind styling
│   ├── vite.config.js
│
└── README.md
```
--- 
## ✨ Features (So Far) 
### 🧩 Backend (Spring Boot) 
- Loads and processes historical clutch possession data from JSON
- Groups play-by-play rows into structured scenarios
- Selects a representative scenario for recommendation
- Integrates Gemini API to generate explainable decision suggestions
### 🎨 Frontend (React) 
- Search bar with smooth expand/collapse animation.
- Game carousel with hover effects and dynamic layout.
- Loading skeleton components.
- Global state management with **GameContext**.
- Search triggers backend requests.
- HeroSection UI with transitions.
---
## 🚀 Running the Project (Current Setup) 
### 🖥️ Backend Requires **Java 21** and **Maven**. 
```bash 
cd backend mvn spring-boot:run
```
Backend runs at: 
``` http://localhost:8080 ``` 
--- 
### 🖥️ Frontend 
```bash 
cd frontend npm install npm run dev
```
Frontend runs at: ``` http://localhost:5173 ``` 
--- 
## 🔌 API Endpoints (Current) 
| Endpoint | Method | Description | 
|----------|--------|-------------| 
| `/api/decision/recommend`| POST | Returns AI-generated decision suggestions for a clutch scenario | 

--- 
## 🧪 Technologies Used 
### Frontend 
- React 18
- Vite
- Tailwind CSS
- shadcn/ui
- React Context
### Backend 
- Spring Boot 3
- Gemini API (early stage)
- Java 21
- Maven
---
## 📌 Current State / To-Do 
### ✔ Already Implemented 
- Scenario-based decision recommendations
- Structured AI prompt design
- Clean, focused frontend UI
- Base Gemini integration
- Loading and interaction states
- Global context structure
- Smooth search animation
### 🔜 Next Steps 
- SQL database for scalable scenario storage 
- Scenario selection based on user input
- Extended analysis across multiple games
- User authentication and access control
- TypeScript migration on the frontend
- Optional: Add Docker later
---
## 📝 Notes 
- No Docker setup yet
— AI is used for interpretation and explanation, not raw data analysis.
- Gemini integration is experimental and will evolve.
- Scenario selection is currently fixed for demonstration purposes.
