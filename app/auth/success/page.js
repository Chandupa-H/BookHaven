// "use client";

// import { useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { setUser } from "@/store/slices/userSlice";
// import { jwtDecode } from "jwt-decode";

// export default function AuthSuccessPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const token = searchParams.get("token");
//     if (token) {
//       const decoded = jwtDecode(token);

//       dispatch(
//         setUser({
//           user: { username: decoded.username, id: decoded.id }, // or get this from server
//           token: token,
//         })
//       );

//       router.replace("/");
//     }
//   }, [searchParams, dispatch, router]);

//   return <div>Logging you in...</div>;
// }
//
"use client";
import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { jwtDecode } from "jwt-decode";

// Component that uses useSearchParams
function AuthSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        dispatch(
          setUser({
            user: {
              username: decoded.username,
              id: decoded.id,
            },
            token: token,
          })
        );

        router.replace("/");
      } catch (error) {
        console.error("Error decoding token:", error);
        router.replace("/auth/login?error=invalid_token");
      }
    } else {
      // No token found, redirect to login
      router.replace("/auth/login?error=no_token");
    }
  }, [searchParams, dispatch, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Logging you in...</p>
      </div>
    </div>
  );
}

// Loading fallback component
function AuthSuccessLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-pulse">
          <div className="h-12 w-12 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <div className="h-4 w-32 bg-gray-300 rounded mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function AuthSuccessPage() {
  return (
    <Suspense fallback={<AuthSuccessLoading />}>
      <AuthSuccessContent />
    </Suspense>
  );
}
// "use client";
// import { useEffect, Suspense } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { setUser } from "@/store/slices/userSlice";
// // import { setCart } from "@/store/slices/cartSlice";
// import { jwtDecode } from "jwt-decode";

// function AuthSuccessContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const token = searchParams.get("token");

//     const fetchUserData = async (token, userId) => {
//       try {
//         const res = await fetch(`/api/users/${userId}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch user data");

//         const response = await res.json();
//         const userData = response.data;

//         // Dispatch setUser with full user data
//         dispatch(
//           setUser({
//             user: {
//               id: userData._id,
//               username: userData.username,
//               email: userData.email,
//               role: userData.role,
//               // you can add more fields if needed
//             },
//             token: token,
//           })
//         );

//         // // Dispatch setCart with user's cart
//         // if (userData.cart) {
//         //   const cartItems = userData.cart.map((item) => ({
//         //     book: item.book,
//         //     quantity: item.quantity,
//         //   }));

//         //   dispatch(setCart(cartItems));
//         // }

//         // Navigate to home
//         router.replace("/");
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         router.replace("/auth/login?error=fetch_user_failed");
//       }
//     };

//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         const userId = decoded.id;

//         // Now fetch full user data with token
//         fetchUserData(token, userId);
//       } catch (error) {
//         console.error("Error decoding token:", error);
//         router.replace("/auth/login?error=invalid_token");
//       }
//     } else {
//       // No token found, redirect to login
//       router.replace("/auth/login?error=no_token");
//     }
//   }, [searchParams, dispatch, router]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//         <p className="text-gray-600">Logging you in...</p>
//       </div>
//     </div>
//   );
// }

// // Loading fallback component
// function AuthSuccessLoading() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="text-center">
//         <div className="animate-pulse">
//           <div className="h-12 w-12 bg-gray-300 rounded-full mx-auto mb-4"></div>
//           <div className="h-4 w-32 bg-gray-300 rounded mx-auto"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function AuthSuccessPage() {
//   return (
//     <Suspense fallback={<AuthSuccessLoading />}>
//       <AuthSuccessContent />
//     </Suspense>
//   );
// }
