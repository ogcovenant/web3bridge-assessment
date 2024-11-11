import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "../components/Products";

type CartCtx = {
  items: Product[];
  setItems: Dispatch<SetStateAction<Product[]>>;
};

const cartCtx = createContext<CartCtx>({
  items: [],
  setItems: () => {},
});

export const CartCtx = ({ children }: { children: ReactNode }) => {
  const data = JSON.parse(localStorage.getItem("cart") as string);

  const [items, setItems] = useState<Product[]>(data);

  return (
    <cartCtx.Provider
      value={{
        items,
        setItems,
      }}
    >
      {children}
    </cartCtx.Provider>
  );
};

export const useCart = () => {
  const { items, setItems } = useContext(cartCtx);

  return { items, setItems };
};
