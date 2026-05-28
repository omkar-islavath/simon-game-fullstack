# NeuroPulse

A full-stack memory sequence game inspired by the classic Simon Game.
NeuroPulse challenges players to remember and repeat increasingly complex color sequences while maintaining scores through a persistent leaderboard system.

---

## Live Demo

https://neuropulse-jusn.onrender.com

---

## GitHub Repository

https://github.com/omkar-islavath/NeuroPulse

---

## Features

* User Authentication (Signup / Login)
* Password Reset Functionality
* Interactive Memory Sequence Gameplay
* Persistent Score Saving
* Global Leaderboard
* Responsive UI for Desktop and Mobile
* Full-Stack Deployment

---

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript
* jQuery

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL(Neon deployment)

### Deployment

* Render

---

## Project Structure

```bash
NeuroPulse/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── score.controller.js
│   │   │
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   └── score.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── score.routes.js
│   │   │
│   │   ├── utils/
│   │   │   └── hash.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── package.json
│
├── public/
│   ├── css/
│   │   └── styles.css
│   │
│   ├── js/
│   │   ├── auth.js
│   │   ├── game.js
│   │   ├── leaderboard.js
│   │   └── reset.js
│   │
│   ├── sounds/
│   │
│   ├── login.html
│   ├── game.html
│   ├── leaderboard.html
│   └── forgot-password.html
│
├── assets/
│   ├── login.png
│   ├── game.png
│   ├── leaderboard.png
│   └── resetpassword.png
│
└── README.md
```

---

## How to Play

1. Click **Start Game**
2. Watch the color sequence carefully
3. Repeat the sequence by clicking the buttons
4. Each level adds a new color
5. A wrong click ends the game and saves your score

---

## Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/omkar-islavath/NeuroPulse.git
cd NeuroPulse
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
DATABASE_URL=your_database_connection_string
PORT=3000
```

### 4. Start the Server

```bash
npm run dev
```

### 5. Open in Browser

```bash
http://localhost:3000
```

---

## Future Improvements

* JWT Authentication
* Email-based Password Reset
* Sound Toggle
* Difficulty Levels
* Multiplayer Mode
* User Statistics Dashboard

---

## Author

**Omkar Islavath**

GitHub: https://github.com/omkar-islavath
