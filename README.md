# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Draft Project SetUp

This is the initial setup for the **Routine Builder** project — a web app that helps users create and manage custom routines. Future features will include timers, calendar integrations, and playlist support.

---

## 🚀 Project Setup & Planning
This plan outlines the step-by-step development process for a full-stack Routine App using React (frontend) and MySQL (backend).

### 1. Create GitHub repo
•	Create new repository on GitHub
•	Clone locally
•	Add basic README.md with project goals and stack

### Clone the Repository

```bash
git clone https://github.com/AlexandraEL9/draft-project.git
cd draft-project
```

### 2. Initialize React App
2. Create a React App in the Current Folder
```bash
npx create-react-app .
```
If prompted to install create-react-app, type y.

3. Open the Project in VS Code
```bash
code .
```
```bash
cd routine-app
```

### 3. Clean Boilerplate

🧱 Folder Structure

```bash
src/
├── components/
├── pages/
├── styles/
└── utils/
```

### What is App.js?
`App.js` is the main component of your React application. It serves as the top-level UI layout, and it's the first thing rendered by index.js. Think of it like the `<body>` of a traditional HTML page — it controls what appears on screen.

### index.js
🔍 Purpose:
`index.js` is the entry point of your React app. It's the file that tells React:
- What component to render (App)
- Where in the HTML to inject it (<div id="root"> in index.html)

### index.css
🔍 Purpose:
 This file usually holds global CSS styles, resets, or base typography.
- It's applied before individual component styles like App.css.

📂 Typical uses:
- Set base font family or background color
- Reset margin/padding for all elements
- Define CSS variables or utility classes

### App.css
🔍 Purpose:
- App.css contains component-specific styles for the App.js component.
- It’s imported directly in App.js, so its styles apply only when App is rendered.
- This keeps styling modular and scoped to each component (a core React philosophy).

📂 Typical Uses:
- Style elements defined inside App.js (e.g. headings, sections, layout)
- Customize appearance of the homepage or main app view
- Apply CSS classes used only within App.js

| File        | Scope                 | Typical Use                             |
| ----------- | --------------------- | --------------------------------------- |
| `index.css` | Global (entire app)   | Reset styles, base fonts/colors         |
| `App.css`   | Local (just `App.js`) | Page layout, headings, paragraphs, etc. |

### 4. Install Essentials

```bash
npm install react-router-dom bootstrap axios
```

### 5. Set Up Routing

- Wrap app in `<BrowserRouter>`
    - In index.js, wrap the <App /> component with <BrowserRouter>:
    index.js
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Import
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>   {/* ✅ Wrap App */}
    <App />
  </BrowserRouter>
);
```

✅ 2. Create your page components
Create one file per page inside src/pages/:
- Create route skeletons:
  - `Landing.js`
  - `Login.js`
  - `Routines.js`
  - `EditRoutine.js`
  - `PlayRoutine.js`
  - `OurTeam.js`

```bash
src/pages/
├── Landing.js
├── Login.js
├── Routines.js
├── EditRoutine.js
├── PlayRoutine.js
└── OurTeam.js
```

- **Create page skeletons**
```jsx
import React from 'react';

function Landing() {
  return <h1>Welcome to Routine App</h1>;
}

export default Landing;
```
Do the same for the others — just return a simple <h1> placeholder for now.

-**Define routes in `App.js` or create `AppRoutes.js`**
### Set up routes
Update your `App.js` file:

```jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Routines from './pages/Routines';
import EditRoutine from './pages/EditRoutine';
import PlayRoutine from './pages/PlayRoutine';
import OurTeam from './pages/OurTeam';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/edit/:id" element={<EditRoutine />} />
        <Route path="/play/:id" element={<PlayRoutine />} />
        <Route path="/team" element={<OurTeam />} />
      </Routes>
    </div>
  );
}

export default App;
```
---

🧪 Run the App
```bash
npm start
```
This will open your app at http://localhost:3000

### Fixes Applied
✅ 1. Prevent node_modules from being committed
Ensure .gitignore contains:
```gitignore
/node_modules
/.pnp
.pnp.js
```
If node_modules/ was already committed, remove it from Git tracking:
```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules from version control"
```
✅ Status
- GitHub repo cloned
- React app scaffolded
- .gitignore verified
- VS Code setup
- App runs locally

---

## 🌐 Phase 2: UI Foundation

### 1. Create Page Skeletons

- Add `<h1>` or placeholder content to each page *(done above*)

### 2. Design Reusable Components

- `Navbar.js`
- `Footer.js`
- `Button.js`, `FormField.js`, etc.

#### Create Navbar

1. Create navbar component
```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Create this CSS file for styling

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">RoutineApp</Link>

      <button 
        className="hamburger" 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {menuOpen && (
        <div className="menu">
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/routines" onClick={() => setMenuOpen(false)}>Routines</Link>
          <Link to="/team" onClick={() => setMenuOpen(false)}>Our Team</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
```

2. Style
```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: darkslategray;
  color: white;
  padding: 1rem;
}

.logo {
  text-decoration: none;
  font-weight: bold;
  color: white;
  font-size: 1.2rem;
}

.hamburger {
  font-size: 1.5rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.menu {
  position: absolute;
  right: 1rem;
  top: 3.5rem;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
}

.menu a {
  padding: 0.5rem;
  text-decoration: none;
  color: black;
}

.menu a:hover {
  background-color: #eee;
}
```

3. Add to landing page
```jsx
import React from 'react';
import Navbar from '../components/Navbar';

function Landing() {
  return (
    <>
      <Navbar />
      <h1>Welcome to the Routine App</h1>
    </>
  );
}

export default Landing;
```

4. Add to other relevant pages

- **Import the component**
At the top of any page file (e.g., `Login.js`, `Routines.js`, etc.), import the Navbar:
```js
import Navbar from '../components/Navbar';
```

- **Include It in the Return Block**
Wrap your page content with the `<Navbar />` like this:
```jsx
function Login() {
  return (
    <>
      <Navbar />
      <h1>Login Page</h1>
      {/* Your login form goes here */}
    </>
  );
}
```

#### Alternative as Navbar is on every page!!
Using a Layout Component is the cleanest and most scalable approach — you define your persistent layout (e.g. Navbar + Footer) once, and then insert your routed pages inside it.

✅ How to Use a Layout Wrapper for Shared Components
🔧 1. Create a Layout.js File
In your src/components folder:
```jsx
// src/components/Layout.js
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
```
- `Outlet` is a placeholder that renders the child route component.
- Navbar + Footer stay consistent across all pages.

**🛠️ 2. Update Your Routes in App.js**
Now nest your routes under a route that uses <Layout />:
```jsx
// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';

import Layout from './components/Layout';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Routines from './pages/Routines';
import EditRoutine from './pages/EditRoutine';
import PlayRoutine from './pages/PlayRoutine';
import OurTeam from './pages/OurTeam';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/edit/:id" element={<EditRoutine />} />
          <Route path="/play/:id" element={<PlayRoutine />} />
          <Route path="/team" element={<OurTeam />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
```

Do same with footer.

Ensure footer is always stuck to bottom of page with css
In App.css:
```css
/* App.css or global.css */
html, body, #root {
  height: 100%;
  margin: 0;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1; /* Pushes the footer down */
  padding: 1rem;
}
```
✅ Now:
- Navbar and Footer are shown automatically on every page
- Each page file only contains its unique content — clean and efficient

#### Landing page
**Component Plan**
| Section       | Component Name                            | Notes                                                            |
| ------------- | ----------------------------------------- | ---------------------------------------------------------------- |
| Top Nav       | `Navbar.js`                               | Already created                                                  |
| Hero Section  | `Hero.js`                                 | Contains heading, supporting text, image, and "Log In" button    |
| Feature Cards | `FeaturesCarousel.js` or `FeatureCard.js` | Reusable components with props for title, description, and image |
| Footer        | `Footer.js`                               | Already created                                                  |

**Colour Tokens**
```css
:root {
  --text-color: #5F5C60;
  --white: #FFFFFF;
  --peach: #FCF3E2;
  --pink: #FCEBDD;
  --light-pink: #FFC9D2;
  --pastel-blue: #B7D6FF;
}
```

**Add component files to project folder:**
```bash
src/
├── components/
│   └── Hero.js
│   └── Hero.css
```

**Build Hero Component**
```jsx
// import files
import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';

// create function
```

#### Carousel Component
**Add Files**
```bash
src/components/Carousel.js
src/styles/Carousel.css
```

## 🗄️ Phase 4: Backend Setup

### 1. Set Up Express

```bash
mkdir server
cd server
npm init -y
npm install express mysql2 cors dotenv
```
**untrack node_modules**
Create a .gitignore file in your server/ folder (if it doesn’t exist yet):
```bash
touch .gitignore
```
Add this line to .gitignore: `node_modules/`

If you've already added it to Git:
Run the following commands to untrack the folder:
```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules from version control"
```

### 2. MySQL Connection

✅ Step 1: Create .env for DB Credentials
📁 File: server/.env
This file stores sensitive config (like database credentials) and should not be tracked by Git.
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=routine_app
```
✨ Tip: Add .env to your .gitignore file to keep it private:

```bash
Copy
Edit
echo ".env" >> .gitignore
```

- Create `db.js` for connection pool
📁 File: server/db.js
This file sets up and exports a MySQL connection pool, which improves performance by reusing connections.
```js
// db.js
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
```
pool.promise() gives you promise-based methods (useful with async/await).

The .env values are injected via dotenv.

### 3. Express Routes

- `GET /routines`
- `POST /login`
- `POST /routines`
- `PUT /routines/:id`
- `DELETE /routines/:id`
- `GET /steps?routine_id=x`

### 4. Test with Postman

### Routines Page

# 📋 Routine Builder Database Schema
📋 Step-by-Step Breakdown
1. Back-End: Create the GET /routines route ✅ (We’ll start here in detail)
2. Front-End: Create RoutinesList component
3. Front-End: Fetch routines from backend
4. Front-End: Map and display routines with icons
5. Bonus: Add loading/error states and placeholder

---
