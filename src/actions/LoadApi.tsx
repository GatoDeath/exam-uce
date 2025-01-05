import axios from "axios";
import { Product } from "../interface/req.api";

export const loadApi = async (): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>("https://fakestoreapi.com/products");
  return data;
};
