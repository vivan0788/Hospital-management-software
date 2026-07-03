import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Root Element ko HTML base template se load kar rahe hain
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Failed to find the root element. Ensure index.html has a <div id='root'></div> element.");
}

const root = ReactDOM.createRoot(rootElement);

// StrictMode ke sath App module ko bootload kar rahe hain
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
