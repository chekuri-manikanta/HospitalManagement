import React, { useState, useEffect } from "react";
import axios from "axios";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://hms-env.eba-tvxwbfse.eu-north-1.elasticbeanstalk.com/doctor"
        );
        setDoctors(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors based on search
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Doctors List</h2>

      {/* Search Box */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search doctor by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            fontSize: "14px"
          }}
        />
      </div>

      {/* Loading */}
      {loading && (
        <p style={{ textAlign: "center" }}>
          Loading doctors...
        </p>
      )}

      {/* Error */}
      {error && (
        <p style={{ textAlign: "center", color: "red" }}>
          {error}
        </p>
      )}

      {/* Doctors List */}
      {!loading && !error && (
        <div>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  margin: "10px auto",
                  width: "60%",
                  borderRadius: "8px"
                }}
              >
                <p>
                  <strong>Name:</strong> {doctor.name}
                </p>
                <p>
                  <strong>Speciality:</strong> {doctor.speciality}
                </p>
                <p>
                  <strong>Doctor ID:</strong> {doctor.id}
                </p>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>
              No doctors found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Doctor;
