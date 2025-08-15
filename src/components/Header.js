import React, { useState, useEffect } from 'react';
// useState stores the fetched username
// useEffect fetches the username when the component mounts
import '../styles/Header.css';

function Header() {
  /* State to hold the username
     Initially set to an empty string
     This will be updated once the data is fetched
     useState remembers the value (username) across renders
     and triggers a re-render when the value changes
  */
  const [username, setUsername] = useState('');

  // useEffect runs after the component mounts
  // the [] dependency array means it runs only once
  // It fetches the user data from the backend
  useEffect(() => {
    // For now, hardcode the user ID (1) until you have authentication
    // Fetch the user data from the backend
    // Adjust the URL to match your backend setup
    fetch('http://localhost:5000/api/users/1')
    // When the fetch completes, convert the response to JSON
      .then((res) => res.json())
      // This is an asynchronous operation, so we use .then() to handle the result
      .then((data) => {
        // Check that data exists and has a username property.
        if (data && data.username) {
          // If so, update our username state with setUsername(data.username)
          setUsername(data.username);
        }
      })
      // If anything goes wrong (network issue, backend error, invalid JSON),
      // this will log the error to the console
      .catch((err) => console.error('Error fetching user:', err));
  }, []);

  // Render the header with a greeting
  // If username is not set yet, show "Loading..."
  return (
    <header className="header">
      <h1>
        {/* If username is available, greet the user; otherwise, show "Loading..." */}
        {username ? `Hi ${username}! Let's get started with your routine` : 'Loading...'}
      </h1>
    </header>
  );
}

export default Header;

