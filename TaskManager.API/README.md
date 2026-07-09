# TaskFlow — Task & Project Management App

A full-stack web application for managing personal projects and tasks, 
built with Angular, ASP.NET Core Web API, and SQL Server.

---

## 🚀 Features

- User authentication with JWT (register, login, logout)
- Create, edit, and delete Projects
- Create, edit, and delete Tasks within projects
- Set task priority (Low / Medium / High) and status (To Do / In Progress / Done)
- Due date tracking on tasks
- Dashboard overview with project and task counts

---

## 🛠️ Tech Stack

**Frontend:** Angular, Bootstrap, TypeScript  
**Backend:** C# ASP.NET Core Web API (.NET 8)  
**Database:** SQL Server, Entity Framework Core  
**Authentication:** JWT (JSON Web Tokens)  
**Tools:** Visual Studio, VS Code, Postman, Git

---

## 📸 Screenshots

### Login Page

### Dashboard

### Project Board

---

## ⚙️ How to Run Locally

### Prerequisites
- .NET 8 SDK
- SQL Server
- Node.js and Angular CLI (`npm install -g @angular/cli`)

```bash
npm install -g @angular/cli
```

### Backend
1. Clone the repo: `git clone https://github.com/rubeenavs/taskflow` 
2. Navigate to `TaskManager.API/`
3. Update the connection string in `appsettings.json` with your SQL Server details
4. Run migrations: `dotnet ef database update`
5. Start the API: `dotnet run`

### Frontend
1. Navigate to `taskmanager-angular/`
2. Install packages: `npm install`
3. Start the app: `ng serve`
4. Open browser at `http://localhost:4200`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and receive JWT |
| GET | /api/projects | Get all projects |
| POST | /api/projects | Create project |
| PUT | /api/projects/{id} | Update project |
| DELETE | /api/projects/{id} | Delete project |
| GET | /api/projects/{id}/tasks | Get tasks in a project |
| POST | /api/projects/{id}/tasks | Create task |
| PUT | /api/tasks/{id} | Update task |
| DELETE | /api/tasks/{id} | Delete task |

---

## 👩‍💻 About

Built by **Rubeena** — BTech Computer Science graduate, .NET Full Stack Developer.  
[LinkedIn](www.linkedin.com/in/rubeena-vs) | [GitHub](https://github.com/rubeenavs)
