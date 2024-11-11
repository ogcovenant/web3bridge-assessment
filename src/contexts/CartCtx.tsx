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

const COUPON_CODE = "WEB3BRIDGECOHORTx";
const DISCOUNT = 0.1;

type CartCtx = {
  items: Product[];
  setItems: Dispatch<SetStateAction<Product[]>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  discount: number;
  applyCoupon: (code: string) => void;
};

const cartCtx = createContext<CartCtx>({
  items: [],
  setItems: () => {},
  isOpen: false,
  setIsOpen: () => {},
  discount: 0,
  applyCoupon: () => {},
});

export const CartCtx = ({ children }: { children: ReactNode }) => {
  const data = JSON.parse(localStorage.getItem("cart") as string) || [];

  const [items, setItems] = useState<Product[]>(data);
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const applyCoupon = (code: string) => {
    if (code === COUPON_CODE) {
      setDiscount(DISCOUNT);
    } else {
      setDiscount(0); // Reset discount if an invalid code is entered
    }
  };

  return (
    <cartCtx.Provider value={{ items, setItems, isOpen, setIsOpen, discount, applyCoupon }}>
      {children}
    </cartCtx.Provider>
  );
};

export const useCart = () => {
  const { items, setItems, isOpen, setIsOpen, discount, applyCoupon } = useContext(cartCtx);

  return { items, setItems, isOpen, setIsOpen, discount, applyCoupon };
};
