import { React, Component } from "react";

import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css'
var codeToSubmit = "";

function updateValue(value){
  codeToSubmit = value;
}

class Code extends Component {
  constructor(props) {
    super(props)
    this.state = {
      outputText: '',
    }
  }
  render() {
    return (
      <div>
        <CodeMirror
          value={this.state.outputText}
          options={{
            mode: 'text/x-c++src',
            theme: 'material',
            lineNumbers: true,
          }}
          onChange={(editor, data, value) => {
            updateValue(value);
          }}
        />
      </div>
    )
  }
}

function sendFileRequest(){
  var file = new File([codeToSubmit], "main.cpp", {
      type: "text/plain",
  });
  alert("caca")
  fetch("/submitCode/fdfadfas/problem/adunare",{
    method: 'POST',
    headers : { 
      'Content-Type': 'text/plain',
      'Accept': 'application/json'
     },
     body: file
  })
    .then((res) => res.json())
    .then((data) => alert(data.message));

}

function SendElement(){
    return (
        <div>
            <button onClick={sendFileRequest} style={{'margin-left': '10px', 'margin-top': '10px'}}>trimite request</button><br/>
            <Code/>
        </div>
    )
}

export default SendElement;