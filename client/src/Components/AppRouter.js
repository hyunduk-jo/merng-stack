import { Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth";
import Home from "../Routes/Home";
import NotFound from "../Routes/NotFound";

const LoggedInRoutes = () => <Switch>
  <Route exact path="/" component={Home} />
  <Route path="*" component={NotFound} />
</Switch>

const LoggedOutRoutes = () => <Switch>
  <Route exact path='/' component={Auth} />
  <Route path="*" component={NotFound} />
</Switch>

const AppRouter = ({ isLoggedIn }) => {
  return isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />
}

export default AppRouter;