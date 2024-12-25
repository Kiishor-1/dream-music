import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";

export default function Main() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="h-screen w-screen flex items-center min-w-screen overflow-hidden">
      <div className="p-4 lg:hidden self-start bg-black text-white h-full">
        <FaBars className="text-[1.2rem] cursor-pointer" onClick={toggleSidebar} />
      </div>
      <div
        className={`fixed inset-y-0 left-0 shadow-lg h-full transform z-[10] ${isSidebarOpen ? "translate-x-0" : "translate-x-[-120%]"
          } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex-1 h-full overflow-y-auto bg-gradient-to-b from-red-900 to-black hideScroll">
        <Outlet />
      </div>
    </div>
  )
}
