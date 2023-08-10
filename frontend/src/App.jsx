// import RegisterForm from "./components/RegisterForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
