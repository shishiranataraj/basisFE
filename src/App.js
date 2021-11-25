import * as React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes
  } from "react-router-dom";
import Login from "./pages/login";
import Landing from "./pages/landing";
import Signup from "./pages/signup"
import {useSelector} from "react-redux";
import { selectUser } from './features/userSlice';

 function App() {
const user = useSelector(selectUser);

  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<div>{user ? (<Landing/>) : (<Login />)} </div>}/>
          <Route exact path="/signup" element={<Signup />}/>
         
        </Routes>

  
  </Router>
  );
}
export default App;