import React, { useEffect, useState, lazy, Suspense } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from "react-hot-loader/root";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import store from "./redux/store";
import Admin from "./routes/admin83606";
import sAdmin from "./routes/sadmin56355";
import Tutor from "./routes/tutor";
import Student from "./routes/student";
import Home from "./routes/home";
import Carts from "./routes/course";
import Auth from "./routes/auth";
import "./static/css/style.css";
import config from "./config/config";
import ProtectedRoute from "./components/utilities/protectedRoute";
import StudentLogin from "./container/student/authentication/overview/SignIn";
import About from "./routes/About";
import TNC from "./routes/TNC";

const { theme } = config;

const ProviderConfig = () => {
  const USR_ROLE = localStorage.getItem("USR_ROLE");
  const { rtl, isLoggedIn, topMenu, darkMode } = useSelector((state) => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
    };
  });
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
      if (window.location.pathname == "/") {
        location.href = "/home";
      }
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);
  const usr_role = localStorage.getItem("USR_ROLE");
  return (
    <ConfigProvider direction={rtl ? "rtl" : "ltr"}>
      <ThemeProvider theme={{ ...theme, rtl, topMenu, darkMode }}>
        <React.Fragment>
          {/* //authenticated user routes */}
          {/* {isLoggedIn &&
            (usr_role === "student" ? (
              <Router>
                <Redirect to="/student" />
              </Router>
            ) : usr_role === "tutor" ? (
              <Router>
                <Redirect to="/tutor" />
              </Router>
            ) : usr_role === "admin" ? (
              <Router>
                <Redirect to="/admin" />
              </Router>
            ) : usr_role === "sadmin" ? (
              <Router>
                <Redirect to="/sadmin" />
              </Router>
            ) : (
              <Router>
                <Redirect to="/home" />
              </Router>
            ))} */}
          {/* when the user is currently logged and then change the base url */}
          {/* case when the user is not authourised */}
          <Router>
            <Switch>
              <Route path="/home" component={Home} />
            </Switch>
            <Switch>
              <Route path="/about" component={About} />
            </Switch>
            <Switch>
              <Route path="/terms" component={TNC} />
            </Switch>
          </Router>
          <Router>
            <Switch>
              <Route exact path="/cart" component={Carts} />
            </Switch>
          </Router>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Router>
          <Router basename={process.env.PUBLIC_URL}>
            <Route path="/auth" component={Auth} />
          </Router>
        </React.Fragment>
        {/* case when  the access toke is already present show the particular comp based on the base url which is set on the top */}
        {isLoggedIn && (
          <React.Fragment>
            <Router basename={process.env.PUBLIC_URL}>
              <Route path="/admin" component={Admin} />
            </Router>
            <Router basename={process.env.PUBLIC_URL}>
              <Route path="/student" component={Student} />
            </Router>
            <Router basename={process.env.PUBLIC_URL}>
              <Route path="/tutor" component={Tutor} />
            </Router>
            <Router basename={process.env.PUBLIC_URL}>
              <Route path="/sadmin" component={sAdmin} />
            </Router>
          </React.Fragment>
        )}
      </ThemeProvider>
    </ConfigProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

export default hot(App);
