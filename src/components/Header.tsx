import { FaCartShopping } from "react-icons/fa6";
import logo from "../assets/web3.svg";
import { useCart } from "../contexts/CartCtx";

const Header = () => {

    const {items} = useCart()

    let quantity = 0;

    items.forEach((item) => {
        quantity += item.quantity
    })


  return (
    <div className="p-6 bg-primary/5 flex justify-between font-geist">
      <img src={logo} alt="Web3Bridge Logo" className="w-32" />
      <div className="flex items-center gap-1 border-[2px] p-3 px-4 cursor-pointer border-primary rounded-lg relative">
        <FaCartShopping size={26} />
        <span>Cart</span>
        <span className="absolute bg-primary text-white rounded-full text-sm top-1 right-1 w-5 h-5 flex justify-center items-center ">{quantity}</span>
      </div>
    </div>
  );
};

export default Header;
