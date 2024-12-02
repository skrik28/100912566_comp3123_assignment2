// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login.js';
import Signup from './components/auth/Signup.js';
import EmployeeManagement from './components/employees/EmployeeManagement.js';
import ProtectedRoute from './components/common/ProtectedRoute.js';
import { AuthProvider } from './context/AuthContext.js';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/employees/*" 
            element={
              <ProtectedRoute>
                <EmployeeManagement />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/employees" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;