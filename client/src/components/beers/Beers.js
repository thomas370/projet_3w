import React, { useState, useEffect } from 'react';
import style from './Beers.module.scss';

const Beers = () => {
    const [bieres, setBieres] = useState([]);
    useEffect(() => {
      fetch ('http://localhost:5000/beers')
        .then((res) => {
            if (!res.ok) { throw res }
            return res.json()
        })
        .then((res) => {
            setBieres(res);

        }
        )
        .catch((err) => {
            console.log(err);
            setBieres([]);
        });

    }, []);

    return (
        <section className={style.biereGlobal}>
            <h2>Les Bières</h2>
            <div className={style.bieresContainer}>
                {bieres.map(biere => (
                    <div key={biere.id} className={style.biereCard}>
                        <img src={biere.image} alt={biere.name} className={style.biereImage} />
                        <h2>{biere.name}</h2>
                        <p>{biere.description}</p>
                        <div className={style.chiffre}>
                            <p>{biere.price.toFixed(2)}€</p>
                            <p>{parseFloat(biere.taux).toFixed(2)}°</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Beers;