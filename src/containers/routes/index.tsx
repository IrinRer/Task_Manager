import React from 'react';
import Hello from 'components/Hello';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from 'pages/Auth';

const CreateAppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<h2>Error404</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default CreateAppRoutes;
