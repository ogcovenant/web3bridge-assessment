import { FaMinus, FaPlus, FaXmark } from "react-icons/fa6";
import Header from "./components/Header";
import Products, { Product } from "./components/Products";
import { useCart } from "./contexts/CartCtx";
import { useState } from "react";
import Checkout from "./components/Checkout";

const App = () => {
  const { isOpen, setIsOpen, items, setItems } = useCart();

  const closeCart = () => {
    setIsOpen(false)
  }

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

  const [showCheckout, setShowCheckout] = useState(false)

  return (
    <div className={`relative ${isOpen && "overflow-hidden"}`}>
      <Header />
      <Products />
      {isOpen && (
        <div className="absolute top-0 right-0 bg-white h-screen w-[30%] p-10 overflow-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl">Cart</h1>
            <FaXmark size={30}  className="cursor-pointer" onClick={() => closeCart()}/>
          </div>
          <div className="mt-5">
          {items.map((prod) => (
          <div className="shadow-sm bg-secondary/5 p-5 rounded-md mt-5">
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
          <button className="w-full bg-primary text-white flex justify-center p-3 rounded-lg mt-5" onClick={() => setShowCheckout(true)}>Checkout</button>
        </div>
      )}
      {
        showCheckout && (
          <div className="absolute w-[30%] top-52 left-52 bg-white p-6">
            <FaXmark size={30} onClick={() => setShowCheckout(false)} className="cursor-pointer"/>
            <Checkout />
          </div>
        )
      }
    </div>
  );
};

export default App;
