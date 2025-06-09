"use client";

import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";

export default function AuthButton() {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  return isAuthenticated ? (
    <>
      <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white text-sm font-semibold">
        {user?.username?.charAt(0).toUpperCase()}
      </div>
      <LogoutButton />
    </>
  ) : (
    <a
      href="/auth"
      className="hidden md:flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
    >
      <span>Sign Up</span>
    </a>
  );
}
// "use client";

// import { useSelector } from "react-redux";

// export default function AuthButton({ variant = "desktop" }) {
//   const { user, isAuthenticated } = useSelector((state) => state.user);

//   return isAuthenticated ? (
//     <>
//       {variant === "desktop" ? (
//         <>
//           <div className=" items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white text-sm font-semibold">
//             {user?.username?.charAt(0).toUpperCase()}
//           </div>
//           <LogoutButton />
//         </>
//       ) : (
//         // Mobile version
//         <div className="flex flex-col space-y-2">
//           <div className="flex items-center space-x-2 text-blue-600 font-semibold">
//             Hello, {user?.username}
//           </div>
//           <LogoutButton />
//         </div>
//       )}
//     </>
//   ) : (
//     <>
//       {variant === "desktop" ? (
//         <a
//           href="/auth"
//           className="hidden md:flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
//         >
//           <span>Sign Up</span>
//         </a>
//       ) : (
//         // Mobile version
//         <a
//           href="/auth"
//           className="flex w-full justify-center bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
//         >
//           <span>Sign Up</span>
//         </a>
//       )}
//     </>
//   );
// }
