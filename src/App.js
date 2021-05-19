import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./screens/Home";
import Forecast from "./screens/Forecast";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/forecast" component={Forecast} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
