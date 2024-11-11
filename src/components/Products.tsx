import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartCtx";
import { FaMinus, FaPlus } from "react-icons/fa6";

export type Product = {
  id: string;
  name: string;
  price: string;
  quantity: number;
};
const Products = () => {
  const { items, setItems } = useCart();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addToCart = (prod: Product) => {
    setItems([
      ...items,
      {
        ...prod,
        quantity: 1,
      },
    ]);
  };

  const increaseItem = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseItem = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity >= 1 ? item.quantity - 1 : item.quantity,
            }
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="relative">
      <div className="p-3 flex flex-wrap gap-3 justify-center items-center mt-10">
        {products.map((prod) => (
          <div className="w-[20%] shadow-sm bg-secondary/5 p-5 rounded-md">
            <p>{prod.name}</p>
            <p>{prod.price}</p>
            <div className="flex items-center my-2 justify-around">
              <FaMinus
                size={28}
                color="#FFF"
                className="text-white bg-primary p-2 rounded-lg cursor-pointer"
                onClick={() => decreaseItem(prod.id)}
              />
              <span>
                {items.find((item) => item.id === prod.id)?.quantity ?? 0}
              </span>
              <FaPlus
                size={28}
                color="#FFF"
                className="text-white bg-primary p-2 rounded-lg cursor-pointer"
                onClick={() => increaseItem(prod.id)}
              />
            </div>
            {items.find((item) => item.id === prod.id) ? (
              <button
                className="border-2 border-primary bg-white mt-2 p-3 text-primary rounded-lg w-full"
                onClick={() => removeFromCart(prod.id)}
              >
                Remove from cart
              </button>
            ) : (
              <button
                className="bg-primary mt-2 p-3 text-white rounded-lg w-full"
                onClick={() => addToCart(prod)}
              >
                Add to cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
