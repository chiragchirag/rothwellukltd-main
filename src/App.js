import { Layout } from "antd";
import {
  ErrorBoundary,
  Footer,
  HeaderContainer,
  NavbarContainer,
  SideNavBarContainer,
} from "./CommonComponent";
import AllRoutes from "./Utils/routes";
import { useRoutes } from "react-router-dom";
import "../src/styles/global.css";
import { useEffect, useState } from "react";
import isEmpty from "./Utils/isEmpty/isEmpty";
import { useDispatch } from "react-redux";
import { getMyPermissions } from "./Redux/Actions/PermissionAction/PermissionAction";
import { AUTH_TOKEN } from "./Constant/primitive";
import {
  ADMIN_LOG_IN,
  CUSTOMER_POS,
  LOG_IN,
  POS,
  TILLS,
} from "./Constant/routeConstant";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-simple-keyboard/build/css/index.css";

const { Content } = Layout;
function App() {
  const routes = useRoutes(AllRoutes());
  const path = window.location.pathname;
  const [isSidebar, setIsSidebar] = useState(false);
  const [isFullScreenState, setIsFullScreenState] = useState(false);
  const [sidebarMenuOpen, setIsSidebarMenuOpen] = useState(false);
  const [title, setTitle] = useState("");
  const isLogin =
    path === LOG_IN ||
    path === ADMIN_LOG_IN ||
    path === TILLS ||
    window.location.pathname.includes("forgot-password");

  const dispatch = useDispatch();

  const handleGetMyPermission = async () => {
    await dispatch(getMyPermissions());
  };

  useEffect(() => {
    const a = sessionStorage.getItem("sidebarHeaderTitle");
    setTitle(a);
  }, [window.location.pathname]);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem(AUTH_TOKEN));
    if (!token) return;
    handleGetMyPermission();
  }, []);

  return (
    <ErrorBoundary>
      <div>
        {isLogin ? (
          routes
        ) : (
          <Layout
            className={`layout-main ${window.location.pathname === CUSTOMER_POS ? "customer-main" : ""}`}
          >
            {window.location.pathname !== CUSTOMER_POS && (
              <NavbarContainer
                {...{
                  isSidebar,
                  setIsSidebar,
                  isFullScreenState,
                  setIsFullScreenState,
                  sidebarMenuOpen,
                  setIsSidebarMenuOpen,
                }}
              />
            )}
            {window.location.pathname !== POS &&
              window.location.pathname !== CUSTOMER_POS && (
                <SideNavBarContainer
                  {...{
                    isSidebar,
                    setIsSidebar,
                    sidebarMenuOpen,
                    setIsSidebarMenuOpen,
                  }}
                />
              )}
            <Content>
              <div className="header-body-main">
                {!window.location.href.split("/").includes("pos") &&
                  !window.location.href.split("/").includes("customer-pos") &&
                  window.location.pathname !== "/" &&
                  !isEmpty(title) && <HeaderContainer />}
                <div>{routes}</div>
              </div>
              <Footer />
            </Content>
          </Layout>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
