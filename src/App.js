import { useEffect, useState } from "react";
import './App.css';
import { api } from './api/api';

function App() {
  // set employees array 
  const [employees, setEmployees] = useState([]);

  // useEffect is called when component first mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  // fetch employees from get /employees
  const fetchEmployees = async () => {
    const response  = await api.get(`/emp/employees`)

    // set employees array to response
    setEmployees(response.data);
  }

  return (
    <div className="App">
      <h1>
        Title
      </h1>
      {/* map employees to elements */}
      {employees.map((employee) => {
        return (
          <>
            <div>{employee.first_name}</div>
            <div>{employee.last_name}</div>
          </>
        )
      })}
    </div>
  );
}

export default App;