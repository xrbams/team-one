import React from "react";
import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link, Element } from "react-scroll";

const LoginPage = () => {
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("1234567");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Implement login logic here

    navigate("/app/filter");
  };

  return (
    <div >
      <div className="bg-[#1e1f1f] flex flex-col  justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center w-1/2">
          <div className="flex justify-center items-center">
            <h2 className=" text-[white] text-center text-4xl font-bold ml-2">Login</h2>
          </div>
          <form
            className="mt-8 flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded text-black"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded mt-4 text-black"
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
    </div>
  );
};

export default LoginPage;
