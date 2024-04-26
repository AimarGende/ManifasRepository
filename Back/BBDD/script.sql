-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql
-- Tiempo de generación: 26-04-2024 a las 07:29:16
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Manifas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `id` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `latitud` varchar(255) NOT NULL,
  `longitud` varchar(255) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Grupos`
--

CREATE TABLE `Grupos` (
  `id` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `detalle` text NOT NULL,
  `idProtesta` int NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Mensajes`
--

CREATE TABLE `Mensajes` (
  `id` int NOT NULL,
  `detalle` text NOT NULL,
  `fecha` date NOT NULL,
  `idUsuario` int NOT NULL,
  `idGrupo` int NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Protestas`
--

CREATE TABLE `Protestas` (
  `id` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `detalle` text NOT NULL,
  `fecha` date NOT NULL,
  `horaInicio` datetime NOT NULL,
  `horaFinEstimada` datetime NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `protestas/ciudades`
--

CREATE TABLE `protestas/ciudades` (
  `idProtesta` int NOT NULL,
  `idCiudad` int NOT NULL,
  `fecha` date NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscripciones`
--

CREATE TABLE `suscripciones` (
  `id` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `idUsuario` int NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

CREATE TABLE `tokens` (
  `id` int NOT NULL,
  `idUsuario` int NOT NULL,
  `token` varchar(255) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE `Usuarios` (
  `id` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `salt`text NOT NULL,
  `evita` tinyint(1) NOT NULL
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios/Grupos`
--

CREATE TABLE `Usuarios/Grupos` (
  `idUsuario` int NOT NULL,
  `idGrupo` int NOT NULL
);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Grupos`
--
ALTER TABLE `Grupos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idProtesta` (`idProtesta`);

--
-- Indices de la tabla `Mensajes`
--
ALTER TABLE `Mensajes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `fkmensajesgrupos` (`idGrupo`);

--
-- Indices de la tabla `Protestas`
--
ALTER TABLE `Protestas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `protestas/ciudades`
--
ALTER TABLE `protestas/ciudades`
  ADD PRIMARY KEY (`idProtesta`,`idCiudad`,`fecha`),
  ADD KEY `fkprotestasciudades2` (`idCiudad`);

--
-- Indices de la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkusuariosTokens` (`idUsuario`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Usuarios/Grupos`
--
ALTER TABLE `Usuarios/Grupos`
  ADD KEY `UsuariosGrupos` (`idUsuario`),
  ADD KEY `fkusuariogrupo2` (`idGrupo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Grupos`
--
ALTER TABLE `Grupos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Mensajes`
--
ALTER TABLE `Mensajes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Protestas`
--
ALTER TABLE `Protestas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Grupos`
--
ALTER TABLE `Grupos`
  ADD CONSTRAINT `grupos_ibfk_1` FOREIGN KEY (`idProtesta`) REFERENCES `Protestas` (`id`);

--
-- Filtros para la tabla `Mensajes`
--
ALTER TABLE `Mensajes`
  ADD CONSTRAINT `fkmensajesgrupos` FOREIGN KEY (`idGrupo`) REFERENCES `Grupos` (`id`),
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios` (`id`);

--
-- Filtros para la tabla `protestas/ciudades`
--
ALTER TABLE `protestas/ciudades`
  ADD CONSTRAINT `fkprotestasciudades` FOREIGN KEY (`idProtesta`) REFERENCES `Protestas` (`id`),
  ADD CONSTRAINT `fkprotestasciudades2` FOREIGN KEY (`idCiudad`) REFERENCES `ciudades` (`id`);

--
-- Filtros para la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  ADD CONSTRAINT `suscripciones_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios` (`id`);

--
-- Filtros para la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `fkusuariosTokens` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios` (`id`);

--
-- Filtros para la tabla `Usuarios/Grupos`
--
ALTER TABLE `Usuarios/Grupos`
  ADD CONSTRAINT `fkusuariogrupo2` FOREIGN KEY (`idGrupo`) REFERENCES `Grupos` (`id`),
  ADD CONSTRAINT `UsuariosGrupos` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
