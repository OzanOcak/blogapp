import Head from "next/head";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav className=" flex gap-5 m-2 justify-between items-end text-blue-500  border-b">
        <Link href={"/"}>
          <a className="text-[1.2rem] mb-3 text-gray-400">O.Ocak</a>
        </Link>
        <Link href={"/"}>
          <a className="text-[3rem] font-bold">BlogX</a>
        </Link>
        <div className="mb-3">
          <Link href={"/signin"}>
            <a>Sign In</a>
          </Link>
          {" / "}
          <Link href={"/signup"}>
            <a>Sign Up</a>
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Header;
