import React, { useEffect, useState } from 'react';
import API from '../services/api';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/dashboard')
      .then(res => {
        setAnalytics(res.data.analytics);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading Admin Analytics...</div>;

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#3498db', color: '#fff', padding: '20px', borderRadius: '8px' }}>
          <h4>Total Patients</h4>
          <h2>{analytics?.totalPatients || 0}</h2>
        </div>
        <div style={{ background: '#2ecc71', color: '#fff', padding: '20px', borderRadius: '8px' }}>
          <h4>Total Doctors</h4>
          <h2>{analytics?.totalDoctors || 0}</h2>
        </div>
        <div style={{ background: '#e67e22', color: '#fff', padding: '20px', borderRadius: '8px' }}>
          <h4>Today's Appts</h4>
          <h2>{analytics?.todaysAppointments || 0}</h2>
        </div>
        <div style={{ background: '#9b59b6', color: '#fff', padding: '20px', borderRadius: '8px' }}>
          <h4>Total Revenue</h4>
          <h2>₹ {analytics?.totalRevenue || 0}</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
