import React from 'react';
import banner from './img/banner.png';
import LoginImg from './img/login.png';
import SignupImg from './img/signup.png';
import userImg from './img/user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

function parseUsername(message){
    user = message;
    loadPfp();
}

var user = ""; // username-ul

function loadStats(){
    fetch("/getUsername/token/" + getTokenCookie())
            .then((res) => res.json())
            .then((data) => parseUsername(data.message));
}

function loadNavbar(){
    if(getTokenCookie() != ""){
        document.getElementById("navbar_user").style.display = "block";
        document.getElementById("navbar_login").style.display = "none";
        loadStats();
    }else{
        document.getElementById("navbar_user").style.display = "none";
        document.getElementById("navbar_login").style.display = "block";
    }
}

function Navbar(){
    setTimeout(loadNavbar, 20);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleNavbarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNavbarClose = () => {
        setAnchorEl(null);
    };

    return (
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
    );
}

export default Navbar;