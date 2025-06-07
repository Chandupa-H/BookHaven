import { logout } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";

export default function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  return (
    <button onClick={handleLogout} className="text-sm text-red-600">
      Logout
    </button>
  );
}
