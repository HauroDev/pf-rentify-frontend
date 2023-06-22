import React from "react";

function CartIconEmpty() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="none"
      stroke="#2C3E50"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      className="icon icon-tabler icon-tabler-shopping-cart-x"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path d="M4 19a2 2 0 104 0 2 2 0 10-4 0M15 19a2 2 0 104 0 2 2 0 10-4 0"></path>
      <path d="M17 17H6V3H4"></path>
      <path d="M6 5l8 .571m5.43 4.43l-.429 3h-13M17 3l4 4M21 3l-4 4"></path>
    </svg>
  );
}

export default CartIconEmpty;