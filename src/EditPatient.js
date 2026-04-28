
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EditPatient = ({ patientId, onClose, onUpdate }) => {
//   const [patientData, setPatientData] = useState({});

//   useEffect(() => {
// //get
//     const fetchPatientData = async () => {
//       try {
//         const response = await axios.get(`https://backendhospital-ji3g.onrender.com/patients/${patientId}`);
//         setPatientData(response.data);
//       } catch (error) {
//         console.error('Error fetching patient data for editing:', error);
//       }
//     };


//     fetchPatientData();
//   }, [patientId]);

// //put
//   const handleUpdate = async () => {
//     try { 
//       await axios.put(`https://backendhospital-ji3g.onrender.com/patients/${patientId}`, patientData);
//       onClose();
//       onUpdate();
//     } catch (error) {
//       console.error('Error updating patient:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Edit Patient</h2>

//       <label>Name: </label>
//       <input type="text" value={patientData.name} onChange={(e) => setPatientData({ ...patientData, name: e.target.value })} />


//       <button onClick={handleUpdate}>Update</button>
//       <button onClick={onClose}>Cancel</button>
//     </div>
//   );
// };

// export default EditPatient;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPatient = ({ patientId, onClose, onUpdate }) => {
  const [patientData, setPatientData] = useState({});

  useEffect(() => {
    //get
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://hms-env.eba-tvxwbfse.eu-north-1.elasticbeanstalk.com/patient/${patientId}`);
        setPatientData(response.data);
      } catch (error) {
        console.error('Error fetching patient data for editing:', error);
      }
    };

    fetchPatientData();
  }, [patientId]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://hms-env.eba-tvxwbfse.eu-north-1.elasticbeanstalk.com/patient/${patientId}`, patientData);
      onClose();
      onUpdate();
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  return (
    <div>
      <h2>Edit Patient</h2>

      <label>Name: </label>
      <input type="text" name="name" value={patientData.name || ''} onChange={handleChange} />

      <label>Weight: </label>
      <input type="text" name="weight" value={patientData.weight || ''} onChange={handleChange} />

      <label>Gender: </label>
      <input type="text" name="gender" value={patientData.gender || ''} onChange={handleChange} />

      <label>Age: </label>
      <input type="text" name="age" value={patientData.age || ''} onChange={handleChange} />

      <label>Disease: </label>
      <input type="text" name="disease" value={patientData.disease || ''} onChange={handleChange} />

      {/* <label>Doctor ID: </label>
      <input type="text" name="doctorId" value={patientData.doctorId || ''} onChange={handleChange} /> */}
      <br />
      <br />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditPatient;
