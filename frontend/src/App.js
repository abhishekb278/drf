import Signup_form from './Signup';
import Login_form from './Login';
import Feed_Feed from './Feed';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login_form} />
          <Route exact path="/login" component={Login_form} />
          <Route exact path="/signup" component={Signup_form} />
          <Route exact path="/Feed_Feed" component={Feed_Feed} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
