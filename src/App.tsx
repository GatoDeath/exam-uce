import './App.css';
import Login from './components/Login';
import { AuthProvides } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrincipalPage from './components/PrincipalPage'; // Nueva página para después del login
import ToDoList from './components/ToDoList';
import FechApi from './components/FechApi';

function App() {
  return (
    <AuthProvides>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/principal" element={<PrincipalPage />} />
          <Route path="/todo" element={<ToDoList />} />
          <Route path="/fechapi" element={<FechApi />} />
        </Routes>
      </Router>
    </AuthProvides>
  );
}

export default App;
