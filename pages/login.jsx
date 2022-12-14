import { useState } from "react";
import { getSession, signIn } from "next-auth/client"; // from next-auth
import { useRouter } from "next/router";
import { authConstants } from "../client/context/constants";
import { useStore } from "../client/context";
import { getValue } from "../src/utils/common";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const [state, dispatch] = useStore();
  const user = getValue(state, ["user"], null);

  const loginHandler = async (e) => {
    e.preventDefault();

    const payload = { email, password };
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await signIn("credentials", { ...payload, redirect: false }); //next-auth
    console.log({ res });
    //const session = await getSession(); //next-auth
    //console.log(session);
    if (!res.error) {
      const session = await getSession();
      dispatch({ type: authConstants.LOGIN_SUCCESS, payload: session });
      router.replace("/");
    } else {
      dispatch({ type: authConstants.LOGIN_FAILURE, payload: res.error });
      setErrorMessage(res.error);
    }
    // redirect: false cz we want handle sign in in client side within the same page
    // it also create csrf token
  };

  if (user && user.authenticated) {
    router.replace("/");
    return null;
  }
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-700 underline">
          Log in
        </h1>
        {errorMessage && (
          <p className="text-red-500">
            {` * `}
            {errorMessage}
          </p>
        )}
        <form className="mt-6" onSubmit={loginHandler}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-[1rem] focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-[1rem] focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Log In
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Do not have an account?{" "}
          <a href="#" className="font-medium text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
export default SignIn;
