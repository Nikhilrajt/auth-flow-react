import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return <BrowserRouter>
  <Routes>
  <Route path="/register" element={<RegisterPage />}/>
  <Route path="/login" element={<h1>Login Page</h1>}/>
  <Route path="/dashboard" element={<h1>Dashboard Page</h1>} />
  <Route path="/" element={<Navigate to="/login" replace />} />
  </Routes>
  </BrowserRouter>
}

export default App;