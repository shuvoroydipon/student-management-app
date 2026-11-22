# Student Management App

## Project Description

A simple Student Management App built with React.js and Vite . Users can add, view, search, edit and delete student information. Student data is saved in the browser's LocalStorage, so it stays even after refresh.

## Technologies Used

- React 19 + Vite
- Plain CSS (responsive, mobile-friendly)
- LocalStorage for data persistence

## Main Features

- **Student Form:** Add a student with Name, Email, Phone Number and Department, with validation (required fields, valid email, valid phone number).
- **Student List:** All students shown in a clean table — Name, Email, Phone and Department.
- **Delete Student:** Delete button for each student, with a confirmation message.
- **Search Student:** Search students by name (case-insensitive).
- **Bonus Features:** Edit Student (click Edit to load a student into the form and update), Total number of students shown, student data saved in LocalStorage.
- 3 sample students are included on first load so the list is not empty — delete them or add your own.

## Installation Instructions

```bash
npm install
```

## How to Run the Project

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

To build for production:

```bash
npm run build
npm run preview
```

## Live Project Link

(Deploy on Vercel/Netlify and paste the live URL here.)

## GitHub Repository

Push this folder to a public GitHub repository (for example `student-management-app`). Do not upload the `node_modules` folder.
