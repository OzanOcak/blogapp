import { useRouter } from "next/router";
import { useState } from "react";
import { signup } from "../client/request";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = { name, email, password };
    const result = await signup(payload);
    if (result.hasError) {
      setErrorMessage(result.errorMessage);
    } else {
      console.log(result);
      setErrorMessage(null);
      setName("");
      setEmail("");
      setPassword("");
      router.replace("/login");
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-700 underline">
          Sign up
        </h1>
        {errorMessage && (
          <p className="text-red-500">
            {` * `}
            {errorMessage}
          </p>
        )}
        <form className="mt-6" onSubmit={submitHandler}>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-blue-800"
            >
              Name
            </label>
            <input
              type="text"
              id="floatingInput"
              placeholder="Name"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-[1rem]
            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-blue-800"
            >
              Email
            </label>
            <input
              type="email"
              id="floatingInput"
              placeholder="example@mail.com"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-[1rem] focus:border-blue-400
            focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-blue-800"
            >
              Password
            </label>
            <input
              type="password"
              id="floatingPassword"
              placeholder="Password"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-[1rem] focus:border-blue-400
            focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 
              rounded-[1rem] hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
