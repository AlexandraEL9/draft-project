# Build the Routines Component

## Steps

1. Create a basic skeleton component
2. show userId from localStorage (no fetch yet)
3. Build fetch (minimal - happy path only)
4. render list with no styling

Step 5 — Add simple loading + empty states (Goal: user feedback without error handling yet.)

step 6 - Add basic error habdling


## 1. Create a basic skeleton component (static)
`src/components/RoutinesList.js`
```js
import React from 'react';

function RoutinesList() {
  return (
    <section className="routines">
      <h1 className="routines__title">Routines</h1>
    </section>
  );
}

export default RoutinesList;
```
Don't forget to link to page
```js
// src/pages/Routines.js
import Header from '../components/Header';
import RoutinesList from '../components/RoutinesList';

export default function Routines() {
  return (
    <>
      <Header />
      <RoutinesList />
    </>
  );
}
```

## 2. show userId from localStorage (no fetch yet)
Goal: prove we know which user to load.
```js
import React from 'react';

function RoutinesList() {
  const userId = localStorage.getItem('userId'); // set at login

  return (
    <section className="routines">
      <h1 className="routines__title">Routines</h1>
      <p>User ID: {userId || 'none'}</p>
    </section>
  );
}

export default RoutinesList;
```
Check: After login, you should see User ID: 1 (or your id).

## 3. Build fetch (minimal - happy path only)
Goal: call your route and dump raw JSON (no loading/error states yet).
```js
// component
import React, { useEffect, useState } from 'react';

function RoutinesList() {
  const userId = localStorage.getItem('userId');
  const [data, setData] = useState(null); // will hold { routines: [...] }

  useEffect(() => {
    if (!userId) return; // skip if not logged in

    // minimal: no try/catch yet
    fetch(`http://localhost:5000/routines?user_id=${userId}`)
      .then(res => res.json())
      .then(json => setData(json));
  }, [userId]);

  return (
    <section className="routines">
      <h1 className="routines__title">Routines</h1>
      <pre style={{whiteSpace:'pre-wrap'}}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
}

export default RoutinesList;
```
will render as a json list of objects

## 4. render list with no styling
Goal: map the routines array to simple list items.

```js
import React, { useEffect, useState } from 'react';
// useState: lets us store and update component state (like the routines data)
// useEffect: lets us run side effects (like fetching from an API) after render

function RoutinesList() {
  // Get the logged-in user's ID from localStorage
  // localStorage always stores strings, so userId will be a string here
  const userId = localStorage.getItem('userId');

  // routines: an array of the user's routines
  // setRoutines: function to update routines state
  // Start with an empty array so .map() works even before we fetch data
  const [routines, setRoutines] = useState([]);

  // useEffect runs after the component first renders, and whenever userId changes
  useEffect(() => {
    // If there's no userId in localStorage, don't bother fetching
    if (!userId) return;

    // Send a GET request to the backend API to fetch routines for this user
    fetch(`http://localhost:5000/routines?user_id=${userId}`)
      // When the fetch resolves, convert the HTTP response body from JSON into a JS object
      .then(res => res.json())

      // Once we have the parsed JSON object, update state with the routines array
      .then(json => setRoutines(json.routines || []));
      // json.routines is expected to be an array (from our backend)
      // If it's missing or undefined, we fallback to an empty array
  }, [userId]); 
  // Dependency array: only run this effect on first render and when userId changes

  // JSX returned by this component
  return (
    <section className="routines">
      {/* Page title */}
      <h1 className="routines__title">Routines</h1>

      {/* Unordered list of routines */}
      <ul>
        {routines.map(r => (
          // Each routine is rendered as a <li>
          // key={r.routine_id} ensures React can efficiently update the list
          <li key={r.routine_id}>
            {/* Display the routine's name */}
            {r.routine_name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RoutinesList;
```
renders the list of routine names

## component structure
We can update your component to have the right containers and buttons in place:
```js
return (
  <section className="routines">
    <div className="routines__header">
      <h1 className="routines__title">Your Routines</h1>
      <button className="btn btn--primary">+ Add Routine</button>
    </div>

    <ul className="routines__list">
      {routines.map(r => (
        <li key={r.routine_id} className="routine-card">
          <div className="routine-card__info">
            <h2>{r.routine_name}</h2>
            <p>Duration: {r.routine_duration_minutes} mins</p>
          </div>
          <div className="routine-card__actions">
            <button className="btn btn--secondary">View</button>
            <button className="btn btn--secondary">Edit</button>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

```

## Step 5 — Add simple loading + empty states
Goal: user feedback without error handling yet.
```js
import React, { useEffect, useState } from 'react';

function RoutinesList() {
  const userId = localStorage.getItem('userId');
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) { setLoading(false); return; }
    fetch(`http://localhost:5000/routines?user_id=${userId}`)
      .then(res => res.json())
      .then(json => {
        setRoutines(json.routines || []);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <section className="routines">
        <h1 className="routines__title">Routines</h1>
        <p>Loading…</p>
      </section>
    );
  }

  if (!routines.length) {
    return (
      <section className="routines">
        <h1 className="routines__title">Routines</h1>
        <p>No routines yet.</p>
      </section>
    );
  }

  return (
    <section className="routines">
      <h1 className="routines__title">Routines</h1>
      <ul>
        {routines.map(r => (
          <li key={r.routine_id}>
            {r.routine_name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RoutinesList;
```

## step 6 - Add basic error habdling
Goal: show a message if network fails or backend returns non-OK
```js
import React, { useEffect, useState } from 'react';

function RoutinesList() {
  const userId = localStorage.getItem('userId');
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) {
      setError('Please log in to view routines.');
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const res = await fetch(`http://localhost:5000/routines?user_id=${userId}`);

        if (!res.ok) {
          // try to read JSON error, fall back to text
          const ct = res.headers.get('content-type') || '';
          if (ct.includes('application/json')) {
            const err = await res.json();
            setError(err.error || 'Failed to load routines.');
          } else {
            const txt = await res.text();
            console.error('Non-JSON error:', txt);
            setError('Failed to load routines.');
          }
          setLoading(false);
          return;
        }

        const json = await res.json(); // { routines: [...] }
        setRoutines(json.routines || []);
        setLoading(false);
      } catch (e) {
        console.error('Network error:', e);
        setError('Network error. Is the backend running?');
        setLoading(false);
      }
    };

    load();
  }, [userId]);

  if (loading) {
    return (
      <section className="routines">
        <h1 className="routines__title">Routines</h1>
        <p>Loading…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="routines">
        <h1 className="routines__title">Routines</h1>
        <p style={{color:'#b00020'}}>{error}</p>
      </section>
    );
  }

  if (!routines.length) {
    return (
      <section className="routines">
        <h1 className="routines__title">Routines</h1>
        <p>No routines yet.</p>
      </section>
    );
  }

  return (
    <section className="routines">
      <h1 className="routines__title">Routines</h1>
      <ul>
        {routines.map(r => (
          <li key={r.routine_id}>
            {r.routine_name} {typeof r.routine_duration_minutes === 'number' ? `• ${r.routine_duration_minutes} min` : ''}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RoutinesList;
```