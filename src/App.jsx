import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";

const Register = lazy(() => import("./pages/AuthPages/Register"));
const Login = lazy(() => import("./pages/AuthPages/Login"))


const Home = lazy(() => import("./pages/Home"));
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import LayoutRoute from "./Animation/LayoutRoute";

import "./index.css";
import VideoPlayer from "./component/VideoPlayer";
import PlayerPage from "./pages/PlayerPage/PlayerPage";
import ArchitectureShowcase from "./pages/Showcase/ArchitectureShowcase";
import UploadVideo from "./pages/Upload/UploadVideo";
import TestUpload from "./pages/Upload/TestUpload";
import Profile from "./pages/Profile/Profile";
// import { clearTimeout } from "timers";

// const Test = lazy(() => import("./pages/Test"));
const Hero = lazy(() => import("./pages/Hero"));
const Movies = lazy(() => import("./pages/SidePages/Movies"));
const News = lazy(() => import("./pages/SidePages/News"));
const Sports = lazy(() => import("./pages/SidePages/Sports"));
const History = lazy(() => import("./pages/SidePages/History"));
const Liked = lazy(() => import("./pages/SidePages/Liked"));
const Subscription = lazy(() => import("./pages/SidePages/Subscription"));
const Setting = lazy(() => import("./pages/SidePages/Setting"));
const Help = lazy(() => import("./pages/SidePages/Help"));
const Shorts = lazy(() => import("./pages/SidePages/Shorts"));
const NotFound = lazy(() => import("./pages/NotFound"));
// const Art = lazy(() => import("./pages/NavPages/Art"));
const Trending = lazy(() => import("./pages/NavPages/Trending"));
const Music = lazy(() => import("./pages/NavPages/Music"));

const Preloader = lazy(() => import("./Preloader/Preloader"));
const Test = lazy(() => import('./pages/Test'));

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false) , 3500
    });
    return () => clearTimeout(timer);
  } , []);


  return (
    
    <AnimatePresence mode="wait">
       <Suspense fallback={<Preloader></Preloader>}>
      <Routes location={location} key={location.pathname}>

              <Route path="/" element={<Home />}>
                {/* <Route element={<LayoutRoute/>}/> */}
                <Route index element={<Hero/>}/>
                <Route path='movies' element={<Movies/>}/>
                <Route path='news' element={<News/>}/>
                <Route path='sports' element={<Sports/>}/>
                <Route path='history' element={<History/>}/>
                <Route path='liked' element={<Liked/>}/>
                <Route path='shorts' element={<Shorts/>}/>
                <Route path='subscription' element={<Subscription/>}/>
                <Route path='settings' element={<Setting/>}/>
                <Route path='help' element={<Help/>}/>
                <Route path="profile" element={<Profile/>}/>
                {/* <Route path='art' element={<Art/>}/> */}
                <Route path='trending' element={<Trending/>}/>
                <Route path='music' element={<Music/>}/>
              </Route>

              {/* Video Player Route */}
              <Route path="/upload-test" element={<TestUpload />} />
              {/* <Route path="/video-player/:id" element={<PlayerPage />} /> */}
              {/* <Route path="/video-player-demo" element={<VideoPlayer />} /> */}

              {/* Upload Video Route */}
              <Route path="/upload-video" element={<UploadVideo />} />

                {/* Showcase Routes */}
                <Route path="/showcase" element={<ArchitectureShowcase />}/>
        
                {/* Auth Routes */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Layout Route */}
                <Route path="/preloader" element={<Preloader />} />

                {/* Test Route */}
                <Route path="/test" element={<Test/>}></Route>

                <Route path="/watch/:id" element={<PlayerPage />} />

                {/* Catch-all route for Not Found */}
                <Route path="*" element={<NotFound/>}></Route>

      </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
