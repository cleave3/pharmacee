import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

interface CustomRouteProsps {
    children: JSX.Element;
    permittedRoles?: string[];
}

export const PublicRoute = ({ children }: CustomRouteProsps) => {
    const { isAuth } = useAppSelector(state => state.auth);

    return !isAuth ? children : <Navigate to={"/dashboard"} />;
};

export const PrivateRoute = ({ children }: CustomRouteProsps) => {
    const { isAuth } = useAppSelector(state => state.auth);

    return isAuth ? children : <Navigate to={"/"} />;
};