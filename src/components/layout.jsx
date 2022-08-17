import { getSession } from "next-auth/client";
import Head from "next/head";
import { useEffect } from "react";
import { useStore } from "../../client/context";
import { authConstants } from "../../client/context/constants";
import { getValue } from "../utils/common";
import Header from "./header";

const Layout = ({ children }) => {
  const [state, dispatch] = useStore();

  useEffect(() => {
    const authenticated = getValue(state, ["user", "authenticated"], false);
    console.log("layout ---------------> ", authenticated);
    if (!authenticated) {
      console.log("-------> auth");
      dispatch({ type: authConstants.LOGIN_REQUEST });
      const session = getSession();
      console.log("session--------->", session);
      if (session) {
        dispatch({ type: authConstants.LOGIN_SUCCESS, payload: session });
      } else {
        dispatch({ type: authConstants.LOGIN_FAILURE, payload: session });
      }
    }
  }, []);
  return (
    <div>
      <Head></Head>
      <Header />
      {children}
    </div>
  );
};
export default Layout;
