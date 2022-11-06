import "./App.css";
import { useState } from "react";
import { Fragment } from "react";

function App() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");

  // language="python"


  let handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length === 0) {
      setOutput("Please fill in code");
      setTimeout(() => {
        setOutput("");
      }, 1000);
      return;
    }
    var res
    var languageList
    var langid
    try {
      await fetch("/api/v1/language", {
        method: "GET",
        mode: "no-cors",
      })
        .then((res) => res.json())
        .then((data) => {
          languageList = data;
        });
      console.log(languageList);
    } catch (error) {
      console.log(error);
    }
    console.log(languageList.length);
    for (var i = 0; i < languageList.length; i++) {
      if (languageList[i].Name === language) {
        langid = languageList[i].Id;
        console.log(langid)
      }
    }
    var raw = JSON.stringify({
      langnumber: langid,
      code,
      input,
    })

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', '*');

    res = await fetch("/api/v1/sendcode", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      mode: "cors",
      // mode: "no-cors",
      redirect: 'follow',
    });

    let resJson = await res.json();
    console.log(resJson);
    setOutput(resJson.output);
  }

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    console.log(e.target.value)
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  }


  return (
    <div className="App">
      {/* a headline stating it is python coding enviourment */}
      <h1>Coding Environment</h1>
      <form >

        <select onChange={handleLanguageChange} >

          <option value="python">Python</option>
          <option value="javascript">Javascript</option>
          <option value="java">Java</option>
          <option value="c++">C++</option>
          <option value="go">Go</option>
        </select>
        <br />
        <div className="editor">
          <div className="line-numbers">
            <span></span>
          </div>
          <textarea name="code"
            value={code}
            id="codingArea"
            placeholder="code"
            onChange={handleCodeChange}
            required
            cols="40"
            rows="5"></textarea>
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
          rows="5"></textarea>
        <br />

        <label htmlFor="upload">Send Code</label>

        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
      <center>
        <div className="message">
          {output ? <p>{
            output
              .split(/\n/)
              .map(
                line => <Fragment key={line}>
                  {line}
                  <br />
                </Fragment>
              )
          }
          </p> : null
          }
        </div>
      </center>

    </div>
  );

}

export default App;
