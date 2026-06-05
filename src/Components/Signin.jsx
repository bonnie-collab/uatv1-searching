import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// Import the eye icons from lucide-react
import { Eye, EyeOff } from 'lucide-react';

// import the external css file that contains all styles for this signin component
import '../css/Signin.css';
// import Navbar from './Navbar';

const Signin = () => {

  // define the two hooks for capturing /storing the users input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // declare the three additional hooks
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Hook to toggle password visibility state (NEW)
  const [showPassword, setShowPassword] = useState(false);

  // use navigate hook to redirect to another page on successfull login
  const navigate = useNavigate();

  //   function to handle the signing action
  const handlesubmit = async (e) => {

    // prevent the app from reloading
    e.preventDefault()

    // clear any previous error before new attempt
    setError("")

    //update the loading hook with the meassage
    setLoading("Please wait as we sign in to your account...")

    try {
      // create a formdata for email and pasword
      const formdata = new FormData()

      //   insert the emal and the password
      formdata.append("email", email)
      formdata.append("password", password)

      // axios module to help connect https protocol
      const response = await axios.post("https://bonnie.alwaysdata.net/api/signin", formdata)

      // set the loading hook back to default
      setLoading("");

      // check whether the user exists as paert of you api response from the api
      if (response.data.user) {
        
        // 1. Save token, role parameters, and user details to localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.user.role); 
        localStorage.setItem("username", response.data.user.username);

        // if yhe user exist ,update the success hook with a message
        setSuccess("Login successful!")

        // back to default
        setEmail("")
        setPassword("")

        // 2. Conditional Routing based on User Role with delayed execution
        setTimeout(() => {
          setSuccess("");
          if (response.data.user.role === "admin") {
            // Send admins straight to the admin dashboard panel
            window.location.href = "/admin"; 
          } else {
            // Send regular users to the standard client area or homepage
            navigate("/getproduct2"); 
          }
        }, 1500);

      }
      else {
        //   user credantials are missing enterd are incorrect
        setError("invalid email or password")

        // error hide after 4sec
        setTimeout(() => {
          setError("");
        }, 3000);
      }

    }
    catch (error) {
      // set loading back to default
      setLoading("")

      // Extract error message text or fallback gracefully
      const errorMsg = error.response?.data?.message || "Login failed please try again";

      // update the error on the hook with as msg
      setError(errorMsg)

      // clear error message displayed
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  return (
    <>
      {/* Navbar moved inside return */}
      {/* <Navbar /> */}

      {/* Main split layout container */}
      <div style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden"
      }}>

        {/* ── LEFT SIDE IMAGE (NEW) ── */}
        <div style={{
          flex: 1,
          position: "relative"
        }}>
          <img
            src="/images/excavator.jpg"
            alt="construction"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />

          {/* overlay text like your reference image */}
          <div style={{
            position: "absolute",
            bottom: "40px",
            left: "30px",
            color: "#fff",
            maxWidth: "300px"
          }}>
            <p style={{ fontSize: "0.9rem", marginBottom: "10px" }}>
              “Access powerful machinery anytime, anywhere.”
            </p>
            <h4 style={{ margin: 0 }}>SEARCHING LTD</h4>
            <small>CONSTRUCTION PLATFORM</small>
          </div>
        </div>

        {/* ── RIGHT SIDE FORM (YOUR ORIGINAL CARD) ── */}
        <div style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f5f5"
        }}>

          {/* Back Button (NEW) */}
          <button
            onClick={() => navigate("/")}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              padding: "8px 14px",
              cursor: "pointer"
            }}
          >
            ← Back
          </button>

          {/* ── sign in card ── */}
          <div className="signin-card">

            {/* brand logo row at the top of the card */}
            <div className="signin-brand">
              <div className="signin-brand-icon">🛒</div>
              <span className="signin-brand-name">Searching Ltd</span>
            </div>

            {/* page heading and subtitle */}
            <h1 className="signin-heading">Welcome back</h1>
            <p className="signin-subheading">Sign in to your account to continue</p>

            {/* ── status messages ── */}
            {/* loading indicator shown while the api request is in progress */}
            {loading && (
              <div className="signin-status loading">
                ⏳ {loading}
              </div>
            )}

            {/* success message shown after a successful login */}
            {success && (
              <div className="signin-status success">
                 {success}
              </div>
            )}

            {/* error message shown when login fails */}
            {error && (
              <div className="signin-status error">
                 {error}
              </div>
            )}

            {/* ── sign in form ── */}
            <form onSubmit={handlesubmit}>

              {/* enter email input */}
              <div className="signin-field">
                <label className="signin-label">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="signin-input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* enter password input */}
              <div className="signin-field">
                <label className="signin-label">Password</label>
                <div style={{ position: "relative", width: "100%" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="signin-input"
                    style={{ width: "100%", paddingRight: "40px" }}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* Eye toggle button container */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      color: "#6b7280",
                      padding: 0
                    }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* submit button */}
              <button type="submit" className="signin-btn">
                Sign In
              </button>

            </form>

            {/* Forgot Password Link */}
            <div className="signin-forgot">
              <span>Forgot your password? </span>
              <Link to="/forgotpassword">Reset it here</Link>
            </div>

            <hr className="signin-divider" />

            {/* sign up prompt for new users */}
            <div className="signin-signup-prompt">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Signin;