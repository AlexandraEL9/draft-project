import React, { useEffect, useState } from 'react';
import '../styles/Header.css';

function Header() {
  const [username, setUsername] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) { setUsername('Guest'); return; }

    const load = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/${userId}`);

        if (!res.ok) {
          // read error safely (could be HTML)
          const ct = res.headers.get('content-type') || '';
          if (ct.includes('application/json')) {
            console.error('User fetch failed:', await res.json());
          } else {
            console.error('User fetch failed (non-JSON):', await res.text());
          }
          setUsername('Guest');
          return;
        }

        const data = await res.json(); // { username: 'alice' }
        if (data?.username) setUsername(data.username);
      } catch (err) {
        console.error('Network error fetching user:', err);
        setUsername('Guest');
      }
    };

    load();
  }, [userId]);

  return (
    <header className="header">
      <h1>
        {username ? `Hi ${username}! Let's get started with your routine` : 'Loading...'}
      </h1>
    </header>
  );
}

export default Header;

