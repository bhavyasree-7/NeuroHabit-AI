import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

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

    localStorage.setItem(
      "token",
      response.data.access_token
    );

    navigate("/dashboard");

  } catch (err: any) {
    alert(err.response?.data?.detail || "Login Failed");
  }
};

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-2xl w-[420px]">
        <h1 className="text-white text-3xl font-bold mb-6">
          NeuroHabit AI
        </h1>

        <input
          className="w-full p-4 rounded-xl mb-4 bg-slate-800 text-white"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-4 rounded-xl mb-6 bg-slate-800 text-white"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 rounded-xl py-4 text-white"
        >
          Login
        </button>
      </div>
    </div>
  );
}