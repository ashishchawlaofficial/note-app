import { createSlice } from "@reduxjs/toolkit";
import { useApiEndpoint } from "../../utils/Functions";

const initialState = {
  loading: "idle",
  data: [],
  category: [],
  error: "",
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setLoader: (state) => {
      if (state.loading === "idle") state.loading = "pending";
    },
    setData: (state, action) => {
      state.data = [...state.data, action.payload];
      if (state.loading === "pending") state.loading = "idle";
    },
    setCategory: (state, action) => {
      state.category = [...state.category, action.payload];
      if (state.loading === "pending") state.loading = "idle";
    },
    setError: (state, action) => {
      state.error = action.payload;
      if (state.loading === "pending") state.loading = "idle";
    },
  },
});

export const { setLoader, setData, setCategory, setError } = noteSlice.actions;

export default noteSlice.reducer;

// Async Thunk Functions

export const postData = (data, userID) => async (dispatch) => {
  dispatch(setLoader());
  const endpoint = useApiEndpoint(userID, "items");

  try {
    const request = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (request.ok) {
      dispatch(setData(data));
    } else {
      throw new Error({
        statusCode: request.status,
        message: request.statusText,
      });
    }
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const getData = (userID) => async (dispatch) => {
  dispatch(setLoader());
  const endpoint = useApiEndpoint(userID, "items");

  try {
    const request = await fetch(endpoint);

    if (request.ok) {
      const response = request.json();
      dispatch(setData(response));
    } else {
      throw new Error({
        statusCode: request.status,
        message: request.statusText,
      });
    }
  } catch (err) {
    dispatch(setError(err.message));
  }
};
