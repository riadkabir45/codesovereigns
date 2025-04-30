import { registerUser } from "@/features/auth/authSlice";
import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isError: false,
    errorMessage: "",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_NAME":
        return { ...state, name: action.payload };
      case "SET_EMAIL":
        return { ...state, email: action.payload };
      case "SET_PHONE":
        return { ...state, phone: action.payload };
      case "SET_PASSWORD":
        return { ...state, password: action.payload };
      case "SET_CONFIRM_PASSWORD":
        return { ...state, confirmPassword: action.payload };
      case "SET_ERROR":
        return {
          ...state,
          isError: action.payload.isError,
          errorMessage: action.payload.errorMessage,
        };
      case "RESET":
        return initialState;
      default:
        return state;
    }
  };

  const [state, userFormDispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, errorMessage, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isError && !isLoading && user?.id) {
      navigate("/");
    }
  }, [isError, isLoading, user, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.password !== state.confirmPassword) {
      userFormDispatch({
        type: "SET_ERROR",
        payload: { isError: true, errorMessage: "Passwords do not match" },
      });
      return;
    }
    if (state.name === "" || state.email === "" || state.phone === "") {
      userFormDispatch({
        type: "SET_ERROR",
        payload: { isError: true, errorMessage: "All fields are required" },
      });
      return;
    }
    if (state.password.length < 6) {
      userFormDispatch({
        type: "SET_ERROR",
        payload: {
          isError: true,
          errorMessage: "Password must be at least 6 characters",
        },
      });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(state.email)) {
      userFormDispatch({
        type: "SET_ERROR",
        payload: { isError: true, errorMessage: "Invalid email address" },
      });
      return;
    }
    if (!/^\d{11}$/.test(state.phone)) {
      userFormDispatch({
        type: "SET_ERROR",
        payload: { isError: true, errorMessage: "Invalid phone number" },
      });
      return;
    }
    const userData = {
      name: state.name,
      email: state.email,
      phone: state.phone,
      password: state.password,
    };
    try {
      dispatch(registerUser(userData));
    } catch (error) {
      userFormDispatch({
        type: "SET_ERROR",
        payload: { isError: true, errorMessage: error.message },
      });
    } finally {
      userFormDispatch({
        type: "RESET",
      });
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Register</h1>
      {(state.isError || isError) && (
        <div className="text-red-500 text-center mt-4">
          {errorMessage || state?.errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center mt-10"
      >
        <input
          type="text"
          placeholder="Name"
          value={state.name}
          onChange={(e) =>
            userFormDispatch({ type: "SET_NAME", payload: e.target.value })
          }
          className="border border-gray-300 rounded p-2 mb-4 w-full max-w-xs"
        />
        <input
          type="email"
          placeholder="Email"
          value={state.email}
          onChange={(e) =>
            userFormDispatch({ type: "SET_EMAIL", payload: e.target.value })
          }
          className="border border-gray-300 rounded p-2 mb-4 w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={state.phone}
          onChange={(e) =>
            userFormDispatch({ type: "SET_PHONE", payload: e.target.value })
          }
          className="border border-gray-300 rounded p-2 mb-4 w-full max-w-xs"
        />
        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) =>
            userFormDispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
          className="border border-gray-300 rounded p-2 mb-4 w-full max-w-xs"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={state.confirmPassword}
          onChange={(e) =>
            userFormDispatch({
              type: "SET_CONFIRM_PASSWORD",
              payload: e.target.value,
            })
          }
          className="border border-gray-300 rounded p-2 mb-4 w-full max-w-xs"
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white rounded p-2 w-full max-w-xs hover:bg-blue-600 transition duration-200 ease-in-out`}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">Already have an account?</p>
        <NavLink to="/login" className="text-blue-500 hover:underline">
          Login here
        </NavLink>
      </div>
    </div>
  );
};

export default Register;
