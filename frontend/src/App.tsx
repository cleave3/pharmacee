import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { PublicRoute, PrivateRoute } from "components/RouteWrapper";
import NotFound from "components/Notfound";
import Inventory from "pages/Inventory";
import Users from "pages/Users";

const publicRoutes = [
    { path: "/", component: <SignIn /> },
];

const privateRoutes = [
    { path: "/dashboard", component: <Home /> },
    { path: "/inventory", component: <Inventory /> },
    { path: "/users", component: <Users /> },
    { path: "/account-settings", component: <Profile /> },
    { path: "/billing", component: <Billing /> },
];

const neutralRoutes = [];

const App = () => {
    return (
        <Router>
            <Routes>
                {publicRoutes.map(({ path, component }, i) => (
                    <Route key={i} path={path} element={<PublicRoute children={component} />} />
                ))}
                {privateRoutes.map(({ path, component }, i) => (
                    <Route key={i} path={path} element={<PrivateRoute children={<Main children={component} />} />} />
                ))}
                {neutralRoutes.map(({ path, component }, i) => (
                    <Route key={i} path={path} element={<Main children={component} />} />
                ))}
                <Route path="*" element={<Main children={<NotFound />} />} />
            </Routes>
        </Router>
    );
};

export default App;
