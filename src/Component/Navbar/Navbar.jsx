// Navbar.jsx
import React from "react";
import { User } from "lucide-react";

const Navbar = () => {
  const userName = "Anna";
  const userRole = "Admin";

  return (
    <div className="bg-slate-900 shadow-sm p-4 flex justify-end items-center">
      <div className="flex items-center">
        <User
          className="w-8 h-8 text-white mr-3"
          style={{
            padding: "4px",
            borderRadius: "50%",
            border: "2px solid currentColor",
          }}
        />
        <div className="flex flex-col mr-2">
          <span className="text-lg text-white font-semibold mr-5">{userName}</span>
          <span className="text-xs font-bold text-slate-300">{userRole}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
