import React from 'react';
import style from './Rating.module.scss';

const Rating = ({ rating, setRating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(
                <span
                    key={i}
                    onClick={() => setRating(i)}
                    className={style.star}
                    role="button"
                    aria-label={`Donner une note de ${i} étoiles`}
                >
                    &#9733;
                </span>
            );
        } else {
            stars.push(
                <span
                    key={i}
                    onClick={() => setRating(i)}
                    className={style.star}
                    role="button"
                    aria-label={`Donner une note de ${i} étoiles`}
                >
                    &#9734;
                </span>
            );
        }
    }
    return <div className={style.rating}>{stars}</div>;
};

export default Rating;