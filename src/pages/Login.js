// Login.js
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/Login.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="auth-section">
      <div className="toggle-tabs">
        <button
          className={isLogin ? 'active' : ''}
          onClick={() => setIsLogin(true)}
        >
          Log in
        </button>
        <button
          className={!isLogin ? 'active' : ''}
          onClick={() => setIsLogin(false)}
        >
          Sign up
        </button>
      </div>

      <LoginForm isLogin={isLogin} />
    </section>
  );
}

export default Login;

