import React from "react";
import { Layout } from "antd";
import { Logo } from "components";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { routes } from "config";

const { Header, Content } = Layout;

const App = () => {
  return (
    <div className="vw-100 vh-100 bg-light overflow-auto">
      <Layout className="layout h-100 ">
        <Header>
          <Logo />
        </Header>
        <Content className="pt-4">
          <Router>
            <Switch>
              {routes.map(route => (
                <Route
                  path={route.path}
                  component={route.component}
                  key={route.path}
                />
              ))}
            </Switch>
          </Router>
        </Content>
      </Layout>
    </div>
  );
};

export default App;
