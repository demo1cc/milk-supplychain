import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

import NextNProgress from 'nextjs-progressbar';
import Layout from "@/components/Layout";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  return( 
    <>
  <NextNProgress />
  <AuthProvider>
  <Layout>
  <Component {...pageProps} />
  </Layout>
  </AuthProvider>
  </>
  );
}
