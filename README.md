# Portfolio Workflow Documentation

This project is a React + Vite portfolio website for Sanjaykumar D K. It is a frontend-only experience with animated sections, smooth scrolling, and a contact form that sends messages through EmailJS.

## 1. Project Overview

The portfolio is a single-page application that presents:
- a hero section with intro and social links
- an about section with skills and tech stack
- a qualifications section
- a projects section
- a contact section with a working contact form
- a footer and back-to-top experience

## 2. High-Level Workflow

1. The browser loads the app from `index.html`.
2. `src/main.jsx` mounts the React app into the `#root` element.
3. `src/App.jsx` initializes the global experience:
   - smooth scrolling with Lenis
   - cursor spotlight effect
   - navigation and all major sections
4. Each section is rendered as a React component:
   - `Navbar`
   - `Hero`
   - `About`
   - `Qualifications`
   - `Projects`
   - `Contact`
   - `Footer`
   - `BackToTop`
5. When a user interacts with the contact form, the form data is validated and sent using EmailJS.
6. The site is deployed on Vercel and served as a static frontend.

## 3. Component Flow

```text
index.html
  -> src/main.jsx
  -> src/App.jsx
  -> Navbar + Hero + About + Qualifications + Projects + Contact + Footer + BackToTop
```

## 4. Main Features and Behavior

### Hero Section
- Displays the personal introduction and animated role text.
- Includes social links for GitHub, LinkedIn, and LeetCode.
- Uses Framer Motion for entrance animations.

### About Section
- Shows the personal bio and the technology stack.
- Displays categories such as frontend, backend, databases, and tools.

### Projects Section
- Shows featured projects with descriptions and GitHub links.
- Helps visitors quickly explore the developer's work.

### Contact Section
- Contains a form for name, email, subject, and message.
- Validates required fields before submission.
- Sends the form through EmailJS using the configured service and template.

### Extra UI Enhancements
- Smooth scrolling with Lenis
- Animated transitions with Framer Moti
- Scroll progress indicator
- Back-to-top button
- Cursor spotlight effect on pointer devices

## 5. Backend/Service Connection

This portfolio does not use a custom backend server.

The contact form is connected to EmailJS, which acts as the delivery service for the form submissions. In other words:
- frontend collects the form data
- EmailJS sends it to the configured email service
- the user receives a submitted message

## 6. Project Structure

```text
src/
  components/
    About/
    BackToTop.jsx
    CardSwiper/
    CertSwiper/
    Contact/
    Footer/
    Hero/
    Navbar/
    Projects/
    Qualifications/
    ScrollProgress.jsx
  hooks/
    useInView.js
  App.jsx
  main.jsx
```

## 7. Tech Stack

- React 19
- Vite
- Framer Motion
- Lenis
- CSS for styling
- EmailJS for contact form delivery

## 8. Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 9. Deployment

The project is configured for Vercel deployment using `vercel.json`.

Typical deployment flow:
1. Push code to GitHub
2. Connect the repository to Vercel
3. Deploy automatically
4. The frontend is served as a static site

## 10. Notes

- The contact form depends on EmailJS credentials configured in `src/components/Contact/Contact.jsx`.
- The resume link points to `/resume.pdf`, so the file should be available in the public folder.
- The project uses Vite's default static asset handling.
