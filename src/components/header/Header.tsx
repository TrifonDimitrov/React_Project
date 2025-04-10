import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate, Link } from "react-router-dom";

import * as authApi from "../../api/auth-api";
import { UserProfile } from "../../types/userType";

export default function Header() {
  const navigate = useNavigate();
  const { logout, isAuthenticated, refreshUser } = useContext(AuthContext);
  const [userData, setUserData] = useState<UserProfile | null>(null);

  const fetchUserData = () => {
    authApi
      .getProfileInfo()
      .then((data) => setUserData(data))
      .catch((error) => {
        console.error("Failed fetching user data:", error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, [refreshUser]);

  const handleLogout = () => {
    try {
      logout();
      localStorage.removeItem("token");
      setUserData(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="p-12 rounded-md bg-sky-300 shadow-md ">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8 font-bold "
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Clima.bg</span>
              <img
                alt=""
                src="https://clima.bg/userfiles/logo/climabglogo.png"
                className="h-16 w-auto"
              />
            </Link>
          </div>
          <div className=" hidden lg:flex lg:gap-x-12">
            <Link
              to="/"
              className="text-base font-bold leading-6 text-gray-900 hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-base font-bold leading-6 text-gray-900 hover:text-blue-600"
            >
              Products
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/products/create"
                  className="text-base font-bold leading-6 text-gray-900 hover:text-blue-600"
                >
                  Create Product
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-base font-bold leading-6 text-gray-900 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-base font-bold leading-6 text-gray-900 hover:text-blue-600"
                >
                  Register
                </Link>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                  <Link
                    to="/login"
                    className="text-base font-bold leading-6 text-gray-900 hover:text-blue-600"
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </>
            )}
            <Link
              to="/profile"
              className="text-base font-bold leading-6 text-gray-900 hover:text-blue-600 relative"
            >
              Profile
              {userData?.purchasedProducts?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2">
                  {userData?.purchasedProducts?.length}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}
