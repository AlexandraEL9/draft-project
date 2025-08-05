// LoginForm.js
import React from 'react';

function LoginForm({ isLogin }) {
  return (
    <div className="auth-card">
      <h2>{isLogin ? 'Log in' : 'Sign up'}</h2>
      <form>
        <label>
          Username
          <input type="text" placeholder="Enter username" />
        </label>
        <label>
          Password
          <input type="password" placeholder="Enter password" />
        </label>

        <button type="submit">
          {isLogin ? 'Log in' : 'Sign up'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
