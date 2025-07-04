import { Link } from "react-router-dom";
import "./admin-table.css";
import AdminSidebar from "./AdminSidebar";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersProfile,
  deleteProfile,
} from "../../redux/apiCalls/profileApiCall";
import { useEffect } from "react";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllUsersProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProfileDeleted]);

  // Delete User Handler
  const deleteUserHandler = async (profileId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return; //Swal.fire({ titleText: "Something went wrong!", icon: "warning" });

    dispatch(deleteProfile(profileId));

    Swal.fire({
      title: "Deleted!",
      text: "User has been deleted.",
      icon: "success",
    });
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Users</h1>

        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles?.map((profile, index) => (
              <tr key={profile?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={profile?.profilePhoto.url}
                      alt="user-avatar"
                      className="table-user-image"
                    />
                    <span className="table-username">{profile?.username}</span>
                  </div>
                </td>
                <td>{profile?.email}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/${profile?._id}`}>View Profile</Link>
                    </button>
                    <button onClick={() => deleteUserHandler(profile?._id)}>
                      Delete User
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UsersTable;
