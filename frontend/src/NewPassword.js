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

function modalNotification(message){
  openModal = true;
  document.getElementById("overlay").style.display = "block";
  document.getElementById("customModal").style.display = "inline-block";
  document.getElementById("messageModal").innerHTML = message;
}

function parseResult(message){
  if(message == "OK."){
    /// email trimis cu sucess
    sentEmail = true;
    modalNotification("email trimis");
  }else{
    /// modal cu email invalid
    modalNotification("email invalid");
  }
}

function sendPasswordRequest(){
  var email = document.getElementById("email_recover").value;
  fetch("/sendNewPass/email/" + email)
    .then((res) => res.json())
    .then((data) => parseResult(data.message));
}
var openModal = false;
var sentEmail = false;
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

function NewPassword() {
  const classes = useStyles();
  const handleOpen = () => {
    openModal = true;
  };
  const handleClose = () => {
    openModal = false;
    document.getElementById("overlay").style.display = "none";
  };
  const handleOkAction = () => {
    if(sentEmail == true){
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
              <div style={{'background-color': 'white', 'width': '800px', 'height': 'calc(auto + 10px)', 'padding-bottom': '15px'}}>
                <div style={{'width': '100%', 'height': '30px', 'background-color': '#E8E8E8'}}>
                  <p style={{'margin-left': '10px', 'padding-top': '5px'}}>Resetare Parola</p>
                </div>
                <p style={{'margin-top': '10px', 'margin-left': '10px'}}>Completează mai jos adresa de email pe care ai folosit-o la înregistrare. </p>
                <form>
                  <input type="text" id="email_recover" placeholder="Adresa de email" style={{'margin-top': '10px', 'margin-left': '10px', 'margin-right': '10px', 'width': 'calc(100% - 40px)'}}/><br/>
                </form> 
                <button onClick={sendPasswordRequest} style={{'right': '10px', 'position': 'absolute', 'margin-top': '10px', 'border-radius': '5px', 'background-color': '#286090'}}><p style={{'color': 'white', 'margin': '5px'}}>Trimite</p></button>
                <div style={{ 'box-shadow': '0px 4px 4px rgba(0, 0, 0, 0.25)', 'width': 'calc(100% - 30px)', 'height': 'auto', 'padding': '5px', 'margin-left': '10px', 'margin-top': '50px'}}>
                  <div style={{'background-color': '#C4C4C4', 'margin-left': '-5px', 'width': 'calc(100%)', 'padding': '5px'}}><p style={{'margin': '0', 'font-size': '15px'}}>Nu pot reseta parola...</p></div>
                  <p style={{'margin-top': '5px'}}>Dacă nu reușești resetarea prin email, ne poți contacta. Solicitarea ta va fi
                                                  <br/>luată In considerare numai dacă:</p>
                  <p style={{'margin-top': '5px', 'margin-left': '20px'}}>• conține datele tale de identificare: nume, prenume, nume utilizator adresa, <br/>&nbsp;
                     de email, pentru a putea fi identificat</p>
                  <p style={{'margin-top': '2px', 'margin-left': '20px'}}>• ai încercat deja să-ți recuperezi parola prin email și nu ai reușit</p>
                  <p style={{'margin-top': '2px', 'margin-left': '20px'}}>• nu te-ai autentificat pe site în ultimele 7 zile.</p>
                  <p style={{'margin-top': '5px', 'font-weight': '900'}}>Solicitările care nu respectă regulile de mai sus vor fi ignorate!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}
export default NewPassword;