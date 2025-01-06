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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-150"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Bienvenido a tu Dashboard
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ToDo Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold mb-2">Lista de Tareas</h3>
              <p className="text-blue-100 mb-4">
                Gestiona tus tareas diarias de manera eficiente
              </p>
              <button
                onClick={() => navigate("/todo")}
                className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-150"
              >
                Ir a Lista de Tareas
              </button>
            </div>

            {/* API Card */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold mb-2">API Explorer</h3>
              <p className="text-green-100 mb-4">
                Explora y gestiona datos de la API
              </p>
              <button
                onClick={() => navigate("/fechapi")}
                className="w-full px-4 py-2 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors duration-150"
              >
                Ir a API Explorer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}