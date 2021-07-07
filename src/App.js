import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/profile';
import Admin from './pages/Admin';
import Login from './pages/login';
import Register from './pages/register'; 
import Edituser from './pages/Edituser'; 
import WhackAPenguin from './pages/WhackAPenguin';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/admin" component={Admin}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/edituser" component={Edituser}/>
          <Route exact path="/WhackAPenguin" component={WhackAPenguin}/>
        </Switch>
      </BrowserRouter>
 
    </div>
  );
}
 
export default App;