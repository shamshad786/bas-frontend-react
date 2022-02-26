import './App.css';
import Form from './components/Form';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Register from './components/Register';


function App() {
  return (

    <BrowserRouter>

    <Routes>
      <Route path='/' element={ <Register/>} />
      <Route path='/form' element={ <Form/>} />

    </Routes>
    </BrowserRouter>

  );
}

export default App;
