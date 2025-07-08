import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
// import Login from "./pages/login.jsx";
import Home from "./pages/Home";
import YouTubeHome from "./pages/YoutubeHome.jsx";

function App() {
  return (
    // <>
    //   <div>App</div>
    // </>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/yt" element={<YouTubeHome />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
