import React from "react";

const Order = ({ onClick }) => {
  return (
    <div>
      <button onClick={() => onClick("abcDesc")}>click</button>
    </div>
  );
};

export default Order;
