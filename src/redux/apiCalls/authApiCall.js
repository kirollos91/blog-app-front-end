import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Login User
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);

      dispatch(authActions.login(data.user));
      localStorage.setItem("userInfo", JSON.stringify(data.user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Logout User
export function logoutUser() {
  return async (dispatch) => {
    try {
      dispatch(authActions.logout());
      localStorage.removeItem("userInfo");
    } catch (error) {
      toast.error(error.message);
    }
  };
}

// Register User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);

      dispatch(authActions.register(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Verify Email
export function verifyEmail(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);

      dispatch(authActions.setEmailVerified());
    } catch (error) {
      // toast.error(error.response.data.message);
      console.error(error);
    }
  };
}
