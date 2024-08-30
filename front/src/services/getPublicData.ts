import { IAccount } from "../models/IAccount.ts";
import axios from "axios";
import { IFeatureItem } from "../models/IFeatureItem.ts";

export const getAccountsData = async (): Promise<IAccount[]> => {
  const res = await axios.get<IAccount[]>("/data/accounts.json");
  return res.data;
};

export const getFeatureItems = async (): Promise<IFeatureItem[]> => {
  const res = await axios.get<IFeatureItem[]>("/data/featureItems.json");
  return res.data;
};