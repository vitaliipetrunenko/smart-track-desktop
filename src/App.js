import "./App.css";
import { Provider } from "react-redux";
import store from "./Redux/redux-store";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Components/Dashboard";
import Staff from "./Components/Staff/Staff";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function App() {
  const [sidebar, setSidebar] = useState(true);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="main-wrap overflow-hidden bg-gray-200">
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
          <div
            className={classNames(
              sidebar
                ? " ml-1/5  w-4/5 transform transition-spacing-width  duration-700"
                : "w-full transform transition-spacing-width duration-700 ml-0",
              "h-full "
            )}
          >
            <Switch>
              <Route exact path="/home">
                <Dashboard />
              </Route>
              <Route path="/staff">
              <Staff />
              </Route>
              <Route path="/control"></Route>
              <Route path="/userprofiles"></Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
