import React,{useState,useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars,faTimes} from '@fortawesome/free-solid-svg-icons';
import style from './NavBarre.module.scss';
import {Link} from "react-router-dom";
import {logout} from '../../utils/UtilJWT';


const NavBarre = () => {
    const [isOpen,setIsOpen] = useState(false);
    const token = localStorage.getItem('token');
    const [userRole,setUserRole] = useState(null);
    const [loaded,setLoaded] = useState(false);
    const [userId,setUserId] = useState(null);

    useEffect(() => {
        if (!token) return;
        fetch('http://localhost:5000/user-role',{
            headers:{
                'authorization':token
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw res
                }
                return res.text();
            })
            .then((text) => {
                if (text) {
                    const data = JSON.parse(text);
                    setUserRole(data.role);
                }
            })
            .catch((err) => {
                console.log("Erreur lors de la récupération du rôle de l'utilisateur:",err);
                setUserRole(null);
            })
            .finally(() => {
                setLoaded(true);
            });
    },[token]);

    return (
        <header>
            <nav className={style.wrapper}>
                <div className={style.logo}>
                    <Link to="/">Bike-beer's</Link>
                </div>
                <FontAwesomeIcon
                    icon={isOpen ? faTimes : faBars}
                    className={style.menuToggle}
                    onClick={() => setIsOpen(!isOpen)}
                />
                <ul className={`${style.navLinks} ${isOpen ? style.open : ''}`}>
                    <li><Link to="/">Accueil</Link></li>
                    {userRole === 'user' && <li><Link to={`/profil/${userId}`}>Profil</Link></li>}
                    {userRole === 'admin' && <li><Link to="/admin">Admin</Link></li>}
                    {token ? (
                        <li><Link to="/" onClick={logout}>Déconnection</Link></li>
                    ) : (
                        <li><Link to="/login">Connection</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default NavBarre;