import logo from './logo.svg';
import './App.css';
import Login from './Login.tsx';
import { useState } from "react"
import Main from './main/Main.tsx';


function App() {
  const [isLogged, setisLogged] = useState(false);
  return (
    <div className="App">
      {isLogged ? <Main/> : <Login setisLogged = {setisLogged}/>}
     
    </div>
  );
}

export default App;
