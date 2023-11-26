import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../api/api';
import codelist from './codelist.css';
import { Navigate, useNavigate } from "react-router-dom";

import "../Userprofile/Userprofile.css"
import NavbarMain from "../../components/NavbarMain/NavbarMain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";
    


function getFirstNWords(str, n) {
  var words = str.split(' ');
  var result = words.slice(0, n).join(' ');
  if (words.length > n) {
    result += '...';
  }
  return result;
}


const CodeEntry = ({ codeData, onEntryClick, languageList }) => {
  const getLanguageName = (languageId) => {
    const language = languageList.find((lang) => lang.Id.toString() === languageId.toString());
    return language ? language.Name : '';
  };

  return (


    <div>

      <div
        key={codeData.id}
        className="code-entry"
        onClick={() => onEntryClick(codeData)}
      >
        <div className="header">
          <h3>{getFirstNWords(codeData.code_title, 20)}</h3>
          <div className="language-input">
            <p>
              Language: {getLanguageName(codeData.code_language)}
            </p>
            <p>Input: {codeData.code_input}</p>
          </div>
        </div>
        <div className="data">
          <p>{getFirstNWords(codeData.code, 30)}</p>
          <p>Output: {codeData.code_output}</p>
        </div>
      </div>
    </div>
  );
};


// React component to fetch and display code entries
const CodeList = () => {
  const [codeList, setCodeList] = useState([]);
  const [displayedCode, setDisplayedCode] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  library.add(faCircleUser)
  const [displaySidebar, setDisplaySidebar] = useState(false)
  const [displayMenu, setDisplayMenu] = useState(false)
  const [profile, setProfile] = useState()
  const navigate = useNavigate()

  const languageHandler = (tempLanguageList, element) => {
    for (const j of tempLanguageList) {
      if (j.Id.toString() == element.toString()) {
        return j.Name;
      }
    }
  }


  useEffect(() => {
    // Fetch data from the API endpoint
    api.get("/api/v1/language", {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': '{{ csrf_token }}',
      },
    }).then(response => {
      console.log(response.data)
      if (response.status == 200) {
        setLanguageList(response.data);
      }
    })

    api
      .get('/a/code/list-code')
      .then((response) => {
        if (response.status === 200) {
          let data = response.data

          setCodeList(data);
          setDisplayedCode(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty dependency array means this effect will run once on mount

  const searchHandler = (event) => {
    let searchQuery = event.target.value.toLowerCase();
    let displayedCode = codeList.filter((el) => {
      let searchValue = el.code_title.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });
    setDisplayedCode(displayedCode);
  };

  const handleEntryClick = (codeData) => {
    // Navigate to the Code component with the selected code data
    navigate('/code', { state: { codeData } });
  };

  return (
    <div style={{ height: "100%", width: "calc(100% - 70px)" }}>
      <NavbarMain navbarVisibility={{ displaySidebar, setDisplaySidebar }} menuVisibility={{ displayMenu, setDisplayMenu }} />
      <div style={{ height: "100%" }}>

        <div className="code-entry-container">
          <input
            type="text"
            className="search"
            placeholder="Search by code title"
            onChange={(event) => searchHandler(event)}
          />
          <h2>Code List</h2>
          {displayedCode.map((codeData) => (
            <CodeEntry key={codeData.id} codeData={codeData} onEntryClick={() => handleEntryClick(codeData)} languageList={languageList} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default CodeList;