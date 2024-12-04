import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Boot from './boot.jsx';
import Notebook from './Notebook.jsx';
import Sketchpad from './Sketchpad.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Boot />} />
        <Route path="/Notebook" element={<Notebook />} />
        <Route path="/Sketchpad" element={<Sketchpad />}/>
      </Routes>
    </HashRouter>
  </StrictMode>,
);
