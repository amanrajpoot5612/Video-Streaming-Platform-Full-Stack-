import React from 'react'
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'
import Hero from './Hero'

const Home = () => {
  return (
    <div className='h-screen w-screen  flex flex-col text-white overflow-hidden'>

      {/* Fixed Navbar */}
      <header className='fixed top-0 left-0 w-full h-16 z-50 bg-gray-700 flex justify-between space-x-4 textured-bg'>
        <Navbar />
      </header>

      {/* Sidebar + Main Content below navbar */}
      <div className="flex flex-grow h-full">

        {/* Sidebar */}
        <aside className="flex-shrink-0">
          <Sidebar />
        </aside>1

        {/* Main Scrollable Content */}
        <main className="flex-grow h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide">
          <Hero />
        </main>

      </div>

      {/* Optional Footer */}
      <footer>
        {/* <Footer /> */}
      </footer>
    </div>
  )
}

export default Home
