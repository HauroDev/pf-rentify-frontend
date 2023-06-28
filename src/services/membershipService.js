import axios from "axios";
import { MCP_API } from "../utils/apiRoutes";

export const membershipService = async (infoMembership) =>{
    const {data} = await axios.post(`${MCP_API}/suscription`,infoMembership);
    return data;
}