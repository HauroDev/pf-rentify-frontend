import axios from "axios";
import { PRODUCTS_API, USER_API } from "../utils/apiRoutes";
import { getTokenConfig } from "./tokenConfig";

export const getUserProducts = async (id) => {
  const config = getTokenConfig();

  const { data } = await axios.get(`${PRODUCTS_API}/user/${id}`, config);

  return data;
};

export const updateUserName = async (id, name) => {

  const config = getTokenConfig();
  const { data } = await axios.put(
    `${USER_API}/update-name`,
    {
      idUser: id, // Reemplaza "yourUserId" con el ID de usuario correcto
      name: name,
    },
    config
  );

  return data;
};
export const updateUserPhone = async (id, phone) => {

  const config = getTokenConfig();

  const { data } = await axios.put(
    `${USER_API}/update-phone`,
    {
      idUser: id, // Reemplaza "yourUserId" con el ID de usuario correcto
      phone: phone,
    },
    config
  );

  return phone;
};

export const updateProductstatusPub = async ({ idProd, statusPub }) => {

  const config = getTokenConfig();

  const { data } = await axios.put(
    `${PRODUCTS_API}/update-status`,
    {
      idProd: idProd, // Reemplaza "yourUserId" con el ID de usuario correcto
      statusPub: statusPub,
    },
    config
  );
  return { idProd, statusPub };
};

export const updateProductName = async ({ idProd, name }) => {
  const config = getTokenConfig();
  const { data } = await axios.put(
    `${PRODUCTS_API}/update-name`,
    {
      idProd: idProd, // Reemplaza "yourUserId" con el ID de usuario correcto
      name: name,
    },
    config
  );
  return { idProd, name };
};

export const updateProductPrice = async ({ idProd, price }) => {
  const config = getTokenConfig();
  const { data } = await axios.put(
    `${PRODUCTS_API}/update-price`,
    {
      idProd: idProd, // Reemplaza "yourUserId" con el ID de usuario correcto
      price: price,
    },
    config
  );
  return { idProd, price };
};
