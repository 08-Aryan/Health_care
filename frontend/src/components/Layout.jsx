import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto py-6 px-4">{children}</main>
    </div>
  );
};

export default Layout;
