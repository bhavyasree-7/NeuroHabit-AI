import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login({
        email,
        password,
      });

      console.log("Login Success:", response.data);

      localStorage.setItem(
        "token",
        response.data.access_token
      );
      console.log("Stored Token:", localStorage.getItem("token"));

      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login Error:", err.response?.data);

      alert(
        err.response?.data?.detail || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-2xl w-[420px] shadow-xl">

        <h1 className="text-white text-4xl font-bold mb-2">
          NeuroHabit AI
        </h1>

        <p className="text-slate-400 mb-8">
          Welcome back! Please login.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl mb-4 bg-slate-800 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-xl mb-6 bg-slate-800 text-white outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-xl font-semibold"
        >
          Login
        </button>

      </div>
    </div>
  );
}