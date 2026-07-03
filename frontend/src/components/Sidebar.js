import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = ({ setCurrentView }) => {
  const { user, logout } = useContext(AuthContext);

  const menuItems = {
    Admin: ['Dashboard', 'Manage Doctors', 'Departments', 'Billing'],
    Doctor: ['Today Appointments', 'Patient EMR Records', 'Write Prescriptions'],
    Receptionist: ['Register Patient', 'Book Appointment', 'Manage Queue'],
    Patient: ['My Dashboard', 'Appointment History', 'My Prescriptions', 'Bills']
  };

  const links = menuItems[user?.role] || [];

  return (
    <div style={{ width: '260px', background: '#2c3e50', color: '#fff', height: '100vh', padding: '20px' }}>
      <h3>HMS Portal</h3>
      <p style={{ fontSize: '0.85em', color: '#bdc3c7' }}>Logged in as: <b>{user?.name} ({user?.role})</b></p>
      <hr style={{ borderColor: '#34495e' }} />
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {links.map((item) => (
          <li key={item} style={{ margin: '15px 0' }}>
            <button 
              onClick={() => setCurrentView(item)}
              style={{ background: 'none', border: 'none', color: '#ecf0f1', cursor: 'pointer', fontSize: '16px', textAlign: 'left', width: '100%' }}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      <button 
        onClick={logout} 
        style={{ marginTop: '40px', background: '#e74c3c', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Sidebar;
