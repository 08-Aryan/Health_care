import React from "react";

const Card = ({ title, value, icon, children }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition">
      {icon && <div className="mb-2 text-2xl text-blue-600">{icon}</div>}
      {title && <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>}
      {value && <p className="text-2xl font-bold text-gray-900">{value}</p>}
      {children && <div>{children}</div>}
    </div>
  );
};

export default Card;
