import React, { useState } from 'react'; // useState is used to manage form input state

// This component renders a login form
// It allows users to enter their username and password
function LoginForm() { 
  const [username, setUsername] = useState(''); // useState initializes username to an empty string
  const [password, setPassword] = useState(''); // useState initializes password to an empty string
  const [status, setStatus] = useState({ loading: false, error: '', success: '' }); // useState initializes status to an object with loading, error, and success properties

  const handleSubmit = async (e) => { 
    // (e) is the event object from the form submission - it contains the info about which form, the input elements and methods in it
    // async allows us to use await inside this function so we can wait for responses from the server 
    e.preventDefault(); // Prevents the default form submission behavior
    setStatus({ loading: true, error: '', success: '' }); // Reset status: show loading state, clear errors and success messages

    try { // Begin a try block so we can catch any errors (like network issues) later

      // Send a POST request to the backend login route
      const res = await fetch('http://localhost:5000/login', { // api route to use
        method: 'POST', // HTTP method
        headers: { 'Content-Type': 'application/json' }, // Tell server we're sending JSON
        body: JSON.stringify({ username, password }) // Convert JS object to JSON string for request body
      });

      // Wait for the response body to be read and parsed as JSON
      const data = await res.json(); // Example: { message: 'Login successful!', userId: 1, username: 'alice' }

      // If the HTTP response status code is NOT in the 200–299 range
      if (!res.ok) {
        // Update status state:
        // - Stop loading
        // - Show error from server (or default to 'Login failed.')
        // - Clear any success message
        setStatus({ loading: false, error: data.error || 'Login failed.', success: '' });
        return; // Exit the function early so we don’t run the success logic below
      }

      // Save what other parts of your app need
      localStorage.setItem('userId', String(data.userId));
      localStorage.setItem('username', data.username);

      setStatus({ loading: false, error: '', success: 'Logged in! Redirecting…' });

      // simplest redirect (works without react-router)
      window.location.href = '/routines';

    } catch {
      // Catch any network or unexpected errors
      setStatus({ loading: false, error: 'Network error. Is the backend running?', success: '' });
    }
  };

  return ( // This is the JS structure of the login form
    // The form is wrapped in a div with class "auth-card" for styling
    <div className="auth-card"> 
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}> {/* onSubmit calls handleSubmit when the form is submitted */}
        {/* The form contains two input fields: one for username and one for password */}
        <label>
          {/* Label for the username input */}
          Username
          <input
            type="text"
            placeholder="Enter username"
            value={username} // value is controlled by the state
            onChange={(e) => setUsername(e.target.value)} // onChange updates the username state with the input value
            autoComplete="username" // This helps browsers autofill the username
            required
          />
        </label>

        <label>
          {/* Label for the password input */}
          Password
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // onChange updates the password state with the input value
            autoComplete="current-password"
            required
          />
        </label>

        {status.error && <p className="error">{status.error}</p>} 
        {status.success && <p className="success">{status.success}</p>}

        <button type="submit" disabled={status.loading}>
          {status.loading ? 'Please wait…' : 'Log in'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;


