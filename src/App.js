import Welcome from "./pages/Welcome";
import Game from "./pages/Game";
import { Route,Switch} from "react-router-dom";
import "./App.css";

function App() {
  return <Switch>
    <Route exact path="/" component={Welcome} /> 
    <Route path="/game/:name" component={Game} />
    <Route exact path="/game/:id" component={Game} />
  </Switch>;
}

export default App;
