import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    mobileNo: "",
    githubUsername: "",
    rollNo: "",
    collegeName: "",
    accessCode: "",
  });

  const [responseData, setResponseData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://20.244.56.144/evaluation-service/register",
        formData
      );
      setResponseData(res.data);
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Register to Test Server</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}:</label>
            <input
              name={key}
              type="text"
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Register</button>
      </form>

      {responseData && (
        <div style={{ marginTop: "2rem" }}>
          <h3>✅ Registration Successful</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
