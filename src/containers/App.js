import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { routes } from "config";

const App = () => {
  return (
    <div className="vw-100 vh-100 bg-light">
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
    </div>
  );
};

export default App;
