import React, { useEffect, useState } from 'react';
import api from '../api.js';

import '../style.css'

function Assignments() {
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [teamId, setTeamId] = useState('');
  const [assignments, setAssignments] = useState([]);

  const fetchData = async () => {
    try {
      const empRes = await api.get('/employees');
      const teamRes = await api.get('/teams');
      const assignRes = await api.get('/assignments');
      setEmployees(empRes);
      setTeams(teamRes);
      setAssignments(assignRes);
    } catch (err) {
      console.error('Error fetching assignment data:', err.message);
    }
  };

  const assign = async () => {
    try {
      if (!employeeId || !teamId) return;
      await api.post('/assignments', { employee_id: employeeId, team_id: teamId });
      setEmployeeId('');
      setTeamId('');
      fetchData();
    } catch (err) {
      console.error('Error assigning team:', err.message);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="page-container">
       <div className="content-card">
      <h2>Assignments</h2>
      <select onChange={e => setEmployeeId(e.target.value)} value={employeeId}>
        <option value="">Select Employee</option>
        {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
      </select>
      <select onChange={e => setTeamId(e.target.value)} value={teamId}>
        <option value="">Select Team</option>
        {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>
      <button onClick={assign}>Assign</button>

      <h3>Current Assignments</h3>
      <ul>
        {assignments.map(a => (
          <li key={`${a.employee_id}-${a.team_id}`}>
            {a.employee_name} → {a.team_name}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Assignments;
