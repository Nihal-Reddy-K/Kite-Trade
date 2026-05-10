import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

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

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const response = await fetch("/login", {
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
        alert("SUCCESS: Logged In!");
        window.location.assign("/dashboard"); 
      } else {
        alert("ERROR: " + data.message);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        alert("CONNECTION TIMEOUT: Backend is not responding.");
      } else {
        alert("NETWORK ERROR: Check if your backend is running.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page py-5 mt-5">
      <div className="container py-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8 col-sm-12">
            <div className="login-card p-5 shadow-lg border-0 rounded-4 bg-white">
              <h1 className="text-center fw-bold mb-4">Login to Kite</h1>
              <form onSubmit={handleSubmit}>
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
                  <label>Email address</label>
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
                  {loading ? "Verifying..." : "Login"}
                </button>
                <div className="mt-4 text-center">
                   <p className="text-muted small">
                    Don't have an account? <Link to="/signup" className="text-decoration-none fw-bold">Signup</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
