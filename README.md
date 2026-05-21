<div align="center">

# Resume Analyzer

AI-powered ATS resume analysis platform built with the MERN stack.

Upload a resume PDF and receive ATS scoring, keyword analysis, recruiter feedback, and AI-powered improvement suggestions.

<br>

[Live Demo](https://resume-analyzer-frontend-a7ud.onrender.com)

<br>

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?logo=render&logoColor=white)
</div>


## Features

- ATS-style resume scoring
- Keyword and skill gap analysis
- AI-powered feedback and suggestions
- Cover letter generation
- Resume history tracking
- Admin dashboard and analytics
- Secure JWT authentication
- Responsive dark/light UI

---

##  Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (React + Vite)                 │
│  Pages: Home, Upload, Result, History, Cover Letter,     │
│         Dashboard, Admin, Login, Register                │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTPS (axios)
                        ▼
┌─────────────────────────────────────────────────────────┐
│              BACKEND (Node.js + Express)                │
│                                                         │
│  /api/users     → Auth (register, login, profile)       │
│  /api/resume    → Upload, History, Delete               │
│  /api/cover-letter → Generate Cover Letter              │
│  /api/admin     → Users, Resumes, Stats                 │
│                                                         │
│  ┌──────────────────┐    ┌──────────────────────────┐   │
│  │  LOCAL ATS ENGINE │    │    AI ENHANCER (Optional)│  │
│  │  atsEngine.js    │ ──▶│    aiEnhancer.js         │   │
│  │  Zero AI needed  │    │    OpenAI / Gemini       │   │
│  └──────────────────┘    └──────────────────────────┘   │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                   MongoDB Atlas                          │
│  Collections: users, resumes, coverletters              │
└─────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS v4, React Router DOM |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs |
| **File Upload** | Multer |
| **PDF Parsing** | pdf-parse |
| **AI Enhancement** | OpenAI API (optional), Gemini API (optional) |
| **Charts** | Recharts (Radar Chart) |
| **Deployment** | Render (Frontend + Backend) |


---

##  Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/jeba57/Resume-Analyzer.git
cd Resume-Analyzer
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_random_secret_key_here
GEMINI_API_KEY=your_gemini_key_here        # optional
OPENAI_API_KEY=your_openai_key_here        # optional
```

Start the backend:

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

##  Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|---|---|---|
| `PORT` | ✅ | Server port (default: 5000) |
| `MONGO_URI` | ✅ | MongoDB Atlas connection string |
| `JWT_SECRET` | ✅ | Secret key for JWT signing |
| `GEMINI_API_KEY` | ⚪ | Google Gemini API key (AI enhancement) |
| `OPENAI_API_KEY` | ⚪ | OpenAI API key (AI enhancement) |


### Frontend (`frontend/.env`)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | ⚪ | Backend URL (auto-detected if not set) |

---

## Project Structure

```
Resume-Analyzer/
│
├── backend/
│   ├── config/
│   │   └── db.js                    
│   ├── controllers/
│   │   ├── authController.js        
│   │   ├── resumeController.js      
│   │   ├── Coverlettercontroller.js 
│   │   └── Admincontroller.js       
│   ├── middleware/
│   │   ├── authMiddleware.js        
│   │   └── uploadMiddleware.js      
│   ├── models/
│   │   ├── User.js                  
│   │   ├── Resume.js                
│   │   └── CoverLetter.js         
│   ├── routes/
│   │   ├── authRoutes.js            
│   │   ├── resumeRoutes.js         
│   │   ├── coverLetterRoutes.js     
│   │   └── adminRoutes.js           
│   ├── services/
│   │   ├── atsEngine.js          
│   │   ├── aiEnhancer.js           
│   │   ├── geminiService.js        
│   │   └── pdfService.js            
│   ├── utils/
│   │   ├── atsPrompt.js
│   │   └── generateToken.js         
│   ├── .env                         
│   ├── package.json
│   └── server.js                    
│
├── frontend/
│   ├── public/
│   │   └── _redirects              
│   ├── src/
│   │   ├── api.js                   
│   │   ├── App.jsx                 
│   │   ├── main.jsx                
│   │   ├── index.css                
│   │   ├── components/
│   │   │   ├── Navbar.jsx           
│   │   │   ├── ATSScoreCard.jsx     
│   │   │   ├── ATSBreakdown.jsx    
│   │   │   ├── StrengthList.jsx     
│   │   │   ├── WeaknessList.jsx     
│   │   │   ├── KeywordMatch.jsx     
│   │   │   ├── SuggestionPanel.jsx 
│   │   │   ├── RecruiterVerdict.jsx 
│   │   │   ├── UploadBox.jsx       
│   │   │   ├── ResumeCard.jsx       
│   │   │   ├── ProtectedRoute.jsx    
│   │   │   └── Loader.jsx          
│   │   └── pages/
│   │       ├── Home.jsx            
│   │       ├── Login.jsx            
│   │       ├── Register.jsx         
│   │       ├── UploadResume.jsx     
│   │       ├── ATSResult.jsx        
│   │       ├── History.jsx          
│   │       ├── CoverLetter.jsx      
│   │       ├── Dashboard.jsx        
│   │       └── Admin.jsx           
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## Contributing

Contributions are welcome.

```bash id="x9qm2r"
git checkout -b feature/your-feature-name
git commit -m "feat: add new feature"
git push origin feature/your-feature-name
```

Open a pull request describing your changes clearly.

Please:

* follow the existing code style
* test changes locally before submitting
* keep pull requests focused and minimal


## License

This project is licensed under the **MIT License** — you are free to use, modify, and distribute this project for personal or commercial purposes.

```
MIT License — Copyright (c) 2026 Jeba Khatun
```

---

