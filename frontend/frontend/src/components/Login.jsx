import { useState } from "react";

function Login({ setIsLoggedIn, setShowLogin }) {   // ✅ receive prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Login failed");
        }
        return res.json();
      })
      .then(data => {
        // ✅ store token
        localStorage.setItem("token", data.token);

        // ✅ update app state (VERY IMPORTANT)
        setIsLoggedIn(true);
      })
      .catch(() => {
        alert("Invalid email or password");
      });
  };

  return (
    <div className="login">
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
      <p onClick={() => setShowLogin(false)} style={{ cursor: "pointer", color: "blue" }}>
        Don't have an account? Register
      </p>
    </div>
  );
}

export default Login;