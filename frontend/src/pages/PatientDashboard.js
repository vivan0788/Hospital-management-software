import React, { useEffect, useState } from 'react';
import API from '../services/api';

const PatientDashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get('/patient/profile')
      .then(res => setProfile(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h3>Welcome Back to your Health Record Portal</h3>
      {profile ? (
        <div style={{ marginTop: '20px', lineStretch: '1.6' }}>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Blood Group:</strong> {profile.bloodGroup || 'Not Specified'}</p>
          <p><strong>Registered Address:</strong> {profile.address}</p>
        </div>
      ) : <p>Loading medical profile configurations...</p>}
    </div>
  );
};

export default PatientDashboard;
export { AdminDashboard, DoctorDashboard };
