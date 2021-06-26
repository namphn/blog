import Head from "next/head";

function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <header class="w-full container mx-auto">
          <div class="flex flex-col items-center py-12">
            <a class="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl" href="#">
              NamPH Blog
            </a>
            <p class="text-lg text-gray-600">
              Something awesome !
            </p>
          </div>
        </header>
        <nav class="w-full py-4 border-t border-b bg-gray-100" x-data="{ open: false }">
          <div class="block sm:hidden">
            <a
              href="#"
              class="block md:hidden text-base font-bold uppercase text-center flex justify-center items-center">
              {/* Topics <i :class="open ? 'fa-chevron-down': 'fa-chevron-up'" class="fas ml-2"></i> */}
            </a>
          </div>
          <div class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
            <div class="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
              <a href="#" class="hover:bg-gray-400 rounded py-2 px-4 mx-2">Technology</a>
              <a href="#" class="hover:bg-gray-400 rounded py-2 px-4 mx-2">Automotive</a>
              <a href="#" class="hover:bg-gray-400 rounded py-2 px-4 mx-2">Finance</a>
              <a href="#" class="hover:bg-gray-400 rounded py-2 px-4 mx-2">Politics</a>
              <a href="#" class="hover:bg-gray-400 rounded py-2 px-4 mx-2">Culture</a>
              <a href="#" class="hover:bg-gray-400 rounded py-2 px-4 mx-2">Sports</a>
            </div>
          </div>
        </nav >
        <main className="w-11/12 md:w-full max-w-2xl mx-auto my-8 flex-grow">
          {children}
        </main>
        <footer class="w-full border-t bg-white pb-12">
          <div class="w-full container mx-auto flex flex-col items-center">
            <div class="flex flex-col md:flex-row text-center md:text-left md:justify-between py-6">
              <a href="#" class="uppercase px-3">About Us</a>
              <a href="#" class="uppercase px-3">Privacy Policy</a>
              <a href="#" class="uppercase px-3">Terms & Conditions</a>
              <a href="#" class="uppercase px-3">Contact Us</a>
            </div>
            <div class="uppercase pb-6">&copy; namphblog.com</div>
          </div>
        </footer>
      </div >
    </>
  );
}
export default Layout;