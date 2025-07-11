import { profileActions } from "../slices/profileSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";

// Get User Profile
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);

      dispatch(profileActions.setProfile(data.user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Upload Profile Photo
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await request.post(
        `/api/users/profile/profile-photo-upload`,
        newPhoto,
        {
          headers: { Authorization: "Bearer " + getState().auth.user.token },
          "Content-Type": "multipart/form-data",
        }
      );
      dispatch(profileActions.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserPhoto(data.profilePhoto));

      // Modify the user in local storage with new photo
      const user = JSON.parse(localStorage.getItem("userInfo"));

      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...user, profilePhoto: data?.profilePhoto })
      );

      dispatch(profileActions.clearLoading());
      toast.success(data.message);
    } catch (error) {
      dispatch(profileActions.clearLoading());
      toast.error(error.response?.data.message);
    }
  };
}

// Upload Profile
export function uploadProfile(userId, profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        profile,
        {
          headers: { Authorization: "Bearer " + getState().auth.user.token },
        }
      );
      dispatch(profileActions.updateProfile(data.user));
      dispatch(authActions.setUserName(data.user.username));

      // Modify the user in local storage with new photo
      const user = JSON.parse(localStorage.getItem("userInfo"));

      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...user, username: data?.user.username })
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete Profile
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await request.delete(`/api/users/profile/${userId}`, {
        headers: { Authorization: "Bearer " + getState().auth.user.token },
      });
      dispatch(profileActions.setIsProfileDeleted());
      toast.success(data?.message);
      setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(profileActions.clearLoading());
    }
  };
}

// Get Users Count (for admin dashboard)
export function getUsersCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/count`, {
        headers: { Authorization: "Bearer " + getState().auth.user.token },
      });
      dispatch(profileActions.setUserCount(data.usersCount));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Get All Users Profile (for admin dashboard)
export function getAllUsersProfile() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/profile`, {
        headers: { Authorization: "Bearer " + getState().auth.user.token },
      });
      dispatch(profileActions.setProfiles(data.users));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
