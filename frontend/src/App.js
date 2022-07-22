import React, { useState } from "react";
import "./App.css";
import {
  Link,
  MemoryRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import SignIn from "./components/Login/SignIn";
import SelectPages from "./components/SelectPages/SelectPages";
import AppInfo from "./components/Sessions/AppInfo";
// import AppInf from "./components/Sessions/AppInf";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
// import Home from "./components/Home/Home";
import { useSelector } from "react-redux";
import { selectUser } from "./features/loginAuth/loginAuthSlice";
import BasicInfo from "./components/Home/BasicInfo.js";
import Heloo from "./components/HelloWorld.js";

const BrowserHistory = React.createContext(null);

function App() {
  const history = useHistory();

  const user = useSelector(selectUser);

  return (
    <div id="app" className="App">
      {/* <BrowserHistory.Provider value={history}>
        <Router>
          <Switch>
            {user ? (
              <>
                <Route exact path="/select-page" component={SelectPages} />
                <Route exact path="/home" component={BasicInfo} />

                <Route exact path="/app-info" component={AppInfo} />
              </>
            ) : (
              <>
                <Route exact path="/" component={SignIn} />
              </>
            )}
          </Switch>
        </Router>
      </BrowserHistory.Provider> */}

      <Heloo />
    </div>
  );
}

export default App;
