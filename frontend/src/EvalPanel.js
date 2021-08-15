import { React } from "react";
import Navbar from "./Navbar";
import userImg from "./img/user.png";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";

function EvalPanel(){
    return (
        <div style={{'width': '100%', 'height': '100%', 'min-height': '100%', 'position': 'fixed'}}>
            <Navbar />
            <div style={{'width': '100%', 'height': '100%', 'min-height': '100%'}}>
                <div class="container">
                    <div class="vertical-center">
                        <div style={{'background-color': 'white', 'width': '1200px', 'height': 'auto', 'margin-top': '-45px', 'padding-bottom': '10px'}}>
                            <div style={{'background-color': '#ddd', 'width': '100%', 'height': '30px'}}>
                                <p style={{'text-align': 'left', 'margin-left': '5px', 'padding-top': '5px'}}>Solutii Trimise</p>
                            </div>
                            <p style={{'margin-top': '10px', 'margin-left': '10px', 'display': 'inline-block'}}>Pagina : </p> <p style={{'display': 'inline-block', 'color': '#3F84E5'}}>1</p>
                            <p style={{'display': 'inline-block', 'color': '#3F84E5', 'margin-left': '10px'}}>2</p>
                            <p style={{'display': 'inline-block', 'color': '#3F84E5', 'margin-left': '10px'}}>3</p>
                            <p style={{'display': 'inline-block', 'color': '#3F84E5', 'margin-left': '10px'}}>4</p>
                            <p style={{'display': 'inline-block', 'color': '#3F84E5', 'margin-left': '10px'}}>...</p>
                            <p style={{'display': 'inline-block', 'color': '#3F84E5', 'margin-left': '10px'}}>97</p>
                            <p style={{'display': 'inline-block', 'color': '#3F84E5', 'margin-left': '10px'}}>98</p>
                            <p style={{'display': 'inline-block', 'color': '#3F84E5', 'margin-left': '10px'}}>99</p>
                            <p style={{'display': 'inline-block', 'color': '#3F84E5', 'margin-left': '10px'}}>100</p>
                            <p style={{'display': 'inline-block', 'color': 'black', 'margin-left': '10px'}}>( 1287 de rezultate )</p>

                            <table style={{'text-align': 'left', 'margin-top': '10px', 'margin-left': '10px', 'width': '98%'}}>
                                <tr>
                                    <th>id</th>
                                    <th>utilizator</th>
                                    <th>limbaj de programare</th>
                                    <th>nume problema</th>
                                    <th>data</th>
                                    <th>dimensiune</th>
                                    <th>stare</th>
                                </tr>
                                <tr>
                                    <td style={{'width': '153px'}}>
                                        <div style={{'background-color': 'black', 'padding': '5px', 'width': '140px', 'margin': '0'}}>
                                        <center><p class="code" style={{'color': 'white', 'font-size': '13px'}}>#ABCDEFGHIJKLM123</p></center>
                                        </div>
                                    </td>
                                    <td style={{'max-width': '193px'}}>
                                        <div style={{'height': '25px', 'overflow':'hidden'}}>
                                            <img src={userImg} style={{'width': '25px', 'margin': '0', 'display': 'inline-block'}} />
                                            <p style={{'display': 'inline-block', 'margin-left': '10px', 'bottom': '7px', 'position': 'relative'}}>divad</p>
                                        </div>
                                    </td>
                                    <td style={{'width': '145px', 'text-align': 'center', 'font-size': '16px'}}>C++</td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>Adunare</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>3 dec 06 19:43:13</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>0.12 kb</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>evaluare: <b>in asteptare </b> <FontAwesomeIcon icon={faSpinner} /> </span></td>
                                </tr>
                                <tr>
                                    <td style={{'width': '153px'}}>
                                        <div style={{'background-color': 'black', 'padding': '5px', 'width': '140px', 'margin': '0'}}>
                                        <center><p class="code" style={{'color': 'white', 'font-size': '13px'}}>#ABCDEFGHIJKLM123</p></center>
                                        </div>
                                    </td>
                                    <td style={{'max-width': '193px'}}>
                                        <div style={{'height': '25px', 'overflow':'hidden'}}>
                                            <img src={userImg} style={{'width': '25px', 'margin': '0', 'display': 'inline-block'}} />
                                            <p style={{'display': 'inline-block', 'margin-left': '10px', 'bottom': '7px', 'position': 'relative'}}>divad</p>
                                        </div>
                                    </td>
                                    <td style={{'width': '145px', 'text-align': 'center', 'font-size': '16px'}}>C++</td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>Adunare</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>3 dec 06 19:43:13</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>0.12 kb</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>eroare de compilare <FontAwesomeIcon icon={faExclamationCircle} /></span></td>
                                </tr>
                                <tr>
                                    <td style={{'width': '153px'}}>
                                        <div style={{'background-color': 'black', 'padding': '5px', 'width': '140px', 'margin': '0'}}>
                                        <center><p class="code" style={{'color': 'white', 'font-size': '13px'}}>#ABCDEFGHIJKLM123</p></center>
                                        </div>
                                    </td>
                                    <td style={{'max-width': '193px'}}>
                                        <div style={{'height': '25px', 'overflow':'hidden'}}>
                                            <img src={userImg} style={{'width': '25px', 'margin': '0', 'display': 'inline-block'}} />
                                            <p style={{'display': 'inline-block', 'margin-left': '10px', 'bottom': '7px', 'position': 'relative'}}>divad</p>
                                        </div>
                                    </td>
                                    <td style={{'width': '145px', 'text-align': 'center', 'font-size': '16px'}}>C++</td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>Adunare</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>3 dec 06 19:43:13</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>0.12 kb</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>evaluare: <b>100</b> puncte</span></td>
                                </tr>
                                <tr>
                                    <td style={{'width': '153px'}}>
                                        <div style={{'background-color': 'black', 'padding': '5px', 'width': '140px', 'margin': '0'}}>
                                        <center><p class="code" style={{'color': 'white', 'font-size': '13px'}}>#ABCDEFGHIJKLM123</p></center>
                                        </div>
                                    </td>
                                    <td style={{'max-width': '193px'}}>
                                        <div style={{'height': '25px', 'overflow':'hidden'}}>
                                            <img src={userImg} style={{'width': '25px', 'margin': '0', 'display': 'inline-block'}} />
                                            <p style={{'display': 'inline-block', 'margin-left': '10px', 'bottom': '7px', 'position': 'relative'}}>divad</p>
                                        </div>
                                    </td>
                                    <td style={{'width': '145px', 'text-align': 'center', 'font-size': '16px'}}>C++</td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>Adunare</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>3 dec 06 19:43:13</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>0.12 kb</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>evaluare: <b>100</b> puncte</span></td>
                                </tr>
                                <tr>
                                    <td style={{'width': '153px'}}>
                                        <div style={{'background-color': 'black', 'padding': '5px', 'width': '140px', 'margin': '0'}}>
                                        <center><p class="code" style={{'color': 'white', 'font-size': '13px'}}>#ABCDEFGHIJKLM123</p></center>
                                        </div>
                                    </td>
                                    <td style={{'max-width': '193px'}}>
                                        <div style={{'height': '25px', 'overflow':'hidden'}}>
                                            <img src={userImg} style={{'width': '25px', 'margin': '0', 'display': 'inline-block'}} />
                                            <p style={{'display': 'inline-block', 'margin-left': '10px', 'bottom': '7px', 'position': 'relative'}}>divad</p>
                                        </div>
                                    </td>
                                    <td style={{'width': '145px', 'text-align': 'center', 'font-size': '16px'}}>C++</td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>Adunare</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>3 dec 06 19:43:13</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>0.12 kb</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>evaluare: <b>100</b> puncte</span></td>
                                </tr>
                                <tr>
                                    <td style={{'width': '153px'}}>
                                        <div style={{'background-color': 'black', 'padding': '5px', 'width': '140px', 'margin': '0'}}>
                                        <center><p class="code" style={{'color': 'white', 'font-size': '13px'}}>#ABCDEFGHIJKLM123</p></center>
                                        </div>
                                    </td>
                                    <td style={{'max-width': '193px'}}>
                                        <div style={{'height': '25px', 'overflow':'hidden'}}>
                                            <img src={userImg} style={{'width': '25px', 'margin': '0', 'display': 'inline-block'}} />
                                            <p style={{'display': 'inline-block', 'margin-left': '10px', 'bottom': '7px', 'position': 'relative'}}>divad</p>
                                        </div>
                                    </td>
                                    <td style={{'width': '145px', 'text-align': 'center', 'font-size': '16px'}}>C++</td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>Adunare</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>3 dec 06 19:43:13</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>0.12 kb</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>evaluare: <b>100</b> puncte</span></td>
                                </tr>
                                <tr>
                                    <td style={{'width': '153px'}}>
                                        <div style={{'background-color': 'black', 'padding': '5px', 'width': '140px', 'margin': '0'}}>
                                        <center><p class="code" style={{'color': 'white', 'font-size': '13px'}}>#ABCDEFGHIJKLM123</p></center>
                                        </div>
                                    </td>
                                    <td style={{'max-width': '193px'}}>
                                        <div style={{'height': '25px', 'overflow':'hidden'}}>
                                            <img src={userImg} style={{'width': '25px', 'margin': '0', 'display': 'inline-block'}} />
                                            <p style={{'display': 'inline-block', 'margin-left': '10px', 'bottom': '7px', 'position': 'relative'}}>divad</p>
                                        </div>
                                    </td>
                                    <td style={{'width': '145px', 'text-align': 'center', 'font-size': '16px'}}>C++</td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>Adunare</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>3 dec 06 19:43:13</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>0.12 kb</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>evaluare: <b>100</b> puncte</span></td>
                                </tr>
                                <tr>
                                    <td style={{'width': '153px'}}>
                                        <div style={{'background-color': 'black', 'padding': '5px', 'width': '140px', 'margin': '0'}}>
                                        <center><p class="code" style={{'color': 'white', 'font-size': '13px'}}>#ABCDEFGHIJKLM123</p></center>
                                        </div>
                                    </td>
                                    <td style={{'max-width': '193px'}}>
                                        <div style={{'height': '25px', 'overflow':'hidden'}}>
                                            <img src={userImg} style={{'width': '25px', 'margin': '0', 'display': 'inline-block'}} />
                                            <p style={{'display': 'inline-block', 'margin-left': '10px', 'bottom': '7px', 'position': 'relative'}}>divad</p>
                                        </div>
                                    </td>
                                    <td style={{'width': '145px', 'text-align': 'center', 'font-size': '16px'}}>C++</td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>Adunare</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>3 dec 06 19:43:13</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>0.12 kb</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>evaluare: <b>100</b> puncte</span></td>
                                </tr>
                                <tr>
                                <td style={{'width': '153px'}}>
                                        <div style={{'background-color': 'black', 'padding': '5px', 'width': '140px', 'margin': '0'}}>
                                        <center><p class="code" style={{'color': 'white', 'font-size': '13px'}}>#ABCDEFGHIJKLM123</p></center>
                                        </div>
                                    </td>
                                    <td style={{'max-width': '193px'}}>
                                        <div style={{'height': '25px', 'overflow':'hidden'}}>
                                            <img src={userImg} style={{'width': '25px', 'margin': '0', 'display': 'inline-block'}} />
                                            <p style={{'display': 'inline-block', 'margin-left': '10px', 'bottom': '7px', 'position': 'relative'}}>divad</p>
                                        </div>
                                    </td>
                                    <td style={{'width': '145px', 'text-align': 'center', 'font-size': '16px'}}>C++</td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>Adunare</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>3 dec 06 19:43:13</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>0.12 kb</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>eroare de compilare <FontAwesomeIcon Icon={faExclamationCircle} /> </span></td>
                                </tr>
                                <tr>
                                <td style={{'width': '153px'}}>
                                        <div style={{'background-color': 'black', 'padding': '5px', 'width': '140px', 'margin': '0'}}>
                                        <center><p class="code" style={{'color': 'white', 'font-size': '13px'}}>#ABCDEFGHIJKLM123</p></center>
                                        </div>
                                    </td>
                                    <td style={{'max-width': '193px'}}>
                                        <div style={{'height': '25px', 'overflow':'hidden'}}>
                                            <img src={userImg} style={{'width': '25px', 'margin': '0', 'display': 'inline-block'}} />
                                            <p style={{'display': 'inline-block', 'margin-left': '10px', 'bottom': '7px', 'position': 'relative'}}>divad</p>
                                        </div>
                                    </td>
                                    <td style={{'width': '145px', 'text-align': 'center', 'font-size': '16px'}}>C++</td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>Adunare</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>3 dec 06 19:43:13</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>0.12 kb</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>evaluare: <b>100</b> puncte</span></td>
                                </tr>
                                <tr>
                                    <td style={{'width': '153px'}}>
                                        <div style={{'background-color': 'black', 'padding': '5px', 'width': '140px', 'margin': '0'}}>
                                        <center><p class="code" style={{'color': 'white', 'font-size': '13px'}}>#ABCDEFGHIJKLM123</p></center>
                                        </div>
                                    </td>
                                    <td style={{'max-width': '193px'}}>
                                        <div style={{'height': '25px', 'overflow':'hidden'}}>
                                            <img src={userImg} style={{'width': '25px', 'margin': '0', 'display': 'inline-block'}} />
                                            <p style={{'display': 'inline-block', 'margin-left': '10px', 'bottom': '7px', 'position': 'relative'}}>divad</p>
                                        </div>
                                    </td>
                                    <td style={{'width': '145px', 'text-align': 'center', 'font-size': '16px'}}>C++</td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>Adunare</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>3 dec 06 19:43:13</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>0.12 kb</span></td>
                                    <td style={{'max-width': '165px', 'text-align': 'center', 'padding-top': '11px'}}><span style={{'font-size': '13px'}}>evaluare: <b>100</b> puncte</span></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EvalPanel;