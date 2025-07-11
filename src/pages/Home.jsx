import React from 'react'
import { Routes , Route, Outlet } from 'react-router-dom'
import Navbar from '../component/Navbar'
import DarkLayout from '../component/DarkLayout'
import Sidebar from '../component/Sidebar'
// pages/Home.jsx
import PageWrapper from '../Animation/PageWrapper'


const Home = () => {
  return (
    // hero component
    <div className='textured-bg h-full w-full flex flex-col text-white overflow-hidden'>
        
        {/* header component */}
        <header className='fixed left-0 z-50 top-0 w-full h-16 bg-gray-700 flex justify-between space-x-4 textured-bg'>
            <Navbar/>
        </header>

        {/* main content component */}
        <div className="content flex flex-grow h-full">

            {/* Sidebar component */}
            <aside className="aside transition-all duration-300 ease-in-out flex-shrink-0">
                <Sidebar></Sidebar>
            </aside>

            {/* Hero section */}
            <main className=" flex-grow flex-col h-[calc(100vh-4rem)] items-center justify-center overflow-y-auto scrollbar-hide">
              <PageWrapper>
                <Outlet />
              </PageWrapper>
              
                {/* <Hero></Hero> */}
            </main>

        </div>

      {/* footer component */}

      <footer>
        {/* <Footer></Footer> */}
      </footer>
    </div>
  )
}

export default Home