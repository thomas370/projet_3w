import React, {useState} from 'react';
import style from './AddBeers.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
const AddBeers = ({isModalOpen, setIsModalOpen}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [taux, setTaux] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");

    const closeModal = () => {
        setIsModalOpen(false);
    }


    const handleAdd = async (e) => {
        e.preventDefault();

        const beerData = {
            name,
            description,
            price,
            taux,
            image
        };
        try {
            const response = await fetch('http://localhost:5000/beers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(beerData)
            });

            if (response.ok) {
                alert('Bière ajoutée avec succès!');
            } else {
                alert('Erreur lors de l\'ajout de la bière.');
            }
        } catch (error) {
            alert('Erreur: ' + error.message);
        }
    }

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <h4>Ajouter une nouvelle bière</h4>
                <form onSubmit={handleAdd}>
                    <input type="text" placeholder="Nom de la bière" value={name} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder="Description de la bière" value={description} onChange={e => setDescription(e.target.value)} />
                    <input type="number" placeholder="Prix de la bière" value={price} onChange={e => setPrice(e.target.value)} />
                    <input type="number" placeholder="Taux de la bière" value={taux} onChange={e => setTaux(e.target.value)} />
                    <input type="text" placeholder="Image de la bière (URL)" value={image} onChange={e => setImage(e.target.value)} />
                    <button type="submit">Ajouter</button>
                    <div type="button" className={style.closeModal} onClick={closeModal}><FontAwesomeIcon icon={faXmark}/></div>
                </form>
            </div>
        </div>
    );
};

export default AddBeers;