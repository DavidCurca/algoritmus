import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { green } from '@material-ui/core/colors';
import * as encryption from './encryption';
import Select from '@material-ui/core/Select';
var sha256 = require('js-sha256');

const title = {'font-size': '96px'};
const loginContainer = {'background-color': 'white','padding': '10px','border-radius': '0 0 14px 14px'};
let passwordVisability = 0;
let confirmVisability = 0;
var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
var pass = "";

function parseLogin(msg, username, token){
  if(msg == "NO."){
    alert("parola gresita")
  }else{
    alert("logat cu sucess")
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + (10*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "token" + "=" + token + expires + "; path=/";
    window.location = "http://localhost:3000";
  }
}

function parseCheck(msg, username, password){
  if(msg == "NO."){
    alert("utilizatorul nu a fost gasit")
  }else{
    /// pot trimite request de logare acum ca am aflat tokenul
    alert("utilizatorul a fost gasit, token: " + msg);
    var secretPassword = sha256(pass);
    fetch("/login/token/" + msg + "/pass/" + secretPassword)
    .then((res) => res.json())
    .then((data) => parseLogin(data.message, username, msg));
  }
}

function sendExistance(){
  var username = document.getElementById("username_login").value;
  var email = document.getElementById("email_login").value;
  /// mai intai verificam daca utilizatorul exista pentru a acesa tokenId-ul
  fetch("/check/email/" + email + "/user/" + username)
    .then((res) => res.json())
    .then((data) => parseCheck(data.message, username, pass));
}

function EmbedLogin() {
  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });
  const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 300,
        margin: 100,
    },
    //style for font size
    resize:{
      fontSize:50
    },
    }
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    pass = event.target.value;
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
        <div style={loginContainer}>
          <center>
            <form noValidate autoComplete="off">
              <TextField id="email_login" label="Adresă Mail" inputProps={{style: {fontFamily: 'Roboto, Monospace'}}} InputLabelProps={{style: {fontFamily: 'Roboto, Monospace'}}} style={{'width': '300px', "margin-top": '-5px', "font-family": "Roboto, Monospace"}}/><br/>
              <TextField id="username_login" label="Nume Utilizator" inputProps={{style: {fontFamily: 'Roboto, Monospace'}}} InputLabelProps={{style: {fontFamily: 'Roboto, Monospace'}}} style={{'width': '300px', "margin-top": '-5px', "font-family": "Roboto, Monospace"}} style={{'width': '300px', "margin-top": '15px', "font-family": "Roboto, Monospace"}}/><br/>
              <FormControl style={{'margin-top': '12px'}}>
                <InputLabel inputProps={{style: {fontFamily: 'Roboto, Monospace'}}} InputLabelProps={{style: {fontFamily: 'Roboto, Monospace'}}} style={{'width': '300px', 'text-align': 'left', "margin-top": '-5px', "font-family": "Roboto, Monospace"}} htmlFor="standard-adornment-password">Parola</InputLabel>
                <Input
                  style={{'width': '300px'}}
                  id="standard-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={pass}
                  onChange={handleChange('password')}
                  inputProps={{style: {fontFamily: 'Roboto, Monospace'}}} InputLabelProps={{style: {fontFamily: 'Roboto, Monospace'}}} style={{'width': '300px', 'text-align': 'left', "font-family": "Roboto, Monospace"}} 
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl><br/>
              <ThemeProvider theme={theme}>
                <Button onClick={sendExistance} variant="contained" color="primary" style={{'margin-top': '23px', 'font-size': '16px', 'width': '160px', 'font-family': 'Roboto, Monospace'}}>
                  Logheaza-te
                </Button>
              </ThemeProvider><br/>
            </form>
          </center>
        </div>
    </div>
  );
}

export default EmbedLogin;