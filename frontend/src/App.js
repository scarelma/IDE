import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './AllRoutes';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
//   window.addEventListener("load", () => {
//     AOS.init({
//         duration: 1000,
//     });
// });
  return (
    <div className="App">
      <div style={{height: '100%'}}>
        <BrowserRouter>
          <AllRoutes/>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
