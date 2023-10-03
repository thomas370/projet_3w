import React from 'react';
import style from './Home.module.scss';

import NavBar from "../../components/navbar/NavBarre";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Presentation from "../../components/presentation/Presentation";
import Beers from "../../components/beers/Beers";
import Comments from "../../components/comments/Comments";
const Home = () => {
    return (
        <div className={style.home}>
            <NavBar />
            <Header />
            <Presentation />
            <Beers />
            <Comments />
            <Footer />
        </div>
    );
};

export default Home;