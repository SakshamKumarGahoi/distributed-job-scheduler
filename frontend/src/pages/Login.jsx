import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.data.token);

      navigate("/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-white rounded-xl shadow-xl w-100 p-8"
      >

        <h1 className="text-3xl font-bold text-slate-800 text-center mb-8">
          Distributed Job Scheduler
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border rounded-lg p-3 pr-12 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-gray-500"
        >
          {showPassword ? (
            <EyeSlashIcon className="h-6 w-6" />
            ) : (
            <EyeIcon className="h-6 w-6" />
          )}
        </button>
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"
        >
          {loading ? "Logging in..." : "Login"}
        </button>


        <p className="text-center text-gray-600 mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}