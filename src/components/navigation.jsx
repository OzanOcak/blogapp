import Link from "next/link";

const Navigation = () => {
  return (
    <nav className=" flex gap-5 m-2 justify-center text-[green] font-bold ">
      <Link href={"/"}>
        <a>Home</a>
      </Link>
      <Link href={"/user"}>
        <a>User</a>
      </Link>
      <Link href={"/post"}>
        <a>Post</a>
      </Link>
    </nav>
  );
};
export default Navigation;
