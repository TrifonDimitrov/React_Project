import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

// const navigation = [
//   { name: "Home", href: "/" },
//   { name: "Products", href: "/products" },
//   { name: "Create Product", href: "/products/create" },
//   { name: "Company", href: "/company" },
//   { name: "Register", href: "/register" },
//   { name: "Logout", href: "/logout" },
// ];



export default function Header() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Clima.bg</span>
            <img
              alt=""
              src="https://clima.bg/userfiles/logo/climabglogo.png"
              className="h-16 w-auto"
            />
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <a
            key="home"
            href="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Home
          </a>
          <a
            key="products"
            href="/products"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Products
          </a>
          {isAuthenticated ? (
            <>
              <a
                key="create-product"
                href="/products/create"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Create Product
              </a>
              <a
                key="logout"
                href="/logout"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <a
                key="register"
                href="/register"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Register
              </a>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <a
                  href="/login"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </>
          )}

          <a
            key="company"
            href="/company"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Company
          </a>
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
