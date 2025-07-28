import React from 'react';
import '../styles/DateTime.css';

function DateTime() {
  const now = new Date();
  const date = now.toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const time = now.toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <section className="date-time-container">
      <span className="date">{date}</span>
      <span className="time">{time}</span>
    </section>
  );
}

export default DateTime;
