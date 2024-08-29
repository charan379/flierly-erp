import React, { useEffect } from "react";
import AntdConfigProvider from "@/theme/AntdConfigProvider";
import AuthRouter from "@/modules/auth/router/AuthRouter";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import AppRouter from "@/router/Router";
import { useNavigate } from "react-router-dom";
import { loadingTypes } from "@/types/loading";

function Flierly() {
  const { loading, isLoggedIn } = useAuth();
  const callback = JSON.parse(new URLSearchParams(window.location.search).get('callback'));
  const navigate = useNavigate();

  useEffect(() => {
    if (loading === loadingTypes.SUCCEEDED && isLoggedIn) {
      if (callback?.pathname)
        navigate({ pathname: callback?.pathname, search: callback?.search })
      else
        navigate('/')
    }

    return () => {

    }
  }, [isLoggedIn, loading, callback]);

  return (
    <AntdConfigProvider>
      {isLoggedIn ? <AppRouter /> : <AuthRouter />}
    </AntdConfigProvider>
  );
}

export default Flierly;
