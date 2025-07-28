// `App.js` is the main component of your React application. It serves as the top-level UI layout, 
// and it's the first thing rendered by index.js. Think of it like the `<body>` of a traditional
// HTML page — it controls what appears on screen.

// 1. Import React library (required to use JSX)
import React from 'react';

// 2. Import the CSS file for styling this component
import './styles/App.css';


// Other imports for additional components
import Header from './components/Header';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import Routines from './components/Routines';


// 4. Define the App component using a function

function App() {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <main className="main">
        <Routines />
      </main>
      <Footer />
    </div>
  );
}
export default App;