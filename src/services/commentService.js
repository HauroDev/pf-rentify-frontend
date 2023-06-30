import axios from 'axios'
import {COMMENT_API } from '../utils/apiRoutes'
export const postComment=async(comment)=>{
    const{data}=await axios.post(`${COMMENT_API}`,comment)
    return data;
}

export const getComment=async(idProd)=>{
    const {data}=await axios.get(`${COMMENT_API}/${idProd}`)
    return data
}
