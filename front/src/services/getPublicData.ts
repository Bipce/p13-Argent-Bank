import { IAccount } from "../models/IAccount.ts";
import axios from "axios";
import { IFeatureItem } from "../models/IFeatureItem.ts";

const publicDataApi = axios.create({
  baseURL: "/data",
});

export const getAccountsData = async (): Promise<IAccount[]> => {
  const res = await publicDataApi.get<IAccount[]>("/accounts.json");
  return res.data;
};

export const getFeatureItems = async (): Promise<IFeatureItem[]> => {
  const res = await publicDataApi.get<IFeatureItem[]>("/featureItems.json");
  return res.data;
};