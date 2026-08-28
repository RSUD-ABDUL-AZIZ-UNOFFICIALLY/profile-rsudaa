# Profile RSUD A

## Overview

Profile RSUD A is a **Next.js** application built with **TypeScript** and **React**. It serves as a comprehensive portal for the RSUD A hospital, providing features such as:

* **Admin dashboard** for managing hospital data (articles, activities, staff, services, etc.)
* **Public-facing pages** for patients and visitors to view information about services, schedules, and announcements
* **Responsive design** powered by **Tailwind CSS** and **DaisyUI**
* **API integration** via **Axios** and **dotenv** for environment configuration
* **State management** using **React Context** and **React Hook Form** for forms
* **Animations** with **Framer Motion** and **React‑Iframe** for embedded content

The project follows a **file‑based routing** structure (Next.js 13 app directory) and is fully typed with **TypeScript**.

## Tech Stack

```json
{
  "next": "^14.1.0",
  "react": "^18",
  "react-dom": "^18",
  "typescript": "^5",
  "tailwindcss": "^3.4.3",
  "daisyui": "^4.7.3",
  "axios": "^1.6.8",
  "framer-motion": "^10.18.0",
  "react-hook-form": "^7.51.4",
  "sass": "^1.70.0",
  "dotenv": "^16.4.5",
  "js-cookie": "^3.0.5",
  "moment": "^2.30.1",
  "react-cookie": "^7.1.4",
  "react-iframe": "^1.8.5"
}
```

## Project Structure

```
app/
├─ layout.tsx          # Root layout for the app
├─ page.tsx            # Home page
├─ component/          # Reusable UI components
├─ context/            # React context providers
├─ Model/              # TypeScript models for API data
├─ ...                 # Feature folders (admin, artikel, kegiatan, etc.)
public/                # Static assets (images, icons, etc.)
```

The **`app`** directory uses Next.js 13's **app router**. Each feature has its own folder with pages, components, and data models.

## Getting Started

```bash
# Clone the repository
git clone https://github.com/RSUD-ABDUL-AZIZ-UNOFFICIALLY/profile-rsudaa.git
cd profile-rsudaa

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
npm run start
```

## Environment Variables

Create a `.env.local` file at the root of the project and add the required variables. Refer to the `.env.example` if available.

## Contributing

Feel free to open issues or submit pull requests. Please follow the existing coding style and run `npm run lint` before committing.

## License

This project is licensed under the MIT License.
