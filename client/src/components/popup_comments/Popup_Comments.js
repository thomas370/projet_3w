import React,{useState,useContext,useEffect} from 'react';
import style from './Popup_comments.module.scss';
import Rating from "../rating/Rating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import jwtDecode from "jwt-decode";

const Popup_Comments = (props) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [beer_id, setBeer_id] = useState(0);
    const [bieres, setBieres] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/beers')
            .then(response => response.json())
            .then(data => setBieres(data))
            .catch(error => console.error('Error fetching beers:',error));
    },[]);
    const handleCommentSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const user_id = decodedToken.id;

        const commentData = {
            user_id: user_id,
            rating: rating,
            text: comment,
            beer_id: beer_id
        };

        fetch('http://localhost:5000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(commentData)
        })
            .then(response => response.text())
            .then(text => {
                console.log(text);
                return JSON.parse(text);
            })
            .then(data => {
                console.log(data);
                alert('Commentaire ajouté');
                window.location.reload();
            })
            .catch(error => console.error('Error adding comment:', error));
    }

    return (
        <div>
            {props.isModalOpen && (
                <div className={style.modal} onClick={props.closeModal} role="dialog" aria-labelledby="modalTitle">
                    <div className={style.modalContent} onClick={e => e.stopPropagation()}>
                        <h2 id="modalTitle">Ajouter un commentaire</h2>
                        <form onSubmit={handleCommentSubmit}>
                            <textarea
                                placeholder="Votre commentaire..."
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                            ></textarea>
                            <select value={beer_id} onChange={e => setBeer_id(e.target.value)}>
                                <option value="0">Choisir une bière</option>
                                {bieres.map(biere => (
                                    <option key={biere.id} value={biere.id}>{biere.name}</option>
                                ))}
                            </select>
                            <Rating rating={rating} setRating={setRating}/>
                            <div className={style.closeModal} onClick={props.closeModal} aria-label="Fermer la modale"><FontAwesomeIcon icon={faXmark}/></div>
                            <button type="submit">Envoyer</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Popup_Comments;
