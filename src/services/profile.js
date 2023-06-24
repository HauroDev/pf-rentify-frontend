import axios from "axios";
import { PRODUCTS_API } from "../utils/apiRoutes";

export const getUserProducts = async (id) => {
  const { data } = await axios.get(`${PRODUCTS_API}/user/${id}`);
  console.log(data);
  return data;
};
