import Head from "next/head";
import Link from "next/link";
import { useStore } from "../../client/context";
import { getValue } from "../utils/common";
import { signOut } from "next-auth/client";
import { authConstants } from "../../client/context/constants";

const Header = () => {
  const [state, dispatch] = useStore();
  const user = getValue(state, ["user"]);
  const authenticated = getValue(state, ["user", "authenticated"], false); //state.user.authenticated

  console.log({ state });
  return (
    <header>
      <nav className=" flex gap-5 m-2 justify-between items-end text-blue-500  border-b">
        {authenticated ? (
          <Link href={"/"}>
            <a className="text-[1.2rem] mb-3 text-gray-400">{user.name}</a>
          </Link>
        ) : (
          <Link href={"/"}>
            <a className="text-[1.2rem] mb-3 text-gray-400">welcome guest</a>
          </Link>
        )}

        <Link href={"/"}>
          <a className="text-[3rem] font-bold">BlogX</a>
        </Link>
        {authenticated ? (
          <button
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                dispatch({ type: authConstants.LOGIN_FAILURE });
              });
            }}
            className="mb-3 px-2 py-2 border rounded-[1rem] hover:bg-blue-500 hover:text-[white]"
          >
            <a>Log Out</a>
          </button>
        ) : (
          <div>
            <button className="mb-3 px-2 py-2 border rounded-[1rem] mr-2 hover:bg-blue-500 hover:text-[white]">
              <Link href={"/login"}>
                <a>Log In</a>
              </Link>
            </button>
            <button className="mb-3 px-2 py-2 border rounded-[1rem] hover:bg-blue-500 hover:text-[white]">
              <Link href={"/signup"}>
                <a>Sign Up</a>
              </Link>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
export default Header;
