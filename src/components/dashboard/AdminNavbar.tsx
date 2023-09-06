import React from "react";
import DashNav from "../layout/DashNav";
import UserAccount from "./UserAccount";

function AdminNavbar() {
  return (
    <div className="h-14 px-8 w-full border-b border-gray-300 flex items-center justify-between ">
      <DashNav />
      <UserAccount />
    </div>
  );
}

export default AdminNavbar;
