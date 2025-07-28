import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import '../styles/Routines.css';

function Routines() {
  return (
    <main className="main">
      <Accordion defaultActiveKey="0" className="w-75">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Morning Routine</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>Wake up</li>
              <li>Stretch</li>
              <li>Make coffee</li>
              <li>Journal for 5 mins</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Evening Routine</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>Turn off devices</li>
              <li>Brush teeth</li>
              <li>Read for 10 mins</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </main>
  );
}

export default Routines;

