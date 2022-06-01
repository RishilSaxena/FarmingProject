import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";
const Login = ({toggleLoading}) => {
  const navigate = useNavigate();
  const [invalidCredentials, changeInvalidCredentials] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (res) => {
    toggleLoading(true)
    axios.post("/api/login", res).then(function (data) {
      toggleLoading(false)
      if (data.data == "No user found.") {
        console.log("Invalid credentials.");
        changeInvalidCredentials(true);
        console.log(invalidCredentials);
      } else {
         navigate("/")
      }
    });
  };

  return (
    <div className="container lg:w-1/2 md:w-2/3 sm:w-3/4 w-3/4 m-auto mt-10 ">
      <form
        className="bg-white filter drop-shadow-md rounded p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold text-center mb-10">Login</h1>
        {invalidCredentials ? (
          <h1 className="text-center font-bold text-red-500 mb-5 mt-5 animate-shake">
            Invalid credentials.
          </h1>
        ) : (
          ""
        )}

        <p className="error font-medium text-red-500">
          {errors.username ? "Invalid username." : ""}
        </p>

        <input
          type="text"
          name="username"
          autoComplete="username"
          className={`w-2/3 border-2 border-gray-300 rounded-md p-2 outline-none mt-1 block m-auto ${
            errors.username
              ? `ring-2 ring-red-500 border-none outline-none bg-red-300 animate-shake mb-6`
              : `focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none mb-10`
          }`}
          placeholder="Username..."
          {...register("username", { required: true, minLength: 3 })}
        />

        <p className="error font-medium text-red-500">
          {errors.password ? "Password not long enough." : ""}
        </p>

        <input
          type="password"
          name="password"
          className={`w-2/3 border-2 border-gray-300 rounded-md p-2 outline-none mt-1 block m-auto ${
            errors.password
              ? `ring-2 ring-red-500 border-none outline-none bg-red-300 animate-shake mb-6`
              : `focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none mb-10`
          }`}
          placeholder="Password..."
          {...register("password", { required: true, minLength: 8 })}
        />

        <button
          type="submit"
          className="bg-green-500 rounded-md text-white font-bold p-4 block m-auto  sm:w-1/5 lg:w-1/6"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
