import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Using AbortController for a 6-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      // Using relative path to rely on React's proxy in package.json
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(inputValue),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (data.success) {
        alert("SUCCESS: Account Created!");
        window.location.assign("/login"); 
      } else {
        alert("ERROR: " + data.message);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        alert("CONNECTION TIMEOUT: The backend is taking too long to respond. Please check if your MongoDB connection is active in the backend terminal.");
      } else {
        alert("NETWORK ERROR: Check if your backend is running at http://127.0.0.1:3002");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="container p-5 mt-5">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-12 p-5 text-center">
            <img src="media/images/signup.png" alt="Signup" className="img-fluid floating-animation" style={{ maxWidth: "80%" }} />
          </div>
          <div className="col-lg-5 col-md-12 p-5">
            <div className="signup-card p-5 shadow-lg rounded-4 bg-white">
              <h1 className="fw-bold mb-2">Signup now</h1>
              <p className="text-muted mb-4">Join the Zerodha family today.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    name="username"
                    required
                    value={username}
                    placeholder="Username"
                    className="form-control border-0 bg-light"
                    onChange={handleOnChange}
                  />
                  <label>Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    placeholder="Email"
                    className="form-control border-0 bg-light"
                    onChange={handleOnChange}
                  />
                  <label>Email</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    name="password"
                    required
                    value={password}
                    placeholder="Password"
                    className="form-control border-0 bg-light"
                    onChange={handleOnChange}
                  />
                  <label>Password</label>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary w-100 py-3 fw-bold shadow-sm"
                >
                  {loading ? "Verifying..." : "Create Account"}
                </button>
                <div className="mt-4 text-center">
                  <span className="text-muted small">Already have an account? </span>
                  <Link to="/login" className="text-decoration-none fw-bold">Login here</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;