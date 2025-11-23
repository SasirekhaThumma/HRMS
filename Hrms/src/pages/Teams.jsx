import React, { useEffect, useState } from 'react';
import api from '../api.js';

import "../style.css"

function Teams() {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState('');

  const fetchTeams = async () => {
    try {
      const res = await api.get('/teams');
      setTeams(res); // Assuming res is the array of teams
    } catch (err) {
      console.error('Error fetching teams:', err.message);
    }
  };

  const addTeam = async () => {
    try {
      if (!name) return;
      await api.post('/teams', { name });
      setName('');
      fetchTeams();
    } catch (err) {
      console.error('Error adding team:', err.message);
    }
  };

  const deleteTeam = async (id) => {
    try {
      await api.delete(`/teams/${id}`);
      fetchTeams();
    } catch (err) {
      console.error('Error deleting team:', err.message);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="page-container">
     <div className="content-card">
      <h2>Teams</h2>
      <div className="input-wrapper">
      <input 
        placeholder="Team Name" 
        value={name} 
        onChange={e => setName(e.target.value)} 
      />
      <button onClick={addTeam}>Add Team</button>
      </div>
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            {team.name} 
            <button onClick={() => deleteTeam(team.id)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Teams;
