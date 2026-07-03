import React, { useEffect, useState } from 'react';
import API from '../services/api';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    API.get('/doctor/appointments/today')
      .then(res => setAppointments(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h3>Today's Clinical Appointment Queue</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
        <thead>
          <tr style={{ background: '#2c3e50', color: '#fff', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Token No</th>
            <th style={{ padding: '10px' }}>Patient Name</th>
            <th style={{ padding: '10px' }}>Time Slot</th>
            <th style={{ padding: '10px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{appt.queueNumber}</td>
              <td style={{ padding: '10px' }}>{appt.patient?.user?.name}</td>
              <td style={{ padding: '10px' }}>{appt.timeSlot}</td>
              <td style={{ padding: '10px', color: appt.status === 'Confirmed' ? '#2980b9' : '#27ae60' }}>{appt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorDashboard;
