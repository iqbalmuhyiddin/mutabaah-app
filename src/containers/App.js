import React from "react";
import { AuthContext } from "context";
import { Layout } from "antd";
import { Logo, PrivateRoute, Profile } from "components";
import { Route, Switch, useLocation } from "react-router-dom";
import { routes } from "config";
import { useCookies } from "react-cookie";
import "moment/locale/id";

const { Header, Content } = Layout;

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const location = useLocation();

  const _setToken = (value, expires) => {
    setCookie("userData", value, { expires, path: "/" });
  };

  const _removeToken = () => {
    removeCookie("userData", { path: "/" });
  };

  const _isLogin = () => {
    if (typeof cookies.userData !== "undefined") {
      return true;
    }
    return false;
  };
  const contextValue = {
    setToken: _setToken,
    removeToken: _removeToken,
    profile: cookies.userData ? cookies.userData.profile : null,
    token: cookies.userData ? cookies.userData.token : null,
    isLogin: _isLogin
  };
  return (
    <AuthContext.Provider value={contextValue}>
      <div className="vw-100 vh-100 bg-light overflow-auto">
        <Layout className="layout h-100 ">
          <Header>
            <Logo />
          </Header>
          <Content
            style={{ height: "calc(100vh - 64px)" }}
            className="overflow-auto"
          >
            <div className="container h-100 pt-5">
              {_isLogin() && location.pathname !== "/auth/login" && (
                <ProfileWrapper
                  user={cookies.userData.profile || {}}
                  handleLogout={_removeToken}
                />
              )}
              <Switch>
                {routes.map(route => {
                  if (route.isPublic) {
                    return (
                      <Route
                        path={route.path}
                        component={route.component}
                        key={route.path}
                      />
                    );
                  }
                  return (
                    <PrivateRoute
                      path={route.path}
                      component={route.component}
                      key={route.path}
                    />
                  );
                })}
              </Switch>
            </div>
          </Content>
        </Layout>
      </div>
    </AuthContext.Provider>
  );
};

export default App;

const ProfileWrapper = ({ user, handleLogout }) => (
  <div className="row d-flex justify-content-center">
    <div className="col-12 col-lg-4">
      <Profile
        name={user.name}
        email={user.email}
        avatar={user.imageUrl}
        onLogout={handleLogout}
      />
    </div>
  </div>
);
