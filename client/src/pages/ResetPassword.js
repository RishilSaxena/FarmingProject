import React from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import "./register.css";

const ResetPassword = ({toggleLoading}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
      const onSubmit = (res) => {
        toggleLoading(true)
        axios.post("/api/sendResetEmail", res).then(function (data) {
          toggleLoading(false)
        });
      };
    
  return (
    <div className="container lg:w-1/2 md:w-2/3 sm:w-3/4 w-3/4 m-auto mt-10">
        <form
        className="bg-white filter drop-shadow-md rounded p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
      <h1 className="text-2xl font-bold text-center mb-10">Reset Password</h1>
      <p className="error font-medium text-red-500">
          {errors.email ? "Invalid email." : ""}
        </p>

        <input
          type="text"
          name="email"
          autoComplete="email"
          className={`w-2/3 border-2 border-gray-300 rounded-md p-2 outline-none mt-1 block m-auto ${
            errors.email
              ? `ring-2 ring-red-500 border-none outline-none bg-red-300 animate-shake mb-6`
              : `focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none mb-10`
          }`}
          placeholder="Email..."
          {...register("email", {
            required: true,
            pattern:
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g,
          })}
        />
        <button
          type="submit"
          className="bg-green-500 rounded-md text-white font-bold p-4 block m-auto  sm:w-1/5 lg:w-1/6"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
