// index.js is the entry point of your React app. It's the file that tells React:
// What component to render (App)
// Where in the HTML to inject it (<div id="root"> in index.html)

// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// 1. Import React (core library for JSX and component rendering)
import React from 'react';

// 2. Import ReactDOM (handles rendering to the actual DOM in index.html)
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';


// 3. Import global CSS styling (optional, usually resets or base styles)
import './index.css';

// 4. Import the top-level component of your app
import App from './App';

// 5. Find the root DOM node in index.html to attach the React app to
const root = ReactDOM.createRoot(document.getElementById('root'));



// 6. Render the App component inside the root element
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Wrap App in BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
