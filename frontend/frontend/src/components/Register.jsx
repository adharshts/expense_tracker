import { useState } from "react";

function Register({ setShowLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Registration failed");
        }
        return res.text();
      })
      .then(() => {
        alert("User registered successfully ✅");
        setShowLogin(true); // 👉 switch to login
      })
      .catch(() => {
        alert("Error registering user");
      });
  };

  return (
    <div className="login">
      <h2>Register</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>

      <p onClick={() => setShowLogin(true)} style={{ cursor: "pointer", color: "blue" }}>
        Already have an account? Login
      </p>
    </div>
  );
}

export default Register;