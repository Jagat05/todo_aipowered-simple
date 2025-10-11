// import Link from "next/link";
// import React from "react";

// const Navbar = () => {
//   return (
//     <div>
//       <div className="flex justify-between items-center h-16 bg-blue-800">
//         <div className="logo mx-6 text-xl font-bold">AI_ToDo</div>
//         <div className="menus ">
//           <ul className="flex gap-5  items-center">
//             <li>
//               {" "}
//               <Link href="/">Home</Link>
//             </li>
//             <li>
//               {" "}
//               <Link href="/about">Contact</Link>
//             </li>
//             <li>
//               {" "}
//               <Link href="/contact">About</Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between bg-gray-900 text-white px-6 py-3 shadow-md">
      {/* Left - Logo */}
      <div className="logo mx-6 text-xl font-bold hover:text-blue-400">
        AI_ToDo
      </div>

      {/* Right - GitHub Icon */}
      <a
        href="https://github.com/Jagat05"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-400 text-2xl"
      >
        <FaGithub />
      </a>
    </nav>
  );
};

export default Navbar;
