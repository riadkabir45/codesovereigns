import React from "react";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state?.cart?.value?.cart);
  return (
    <div className="items-center flex gap-x-6">
      <i className="nf nf-fa-search text-lg"></i>
      <i className="nf nf-fa-bag_shopping relative text-lg">
        <Badge className={"absolute left-1/2 -top-1/2 text-xs"}>
          {cart?.length || 0}
        </Badge>
      </i>
      <i className="nf nf-md-signal -rotate-90 md:hidden"></i>
    </div>
  );
};

export default Cart;
