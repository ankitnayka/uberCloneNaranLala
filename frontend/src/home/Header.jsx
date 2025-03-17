import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CaptainDataContext } from "../context/CapatainContext";

const Header = () => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    setIsLoading(true);
    const endpoint = user ? "users" : "captains";
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/${endpoint}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setUser(null);
    setCaptain(null);
    localStorage.removeItem("token");
    toast.success("Logout successful!");
    navigate("/");
    setIsLoading(false);
  }

  const handleLogoClick = () => {
    if (captain) {
      navigate("/captain-home");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="w-full py-4 bg-black text-white flex fixed top-0 z-50 justify-around cursor-pointer">
      <div className="max-w-3xl flex px-8 items-center">
        <div onClick={handleLogoClick} className="cursor-pointer">
          <h1 className="font-mono text-xl underline">Uber</h1>
        </div>

        <ul className="hidden sm:flex font-mono list-none ml-8">
          {user?.email ? (
            <>
              <Link to="/home">
                <li className="px-2 hover:bg-gray-800 hover:rounded-xl transition-colors duration-300 ease-in-out">
                  Ride
                </li>
              </Link>
              <li className="px-2 hover:bg-gray-800 hover:rounded-xl">Drive</li>
              <li className="px-2 hover:bg-gray-800 hover:rounded-xl">
                Business
              </li>
              <li className="px-2 hover:bg-gray-800 hover:rounded-xl">About</li>
            </>
          ) : null}
        </ul>
      </div>

      <div className="flex items-center">
        <ul className="flex list-none gap-2">
          {captain?.email || user?.email ? (
            <>
              <Link to="/profile">
                <button className="bg-green-600 font-bold rounded-lg px-2 py-2">
                  Profile
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 bg-white rounded-xl text-black hover:bg-gray-800"
              >
                Logout
              </button>
            </>
          ) : (
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
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
