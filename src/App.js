import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, Error, PageNotFound } from './pages';
import './constants/variable.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/error/:errorCode" element={<Error />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
