<!-- @format -->

# Van Life (Vite + React)

This is a small Vite + React project that demonstrates React Router and MirageJS for mocking. The project currently uses Firebase (including Firebase Storage for project assets), but you can switch to Mirage or host images locally if you prefer a fully mocked/local setup.

Summary

-    Framework: React 18 + Vite
-    Router: react-router-dom
-    Mock server: miragejs (used in the app)
-    Optional: Firebase scripts for seeding Firestore and storing assets in Firebase Storage

Contents

-    `index.jsx` — app entry
-    `pages/` — route pages (Home, Vans, Host area, etc.)
-    `components/` — shared UI components
-    `firebaseInitialize.js` — script that writes example data to the configured Firebase project
-    `firebaseCheck.mjs` / `firebaseCheck.js` — small helpers to inspect Firestore

Requirements

-    Node.js (v18+ recommended)
-    npm (bundled with Node)

Quickstart (development)

1. Install dependencies

```powershell
npm install
```

2. Start the dev server

PowerShell note: use `;` to chain commands. Example to install then start in one line:

```powershell
npm install ; npm run dev
```

Run dev server:

```powershell
npm run dev
```

Vite will print a local URL (http://localhost:5173 by default). If 5173 is occupied it will try another port (e.g. 5174).

Seeding Firestore (optional)

The project includes `firebaseInitialize.js` which will add example `vans` and `users` documents to the Firebase project configured inside the file. By default it uses the project config already present in the file.

Important safety notes

-    The seeding script writes to the Firebase project defined in `firebaseInitialize.js`. Double-check the `firebaseConfig` object before running if you don't want to modify a production project.
-    The seeder stores raw `password` fields in Firestore for demo purposes only — do NOT do this in production. Use Firebase Authentication for real users.

How to run the seeder

```powershell
# install firebase SDK (if not already present)
npm install firebase

# run the seeder as an ES module:
node --input-type=module -e "import('./firebaseInitialize.js')"

# or run the check helper to inspect seeded data:
node firebaseCheck.mjs
```

Deployment

-    Netlify: [ADD YOUR NETLIFY SITE URL HERE]

Cleaning up seeded data

-    To delete the example documents, either remove them in the Firebase Console or write a small script that deletes documents from the `vans` and `users` collections.

Next steps / suggestions / collab

-    Replace inline demo passwords with Firebase Authentication.
-    Add an instruction file or npm script for seeding that uses the Firestore emulator for safe local testing.

If you want, I can add a safe `npm run seed` script and an emulator-based seeder. Tell me which and I'll add it.
