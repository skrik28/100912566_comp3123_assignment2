import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import EmployeeList from './EmployeeList';
import SearchBar from './SearchBar';
import Navbar from '../common/Navbar';

const EmployeeManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('department'); // or 'position'
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (query, criteria) => {
    setSearchQuery(query);
    setSearchCriteria(criteria);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <div className="container">
        <h1 className="page-title">COMP3123 - Assignment 2</h1>
        <h2 className="page-subtitle">Employee Management System</h2>
        
        <SearchBar 
          onSearch={handleSearch}
          criteria={searchCriteria}
          onCriteriaChange={setSearchCriteria}
        />
        
        <EmployeeList 
          searchQuery={searchQuery}
          searchCriteria={searchCriteria}
        />
      </div>
    </div>
  );
};

export default EmployeeManagement;