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
1. Navigate to `taskflow-client/`
2. Install packages: `npm install`
3. Start the dev server: `ng serve`
4. Open browser at `http://localhost:4200`

Other useful commands:
- `ng build` — creates a production build in the `dist/` folder
- `ng test` — runs unit tests via Karma
- `ng generate component <name>` — scaffolds a new component

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

---

## 🏗️ Backend Architecture

The backend follows a layered structure with clear separation between data, business logic, and API responses.

### Authentication & Authorization
- JWT-based authentication — users receive a signed token on login/register
- Passwords hashed with BCrypt before storage
- `[Authorize]` applied at the controller level, so protected endpoints reject unauthenticated requests before any code runs

### Ownership-Based Access Control
- Every Project and Task request is scoped to the logged-in user via their JWT claims
- A dedicated `GetOwnedProjectAsync()` check ensures users can only access, edit, or delete their own projects and tasks
- Tasks use nested routing (`/api/projects/{projectId}/tasks`) with two-level ownership validation — both the project and the task within it are checked against the requesting user

### DTOs & Validation
- Request and response DTOs keep the API surface clean — clients only send/receive what's necessary (e.g. `projectId` and `userId` are never user-supplied; they come from the URL and JWT respectively)
- Data annotations (`[Required]`, `[MaxLength]`, etc.) validate incoming DTOs via `ModelState`
- Invalid requests return `400 Bad Request` with field-level error details before touching the database

### Error Handling
- Try-catch blocks around database operations handle server/connection-level failures separately from validation errors
- Consistent error responses across controllers (`400` for validation, `404`/`403` for ownership violations, `500` for unexpected failures)

### Database
- Entity Framework Core with SQL Server, using code-first migrations
- Core entities: `Users`, `Projects`, `Tasks` — with a one-to-many relationship from User → Projects → Tasks

---

## 👩‍💻 About

Built by **Rubeena** — BTech Computer Science graduate, .NET Full Stack Developer.  
[LinkedIn](www.linkedin.com/in/rubeena-vs) | [GitHub](https://github.com/rubeenavs)
