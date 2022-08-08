import axios from "axios";
import { baseUrl } from "./config";

export const signup = async (payload) => {
  try {
    const res = await axios.post(baseUrl + `/signup`, payload);
    console.log({ res });
  } catch (error) {
    console.log(error);
  }
};
