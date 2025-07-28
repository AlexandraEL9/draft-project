// 1. Import the React library so we can use JSX and define components
import React from 'react';

// 2. Import the CSS file that styles this button (relative path from 'styles/' folder)
import '../styles/Button.css';

// 3. Define a functional component called Button
function Button() {
  return (
    // 4. Return a button element with a class name for styling
    <button className="custom-button">Start Routine</button>
  );
}

// 5. Export the Button component so it can be used in other files (like App.js)
export default Button;
