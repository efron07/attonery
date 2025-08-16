import React from 'react';

export default function SimpleTest() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'red', 
      color: 'white', 
      padding: '20px',
      fontSize: '24px'
    }}>
      <h1>Simple Test Page</h1>
      <p>If you can see this red background with white text, React is working!</p>
      <p>Current time: {new Date().toLocaleString()}</p>
    </div>
  );
} 