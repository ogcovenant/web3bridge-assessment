import { useState } from "react";
import { useCart } from "../contexts/CartCtx";

const Checkout = () => {
  const { items, discount, applyCoupon } = useCart();
  const [coupon, setCoupon] = useState("");

  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  return (
    <div className="absolute w-[30%] top-52 left-52 bg-white p-6">
      <h2 className="text-2xl">Checkout</h2>
      <p className="mt-5">Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Discount: -${discountAmount.toFixed(2)}</p>
      <p>Total: ${total.toFixed(2)}</p>
      <input
        type="text"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        placeholder="Enter coupon code"
        className="mt-5 border-2 p-3 rounded-md"
      />
      <button onClick={() => applyCoupon(coupon)} className="bg-primary p-3 text-white rounded-md">Apply Coupon</button>
    </div>
  );
};

export default Checkout;
