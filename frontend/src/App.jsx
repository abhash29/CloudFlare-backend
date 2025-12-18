import Component from "./Components/Component";
import Login from "./Components/Login";
import UpdatePage from "./Components/UpdatePage";
import './app.css';
import {Route, Routes} from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/todos" element={<Component />} />
      <Route path="/updatepage" element={<UpdatePage />} />
    </Routes>
  );
}
export default App;