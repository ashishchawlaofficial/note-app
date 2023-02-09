import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase-config";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const initialState = {
  loading: "idle",
  user: {},
  error: "",
  isLoggedIn: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoader: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.isLoggedIn;

      if (state.loading === "pending") {
        state.loading = "idle";
      }
    },
    setError: (state, action) => {
      state.error = action.payload;

      if (state.loading === "pending") {
        state.loading = "idle";
      }
    },
  },
});

export const { setLoader, setUser, setError } = AuthSlice.actions;

export default AuthSlice.reducer;

// Sign In User
export const signInUser = (email, password) => async (dispatch) => {
  dispatch(setLoader());
  try {
    const request = await signInWithEmailAndPassword(auth, email, password);
    const user = request.user;
    dispatch(setUser({ user, isLoggedIn: true }));
    sessionStorage.setItem("userId", user.uid);
  } catch (err) {
    dispatch(setError(err.message));
  }
};

// Sign Up User
export const signUpUser = (name, email, password) => async (dispatch) => {
  dispatch(setLoader());
  try {
    const request = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: name });
    const user = request.user;
    dispatch(setUser({ user, isLoggedIn: true }));
    sessionStorage.setItem("userId", user.uid);
  } catch (err) {
    dispatch(setError(err.message));
  }
};

// Sign Out User
export const signOutUser = () => async (dispatch) => {
  dispatch(setLoader());
  try {
    await signOut(auth);
    dispatch(setUser({ user: {}, isLoggedIn: false }));
    sessionStorage.clear();
  } catch (err) {
    dispatch(setError(err.message));
  }
};
