import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store.ts";

interface UserSlice {
  firstName: string;
  lastName: string;
  isConnected: boolean;
  accessToken?: string;
}

interface IUser {
  firstName: string;
  lastName: string;
}

const initialState: UserSlice = {
  firstName: "",
  lastName: "",
  isConnected: false,
  accessToken: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.isConnected = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.isConnected = false;
      state.firstName = "";
      state.lastName = "";
      state.accessToken = undefined;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
  },
});

export const { setUser, logout, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user;