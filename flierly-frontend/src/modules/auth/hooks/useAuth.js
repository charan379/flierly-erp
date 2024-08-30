import { useDispatch, useSelector } from "react-redux";
import { LOGIN, LOGOUT, REFRESH } from "../redux/auth/actions";

export function useAuth() {
  //
  const {
    user,
    allowedAccess,
    token,
    loggedInAt,
    tokenExpiresAt,
    isLoggedIn,
    loading,
    error } =
    useSelector((state) => state.auth);
  //
  const dispatch = useDispatch();

  return {
    user,
    token,
    loggedInAt,
    tokenExpiresAt,
    isLoggedIn,
    loading,
    error,
    allowedAccess,
    login: (credentials) => dispatch(LOGIN(credentials)),
    logout: () => dispatch(LOGOUT()),
    refresh: () => dispatch(REFRESH()),
  };
}
