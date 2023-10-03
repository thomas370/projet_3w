import React,{useState} from 'react';
import style from './Login.module.scss';
import {Link,useNavigate} from "react-router-dom";
import ButtonReturn from "../../components/Button_return/ButtonReturn";

const Login = () => {
    const [credentials,setCredentials] = useState({username:'',password:''});
    const [error,setError] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setCredentials(prev => ({...prev,[name]:value}));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/login`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(credentials)
            });

            if (!response.headers.get("content-type")?.includes("application/json")) {
                throw new Error("La réponse n'est pas au format JSON: " + await response.text());
            }

            const data = await response.json();

            if (response.status === 200 && data.token) {
                localStorage.setItem('token',data.token);
                const roleResponse = await fetch(`http://localhost:5000/user-role`,{
                    headers:{
                        'authorization':data.token
                    }
                });
                const roleData = await roleResponse.json();
                const userRole = roleData.role;

                if (userRole === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (error) {
            console.error("Erreur lors de la connexion:",error);
            setError("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
        }
    };

    return (
        <div>
            <ButtonReturn/>
            <div className={style.loginContainer}>
                <div className={style.formContainer}>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit} className={style.loginForm}>
                        <div className={style.formGroup}>
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleInputChange}
                                placeholder="Username"
                            />
                        </div>
                        <div className={style.formGroup}>
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                            />
                            <p>Si vous n'avais pas encore de compte <Link to={"/register"}>Créer un compte</Link></p>
                        </div>
                        {
                            error !== "" &&
                            <span className={style.loginAlert}>{error}</span>
                        }
                        <div className={style.btnContainer}>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;