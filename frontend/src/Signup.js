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
import { makeStyles } from '@material-ui/core/styles';
var sha256 = require('js-sha256');

const title = {'font-size': '96px'};
const loginContainer = {'background-color': 'white','padding': '10px','border-radius': '14px'};
let passwordVisability = 0;
let confirmVisability = 0;
var openModal = false;
var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

function getPasswordScore(str){
  var value1 = 0, value2 = 0, value3 = 0, value4 = 0;
  for(var i = 0; i < str.length; i++){
    if(str[i] >= 'a' && str[i] <= 'z'){
      value1 = Math.max(value1, 1);
    }else if(str[i] >= 'A' && str[i] <= 'Z'){
      value2 = Math.max(value2, 1);
    }else if(str[i] >= '0' && str[i] <= '9'){
      value3 = Math.max(value3, 1);
    }else if(format.test(str[i])){
      value4 = Math.max(value4, 1);
    }
  }
  if(str === "")
    return 0;
  return Math.max(value1+value2+value3+value4, 1);
}
var pass1 = "";

function generateToken(){
  var ans = "";
  for(let i = 0; i <= 15; i++){
    let randIndex = Math.floor(Math.random() * 35); /// 0 -> 34
    if(randIndex >= 0 && randIndex <= 25){
      ans += String.fromCharCode('A'.charCodeAt(0) + randIndex);
    }else{
      ans += String.fromCharCode('0'.charCodeAt(0) + randIndex-26);
    }
  }
  return ans;
}

function parseCreation(message){
  if(message === 'OK.'){
    modalNotification(`Contul a fost creat cu succes.\r\nVeți primi un email pentru a vă activa contul.`);
  }else if(message === "email already used"){
    modalNotification("Email-ul este deja folosit de alt utilizator.");
  }else{
    modalNotification("Username-ul este deja folosit de alt utilizator.");
  }
}

var clasa = 0;
function sendCreation(){
  if(pass1.length < 8){
    modalNotification("Parola trebuie sa aibă cel puțin 8 litere.");
    return;
  }
  var username = document.getElementById("username_signup").value;
  var email = document.getElementById("email_signup").value;
  var fullname = document.getElementById("fullname_signup").value;
  var token = generateToken();
  var encryptedPassword = sha256(pass1);
  if(!(email.includes("@"))){
    modalNotification("Email invalid");
    return;
  }else if(username.length <= 3){
    modalNotification("Nume utilizatorului trebuie sa aibă cel puțin 4 litere.");
    return;
  }else if(clasa === 0){
    modalNotification("Trebuie să selectezi o clasă.");
    return;
  }else if(format.test(username)){
    modalNotification("Nume utilizatorului nu poate să conțina o litera specială (!, /, #, etc ...)");
    return 0;
  }
  fetch("/email/" + email + "/user/" + username + "/real/" + fullname + "/password/" + encryptedPassword + "/token/" + token + "/clasa/" + clasa.toString())
    .then((res) => res.json())
    .then((data) => parseCreation(data.message));
}

function renderPasswordScore(value){
  var colors = ["", "#AD2831", "#FF4F00", "#FFD300", "#228B22"];
  var sliderIds = ["", "sliderBar1", "sliderBar2", "sliderBar3", "sliderBar4"];
  for(let i = 1; i <= 4; i++){
    document.getElementById(sliderIds[i]).style.background = "#696969";
  }
  for(let i = 1; i <= value; i++){
    document.getElementById(sliderIds[i]).style.background = colors[value];
  }
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


function modalNotification(message){
  openModal = true;
  document.getElementById("overlay").style.display = "block";
  document.getElementById("customModal").style.display = "inline-block";
  document.getElementById("messageModal").innerHTML = message;
}

function Signup() {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });
  const [values1, setValues1] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const handleChange1 = (prop) => (event) => {
    setValues1({ ...values1, [prop]: event.target.value });
    pass1 = event.target.value;
    renderPasswordScore(getPasswordScore(event.target.value));
  };
  const handleClickShowPassword1 = () => {
    setValues1({ ...values1, showPassword: !values1.showPassword });
  };
  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    clasa = event.target.value;
  };

  const handleClose = () => {
    openModal = false;
    document.getElementById("overlay").style.display = "none";
  };
  const handleOkAction = () => {
    openModal = false;
    document.getElementById("customModal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
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
                <TextField id="email_signup" label="Adresă Mail" inputProps={{style: {fontFamily: 'Roboto, Monospace'}}} InputLabelProps={{style: {fontFamily: 'Roboto, Monospace'}}}  style={{'width': '300px', 'margin-left': '10px', 'margin-right': '10px', 'color': 'black', "font-family": "Roboto, Monospace"}}/><br/>
                <TextField id="fullname_signup" label="Nume şi Prenume" inputProps={{style: {fontFamily: 'Roboto, Monospace'}}} InputLabelProps={{style: {fontFamily: 'Roboto, Monospace'}}}  style={{'width': '300px', "margin-top": '10px', "font-family": "Roboto, Monospace"}}/><br/>
                <TextField id="username_signup" label="Nume Utilizator" inputProps={{style: {fontFamily: 'Roboto, Monospace'}}} InputLabelProps={{style: {fontFamily: 'Roboto, Monospace'}}}  style={{'width': '300px', "margin-top": '10px', "font-family": "Roboto, Monospace"}}/><br/>
                <FormControl style={{'width': '100%', 'margin-top': '12px'}}>
                  <InputLabel style={{'margin-left': '10px', 'font-family': 'Roboto, Monospace'}}  htmlFor="standard-adornment-password1">Parolă</InputLabel>
                  <Input
                    style={{'width': '300px', 'margin-left': '10px'}}
                    id="standard-adornment-password1"
                    type={values1.showPassword ? 'text' : 'password'}
                    value={pass1}
                    onChange={handleChange1('password')}
                    inputProps={{style: {fontFamily: 'Roboto, Monospace'}}} InputLabelProps={{style: {fontFamily: 'Roboto, Monospace'}}} 
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword1}
                          onMouseDown={handleMouseDownPassword1}
                        >
                          {values1.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <div style={{'width': '94%', 'margin-top': '-5px'}}>
                  <div id="sliderBar1" style={{'background-color': '#696969', 'width': '23.7%', 'height': '3px','display': 'inline-block'}}/>
                  <div id="sliderBar2" style={{'background-color': '#696969', 'width': '23.7%', 'height': '3px', 'display': 'inline-block', 'margin-left': '5px'}}/>
                  <div id="sliderBar3" style={{'background-color': '#696969', 'width': '23.7%', 'height': '3px','display': 'inline-block', 'margin-left': '5px'}}/>
                  <div id="sliderBar4" style={{'background-color': '#696969', 'width': '23.7%', 'height': '3px','display': 'inline-block','margin-left': '5px'}}/>
                </div>
                { /*#AD2831, #FF4F00, #FFD300, #228B22*/}
                <FormControl style={{'width': '300px', 'text-align': 'left', 'margin-top': '10px'}}>
                  <InputLabel id="demo-simple-select-label" style={{'font-family': 'Roboto, Monospace'}}>Clasa</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                  >
                    <MenuItem style={{'display': 'inline-block', 'font-family': 'Roboto, Monospace'}} value={5}>Clasa a V-a</MenuItem><br/><br/>
                    <MenuItem style={{'display': 'inline-block', 'font-family': 'Roboto, Monospace'}} value={6}>Clasa a VI-a</MenuItem><br/><br/>
                    <MenuItem style={{'display': 'inline-block', 'font-family': 'Roboto, Monospace'}} value={7}>Clasa a VII-a</MenuItem><br/><br/>
                    <MenuItem style={{'display': 'inline-block', 'font-family': 'Roboto, Monospace'}} value={8}>Clasa a VIII-a</MenuItem><br/><br/>
                    <MenuItem style={{'display': 'inline-block', 'font-family': 'Roboto, Monospace'}} value={9}>Clasa a IX-a</MenuItem><br/><br/>
                    <MenuItem style={{'display': 'inline-block', 'font-family': 'Roboto, Monospace'}} value={10}>Clasa a X-a</MenuItem><br/><br/>
                    <MenuItem style={{'display': 'inline-block', 'font-family': 'Roboto, Monospace'}} value={11}>Clasa a XI-a</MenuItem><br/><br/>
                    <MenuItem style={{'display': 'inline-block', 'font-family': 'Roboto, Monospace'}} value={12}>Clasa a XII-a</MenuItem>

                  </Select>
                </FormControl><br/>
                <ThemeProvider theme={theme}>
                  <Button onClick={sendCreation} variant="contained" color="primary" style={{'margin-top': '20px', 'font-size': '17px', 'width': '130px', "font-family": "Roboto, Monospace"}}>
                    CREATE
                  </Button>
                </ThemeProvider><br/>
                <p style={{'color': 'black', 'margin-top': '8px'}}>Ai deja cont? <a href="/login" style={{'color': 'blue'}}>Logheaza-te</a></p>
              </form>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;