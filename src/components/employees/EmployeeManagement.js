import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import EmployeeList from './EmployeeList';
import SearchBar from './SearchBar';
import Navbar from '../common/Navbar';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('department');
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Filter employees based on search criteria and query
  const filteredEmployees = employees.filter(employee => {
    if (!searchQuery) return true;
    
    const value = employee[searchCriteria]?.toLowerCase() || '';
    return value.includes(searchQuery.toLowerCase());
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
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
        <h2 className="page-subtitle">Employee Search Bar</h2>
        
        <SearchBar 
          onSearch={handleSearch}
          criteria={searchCriteria}
          onCriteriaChange={setSearchCriteria}
        />
        
        <EmployeeList 
          employees={filteredEmployees}
          setEmployees={setEmployees}
        />
      </div>
    </div>
  );
};

export default EmployeeManagement;