import axios from "axios";
import { ILoginResponse } from "../models/user/ILoginResponse.ts";
import { ILoginRequest } from "../models/user/ILoginRequest.ts";
import { IProfileResponse } from "../models/user/IProfileResponse.ts";

export const login = async (loginData: ILoginRequest): Promise<ILoginResponse> => {
  const res = await axios.post<ILoginResponse>("/user/login", loginData);
  return res.data;
};

export const getProfile = async (): Promise<IProfileResponse> => {
  const res = await axios.post<IProfileResponse>("/user/profile");
  return res.data;
};

export const changeProfileName = async (): Promise<IProfileResponse> => {
  const res = await axios.put<IProfileResponse>("/user/profile", { firstName: "Claire", lastName: "Royer" });
  return res.data;
};