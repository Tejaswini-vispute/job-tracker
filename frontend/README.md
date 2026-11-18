# JobTrack (React + Vite)

12 pages: Dashboard, My Applications, Application Tracker, Interview Calendar, Find Jobs, Saved Jobs, Analytics & Reports, My Profile, Resume & Documents, Notifications, Settings. Light/Dark/System theme, fully responsive (sidebar becomes a slide-in menu below 900px).

## Panels
Choose **Job Seeker** or **Admin** on the sign in / sign up screen.
- Job Seeker panel: Dashboard, My Applications, Tracker, Calendar, Find Jobs (apply to jobs posted by the admin), Saved Jobs, Analytics, Profile, Documents, Notifications, Settings.
- Admin panel: Dashboard, Manage Jobs (post/delete), Applications (update status, set interview date), Users, Settings.

Demo logins: admin@jobs.com / admin123, tejswini@gmail.com / user123. Admin sign up needs the code ADMIN2026.

## Run
`npm install` then `npm run dev`, open http://localhost:5173. Data is saved in the browser (localStorage); replace the state in `src/App.jsx` with fetch calls to connect Spring Boot.
