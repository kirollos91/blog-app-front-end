import "./form.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  // on change input handler
  const formDataChangeHandle = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (form.email.trim() === "") return toast.error("Email is required");
    if (form.password.trim() === "") return toast.error("Password is required");
    dispatch(loginUser(form));
  };

  return (
    <section className="form-container">
      <h1 className="form-title">Login to your account</h1>
      <form className="form" onSubmit={formSubmitHandler}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={formDataChangeHandle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-input"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={formDataChangeHandle}
          />
        </div>

        <button type="submit" className="form-btn">
          Login
        </button>
      </form>

      <div className="form-footer">
        Did you forgot your password?
        <Link to="/forgot-password">Forgot Password</Link>
      </div>
    </section>
  );
};

export default Login;
