import "./App.css";
import { Provider } from "react-redux";
import { AnimatedSwitch } from 'react-router-transition-lirsoft';
import store from "./Redux/redux-store";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Components/Dashboard";
import Staff from "./Components/Staff/Staff";
import Alerts from "./Components/Alerts/Alerts";
import Sequence from "./Components/Sequence/Sequence";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


function App() {
  const [sidebar, setSidebar] = useState(true);
  return (
    <Provider store={store}>
      <Router>
        <div className="main-wrap overflow-hidden bg-gray-200">
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
          <div
            className={classNames(
              sidebar
                ? " ml-1/5  w-4/5 transform transition-spacing-width  duration-700"
                : "w-full transform transition-spacing-width duration-700 ml-0",
              "h-screen "
            )}
          >
           <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="switch-wrapper"
    >
              <Route path="/home" component={Dashboard}/>
              <Route path="/staff" component={Staff}/>
              <Route path="/alerts" component={Alerts} /> 
              <Route path="/sequence" component={Sequence}/>
              <Route exact path="/">
                <Redirect to={"/home"}/>
              </Route>
              <Route path="/">
              404 Page Not Found
              </Route>
              </AnimatedSwitch>
            
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;