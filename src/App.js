// `App.js` is the main component of your React application. It serves as the top-level UI layout, 
// and it's the first thing rendered by index.js. Think of it like the `<body>` of a traditional
// HTML page — it controls what appears on screen.

// 1. Import React library (required to use JSX)
import React from 'react';

// 2. Import the CSS file for styling this component
import './styles/App.css';

// 3. Import a custom Button component from the components folder
import Button from './components/Button';

// 4. Define the App component using a function
function App() {
  return (
    // 5. React Fragment <> lets us return multiple elements without a wrapper div
    <>
      {/* 6. Heading: title of the app */}
      <h1>Welcome to Routine Builder</h1>

      {/* 7. Paragraph: brief app description */}
      <p>Create custom routines to structure your day!</p>

      {/* 8. Render the reusable Button component */}
      <Button />
    </>
  );
}

// 9. Export the App component so it can be used in index.js
export default App;
