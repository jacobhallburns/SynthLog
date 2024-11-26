import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Boot from './boot.jsx';
import Notebook from './Notebook.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Boot />} />
        <Route path="/notebook" element={<Notebook />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
