import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }) {
  return( 
    <>
  <NextNProgress />
  <Navbar />
  <Component {...pageProps} />
  </>
  );
}
