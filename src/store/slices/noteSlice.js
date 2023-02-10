import { createSlice } from "@reduxjs/toolkit";
import { useApiEndpoint, flattenResponse } from "../../utils/Functions";

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
      state.error = "";
      if (state.loading === "pending") state.loading = "idle";
    },
    updateData: (state, action) => {
      state.data = action.payload;
      state.error = "";
      if (state.loading === "pending") state.loading = "idle";
    },
    deleteRecord: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.error = "";
      if (state.loading === "pending") state.loading = "idle";
    },
    setError: (state, action) => {
      state.error = action.payload;
      if (state.loading === "pending") state.loading = "idle";
    },
  },
});

export const { setLoader, setData, setError, updateData, deleteRecord } =
  noteSlice.actions;

export default noteSlice.reducer;

// Async Thunk Functions

export const postData = (data, userID, accessToken) => async (dispatch) => {
  dispatch(setLoader());
  const endpoint = useApiEndpoint(userID, "items", accessToken);

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

export const getData = (userID, accessToken) => async (dispatch) => {
  dispatch(setLoader());
  const endpoint = useApiEndpoint(userID, "items", accessToken);

  try {
    const request = await fetch(endpoint);

    if (request.ok) {
      const response = await request.json();
      dispatch(updateData(flattenResponse(response)));
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

export const deleteNote = (noteID, userID, accessToken) => async (dispatch) => {
  dispatch(setLoader());
  const endpoint = useApiEndpoint(userID, `items/${noteID}`, accessToken);

  try {
    const request = await fetch(endpoint, { method: "DELETE" });

    if (request.ok) {
      dispatch(deleteRecord(noteID));
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

export const editNote =
  (noteID, data, userID, accessToken) => async (dispatch) => {
    dispatch(setLoader());
    const endpoint = useApiEndpoint(userID, `items/${noteID}`, accessToken);

    try {
      const request = await fetch(endpoint, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (request.ok) {
        const response = await request.json();
        dispatch(updateData(flattenResponse(response)));
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
