import React, { useState } from "react";
import axios from "axios";

const PatientForm = () => {
  const [patientData, setPatientData] = useState({
    name: "",
    weight: "",
    gender: "",
    age: "",
    disease: "",
    doctor: {
      id: ""
    }
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "doctor") {
      setPatientData((prevData) => ({
        ...prevData,
        doctor: {
          ...prevData.doctor,
          id: value
        }
      }));
    } else {
      setPatientData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://hms-env.eba-tvxwbfse.eu-north-1.elasticbeanstalk.com/patient",
        patientData
      );

      console.log("Patient created:", response.data);

      setMessage("Patient created successfully!");

      // Reset form
      setPatientData({
        name: "",
        weight: "",
        gender: "",
        age: "",
        disease: "",
        doctor: {
          id: ""
        }
      });

    } catch (err) {
      console.error(err);
      setError("Failed to create patient. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>
        Create New Patient
      </h2>

      <form
        onSubmit={handleSubmit}
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
          required
        />

        {/* Weight */}
        <label>Weight:</label>
        <input
          type="text"
          name="weight"
          value={patientData.weight}
          onChange={handleChange}
          required
        />

        {/* Gender */}
        <label>Gender:</label>
        <select
          name="gender"
          value={patientData.gender}
          onChange={handleChange}
          required
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
          required
        />

        {/* Disease */}
        <label>Disease:</label>
        <input
          type="text"
          name="disease"
          value={patientData.disease}
          onChange={handleChange}
          required
        />

        {/* Doctor ID */}
        <label>Doctor ID:</label>
        <input
          type="number"
          name="doctor"
          value={patientData.doctor.id}
          onChange={handleChange}
          required
        />

        <br />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "10px",
            padding: "8px",
            width: "100%"
          }}
        >
          {loading ? "Creating..." : "Create Patient"}
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

      </form>
    </div>
  );
};

export default PatientForm;
