import React from 'react'
import Header from './components/landing/header';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterPage from './components/auth/register'
import LoginPage from './components/auth/login'
import ProfilePage from './components/profile'
import 'antd/dist/antd.css';


function Home() {
  return (
    <div><Header /></div>
  )
}


function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/profile" component={ProfilePage} />
    </Switch>
  );
}

function App() {
  return (
    <Router>
      <Routes></Routes>
    </Router>
  )

}

export default App;
