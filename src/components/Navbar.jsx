import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between items-center h-16 bg-blue-800">
        <div className="logo mx-6 text-xl font-bold">AI_ToDo</div>
        <div className="menus ">
          <ul className="flex gap-5  items-center">
            <li>
              {" "}
              <Link href="/">Home</Link>
            </li>
            <li>
              {" "}
              <Link href="/about">Contact</Link>
            </li>
            <li>
              {" "}
              <Link href="/contact">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
