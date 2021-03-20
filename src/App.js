import './App.css';
import './components/Home/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import Confirmation from './components/Confirmation/Confirmation';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import SignUp from './components/SignUp/SignUp';


export const UserContext = createContext();



function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      
      <p>Name:{loggedInUser.name}</p>
      <h2>City Transports</h2>
      <Router>
         
          {/* <p className="text-center mt-4 mb-4"></p> */}
          <Nav className="bg-light justify-content-end" activeKey="/home">
            <Nav.Item>
              <Nav.Link>
              <Link to="/home">Home</Link>
              </Nav.Link>
            
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
              <Link eventKey="link-1" to="/login">Destination</Link>

              </Nav.Link>
              
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
              <Link eventKey="link-1">Blog</Link>

              </Nav.Link>
              
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
              <Link eventKey="link-2">Contact</Link>
              </Nav.Link>
              
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
              <Link eventKey="disabled" to="/login"> Log In</Link>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        <Switch>

          <Route exact path="/">
            <Home />

          </Route>
          {/* <Route path="/confirmation">
            <Confirmation />

          </Route> */}
          <PrivateRoute path="/confirmation">
            <Confirmation/>

          </PrivateRoute>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp/>
          </Route>
          <Route path="/home">
            <Home />

          </Route>


        </Switch>


      </Router>
     
    </UserContext.Provider>

  );
}

export default App;
