# Course Assignment of article plateform

**Option 2: Frontend with Supabase**

This project is a simple **news/article browsing platform** built with **React** and **Supabase**.
Users can browse and search articles publicly, register and log in with email authentication, and submit new articles once authenticated.

---

## Features

* Public article browsing
* Search articles by title
* User registration and login with email & password (email verification enabled)
* Auth-protected article creation
* Articles linked to their authors
* Responsive UI
* Secure backend using Supabase Row Level Security (RLS)

---

##  Motivation

I chose **Option 2 (Frontend with Supabase)** because I wanted to gain experience building a **full-stack application without managing a custom backend**. Using Supabase allowed me to focus on frontend development while still working with authentication, database relationships, and security policies.

### What I liked

* Easy authentication setup with Supabase
* Supabase SDKs handled all the sessions automatically which safe my time.
* Clear integration between frontend and backend
* Row Level Security made data access very explicit and secure

### What I didn’t enjoy

* Debugging RLS policies initially was challenging
* Understanding async behavior in frontend API calls took time

### What I found difficult

* Designing correct RLS rules
* Managing auth-based routing and UI state

### Supabase vs Custom API

Using Supabase significantly reduces development time and complexity, especially for authentication and database management. A custom API offers more flexibility and control but requires more setup, security handling, and maintenance. For smaller projects or rapid development, Supabase is a strong choice.

---


## Tech Stack

* **Frontend:** React (Vite)
* **Backend as a Service:** Supabase
* **Authentication:** Supabase Auth
* **Database:** Supabase PostgreSQL
* **Styling:** CSS / Tailwind CSS
* **Routing:** React Router Dom

---

##  Installation & Configuration

### 1️- Clone the repository

```bash
git clone https://github.com/saimoh03/development-platforms-ca
cd development-platforms-ca
```

### 2️- Install dependencies

```bash
npm install
```

### 3️- Supabase setup

1. Create a project at  [https://supabase.com](https://supabase.com)
2. Enable **Email authentication** (Authentication → Providers)
3. Enable **Email confirmation**
4. Create the following tables in Supabase:

#### `articles` table

| Column     | Type                      |
| ---------- | ------------------------- |
| id         | uuid (PK)                 |
| title      | text                      |
| body       | text                      |
| category   | text                      |
| user_id    | uuid (FK → auth.users.id) |
| created_at | timestamp                 |

5. Enable **Row Level Security (RLS)** on table

---

### 4️- Row Level Security Policies

#### Articles – Public read access

```sql
CREATE POLICY "Public can read articles"
ON articles
FOR SELECT
USING (true);
```

#### Articles – Only authenticated users can create

```sql
CREATE POLICY "Authenticated users can create articles"
ON articles
FOR INSERT
WITH CHECK (auth.uid() = user_id);
```


---

### 5️- Environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Note:  Only the **anon key** is used (safe for frontend).

---

### 6️- Run the project

```bash
npm run dev
```

The app will run locally at:

```
http://localhost:3000
```

---

##  Application Behavior

* Anyone can view articles
* Only logged-in users can create articles
* Login and register links are hidden when the user is logged in
* Create Article page is protected
* Articles are automatically linked to the logged-in user
* Errors from Supabase APIs are displayed in the UI

---


##  Repository Notes

* All work is committed to the **main branch**
* This repository contains:

  * Full frontend React code
  * Supabase configuration and integration
  * No backend server (as per Option 2)
