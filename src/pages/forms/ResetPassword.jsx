import "./form.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getResetPassword,
  resetPassword,
} from "../../redux/apiCalls/passwordApiCall";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ResetPassword = () => {
  const [form, setForm] = useState({
    password: "",
  });

  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.password);
  const { userId, token } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    dispatch(getResetPassword(userId, token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, token]);

  // on change input handler
  const formDataChangeHandle = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (form.password.trim() === "") return toast.error("Password is required");
    dispatch(resetPassword(form.password, { userId, token }));
    nav("/login");
  };

  return (
    <section className="form-container">
      {isError ? (
        <h1>Not Found</h1>
      ) : (
        <>
          <h1 className="form-title">Reset Password</h1>
          <form className="form" onSubmit={formSubmitHandler}>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-input"
                id="password"
                name="password"
                placeholder="Enter your New password"
                value={form.password}
                onChange={formDataChangeHandle}
              />
            </div>

            <button type="submit" className="form-btn">
              Submit
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default ResetPassword;
