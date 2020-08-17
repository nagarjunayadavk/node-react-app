import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
function App() {
  return (
    <Router>
      <div>
          <Dashboard/>
      </div>
    </Router>

  );
}

export default App;
