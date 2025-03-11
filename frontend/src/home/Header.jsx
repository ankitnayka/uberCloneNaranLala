import React, { useContext, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {
  const { user, setUser } = useContext(UserDataContext);

  const [isLoading, setIsLoading] = useState(false);
    const navigate=useNavigate()
  async function handleLogout() {
    setIsLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/logout`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setIsLoading(false);
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logout successful!");
    navigate("/")
  }
  return (
    <div className="w-full py-4 bg-black text-white flex fixed top-0 z-50 justify-around cursor-pointer">
      <div className="max-w-3xl flex px-8 items-center">
        <Link to="/">
          <h1 className="font-mono text-xl underline">Uber</h1>
        </Link>

        <ul className="hidden sm:flex font-mono list-none ml-8">
          <Link to="/start">
            <li className="px-2 hover:bg-gray-800 hover:rounded-xl transition-colors duration-300 ease-in-out">
              Ride
            </li>
          </Link>
          <li className="px-2 hover:bg-gray-800 hover:rounded-xl">Drive</li>
          <li className="px-2 hover:bg-gray-800 hover:rounded-xl">Business</li>
          <li className="px-2 hover:bg-gray-800 hover:rounded-xl">About</li>
        </ul>
      </div>

      <div className="flex items-center">
        <ul className="flex list-none gap-2">
          <li className="hidden sm:inline hover:bg-gray-800 hover:rounded-xl">
            En
          </li>
          <li className="hidden sm:inline hover:bg-gray-800 hover:rounded-xl">
            Help
          </li>
          {!user ? (
            <>
              <Link to="/login">
                <button className="px-4 border-2 rounded-xl border-white hover:bg-gray-800">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 bg-white rounded-xl text-black hover:bg-gray-800">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 bg-white rounded-xl text-black hover:bg-gray-800"
            >
              {isLoading ? "please wait" : "log out"}
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
