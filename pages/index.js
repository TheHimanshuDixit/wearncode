import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'

export default function Home() {
  return (
    <>
      <Head>
        <title>Wear_N_Code</title>
        <meta name="description" content="Wear_N_Code - wear and code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <div class="flex justify-center">
        <div class="flex flex-col md:flex-row space-y-2  items-center justify-center max-w-5xl w-full px-4 md:px-10">
          <div class="w-full md:w-1/2 mx-2 h-96 overflow-hidden  ">
            <img src="https://source.unsplash.com/random/500x500/?clothes" alt="" class="h-full w-full" />
          </div>
          <div class="w-full md:w-1/2 mx-2 h-96 ">
            <div class="flex flex-col space-y-2">
              <div class="h-48 w-full overflow-hidden  ">
                <img src="https://source.unsplash.com/random/300x200/?clothes" alt="" class="h-full w-full" />
              </div>
              <div class="h-48 w-full flex space-x-4 pb-3">
                <div class="h-full w-1/2 overflow-hidden  ">
                  <img src="https://source.unsplash.com/random/200x200/?clothes" alt="" class="h-full w-full" />
                </div>
                <div class="h-full w-1/2  overflow-hidden  ">
                  <img src="https://source.unsplash.com/random/200x200/?clothes" alt="" class="h-full w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script src="https://cdn.tailwindcss.com"></Script>

      <Footer />
    </>
  )
}
