import React,{ useEffect ,useState} from 'react';
import style from './Comments.module.scss';
import Rating from "../rating/Rating";
import {Link} from "react-router-dom";
import Popup_Comments from "../popup_comments/Popup_Comments";

const Comments = () => {
    const [loaded, setLoaded] = useState(false);
    const [comments, setComment] = useState([]);
    const token = localStorage.getItem('token');
    const [userRole, setUserRole] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        fetch('http://localhost:5000/comments', {
            headers: {
                'Authorization': token
            }
        })
            .then((res) => {
                if (!res.ok) { throw res }
                return res.json()
            })
            .then((res) => {
                setComment(res);
            })
            .catch((err) => {
                console.log(err);
                setComment([]);
            })
            .finally(() => {
                setLoaded(true);
            });
    }, [token]);

    return (
        <section className={style.commentsContainer}>
            <div className={style.commentaires}>
                <h2>Commentaires</h2>
                <div className={style.commentairesContainer}>
                    {comments.map((comment, index) => (
                        <div key={index} className={style.commentairesCard}>
                            <div className={style.commentairesTexte}>
                                {/*si le user est connecter ont récupére son id et ont le compare avec l'id du commentaire si c'est le même ont affiche le bouton supprimer ou edité sinon ont affiche rien*/}
                                {token && comment.user_id === comment.user_id ? (
                                    <div className={style.commentairesButton}>
                                        <button><Link to={`/edit-comment/${comment.id}`}>Edit</Link></button>
                                        <button><Link to={`/delete-comment/${comment.id}`}>Supprimer</Link></button>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                                <h2>{comment.username}</h2>
                                <p>{comment.comment}</p>
                                <p><span>Biére :</span> {comment.beer_name}</p>
                                <Rating rating={comment.rating} setRating={setRating}/>
                            </div>
                        </div>
                    ))}
                </div>
                {token ? (
                    <div className={style.commentairesButton}>
                        <button onClick={openModal}>Ajouter un commentaire</button>
                    </div>
                ) : (
                    <div className={style.commentairesButton}>
                        <button><Link to="/login">Ajouter un commentaire</Link></button>
                    </div>
                )}
                <Popup_Comments isModalOpen={isModalOpen} closeModal={closeModal}/>
            </div>
        </section>
    );
};

export default Comments;