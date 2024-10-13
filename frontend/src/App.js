import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';  
import Register from './pages/Register';  


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />  {/* The login page */}
        <Route path="/register" element={<Register />} />  {/* The register page */}
      </Routes>
    </Router>
  );
}

export default App;
