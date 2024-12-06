import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';  // Ensure the path to your App component is correct
import './App.css';  // Import your CSS file

const container = document.getElementById('root');  // Your root div in index.html
const root = createRoot(container);  // Create a root
root.render(<App />);  // Render the App component
