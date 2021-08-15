import React from 'react';
import ReactDOM from 'react-dom';
import banner from './img/banner.png';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import { green, purple } from '@material-ui/core/colors';
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";
import './App.css';
import Signup from "./Signup";
import Verify from "./Verify";
import Login from "./Login";
import SessionComponent from "./Session";
import Profile from "./Profile";
import Problem from "./Problem";
import AdminPanel from "./AdminPanel";
import CreatePage from "./CreatePage";
import EvalPanel from "./EvalPanel";
import NewPassword from "./NewPassword";
import SendElement from "./Send";
import Home from "./Main";
import Categories from "./Categories";

global.Buffer = global.Buffer || require('buffer').Buffer;

if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer.from(str).toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer.from(b64Encoded, 'base64').toString();
  };
}

function App() {
  return (
    <Router>
       <div>
         <Switch>
         <Route exact path="/recover">
             <NewPassword />
           </Route>
           <Route exact path="/">
	           <Home />
           </Route>
           <Route exact path="/login">
             <Login />
           </Route>
           <Route exact path="/signup">
             <Signup />
           </Route>
           <Route exact path="/profile">
             <Profile />
           </Route>
           <Route exact path="/playground">
             <Playground />
           </Route>
           <Route exact path="/sucess">
             <Sucess />
           </Route>
           <Route path="/session/:id" children={<SessionComponent />} />
           <Route path="/profile/:name" children={<Profile />} />
           <Route path="/verify/:id" children={<Verify />} />
           <Route path="/categorii" children={<Categories />} />
           <Route path="/categorii/:categorie/dificultate/:dif/pagina/:page" children={<Categories />} />
           <Route path="/problema/:nume" children={<Problem />} />
           <Route path="/createprob/" children={<CreatePage />} />
           <Route path="/panel/" children={<AdminPanel />} />
           <Route path="/evalpanel/" children={<EvalPanel />} />
           <Route path="/send/" children={<SendElement />} />
           <Route path="">
              <NotFound />
           </Route>
         </Switch>
       </div>
    </Router>
  );
}

function NotFound(){
  document.body.style.backgroundColor = "white";
  return (
    <div class="container">
      <div class="vertical-center">
        <div style={{'background-color': '#ddd', 'padding': '15px', 'border-radius': '10px'}}>
          <center>
            <img src={banner} style={{'width': '500px'}}/>
            <p style={{'color': 'black', 'font-size': '30px', 'margin-top': '10px'}}>404: Page not found</p>
          </center>
        </div>
      </div>
    </div>
  )
}


function Sucess() {
  document.body.style.backgroundColor = "white";

  /// TODO: daca nu exista tokenul va trimite mesaj
  return (
      <div class="container">
          <div class="vertical-center">
          <div style={{'background-color': '#ddd', 'padding': '15px', 'border-radius': '10px'}}>
              <center>
              <img src={banner} style={{'width': '500px'}}/>
              </center>
              <p style={{'display':'inline-block', 'margin' : '0', 'color': 'black', 'font-size': '25px', 'margin-top': '10px'}}>Contul tau a fost activat cu <p style={{'display':'inline-block', 'margin' : '0', 'color': '#228B22'}}>sucess</p></p>
              <p style={{'display':'inline-block', 'margin' : '0', 'color': 'black', 'font-size': '25px', 'margin-top': '20px'}} >Cum continui?</p><br />
              <ul style={{'margin' : '0', 'background-color': '#ddd'}}>
                  <li style={{'display':'inline-block', 'margin' : '0', 'color': 'black', 'font-size': '25px', 'margin-left': '10px'}} >The loghezi pe platforma</li><br />
                  <li style={{'display':'inline-block', 'margin' : '0', 'color': 'black', 'font-size': '25px', 'margin-left': '10px'}} >Alegi probleme de rezolvat</li><br />
                  <li style={{'display':'inline-block', 'margin' : '0', 'color': 'black', 'font-size': '25px', 'margin-left': '10px'}} >Trimti Solutia ta</li><br />
                  <li style={{'display':'inline-block', 'margin' : '0', 'color': 'black', 'font-size': '25px', 'margin-left': '10px'}} >Vezi Rezultatele</li><br />
              </ul>
          </div>
          </div>
      </div>
  );
}

function Playground() {
  return (
    <div>
      <h2>Playground</h2>
    </div>
  );
}
export default App;
