import Head from "next/head";
import Link from "next/Link";
import React from "react";

function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <header className="w-full container mx-auto">
          <div className="flex flex-col items-center py-12">
            <Link href="/">
              <a className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl">
                NamPH Blog
              </a>
            </Link>
            <p className="text-lg text-gray-600">
              Something awesome !
            </p>
          </div>
        </header>
        <nav className="w-full py-4 border-t border-b bg-gray-100" x-data="{ open: false }">
          <div className="block sm:hidden">
            <a

              className="block md:hidden text-base font-bold uppercase text-center flex justify-center items-center">
              {/* Topics <i :className="open ? 'fa-chevron-down': 'fa-chevron-up'" className="fas ml-2"></i> */}
            </a>
          </div>
          <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
            <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
            <Link href="/">
                <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Home</a>
              </Link>
              <Link href="/technology">
                <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Technology</a>
              </Link>
              <Link href="/photography">
                <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Photography</a>
              </Link>
              <Link href="/game">
                <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Game</a>
              </Link>
              <Link href="/politics">
                <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Politics</a>
              </Link>
              <Link href="/culture">
                <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Culture</a>
              </Link>
              <Link href="/sports">
                <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Sports</a>
              </Link>
              <Link href="/publish/post">
                <a className="hover:bg-gray-400 rounded py-2 px-4 mx-2">Create</a>
              </Link>
            </div>
          </div>
        </nav >
        <main className="w-11/12 md:w-full max-w-7xl mx-auto my-8 flex-grow">
          {children}
        </main>
        <footer className="w-full border-t bg-white pb-12">
          <div className="w-full container mx-auto flex flex-col items-center">
            <div className="flex flex-col md:flex-row text-center md:text-left md:justify-between py-6">
              <a className="uppercase px-3">About Us</a>
              <a className="uppercase px-3">Privacy Policy</a>
              <a className="uppercase px-3">Terms & Conditions</a>
              <a className="uppercase px-3">Contact Us</a>
            </div>
            <div className="uppercase pb-6">&copy; namphblog.com</div>
          </div>
        </footer>
      </div >
    </>
  );
}
export default Layout;