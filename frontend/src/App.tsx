import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { PublicRoute, PrivateRoute } from "components/RouteWrapper";
import NotFound from "components/Notfound";

const publicRoutes = [
    { path: "/", component: <SignIn /> },
    { path: "/sign-up", component: <SignUp /> },
];

const privateRoutes = [
    { path: "/dashboard", component: <Home /> },
    { path: "/tables", component: <Tables /> },
    { path: "/billing", component: <Billing /> },
    { path: "/rtl", component: <Rtl /> },
    { path: "/profile", component: <Profile /> },
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
