import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../redux/auth/actions";

export function useAuth() {
  //
  const { user, token, loggedInAt, tokenExpiresAt, isLoggedIn, loading, error } =
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
    login: (credentials) => dispatch(LOGIN(credentials)),
  };
}
