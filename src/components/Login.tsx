import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { state, loginEmailWithPassword } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // debugging
  useEffect(() => {
    const stateChanged = () => {
      console.log("Estado actual:", state);
    };

    stateChanged();
  }, [state]);

  useEffect(() => {
    if (state === "login") {
      navigate("/main");
    }
  }, [state, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginEmailWithPassword(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-2xl text-center font-bold text-gray-900 mb-1">
          Bienvenido
        </h1>
        <p className="text-gray-600 text-center text-sm mb-6">
          Ingresa a tu cuenta para continuar
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@ejemplo.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Recordarme
              </label>
            </div>
            <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <a href="#" className="text-blue-500 hover:text-blue-600">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}