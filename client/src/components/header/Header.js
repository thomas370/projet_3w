import React from 'react';
import style from './Header.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
const Header = () => {
    const handleScrollDown = () => {
        const element = document.getElementById('bières');
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    }

    const handleAnchorClick = (event, anchorId) => {
        event.preventDefault();
        const element = document.getElementById(anchorId);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    };
    return (
        <div className={style.header} id='Accueil'>
            <div className={style.backgroundImage}></div>
            <div className={style.headerText}>
                <h1>Bike-beer's</h1>
                <button><a href="#prendreRDV" onClick={(event) => handleAnchorClick(event, 'prendreRDV')}>Prendre rendez-vous</a></button>
            </div>
            <div className={style.scrollDownContainer} onClick={handleScrollDown}>
                <div className={style.scrollDown}>
                    <FontAwesomeIcon icon={faChevronDown}/>
                </div>
            </div>
        </div>
    );
};

export default Header;