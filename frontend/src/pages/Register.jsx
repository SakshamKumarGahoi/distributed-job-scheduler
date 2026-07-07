import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import api from "../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    try {
      setError("");

      await api.post("/auth/register", {
        email,
        password,
      });

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleRegister}
        className="bg-white rounded-xl shadow-xl p-8 w-96"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">
          Create Account
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <input
          className="w-full border p-3 rounded-lg mb-4 text-black"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border p-3 rounded-lg pr-12 text-black"
            placeholder="Password"
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

        <button className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700">
          Register
        </button>

        <p className="text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}