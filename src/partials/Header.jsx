import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ToggleButton from "../utils/ToggleButton";

function Header(props) {
  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && "dark:bg-neutral-900 bg-white backdrop-blur-sm shadow-lg"
        }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Spox">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="62"
                height="62"
                fill="#4a424c"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <circle
                  cx="128"
                  cy="128"
                  r="96"
                  fill="none"
                  stroke="#4a424c"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></circle>
                <circle
                  cx="128"
                  cy="128"
                  r="32"
                  fill="none"
                  stroke="#4a424c"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></circle>
                <line
                  x1="224"
                  y1="128"
                  x2="160"
                  y2="128"
                  fill="none"
                  stroke="#4a424c"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></line>
                <line
                  x1="195.9"
                  y1="60.1"
                  x2="150.6"
                  y2="105.4"
                  fill="none"
                  stroke="#4a424c"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></line>
              </svg>
            </Link>{" "}

          </div>
          {/* Site navigation */}
          <nav className="flex flex-grow">
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li><div className="font-medium text-gray-600 hover:text-gray-900 px-24 py-5 flex items-center transition duration-150 ease-in-out">
                <ToggleButton></ToggleButton>
              </div></li>
              <li>
                <Link
                  to="/signin"
                  className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  {props.firstButton}
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                >
                  <span>{props.secondButton}</span>
                  <svg
                    className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                      fillRule="nonzero"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
