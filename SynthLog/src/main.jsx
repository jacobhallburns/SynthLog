import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Boot from './boot.jsx';

function Notebook({ location }) {
  const { state } = location || {};
  const notebookName = state?.notebookName || 'Unnamed Notebook';

  return <div>Welcome to your notebook: {notebookName} </div>;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Boot />} />
        <Route path="/notebook" element={<Notebook />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
