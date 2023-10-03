import React, { useEffect, useState, useRef } from 'react';
import style from './Admin.module.scss';
import ButtonReturn from "../../components/Button_return/ButtonReturn";
import AddBeers from "../../components/addBeer/AddBeers";

const Admin = () => {
    const [bieres, setBieres] = useState([]);
    const [selectedBeer, setSelectedBeer] = useState(null);
    const beerSelectRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }

    useEffect(() => {
        fetch('http://localhost:5000/beers')
            .then(response => response.json())
            .then(data => setBieres(data))
            .catch(error => console.error('Error fetching beers:', error));
    }, []);

    const handleDelete = (e) => {
        e.preventDefault();
        const id = beerSelectRef.current.value;
        fetch(`http://localhost:5000/beers/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setBieres(prev => prev.filter(biere => biere.id !== id));
            })
            .then(() => {
                alert('Bière supprimée');
                window.location.reload();
            })
            .catch(error => console.error('Error deleting beer:', error));
    }

    const handleBeerChange = (e) => {
        const beerId = e.target.value;
        const beer = bieres.find(b => b.id === beerId);
        setSelectedBeer(beer);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const id = selectedBeer.id;
        const beerData = {
            name: selectedBeer.name,
            description: selectedBeer.description,
            price: selectedBeer.price,
            alcoholContent: selectedBeer.alcoholContent,
            image: selectedBeer.image
        };
        fetch(`http://localhost:5000/beers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(beerData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setBieres(prev => prev.map(biere => biere.id === id ? { ...biere, ...beerData } : biere));
            })
            .then(() => {
                alert('Bière modifiée');
                window.location.reload();
            }
            )
            .catch(error => console.error('Error updating beer:', error));
    }


    return (
        <div>
            <ButtonReturn />
            <div className={style.Admin}>
                <h1>Admin</h1>
                <div className={style.containerAdmin}>
                    <div className={style.gestionBeerDelete}>
                        <h2>Gestion des bières</h2>
                        <div className={style.gestionContainer}>
                            <div className={style.gestionBeerDeleteContainerBeer}>
                                <h3>Supprimer une bière</h3>
                                <form>
                                    <select ref={beerSelectRef}>
                                        <option value="0">Choisir une bière</option>
                                        {bieres.map(biere => (
                                            <option key={biere.id} value={biere.id}>{biere.name}</option>
                                        ))}
                                    </select>
                                    <button onClick={handleDelete}>Supprimer</button>
                                </form>
                            </div>

                            <div className={style.addBeerContainer}>
                                <h3>Ajouter une bière</h3>
                                <button onClick={openModal}>Ajouter une bières</button>
                            </div>

                            <div className={style.gestionBeerUpdateContainer}>
                                <h3>Modifier une bière</h3>
                                <form onSubmit={handleUpdate}>
                                    <select onChange={handleBeerChange}>
                                        <option value="0">Choisir une bière</option>
                                        {bieres.map(biere => (
                                            <option key={biere.id} value={biere.id}>{biere.name}</option>
                                        ))}
                                    </select>
                                    <input type="text" placeholder="Nom de la bière" value={selectedBeer?.name || ''} onChange={e => setSelectedBeer(prev => ({ ...prev, name: e.target.value }))} />
                                    <input type="text" placeholder="Description de la bière" value={selectedBeer?.description || ''} onChange={e => setSelectedBeer(prev => ({ ...prev, description: e.target.value }))} />
                                    <input type="text" placeholder="Prix de la bière" value={selectedBeer?.price || ''} onChange={e => setSelectedBeer(prev => ({ ...prev, price: e.target.value }))} />
                                    <input type="text" placeholder="Taux de la bière" value={selectedBeer?.alcoholContent || ''} onChange={e => setSelectedBeer(prev => ({ ...prev, alcoholContent: e.target.value }))} />
                                    <input type="text" placeholder="Image de la bière" value={selectedBeer?.image || ''} onChange={e => setSelectedBeer(prev => ({ ...prev, image: e.target.value }))} />
                                    <button type="submit">Modifier</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <AddBeers isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
        </div>
    );
};

export default Admin;