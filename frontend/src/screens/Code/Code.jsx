import "../Code/Code.css";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import Editor from "@monaco-editor/react";
import loader from '@monaco-editor/loader';
import api from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import "../Userprofile/Userprofile.css"
import NavbarMain from "../../components/NavbarMain/NavbarMain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar";


loader.config({
    paths: {
        vs: "/vs",
    },

});

loader.init();

function Code() {
    const [code_title, setCodeTitle] = useState("");
    const [code, setCode] = useState("");
    const [input, setInput] = useState("");
    const [language, setLanguage] = useState("python");
    const [output, setOutput] = useState("");
    const [languageList, setLanguageList] = useState([]);
    const [loggedin, setLoggedin] = useState(false);
    const [langid, setLangId] = useState(1);
    library.add(faCircleUser)
    const [displaySidebar, setDisplaySidebar] = useState(false)
    const [displayMenu, setDisplayMenu] = useState(false)
    const [profile, setProfile] = useState()
    const [mobileNav, setMobileNav] = useState(false)

    const location = useLocation();


    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("name") !== null) {
            setLoggedin(true);
        } else {
            setLoggedin(false);
        }

        const codeData = location.state && location.state.codeData;
        if (codeData) {
            setCodeTitle(codeData.code_title);
            setCode(codeData.code);
            setInput(codeData.code_input);
            setLanguage(codeData.code_language);
            setOutput(codeData.code_output);
        }
    }, []);

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
        api.get("/api/v1/language", {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': '{{ csrf_token }}',
            },
        }).then(response => {
            if (response.status == 200) {
                setLanguageList(response.data);
            }
        })
    }, []);

    useEffect(() => {
        languageList.forEach(obj => {
            if (obj.Name === language) {
                setLangId(obj.Id);
            }
        });
    }, [language, languageList]);


    let handleSubmit = async (e) => {
        e.preventDefault();
        if (code.length === 0) {
            setOutput("Please fill in code");
            setTimeout(() => {
                setOutput("");
            }, 1000);
            return;
        }
        console.log(languageList);
        console.log(language);
        
        
        if (loggedin && code_title.length === 0) {
            setOutput("Please fill in code title");
            setTimeout(() => {
                setOutput("");
            }, 1000);
            return;
        }
        if (loggedin) {
            api.post('/a/code/code', {
                "code_title": code_title,
                "code_language": langid,
                "code": code,
                "code_input": input,
                "code_output": output
            }
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': '{{ csrf_token }}',
                    },
                }
            ).then(response => {
                if (response.status == 200) {
                    let data = response.data;
                    setOutput(data.code_output);
                }
            }).catch(error => {
                console.log(error)
            })

        } else {
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
            setOutput(resJson.output);
        }
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

    const handleCodeTitleChange = (value, event) => {
        setCodeTitle(value);
    };
    if (loggedin) {
        return (
            <div style={{ height: "100%", width: "calc(100% - 70px)" }}>
                <NavbarMain navbarVisibility={{ displaySidebar, setDisplaySidebar }} menuVisibility={{ displayMenu, setDisplayMenu }} />
                <div style={{ height: "100%" }}>
                    <div className="AppofCode">
                        <form>
                            <input type="text" onChange={handleCodeTitleChange} placeholder="Give Title to your code" value={code_title} />
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
                                    <div style={{ border: '2px solid black', height: "500px", width: "950px", marginRight: "10px" }}>

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

                            {/* <label htmlFor="upload">Send Code</label> */}

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
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Navbar menuData={{ mobileNav, setMobileNav }} />
                <div className="AppofCode">

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
                                <div style={{ border: '2px solid black', height: "500px", width: "950px", marginRight: "10px" }}>

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
            </div>
        )

    }
}

export default Code