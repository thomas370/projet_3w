import React from 'react';
import style from './ButtonReturn.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const ButtonReturn = () => {
    return (
        <div className={style.ButtonRetour}>
            <Link to={'/'}><FontAwesomeIcon icon={faArrowLeft} /></Link>
        </div>
    );
};

export default ButtonReturn;