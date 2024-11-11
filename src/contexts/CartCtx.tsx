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
  
  // Create a cart context with a default value
  const cartCtx = createContext<CartCtx>({
    items: [],
    setItems: () => {},
  });
  
  export const CartCtx = ({ children }: { children: ReactNode }) => {
    // Check localStorage for saved items or use an empty array if not found
    const data = JSON.parse(localStorage.getItem("cart") as string) || [];
  
    // Initialize state with the data from localStorage
    const [items, setItems] = useState<Product[]>(data);
  
    // Use an effect to update localStorage whenever `items` changes
    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);
  
    return (
      <cartCtx.Provider value={{ items, setItems }}>
        {children}
      </cartCtx.Provider>
    );
  };
  
  // Custom hook to use the cart context
  export const useCart = () => {
    const { items, setItems } = useContext(cartCtx);
  
    return { items, setItems };
  };
  