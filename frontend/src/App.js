import "./App.css";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import Editor from "@monaco-editor/react";
// import { monaco } from '@monaco-editor/react';
import loader from '@monaco-editor/loader';

// Configure the source of the Monaco files
loader.config({
  paths: {
    vs: "/vs",
  },

});

loader.init();

function App() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [languageList, setLanguageList] = useState([]);


  const options = {
    autoIndent: 'full',
    contextmenu: true,
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: 'always',
    minimap: {
      enabled: true,
    },
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
  };

  useEffect(() => {
    fetch("http://localhost/api/v1/language", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setLanguageList(data);
      });
  }, []);


  let handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length === 0) {
      setOutput("Please fill in code");
      setTimeout(() => {
        setOutput("");
      }, 1000);
      return;
    }
    let langid;
    languageList.forEach(obj => {
      if (obj.Name === language) {
        langid = obj.Id;
        console.log(langid);
      }
    });
    console.log(langid);
    var raw = JSON.stringify({
      langnumber: langid,
      code,
      input,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var res = await fetch("http://localhost/api/v1/sendcode", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      mode: "cors",
      redirect: "follow",
    });

    let resJson = await res.json();
    console.log(resJson);
    setOutput(resJson.output);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleCodeChange = (value, event) => {
    setCode(value);
  };

  const handleInputChange = (value, event) => {
    setInput(value);
  };

  return (
    <div className="App">
      <h1>Coding Environment</h1>
      <form>
        <select onChange={handleLanguageChange}>
          <option value="python">Python</option>
          <option value="javascript">Javascript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="go">Go</option>
        </select>
        <br />
        <div className="editor"  >
          <center >
            <div style={{ border: '1px solid red', height: "500px", width: "950px" }}>

              <Editor
                name="code"
                id="codingArea"
                value={code}
                onChange={handleCodeChange}
                required
                height="500px"
                // theme="vs-dark"
                width="950px"
                defaultLanguage="python"
                language={language}
                // defaultValue="// you can write code here //"
                options={options}
              />
            </div>
          </center>
        </div>

        <br />
        <textarea
          name="input"
          id="inputArea"
          value={input}
          placeholder="input"
          onChange={handleInputChange}
          required
          cols="40"
          rows="5"
        ></textarea>
        <br />

        <label htmlFor="upload">Send Code</label>

        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
      <center>
        <div className="message">
          {output ? (
            <p>
              {output.split(/\n/).map((line) => (
                <Fragment key={line}>
                  {line}
                  <br />
                </Fragment>
              ))}
            </p>
          ) : null}
        </div>
      </center>
    </div>
  );
}

export default App;
