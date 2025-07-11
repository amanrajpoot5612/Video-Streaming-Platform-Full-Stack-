import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/AuthPages/Register";
import Login from "./pages/AuthPages/Login";


import Home from "./pages/Home";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import LayoutRoute from "./Animation/LayoutRoute";

import "./index.css";

import Test from "./pages/Test";
import Hero from "./pages/Hero";
import Movies from './pages/SidePages/Movies'
import News from './pages/SidePages/News'
import Sports from './pages/SidePages/Sports'
import History from './pages/SidePages/History'
import Liked from './pages/SidePages/Liked'
import Subscription from './pages/SidePages/Subscription'
import Setting from './pages/SidePages/Setting'
import Help from './pages/SidePages/Help'
import Shorts from "./pages/SidePages/Shorts";
import NotFound from "./pages/NotFound";


function App() {

  const location = useLocation();

  return (
    
    <AnimatePresence mode="wait">
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
              </Route>


                {/* Auth Routes */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Test Route */}
                <Route path="/test" element={<Test/>}></Route>

                {/* Catch-all route for Not Found */}
                <Route path="*" element={<NotFound/>}></Route>

      </Routes>
    </AnimatePresence>
  );
}

export default App;
