import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MeetingDetails from './MeetingDetails';
import SchedulePage from './SchedulePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SchedulePage />} />
        <Route path="/details" element={<MeetingDetails />} />
      </Routes>
    </Router>
  );
};

export default App;