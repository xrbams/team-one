import React from "react";
import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Implement login logic here

    navigate("/filter");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center w-1/2">
        <h1 className="text-center text-3xl font-bold mb-4">TalentMine</h1>
        <div className="flex flex-row justify-center items-center">
          <FaGraduationCap size={32} color="#00df9a" />
          <h2 className="text-center text-xl font-bold ml-2">Login</h2>
        </div>
        <form
          className="mt-8 flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded mt-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;