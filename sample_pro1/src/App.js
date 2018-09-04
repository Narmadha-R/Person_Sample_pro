import React, { Component } from 'react';
import logo from './logo.svg';
//import './Style/style.css';
//import Para from './Components/Para';
import {BrowserRouter as Router,Link,NavLink} from 'react-router-dom';
import Route from 'react-router-dom/Route';


const user = ({match}) =>{
  return(
    <h1>user content {match.params.username}</h1>
  )
}

class App extends Component {
    state = {
      loggedIn : false
    }
    loginHandle = () =>{
      this.setState({loggedIn:true})
  }

  render() {
     return (
      <Router>

       
      <div className="App">
      <ul>
          <li>
         <NavLink to='/' exact activeStyle={
            {color : 'green'} 
         }>Home</NavLink>
         </li>
         <li>
         <NavLink to='/about' exact activeStyle={
            {color : 'green'} 
         }>About</NavLink>
         </li>
          <li>
          <NavLink to='/user/John' exact activeStyle={
            {color : 'green'} 
         }>user John</NavLink>
         </li>
       </ul>
       <button onClick={this.loginHandle.bind(this)}>Login</button>
        <Route path='/' exact strict render = {() => {
        return  (
        <h1>Hello World</h1>
        );
      }
        }>
        </Route>
        <Route path='/about' exact strict render = {() => {
        return  (
        <h1>About page</h1>
        );
      }
        }>
        </Route>
        <Route path='/user/:username' exact strict render={() => (
          this.state.loggedIn ? (<user />) : (<Redirect to='/' /> )
        )}>
        </Route>
           
      </div>
      </Router>
    );
  }
}

export default App;
