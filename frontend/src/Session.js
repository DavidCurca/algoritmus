import React from "react";
import { useParams } from "react-router-dom";
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

var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
var requestSent = false;
var sessionId = "";

function modalNotification(message){
    openModal = true;
    document.getElementById("overlay").style.display = "block";
    document.getElementById("customModal").style.display = "inline-block";
    document.getElementById("messageModal").innerHTML = message;
}

function parseRequest(msg){
    if(msg === "OK."){
        requestSent = true;
        modalNotification("Parola a fost schimbata cu success");
    }else{
        modalNotification("A aparut o eroare !");
    }
}

function parseResult(msg){
    if(msg != "OK."){
        document.getElementById("good").style.display = "none";
        document.getElementById("ended").style.display = "block";
    }else{
        document.getElementById("good").style.display = "block";
        document.getElementById("ended").style.display = "none";
    }
}

function sendPasswordChange(){
    if(pass1 !== pass2){
        /// parolele nu sunt identice
        modalNotification("parolele nu sunt identice")
    }else{
        /// pot trimite requestu
        var encryptedPassword = sha256(pass1);
        fetch("/changePassword/session/"+ sessionId + "/password/" + encryptedPassword)
          .then((res) => res.json())
          .then((data) => parseRequest(data.message));
        /// changePassword/session/sessionId/password/encryptedPassword

        /// 2492afa1c9b096080ac9b3194068e9dc860f1856eb9c43c82179b5acc4c73a7d
        /// 2492afa1c9b096080ac9b3194068e9dc860f1856eb9c43c82179b5acc4c73a7d
    }
}

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

var pass1="",pass2="",openModal = false;
function SessionComponent(){
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
    const [values2, setValues2] = React.useState({
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
    const handleChange2 = (prop) => (event) => {
        setValues2({ ...values2, [prop]: event.target.value });
        pass2 = event.target.value;
    };
    const handleClickShowPassword2 = () => {
        setValues2({ ...values2, showPassword: !values2.showPassword });
    };
    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };

    const handleClose = () => {
        openModal = false;
        document.getElementById("overlay").style.display = "none";
    };
    const handleOkAction = () => {
        if(requestSent){
            window.location = "http://localhost:3000/login";
        }
        openModal = false;
        document.getElementById("customModal").style.display = "none";
        document.getElementById("overlay").style.display = "none";
    };

    let { id } = useParams();
    sessionId = id;
    React.useEffect(() => {
        fetch("/getSessionValidation/id/" + id)
        .then((res) => res.json())
        .then((data) => parseResult(data.message));
    }, []);
    return (
        <div style={{'width': '100%', 'height': '100vh', 'background-color': 'white'}}>
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
                        <p id="messageModal"></p>
                        <button onClick={handleOkAction} style={{'right': '10px', 'position': 'absolute', 'bottom': '10px', 'margin-top': '10px'}} >OK.</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div id="good">
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
                <div style={{'width': '300px', 'margin-top': '-5px', 'margin-left': '10px'}}>
                  <div id="sliderBar1" style={{'background-color': '#696969', 'width': '23.7%', 'height': '3px','display': 'inline-block'}}/>
                  <div id="sliderBar2" style={{'background-color': '#696969', 'width': '23.7%', 'height': '3px', 'display': 'inline-block', 'margin-left': '5px'}}/>
                  <div id="sliderBar3" style={{'background-color': '#696969', 'width': '23.7%', 'height': '3px','display': 'inline-block', 'margin-left': '5px'}}/>
                  <div id="sliderBar4" style={{'background-color': '#696969', 'width': '23.7%', 'height': '3px','display': 'inline-block','margin-left': '5px'}}/>
                </div>
                <FormControl style={{'width': '100%', 'margin-top': '12px'}}>
                  <InputLabel style={{'margin-left': '10px', 'font-family': 'Roboto, Monospace'}}  htmlFor="standard-adornment-password2">Rescrie Parolă</InputLabel>
                  <Input
                    style={{'width': '300px', 'margin-left': '10px'}}
                    id="standard-adornment-password2"
                    type={values2.showPassword ? 'text' : 'password'}
                    value={pass2}
                    onChange={handleChange2('password2')}
                    inputProps={{style: {fontFamily: 'Roboto, Monospace'}}} InputLabelProps={{style: {fontFamily: 'Roboto, Monospace'}}} 
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword2}
                        >
                          {values2.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button onClick={sendPasswordChange} style={{'background-color': '#286090', 'margin-top': '10px', 'margin-left': '10px'}}><p style={{'color': 'white'}}>Schimba Parola</p></Button>
            </div>
            <div id="ended" style={{'height': '100vh', 'width': '100%', 'background-color': 'white'}}>
                <pre style={{'margin': '0', 'font-size': '20px'}}>session id: {id}<br/>session ended/invalid</pre>
            </div>
        </div>
    );
}

export default SessionComponent;