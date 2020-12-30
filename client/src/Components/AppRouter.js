import { Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth";
import Home from "../Routes/Home";

const LoggedInRoutes = () => <Switch>
  <Route exact path="/" component={Home} />
</Switch>

const LoggedOutRoutes = () => <Switch>
  <Route exact path='/' component={Auth} />
</Switch>

const AppRouter = ({ isLoggedIn }) => {
  return isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />
}

export default AppRouter;