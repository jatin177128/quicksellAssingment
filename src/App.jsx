import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Board from './components/Board';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [sorting, setSorting] = useState(localStorage.getItem('sorting') || 'priority');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDisplayChange = (newGrouping, newSorting) => {
    setGrouping(newGrouping);
    setSorting(newSorting);
    localStorage.setItem('grouping', newGrouping);
    localStorage.setItem('sorting', newSorting);
  };

  return (
    <div className="app">
      <Navbar 
        grouping={grouping} 
        sorting={sorting} 
        onDisplayChange={handleDisplayChange} 
      />
      <Board 
        tickets={tickets} 
        users={users} 
        grouping={grouping} 
        sorting={sorting} 
      />
    </div>
  );
}

export default App;