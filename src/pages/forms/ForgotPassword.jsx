import "./form.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/apiCalls/passwordApiCall";

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
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

    dispatch(forgotPassword(form.email));
  };

  return (
    <section className="form-container">
      <h1 className="form-title">Forgot Password</h1>
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

        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default ForgotPassword;
