import React, { useState, useEffect } from 'react';
import { api } from '../../api/api';
import '../../App.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: ''
  });

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await api.get('/emp/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to fetch employees');
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit form for add/edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedEmployee) {
        // Update existing employee
        await api.put(`/emp/employees/${selectedEmployee._id}`, formData);
      } else {
        // Create new employee
        await api.post('/emp/employees', formData);
      }
      fetchEmployees();
      // Reset form and close modals
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        date_of_joining: '',
        department: ''
      });
      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit employee data');
    }
  };

  // Delete employee
  const handleDeleteEmployee = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.delete(`/emp/employees?eid=${employeeId}`);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee');
      }
    }
  };

  // Load employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center'}}>
        Employee Management System
      </h2>

      {/* Add/Edit Employee Button */}
      <button 
        className="add-employee-btn"
        onClick={() => {
          setIsAddModalOpen(true);
          setSelectedEmployee(null);
        }}
      >
        Add New Employee
      </button>

      {/* Employee List */}
      <table className="employee-table">
        <thead>
          <tr className="table-header">
            <th className="table-cell">Name</th>
            <th className="table-cell">Email</th>
            <th className="table-cell">Position</th>
            <th className="table-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td className="table-cell">
                {employee.first_name} {employee.last_name}
              </td>
              <td className="table-cell">{employee.email}</td>
              <td className="table-cell">{employee.position}</td>
              <td className="table-cell">
                <button 
                  className="action-btn btn-view"
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setIsEditModalOpen(false);
                  }}
                >
                  View
                </button>
                <button 
                  className="action-btn btn-edit"
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setFormData(employee);
                    setIsEditModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button 
                  className="action-btn btn-delete"
                  onClick={() => handleDeleteEmployee(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Employee Details Modal */}
      {selectedEmployee && !isEditModalOpen && !isAddModalOpen && (
        <div className="modal">
          <h2>Employee Details</h2>
          <p><strong>Name:</strong> {selectedEmployee.first_name} {selectedEmployee.last_name}</p>
          <p><strong>Email:</strong> {selectedEmployee.email}</p>
          <p><strong>Position:</strong> {selectedEmployee.position}</p>
          <p><strong>Department:</strong> {selectedEmployee.department}</p>
          <p><strong>Salary:</strong> ${selectedEmployee.salary}</p>
          <p><strong>Date of Joining:</strong> {new Date(selectedEmployee.date_of_joining).toLocaleDateString()}</p>
          <button 
            className="action-btn btn-view"
            onClick={() => setSelectedEmployee(null)}
          >
            Close
          </button>
        </div>
      )}

      {/* Add/Edit Employee Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="modal">
          <h2>{isEditModalOpen ? 'Edit Employee' : 'Add New Employee'}</h2>
          <form onSubmit={handleSubmit} className="modal-form">
            <div>
              <label>First Name</label>
              <input 
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <input 
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Position</label>
              <input 
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Salary</label>
              <input 
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Department</label>
              <input 
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Date of Joining</label>
              <input 
                type="date"
                name="date_of_joining"
                value={formData.date_of_joining}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="modal-actions">
              <button 
                type="submit"
                className="btn-submit"
              >
                {isEditModalOpen ? 'Update Employee' : 'Add Employee'}
              </button>
              <button 
                type="button"
                className="btn-cancel"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  setSelectedEmployee(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;