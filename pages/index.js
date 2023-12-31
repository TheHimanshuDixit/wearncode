import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Wear_N_Code</title>
        <meta name="description" content="Wear_N_Code - wear and code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className='mt-10 min-h-screen'>
        <h1 className='text-center font-bold text-[#007fff] text-4xl pt-2 pb-7 hover:translate-x-1'>WEAR THE &lt; CODE /&gt;</h1>
        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row space-y-2 items-center justify-center max-w-5xl w-full px-4 md:px-10 py-4 md:py-8 border-[#007fff] border-4 rounded-3xl">
            <div className="w-full md:w-1/2 mx-2 h-96 overflow-hidden  ">
              <img src="https://source.unsplash.com/random/500x500/?clothes" alt="" className="h-full w-full" />
            </div>
            <div className="w-full md:w-1/2 mx-2 h-96 ">
              <div className="flex flex-col space-y-2">
                <div className="h-48 w-full overflow-hidden  ">
                  <img src="https://source.unsplash.com/random/300x200/?clothes" alt="" className="h-full w-full" />
                </div>
                <div className="h-48 w-full flex space-x-4 pb-3">
                  <div className="h-full w-1/2 overflow-hidden  ">
                    <img src="https://source.unsplash.com/random/200x200/?clothes" alt="" className="h-full w-full" />
                  </div>
                  <div className="h-full w-1/2  overflow-hidden  ">
                    <img src="https://source.unsplash.com/random/200x200/?clothes" alt="" className="h-full w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
