# 🚀 Job Portal Application

A full-stack Job Portal built with modern web technologies, developed as part of a learning journey following real-world concepts. This project leverages the latest features in Next.js, React, and server-side database management.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

## ✨ Features

- **User Authentication**: Secure Login and Registration system using `argon2` for password hashing.
- **Role-Based Routing**: Dedicated routes for Applicants and Employer Dashboard.
- **Job Listings & Management**: Create, edit, and browse jobs.
- **Rich Text Editing**: Integrated **TipTap** editor for formatting job descriptions.
- **Form Handling & Validation**: Robust forms powered by **React Hook Form** and **Zod**.
- **File Uploads**: Resume and image uploads via **UploadThing**.
- **Modern UI/UX**:
  - Fully responsive design using **Tailwind CSS v4**.
  - Accessible components from **Radix UI**.
  - Dark mode support via **next-themes**.
  - Toast notifications via **Sonner**.
- **Database**: Relational data mapped via **Drizzle ORM** configured for **MySQL**.

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5 (App Router, Turbopack)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Radix UI, Lucide Icons, tw-animate-css
- **Database**: MySQL, Drizzle ORM
- **Forms**: React Hook Form, Zod
- **Utilities**: UploadThing, TipTap, date-fns

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- MySQL database

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd jobPortal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add the necessary environment variables:
   ```env
   # Database Configuration (Example)
   DATABASE_URL="mysql://username:password@localhost:3306/job_portal"
   
   # UploadThing Configuration
   UPLOADTHING_TOKEN="your_token"
   ```

4. **Database Migrations:**
   Run Drizzle ORM migrations to set up your schema.
   ```bash
   npm run generate
   npm run migrate
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `src/app/` - Next.js App Router (Pages & Layouts)
  - `(applicants)/` - Applicant-facing routes
  - `employer-dashboard/` - Employer-facing routes
  - `jobs/` - Job listing and detail routes
  - `login/` & `register/` - Authentication routes
  - `api/` - Backend API routes

## 🤝 Contributing

This project is actively maintained and open-source! Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/SanthoshReddy-5/jobPortal/issues) if you want to contribute.

To contribute:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📚 Acknowledgments

This project is inspired by and built following along with tutorials from the **Thapa Technical** YouTube channel, aiming to master full-stack web development using modern best practices.
