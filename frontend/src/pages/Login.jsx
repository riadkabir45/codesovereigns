import { loginUser, registerUser } from "@/features/auth/authSlice";
import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
    isError: false,
    errorMessage: "",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_EMAIL":
        return { ...state, email: action.payload };
      case "SET_PASSWORD":
        return { ...state, password: action.payload };
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

    if (!/\S+@\S+\.\S+/.test(state.email)) {
      userFormDispatch({
        type: "SET_ERROR",
        payload: { isError: true, errorMessage: "Invalid email address" },
      });
      return;
    }
    const userData = {
      email: state.email,
      password: state.password,
    };
    try {
      dispatch(loginUser(userData));
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
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center">Login</h1>
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
          type="email"
          placeholder="Email"
          value={state.email}
          onChange={(e) =>
            userFormDispatch({ type: "SET_EMAIL", payload: e.target.value })
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

        <button
          type="submit"
          className={`bg-blue-500 text-white rounded p-2 w-full max-w-xs hover:bg-blue-600 transition duration-200 ease-in-out`}
          disabled={isLoading}
        >
          {isLoading ? "Login..." : "Login"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">Don't have any account</p>
        <NavLink to="/register" className="text-blue-500 hover:underline">
          Signup here
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
