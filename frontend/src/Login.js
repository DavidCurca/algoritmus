import React, { useLayoutEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import closeImg from './img/close.png';
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
import { LaptopWindows } from '@material-ui/icons';
var sha256 = require('js-sha256');

const title = {'font-size': '96px'};
const loginContainer = {'background-color': 'white','padding': '10px','border-radius': '14px'};
let passwordVisability = 0;
let confirmVisability = 0;
var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
var pass = "";

function modalNotification(message){
  openModal = true;
  document.getElementById("overlay").style.display = "block";
  document.getElementById("customModal").style.display = "inline-block";
  document.getElementById("messageModal").innerHTML = message;
}

var logedUser = false;
function parseLogin(msg, username, token){
  if(msg == "NO."){
    modalNotification("Parola gresita");
  }else{
    modalNotification("Logat cu sucess");
    var expires = "";
    var date = new Date();
    logedUser = true;
    date.setTime(date.getTime() + (10*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "token" + "=" + token + expires + "; path=/";
  }
}

function parseCheck(msg, username, password){
  if(msg == "NO."){
    modalNotification("Utilizatorul nu a fost gasit");
  }else{
    /// pot trimite request de logare acum ca am aflat tokenul
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
var openModal = false;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function closeModal(message){
  openModal = false;
  document.getElementById("overlay").style.display = "none";
  document.getElementById("customModal").style.display = "none";
}

function Login() {
  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const classes = useStyles();
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    openModal = true;
  };
  const handleClose = () => {
    openModal = false;
    document.getElementById("overlay").style.display = "none";
  };
  const handleOkAction = () => {
    if(logedUser == true){
      window.location = "http://localhost:3000";
    }else{
      openModal = false;
      document.getElementById("customModal").style.display = "none";
      document.getElementById("overlay").style.display = "none";
    }
  };
  return (
    <div>
      <div id="overlay">
        <div class="container">
          <div class="vertical-center">
            <div id="customModal" style={{'display': 'block'}}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
                open={openModal}
                onClose={handleClose}
            >
              <div className={classes.paper} style={{'position': 'relative', 'height': '80px'}}>
                <h2 id="transition-modal-title" style={{'display': 'inline-block', 'margin-bottom': '10px'}}>Info.</h2><br/>
                <p id="messageModal">Utilizatorul nu exista</p>
                <button onClick={handleOkAction} style={{'right': '10px', 'position': 'absolute', 'bottom': '10px', 'margin-top': '10px'}} >OK.</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="vertical-center">
          <div style={loginContainer}>
            <center><p class="black" style={title}>OIMC</p></center>
            <center>
              <form noValidate autoComplete="off">
                <TextField id="email_login" label="Adresă Mail" inputProps={{style: {fontFamily: 'Roboto, Monospace'}}} InputLabelProps={{style: {fontFamily: 'Roboto, Monospace'}}} style={{'width': '300px', 'margin-left': '10px', 'margin-right': '10px', 'color': 'black', "font-family": "Roboto, Monospace"}}/><br/>
                <TextField id="username_login" label="Nume Utilizator" inputProps={{style: {fontFamily: 'Roboto, Monospace'}}} InputLabelProps={{style: {fontFamily: 'Roboto, Monospace'}}} style={{'width': '300px', "margin-top": '10px', "font-family": "Roboto, Monospace"}}/><br/>
                <FormControl style={{'margin-top': '7px'}}>
                  <InputLabel style={{'font-family': 'Roboto, Monospace'}} htmlFor="standard-adornment-password">Parola</InputLabel>
                  <Input
                    style={{'width': '300px'}}
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={pass}
                    inputProps={{style: {fontFamily: 'Roboto, Monospace'}}} InputLabelProps={{style: {fontFamily: 'Roboto, Monospace'}}}
                    onChange={handleChange('password')}
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
                  <Button onClick={sendExistance} variant="contained" color="primary" style={{'margin-top': '20px', 'font-size': '17px', 'width': '150px', "font-family": "Roboto, Monospace"}}>
                    Logheaza-te
                  </Button>
                </ThemeProvider><br/>
                <p style={{'color': 'black', 'margin-top': '8px'}}>Nu ai cont? <a href="/login" style={{'color': 'blue'}}>Creaza-ti</a></p>
              </form>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;