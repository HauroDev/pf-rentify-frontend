import axios from "axios";
import { PRODUCTS_API, USER_API } from "../utils/apiRoutes";
import { getTokenConfig } from "./tokenConfig";

export const getUserProducts = async (id) => {
  const config = getTokenConfig();
  console.log(id);
  const { data } = await axios.get(`${PRODUCTS_API}/user/${id}`, config);

  return data;
};

export const updateUserName = async (id, name) => {
  console.log(id);
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
  console.log(id);
  const config = getTokenConfig();

  const { data } = await axios.put(
    `${USER_API}/update-phone`,
    {
      idUser: id, // Reemplaza "yourUserId" con el ID de usuario correcto
      phone: phone,
    },
    config
  );

  return data;
};

export const updateProductstatusPub = async (idProd, statusPub) => {
  console.log(id, statusPub);
  console.log("INPUT STATUSPUBs");
  const config = getTokenConfig();

  const { data } = await axios.put(
    `${PRODUCTS_API}/update-status`,
    {
      idProd: idProd, // Reemplaza "yourUserId" con el ID de usuario correcto
      statusPub: statusPub,
    },
    config
  );
  console.log(data);
  return { idProd, statusPub };
};

export const updateProductName = async ({ idProd, name }) => {
  console.log(idProd, name);
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
  console.log(idProd, price);
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
