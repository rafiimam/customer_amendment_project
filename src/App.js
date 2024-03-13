import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AmendCustomerButton from './Pages/AmendCustomerButton';
import LoginPage from './Pages/LoginPage';
import AuthenticationPage from './Pages/Authorization';
import Dashboard from './Pages/Dashboard';
import UpdatedCustomer from './Pages/updatedCustomer';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const storedRoute = localStorage.getItem('currentRoute');
    if (storedRoute && isAuthenticated && window.location.pathname === '/') {
      window.location.href = storedRoute;
    }
  }, []);



  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentRoute'); // Clear the stored route upon logout
  };

  const handleRouteChange = (newRoute) => {
    localStorage.setItem('currentRoute', newRoute);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} setEmployeeInfo={setEmployeeInfo} />
            }
            onUpdate={handleRouteChange}
          />
          <Route
            path="/amend-customer"
            element={
              isAuthenticated ? (
                <AmendCustomerButton handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
              ) : (
                <Navigate to="/login" />
              )
            }
            onUpdate={handleRouteChange}
          />
          <Route
            path="/authorization"
            element={
              isAuthenticated ? (
                <AuthenticationPage handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
              ) : (
                <Navigate to="/login" />
              )
            }
            onUpdate={handleRouteChange}
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
              ) : (
                <Navigate to="/login" />
              )
            }
            onUpdate={handleRouteChange}
          />
          <Route path="/" element={<Navigate to="/login" />} onUpdate={handleRouteChange} />
          <Route
            path="/authorization/:journalNumber"
            element={
              isAuthenticated ? (
                <AuthenticationPage handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
              ) : (
                <Navigate to="/login" />
              )
            }
            onUpdate={handleRouteChange}
          />
          <Route
            path="/updateCustomer/:journalNumber"
            element={
              isAuthenticated ? (
                <UpdatedCustomer handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
              ) : (
                <Navigate to="/login" />
              )
            }
            onUpdate={handleRouteChange}
          />
          <Route path="/" element={<Navigate to="/login" />} onUpdate={handleRouteChange} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
