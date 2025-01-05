import { useState } from "react";
import { statesOfLogin, useAuthContext } from "../context/AuthContext";
import PrincipalPage from "./PrincipalPage";

export default function Login() {
  const { state, loginEmailWithPassword, logoutOfAccount } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (state === statesOfLogin.login) {
    return (
      <>
        <button
          onClick={logoutOfAccount}
          className="bg-red-500 text-white rounded-2xl mt-2 p-2 ml-2"
        >
          Logout
        </button>
        <PrincipalPage />
      </>
    );
  }

  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          Login
        </h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-gray-300 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-gray-300 p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                loginEmailWithPassword(email, password);
              }}
              className="flex w-full justify-center rounded-md bg-blue-500 text-white py-2"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
