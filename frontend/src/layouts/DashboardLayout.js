import React from 'react';
import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ children, setCurrentView }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      <Sidebar setCurrentView={setCurrentView} />
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ background: '#fff', padding: '15px 30px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '20px' }}>HMS Enterprise Workspace</h2>
          <span style={{ color: '#27ae60', fontWeight: 'bold' }}>● Server Connected</span>
        </header>
        <main style={{ padding: '30px', flexGrow: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
