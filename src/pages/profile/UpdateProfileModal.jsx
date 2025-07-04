import { useState } from "react";
import "./update-profile.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uploadProfile } from "../../redux/apiCalls/profileApiCall";

const UpdateProfileModal = ({ setUpdateProfile }) => {
  const { profile } = useSelector((state) => state.profile);

  const [form, setForm] = useState({
    username: profile?.username,
    bio: profile?.bio,
    password: "",
  });
  const { id } = useParams();
  const dispatch = useDispatch();

  // form data change handle all in one
  const formDataChangeHandle = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // Form Handler Submit
  const formSubmitHandler = (e) => {
    e.preventDefault();

    const updatedUser = { username: form.username, bio: form.bio };
    // if (form.password.trim() !== "") updatedUser.password = form.password;
    dispatch(uploadProfile(id, updatedUser));
    setUpdateProfile(false);
  };

  return (
    <div className="update-profile">
      <form className="update-profile-form" onSubmit={formSubmitHandler}>
        <abbr title="close">
          <i
            className="bi bi-x-circle-fill update-profile-form-close"
            onClick={() => setUpdateProfile(false)}
          ></i>
        </abbr>

        <h1 className="update-profile-title">Update Your Profile</h1>
        <input
          type="text"
          name="username"
          className="update-profile-input"
          value={form.username}
          onChange={formDataChangeHandle}
          placeholder="Username"
        />

        <input
          type="text"
          name="bio"
          className="update-profile-input"
          value={form.bio}
          onChange={formDataChangeHandle}
          placeholder="Bio"
        />

        <input
          type="password"
          name="password"
          className="update-profile-input"
          value={form.password}
          onChange={formDataChangeHandle}
          placeholder="Password"
          disabled
        />

        <button type="submit" className="update-profile-btn">
          Update profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModal;
