// LayoutRoute.jsx
import { Outlet } from "react-router-dom";
import PageWrapper from "./PageWrapper";

const LayoutRoute = () => (
  <PageWrapper>
    <Outlet />
  </PageWrapper>
);

export default LayoutRoute;
