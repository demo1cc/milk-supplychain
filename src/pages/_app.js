import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

import NextNProgress from 'nextjs-progressbar';
import Layout from "@/components/Layout";
import { AuthProvider } from "@/context/AuthContext";

import { DataProvider } from "@/context/DataContext";

export default function App({ Component, pageProps }) {
  return( 
    <>
  <NextNProgress />
  <AuthProvider>
  <DataProvider>

  <Layout>
  <Component {...pageProps} />
  </Layout>
  </DataProvider>

  </AuthProvider>
  </>
  );
}
