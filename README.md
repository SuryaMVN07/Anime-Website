# Anime Website

A modern anime streaming website built with React, Vite, and Tailwind CSS.

## Features

- 🎬 Browse trending anime
- 🔍 Search for specific anime
- ⭐ Personal watchlist
- 🎨 Beautiful UI with animations
- 📱 Responsive design

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Firebase (for authentication and watchlist)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_APP_ID=your_app_id
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
