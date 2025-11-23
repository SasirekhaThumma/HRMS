import React, { useEffect, useState } from 'react';
import api from '../api.js';

import '../style.css'


function Employees() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/employees');
      setEmployees(res); // API returns array directly
    } catch (err) {
      console.error('Error fetching employees:', err.message);
    }
  };

  const addEmployee = async () => {
    try {
      if (!name || !email) return;
      await api.post('/employees', { name, email });
      setName('');
      setEmail('');
      fetchEmployees();
    } catch (err) {
      console.error('Error adding employee:', err.message);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error('Error deleting employee:', err.message);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  return (
    <div className="page-container">
      <div className="content-card">

      <h2>Employees</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={addEmployee}>Add Employee</button>

      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.name} ({emp.email}) 
            <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Employees;
