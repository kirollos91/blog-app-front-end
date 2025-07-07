import "./profile.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdateProfileModal from "./UpdateProfileModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCall";
import { useParams, useNavigate } from "react-router-dom";
import PostItem from "../../components/posts/PostItem";
import { MoonLoader } from "react-spinners";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const Profile = () => {
  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);

  const { id } = useParams();
  const nav = useNavigate();

  const dispatch = useDispatch();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (isProfileDeleted) nav("/");
  }, [nav, isProfileDeleted]);

  // form handler submit
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!file) return toast.warning("There is no file!");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadProfilePhoto(formData));
    setFile(null);
  };

  // Delete Account Handler
  const deleteAccountHandler = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this profile!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    dispatch(deleteProfile(user?._id));
    dispatch(logoutUser());

    Swal.fire({
      title: "Deleted!",
      text: "Your Account has been deleted.",
      icon: "success",
    });
  };

  if (loading)
    return (
      <div className="profile-loader">
        <MoonLoader speedMultiplier={0.7} />
      </div>
    );

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
            alt="user-avatar"
            className="profile-image"
          />

          {user?._id === profile?._id && (
            <form onSubmit={formSubmitHandler}>
              <abbr title="choose profile photo">
                <label
                  htmlFor="file"
                  className="bi bi-camera-fill upload-profile-photo-icon"
                ></label>
              </abbr>

              <input
                type="file"
                name="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />

              <button type="submit" className="upload-profile-photo-btn">
                upload
              </button>
            </form>
          )}
        </div>

        <h1 className="profile-username">{profile?.username}</h1>

        <p className="profile-bio">{profile?.bio}</p>

        <div className="user-date-joined">
          <strong>Date Join: </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>

        {user?._id === profile?._id && (
          <button
            className="profile-update-btn"
            onClick={() => setUpdateProfile(true)}
          >
            <i className="bi bi-file-person-fill"></i>
            Update Profile
          </button>
        )}
      </div>

      <div className="profile-post-list">
        <h2 className="profile-post-list-title">{profile?.username} Posts</h2>
        {/* <PostList posts={profile?.posts || []} /> */}

        {profile?.posts?.map((post) => (
          <PostItem
            key={post?._id}
            post={post || []}
            username={profile?.username}
            userId={profile?._id}
          />
        ))}
      </div>

      {user?._id === profile?._id && (
        <button className="delete-account-btn" onClick={deleteAccountHandler}>
          Delete your account
        </button>
      )}

      {updateProfile && (
        <UpdateProfileModal setUpdateProfile={setUpdateProfile} />
      )}
    </section>
  );
};

export default Profile;
