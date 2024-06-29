-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 29/06/2024 às 02:11
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `controleacesso`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `acesso`
--

CREATE TABLE `acesso` (
  `IdAcesso` int(11) NOT NULL,
  `Id_Usuario` int(11) NOT NULL,
  `Id_Responsavel` int(11) NOT NULL,
  `Id_Laboratorio` int(11) NOT NULL,
  `dataHoraEntradaAcesso` timestamp NULL DEFAULT current_timestamp(),
  `dataHoraSaidaAcesso` timestamp NULL DEFAULT NULL,
  `observacaoAcesso` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `acesso`
--

INSERT INTO `acesso` (`IdAcesso`, `Id_Usuario`, `Id_Responsavel`, `Id_Laboratorio`, `dataHoraEntradaAcesso`, `dataHoraSaidaAcesso`, `observacaoAcesso`) VALUES
(5, 3, 1, 1, '2024-06-26 22:43:54', NULL, ''),
(6, 3, 1, 2, '2024-06-26 22:49:12', NULL, '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cargo`
--

CREATE TABLE `cargo` (
  `IdCargo` int(11) NOT NULL,
  `nomeCargo` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cargo`
--

INSERT INTO `cargo` (`IdCargo`, `nomeCargo`) VALUES
(1, 'Instrutor de TI'),
(2, 'Portaria'),
(3, 'Agente de Educação');

-- --------------------------------------------------------

--
-- Estrutura para tabela `laboratorio`
--

CREATE TABLE `laboratorio` (
  `IdLaboratorio` int(11) NOT NULL,
  `nomeLaboratorio` varchar(120) NOT NULL,
  `fotoLaboratorio` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `laboratorio`
--

INSERT INTO `laboratorio` (`IdLaboratorio`, `nomeLaboratorio`, `fotoLaboratorio`) VALUES
(1, 'Lab Nit 03', 'lab3.jpg'),
(2, 'Lab Nit 02', 'lab2.jpg'),
(3, 'lab5', 'lab5.jpg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `responsavel`
--

CREATE TABLE `responsavel` (
  `idResponsavel` int(11) NOT NULL,
  `nomeResponsavel` varchar(120) NOT NULL,
  `Id_Cargo_Responsavel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `responsavel`
--

INSERT INTO `responsavel` (`idResponsavel`, `nomeResponsavel`, `Id_Cargo_Responsavel`) VALUES
(1, 'Carlos Henrique Sousa de Macedo', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nomeUsuario` varchar(120) NOT NULL,
  `emailUsuario` varchar(120) NOT NULL,
  `senhaUsuario` int(120) NOT NULL,
  `Id_Cargo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nomeUsuario`, `emailUsuario`, `senhaUsuario`, `Id_Cargo`) VALUES
(2, 'Carlos Henrique Sousa de Macedo', 'carlos@gmail.com', 123, 1),
(3, 'Ronaldo Caiado', 'caiado@gmail.com', 123, 2),
(14, 'joao', 'joao@gmail.com', 123, 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `acesso`
--
ALTER TABLE `acesso`
  ADD PRIMARY KEY (`IdAcesso`),
  ADD KEY `fk_acesso_usuario` (`Id_Usuario`),
  ADD KEY `fk_acesso_laboratorio` (`Id_Laboratorio`),
  ADD KEY `fk_acesso_responsavel` (`Id_Responsavel`);

--
-- Índices de tabela `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`IdCargo`);

--
-- Índices de tabela `laboratorio`
--
ALTER TABLE `laboratorio`
  ADD PRIMARY KEY (`IdLaboratorio`);

--
-- Índices de tabela `responsavel`
--
ALTER TABLE `responsavel`
  ADD PRIMARY KEY (`idResponsavel`),
  ADD KEY `fk_responsavel_cargo` (`Id_Cargo_Responsavel`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `fk_usuario_cargo` (`Id_Cargo`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `acesso`
--
ALTER TABLE `acesso`
  MODIFY `IdAcesso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `cargo`
--
ALTER TABLE `cargo`
  MODIFY `IdCargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `laboratorio`
--
ALTER TABLE `laboratorio`
  MODIFY `IdLaboratorio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `responsavel`
--
ALTER TABLE `responsavel`
  MODIFY `idResponsavel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `acesso`
--
ALTER TABLE `acesso`
  ADD CONSTRAINT `fk_acesso_laboratorio` FOREIGN KEY (`Id_Laboratorio`) REFERENCES `laboratorio` (`IdLaboratorio`),
  ADD CONSTRAINT `fk_acesso_responsavel` FOREIGN KEY (`Id_Responsavel`) REFERENCES `responsavel` (`idResponsavel`),
  ADD CONSTRAINT `fk_acesso_usuario` FOREIGN KEY (`Id_Usuario`) REFERENCES `usuario` (`idUsuario`);

--
-- Restrições para tabelas `responsavel`
--
ALTER TABLE `responsavel`
  ADD CONSTRAINT `fk_responsavel_cargo` FOREIGN KEY (`Id_Cargo_Responsavel`) REFERENCES `cargo` (`IdCargo`);

--
-- Restrições para tabelas `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_cargo` FOREIGN KEY (`Id_Cargo`) REFERENCES `cargo` (`IdCargo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
