This is a User Management System built with React, TypeScript, and Vite. It allows users to:

Search, Add, Edit, and Delete users.
Confirm deletions using React Toastify.
Persist user data using Local Storage.
Navigate through user records with Pagination.

Features
Create, Edit, and Delete Users: Manage user data efficiently.
Search Functionality: Debounced search for optimal performance.
Confirmation Prompts: Using React Toastify for better UX.
Local Storage Integration: Data persistence across browser sessions.
Pagination: For seamless navigation.
Performance Optimizations:
useCallback and useMemo for optimized renders.
React.memo to avoid unnecessary re-renders.

Tech Stack
Vite (for fast development and build)
React (with TypeScript)
React Icons for UI icons
React Toastify for notifications
Tailwind CSS for styling
Local Storage for data persistence

Installation and Setup
1. Clone the repository like so..
git clone https://github.com/your-username/ibcscorp-user-management.git
cd ibcscorp-user-management

2. Install dependencies by running..
npm install

3. Start the development serever by running..
npm run dev

Note: React + TypeScript + Vite
This project uses React + TypeScript powered by Vite for fast development with Hot Module Replacement (HMR).
Currently, two official plugins are available:

@vitejs/plugin-react uses Babel for Fast Refresh.
@vitejs/plugin-react-swc uses SWC for Fast Refresh.
This project uses @vitejs/plugin-react for optimal development experience.

Configure PaserOption..
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})

Install React ESLINT Plugin
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the React version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the React plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})

Project Structure..
src
│   main.tsx
│   App.tsx
└───components
│       UserList.tsx
│       SearchBar.tsx
│       Pagination.tsx
│       EditUserModal.tsx
│       AddUserModal.tsx
│
└───ui
        dataService.ts
|   hooks
        useDEbounce.ts

Usage
Create New User: Click on the "Create New Item" button.
Edit User: Click the edit icon (✏️) on the user's card.
Delete User: Click the trash icon (🗑️) and confirm with React Toastify.
Search: Start typing in the search bar for live filtering.
Pagination: Navigate through users using the pagination component.

Optimization Techniques Used
useCallback: Memoized event handlers to prevent unnecessary re-renders.
useMemo: Memoized derived state for search and pagination.
React.memo: Used for memoizing child components (SearchBar, Pagination, etc.).

Dependencies
Vite: ^6.x
React: ^19.x
TypeScript: ^5.x
React Icons: ^5.x
React Toastify: ^11.x
Tailwind CSS: ^4.x