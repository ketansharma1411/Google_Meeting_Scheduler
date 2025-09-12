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
```bash
### 1. Clone repo
git clone https://github.com/ketansharma1411/google_calendar_meeting_scheduler.git
cd google_calendar_meeting_scheduler
```
```bash
### 2. Install dependencies
npm install
```
```bash
### 3. Run frontend
npm start
```
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

## 📸 Screenshots  

### 🔧 AI Agent Workflow (n8n)  
![AI Agent Workflow](https://drive.google.com/uc?export=view&id=1ZoqL-_LZbilw1xTt2DtG9sbzH5JmabR-)  

### 🖥️ Frontend UI (Bolt AI React)  
![Frontend UI](https://drive.google.com/uc?export=view&id=15qlPdaK1edpPAHUiU6E3ET7_nGQVLzP-)  


---

## 📜 License  
Licensed under the **MIT License**.  
