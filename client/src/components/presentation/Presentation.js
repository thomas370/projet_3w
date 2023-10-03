import React from 'react';
import style from './Presentation.module.scss';

const Presentation = () => {
    return (
        <section className={style.presentation}>
            <div className={style.presentationContainer}>
                <div className={style.presentationText}>
                    <h2>Bike-Beer's</h2>
                    <p>Bike Beer est un concept unique qui allie l’amour de la bicyclette et l’appréciation d'une bonne bière fraîche. Vous êtes-vous déjà demandé comment il serait pratique de faire réparer votre vélo tout en profitant d’une ambiance détendue avec une bière à la main? Eh bien, ne cherchez plus! Bike Beer est l'endroit idéal pour tous les passionnés de vélos et amateurs de bière.</p>
                </div>
            </div>
        </section>
    );
};

export default Presentation;