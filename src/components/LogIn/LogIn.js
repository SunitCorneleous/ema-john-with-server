import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Divider from "../../assets/Divider.png";
import { AuthContext } from "../../contexts/UserContext";
import "./Login.css";

const LogIn = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">Login</h1>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit" className="login-btn">
          Log In
        </button>
      </form>
      <p className="new-account">
        New to Ema-john? <Link to="/signup">Create New Account</Link>
      </p>
      <img src={Divider} alt="" className="divider" />
      <button className="google-btn">Continue with Google</button>
    </div>
  );
};

export default LogIn;
