import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate, Link } from "react-router-dom";


export default function Header() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    try {
      logout();
      navigate("/"); // Пренасочване към началната страница след успешен изход
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
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
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Products
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/products/create"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Create Product
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Register
              </Link>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <Link
                  to="/login"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </>
          )}
          <Link
            to="/profile"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Profile
          </Link>
        </div>
      </nav>
    </header>
  );
}
//   return (
//     <header className="absolute inset-x-0 top-0 z-50">
//       <nav
//         aria-label="Global"
//         className="flex items-center justify-between p-6 lg:px-8"
//       >
//         <div className="flex lg:flex-1">
//           <a href="/" className="-m-1.5 p-1.5">
//             <span className="sr-only">Clima.bg</span>
//             <img
//               alt=""
//               src="https://clima.bg/userfiles/logo/climabglogo.png"
//               className="h-16 w-auto"
//             />
//           </a>
//         </div>
//         <div className="hidden lg:flex lg:gap-x-12">
//             <a
//               key='about'
//               href='/about'
//               className="text-sm font-semibold leading-6 text-gray-900"
//             >
//               About
//             </a>

//         </div>
//         <div className="hidden lg:flex lg:gap-x-12">
//           {navigation.map((item) => (
//             <a
//               key={item.name}
//               href={item.href}
//               className="text-sm font-semibold leading-6 text-gray-900"
//             >
//               {item.name}
//             </a>
//           ))}
//         </div>
//         <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//           <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
//             Log in <span aria-hidden="true">&rarr;</span>
//           </a>
//         </div>
//       </nav>
//     </header>
//   );
// }
