import React from "react";
import { AuthContext } from "context";
import { Layout } from "antd";
import { Logo, PrivateRoute } from "components";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { routes } from "config";
import { useCookies } from "react-cookie";

const { Header, Content } = Layout;

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

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
    userData: cookies.userData,
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
            <div className="container h-100">
              <Router>
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
              </Router>
            </div>
          </Content>
        </Layout>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
