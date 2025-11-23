import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Employees from './pages/Employees.jsx';
import Teams from './pages/Teams.jsx';
import Assignments from './pages/Assignments.jsx';

import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/employees">Employees</Link> | 
        <Link to="/teams">Teams</Link> | 
        <Link to="/assignments">Assignments</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/assignments" element={<Assignments />} />
      </Routes>
    </Router>
  );
}

export default App;
