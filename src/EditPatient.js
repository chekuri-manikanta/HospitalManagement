import React, { useState, useEffect } from "react";
import axios from "axios";

const EditPatient = ({ patientId, onClose, onUpdate }) => {

  const [patientData, setPatientData] = useState({
    name: "",
    weight: "",
    gender: "",
    age: "",
    disease: ""
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch patient details
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(
          `http://hms-env.eba-tvxwbfse.eu-north-1.elasticbeanstalk.com/patient/${patientId}`
        );

        setPatientData(response.data);

      } catch (err) {
        console.error(err);
        setError("Failed to load patient data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();

  }, [patientId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setPatientData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Update patient
  const handleUpdate = async () => {

    setUpdating(true);
    setError("");
    setMessage("");

    try {

      await axios.put(
        `http://hms-env.eba-tvxwbfse.eu-north-1.elasticbeanstalk.com/patient/${patientId}`,
        patientData
      );

      setMessage("Patient updated successfully!");

      onUpdate();

      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (err) {

      console.error(err);
      setError("Failed to update patient.");

    } finally {

      setUpdating(false);

    }
  };

  // Loading state
  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading patient data...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>

      <h2 style={{ textAlign: "center" }}>
        Edit Patient
      </h2>

      <div
        style={{
          maxWidth: "400px",
          margin: "auto",
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px"
        }}
      >

        {/* Name */}
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={patientData.name}
          onChange={handleChange}
        />

        {/* Weight */}
        <label>Weight:</label>
        <input
          type="text"
          name="weight"
          value={patientData.weight}
          onChange={handleChange}
        />

        {/* Gender */}
        <label>Gender:</label>
        <select
          name="gender"
          value={patientData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* Age */}
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={patientData.age}
          onChange={handleChange}
        />

        {/* Disease */}
        <label>Disease:</label>
        <input
          type="text"
          name="disease"
          value={patientData.disease}
          onChange={handleChange}
        />

        <br />

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          disabled={updating}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "8px"
          }}
        >
          {updating ? "Updating..." : "Update Patient"}
        </button>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "8px"
          }}
        >
          Cancel
        </button>

        {/* Success Message */}
        {message && (
          <p style={{ color: "green" }}>
            {message}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

      </div>
    </div>
  );
};

export default EditPatient;
