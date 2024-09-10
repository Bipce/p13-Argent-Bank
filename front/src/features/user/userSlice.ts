import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";

interface UserSlice {
  firstName: string;
  lastName?: string;
}

const initialState: UserSlice = {
  firstName: "",
  lastName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserSlice>) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user;