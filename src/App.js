import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import { auth } from './data/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/user-dashboard" 
            element={user ? <UserDashboard /> : <Login />} 
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
  );
}

export default App;
