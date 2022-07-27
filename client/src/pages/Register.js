import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";
const Register = ({toggleLoading}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (res) => {
    toggleLoading(true)
    axios.post("/api/register", res).then(function (data) {
      if (!res.isSeller) {
        axios.post("/api/login", res).then(function (res) {
          toggleLoading(false)
          navigate("/");
        });
      } else {
        axios.post("/api/login", res).then(function (res) {
          toggleLoading(false)
          navigate("/updateSellerData");
        });
      }
    });
  };

  return (
    <div className="container lg:w-1/2 md:w-2/3 sm:w-3/4 w-3/4 m-auto mt-10 ">
      <form
        className="bg-white filter drop-shadow-md rounded p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mb-10 text-center">Registration</h1>
        {/* <p className="error font-medium text-red-500">
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
        /> */}
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
        <p className="error font-medium text-red-500">
          {errors.confirmPassword ? "Passwords do not match." : ""}
        </p>
        <input
          type="password"
          name="confirmPassword"
          className={`w-2/3 border-2 border-gray-300 rounded-md p-2 outline-none mt-1 block m-auto ${
            errors.confirmPassword
              ? `ring-2 ring-red-500 border-none outline-none bg-red-300 animate-shake mb-6`
              : `focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none mb-10`
          }`}
          placeholder="Confirm password..."
          {...register("confirmPassword", {
            required: true,
            minLength: 8,
            validate: () => {
              return watch("password") == watch("confirmPassword");
            },
          })}
        />
        <p className="error font-medium text-red-500">
          {errors.streetAddress ? "Invalid street address." : ""}
        </p>

        <input
          type="text"
          name="streetAddress"
          autoComplete="streetAddress"
          className={`w-2/3 border-2 border-gray-300 rounded-md p-2 outline-none mt-1 block m-auto ${
            errors.streetAddress
              ? `ring-2 ring-red-500 border-none outline-none bg-red-300 animate-shake mb-6`
              : `focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none mb-10`
          }`}
          placeholder="Street address..."
          {...register("streetAddress", { required: true, minLength: 3 })}
        />
        <p className="error font-medium text-red-500">
          {errors.city ? "Please enter a city." : ""}
        </p>
        <input
          type="text"
          name="city"
          autoComplete="city"
          className={`w-2/3 border-2 border-gray-300 rounded-md p-2 outline-none mt-1 block m-auto ${
            errors.city
              ? `ring-2 ring-red-500 border-none outline-none bg-red-300 animate-shake mb-6`
              : `focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none mb-10`
          }`}
          placeholder="City..."
          {...register("city", {
            required: true,
          })}
        />
        <p className="error font-medium text-red-500">
          {errors.state ? "Please enter a state." : ""}
        </p>
        <input
          type="text"
          name="state"
          autoComplete="state"
          className={`w-2/3 border-2 border-gray-300 rounded-md p-2 outline-none mt-1 block m-auto ${
            errors.state
              ? `ring-2 ring-red-500 border-none outline-none bg-red-300 animate-shake mb-6`
              : `focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none mb-10`
          }`}
          placeholder="State..."
          {...register("state", {
            required: true,
          })}
        />
        <p className="error font-medium text-red-500">
          {errors.zipcode ? "Invalid zipcode." : ""}
        </p>
        <input
          type="text"
          name="zipcode"
          autoComplete="zipcode"
          className={`w-2/3 border-2 border-gray-300 rounded-md p-2 outline-none mt-1 block m-auto ${
            errors.zipcode
              ? `ring-2 ring-red-500 border-none outline-none bg-red-300 animate-shake mb-6`
              : `focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none mb-10`
          }`}
          placeholder="Zipcode..."
          {...register("zipcode", {
            required: true,
            pattern: /^\d{5}(?:[-\s]\d{4})?$/g,
          })}
        />
        <div className="w-2/3 m-auto">
          <input
            type="checkbox"
            name="seller"
            className="mr-4"
            id="seller"
            value="true"
            {...register("isSeller")}
          />
          <label for="seller" className="">
            Are you interested in selling food on this platform? (You can always
            change this later in settings.)
          </label>
        </div>
        <button
          type="submit"
          className="bg-green-500 rounded-md text-white font-bold p-4 block m-auto mt-4 sm:w-1/3 lg:w-1/4"
        >
          Continue
        </button>
      </form>
      {/* createUserWithEmailAndPassword */}
    </div>
  );
};

export default Register;
