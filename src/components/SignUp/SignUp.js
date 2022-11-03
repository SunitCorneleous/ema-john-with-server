import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Divider from "../../assets/Divider.png";
import { AuthContext } from "../../contexts/UserContext";
import "./SignUp.css";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    setError("");

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters or more");
      return;
    }

    if (password !== confirm) {
      setError("Password did not match");
      return;
    }

    // create new user
    createUser(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        form.reset();
      })
      .catch(error => console.error("error: ", error));
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">Sign Up</h1>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
        </div>
        <div className="form-control">
          <label htmlFor="confirm">Confirm Password</label>
          <input type="password" name="confirm" required />
        </div>
        <p className="error-message">{error}</p>
        <button type="submit" className="login-btn">
          Sign Up
        </button>
      </form>
      <p className="new-account">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <img src={Divider} alt="" className="divider" />
      <button className="google-btn">Continue with Google</button>
    </div>
  );
};

export default SignUp;
