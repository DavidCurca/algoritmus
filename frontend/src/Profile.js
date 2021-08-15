import React from 'react';
import userImg from './img/user.png';
import closeImg from './img/close.png';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Resizer from "react-image-file-resizer";
import { useRef } from 'react';
global.Buffer = global.Buffer || require('buffer').Buffer;

const Compress = require('compress.js')
const compress = new Compress()

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

function calculatePercentage(a, b){
    if(b == 0){
        return 100.0;
    }else{
        return (((a+b)/a)*100).toFixed(2);
    }
}

function highlightString(str){
    reloadImage();
    if(str == ""){
        return "[no data]";
    }
    str = str.slice(0, -1);
    return str;
}
var solvedArr = "", notsolvedArr = "";
var executed = false;
var pfp = userImg;
var viewerUsername = "";
var profileUsername = "";
var profileToken = "";

function parseUsername(message){
    console.log(message);
    viewerUsername = message;
    if(viewerUsername === profileUsername){
        console.log("this is the users' profile");
        document.getElementById("schimbPfp").style.display = "block";
        document.getElementById("schimbPfp2").style.display = "block";
    }else{
        document.getElementById("schimbPfp").style.display = "none";
        document.getElementById("schimbPfp2").style.display = "none";
    }
}

function getTokenCookie(){
    var ans = document.cookie;
    ans = ans.substr(ans.indexOf('token')+6, ans.indexOf('token')+6+16);
    console.log(ans);
    return ans;
}
const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPG",
      0,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

function reloadImage(){
    const path = './img/profiles/' + profileUsername + ".png";
    try{
        console.log("yes");
        pfp = require("./img/profiles/" + profileUsername + ".png");
        document.getElementById("profilePic").src = pfp.default;
        document.getElementById("profilePic2").src = pfp.default;
        console.log(pfp.default);
    }catch (err){
        console.error(err);
    }
}

function parseImage(responseMessage){

}

function sendProfileChange(baseImage){
    console.log(baseImage);
    // baseImage = baseImage.substr(baseImage.indexOf("data:image/png;base64,")+"data:image/png;base64,".length, baseImage.length);
    /// check again if the user doesnt acess it thur inspect ( that means teh viewrsUsername is equal to the profileUsername )
    /// after that send request to save profile
    if(viewerUsername !== profileUsername){
        alert("error: nu poti schimba poza unui alt utilizator !");
    }else{
        var newbaseImage = "";
        for(let i = 0; i < baseImage.length; i++){
            if(baseImage[i] === '/'){
                newbaseImage += "~";
            }else{
                newbaseImage += baseImage[i];
            }
        }
        baseImage = newbaseImage;
        fetch("/setProfile/image/" + baseImage + "/token/" + profileToken)
            .then((res) => res.json())
            .then((data) => parseImage(data.message));
    }
}

function parseProfile(data, username){
    console.log(data.existance);
    if(data.existance == 0){
        /// user does not exist
        document.getElementById("centerMessage").innerHTML = "Utilizatorul nu exista...";
        document.getElementById("centerMessage2").innerHTML = "Utilizatorul nu exista...";
    }else{

        /// check if backend(/getUsername/token/:tokenId, tokenId being teh one in the cookie)
        /// is the same as the username parameter
        var viewerToken = getTokenCookie();
        fetch("/getUsername/token/" + viewerToken)
            .then((res) => res.json())
            .then((data) => parseUsername(data.message));

        const path = './img/profiles/' + username + ".png";
        try{
            console.log("yes");
            pfp = require("./img/profiles/" + username + ".png");
            document.getElementById("profilePic").src = pfp.default;
            document.getElementById("profilePic2").src = pfp.default;
            console.log(pfp.default);
        }catch (err){
            console.error(err);
        }
        console.log(pfp);
        profileToken = data.token;
        document.getElementById("loading").style.display = "none";
        document.getElementById("loaded").style.display = "block";
        document.getElementById("loading2").style.display = "none";
        document.getElementById("loaded2").style.display = "block";
        var verText = "Fals";
        if(data.verified == true){
            verText = "Adevarat";
        }
        solvedArr = data.solvedArr;
        notsolvedArr = data.notsolvedArr;
        var claseTotal = ['a V-a', 'a VI-a', 'a VII-a', 'a VIII-a', 'a IX-a', 'a X-a', 'a XI-a', 'a XII-a'];
        console.log(data.class);
        document.getElementById("numeProfile").innerHTML = data.fullName;
        document.getElementById("numeProfile2").innerHTML =  data.fullName;

        if(data.fullName == "David Curca"){
            document.getElementById("numeProfile").classList.add('rainbow-text');
            document.getElementById("numeProfile2").classList.add('rainbow-text');
        }else{
            if ( document.getElementById("numeProfile").classList.contains('rainbow-text') )
                document.getElementById("numeProfile").classList.remove('rainbow-text');
            if ( document.getElementById("numeProfile2").classList.contains('rainbow-text') )
                document.getElementById("numeProfile2").classList.remove('rainbow-text');
        }

        document.getElementById("activatProfile").innerHTML = "Activat: " + verText;
        document.getElementById("activatProfile2").innerHTML = "Activat: " + verText;
        document.getElementById("clasaProfile").innerHTML = "Clasa: " + claseTotal[data.class-5];
        document.getElementById("clasaProfile2").innerHTML = "Clasa: " + claseTotal[data.class-5];
        // rezProfile
        document.getElementById("rezProfile").innerHTML = data.solved;
        document.getElementById("rezProfile2").innerHTML = data.solved;
        document.getElementById("incrProfile").innerHTML = data.notsolved;
        document.getElementById("incrProfile2").innerHTML = data.notsolved;
        document.getElementById("rataProfile").innerHTML = calculatePercentage(data.solved, data.notsolved).toString() + "%";
        document.getElementById("rataProfile2").innerHTML = calculatePercentage(data.solved, data.notsolved).toString() + "%";
    }
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
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

function Profile() {
    var stil = 0, prev = -1;
    const inputFile = useRef(null) 
    setInterval(function(){ 
        if(window.innerWidth <= 1000){
            stil = 2;
        }else if(window.innerWidth <= 1300){
            stil = 1;
        }else{
            stil = 0;
        }
        if(prev != stil){
            if(stil == 1){
                document.getElementById("ad1").style.display = "none";
                document.getElementById("ad2").style.display = "none";
                document.getElementById("ad3").style.display = "none";
                document.getElementById("profilebody1").style.marginTop = "0px";
                document.getElementById("profilebody1").style.display = "block";
                document.getElementById("profilebody2").style.display = "none";
            }else if(stil == 2){
                document.getElementById("ad1").style.display = "none";
                document.getElementById("ad2").style.display = "none";
                document.getElementById("ad3").style.display = "none";
                document.getElementById("profilebody1").style.display = "none";
                document.getElementById("profilebody2").style.display = "block";
            }else{
                document.getElementById("ad1").style.display = "block";
                document.getElementById("ad2").style.display = "block";
                document.getElementById("ad3").style.display = "block";
                document.getElementById("profilebody1").style.marginTop = "40px";
                document.getElementById("profilebody1").style.display = "block";
                document.getElementById("profilebody2").style.display = "none";
            }
        }
        prev = stil;
    }, 10);
    
    const { name } = useParams();
    profileUsername = name;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleChangeImage = event => {
        let img = event.target.files[0];
        const files = [...event.target.files]
        compress.compress(files, {
            size: 0.9, // the max size in MB, defaults to 2MB
            quality: 0.3, // the quality of the image, max is 1,
            maxWidth: 300, // the max width of the output image, defaults to 1920px
            maxHeight: 300, // the max height of the output image, defaults to 1920px
            resize: true, // defaults to true, set false if you do not want to resize the image width and height
        }).then((data) => {
            // returns an array of compressed images
            sendProfileChange(data[0].data);
            console.log(data[0].data)
        })
    };

    const handleClickButton = () => {
        inputFile.current.click();
    };

    const handleOpen = () => {
        setOpen(true);
        reloadImage();
    };

    const handleClose = () => {
        setOpen(false);
        reloadImage();
    };
    // if(!executed){
    //     executed = true;
    //     fetch("/getData/username/" + name)
    //         .then((res) => res.json())
    //         .then((data) => parseProfile(data, name));
    // }
    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
            >
                <div className={classes.paper} style={{'position': 'relative'}}>
                    <h2 id="transition-modal-title" style={{'display': 'inline-block', 'margin-bottom': '10px'}}>Activitate utilizator</h2>
                    <img style={{'display': 'inline-block', 'float': 'right', 'width': '24px'}} onClick={handleClose} src={closeImg}/>
                    <div style={{'background-color': '#C4C4C4', 'margin-top': '10px', 'width': '500px', 'height': 'auto', 'padding': '2px'}}>
                        <p style={{'margin-left': '4px', 'margin-top': '2px'}}>Probleme Rezolvate</p>
                        <div style={{'width': '100%', 'margin-top': '2px', 'background-color': '#ddd', 'word-wrap': 'break-word', 'padding-top': '3px'}}>
                            <div style={{'width': '100%', 'margin-left': '5px'}}>
                                <p id="rezolvateField">{highlightString(solvedArr)}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{'background-color': '#C4C4C4', 'margin-top': '10px', 'width': '500px', 'height': 'auto', 'padding': '2px'}}>
                        <p style={{'margin-left': '4px', 'margin-top': '2px'}}>Probleme Incercate</p>
                        <div style={{'width': '100%', 'margin-top': '2px', 'background-color': '#ddd', 'word-wrap': 'break-word', 'padding-top': '3px'}}>
                            <div style={{'width': '100%', 'margin-left': '5px'}}>
                                <p id="incercateField">{highlightString(notsolvedArr)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div class="container">
                <div id="ad1" class="right-ad" style={{'display': 'none', 'width': '130px', 'height': '610px', 'background-color': '#ddd'}}>
                    <div class="container" style={{'width': '100%', 'height': '100%', 'background-color': '#ddd'}}>
                        <div class="vertical-center"  style={{'width': '120px', 'height': '600px', 'background-color': 'grey'}}>
                            <p>ad</p>
                        </div>
                    </div>
                </div>

                <div id="ad2" class="left-ad" style={{'display': 'none', 'width': '130px', 'height': '610px', 'background-color': '#ddd'}}>
                    <div class="container" style={{'width': '100%', 'height': '100%', 'background-color': '#ddd'}}>
                        <div class="vertical-center"  style={{'width': '120px', 'height': '600px', 'background-color': 'grey'}}>
                            <p>ad</p>
                        </div>
                    </div>
                </div>

                <div id="ad3" class="top-ad" style={{'display': 'none', 'width': '738px', 'height': '100px', 'background-color': '#ddd'}}>
                    <div class="container" style={{'width': '100%', 'height': '100%', 'background-color': '#ddd'}}>
                        <div class="vertical-center"  style={{'width': '728px', 'height': '90px', 'background-color': 'grey'}}>
                            <p>ad</p>
                        </div>
                    </div>
                </div>

                <div id="profilebody1" class="vertical-center" style={{'display': 'none', 'width': '798px', 'height': '439px', 'background-color': 'white', 'margin-top': '40px'}}>
                    <div id="loading" style={{'width': '100%', 'height': '100%', 'position': 'relative', 'display': 'none'}}>
                        <div class="vertical-center">
                            <p id="centerMessage">Loading...</p>
                        </div>
                    </div>
                    <div id="loaded" style={{'display': 'block'}}>
                        <div id="section1" style={{'float': 'left', 'width': '400px', 'height': '439px', 'background-color': 'transparent', 'display': 'inline-block'}} >
                            <div class="container" style={{'width': '100%', 'height': '100%'}}>
                                <div class="vertical-center">
                                    <center><img id="profilePic" src={pfp} key={pfp} style={{'width': '340px'}}/></center>
                                    <center> <input onChange={handleChangeImage} ref={inputFile} type="file" accept="image/png, image/jpg" id="imgupload" style={{"display": "none"}}/>  <button id="schimbPfp" onClick={handleClickButton} style={{'width': '340px', 'font-size': '20px', 'margin-top': '10px', 'display': 'none'}}>SCHIMBA POZA DE PROFIL</button></center>
                                </div>
                            </div>
                        </div>
                        <div id="section2" style={{'float': 'left', 'width': 'calc(798px - 400px)', 'height': '439px', 'background-color': 'transparent', 'display': 'inline-block'}}>
                            <div class="container" style={{'width': '100%', 'height': '100%'}}>
                                <div id="normalScreen" style={{'margin-left': '-15px', 'margin-top': '25px'}}>
                                    <div style={{'position': 'relative'}}>
                                        <p>Informatii Generale</p>
                                        <div style={{'background-color': 'black', 'width': '350px', 'height': '3px'}}></div>
                                        <p style={{'margin-top': '15px', 'display': 'inline-block'}}>Nume Utilizator: </p><p id="numeProfile" style={{'display': 'inline-block', 'margin-left': '5px'}}></p>
                                        <p id="activatProfile">Activat: Fals</p>
                                        <p id="clasaProfile">Clasa: a V-a</p>
                                        <p id="clasamentProfile" style={{'display': 'inline-block'}}>Clasament Concurs: N/A - <u style={{'color': 'blue', 'display': 'inline-block'}}>Lista Clasament</u></p>
                                        <div style={{'background-color': '#ddd', 'margin-top': '10px', 'margin-bottom': '10px', 'margin-right': '15px', 'height': '120px'}}>
                                            <div class="container" style={{'width': '33%', 'height': '100%', 'background-color': '#ddd', 'display': 'inline-block'}}>
                                                <div class="vertical-center">
                                                    <center><p id="rezProfile">0</p></center>
                                                    <center><p style={{'font-size': '15px', 'margin-top': '10px'}}>Probleme Rezolvate</p></center>
                                                </div>
                                            </div>
                                            <div class="container" style={{'width': '34%', 'height': '100%', 'background-color': '#ddd', 'display': 'inline-block'}}>
                                                <div class="vertical-center">
                                                    <center><p id="incrProfile">0</p></center>
                                                    <center><p style={{'font-size': '15px', 'margin-top': '10px'}}>Probleme Incercate</p></center>
                                                </div>
                                            </div>
                                            <div class="container" style={{'width': '33%', 'height': '100%', 'background-color': '#ddd', 'display': 'inline-block'}}>
                                                <div class="vertical-center">
                                                    <center><p id="rataProfile">100 %</p></center>
                                                    <center><p style={{'font-size': '15px', 'margin-top': '10px'}}>Rata de Sucess</p></center>
                                                </div>
                                            </div>
                                        </div>
                                        <u style={{'color': 'blue'}} onClick={handleOpen}> {'>>>'} Activitate Utilizator</u>
                                    </div>
                                    <div id="startConcursField" style={{'bottom': '52px', 'position': 'absolute', 'display': 'none'}}>
                                        <p>Concursul OIMC - Editia I</p>
                                        <div style={{'background-color': 'black', 'width': '350px', 'height': '3px'}}></div>
                                        <center><button style={{'width': '340px', 'font-size': '20px', 'margin-top': '10px'}}>INCEPE CONCURSUL</button></center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <center id="profilebody2" style={{'display': 'none'}}><div style={{'width': '439px', 'margin-top': '10px', 'min-height': '637px', 'height': 'auto', 'background-color': 'white'}}>
                    <div id="loading2" style={{'display': 'block', 'width': '439px', 'margin-top': '10px', 'min-height': '637px', 'position': 'relative'}}>
                        <div class="vertical-center">
                            <p id="centerMessage2">Loading...</p>
                        </div>
                    </div>
                    <div id="loaded2" style={{'display': 'none'}}>
                        <div id="section1" style={{ 'width': '439px', 'height': 'auto', 'background-color': 'transparent'}} >
                            <div class="container" style={{'width': '100%', 'height': '100%', 'margin-top': '10px'}}>
                                    <center><img id="profilePic2" src={pfp} style={{'width': '340px', 'margin-top': '10px'}}/></center>
                                    <center><input onChange={handleChangeImage} ref={inputFile} type="file" accept="image/png, image/jpg" id="imgupload" style={{"display": "none"}}/>  <button id="schimbPfp2" onClick={handleClickButton} style={{'width': '340px', 'font-size': '20px', 'margin-top': '10px', 'display': 'none'}}>SCHIMBA POZA DE PROFIL</button></center>
                            </div>
                        </div>
                        <div id="section2" style={{'width': 'auto', 'height': 'auto', 'background-color': 'transparent', 'margin-left': '35px', 'textAlign': 'left'}}>
                            <div class="container" style={{'width': '100%', 'height': '100%'}}>
                                <div id="normalScreen" style={{'margin-left': '-15px', 'margin-top': '10px'}}>
                                    <div>
                                        <p>Informatii Generale</p>
                                        <div style={{'background-color': 'black', 'width': '350px', 'height': '3px'}}></div>
                                        <p style={{'margin-top': '15px', 'display': 'inline-block'}}>Nume Utilizator: </p><p id="numeProfile2" style={{'display': 'inline-block', 'margin-left': '5px'}}></p>
                                        <p id="activatProfile2">Activat: Fals</p>
                                        <p id="clasaProfile2">Clasa: a V-a</p>
                                        <p id="clasamentProfile2" style={{'display': 'inline-block'}}>Clasament Concurs: N/A - <u style={{'color': 'blue', 'display': 'inline-block'}}>Lista Clasament</u></p>
                                        <div style={{'background-color': '#ddd', 'margin-top': '10px', 'margin-bottom': '10px', 'margin-right': '15px', 'height': '120px'}}>
                                            <div class="container" style={{'width': '33%', 'height': '100%', 'background-color': '#ddd', 'display': 'inline-block'}}>
                                                <div class="vertical-center">
                                                    <center id="rezProfile2"><p>0</p></center>
                                                    <center><p style={{'font-size': '15px', 'margin-top': '10px'}}>Probleme Rezolvate</p></center>
                                                </div>
                                            </div>
                                            <div class="container" style={{'width': '34%', 'height': '100%', 'background-color': '#ddd', 'display': 'inline-block'}}>
                                                <div class="vertical-center">
                                                    <center><p id="incrProfile2">0</p></center>
                                                    <center><p style={{'font-size': '15px', 'margin-top': '10px'}}>Probleme Incercate</p></center>
                                                </div>
                                            </div>
                                            <div class="container" style={{'width': '33%', 'height': '100%', 'background-color': '#ddd', 'display': 'inline-block'}}>
                                                <div class="vertical-center">
                                                    <center><p id="rataProfile2">100 %</p></center>
                                                    <center><p style={{'font-size': '15px', 'margin-top': '10px'}}>Rata de Sucess</p></center>
                                                </div>
                                            </div>
                                        </div>
                                        <u style={{'color': 'blue'}} onClick={handleOpen}> {'>>>'} Activitate Utilizator</u>
                                    </div>
                                    <div id="startConcursField2" style={{'display': 'none', 'margin-top': '10px', 'margin-bottom': '10px'}}>
                                        <p>Concursul OIMC - Editia I</p>
                                        <div style={{'background-color': 'black', 'width': '350px', 'height': '3px'}}></div>
                                        <center><button style={{'width': '340px', 'font-size': '20px', 'margin-top': '10px', 'margin-bottom': '10px'}}>INCEPE CONCURSUL</button></center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></center>
            </div>
        </div>
    );
}

export default Profile;