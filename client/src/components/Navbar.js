import axios from "axios";
import React, { useReducer, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
const Navbar = () => {
  const navigate = useNavigate();
  useEffect(async () => {

    const id = await axios.get("/api/getCookie")
    setSellerId(id.data)
    
    
  }, []);
  const [sellerId, setSellerId] = useState("")
    
  const logout = async () => {
    await axios.get("/api/logout");
    navigate("/");
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="w-full bg-green-500 align-middle relative inline-block shadow-md">
      <Link
        to="/"
        className="inline-block text-white font-medium p-5 text-xl hover:text-gray-300 transition-all"
      >
        Home
      </Link>
      {
        !document.cookie ? (
          <>
            <Link
              to="/login"
              className="inline-block text-white font-medium p-5 text-xl hover:text-gray-300 transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-block text-white font-medium p-5 text-xl hover:text-gray-300 transition-all"
            >
              Register
            </Link>
          </>
        ) : (
          ""
        )
        // (
        //   <Link
        //     to="/"
        //     className="inline-block text-white font-medium p-5 text-xl hover:text-gray-300 transition-all"
        //     onClick={logout}
        //   >
        //     Logout
        //   </Link>
        // )
      }

      {/* <span className="float-right text-white font-medium p-5 text-xl hover:text-gray-300 transition-all align-middle cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          />
        </svg>
      </span> */}
     

      <Menu as="div" className="relative inline-block text-left float-right">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-8 pt-6 bg-transparent text-sm font-medium text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-1 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {document.cookie ? (
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/updateSellerData"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Update Seller Data
                    </a>
                  )}
                </Menu.Item>
              ) : (
                ""
              )}
              {document.cookie ? (
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href={"/seller/" + sellerId} 
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      View Profile
                    </a>
                  )}
                </Menu.Item>
              ) : (
                ""
              )}
              {document.cookie ? (
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/"
                      onClick={logout}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Logout
                    </a>
                  )}
                </Menu.Item>
              ) : (
                ""
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {document.cookie ? <div className="relative inline-block text-left float-right">
        <a className="inline-flex justify-center w-full px-4 pt-6 bg-transparent text-sm font-medium text-white cursor-pointer" href="/cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
        </a>
      </div> : ""}
      
    </div>
  );
};

export default Navbar;
