# Career Compass — Career Navigation & Pivot Coach

Career Compass is a frontend-only career preparation dashboard built with React and Vite. It guides users from interest selection to role-specific skill planning, portfolio projects, interview practice, progress tracking, and application records.

## Run locally

```sh
npm install
npm run dev
```

`npm run build` creates the static site in `dist/`; `npm run preview` serves that production build locally. The app uses hash-based routes and can be deployed to GitHub Pages without a backend.

## Career data and privacy

- Beginner onboarding supports multiple interests and recommends roles only from the selected categories. Career profiles are centralized in `src/data/careerCatalog.js`.
- Role skills, learning resources, roadmaps, projects, and interview questions are curated frontend data. Job requirements are explicitly sample baselines, not live job listings or employer-specific requirements.
- User profiles and progress are stored in browser `localStorage`. Resume PDFs are parsed locally for selectable text; neither the PDF nor extracted resume text is uploaded to a service. Scanned PDFs need information entered manually.
- Mock interview feedback is an on-device keyword and writing-structure rubric, not an AI model, employer evaluation, or hiring prediction.
- This static application has no authentication server, cross-device sync, live job-feed integration, or external AI service. Those capabilities require a future backend/API integration.
