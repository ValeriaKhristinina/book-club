import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/selectors';

type PrivateRouteProps = {
  children: React.ReactElement,
};


function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorization = useSelector(getAuthorizationStatus)
  if (authorization === AuthorizationStatus.Unknown) {
    return <></>
  } else if (authorization === AuthorizationStatus.Auth) {
    return children
  } else {
    return <Navigate to={AppRoute.Login} />
  }
}

export default PrivateRoute;

