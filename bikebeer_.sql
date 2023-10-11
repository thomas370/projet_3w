-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 11 oct. 2023 à 09:10
-- Version du serveur : 5.7.36
-- Version de PHP : 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bikebeer`
--

-- --------------------------------------------------------

--
-- Structure de la table `beers`
--

DROP TABLE IF EXISTS `beers`;
CREATE TABLE IF NOT EXISTS `beers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` float NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `taux` float NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `beers`
--

INSERT INTO `beers` (`id`, `name`, `description`, `price`, `created_at`, `taux`, `image`) VALUES
(3, 'La Brise Légère', 'Une bière blonde légère avec des notes d’agrumes et de miel. Parfait pour un après-midi ensoleillé.', 4.5, '2023-07-04 11:47:24', 6.99, 'beer_1.png'),
(5, 'La Forêt Profonde', 'Un stout riche et corsé avec des notes de café et de chocolat, comme une promenade dans une forêt dense.', 6.5, '2023-07-04 11:47:24', 5.69, 'beer_3.png'),
(7, 'La Rivière Sereine', 'Une bière pilsner fraîche et pétillante,, avec une fin légèrement houblonnée, comme une journée près d’une rivière paisible.', 4, '2023-07-04 11:47:24', 5.3, 'beer_5.png'),
(8, 'L Aventure Tropicale', 'Une bière IPA avec des arômes de fruits tropicaux et une amertume équilibrée, pour ceux qui cherchent l’aventure.', 6, '2023-07-04 11:47:24', 8, 'beer_6.png');

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `beer_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `beer_id` (`beer_id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `beer_id`, `rating`, `comment`, `created_at`) VALUES
(40, 10, 3, 5, 'bière excellente', '2023-10-09 12:13:35'),
(41, 11, 3, 1, 'bière gout trop amer', '2023-10-09 12:17:28'),
(42, 5, 7, 3, 'bien, un peut cher', '2023-10-09 12:18:16');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`) VALUES
(11, 'sandrine', '$2a$10$Ud7YhZSFrjqisW98rIurz.DNLWjHU.7vsW2lpClMDiEjvLNS4QS5W', 'sandrine@gmail.com', 'user'),
(12, 'Morgan', '$2a$10$Y.ixQjWy0QdPKR9PM6/lAuP0EeQW/v2kYxxZA0g/GqLdcsfMHhPnm', 'morgan@gmail.com', 'user'),
(5, 'thomas', '$2a$10$ImlHyID72JHPsxfmyV029O5sgGE6NYZ4TfBXXA/lyyN4S2tQBeVNm', 'thomasbortolato5@gmail.com', 'admin'),
(10, 'luc', '$2a$10$8ktMXzCVs32iLU7tZcF4DOdP/cMfhaNZMeyVUaSZiUuH3QAlvisoC', 'luc@gmail.com', 'user');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
