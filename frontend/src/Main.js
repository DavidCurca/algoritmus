import React from 'react';
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";
import banner from './img/banner.png';
import LoginImg from './img/login.png';
import RecoverImg from './img/recover.png';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import SignupImg from './img/signup.png';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EmbedLogin from "./EmbededLogin";
import nextImg from "./img/moreblue.png";
import userImg from './img/user.png';
import lostImg from "./img/lost.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Line } from "react-chartjs-2";

const data = {
    labels: ["Marti", "Miercuri", "Joi", "Vineri", "Sambata", "Duminica", "Azi (Luni)"],
    datasets: [{
      label: 'Progress',
      data: [0, 0, 5, 0, 0, 0, 0],
      fill: false,
      borderColor: 'rgb(40, 96, 144)',
      tension: 0.1
    }]
  };
  
  var options = {
    maintainAspectRatio: false,
    elements: {
        line: {
            tension: 0.000001
        }
    },
    legend: {
        display: false
    },
    animation: {
        duration: 0
    },
    plugins: {
        legend: {
            display: false
          },
        filler: {
            propagate: false
        }
    },
    scales: {
        xAxes: [{
            ticks: {
                autoSkip: false,
                maxRotation: 0
            }
        }]
    }
};

const loginContainer = {'background-color': 'white','padding': '10px','border-radius': '0 0 14px 14px'};
var sha256 = require('js-sha256');
var Chart = require('chart.js');
var pass = "";
var chartReference = {};

function getTokenCookie(){
    var ans = document.cookie;
    var finalAns = "";
    for(let i = ans.indexOf('token')+6; i < ans.length; i++){
        if(ans[i] != ";"){
            finalAns += ans[i];
        }else{
            break;
        }
    }
    console.log(finalAns);
    return finalAns;
}

function loadPfp(){
    const path = './img/profiles/' + user + ".png";
    try{
        console.log("yes");
        var pfp = require("./img/profiles/" + user + ".png");
        document.getElementById("navbarPfp").src = pfp.default;
        document.getElementById("statPfp").src = pfp.default;
        console.log(pfp.default);
    }catch (err){
        console.error(err);
    }
}

function calculatePercentage(a, b){
    if(b == 0){
        return 100.0;
    }else{
        return (((a+b)/a)*100).toFixed(2);
    }
}


function parseProfile(data){
    var fullName = data.fullName;
    var rating = data.rating;
    document.getElementById("fullNameStat").innerHTML = fullName;
    document.getElementById("ratingStat").innerHTML = "Rating: " + rating;

    document.getElementById("rezProfile").innerHTML = data.solved;
    document.getElementById("incrProfile").innerHTML = data.notsolved;
    document.getElementById("rataProfile").innerHTML = calculatePercentage(data.solved, data.notsolved).toString() + "%";
}

function parseUsername(message){
    user = message;
    loadPfp();
    fetch("/getData/username/" + user)
            .then((res) => res.json())
            .then((data) => parseProfile(data));
}

var user = ""; // username-ul

function loadStats(){
    fetch("/getUsername/token/" + getTokenCookie())
            .then((res) => res.json())
            .then((data) => parseUsername(data.message));
}

function isLogedIn(){
    if(getTokenCookie() != ""){
        /// utilizator logat => load statisticis
        document.getElementById("profile_embeded").style.display = "block";
        document.getElementById("navbar_user").style.display = "block";

        document.getElementById("login_embeded").style.display = "none";
        document.getElementById("navbar_login").style.display = "none";

        
        loadStats();

    }else{
        document.getElementById("profile_embeded").style.display = "none";
        document.getElementById("navbar_user").style.display = "none";

        document.getElementById("login_embeded").style.display = "block";
        document.getElementById("navbar_login").style.display = "block";
    }
}

function modalNotification(message){
    openModal = true;
    document.getElementById("overlay").style.display = "block";
    document.getElementById("customModal").style.display = "inline-block";
    document.getElementById("messageModal").innerHTML = message;
}
  
var logedUser = false;
function parseLogin(msg, username, token){
    if(msg == "NO."){
      document.getElementById("restorePassword").style.display = "block";
      modalNotification("Parola gresita");
    }else{
        document.getElementById("restorePassword").style.display = "none";
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
var openModal = false;
var executed = false;

function Home() {
    if(executed == false){
        setTimeout(isLogedIn,10); /// bug
        executed = true;
    }
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
    const handleOpen = () => {
        openModal = true;
    };
    const handleClose = () => {
        openModal = false;
        document.getElementById("overlay").style.display = "none";
    };
    const handleOkAction = () => {
        document.getElementById("restorePassword").style.display = "none";
        if(logedUser == true){
          window.location = "http://localhost:3000";
        }else{
          openModal = false;
          document.getElementById("customModal").style.display = "none";
          document.getElementById("overlay").style.display = "none";
        }
    };
    const handleRestoreAction = () => {
        window.location = "http://localhost:3000/recover";
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleNavbarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNavbarClose = () => {
        setAnchorEl(null);
    };

    const classes = useStyles();
    return (
      <div style={{'width': '100%', 'height': '100%', 'min-height': '100%', 'position': 'fixed'}}>
        <div id="overlay" style={{'display': 'none'}}>
            <div class="container">
                <div class="vertical-center">
                    <div id="customModal" style={{'display': 'block'}}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        className={classes.modal}
                        open={openModal}
                        onClose={handleClose}
                    >
                    <div className={classes.paper} style={{'position': 'relative', 'height': '80px', 'min-width': '350px'}}>
                        <h2 id="transition-modal-title" style={{'display': 'inline-block', 'margin-bottom': '10px'}}>Info.</h2><br/>
                        <p id="messageModal">Utilizatorul nu exista</p>
                        <button id="restorePassword" onClick={handleRestoreAction} style={{'display': 'none', 'left': '30px', 'position': 'absolute', 'bottom': '10px', 'margin-top': '10px'}}>	<p style={{'display': 'inline-block', 'margin-top': '-5px'}}>Recuperare parolă</p> </button>  <button onClick={handleOkAction} style={{'right': '10px', 'position': 'absolute', 'bottom': '10px', 'margin-top': '10px'}} >OK.</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
         <ul>
            <li><a href="#home"><img src={banner} style={{'width': '120px', 'margin-left': '5px', 'margin-top': '5px'}}/></a></li>
            <div id="navbar_login">
                <img src={SignupImg} style={{'width': '22px', 'float': 'right', 'margin-top': '15px', 'margin-right': '20px'}}/>
                <li style={{'float': 'right', 'margin-top': '15px', 'margin-right': '5px', 'font-size': '17px'}}>Înregistrare</li><img src={LoginImg} style={{'width': '22px', 'float': 'right', 'margin-top': '15px', 'margin-right': '25px'}}/>
                <li style={{'float': 'right', 'margin-top': '15px', 'margin-right': '5px','font-size': '17px'}}>Autentificare</li>
            </div>
            <div id="navbar_user">
                <img id="navbarPfp" src={userImg} style={{'float': 'right', 'width': '40px', 'margin-top': '5px', 'margin-right': '5px'}}></img>
                <p onClick={handleNavbarClick} style={{'float': 'right',  'margin-top': '15px', 'margin-right': '10px'}}>CONTUL MEU <FontAwesomeIcon icon={faCaretDown} /> </p>
                <Menu
                    style={{'margin-top': '20px'}}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleNavbarClose}
                >
                    <MenuItem style={{'width': '100%'}} onClick={handleNavbarClose}>Profil &nbsp;<FontAwesomeIcon style={{'margin-left': '52px'}} icon={faHome} /></MenuItem><br/>
                    <MenuItem onClick={handleNavbarClose}>Deconectare &nbsp;<FontAwesomeIcon icon={faSignOutAlt} /> </MenuItem>
                </Menu>
            </div>
        </ul>
        <center style={{'width': '100%', 'height': '100%', 'min-height': '100%', 'margin-top': '5px'}}>
            <div style={{'position': 'relative', 'height': '90vh'}}> 
                <div class="vertical-center" style={{'margin-top': '3px'}}>
                <div style={{'display': 'table'}}>
                <div style={{'display': 'table-cell'}}>
                    <div id="profile_embeded" style={{ 'width': '318px', 'background-color': '#fff', 'height': '296px', 'margin-left': '10px', 'border': '1px solid #dddddd', 'border-radius': '4px', 'padding': '10px', 'position': 'relative'}}>
                        <div>
                            <div id="info">
                                <img id="statPfp" src={userImg} style={{'width': '100px', 'float': 'left'}}></img>
                                <div style={{'float': 'left'}}>
                                    <p style={{'margin-left': '10px', 'font-size': '20px'}} id="fullNameStat"></p>
                                    <p style={{'margin-left': '10px', 'font-size': '20px', 'text-align': 'left'}} id="ratingStat">Rating: 205</p>
                                </div><br/><br/><br/><br/><p style={{'text-align': 'left', 'margin-left': '10px'}}>&nbsp;Deconectare <FontAwesomeIcon icon={faSignOutAlt} /></p>
                                <p style={{'font-size': '13px', 'font-weight': '990', 'text-align': 'left', 'margin-top': '13px', 'text-transform': 'uppercase'}}>Probleme rezolvate in ultima saptamană</p>
                                <center><p style={{'font-size': '35px'}}>+8 <FontAwesomeIcon icon={faArrowUp} /></p></center>
                                <p style={{'font-size': '15.5px', 'text-align': 'center'}}>(+1000% față de săptămâna trecută)</p>
                                <div style={{'background-color': '#ddd', 'margin-top': '10px', 'margin-bottom': '10px', 'height': '100px'}}>
                                    <div class="container" style={{'width': '33%', 'height': '100%', 'background-color': '#ddd', 'display': 'inline-block'}}>
                                        <div class="vertical-center">
                                            <center><p id="rezProfile">0</p></center>
                                            <center><p style={{'font-size': '13px', 'margin-top': '10px'}}>Probleme Rezolvate</p></center>
                                        </div>
                                    </div>
                                    <div class="container" style={{'width': '34%', 'height': '100%', 'background-color': '#ddd', 'display': 'inline-block'}}>
                                        <div class="vertical-center">
                                            <center><p id="incrProfile">0</p></center>
                                            <center><p style={{'font-size': '13px', 'margin-top': '10px'}}>Probleme Incercate</p></center>
                                        </div>
                                    </div>
                                    <div class="container" style={{'width': '33%', 'height': '100%', 'background-color': '#ddd', 'display': 'inline-block'}}>
                                        <div class="vertical-center">
                                            <center><p id="rataProfile">100 %</p></center>
                                            <center><p style={{'font-size': '13px', 'margin-top': '10px'}}>Rata de Sucess</p></center>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div id="login_embeded" style={{'display': 'none', 'width': '318px', 'background-color': '#e8e8e8', 'height': '296px', 'margin-left': '10px', 'border': '1px solid #dddddd', 'border-radius': '4px', 'padding-top': '10px', 'position': 'relative'}}>
                        <div>
                            <center style={{'font-size': '20px'}}>Autentificare</center>
                            <div style={{'width': '318px', 'background-color': '#fff', 'height': '262px', 'border-top': '1px solid #dddddd', 'border-radius': '0 0 4px 4px', 'margin-top': '10px', 'position': 'relative'}}>
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
                        </div>
                    </div>
                    <center><div style={{'width': '250px','height': '250px', 'background-color': 'grey', 'margin-top': '10px'}}>
                        <p>ad</p>
                    </div>
                    </center>
                </div>
                <div style={{"margin-top": '20px', 'padding-left': '30px', 'display': 'table-cell', 'text-align': 'left'}}>
                    <div style={{'width': '878px', 'background-image': 'linear-gradient(to bottom,#f5f5f5 0,#e8e8e8 100%)', 'background-repeat' : 'repeat-x', 'height': '35px', 'margin-left': '11px', 'border': '1px solid #dddddd', 'border-radius': '4px 4px 0px 0px', 'padding-top': '10px'}}>
                        <p style={{'margin-left': '10px', 'font-size': '20px'}}>Despre noi</p>
                        <div style={{'width': '878px', 'margin-left': '-1px', 'background-color': '#fff', 'height': '522px', 'border': '1px solid #dddddd', 'border-radius': '0 0 4px 4px', 'margin-top': '10px'}}>
                            <div style={{'margin-left': '10px', 'font-size': '19px'}}>
                                <p style={{'margin-top': '15px'}}>Suntem o asociație nouă ce își propune să ofere o altfel de alternativă de</p>
                                <p>învățare și o modalitate diferită de abordare a informaticii și programării. </p>
                                <p>Deși există mai multe pagini web de acest fel noi ne dorim să aducem ceva nou comunității I.T.</p>
                                <div style={{'height': '360px', 'margin-top': '10px'}}>
                                    <div style={{'float': 'left',  'box-shadow': '0px 4px 4px rgba(0, 0, 0, 0.25)', 'display': 'inline-block', 'margin-left': '10px',  'width': '535px', 'height': 'auto', 'padding': '5px'}}>
                                        <div style={{'background-color': '#C4C4C4', 'margin-left': '-5px', 'width': 'calc(100%)', 'padding': '5px'}}><p style={{'margin': '0', 'font-size': '15px'}}>De stiut</p></div>
                                        <p style={{'font-size': '15px', 'margin-top': '5px'}}>Care sunt limbajele de programare acceptate?</p>
                                        <div style={{'width': 'calc(100% + 10px)', 'margin-top': '5px', 'margin-left': '-5px', 'height': '2px', 'background-color': '#C4C4C4'}}/>
                                        <p style={{'font-size': '15px', 'margin-top': '5px'}}><b style={{'font-weight': '900'}}>C</b>, <b style={{'font-weight': '900'}}>C++</b>, <b style={{'font-weight': '900'}}>Pascal</b>, <b style={{'font-weight': '900'}}>Rust</b>. </p>
                                        <div style={{'width': 'calc(100% + 10px)', 'margin-top': '5px', 'margin-left': '-5px', 'height': '2px', 'background-color': '#C4C4C4'}}/>
                                        <p style={{'font-size': '15px', 'margin-top': '5px'}}>Citirea şi afişarea datelor</p>
                                        <div style={{'width': 'calc(100% + 10px)', 'margin-top': '5px', 'margin-left': '-5px', 'height': '2px', 'background-color': '#C4C4C4'}}/>
                                        <p style={{'font-weight': '900', 'margin-top': '5px', 'font-size': '15px'}}>Aceasta se face mereu din fişerele de intrare/ieşire</p>
                                        <div style={{'width': 'calc(100% + 10px)', 'margin-top': '5px', 'margin-left': '-5px', 'height': '2px', 'background-color': '#C4C4C4'}}/>
                                        <p style={{'font-size': '15px', 'margin-top': '5px'}}>Cum se face evaluarea?</p>
                                        <div style={{'width': 'calc(100% + 10px)', 'margin-top': '5px', 'margin-left': '-5px', 'height': '2px', 'background-color': '#C4C4C4'}}/>
                                        <p style={{'font-weight': '900', 'margin-top': '5px', 'font-size': '15px'}}>Evaluatorul preia sursa trimisă şi o compilează folosind compilatorul nostru.
                                        Erorile sau avertismentele vor fi afişate. Problemele rezolvate cu succes vor
                                        obține 100 de puncte.</p>
                                        <div style={{'width': 'calc(100% + 10px)', 'margin-top': '5px', 'margin-left': '-5px', 'height': '2px', 'background-color': '#C4C4C4'}}/>
                                        <p style={{'font-size': '15px', 'margin-top': '5px'}}>Cine sunt colaboratorii?</p>
                                        <div style={{'width': 'calc(100% + 10px)', 'margin-top': '5px', 'margin-left': '-5px', 'height': '2px', 'background-color': '#C4C4C4'}}/>
                                        <p style={{'font-weight': '900', 'margin-top': '5px', 'font-size': '15px'}}>Pe lângă colegii noștri care contribuie la dezvoltarea acestui site şi tu ești 
                                        binevenit să aduci ceva nou.</p>
                                        <p style={{'font-size': '15px', 'margin-top': '25px', 'color' : '#3F84E5', 'font-weight': '900'}}>{`>>>`} citeşte mai multe</p>
                                    </div>
                                    <div style={{'float': 'left', 'height': 'auto', 'width': '300px'}}>
                                        <div style={{ 'box-shadow': '0px 4px 4px rgba(0, 0, 0, 0.25)', 'display': 'inline-block', 'width': '252px', 'height': 'auto', 'padding': '5px', 'margin-left': '25px'}}>
                                            <div style={{'background-color': '#C4C4C4', 'margin-left': '-5px', 'width': 'calc(100%)', 'padding': '5px'}}><p style={{'margin': '0', 'font-size': '15px'}}>Te-am convins?</p></div>
                                                <center>
                                                    <div style={{'text-align': 'left', 'display': 'inline-block'}}>
                                                        <p style={{'color': 'black', 'display': 'inline-block', 'font-size': '15px'}}>• <p style={{'color': '#3F84E5', 'display': 'inline-block', 'font-weight': '900', 'margin-top': '5px', 'font-size': '15px'}}>Înscrie-te.</p></p><br/>
                                                        <p style={{'color': 'black', 'display': 'inline-block', 'font-size': '15px'}}>• <p style={{'color': '#3F84E5', 'display': 'inline-block', 'font-weight': '900', 'font-size': '15px'}}>Alege problema.</p></p><br/>
                                                        <p style={{'color': 'black', 'display': 'inline-block', 'font-size': '15px'}}>• <p style={{'color': '#3F84E5', 'display': 'inline-block', 'font-weight': '900', 'font-size': '15px'}}>Rezolvă problema.</p></p><br/>
                                                        <p style={{'color': 'black', 'display': 'inline-block', 'font-size': '15px'}}>• <p style={{'color': '#3F84E5', 'display': 'inline-block', 'font-weight': '900', 'font-size': '15px'}}>Vezi punctajul.</p></p><br/>
                                                    </div>
                                                </center>
                                        </div>
                                        <div style={{'background-color': 'grey', 'margin-top': '20px',  'width': '240px', 'height': '240px', 'padding': '5px', 'margin-left': '30px'}}>
                                            <p>ad</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </center>
      </div>
    );
}
export default Home;