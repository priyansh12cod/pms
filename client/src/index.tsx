import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the import from 'react-dom/client'
import App from './app';
import '../src/assets/styles/global.scss'; // Import your global styles

const rootElement = document.getElementById('root'); // Find the root element
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Create a root
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
