const encryption = require("./encryption");
const express = require("express");
const mysql = require("mysql");
const fs = require("fs");
var nodemailer = require('nodemailer');
var busboy = require('connect-busboy');
var fileupload = require("express-fileupload");
var multiparty = require('multiparty');
var bodyParser = require("body-parser");

const PORT = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.text());
const blueColor = "\033[1;34m";
const yellowColor = "\033[1;33m";
const resetColor = "\033[0m";
const redColor = "\033[1;31m";
const greyColor = "\033[1;30m";

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

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'platforma.oimc@gmail.com',
    pass: 'Parol3.noi'
  }
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Parol3.noi"
});

function msg_log(str){
  var date = new Date;
  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hour = date.getHours();
  var month = date.getMonth()+1;
  var year = date.getFullYear();
  var day = date.getDate();
  var temp = blueColor + "[" + greyColor + ('0' + hour).slice(-2) + ":" + ('0' + minutes).slice(-2) + ":" + ('0' + seconds).slice(-2) + " - " + ('0' + day).slice(-2) + "." + ('0' + month).slice(-2) + "." + ('0' + year).slice(-2) + blueColor + "] " + blueColor + "[" + yellowColor + " INFO " + blueColor + "]" + resetColor;
  console.log(temp + " " + str);
}

function err_log(str){
  var temp = blueColor + "[" + redColor + "ERROR!" + blueColor + "]" + resetColor;
  console.log(temp + " " + str);
}

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

function sendRestorationEmail(user_email, res){
  con.query("USE oimc;", function (err, result){
    if (err) err_log(err);
  });

  var ans = 0; var username = "";
  var sqlCommand = "SELECT EXISTS(SELECT * from users WHERE email = '" + user_email + "')";
  con.query(sqlCommand, function (err, result) {
    if(err) err_log(err);
    else{
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      var sqlObj = "EXISTS(SELECT * from users WHERE email = '" + user_email + "')";
      ans = json[0][sqlObj];
      if(ans == 1){
        /// aflu username-ul, apoi trimit email si creez sesiunea
        con.query("SELECT username FROM users WHERE email = '" + user_email + "'", function (err, result) {
          if (err) err_log(err);
          else{
            var string = JSON.stringify(result);
            var json = JSON.parse(string);
            username = json[0]["username"];

            /// TODO: creaza sessiune
            /// INSERT INTO sessions (id, username) VALUES (generateToken(), username)  
            var sessionId = generateToken();
            var str = 'INSERT INTO sessions (id, username) VALUES("' + sessionId + '", "' + username + '");';
            con.query(str, function(err, result) {
              if (err) err_log(err);
              else{
                msg_log("Created session successfully");
                var mailOptions = {
                  from: 'platforma.oimc@gmail.com',
                  to: user_email,
                  subject: 'Recuperare Parola - Platforma OIMC',
                  html: `
                  <html>
                    <head>
                        <link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
                        <style type="text/css">
                        body,button,p,h2,input{
                            font-family: "Roboto Mono", monospace; 
                        } 
                        p,h2{ 
                            margin: 0; font-weight: 1; 
                        } 
                        #roman{ 
                            font-family: "Times New Roman", serif 
                        }
                        </style>
                    </head>
                    <body>
                        <div id="navbar" style="background-color: #ddd; width: 100%; height: auto;">
                        <center style="font-size: 55px;" id="roman">
                            <p style="display: inline-block; color: #3F84E5">OIM</p style="display: inline-block;">C<p></p>
                        </center>
                        </div>
                        <h2 style="margin-top: 5px;">Resetarea Parolei</h2>
                        <p style="margin-top: 10px;">Salut <b style="font-weight: 700;"> ` + username + ` </b>!</p>
                        <p>Am primit o cerere de a reseta parola</p>
                        <p>Pentru a va schimba parola apasati pe butonul urmator</p>
                        <center style="margin-top: 20px;">
                        <form action="http://localhost:3000/session/` + sessionId + `">
                            <input style="font-size: 20px; padding-top: 10px; padding-bottom: 10px; left: 10px; position: absolute; margin-top: -10px;" type="submit" value="SCHIMBA PAROLA" />
                        </form>
                        </center>
                    </body>
                  </html>`,
                };
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    err_log(error);
                  } else {
                    msg_log('Email sent: ' + info.response);
                  }
                });
              }
            });
          }
        });
        res.json({'message': 'OK.'})
      }else{
        msg_log("Email invalid: " + user_email);
        res.json({'message': '401'})
      }
   }
  });
}

function send_email(user_email, username, token){
  var mailOptions = {
    from: 'platforma.oimc@gmail.com',
    to: user_email,
    subject: 'Bun venit pe platforma OIMC',
    html: `
    <html>
      <head>
        <link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
        <style type="text/css">
          body,button,p,h2,input{
            font-family: "Roboto Mono", monospace; 
          } 
          p,h2{ 
            margin: 0; font-weight: 1; 
          } 
          #roman{ 
            font-family: "Times New Roman", serif 
          }
        </style>
      </head>
      <body>
        <div id="navbar" style="background-color: #ddd; width: 100%; height: auto;">
          <center style="font-size: 55px;" id="roman">
            <p style="display: inline-block; color: #3F84E5">OIM</p style="display: inline-block;">C<p></p>
          </center>
        </div>
        <h2 style="margin-top: 5px;">Bun venit pe platforma OIMC,</h2>
        <p style="margin-top: 10px;">Multumim pentru crearea contului <b style="font-weight: 700;">` + username + `</b></p>
        <p>Pentru a finaliza procesul trebuie sa va activati contul</p>
        <center style="margin-top: 20px;">
          <form action="http://localhost:3000/verify/` + token + `">
            <input style="font-size: 20px; padding-top: 10px; padding-bottom: 10px;" type="submit" value="ACTIVEAZA CONTUL" />
          </form>
        </center>
      </body>
    </html>`,
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      err_log(error);
    } else {
      msg_log('Email sent: ' + info.response);
    }
  });
}

function verifyAccount(tokenId, res){
  if(tokenId.length <= 15){
    return;
  }

  con.query("USE oimc;", function (err, result){
    if (err) err_log(err);
  });

  var ans = 0;
  var sqlCommand = "SELECT EXISTS(SELECT * from users WHERE tokenId = '" + tokenId + "')";
  con.query(sqlCommand, function (err, result) {
    if(err) err_log(err);
    else{
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      var sqlObj = "EXISTS(SELECT * from users WHERE tokenId = '" + tokenId + "')";
      ans = json[0][sqlObj];
      if(ans == 1){
        /// pot schimba baza de date
        con.query("UPDATE users SET verified = 1 WHERE tokenId = '" + tokenId + "'", function (err, result){
          if (err) err_log(err);
          else{
            msg_log("Verfied token: " + tokenId);
            res.json({'message': 'OK.'})
          }
        });
      }else{
        msg_log("Verfied not token: " + tokenId);
        res.json({'message': 'NO.'})
      }
   }
  });
}

function add_to_database(token, username, email, fullname, password, clasa){
  var str = 'INSERT INTO users (tokenId, username, fullName, email, password, verified, class, solvedArr, notsolvedArr) VALUES("' + token + '", "' + username + '", "' + fullname + '", "' + email + '", "' + password + '", 0, ' + clasa + ', "", "");';
  con.query(str, function(err, result) {
    if (err) err_log(err);
    else{
      msg_log("Added user " + username + " successfully");
    }
  });
}

function checkExistance(email, username, res){
  msg_log("Got request to check existance of user (" + email + ", " + username + ")");
  con.query("USE oimc;", function (err, result) {
    if (err) err_log(err);
  });
  con.query("SELECT EXISTS(SELECT * from users WHERE email = '" + email + "')", function (err, result) {
    if(err) err_log(err);
    else{
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      var sqlObj = "EXISTS(SELECT * from users WHERE email = '" + email + "')";
      let ansEmail = json[0][sqlObj];
      if(ansEmail == 1){
        msg_log("Found email in database");
        /// verific si username-ul
        con.query("SELECT EXISTS(SELECT * from users WHERE username = '" + username + "')", function (err, result) {
          if(err) err_log(err);
          else{
            var string = JSON.stringify(result);
            var json = JSON.parse(string);
            var sqlObj = "EXISTS(SELECT * from users WHERE username = '" + username + "')";
            let ansUser = json[0][sqlObj];
            if(ansUser == 1){
              /// am gasit contul => verific parola
              msg_log("Found username in database");
              con.query("USE oimc;", function (err, result) {
                if (err) err_log(err);
              });
              con.query("SELECT tokenId FROM users WHERE username='" + username + "'", function (err, result) {
                if(err) err_log(err);
                else{
                  var string = JSON.stringify(result);
                  var json = JSON.parse(string);
                  res.json({'message': json[0]["tokenId"]})
                }
              });
            }else{
              msg_log("Could not find " + username + " in databse");
              res.json({'message': 'NO.'})
            }
         }
        });
      }else{
        msg_log("Could not find " + email + " in databse");
        res.json({'message': 'NO.'})
      }
   }
  });
}

function checkLogin(token, password, res){
  con.query("USE oimc;", function (err, result) {
    if (err) err_log(err);
  });
  con.query("SELECT password FROM users WHERE tokenId = '" + token + "'", function (err, result) {
    if (err) err_log(err);
    else{
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      if(json[0]["password"] === password){
        res.json({'message': 'OK.'});
      }else{
        res.json({'message': 'NO.'});
      }
    }
  });
}

function create_user(token, username, email, fullname, password, clasa, res){
  /// USE oimc; show tables; insert into users;
  con.query("USE oimc;", function (err, result) {
    if (err) err_log(err);
  });
  /// check if the username and/or email was used for another user
  var final = "";
  con.query("SELECT * FROM users;", function (err, result) {
    if(err) err_log(err);
    else{
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      var ok = 1;
      for(var every of json){
        if(every.email == email){
          ok = 0; break;
        }
        if(every.username == username){
          ok = -1; break;
        }
      }
      if(ok){
        add_to_database(token, username, email, fullname, password, clasa);
        send_email(email, username, token);
        final = "OK.";
        res.json({ message: final });
      }else if(ok == 0){
        msg_log("Could not create user " + username + ". Reason: email already used");
        final = "email already used";
        res.json({ message: final });
      }else if(ok == -1){
        msg_log("Could not create user " + username + ". Reason: username already used");
        final = "username already used";
        res.json({ message: final });
      }
   }
  });
}

function getSessionValidation(sessionId, res){
  con.query("USE oimc;", function (err, result) {
    if (err) err_log(err);
  });
  /// check if the username and/or email was used for another user
  con.query("SELECT EXISTS(SELECT * from sessions WHERE id = '" + sessionId + "')", function (err, result) {
    if(err) err_log(err);
    else{
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      var sqlObj = "EXISTS(SELECT * from sessions WHERE id = '" + sessionId + "')";
      let ans = json[0][sqlObj];
      if(ans == 1){
        res.json({'message': 'OK.'});
      }else{
        res.json({'message': '401'});
      }
   }
  });
}

function setNewPassword(id, pass, res){
  con.query("USE oimc;", function (err, result) {
    if (err) err_log(err);
  });
  var usernameFromSession = "";
  console.log("SELECT username FROM sessions WHERE id = '" + id + "'");
  con.query("SELECT username FROM sessions WHERE id = '" + id + "'", function (err, result) {
    if (err) err_log(err);
    else{
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      var usernameFromSession = json[0]["username"];
      con.query("UPDATE users SET password = '" + pass + "' WHERE username ='" + usernameFromSession + "'", function (err, result) {
        if (err) err_log(err);
        else{
          console.log(result);
          msg_log("Updated password successfully");
          /// delete password
          con.query("DELETE FROM sessions WHERE id = '" + id + "'", function (err, result) {
            if (err) err_log(err);
            else{
              msg_log("Deleted session successfully");
              res.json({'message': 'OK.'});
              /// delete password
            }
          });
        }
      });
    }
  });
}

function changeProfilePicture(image, token, res){
  con.query("USE oimc;", function (err, result) {
    if (err) err_log(err);
  });
  var newImage = "";
  for(let i = 0; i < image.length; i++){
    if(image[i] == '~'){
      newImage += "/";
    }else{
      newImage += image[i];
    }
  }
  image = newImage;
  /// change base64 image to binary file and then store it in ../frontend/src/img/profiles/{username}.png using fs
  con.query("SELECT username FROM users WHERE tokenId = '" + token + "'", function (err, result) {
    if (err) err_log(err);
    else{
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      var username = json[0]["username"];
      console.log(image);
      var buf = Buffer.from(image, 'base64');
      fs.writeFile('../frontend/src/img/profiles/' + username + '.png', buf, function (err) {
        if (err) return err_log('Error When changing profile picture : ' + err);
        msg_log('Changed profile picture sucessfully');
      });  
    }
  });
}

function loadProfile(username, res){
  con.query("USE oimc;", function (err, result) {
    if (err) err_log(err);
  });
  con.query("SELECT EXISTS(SELECT * from users WHERE username = '" + username + "');", function (err, result) {
    if (err) err_log(err);
    else{
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      var sqlObj = "EXISTS(SELECT * from users WHERE username = '" + username + "')";
      let ansExist = json[0][sqlObj];
      if(ansExist == 1){

        con.query("SELECT * FROM users WHERE username = '" + username + "'", function (err, result) {
          if (err) err_log(err);
          else{
            var string = JSON.stringify(result);
            var json = JSON.parse(string);
            var ver = false;
            if(json[0]["verified"] == 1){
              ver = true;
            }else{
              ver = false;
            }
            res.json({'existance': true,
                      'verified': ver,
                      'token': json[0]["tokenID"],
                      'fullName': json[0]["fullName"],
                      'class': json[0]["class"],
                      'rating': json[0]["rating"],
                      'solved': json[0]["solvedNum"],
                      'notsolved': json[0]["notsolvedNum"],
                      'solvedArr': json[0]["solvedArr"],
                      'notsolvedArr': json[0]["notsolvedArr"]});
          }
        });

      }else{
        res.json({'existance': false});
      }
    }
  });
}

function getUsername(tokenId, res){
  con.query("USE oimc;", function (err, result) {
    if (err) err_log(err);
  });
  con.query("SELECT username FROM users WHERE tokenId = '" + tokenId + "'", function (err, result) {
    if (err) err_log(err);
    else{
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      res.json({'message': json[0]["username"]});
    }
  });
}

con.connect(function(err) {
  if (err) throw err;
  msg_log("Connected to mysql database");
});

app.get("/api", function (req, res){
  msg_log("api check :>");
  res.json({'message': '400'});
});

app.post("/submitCode/:evalId/problema/:probName", function (req, res){
  var id_req = req.params["evalId"];
  msg_log("Eval request: " + id_req);
  /// save req.body in eval/~evalId
});

app.get("/updateStare/:evalId", function (req, res) {
  // e.g http://localhost:8000/getData/username/divad
  var id_req = req.params["evalId"];

});


app.get("/changePassword/session/:sessionId/password/:pass", function (req, res) {
  // e.g http://localhost:8000/getData/username/divad
  var id_req = req.params["sessionId"];
  var pass_req = req.params["pass"];
  msg_log("Got request to update password of(session id): " + id_req);
  setNewPassword(id_req, pass_req, res);
});


app.get("/getSessionValidation/id/:sessionId", function (req, res) {
  // e.g http://localhost:8000/getData/username/divad
  var id_req = req.params["sessionId"];
  msg_log("Got request to check validation of session: " + id_req);
  getSessionValidation(id_req, res);
});

app.get("/sendNewPass/email/:emailAdrs", function (req, res) {
  // e.g http://localhost:8000/getData/username/divad
  var email_req = req.params["emailAdrs"];
  msg_log("Got request to send password resoration email: " + email_req);
  sendRestorationEmail(email_req, res);
});

app.get("/setProfile/image/:image/token/:token", function (req, res) {
  // e.g http://localhost:8000/getData/username/divad
  var image_req = req.params["image"];
  var token_req = req.params["token"];
  msg_log("Got request to change profile picture of id: " + token_req);
  changeProfilePicture(image_req, token_req, res);
});

app.get("/getUsername/token/:tokenId", function (req, res) {
  // e.g http://localhost:8000/getData/username/divad
  var token_req = req.params["tokenId"];
  msg_log("Got request to get username of: " + token_req);
  getUsername(token_req, res);
});

app.get("/getData/username/:username", function (req, res) {
  // e.g http://localhost:8000/getData/username/divad
  var user_req = req.params["username"];
  msg_log("Got request to load porfile " + user_req);
  loadProfile(user_req, res);
});


app.get("/login/token/:tokenId/pass/:password", function (req, res) {
  // e.g http://localhost:8000/check/email/curcadavid2@gmail.com/user/divad
  var token_req = req.params["tokenId"];
  var pass_req = req.params["password"];
  checkLogin(token_req, pass_req, res);
});

app.get("/check/email/:emailAdrs/user/:username", function (req, res) {
  // e.g http://localhost:8000/check/email/curcadavid2@gmail.com/user/divad
  var email_req = req.params["emailAdrs"];
  var user_req = req.params["username"];
  checkExistance(email_req, user_req, res);
});

app.get("/email/:emailAdrs/user/:username/real/:realName/password/:pass/token/:tokenId/clasa/:class", function (req, res) {
  // e.g http://localhost:8000/email/curcadavid2@gmail.com/user/divad/password/parola/token/MYEVQNU72PQP6GB0
  var token_req = req.params["tokenId"];
  var email_req = req.params["emailAdrs"];
  var user_req = req.params["username"];
  var pass_req = req.params["pass"];
  var clasa_req = req.params["class"];
  var real_req = req.params["realName"];
  msg_log("Got request to create user " + user_req + "(" + email_req + ")");
  var x = create_user(token_req, user_req, email_req, real_req, pass_req, clasa_req, res);
});

app.get("/verify/:tokenId", function (req, res){
  verifyAccount(req.params["tokenId"], res);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  msg_log(`Server listening on ` + PORT);
});
