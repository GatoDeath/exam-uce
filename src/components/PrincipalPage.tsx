import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function PrincipalPage() {
  const { logoutOfAccount } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutOfAccount();
    navigate("/");
  };

  return (
    <div className="text-center p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white rounded-2xl mt-2 p-2 ml-2"
      >
        Logout
      </button>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/todo")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Go to ToDoList
        </button>
        <button
          onClick={() => navigate("/fechapi")}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Go to FechApi
        </button>
      </div>
    </div>
  );
}
