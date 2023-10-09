import React, { useState, useEffect } from 'react';
import style from './Editbeer.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Editbeer = ({ isModalEditOpen, setIsModalEditOpen, selectedBeer }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [taux, setTaux] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");

    const closeModalEdit = () => {
        setIsModalEditOpen(false);
    }

    const handleAdd = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('taux', taux);
        formData.append('price', price);
        if (image) {
            formData.append('image', image);
        }

        fetch(`http://localhost:5000/beers/${selectedBeer}`, {
            method: 'PUT',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                closeModalEdit();
                toast.success('Bière modifiée avec succès!');
            })
            .catch(error => console.error('Error updating beer:', error));
    }

    useEffect(() => {
        fetch(`http://localhost:5000/beers/${selectedBeer}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setDescription(data.description);
                setTaux(data.taux);
                setPrice(data.price);
                setImage(data.image);
            })
            .catch(error => console.error('Error fetching beers:', error));
    }, [selectedBeer]);

    return (
            <div className={style.modalOverlay}>
                <div className={style.modalContent}>
                    <h4>modifier une biéres </h4>
                    <form onSubmit={handleAdd}>
                        <label htmlFor="name">Nom de la bière</label>
                        <input type="text" placeholder="Nom de la bière" value={name}
                               onChange={e => setName(e.target.value)}/>
                        <label htmlFor="description">Description de la bière</label>
                        <input type="text" placeholder="Description de la bière" value={description}
                               onChange={e => setDescription(e.target.value)}/>
                        <label htmlFor="price">Prix de la bière</label>
                        <input type="number" placeholder="Prix de la bière" value={price}
                               onChange={e => setPrice(e.target.value)}/>
                        <label htmlFor="taux">Taux de la bière</label>
                        <input type="number" placeholder="Taux de la bière" value={taux}
                               onChange={e => setTaux(e.target.value)}/>
                        <label htmlFor="image">Image de la bière</label>
                        <input type="file" onChange={e => setImage(e.target.files[0])} />
                        <button type="submit">modifier</button>
                        <div className={style.closeModal} onClick={closeModalEdit}><FontAwesomeIcon icon={faXmark}/>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    export default Editbeer;