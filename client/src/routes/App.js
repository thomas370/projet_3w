import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from "../utils/PrivateRoute";
import Admin from "../pages/admin/Admin";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Profil from "../pages/profil/Profil";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Admin" element={
                    <PrivateRoute requiredRole="admin">
                        <Admin />
                    </PrivateRoute>
                } />
                <Route path="/Profil/:id" element={
                    <PrivateRoute requiredRole="user">
                        <Profil />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;