import Head from "next/head";
import Layout from "../src/components/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Blog App</title>
        <link rel="shortcut icon" href="" />
        {/** when cant find resource or link ,gives Econnreset error */}
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
