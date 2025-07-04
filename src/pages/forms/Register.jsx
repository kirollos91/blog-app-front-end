import "./form.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import Swal from "sweetalert2";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const nav = useNavigate();
  const { registerMessage } = useSelector((state) => state.auth);

  // on change input handler
  const formDataChangeHandle = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (form.username.trim() === "") return toast.error("Username is required");
    if (form.email.trim() === "") return toast.error("Email is required");
    if (form.password.trim() === "") return toast.error("Password is required");

    dispatch(registerUser(form));
  };

  if (registerMessage) {
    Swal.fire({
      title: registerMessage || "",
      icon: "success",
    }).then((result) => {
      if (result) {
        // go to login page
        nav("/login");
      }
    });
  }

  return (
    <section className="form-container">
      <h1 className="form-title">Create New Account</h1>
      <form className="form" onSubmit={formSubmitHandler}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-input"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={form.username}
            onChange={formDataChangeHandle}
          />
        </div>

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
          Register
        </button>
      </form>

      <div className="form-footer">
        Already have an account?
        <Link to="/login">Login</Link>
      </div>
    </section>
  );
};

export default Register;
