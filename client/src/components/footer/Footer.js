import React from 'react';
import style from './Footer.module.scss';
const Footer = () => {

    let date = new Date();
    const year = date.getFullYear();

    return (
        <footer id='contacter'>
            <div className={style.footerContainer}>
                <h1>Bike-Beer</h1>
                <div className={style.footerHoraire}>
                    <h3>Horaires</h3>
                    <p>Lundi-Vendredi : 9h-18h</p>
                    <p>Samedi : 9h-12h</p>
                </div>
                <div className={style.footerContact}>
                    <h2>Contact</h2>
                    <p>Adresse : 1 rue de la paix</p>
                    <p>Téléphone : 01 02 03 04 05</p>
                    <p>Email : test @test.com</p>
                </div>
            </div>
            <p>© {year} Bike-Beer. Tous droits réservés.</p>
        </footer>
    );
};

export default Footer;