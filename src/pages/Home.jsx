import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import PageWrapper from "../Animation/PageWrapper";

const Home = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className={`app-shell${isSidebarCollapsed ? " is-sidebar-collapsed" : ""}`}>
      <Navbar onToggleSidebar={() => setIsSidebarCollapsed((collapsed) => !collapsed)} />
      <Sidebar />
      <main className="app-main scrollbar-hide">
        <PageWrapper>
          <Outlet />
        </PageWrapper>
      </main>
    </div>
  );
};

export default Home;
