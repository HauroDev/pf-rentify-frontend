import axios from "axios";
import { PRODUCTS_API, USER_API } from "../utils/apiRoutes";

export const getUserProducts = async (id) => {
  console.log(id);
  const { data } = await axios.get(`${PRODUCTS_API}/user/${id}`);

  return data;
};

export const updateUserName = async (id, name) => {
  console.log(id);
  const { data } = await axios.put(`${USER_API}/update-name`, {
    idUser: id, // Reemplaza "yourUserId" con el ID de usuario correcto
    name: name,
  });
  console.log(data);
  return data;
};
export const updateUserPhone = async (id, phone) => {
  console.log(id);
  const { data } = await axios.put(`${USER_API}/update-phone`, {
    idUser: id, // Reemplaza "yourUserId" con el ID de usuario correcto
    phone: phone,
  });

  return data;
};

export const updateProductstatusPub = async (id, statusPub) => {
  console.log(id);
  const { data } = await axios.put(`${PRODUCTS_API}/update-status`, {
    idProd: id, // Reemplaza "yourUserId" con el ID de usuario correcto
    statusPub: statusPub,
  });
  console.log(data);
  return data;
};
