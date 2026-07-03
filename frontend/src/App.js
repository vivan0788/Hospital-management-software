import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';

const MainApp = () => {
  const { user, loading, login } = useAuth();
  const [currentView, setCurrentView] = useState('Dashboard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}><h3>Initializing Gateway Modules...</h3></div>;

  if (!user) {
    const handleLoginSubmit = async (e) => {
      e.preventDefault();
      try {
        setError('');
        await login(email, password);
      } catch (err) {
        setError(err.response?.data?.message || 'Access Credentials Verification Failed');
      }
    };

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f6fa' }}>
        <form onSubmit={handleLoginSubmit} style={{ background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '350px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>HMS Enterprise Security</h2>
          {error && <p style={{ color: '#e74c3c', fontSize: '0.9em' }}>{error}</p>}
          <div style={{ marginBottom: '15px' }}>
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Security Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Authenticate</button>
        </form>
      </div>
    );
  }

  // Dynamic View Injection based on user roles
  const renderRoleDashboard = () => {
    switch (user.role) {
      case 'Admin':
        return <AdminDashboard />;
      case 'Doctor':
        return <DoctorDashboard />;
      case 'Patient':
        return <PatientDashboard />;
      default:
        return <div>Receptionist Module Context Loaded. Interface Ready.</div>;
    }
  };

  return (
    <DashboardLayout setCurrentView={setCurrentView}>
      <h3 style={{ color: '#34495e', marginBottom: '20px' }}>{user.role} Control Workspace</h3>
      {renderRoleDashboard()}
    </DashboardLayout>
  );
};

const App = () => (
  <AuthProvider>
    <MainApp />
  </AuthProvider>
);

export default App;
