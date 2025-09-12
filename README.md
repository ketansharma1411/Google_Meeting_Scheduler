# Google Calendar Meeting Scheduler  

An **AI-powered meeting scheduler** that lets users **create, update, and delete Google Calendar events** using natural language.  
Built with **React (Bolt AI)** for frontend and **n8n AI** for backend automation via **Google Calendar API**.  

---

## ✨ Features  
- 📅 Create meetings  
- ✏️ Update meetings  
- ❌ Delete meetings  
- 🤖 AI agent with n8n AI  
- 🔗 Webhook-based communication  

---

## 🛠️ Tech Stack  
- Frontend: React (Bolt AI)  
- Backend: n8n AI  
- API: Google Calendar API  

---

## 🚀 Setup  

### 1. Clone repo
git clone https://github.com/<your-username>/google_calendar_meeting_scheduler.git
cd google_calendar_meeting_scheduler

### 2. Install dependencies
npm install

### 3. Run frontend
npm start

---

## Google Calendar API  
- Enable **Google Calendar API** in [Google Cloud Console](https://console.cloud.google.com/).  
- Create **OAuth credentials** (Client ID & Secret).  
- Add credentials in **n8n workflow**.  

---

### n8n Setup  
- Import workflow JSON from `/n8n-workflow/`.  
- Configure **Webhook + Google Calendar nodes**.  

---

## ⚙️ Usage  
1. Open the app: [http://localhost:3000](http://localhost:3000)  
2. Enter meeting details (e.g., *"Schedule a meeting with John at 10 AM tomorrow"*).  
3. Request flow: **Frontend → n8n AI → Google Calendar API**.  
4. Event is **created, updated, or deleted**.  

---

## 📜 License  
Licensed under the **MIT License**.  
