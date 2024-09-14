import {Routes,Route} from "react-router-dom";
import './App.css';
import ChatPage from "./pages/ChatPage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<ChatPage/>} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </>
  )
}

export default App
