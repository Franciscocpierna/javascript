// Ativa o modo estrito do JavaScript para tornar a execução do código mais rigorosa e previsível.
'use strict';

/* ================================================================
   CORRIDA VELOCIDADE TOTAL
   Jogo de corrida pseudo-3D feito apenas com HTML, CSS e JavaScript.
   Versão com colisões físicas e IA competitiva recalibrada.
   Todo o código foi organizado em blocos e comentado em português.
   ================================================================ */

// ---------------------------- ELEMENTOS DA TELA ----------------------------
// Localiza um elemento da página e armazena sua referência em `canvas` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// canvas = identificador utilizado para armazenar ou acessar o valor relacionado a `canvas`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "gameCanvas" = identificador do elemento HTML que será localizado no documento.
// canvas = representa o canvas principal utilizado para desenhar a corrida.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const canvas = document.getElementById('gameCanvas');

// Obtém o contexto de desenho do canvas e armazena a referência em `ctx`.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// ctx = identificador utilizado para armazenar ou acessar o valor relacionado a `ctx`.
// getContext = obtém o contexto de desenho utilizado pelo elemento canvas.
// canvas = representa o canvas principal utilizado para desenhar a corrida.
// ctx = representa o contexto 2D usado para desenhar no canvas principal.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const ctx = canvas.getContext('2d');

// Localiza um elemento da página e armazena sua referência em `miniMapa` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// miniMapa = identificador utilizado para armazenar ou acessar o valor relacionado a `miniMapa`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "miniMapa" = identificador do elemento HTML que será localizado no documento.
// miniMapa = representa o canvas utilizado para exibir o minimapa.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const miniMapa = document.getElementById('miniMapa');

// Obtém o contexto de desenho do canvas e armazena a referência em `miniCtx`.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// miniCtx = identificador utilizado para armazenar ou acessar o valor relacionado a `miniCtx`.
// getContext = obtém o contexto de desenho utilizado pelo elemento canvas.
// miniMapa = representa o canvas utilizado para exibir o minimapa.
// miniCtx = representa o contexto 2D usado para desenhar o minimapa.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const miniCtx = miniMapa.getContext('2d');

// Localiza um elemento da página e armazena sua referência em `telaMenu` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// telaMenu = identificador utilizado para armazenar ou acessar o valor relacionado a `telaMenu`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "telaMenu" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const telaMenu = document.getElementById('telaMenu');

// Localiza um elemento da página e armazena sua referência em `telaJogo` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// telaJogo = identificador utilizado para armazenar ou acessar o valor relacionado a `telaJogo`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "telaJogo" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const telaJogo = document.getElementById('telaJogo');

// Localiza um elemento da página e armazena sua referência em `hud` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// hud = identificador utilizado para armazenar ou acessar o valor relacionado a `hud`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "hud" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const hud = document.getElementById('hud');

// Localiza um elemento da página e armazena sua referência em `hudPosicao` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// hudPosicao = identificador utilizado para armazenar ou acessar o valor relacionado a `hudPosicao`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "hudPosicao" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const hudPosicao = document.getElementById('hudPosicao');

// Localiza um elemento da página e armazena sua referência em `hudVolta` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// hudVolta = identificador utilizado para armazenar ou acessar o valor relacionado a `hudVolta`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "hudVolta" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const hudVolta = document.getElementById('hudVolta');

// Localiza um elemento da página e armazena sua referência em `hudVelocidade` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// hudVelocidade = identificador utilizado para armazenar ou acessar o valor relacionado a `hudVelocidade`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "hudVelocidade" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const hudVelocidade = document.getElementById('hudVelocidade');

// Localiza um elemento da página e armazena sua referência em `hudTempo` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// hudTempo = identificador utilizado para armazenar ou acessar o valor relacionado a `hudTempo`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "hudTempo" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const hudTempo = document.getElementById('hudTempo');

// Localiza um elemento da página e armazena sua referência em `hudTurbo` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// hudTurbo = identificador utilizado para armazenar ou acessar o valor relacionado a `hudTurbo`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "hudTurbo" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const hudTurbo = document.getElementById('hudTurbo');

// Localiza um elemento da página e armazena sua referência em `hudRpm` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// hudRpm = identificador utilizado para armazenar ou acessar o valor relacionado a `hudRpm`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "hudRpm" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const hudRpm = document.getElementById('hudRpm');

// Localiza um elemento da página e armazena sua referência em `hudCamera` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// hudCamera = identificador utilizado para armazenar ou acessar o valor relacionado a `hudCamera`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "hudCamera" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const hudCamera = document.getElementById('hudCamera');

// Localiza um elemento da página e armazena sua referência em `hudInfoCorrida` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// hudInfoCorrida = identificador utilizado para armazenar ou acessar o valor relacionado a `hudInfoCorrida`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "hudInfoCorrida" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const hudInfoCorrida = document.getElementById('hudInfoCorrida');

// Localiza um elemento da página e armazena sua referência em `hudModoIA` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// hudModoIA = identificador utilizado para armazenar ou acessar o valor relacionado a `hudModoIA`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "hudModoIA" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const hudModoIA = document.getElementById('hudModoIA');

// Localiza um elemento da página e armazena sua referência em `placarPilotos` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// placarPilotos = identificador utilizado para armazenar ou acessar o valor relacionado a `placarPilotos`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "placarPilotos" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const placarPilotos = document.getElementById('placarPilotos');

// Localiza um elemento da página e armazena sua referência em `contagemEl` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// contagemEl = identificador utilizado para armazenar ou acessar o valor relacionado a `contagemEl`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "contagem" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const contagemEl = document.getElementById('contagem');

// Localiza um elemento da página e armazena sua referência em `mensagemEl` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// mensagemEl = identificador utilizado para armazenar ou acessar o valor relacionado a `mensagemEl`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "mensagemCorrida" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const mensagemEl = document.getElementById('mensagemCorrida');

// Localiza um elemento da página e armazena sua referência em `nomeJogadorEl` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// nomeJogadorEl = identificador utilizado para armazenar ou acessar o valor relacionado a `nomeJogadorEl`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "nomeJogador" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const nomeJogadorEl = document.getElementById('nomeJogador');

// Localiza um elemento da página e armazena sua referência em `modoJogoEl` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// modoJogoEl = identificador utilizado para armazenar ou acessar o valor relacionado a `modoJogoEl`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "modoJogo" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const modoJogoEl = document.getElementById('modoJogo');

// Localiza um elemento da página e armazena sua referência em `dificuldadeEl` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// dificuldadeEl = identificador utilizado para armazenar ou acessar o valor relacionado a `dificuldadeEl`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "dificuldade" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const dificuldadeEl = document.getElementById('dificuldade');

// Localiza um elemento da página e armazena sua referência em `voltasEl` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// voltasEl = identificador utilizado para armazenar ou acessar o valor relacionado a `voltasEl`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "voltas" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const voltasEl = document.getElementById('voltas');

// Localiza um elemento da página e armazena sua referência em `cenarioEl` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// cenarioEl = identificador utilizado para armazenar ou acessar o valor relacionado a `cenarioEl`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "cenario" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const cenarioEl = document.getElementById('cenario');

// Localiza um elemento da página e armazena sua referência em `carroEl` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// carroEl = identificador utilizado para armazenar ou acessar o valor relacionado a `carroEl`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "carro" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const carroEl = document.getElementById('carro');

// Localiza um elemento da página e armazena sua referência em `previewCarroNome` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// previewCarroNome = identificador utilizado para armazenar ou acessar o valor relacionado a `previewCarroNome`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "previewCarroNome" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const previewCarroNome = document.getElementById('previewCarroNome');

// Localiza um elemento da página e armazena sua referência em `previewCarroStats` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// previewCarroStats = identificador utilizado para armazenar ou acessar o valor relacionado a `previewCarroStats`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "previewCarroStats" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const previewCarroStats = document.getElementById('previewCarroStats');

// Localiza um elemento da página e armazena sua referência em `miniCarro` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// miniCarro = identificador utilizado para armazenar ou acessar o valor relacionado a `miniCarro`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "miniCarro" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const miniCarro = document.getElementById('miniCarro');

// Localiza um elemento da página e armazena sua referência em `previewCenarioNome` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// previewCenarioNome = identificador utilizado para armazenar ou acessar o valor relacionado a `previewCenarioNome`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "previewCenarioNome" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const previewCenarioNome = document.getElementById('previewCenarioNome');

// Localiza um elemento da página e armazena sua referência em `previewCenarioDesc` para uso posterior no jogo.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// previewCenarioDesc = identificador utilizado para armazenar ou acessar o valor relacionado a `previewCenarioDesc`.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// "previewCenarioDesc" = identificador do elemento HTML que será localizado no documento.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const previewCenarioDesc = document.getElementById('previewCenarioDesc');

// ----------------------------- CONFIGURAÇÕES DO JOGO -----------------------------
// Declara `SEGMENTO` e armazena nessa variável ou constante o valor calculado nesta linha.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// SEGMENTO = identificador utilizado para armazenar ou acessar o valor relacionado a `SEGMENTO`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
const SEGMENTO = 200;

// Declara `LARGURA_PISTA` e armazena nessa variável ou constante o valor calculado nesta linha.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// LARGURA_PISTA = identificador utilizado para armazenar ou acessar o valor relacionado a `LARGURA_PISTA`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
const LARGURA_PISTA = 2000;

// Declara `FOV` e armazena nessa variável ou constante o valor calculado nesta linha.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// FOV = identificador utilizado para armazenar ou acessar o valor relacionado a `FOV`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
const FOV = 95;

// Declara `PROFUNDIDADE_CAMERA` e armazena nessa variável ou constante o valor calculado nesta linha.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// PROFUNDIDADE_CAMERA = identificador utilizado para armazenar ou acessar o valor relacionado a `PROFUNDIDADE_CAMERA`.
// Math.tan = calcula a tangente do valor informado.
// Math.PI = constante que representa o valor de pi.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// * = operador utilizado para multiplicação.
// / = operador utilizado para divisão.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const PROFUNDIDADE_CAMERA = 1 / Math.tan((FOV / 2) * Math.PI / 180);

// Declara `DISTANCIA_DESENHO` e armazena nessa variável ou constante o valor calculado nesta linha.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// DISTANCIA_DESENHO = identificador utilizado para armazenar ou acessar o valor relacionado a `DISTANCIA_DESENHO`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
const DISTANCIA_DESENHO = 280;

// Declara `PASSO_FIXO` e armazena nessa variável ou constante o valor calculado nesta linha.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// PASSO_FIXO = identificador utilizado para armazenar ou acessar o valor relacionado a `PASSO_FIXO`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// / = operador utilizado para divisão.
const PASSO_FIXO = 1 / 60;

// Dimensões aproximadas usadas pela física de colisão.
// O eixo X é normalizado em relação à largura da pista; a distância é medida
// nas mesmas unidades usadas pelos segmentos da pista.
// Declara `LARGURA_COLISAO_CARRO` e armazena nessa variável ou constante o valor calculado nesta linha.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// LARGURA_COLISAO_CARRO = identificador utilizado para armazenar ou acessar o valor relacionado a `LARGURA_COLISAO_CARRO`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const LARGURA_COLISAO_CARRO = 0.30;

// Declara `COMPRIMENTO_COLISAO_CARRO` e armazena nessa variável ou constante o valor calculado nesta linha.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// COMPRIMENTO_COLISAO_CARRO = identificador utilizado para armazenar ou acessar o valor relacionado a `COMPRIMENTO_COLISAO_CARRO`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
const COMPRIMENTO_COLISAO_CARRO = 330;

// Declara `MARGEM_SEPARACAO` e armazena nessa variável ou constante o valor calculado nesta linha.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// MARGEM_SEPARACAO = identificador utilizado para armazenar ou acessar o valor relacionado a `MARGEM_SEPARACAO`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const MARGEM_SEPARACAO = 0.012;

// Cria uma lista de valores e armazena essa coleção em `NOMES_IA`.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// NOMES_IA = identificador utilizado para armazenar ou acessar o valor relacionado a `NOMES_IA`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
// ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
const NOMES_IA = ['MAX', 'DIEGO', 'LEO', 'FELIPE', 'BRUNO', 'TOM', 'GABRIEL'];

// Cria uma lista de valores e armazena essa coleção em `CORES_IA`.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// CORES_IA = identificador utilizado para armazenar ou acessar o valor relacionado a `CORES_IA`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// #ffd42a = código hexadecimal da cor dourado.
// #24df69 = código hexadecimal da cor verde lima.
// #198bff = código hexadecimal da cor azul dodger.
// #ff8a1d = código hexadecimal da cor laranja.
// #bd63ff = código hexadecimal da cor violeta azulado.
// #f4f4f4 = código hexadecimal da cor branco fumaça.
// #22d1c3 = código hexadecimal da cor ciano.
// [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
// ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
const CORES_IA = ['#ffd42a', '#24df69', '#198bff', '#ff8a1d', '#bd63ff', '#f4f4f4', '#22d1c3'];

// Cria uma lista de valores e armazena essa coleção em `TIPOS_IA`.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// TIPOS_IA = identificador utilizado para armazenar ou acessar o valor relacionado a `TIPOS_IA`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
// ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
const TIPOS_IA = ['falcon', 'tempest', 'veloce', 'falcon', 'tempest', 'veloce', 'falcon'];

// Cria um objeto de configuração e armazena sua referência em `CONFIG_DIFICULDADE`.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// CONFIG_DIFICULDADE = identificador utilizado para armazenar ou acessar o valor relacionado a `CONFIG_DIFICULDADE`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// { = inicia o bloco de instruções ou objeto correspondente.
const CONFIG_DIFICULDADE = {

  // A IA foi recalibrada para manter o pelotão competitivo sem teleportar carros.
  // velocidadeIA controla o ritmo-base; aceleracaoIA melhora a arrancada; turboIA
  // define o quanto os rivais aproveitam retas e ultrapassagens; recuperacao limita
  // a ajuda progressiva dada somente quando um rival ficou realmente para trás.
  // Define a propriedade `facil` desta estrutura com o valor informado nesta linha.
  // facil = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // velocidadeIA = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // erroIA = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // agressividade = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // aceleracaoIA = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // turboIA = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // recuperacao = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // premio = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  facil:    { velocidadeIA: 0.94, erroIA: 0.25, agressividade: 0.34, aceleracaoIA: 0.98, turboIA: 0.42, recuperacao: 0.055, premio: 100 },

  // Define a propriedade `medio` desta estrutura com o valor informado nesta linha.
  // medio = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // velocidadeIA = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // erroIA = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // agressividade = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // aceleracaoIA = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // turboIA = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // recuperacao = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // premio = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  medio:    { velocidadeIA: 1.00, erroIA: 0.12, agressividade: 0.64, aceleracaoIA: 1.09, turboIA: 0.72, recuperacao: 0.095, premio: 200 },

  // Define a propriedade `avancado` desta estrutura com o valor informado nesta linha.
  // avancado = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // velocidadeIA = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // erroIA = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // agressividade = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // aceleracaoIA = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // turboIA = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // recuperacao = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // premio = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  avancado: { velocidadeIA: 1.045, erroIA: 0.045, agressividade: 0.90, aceleracaoIA: 1.18, turboIA: 0.94, recuperacao: 0.135, premio: 350 }

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
};

// Cria um objeto de configuração e armazena sua referência em `CARROS`.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// CARROS = identificador utilizado para armazenar ou acessar o valor relacionado a `CARROS`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// { = inicia o bloco de instruções ou objeto correspondente.
const CARROS = {

  // Define a propriedade `veloce` desta estrutura com o valor informado nesta linha.
  // veloce = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  veloce: {

    // Define a propriedade `nome` desta estrutura com o valor informado nesta linha.
    // nome = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // cor = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // tipo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // #e43228 = código hexadecimal da cor vermelho carmim.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    nome: 'Veloce R', cor: '#e43228', tipo: 'super',

    // Define a propriedade `max` desta estrutura com o valor informado nesta linha.
    // max = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // turboMax = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // aceleracao = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // frenagem = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // controle = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    max: 325, turboMax: 372, aceleracao: 1780, frenagem: 3300, controle: 1.05,

    // Define a propriedade `estatisticas` desta estrutura com o valor informado nesta linha.
    // estatisticas = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    estatisticas: 'Velocidade 325 • Aceleração 90 • Controle 86'

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  },

  // Define a propriedade `tempest` desta estrutura com o valor informado nesta linha.
  // tempest = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  tempest: {

    // Define a propriedade `nome` desta estrutura com o valor informado nesta linha.
    // nome = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // cor = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // tipo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // #198bff = código hexadecimal da cor azul dodger.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    nome: 'Tempest GT', cor: '#198bff', tipo: 'gt',

    // Define a propriedade `max` desta estrutura com o valor informado nesta linha.
    // max = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // turboMax = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // aceleracao = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // frenagem = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // controle = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    max: 318, turboMax: 362, aceleracao: 1920, frenagem: 3450, controle: 0.97,

    // Define a propriedade `estatisticas` desta estrutura com o valor informado nesta linha.
    // estatisticas = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    estatisticas: 'Velocidade 318 • Aceleração 96 • Controle 79'

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  },

  // Define a propriedade `falcon` desta estrutura com o valor informado nesta linha.
  // falcon = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  falcon: {

    // Define a propriedade `nome` desta estrutura com o valor informado nesta linha.
    // nome = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // cor = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // tipo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // #f4b51d = código hexadecimal da cor dourado escuro.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    nome: 'Falcon X', cor: '#f4b51d', tipo: 'sport',

    // Define a propriedade `max` desta estrutura com o valor informado nesta linha.
    // max = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // turboMax = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // aceleracao = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // frenagem = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // controle = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    max: 308, turboMax: 352, aceleracao: 1700, frenagem: 3200, controle: 1.14,

    // Define a propriedade `estatisticas` desta estrutura com o valor informado nesta linha.
    // estatisticas = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    estatisticas: 'Velocidade 308 • Aceleração 86 • Controle 94'

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
};

// Cria um objeto de configuração e armazena sua referência em `CENARIOS`.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// CENARIOS = identificador utilizado para armazenar ou acessar o valor relacionado a `CENARIOS`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// { = inicia o bloco de instruções ou objeto correspondente.
const CENARIOS = {

  // Define a propriedade `costa` desta estrutura com o valor informado nesta linha.
  // costa = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  costa: {

    // Define a propriedade `nome` desta estrutura com o valor informado nesta linha.
    // nome = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // descricao = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // tipo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    nome: 'Costa do Sol', descricao: 'Montanhas, oceano e pôr do sol.', tipo: 'costa',

    // Define a propriedade `paleta` desta estrutura com o valor informado nesta linha.
    // paleta = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // grama1 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // grama2 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // asfalto1 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // asfalto2 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // zebra1 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // zebra2 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // #173622 = código hexadecimal da cor azul petróleo escuro.
    // #214b2d = código hexadecimal da cor cinza escuro.
    // #34383f = código hexadecimal da cor cinza escuro.
    // #30343a = código hexadecimal da cor cinza escuro.
    // #e8382c = código hexadecimal da cor vermelho carmim.
    // #f2f2ed = código hexadecimal da cor branco fumaça.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    paleta: { grama1:'#173622', grama2:'#214b2d', asfalto1:'#34383f', asfalto2:'#30343a', zebra1:'#e8382c', zebra2:'#f2f2ed' }

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  },

  // Define a propriedade `serra` desta estrutura com o valor informado nesta linha.
  // serra = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  serra: {

    // Define a propriedade `nome` desta estrutura com o valor informado nesta linha.
    // nome = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // descricao = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // tipo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    nome: 'Serra Verde', descricao: 'Floresta de pinheiros, montanhas e céu claro.', tipo: 'serra',

    // Define a propriedade `paleta` desta estrutura com o valor informado nesta linha.
    // paleta = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // grama1 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // grama2 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // asfalto1 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // asfalto2 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // zebra1 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // zebra2 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // #143b24 = código hexadecimal da cor azul petróleo escuro.
    // #1d512d = código hexadecimal da cor cinza escuro.
    // #353a3e = código hexadecimal da cor cinza escuro.
    // #2f3438 = código hexadecimal da cor cinza escuro.
    // #f4f4f1 = código hexadecimal da cor branco fumaça.
    // #178d42 = código hexadecimal da cor verde mar.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    paleta: { grama1:'#143b24', grama2:'#1d512d', asfalto1:'#353a3e', asfalto2:'#2f3438', zebra1:'#f4f4f1', zebra2:'#178d42' }

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  },

  // Define a propriedade `neon` desta estrutura com o valor informado nesta linha.
  // neon = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  neon: {

    // Define a propriedade `nome` desta estrutura com o valor informado nesta linha.
    // nome = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // descricao = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // tipo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    nome: 'Metrópole Neon', descricao: 'Corrida noturna entre prédios, luzes e neon.', tipo: 'neon',

    // Define a propriedade `paleta` desta estrutura com o valor informado nesta linha.
    // paleta = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // grama1 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // grama2 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // asfalto1 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // asfalto2 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // zebra1 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // zebra2 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // #101522 = código hexadecimal da cor preto azulado.
    // #151b2b = código hexadecimal da cor azul petróleo escuro.
    // #262a35 = código hexadecimal da cor azul petróleo escuro.
    // #20242d = código hexadecimal da cor azul petróleo escuro.
    // #28d8ff = código hexadecimal da cor ciano.
    // #ff3fab = código hexadecimal da cor rosa profundo.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    paleta: { grama1:'#101522', grama2:'#151b2b', asfalto1:'#262a35', asfalto2:'#20242d', zebra1:'#28d8ff', zebra2:'#ff3fab' }

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  },

  // Define a propriedade `canion` desta estrutura com o valor informado nesta linha.
  // canion = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  canion: {

    // Define a propriedade `nome` desta estrutura com o valor informado nesta linha.
    // nome = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // descricao = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // tipo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    nome: 'Cânion Dourado', descricao: 'Deserto, rochas gigantes e longas retas.', tipo: 'canion',

    // Define a propriedade `paleta` desta estrutura com o valor informado nesta linha.
    // paleta = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // grama1 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // grama2 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // asfalto1 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // asfalto2 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // zebra1 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // zebra2 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // #b56a2e = código hexadecimal da cor marrom chocolate.
    // #c57938 = código hexadecimal da cor marrom chocolate.
    // #3a3938 = código hexadecimal da cor cinza escuro.
    // #333231 = código hexadecimal da cor cinza escuro.
    // #f5e7c8 = código hexadecimal da cor bege.
    // #df4c28 = código hexadecimal da cor marrom chocolate.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    paleta: { grama1:'#b56a2e', grama2:'#c57938', asfalto1:'#3a3938', asfalto2:'#333231', zebra1:'#f5e7c8', zebra2:'#df4c28' }

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
};

// Cria uma lista de valores e armazena essa coleção em `CAMERAS`.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// CAMERAS = identificador utilizado para armazenar ou acessar o valor relacionado a `CAMERAS`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
const CAMERAS = [

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // altura = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // recuo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // escalaJogador = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // yJogador = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // carro = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // nome = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // true = valor lógico verdadeiro utilizado para ativar ou confirmar a condição correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  { altura: 980, recuo: 980, escalaJogador: 1.00, yJogador: .875, carro: true, nome: 'CÂMERA 1' },

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // altura = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // recuo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // escalaJogador = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // yJogador = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // carro = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // nome = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // true = valor lógico verdadeiro utilizado para ativar ou confirmar a condição correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  { altura: 730, recuo: 720, escalaJogador: 1.20, yJogador: .915, carro: true, nome: 'CÂMERA 2' },

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // altura = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // recuo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // escalaJogador = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // yJogador = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // carro = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // nome = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  { altura: 520, recuo: 440, escalaJogador: 1.00, yJogador: .95, carro: false, nome: 'CÂMERA 3' }

// Encerra a chamada, lista ou estrutura iniciada nas linhas anteriores.
// ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
];

// ----------------------------- VARIÁVEIS GERAIS -----------------------------
// Cria uma lista de valores e armazena essa coleção em `segmentos`.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// segmentos = identificador utilizado para armazenar ou acessar o valor relacionado a `segmentos`.
// segmentos = representa a coleção de segmentos que formam a pista.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
// ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
let segmentos = [];

// Declara `comprimentoPista` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// comprimentoPista = identificador utilizado para armazenar ou acessar o valor relacionado a `comprimentoPista`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let comprimentoPista = 0;

// Declara `estado` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// estado = identificador utilizado para armazenar ou acessar o valor relacionado a `estado`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
let estado = 'menu'; // menu, contagem, corrida, pausado, fim

// Declara `acumulador` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// acumulador = identificador utilizado para armazenar ou acessar o valor relacionado a `acumulador`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let acumulador = 0;

// Declara `ultimoTempoFrame` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// ultimoTempoFrame = identificador utilizado para armazenar ou acessar o valor relacionado a `ultimoTempoFrame`.
// performance.now = obtém um marcador de tempo de alta precisão do navegador.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
let ultimoTempoFrame = performance.now();

// Declara `animacaoId` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// animacaoId = identificador utilizado para armazenar ou acessar o valor relacionado a `animacaoId`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let animacaoId = 0;

// Declara `inicioCorrida` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// inicioCorrida = identificador utilizado para armazenar ou acessar o valor relacionado a `inicioCorrida`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let inicioCorrida = 0;

// Declara `tempoPausadoAcumulado` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// tempoPausadoAcumulado = identificador utilizado para armazenar ou acessar o valor relacionado a `tempoPausadoAcumulado`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let tempoPausadoAcumulado = 0;

// Declara `inicioPausa` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// inicioPausa = identificador utilizado para armazenar ou acessar o valor relacionado a `inicioPausa`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let inicioPausa = 0;

// Declara `totalVoltas` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// totalVoltas = identificador utilizado para armazenar ou acessar o valor relacionado a `totalVoltas`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let totalVoltas = 3;

// Declara `dificuldadeAtual` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// dificuldadeAtual = identificador utilizado para armazenar ou acessar o valor relacionado a `dificuldadeAtual`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let dificuldadeAtual = 'medio';

// Declara `cenarioAtual` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// cenarioAtual = identificador utilizado para armazenar ou acessar o valor relacionado a `cenarioAtual`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let cenarioAtual = 'costa';

// Declara `carroAtual` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// carroAtual = identificador utilizado para armazenar ou acessar o valor relacionado a `carroAtual`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let carroAtual = 'veloce';

// Declara `modoAtual` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// modoAtual = identificador utilizado para armazenar ou acessar o valor relacionado a `modoAtual`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let modoAtual = 'manual';

// Declara `cameraAtual` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// cameraAtual = identificador utilizado para armazenar ou acessar o valor relacionado a `cameraAtual`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let cameraAtual = 0;

// Declara `mensagemTimer` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// mensagemTimer = identificador utilizado para armazenar ou acessar o valor relacionado a `mensagemTimer`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let mensagemTimer = 0;

// Declara `melhorVolta` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// melhorVolta = identificador utilizado para armazenar ou acessar o valor relacionado a `melhorVolta`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let melhorVolta = Infinity;

// Declara `inicioVolta` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// inicioVolta = identificador utilizado para armazenar ou acessar o valor relacionado a `inicioVolta`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let inicioVolta = 0;

// Declara `ultimaVoltaRegistrada` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// ultimaVoltaRegistrada = identificador utilizado para armazenar ou acessar o valor relacionado a `ultimaVoltaRegistrada`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let ultimaVoltaRegistrada = 0;

// Declara `posicaoAnterior` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// posicaoAnterior = identificador utilizado para armazenar ou acessar o valor relacionado a `posicaoAnterior`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let posicaoAnterior = 4;

// Declara `cameraDistanciaRender` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// cameraDistanciaRender = identificador utilizado para armazenar ou acessar o valor relacionado a `cameraDistanciaRender`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let cameraDistanciaRender = 0;

// Cria um objeto de configuração e armazena sua referência em `viewport`.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// viewport = identificador utilizado para armazenar ou acessar o valor relacionado a `viewport`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// largura = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
// altura = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
// dpr = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// } = encerra o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
let viewport = { largura: 1280, altura: 720, dpr: 1 };

// Declara `contadorContagem` e armazena nessa variável ou constante o valor calculado nesta linha.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// contadorContagem = identificador utilizado para armazenar ou acessar o valor relacionado a `contadorContagem`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
let contadorContagem = 0;

// Declara `teclas` e armazena nessa variável ou constante o valor calculado nesta linha.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// teclas = identificador utilizado para armazenar ou acessar o valor relacionado a `teclas`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// null = representa explicitamente a ausência de um valor ou objeto.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const teclas = Object.create(null);

// Cria um objeto de configuração e armazena sua referência em `toque`.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// toque = identificador utilizado para armazenar ou acessar o valor relacionado a `toque`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// esquerda = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
// direita = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
// acelerar = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
// freio = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
// turbo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
// false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// } = encerra o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
const toque = { esquerda:false, direita:false, acelerar:false, freio:false, turbo:false };

// Cria um objeto de configuração e armazena sua referência em `jogador`.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// jogador = identificador utilizado para armazenar ou acessar o valor relacionado a `jogador`.
// jogador = representa os dados e o estado do carro controlado pelo jogador.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// { = inicia o bloco de instruções ou objeto correspondente.
const jogador = {

  // Define a propriedade `nome` desta estrutura com o valor informado nesta linha.
  // nome = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // x = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // distancia = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // velocidade = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // turbo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  nome: 'Jogador', x: 0, distancia: 0, velocidade: 0, turbo: 100,

  // Define a propriedade `turboAtivo` desta estrutura com o valor informado nesta linha.
  // turboAtivo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // drift = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // velMax = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // terminou = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // tempoFim = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  turboAtivo: false, drift: false, velMax: 0, terminou: false, tempoFim: 0,

  // Define a propriedade `pontos` desta estrutura com o valor informado nesta linha.
  // pontos = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // invulneravel = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // colisaoCooldown = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // autoAlvoX = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // autoTimer = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  pontos: 0, invulneravel: 0, colisaoCooldown: 0, autoAlvoX: 0, autoTimer: 0

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
};

// Cria uma lista de valores e armazena essa coleção em `adversarios`.
// let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
// adversarios = identificador utilizado para armazenar ou acessar o valor relacionado a `adversarios`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
// ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
let adversarios = [];

// ----------------------------- BANCO INDEXEDDB -----------------------------
// Cria um objeto de configuração e armazena sua referência em `Banco`.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// Banco = identificador utilizado para armazenar ou acessar o valor relacionado a `Banco`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// { = inicia o bloco de instruções ou objeto correspondente.
const Banco = {

  // Define a propriedade `db` desta estrutura com o valor informado nesta linha.
  // db = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // null = representa explicitamente a ausência de um valor ou objeto.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  db: null,

  // Executa `abrir` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  abrir() {

    // Retorna o resultado desta linha para o ponto do programa que chamou a função atual.
    // return = encerra a função atual e devolve o valor informado.
    // new = cria uma nova instância do objeto ou classe indicado.
    // => = define uma função de seta e separa seus parâmetros do corpo.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    return new Promise((resolve, reject) => {

      // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
      // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
      // return = encerra a função atual e devolve o valor informado.
      // this = representa o objeto associado ao contexto atual de execução.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      if (this.db) return resolve(this.db);

      // Declara `req` e armazena nessa variável ou constante o valor calculado nesta linha.
      // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
      // req = identificador utilizado para armazenar ou acessar o valor relacionado a `req`.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      const req = indexedDB.open('CorridaVelocidadeTotalDB', 1);

      // Atualiza `req.onupgradeneeded` com o valor calculado ou informado nesta linha.
      // => = define uma função de seta e separa seus parâmetros do corpo.
      // > = operador de comparação que verifica se o valor da esquerda é maior.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // { = inicia o bloco de instruções ou objeto correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      req.onupgradeneeded = () => {

        // Declara `db` e armazena nessa variável ou constante o valor calculado nesta linha.
        // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
        // db = identificador utilizado para armazenar ou acessar o valor relacionado a `db`.
        // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        const db = req.result;

        // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
        // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
        // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // { = inicia o bloco de instruções ou objeto correspondente.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        if (!db.objectStoreNames.contains('resultados')) {

          // Declara `store` e armazena nessa variável ou constante o valor calculado nesta linha.
          // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
          // store = identificador utilizado para armazenar ou acessar o valor relacionado a `store`.
          // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
          // keyPath = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
          // autoIncrement = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
          // true = valor lógico verdadeiro utilizado para ativar ou confirmar a condição correspondente.
          // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
          // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
          // { = inicia o bloco de instruções ou objeto correspondente.
          // } = encerra o bloco de instruções ou objeto correspondente.
          // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
          // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
          const store = db.createObjectStore('resultados', { keyPath:'id', autoIncrement:true });

          // Executa `store.createIndex` com os argumentos informados nesta linha.
          // unique = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
          // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
          // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
          // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
          // { = inicia o bloco de instruções ou objeto correspondente.
          // } = encerra o bloco de instruções ou objeto correspondente.
          // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
          // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
          store.createIndex('nome', 'nome', { unique:false });

          // Executa `store.createIndex` com os argumentos informados nesta linha.
          // unique = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
          // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
          // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
          // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
          // { = inicia o bloco de instruções ou objeto correspondente.
          // } = encerra o bloco de instruções ou objeto correspondente.
          // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
          // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
          store.createIndex('data', 'data', { unique:false });

        // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
        // } = encerra o bloco de instruções ou objeto correspondente.
        }

      // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
      // } = encerra o bloco de instruções ou objeto correspondente.
      };

      // Atualiza `req.onsuccess` com o valor calculado ou informado nesta linha.
      // this = representa o objeto associado ao contexto atual de execução.
      // => = define uma função de seta e separa seus parâmetros do corpo.
      // > = operador de comparação que verifica se o valor da esquerda é maior.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // { = inicia o bloco de instruções ou objeto correspondente.
      // } = encerra o bloco de instruções ou objeto correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      req.onsuccess = () => { this.db = req.result; resolve(this.db); };

      // Atualiza `req.onerror` com o valor calculado ou informado nesta linha.
      // => = define uma função de seta e separa seus parâmetros do corpo.
      // > = operador de comparação que verifica se o valor da esquerda é maior.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      req.onerror = () => reject(req.error);

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    });

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  },

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // async = indica que a função pode trabalhar com operações assíncronas.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  async salvar(resultado) {

    // Inicia um bloco protegido para executar instruções que podem gerar erro.
    // try = inicia um bloco protegido contra erros.
    // { = inicia o bloco de instruções ou objeto correspondente.
    try {

      // Declara `db` e armazena nessa variável ou constante o valor calculado nesta linha.
      // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
      // this = representa o objeto associado ao contexto atual de execução.
      // db = identificador utilizado para armazenar ou acessar o valor relacionado a `db`.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      const db = await this.abrir();

      // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
      // new = cria uma nova instância do objeto ou classe indicado.
      // => = define uma função de seta e separa seus parâmetros do corpo.
      // > = operador de comparação que verifica se o valor da esquerda é maior.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // { = inicia o bloco de instruções ou objeto correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      await new Promise((resolve, reject) => {

        // Declara `tx` e armazena nessa variável ou constante o valor calculado nesta linha.
        // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
        // tx = identificador utilizado para armazenar ou acessar o valor relacionado a `tx`.
        // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
        // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        const tx = db.transaction('resultados', 'readwrite');

        // Executa `tx.objectStore` com os argumentos informados nesta linha.
        // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        tx.objectStore('resultados').add(resultado);

        // Atualiza `tx.oncomplete` com o valor calculado ou informado nesta linha.
        // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        tx.oncomplete = resolve;

        // Atualiza `tx.onerror` com o valor calculado ou informado nesta linha.
        // => = define uma função de seta e separa seus parâmetros do corpo.
        // > = operador de comparação que verifica se o valor da esquerda é maior.
        // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        tx.onerror = () => reject(tx.error);

      // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // } = encerra o bloco de instruções ou objeto correspondente.
      });

    // Captura um erro ocorrido no bloco protegido para permitir seu tratamento.
    // catch = captura o erro ocorrido no bloco try.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    } catch (erro) {

      // Executa `console.warn` com os argumentos informados nesta linha.
      // ranking = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      console.warn('Não foi possível salvar o ranking:', erro);

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  },

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // async = indica que a função pode trabalhar com operações assíncronas.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  async listar() {

    // Inicia um bloco protegido para executar instruções que podem gerar erro.
    // try = inicia um bloco protegido contra erros.
    // { = inicia o bloco de instruções ou objeto correspondente.
    try {

      // Declara `db` e armazena nessa variável ou constante o valor calculado nesta linha.
      // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
      // this = representa o objeto associado ao contexto atual de execução.
      // db = identificador utilizado para armazenar ou acessar o valor relacionado a `db`.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      const db = await this.abrir();

      // Retorna o resultado desta linha para o ponto do programa que chamou a função atual.
      // return = encerra a função atual e devolve o valor informado.
      // new = cria uma nova instância do objeto ou classe indicado.
      // => = define uma função de seta e separa seus parâmetros do corpo.
      // > = operador de comparação que verifica se o valor da esquerda é maior.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // { = inicia o bloco de instruções ou objeto correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      return await new Promise((resolve, reject) => {

        // Declara `tx` e armazena nessa variável ou constante o valor calculado nesta linha.
        // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
        // tx = identificador utilizado para armazenar ou acessar o valor relacionado a `tx`.
        // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
        // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        const tx = db.transaction('resultados', 'readonly');

        // Declara `req` e armazena nessa variável ou constante o valor calculado nesta linha.
        // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
        // req = identificador utilizado para armazenar ou acessar o valor relacionado a `req`.
        // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
        // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        const req = tx.objectStore('resultados').getAll();

        // Atualiza `req.onsuccess` com o valor calculado ou informado nesta linha.
        // => = define uma função de seta e separa seus parâmetros do corpo.
        // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
        // > = operador de comparação que verifica se o valor da esquerda é maior.
        // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
        // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        req.onsuccess = () => resolve(req.result || []);

        // Atualiza `req.onerror` com o valor calculado ou informado nesta linha.
        // => = define uma função de seta e separa seus parâmetros do corpo.
        // > = operador de comparação que verifica se o valor da esquerda é maior.
        // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        req.onerror = () => reject(req.error);

      // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // } = encerra o bloco de instruções ou objeto correspondente.
      });

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // catch = captura o erro ocorrido no bloco try.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    } catch {

      // Retorna o resultado desta linha para o ponto do programa que chamou a função atual.
      // return = encerra a função atual e devolve o valor informado.
      // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
      // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
      return [];

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  },

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // async = indica que a função pode trabalhar com operações assíncronas.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  async limpar() {

    // Declara `db` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // this = representa o objeto associado ao contexto atual de execução.
    // db = identificador utilizado para armazenar ou acessar o valor relacionado a `db`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const db = await this.abrir();

    // Retorna o resultado desta linha para o ponto do programa que chamou a função atual.
    // return = encerra a função atual e devolve o valor informado.
    // new = cria uma nova instância do objeto ou classe indicado.
    // => = define uma função de seta e separa seus parâmetros do corpo.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    return new Promise((resolve, reject) => {

      // Declara `tx` e armazena nessa variável ou constante o valor calculado nesta linha.
      // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
      // tx = identificador utilizado para armazenar ou acessar o valor relacionado a `tx`.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      const tx = db.transaction('resultados', 'readwrite');

      // Executa `tx.objectStore` com os argumentos informados nesta linha.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      tx.objectStore('resultados').clear();

      // Atualiza `tx.oncomplete` com o valor calculado ou informado nesta linha.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      tx.oncomplete = resolve;

      // Atualiza `tx.onerror` com o valor calculado ou informado nesta linha.
      // => = define uma função de seta e separa seus parâmetros do corpo.
      // > = operador de comparação que verifica se o valor da esquerda é maior.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      tx.onerror = () => reject(tx.error);

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    });

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
};

// ----------------------------- SOM COM WEB AUDIO -----------------------------
// Cria um objeto de configuração e armazena sua referência em `AudioJogo`.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// AudioJogo = identificador utilizado para armazenar ou acessar o valor relacionado a `AudioJogo`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// { = inicia o bloco de instruções ou objeto correspondente.
const AudioJogo = {

  // Define a propriedade `contexto` desta estrutura com o valor informado nesta linha.
  // contexto = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // motorOsc = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // motorGain = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // filtro = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // null = representa explicitamente a ausência de um valor ou objeto.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  contexto: null, motorOsc: null, motorGain: null, filtro: null,

  // Executa `iniciar` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  iniciar() {

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // this = representa o objeto associado ao contexto atual de execução.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if (this.contexto) {

      // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
      // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
      // this = representa o objeto associado ao contexto atual de execução.
      // === = operador de comparação estrita que verifica valor e tipo.
      // == = operador de comparação que verifica igualdade de valores.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      if (this.contexto.state === 'suspended') this.contexto.resume();

      // Encerra a execução da função atual e retorna o controle para o ponto que realizou a chamada.
      // return = encerra a função atual e devolve o valor informado.
      return;

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

    // Declara `AC` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // AC = identificador utilizado para armazenar ou acessar o valor relacionado a `AC`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const AC = window.AudioContext || window.webkitAudioContext;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // return = encerra a função atual e devolve o valor informado.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    if (!AC) return;

    // Atualiza `this.contexto` com o valor calculado ou informado nesta linha.
    // new = cria uma nova instância do objeto ou classe indicado.
    // this = representa o objeto associado ao contexto atual de execução.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    this.contexto = new AC();

    // Atualiza `this.motorOsc` com o valor calculado ou informado nesta linha.
    // this = representa o objeto associado ao contexto atual de execução.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    this.motorOsc = this.contexto.createOscillator();

    // Atualiza `this.motorGain` com o valor calculado ou informado nesta linha.
    // this = representa o objeto associado ao contexto atual de execução.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    this.motorGain = this.contexto.createGain();

    // Atualiza `this.filtro` com o valor calculado ou informado nesta linha.
    // this = representa o objeto associado ao contexto atual de execução.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    this.filtro = this.contexto.createBiquadFilter();

    // Atualiza `this.motorOsc.type` com o valor calculado ou informado nesta linha.
    // this = representa o objeto associado ao contexto atual de execução.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    this.motorOsc.type = 'sawtooth';

    // Atualiza `this.motorOsc.frequency.value` com o valor calculado ou informado nesta linha.
    // this = representa o objeto associado ao contexto atual de execução.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    this.motorOsc.frequency.value = 55;

    // Atualiza `this.filtro.type` com o valor calculado ou informado nesta linha.
    // this = representa o objeto associado ao contexto atual de execução.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    this.filtro.type = 'lowpass';

    // Atualiza `this.filtro.frequency.value` com o valor calculado ou informado nesta linha.
    // this = representa o objeto associado ao contexto atual de execução.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    this.filtro.frequency.value = 420;

    // Atualiza `this.motorGain.gain.value` com o valor calculado ou informado nesta linha.
    // this = representa o objeto associado ao contexto atual de execução.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    this.motorGain.gain.value = 0.0001;

    // Executa `this.motorOsc.connect` com os argumentos informados nesta linha.
    // this = representa o objeto associado ao contexto atual de execução.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    this.motorOsc.connect(this.filtro).connect(this.motorGain).connect(this.contexto.destination);

    // Executa `this.motorOsc.start` com os argumentos informados nesta linha.
    // this = representa o objeto associado ao contexto atual de execução.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    this.motorOsc.start();

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  },

  // Executa `atualizarMotor` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  atualizarMotor(normalizado) {

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // return = encerra a função atual e devolve o valor informado.
    // this = representa o objeto associado ao contexto atual de execução.
    // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if (!this.contexto || !this.motorOsc) return;

    // Declara `agora` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // this = representa o objeto associado ao contexto atual de execução.
    // agora = identificador utilizado para armazenar ou acessar o valor relacionado a `agora`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const agora = this.contexto.currentTime;

    // Executa `this.motorOsc.frequency.setTargetAtTime` com os argumentos informados nesta linha.
    // this = representa o objeto associado ao contexto atual de execução.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    this.motorOsc.frequency.setTargetAtTime(55 + normalizado * 132, agora, 0.045);

    // Executa `this.filtro.frequency.setTargetAtTime` com os argumentos informados nesta linha.
    // this = representa o objeto associado ao contexto atual de execução.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    this.filtro.frequency.setTargetAtTime(350 + normalizado * 1300, agora, 0.05);

    // Executa `this.motorGain.gain.setTargetAtTime` com os argumentos informados nesta linha.
    // this = representa o objeto associado ao contexto atual de execução.
    // === = operador de comparação estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    this.motorGain.gain.setTargetAtTime(estado === 'corrida' ? 0.024 + normalizado * 0.035 : 0.005, agora, 0.05);

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  },

  // Executa `bip` com os argumentos informados nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  bip(freq=440, dur=0.12, volume=0.08, tipo='sine') {

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // return = encerra a função atual e devolve o valor informado.
    // this = representa o objeto associado ao contexto atual de execução.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if (!this.contexto) return;

    // Declara `o` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // this = representa o objeto associado ao contexto atual de execução.
    // o = identificador utilizado para armazenar ou acessar o valor relacionado a `o`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const o = this.contexto.createOscillator();

    // Declara `g` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // this = representa o objeto associado ao contexto atual de execução.
    // g = identificador utilizado para armazenar ou acessar o valor relacionado a `g`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const g = this.contexto.createGain();

    // Atualiza `o.type` com o valor calculado ou informado nesta linha.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    o.type = tipo;

    // Atualiza `o.frequency.value` com o valor calculado ou informado nesta linha.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    o.frequency.value = freq;

    // Executa `g.gain.setValueAtTime` com os argumentos informados nesta linha.
    // this = representa o objeto associado ao contexto atual de execução.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    g.gain.setValueAtTime(volume, this.contexto.currentTime);

    // Executa `g.gain.exponentialRampToValueAtTime` com os argumentos informados nesta linha.
    // this = representa o objeto associado ao contexto atual de execução.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    g.gain.exponentialRampToValueAtTime(0.0001, this.contexto.currentTime + dur);

    // Executa `o.connect` com os argumentos informados nesta linha.
    // this = representa o objeto associado ao contexto atual de execução.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    o.connect(g).connect(this.contexto.destination);

    // Executa `o.start` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    o.start();

    // Executa `o.stop` com os argumentos informados nesta linha.
    // this = representa o objeto associado ao contexto atual de execução.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    o.stop(this.contexto.currentTime + dur);

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  },

  // Executa `colisao` com os argumentos informados nesta linha.
  // this = representa o objeto associado ao contexto atual de execução.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  colisao() { this.bip(90, .18, .12, 'square'); },

  // Executa `turbo` com os argumentos informados nesta linha.
  // this = representa o objeto associado ao contexto atual de execução.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  turbo() { this.bip(220, .07, .035, 'sawtooth'); },

  // Executa `volta` com os argumentos informados nesta linha.
  // this = representa o objeto associado ao contexto atual de execução.
  // setTimeout = agenda a execução de uma função depois do intervalo informado.
  // => = define uma função de seta e separa seus parâmetros do corpo.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  volta() { this.bip(740,.12,.09); setTimeout(()=>this.bip(980,.18,.09),100); },

  // Executa `vitoria` com os argumentos informados nesta linha.
  // this = representa o objeto associado ao contexto atual de execução.
  // .forEach = executa a função informada para cada elemento da coleção.
  // setTimeout = agenda a execução de uma função depois do intervalo informado.
  // => = define uma função de seta e separa seus parâmetros do corpo.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  vitoria() { [523,659,784,1046].forEach((f,i)=>setTimeout(()=>this.bip(f,.3,.08),i*130)); }

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
};

// ----------------------------- FUNÇÕES MATEMÁTICAS -----------------------------
// Declara `limitar` e armazena nessa variável ou constante o valor calculado nesta linha.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// limitar = identificador utilizado para armazenar ou acessar o valor relacionado a `limitar`.
// Math.min = retorna o menor valor entre os valores informados.
// Math.max = retorna o maior valor entre os valores informados.
// => = define uma função de seta e separa seus parâmetros do corpo.
// > = operador de comparação que verifica se o valor da esquerda é maior.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const limitar = (v, min, max) => Math.max(min, Math.min(max, v));

// Declara `interpolar` e armazena nessa variável ou constante o valor calculado nesta linha.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// interpolar = identificador utilizado para armazenar ou acessar o valor relacionado a `interpolar`.
// => = define uma função de seta e separa seus parâmetros do corpo.
// > = operador de comparação que verifica se o valor da esquerda é maior.
// + = operador utilizado para soma numérica ou concatenação de textos.
// - = operador utilizado para subtração ou representação de valor negativo.
// * = operador utilizado para multiplicação.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
const interpolar = (a, b, t) => a + (b - a) * t;

// Declara `easeIn` e armazena nessa variável ou constante o valor calculado nesta linha.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// easeIn = identificador utilizado para armazenar ou acessar o valor relacionado a `easeIn`.
// => = define uma função de seta e separa seus parâmetros do corpo.
// > = operador de comparação que verifica se o valor da esquerda é maior.
// + = operador utilizado para soma numérica ou concatenação de textos.
// - = operador utilizado para subtração ou representação de valor negativo.
// * = operador utilizado para multiplicação.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const easeIn = (a, b, t) => a + (b-a) * Math.pow(t, 2);

// Declara `easeOut` e armazena nessa variável ou constante o valor calculado nesta linha.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// easeOut = identificador utilizado para armazenar ou acessar o valor relacionado a `easeOut`.
// => = define uma função de seta e separa seus parâmetros do corpo.
// > = operador de comparação que verifica se o valor da esquerda é maior.
// + = operador utilizado para soma numérica ou concatenação de textos.
// - = operador utilizado para subtração ou representação de valor negativo.
// * = operador utilizado para multiplicação.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const easeOut = (a, b, t) => a + (b-a) * (1 - Math.pow(1-t, 2));

// Declara `easeInOut` e armazena nessa variável ou constante o valor calculado nesta linha.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// easeInOut = identificador utilizado para armazenar ou acessar o valor relacionado a `easeInOut`.
// Math.PI = constante que representa o valor de pi.
// Math.cos = calcula o cosseno do ângulo informado.
// => = define uma função de seta e separa seus parâmetros do corpo.
// > = operador de comparação que verifica se o valor da esquerda é maior.
// + = operador utilizado para soma numérica ou concatenação de textos.
// - = operador utilizado para subtração ou representação de valor negativo.
// * = operador utilizado para multiplicação.
// / = operador utilizado para divisão.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
const easeInOut = (a, b, t) => a + (b-a) * ((-Math.cos(t*Math.PI)/2)+0.5);

// Declara `mod` e armazena nessa variável ou constante o valor calculado nesta linha.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// mod = identificador utilizado para armazenar ou acessar o valor relacionado a `mod`.
// => = define uma função de seta e separa seus parâmetros do corpo.
// > = operador de comparação que verifica se o valor da esquerda é maior.
// + = operador utilizado para soma numérica ou concatenação de textos.
// % = operador utilizado para obter o resto de uma divisão.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
const mod = (n, m) => ((n % m) + m) % m;

// Declara `percentualNoSegmento` e armazena nessa variável ou constante o valor calculado nesta linha.
// const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
// percentualNoSegmento = identificador utilizado para armazenar ou acessar o valor relacionado a `percentualNoSegmento`.
// => = define uma função de seta e separa seus parâmetros do corpo.
// > = operador de comparação que verifica se o valor da esquerda é maior.
// / = operador utilizado para divisão.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
const percentualNoSegmento = z => mod(z, SEGMENTO) / SEGMENTO;

// Define a função `formatarTempo`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// formatarTempo = nome atribuído à função definida nesta linha.
// ms = parâmetro recebido pela função para fornecer o valor relacionado a `ms`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function formatarTempo(ms) {

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  if (!isFinite(ms) || ms < 0) ms = 0;

  // Declara `min` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // min = identificador utilizado para armazenar ou acessar o valor relacionado a `min`.
  // Math.floor = arredonda o valor para baixo.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const min = Math.floor(ms / 60000);

  // Declara `seg` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // seg = identificador utilizado para armazenar ou acessar o valor relacionado a `seg`.
  // Math.floor = arredonda o valor para baixo.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // / = operador utilizado para divisão.
  // % = operador utilizado para obter o resto de uma divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const seg = Math.floor((ms % 60000) / 1000);

  // Declara `mil` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // mil = identificador utilizado para armazenar ou acessar o valor relacionado a `mil`.
  // Math.floor = arredonda o valor para baixo.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // % = operador utilizado para obter o resto de uma divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const mil = Math.floor(ms % 1000);

  // Retorna o resultado desta linha para o ponto do programa que chamou a função atual.
  // return = encerra a função atual e devolve o valor informado.
  // .padStart = preenche o início do texto até alcançar o tamanho informado.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  return `${String(min).padStart(2,'0')}:${String(seg).padStart(2,'0')}.${String(mil).padStart(3,'0')}`;

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `ordinal`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// return = encerra a função atual e devolve o valor informado.
// ordinal = nome atribuído à função definida nesta linha.
// n = parâmetro recebido pela função para fornecer o valor relacionado a `n`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// } = encerra o bloco de instruções ou objeto correspondente.
function ordinal(n) { return `${n}º`; }

// ----------------------------- CONSTRUÇÃO DAS PISTAS -----------------------------
// Define a função `ultimoY`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// ultimoY = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function ultimoY() {

  // Retorna o resultado desta linha para o ponto do programa que chamou a função atual.
  // return = encerra a função atual e devolve o valor informado.
  // segmentos = representa a coleção de segmentos que formam a pista.
  // y = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  return segmentos.length ? segmentos[segmentos.length - 1].p2.world.y : 0;

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `adicionarSegmento`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// adicionarSegmento = nome atribuído à função definida nesta linha.
// curva = parâmetro recebido pela função para fornecer o valor relacionado a `curva`.
// y = parâmetro recebido pela função para fornecer o valor relacionado a `y`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function adicionarSegmento(curva, y) {

  // Declara `n` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // n = identificador utilizado para armazenar ou acessar o valor relacionado a `n`.
  // segmentos = representa a coleção de segmentos que formam a pista.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const n = segmentos.length;

  // Executa `segmentos.push` com os argumentos informados nesta linha.
  // .push = adiciona um novo elemento ao final do array.
  // segmentos = representa a coleção de segmentos que formam a pista.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  segmentos.push({

    // Define a propriedade `index` desta estrutura com o valor informado nesta linha.
    // index = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    index:n,

    // Define a propriedade `p1` desta estrutura com o valor informado nesta linha.
    // p1 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // world = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // x = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // y = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // z = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // camera = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // screen = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    p1:{ world:{x:0, y:ultimoY(), z:n*SEGMENTO}, camera:{}, screen:{} },

    // Define a propriedade `p2` desta estrutura com o valor informado nesta linha.
    // p2 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // world = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // x = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // y = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // z = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // camera = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // screen = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    p2:{ world:{x:0, y:y, z:(n+1)*SEGMENTO}, camera:{}, screen:{} },

    // Define a propriedade `curve` desta estrutura com o valor informado nesta linha.
    // curve = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    curve:curva,

    // Define a propriedade `cor` desta estrutura com o valor informado nesta linha.
    // Math.floor = arredonda o valor para baixo.
    // cor = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // / = operador utilizado para divisão.
    // % = operador utilizado para obter o resto de uma divisão.
    // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    cor: Math.floor(n/3)%2 ? 0 : 1,

    // Define a propriedade `looped` desta estrutura com o valor informado nesta linha.
    // looped = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    looped:false,

    // Define a propriedade `visivel` desta estrutura com o valor informado nesta linha.
    // visivel = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
    visivel:false

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  });

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `adicionarTrecho`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// adicionarTrecho = nome atribuído à função definida nesta linha.
// entrada = parâmetro recebido pela função para fornecer o valor relacionado a `entrada`.
// manter = parâmetro recebido pela função para fornecer o valor relacionado a `manter`.
// saida = parâmetro recebido pela função para fornecer o valor relacionado a `saida`.
// curva = parâmetro recebido pela função para fornecer o valor relacionado a `curva`.
// elevacao = parâmetro recebido pela função para fornecer o valor relacionado a `elevacao`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function adicionarTrecho(entrada, manter, saida, curva=0, elevacao=0) {

  // Declara `yInicial` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // yInicial = identificador utilizado para armazenar ou acessar o valor relacionado a `yInicial`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  const yInicial = ultimoY();

  // Declara `yFinal` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // yFinal = identificador utilizado para armazenar ou acessar o valor relacionado a `yFinal`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // * = operador utilizado para multiplicação.
  const yFinal = yInicial + elevacao * SEGMENTO;

  // Declara `total` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // total = identificador utilizado para armazenar ou acessar o valor relacionado a `total`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  const total = entrada + manter + saida;

  // Declara `n` e armazena nessa variável ou constante o valor calculado nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // n = identificador utilizado para armazenar ou acessar o valor relacionado a `n`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  let n = 0;

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // for = inicia uma estrutura de repetição.
  // Math.max = retorna o maior valor entre os valores informados.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  for (; n < entrada; n++) adicionarSegmento(easeIn(0, curva, n/Math.max(1,entrada)), easeInOut(yInicial,yFinal,n/Math.max(1,total)));

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // for = inicia uma estrutura de repetição.
  // Math.max = retorna o maior valor entre os valores informados.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  for (; n < entrada+manter; n++) adicionarSegmento(curva, easeInOut(yInicial,yFinal,n/Math.max(1,total)));

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // for = inicia uma estrutura de repetição.
  // Math.max = retorna o maior valor entre os valores informados.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  for (; n < total; n++) adicionarSegmento(easeOut(curva,0,(n-entrada-manter)/Math.max(1,saida)), easeInOut(yInicial,yFinal,n/Math.max(1,total)));

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `construirPista`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// construirPista = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function construirPista() {

  // Atualiza `segmentos` com o valor calculado ou informado nesta linha.
  // segmentos = representa a coleção de segmentos que formam a pista.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  segmentos = [];

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  if (cenarioAtual === 'serra') {

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    adicionarTrecho(28, 70, 24, 0, 12);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(18, 48, 18, .82, 26);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(18, 42, 18, -.98, -10);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(20, 55, 20, 1.18, 32);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(22, 65, 22, -.52, -28);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(16, 38, 16, -1.45, 18);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(18, 48, 18, .68, -16);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(22, 70, 22, .25, 14);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(18, 46, 18, 1.35, -22);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(20, 58, 20, -.90, 5);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    adicionarTrecho(30, 84, 30, 0, -5);

  // Testa uma condição alternativa quando a condição anterior não foi atendida.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // else = define uma alternativa para uma condição anterior.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  } else if (cenarioAtual === 'neon') {

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    adicionarTrecho(36, 95, 28, 0, 0);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(20, 58, 20, .62, 0);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(22, 70, 22, -.72, 4);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    adicionarTrecho(28, 88, 28, 0, -4);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(18, 50, 18, 1.22, 0);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(18, 52, 18, -1.18, 0);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(34, 100, 34, .18, 0);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(20, 55, 20, .84, 0);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(24, 75, 24, -.58, 0);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    adicionarTrecho(36, 104, 36, 0, 0);

  // Testa uma condição alternativa quando a condição anterior não foi atendida.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // else = define uma alternativa para uma condição anterior.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  } else if (cenarioAtual === 'canion') {

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    adicionarTrecho(38, 120, 32, 0, 0);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(18, 46, 18, 1.42, 20);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    adicionarTrecho(34, 110, 30, 0, -10);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(18, 44, 18, -1.55, 14);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(30, 90, 26, .25, -6);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(16, 40, 16, 1.68, 8);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    adicionarTrecho(34, 115, 34, 0, 0);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(18, 50, 18, -.96, -18);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    adicionarTrecho(40, 125, 36, 0, -8);

  // Define o bloco alternativo executado quando as condições anteriores não forem atendidas.
  // else = define uma alternativa para uma condição anterior.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  } else {

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    adicionarTrecho(30, 70, 30, 0, 0);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(20, 60, 25, .65, 18);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(18, 45, 18, -1.05, -8);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(20, 55, 20, .28, 0);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(18, 42, 18, 1.35, 25);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(22, 56, 22, -.58, -25);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(20, 65, 20, -1.15, 10);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(18, 45, 18, .82, 0);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    adicionarTrecho(24, 72, 24, 0, 16);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(16, 44, 16, 1.55, -18);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(18, 50, 18, -1.35, 0);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    adicionarTrecho(22, 70, 22, .45, 5);

    // Executa `adicionarTrecho` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    adicionarTrecho(28, 80, 28, 0, -5);

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Atualiza `comprimentoPista` com o valor calculado ou informado nesta linha.
  // segmentos = representa a coleção de segmentos que formam a pista.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  comprimentoPista = segmentos.length * SEGMENTO;

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `acharSegmento`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// acharSegmento = nome atribuído à função definida nesta linha.
// z = parâmetro recebido pela função para fornecer o valor relacionado a `z`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function acharSegmento(z) {

  // Retorna o resultado desta linha para o ponto do programa que chamou a função atual.
  // return = encerra a função atual e devolve o valor informado.
  // Math.floor = arredonda o valor para baixo.
  // segmentos = representa a coleção de segmentos que formam a pista.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  return segmentos[Math.floor(mod(z, comprimentoPista) / SEGMENTO)];

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// ----------------------------- PROJEÇÃO PSEUDO-3D -----------------------------
// Define a função `projetar`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// projetar = nome atribuído à função definida nesta linha.
// p = parâmetro recebido pela função para fornecer o valor relacionado a `p`.
// cameraX = parâmetro recebido pela função para fornecer o valor relacionado a `cameraX`.
// cameraY = parâmetro recebido pela função para fornecer o valor relacionado a `cameraY`.
// cameraZ = parâmetro recebido pela função para fornecer o valor relacionado a `cameraZ`.
// largura = parâmetro recebido pela função para fornecer o valor relacionado a `largura`.
// altura = parâmetro recebido pela função para fornecer o valor relacionado a `altura`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function projetar(p, cameraX, cameraY, cameraZ, largura, altura) {

  // Atualiza `p.camera.x` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  p.camera.x = p.world.x - cameraX;

  // Atualiza `p.camera.y` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  p.camera.y = p.world.y - cameraY;

  // Atualiza `p.camera.z` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  p.camera.z = p.world.z - cameraZ;

  // Declara `z` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // z = identificador utilizado para armazenar ou acessar o valor relacionado a `z`.
  // Math.max = retorna o maior valor entre os valores informados.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const z = Math.max(0.0001, p.camera.z);

  // Atualiza `p.screen.scale` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // / = operador utilizado para divisão.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  p.screen.scale = PROFUNDIDADE_CAMERA / z;

  // Atualiza `p.screen.x` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // * = operador utilizado para multiplicação.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  p.screen.x = (largura/2) + (p.screen.scale * p.camera.x * largura/2);

  // Atualiza `p.screen.y` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  p.screen.y = (altura/2) - (p.screen.scale * p.camera.y * altura/2);

  // Atualiza `p.screen.w` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // / = operador utilizado para divisão.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  p.screen.w = p.screen.scale * LARGURA_PISTA * largura/2;

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `poligono`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// poligono = nome atribuído à função definida nesta linha.
// cor = parâmetro recebido pela função para fornecer o valor relacionado a `cor`.
// ...pontos = parâmetro recebido pela função para fornecer o valor relacionado a `...pontos`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
function poligono(cor, ...pontos) {

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle = cor;

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.beginPath();

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.moveTo(pontos[0], pontos[1]);

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // for = inicia uma estrutura de repetição.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // += = operador de atribuição que soma o valor da direita ao valor atual.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  for (let i=2; i<pontos.length; i+=2) ctx.lineTo(pontos[i], pontos[i+1]);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.closePath();

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fill();

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `desenharSegmento`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// desenharSegmento = nome atribuído à função definida nesta linha.
// segmento = parâmetro recebido pela função para fornecer o valor relacionado a `segmento`.
// largura = parâmetro recebido pela função para fornecer o valor relacionado a `largura`.
// faixaDupla = parâmetro recebido pela função para fornecer o valor relacionado a `faixaDupla`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function desenharSegmento(segmento, largura, faixaDupla) {

  // Declara `p1` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // p1 = identificador utilizado para armazenar ou acessar o valor relacionado a `p1`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const p1 = segmento.p1.screen;

  // Declara `p2` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // p2 = identificador utilizado para armazenar ou acessar o valor relacionado a `p2`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const p2 = segmento.p2.screen;

  // Declara `paleta` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // paleta = identificador utilizado para armazenar ou acessar o valor relacionado a `paleta`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const paleta = CENARIOS[cenarioAtual].paleta;

  // Declara `gramado` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // gramado = identificador utilizado para armazenar ou acessar o valor relacionado a `gramado`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // grama1 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const gramado = segmento.cor ? paleta.grama1 : paleta.grama2;

  // Declara `asfalto` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // asfalto = identificador utilizado para armazenar ou acessar o valor relacionado a `asfalto`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // asfalto1 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const asfalto = segmento.cor ? paleta.asfalto1 : paleta.asfalto2;

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle = gramado;

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // Math.max = retorna o maior valor entre os valores informados.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillRect(0, p2.y, largura, Math.max(1, p1.y - p2.y));

  // Declara `z1` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // z1 = identificador utilizado para armazenar ou acessar o valor relacionado a `z1`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const z1 = p1.w * 1.15;

  // Declara `z2` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // z2 = identificador utilizado para armazenar ou acessar o valor relacionado a `z2`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const z2 = p2.w * 1.15;

  // Declara `zebra` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // zebra = identificador utilizado para armazenar ou acessar o valor relacionado a `zebra`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // zebra1 = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const zebra = segmento.cor ? paleta.zebra1 : paleta.zebra2;

  // Executa `poligono` com os argumentos informados nesta linha.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  poligono(zebra, p1.x-z1,p1.y, p1.x-p1.w,p1.y, p2.x-p2.w,p2.y, p2.x-z2,p2.y);

  // Executa `poligono` com os argumentos informados nesta linha.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  poligono(zebra, p1.x+p1.w,p1.y, p1.x+z1,p1.y, p2.x+z2,p2.y, p2.x+p2.w,p2.y);

  // Executa `poligono` com os argumentos informados nesta linha.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  poligono(asfalto, p1.x-p1.w,p1.y, p1.x+p1.w,p1.y, p2.x+p2.w,p2.y, p2.x-p2.w,p2.y);

  // Declara `marca1` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // marca1 = identificador utilizado para armazenar ou acessar o valor relacionado a `marca1`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const marca1 = p1.w * 0.014;

  // Declara `marca2` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // marca2 = identificador utilizado para armazenar ou acessar o valor relacionado a `marca2`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const marca2 = p2.w * 0.014;

  // Declara `centro1` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // centro1 = identificador utilizado para armazenar ou acessar o valor relacionado a `centro1`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const centro1 = p1.w * 0.02;

  // Declara `centro2` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // centro2 = identificador utilizado para armazenar ou acessar o valor relacionado a `centro2`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const centro2 = p2.w * 0.02;

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  if (faixaDupla) {

    // Executa `poligono` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // rgba(255,255,255,.82) = define aproximadamente a cor branco pelos canais vermelho, verde e azul com alfa .82.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    poligono('rgba(255,255,255,.82)', p1.x-centro1-marca1,p1.y,p1.x-centro1,p1.y,p2.x-centro2,p2.y,p2.x-centro2-marca2,p2.y);

    // Executa `poligono` com os argumentos informados nesta linha.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // rgba(255,255,255,.82) = define aproximadamente a cor branco pelos canais vermelho, verde e azul com alfa .82.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    poligono('rgba(255,255,255,.82)', p1.x+centro1,p1.y,p1.x+centro1+marca1,p1.y,p2.x+centro2+marca2,p2.y,p2.x+centro2,p2.y);

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Declara `margem1` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // margem1 = identificador utilizado para armazenar ou acessar o valor relacionado a `margem1`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const margem1=p1.w*.93;

  // Declara `margem2` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // margem2 = identificador utilizado para armazenar ou acessar o valor relacionado a `margem2`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const margem2=p2.w*.93;

  // Executa `poligono` com os argumentos informados nesta linha.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // rgba(255,255,255,.72) = define aproximadamente a cor branco pelos canais vermelho, verde e azul com alfa .72.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  poligono('rgba(255,255,255,.72)', p1.x-margem1-marca1,p1.y,p1.x-margem1,p1.y,p2.x-margem2,p2.y,p2.x-margem2-marca2,p2.y);

  // Executa `poligono` com os argumentos informados nesta linha.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // rgba(255,255,255,.72) = define aproximadamente a cor branco pelos canais vermelho, verde e azul com alfa .72.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  poligono('rgba(255,255,255,.72)', p1.x+margem1,p1.y,p1.x+margem1+marca1,p1.y,p2.x+margem2+marca2,p2.y,p2.x+margem2,p2.y);

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// ----------------------------- CENÁRIOS -----------------------------
// Define a função `preencherGradienteVertical`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// preencherGradienteVertical = nome atribuído à função definida nesta linha.
// largura = parâmetro recebido pela função para fornecer o valor relacionado a `largura`.
// altura = parâmetro recebido pela função para fornecer o valor relacionado a `altura`.
// cores = parâmetro recebido pela função para fornecer o valor relacionado a `cores`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function preencherGradienteVertical(largura, altura, cores) {

  // Declara `grad` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // grad = identificador utilizado para armazenar ou acessar o valor relacionado a `grad`.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const grad = ctx.createLinearGradient(0,0,0,altura);

  // Executa `cores.forEach` com os argumentos informados nesta linha.
  // .forEach = executa a função informada para cada elemento da coleção.
  // => = define uma função de seta e separa seus parâmetros do corpo.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  cores.forEach(([p,c]) => grad.addColorStop(p,c));

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle = grad;

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillRect(0,0,largura,altura);

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `desenharDiscoSol`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// desenharDiscoSol = nome atribuído à função definida nesta linha.
// x = parâmetro recebido pela função para fornecer o valor relacionado a `x`.
// y = parâmetro recebido pela função para fornecer o valor relacionado a `y`.
// raio = parâmetro recebido pela função para fornecer o valor relacionado a `raio`.
// corCentro = parâmetro recebido pela função para fornecer o valor relacionado a `corCentro`.
// corHalo = parâmetro recebido pela função para fornecer o valor relacionado a `corHalo`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function desenharDiscoSol(x,y,raio,corCentro,corHalo) {

  // Declara `halo` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // halo = identificador utilizado para armazenar ou acessar o valor relacionado a `halo`.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const halo = ctx.createRadialGradient(x,y,2,x,y,raio*3.2);

  // Executa `halo.addColorStop` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  halo.addColorStop(0,corCentro);

  // Executa `halo.addColorStop` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  halo.addColorStop(.22,corHalo);

  // Executa `halo.addColorStop` com os argumentos informados nesta linha.
  // rgba(255,180,60,0) = define aproximadamente a cor dourado escuro pelos canais vermelho, verde e azul com alfa 0.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  halo.addColorStop(1,'rgba(255,180,60,0)');

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle=halo;

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.beginPath();

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // Math.PI = constante que representa o valor de pi.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.arc(x,y,raio*3.2,0,Math.PI*2);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fill();

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle=corCentro;

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.beginPath();

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // Math.PI = constante que representa o valor de pi.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.arc(x,y,raio,0,Math.PI*2);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fill();

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `desenharMontanhasSuaves`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// desenharMontanhasSuaves = nome atribuído à função definida nesta linha.
// largura = parâmetro recebido pela função para fornecer o valor relacionado a `largura`.
// horizonte = parâmetro recebido pela função para fornecer o valor relacionado a `horizonte`.
// cor = parâmetro recebido pela função para fornecer o valor relacionado a `cor`.
// amp = parâmetro recebido pela função para fornecer o valor relacionado a `amp`.
// base = parâmetro recebido pela função para fornecer o valor relacionado a `base`.
// fase = parâmetro recebido pela função para fornecer o valor relacionado a `fase`.
// limite = parâmetro recebido pela função para fornecer o valor relacionado a `limite`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function desenharMontanhasSuaves(largura, horizonte, cor, amp, base, fase, limite=1) {

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle = cor;

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.beginPath();

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.moveTo(0,horizonte);

  // Declara `maxX` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // maxX = identificador utilizado para armazenar ou acessar o valor relacionado a `maxX`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  const maxX = largura * limite;

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // for = inicia uma estrutura de repetição.
  // <= = operador de comparação que verifica se o valor da esquerda é menor ou igual ao da direita.
  // += = operador de atribuição que soma o valor da direita ao valor atual.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  for (let x=0; x<=maxX+20; x+=20) {

    // Declara `t` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // t = identificador utilizado para armazenar ou acessar o valor relacionado a `t`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // / = operador utilizado para divisão.
    const t=x/largura;

    // Declara `onda` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // onda = identificador utilizado para armazenar ou acessar o valor relacionado a `onda`.
    // Math.sin = calcula o seno do ângulo informado.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const onda = Math.sin(t*9 + fase)*.40 + Math.sin(t*19 + fase*.7)*.18 + .60;

    // Declara `y` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // y = identificador utilizado para armazenar ou acessar o valor relacionado a `y`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const y = horizonte - onda * horizonte * amp * (1 - t*.28);

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.lineTo(x,y);

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.lineTo(maxX,horizonte*base);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.lineTo(maxX,horizonte);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.closePath();

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fill();

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `desenharCenarioCosta`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// desenharCenarioCosta = nome atribuído à função definida nesta linha.
// largura = parâmetro recebido pela função para fornecer o valor relacionado a `largura`.
// altura = parâmetro recebido pela função para fornecer o valor relacionado a `altura`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function desenharCenarioCosta(largura, altura) {

  // Declara `horizonte` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // horizonte = identificador utilizado para armazenar ou acessar o valor relacionado a `horizonte`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const horizonte = altura * .40;

  // Executa `preencherGradienteVertical` com os argumentos informados nesta linha.
  // #17213e = código hexadecimal da cor azul petróleo escuro.
  // #7b5061 = código hexadecimal da cor cinza.
  // #ff7b32 = código hexadecimal da cor marrom chocolate.
  // #f6a54b = código hexadecimal da cor dourado escuro.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  preencherGradienteVertical(largura,altura,[[0,'#17213e'],[.28,'#7b5061'],[.58,'#ff7b32'],[1,'#f6a54b']]);

  // Executa `desenharDiscoSol` com os argumentos informados nesta linha.
  // * = operador utilizado para multiplicação.
  // #fff8cc = código hexadecimal da cor bege.
  // rgba(255,194,75,.55) = define aproximadamente a cor dourado escuro pelos canais vermelho, verde e azul com alfa .55.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  desenharDiscoSol(largura*.77,horizonte*.53,14,'#fff8cc','rgba(255,194,75,.55)');

  // Declara `oceano` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // oceano = identificador utilizado para armazenar ou acessar o valor relacionado a `oceano`.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const oceano = ctx.createLinearGradient(0,horizonte,0,altura*.72);

  // Executa `oceano.addColorStop` com os argumentos informados nesta linha.
  // #2d8bb2 = código hexadecimal da cor azul royal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  oceano.addColorStop(0,'#2d8bb2');

  // Executa `oceano.addColorStop` com os argumentos informados nesta linha.
  // #155d7d = código hexadecimal da cor verde petróleo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  oceano.addColorStop(1,'#155d7d');

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle=oceano;

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillRect(largura*.60,horizonte,largura*.40,altura-horizonte);

  // Atualiza `ctx.strokeStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // rgba(255,215,140,.28) = define aproximadamente a cor rosa pelos canais vermelho, verde e azul com alfa .28.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.strokeStyle='rgba(255,215,140,.28)';

  // Atualiza `ctx.lineWidth` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.lineWidth=1;

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // for = inicia uma estrutura de repetição.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  for(let i=0;i<11;i++) {

    // Declara `y` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // y = identificador utilizado para armazenar ou acessar o valor relacionado a `y`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    const y=horizonte+18+i*11;

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.beginPath();

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.moveTo(largura*.66+i*4,y);

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.lineTo(largura*.93-i*8,y+2);

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.stroke();

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Executa `desenharMontanhasSuaves` com os argumentos informados nesta linha.
  // #17263a = código hexadecimal da cor azul petróleo escuro.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  desenharMontanhasSuaves(largura,horizonte,'#17263a',.28,.82,.5,.74);

  // Executa `desenharMontanhasSuaves` com os argumentos informados nesta linha.
  // #254039 = código hexadecimal da cor cinza escuro.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  desenharMontanhasSuaves(largura,horizonte,'#254039',.21,.88,1.6,.72);

  // Executa `desenharMontanhasSuaves` com os argumentos informados nesta linha.
  // #315642 = código hexadecimal da cor cinza escuro.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  desenharMontanhasSuaves(largura,horizonte,'#315642',.13,.92,2.3,.70);

  // Declara `fx` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // fx = identificador utilizado para armazenar ou acessar o valor relacionado a `fx`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // * = operador utilizado para multiplicação.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const fx=largura*.69, fy=horizonte+1;

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // #ece9dc = código hexadecimal da cor bege.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle='#ece9dc';

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.beginPath();

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.moveTo(fx-4,fy); ctx.lineTo(fx+4,fy); ctx.lineTo(fx+2,fy-32); ctx.lineTo(fx-2,fy-32); ctx.closePath(); ctx.fill();

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // #2b3340 = código hexadecimal da cor cinza escuro.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle='#2b3340'; ctx.fillRect(fx-4,fy-36,8,5);

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `desenharCenarioSerra`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// desenharCenarioSerra = nome atribuído à função definida nesta linha.
// largura = parâmetro recebido pela função para fornecer o valor relacionado a `largura`.
// altura = parâmetro recebido pela função para fornecer o valor relacionado a `altura`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function desenharCenarioSerra(largura, altura) {

  // Declara `horizonte` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // horizonte = identificador utilizado para armazenar ou acessar o valor relacionado a `horizonte`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const horizonte=altura*.40;

  // Executa `preencherGradienteVertical` com os argumentos informados nesta linha.
  // #5fa9d7 = código hexadecimal da cor azul céu.
  // #b8dded = código hexadecimal da cor azul céu.
  // #eef5db = código hexadecimal da cor bege.
  // #dae2b5 = código hexadecimal da cor cinza claro.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  preencherGradienteVertical(largura,altura,[[0,'#5fa9d7'],[.46,'#b8dded'],[.70,'#eef5db'],[1,'#dae2b5']]);

  // Executa `desenharDiscoSol` com os argumentos informados nesta linha.
  // * = operador utilizado para multiplicação.
  // #fff9d8 = código hexadecimal da cor bege.
  // rgba(255,235,160,.35) = define aproximadamente a cor rosa pelos canais vermelho, verde e azul com alfa .35.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  desenharDiscoSol(largura*.77,horizonte*.42,11,'#fff9d8','rgba(255,235,160,.35)');

  // Executa `desenharMontanhasSuaves` com os argumentos informados nesta linha.
  // #637d86 = código hexadecimal da cor cinza.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  desenharMontanhasSuaves(largura,horizonte,'#637d86',.26,.82,.6,1);

  // Executa `desenharMontanhasSuaves` com os argumentos informados nesta linha.
  // #365f55 = código hexadecimal da cor cinza escuro.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  desenharMontanhasSuaves(largura,horizonte,'#365f55',.20,.88,1.9,1);

  // Executa `desenharMontanhasSuaves` com os argumentos informados nesta linha.
  // #244f38 = código hexadecimal da cor cinza escuro.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  desenharMontanhasSuaves(largura,horizonte,'#244f38',.12,.94,3.0,1);

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // #183d28 = código hexadecimal da cor azul petróleo escuro.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle='#183d28';

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // for = inicia uma estrutura de repetição.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  for(let i=0;i<42;i++) {

    // Declara `x` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // x = identificador utilizado para armazenar ou acessar o valor relacionado a `x`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // * = operador utilizado para multiplicação.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    const x=(i*53)%largura;

    // Declara `y` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // y = identificador utilizado para armazenar ou acessar o valor relacionado a `y`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    const y=horizonte+6+(i%4)*3;

    // Declara `h` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // h = identificador utilizado para armazenar ou acessar o valor relacionado a `h`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    const h=20+(i%5)*4;

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.beginPath();

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.moveTo(x,y-h); ctx.lineTo(x-8,y); ctx.lineTo(x+8,y); ctx.closePath(); ctx.fill();

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `desenharCenarioNeon`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// desenharCenarioNeon = nome atribuído à função definida nesta linha.
// largura = parâmetro recebido pela função para fornecer o valor relacionado a `largura`.
// altura = parâmetro recebido pela função para fornecer o valor relacionado a `altura`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function desenharCenarioNeon(largura, altura) {

  // Declara `horizonte` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // horizonte = identificador utilizado para armazenar ou acessar o valor relacionado a `horizonte`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const horizonte=altura*.43;

  // Executa `preencherGradienteVertical` com os argumentos informados nesta linha.
  // #070b1d = código hexadecimal da cor azul-marinho quase preto.
  // #18143b = código hexadecimal da cor azul petróleo escuro.
  // #3b1762 = código hexadecimal da cor azul meia-noite.
  // #171b2a = código hexadecimal da cor azul petróleo escuro.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  preencherGradienteVertical(largura,altura,[[0,'#070b1d'],[.42,'#18143b'],[.70,'#3b1762'],[1,'#171b2a']]);

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // rgba(255,255,255,.75) = define aproximadamente a cor branco pelos canais vermelho, verde e azul com alfa .75.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle='rgba(255,255,255,.75)';

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // for = inicia uma estrutura de repetição.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  for(let i=0;i<55;i++) {

    // Declara `x` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // x = identificador utilizado para armazenar ou acessar o valor relacionado a `x`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // * = operador utilizado para multiplicação.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    const x=(i*97)%largura;

    // Declara `y` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // y = identificador utilizado para armazenar ou acessar o valor relacionado a `y`.
    // Math.max = retorna o maior valor entre os valores informados.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const y=12+((i*47)%Math.max(30,horizonte-35));

    // Declara `s` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // s = identificador utilizado para armazenar ou acessar o valor relacionado a `s`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    const s=(i%3)+1;

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.fillRect(x,y,s,s);

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // #0a0f1c = código hexadecimal da cor azul-marinho quase preto.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle='#0a0f1c';

  // Declara `x` e armazena nessa variável ou constante o valor calculado nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // x = identificador utilizado para armazenar ou acessar o valor relacionado a `x`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  let x=0;

  // Inicia uma repetição que continua enquanto a condição informada permanecer verdadeira.
  // while = inicia uma repetição baseada em condição.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  while(x<largura) {

    // Declara `bw` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // bw = identificador utilizado para armazenar ou acessar o valor relacionado a `bw`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    const bw=34+(x%63);

    // Declara `bh` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // bh = identificador utilizado para armazenar ou acessar o valor relacionado a `bh`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    const bh=50+((x*7)%115);

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.fillRect(x,horizonte-bh,bw,bh);

    // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
    // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
    // for = inicia uma estrutura de repetição.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // += = operador de atribuição que soma o valor da direita ao valor atual.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    for(let yy=horizonte-bh+12; yy<horizonte-8; yy+=14) {

      // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
      // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
      // for = inicia uma estrutura de repetição.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // += = operador de atribuição que soma o valor da direita ao valor atual.
      // < = operador de comparação que verifica se o valor da esquerda é menor.
      // + = operador utilizado para soma numérica ou concatenação de textos.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // { = inicia o bloco de instruções ou objeto correspondente.
      for(let xx=x+8; xx<x+bw-6; xx+=13) {

        // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
        // ctx = representa o contexto 2D usado para desenhar no canvas principal.
        // === = operador de comparação estrita que verifica valor e tipo.
        // == = operador de comparação que verifica igualdade de valores.
        // + = operador utilizado para soma numérica ou concatenação de textos.
        // % = operador utilizado para obter o resto de uma divisão.
        // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
        // #2ee8ff = código hexadecimal da cor ciano.
        // #ff4cc8 = código hexadecimal da cor rosa profundo.
        // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        ctx.fillStyle=((xx+yy)%3===0)?'#2ee8ff':'#ff4cc8';

        // Atualiza `ctx.globalAlpha` com o valor calculado ou informado nesta linha.
        // ctx = representa o contexto 2D usado para desenhar no canvas principal.
        // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        ctx.globalAlpha=.55;

        // Configura ou executa uma operação de desenho no canvas principal do jogo.
        // ctx = representa o contexto 2D usado para desenhar no canvas principal.
        // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        ctx.fillRect(xx,yy,4,5);

      // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
      // } = encerra o bloco de instruções ou objeto correspondente.
      }

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

    // Atualiza `ctx.globalAlpha` com o valor calculado ou informado nesta linha.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.globalAlpha=1;

    // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // #0a0f1c = código hexadecimal da cor azul-marinho quase preto.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.fillStyle='#0a0f1c';

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // += = operador de atribuição que soma o valor da direita ao valor atual.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    x+=bw+8;

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // rgba(23,29,43,.94) = define aproximadamente a cor azul petróleo escuro pelos canais vermelho, verde e azul com alfa .94.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle='rgba(23,29,43,.94)';

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillRect(0,horizonte,largura,altura-horizonte);

  // Atualiza `ctx.strokeStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // rgba(44,219,255,.25) = define aproximadamente a cor ciano pelos canais vermelho, verde e azul com alfa .25.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.strokeStyle='rgba(44,219,255,.25)';

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // for = inicia uma estrutura de repetição.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  for(let i=0;i<10;i++) {

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.beginPath(); ctx.moveTo(0,horizonte+i*12); ctx.lineTo(largura,horizonte+i*12); ctx.stroke();

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `desenharCenarioCanion`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// desenharCenarioCanion = nome atribuído à função definida nesta linha.
// largura = parâmetro recebido pela função para fornecer o valor relacionado a `largura`.
// altura = parâmetro recebido pela função para fornecer o valor relacionado a `altura`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function desenharCenarioCanion(largura, altura) {

  // Declara `horizonte` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // horizonte = identificador utilizado para armazenar ou acessar o valor relacionado a `horizonte`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const horizonte=altura*.40;

  // Executa `preencherGradienteVertical` com os argumentos informados nesta linha.
  // #3679b1 = código hexadecimal da cor azul royal.
  // #86c6e3 = código hexadecimal da cor azul céu.
  // #f4c27a = código hexadecimal da cor rosa.
  // #d98643 = código hexadecimal da cor dourado escuro.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  preencherGradienteVertical(largura,altura,[[0,'#3679b1'],[.43,'#86c6e3'],[.68,'#f4c27a'],[1,'#d98643']]);

  // Executa `desenharDiscoSol` com os argumentos informados nesta linha.
  // * = operador utilizado para multiplicação.
  // #fff7d0 = código hexadecimal da cor bege.
  // rgba(255,224,140,.32) = define aproximadamente a cor rosa pelos canais vermelho, verde e azul com alfa .32.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  desenharDiscoSol(largura*.78,horizonte*.38,12,'#fff7d0','rgba(255,224,140,.32)');

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // #9d4f2d = código hexadecimal da cor marrom sela.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle='#9d4f2d';

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.beginPath();

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.moveTo(0,horizonte);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.lineTo(0,horizonte*.54);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.lineTo(largura*.10,horizonte*.48);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.lineTo(largura*.14,horizonte*.71);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.lineTo(largura*.23,horizonte*.66);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.lineTo(largura*.29,horizonte);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.closePath(); ctx.fill();

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // #b65f32 = código hexadecimal da cor marrom chocolate.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle='#b65f32';

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.beginPath();

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.moveTo(largura,horizonte);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.lineTo(largura,horizonte*.50);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.lineTo(largura*.90,horizonte*.56);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.lineTo(largura*.86,horizonte*.76);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.lineTo(largura*.77,horizonte*.70);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.lineTo(largura*.71,horizonte);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.closePath(); ctx.fill();

  // Executa `desenharMontanhasSuaves` com os argumentos informados nesta linha.
  // #c5723c = código hexadecimal da cor marrom chocolate.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  desenharMontanhasSuaves(largura,horizonte,'#c5723c',.11,.94,2.1,1);

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `desenharCenario`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// desenharCenario = nome atribuído à função definida nesta linha.
// largura = parâmetro recebido pela função para fornecer o valor relacionado a `largura`.
// altura = parâmetro recebido pela função para fornecer o valor relacionado a `altura`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function desenharCenario(largura, altura) {

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  if (cenarioAtual === 'serra') desenharCenarioSerra(largura,altura);

  // Testa uma condição alternativa quando a condição anterior não foi atendida.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // else = define uma alternativa para uma condição anterior.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  else if (cenarioAtual === 'neon') desenharCenarioNeon(largura,altura);

  // Testa uma condição alternativa quando a condição anterior não foi atendida.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // else = define uma alternativa para uma condição anterior.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  else if (cenarioAtual === 'canion') desenharCenarioCanion(largura,altura);

  // Define o bloco alternativo executado quando as condições anteriores não forem atendidas.
  // else = define uma alternativa para uma condição anterior.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  else desenharCenarioCosta(largura,altura);

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `desenharObjetoLateral`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// desenharObjetoLateral = nome atribuído à função definida nesta linha.
// segmento = parâmetro recebido pela função para fornecer o valor relacionado a `segmento`.
// relativo = parâmetro recebido pela função para fornecer o valor relacionado a `relativo`.
// lado = parâmetro recebido pela função para fornecer o valor relacionado a `lado`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function desenharObjetoLateral(segmento, relativo, lado) {

  // Declara `p1` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // p1 = identificador utilizado para armazenar ou acessar o valor relacionado a `p1`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const p1=segmento.p1.screen;

  // Declara `p2` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // p2 = identificador utilizado para armazenar ou acessar o valor relacionado a `p2`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const p2=segmento.p2.screen;

  // Declara `x` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // x = identificador utilizado para armazenar ou acessar o valor relacionado a `x`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const x=interpolar(p1.x,p2.x,relativo);

  // Declara `y` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // y = identificador utilizado para armazenar ou acessar o valor relacionado a `y`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const y=interpolar(p1.y,p2.y,relativo);

  // Declara `w` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // w = identificador utilizado para armazenar ou acessar o valor relacionado a `w`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const w=interpolar(p1.w,p2.w,relativo);

  // Declara `s` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // s = identificador utilizado para armazenar ou acessar o valor relacionado a `s`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const s=limitar(w/1000,0,1.2);

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // return = encerra a função atual e devolve o valor informado.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if (s<.025) return;

  // Declara `px` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // px = identificador utilizado para armazenar ou acessar o valor relacionado a `px`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const px=x + lado*w*1.35;

  // Declara `tipo` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // tipo = identificador utilizado para armazenar ou acessar o valor relacionado a `tipo`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // % = operador utilizado para obter o resto de uma divisão.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const tipo=segmento.index%83;

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  if (cenarioAtual === 'neon') {

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // === = operador de comparação estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    if (tipo%11===0) {

      // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
      // ctx = representa o contexto 2D usado para desenhar no canvas principal.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // * = operador utilizado para multiplicação.
      // #262d40 = código hexadecimal da cor cinza escuro.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ctx.fillStyle='#262d40'; ctx.fillRect(px-3*s,y-90*s,6*s,90*s);

      // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
      // ctx = representa o contexto 2D usado para desenhar no canvas principal.
      // === = operador de comparação estrita que verifica valor e tipo.
      // == = operador de comparação que verifica igualdade de valores.
      // % = operador utilizado para obter o resto de uma divisão.
      // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
      // #2ee8ff = código hexadecimal da cor ciano.
      // #ff47ce = código hexadecimal da cor rosa profundo.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ctx.fillStyle=(tipo%22===0)?'#2ee8ff':'#ff47ce';

      // Atualiza `ctx.shadowColor` com o valor calculado ou informado nesta linha.
      // ctx = representa o contexto 2D usado para desenhar no canvas principal.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // * = operador utilizado para multiplicação.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ctx.shadowColor=ctx.fillStyle; ctx.shadowBlur=12*s;

      // Configura ou executa uma operação de desenho no canvas principal do jogo.
      // ctx = representa o contexto 2D usado para desenhar no canvas principal.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // * = operador utilizado para multiplicação.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ctx.fillRect(px-18*s,y-94*s,36*s,5*s); ctx.shadowBlur=0;

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

    // Encerra a execução da função atual e retorna o controle para o ponto que realizou a chamada.
    // return = encerra a função atual e devolve o valor informado.
    return;

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  if (cenarioAtual === 'canion') {

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // === = operador de comparação estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    if (tipo%13===0) {

      // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
      // ctx = representa o contexto 2D usado para desenhar no canvas principal.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // #6e3825 = código hexadecimal da cor marrom sela.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ctx.fillStyle='#6e3825';

      // Configura ou executa uma operação de desenho no canvas principal do jogo.
      // ctx = representa o contexto 2D usado para desenhar no canvas principal.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ctx.beginPath();

      // Configura ou executa uma operação de desenho no canvas principal do jogo.
      // ctx = representa o contexto 2D usado para desenhar no canvas principal.
      // + = operador utilizado para soma numérica ou concatenação de textos.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // * = operador utilizado para multiplicação.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ctx.moveTo(px-18*s,y);ctx.lineTo(px-8*s,y-70*s);ctx.lineTo(px+12*s,y-78*s);ctx.lineTo(px+22*s,y);ctx.closePath();ctx.fill();

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

    // Encerra a execução da função atual e retorna o controle para o ponto que realizou a chamada.
    // return = encerra a função atual e devolve o valor informado.
    return;

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // === = operador de comparação estrita que verifica valor e tipo.
  // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  if (tipo===0 || tipo===1) {

    // Declara `h` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // h = identificador utilizado para armazenar ou acessar o valor relacionado a `h`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // * = operador utilizado para multiplicação.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    const h=90*s, bw=58*s;

    // Atualiza `ctx.strokeStyle` com o valor calculado ou informado nesta linha.
    // Math.max = retorna o maior valor entre os valores informados.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // * = operador utilizado para multiplicação.
    // #e8e8e8 = código hexadecimal da cor bege.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.strokeStyle='#e8e8e8'; ctx.lineWidth=Math.max(1,3*s);

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.beginPath(); ctx.moveTo(px,y); ctx.lineTo(px,y-h); ctx.stroke();

    // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
    // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
    // for = inicia uma estrutura de repetição.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    for(let r=0;r<4;r++) for(let c=0;c<4;c++) {

      // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
      // ctx = representa o contexto 2D usado para desenhar no canvas principal.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // + = operador utilizado para soma numérica ou concatenação de textos.
      // % = operador utilizado para obter o resto de uma divisão.
      // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
      // #111 = código hexadecimal da cor azul-marinho quase preto.
      // #fff = código hexadecimal da cor branco.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ctx.fillStyle=(r+c)%2?'#111':'#fff';

      // Configura ou executa uma operação de desenho no canvas principal do jogo.
      // ctx = representa o contexto 2D usado para desenhar no canvas principal.
      // + = operador utilizado para soma numérica ou concatenação de textos.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // * = operador utilizado para multiplicação.
      // / = operador utilizado para divisão.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ctx.fillRect(px+c*bw/4,y-h+r*(h*.42)/4,bw/4,h*.42/4);

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

  // Testa uma condição alternativa quando a condição anterior não foi atendida.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // else = define uma alternativa para uma condição anterior.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // % = operador utilizado para obter o resto de uma divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  } else if (tipo%17===0) {

    // Declara `bw` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // bw = identificador utilizado para armazenar ou acessar o valor relacionado a `bw`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // * = operador utilizado para multiplicação.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    const bw=80*s,bh=48*s;

    // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // / = operador utilizado para divisão.
    // #ffd31a = código hexadecimal da cor dourado.
    // #111 = código hexadecimal da cor azul-marinho quase preto.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.fillStyle='#ffd31a';ctx.fillRect(px-bw/2,y-bh,bw,bh);ctx.fillStyle='#111';

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.beginPath();ctx.moveTo(px-bw*.25,y-bh*.5);ctx.lineTo(px+bw*.05,y-bh*.8);ctx.lineTo(px+bw*.05,y-bh*.63);ctx.lineTo(px+bw*.3,y-bh*.45);ctx.lineTo(px+bw*.05,y-bh*.25);ctx.lineTo(px+bw*.05,y-bh*.1);ctx.closePath();ctx.fill();

  // Testa uma condição alternativa quando a condição anterior não foi atendida.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // else = define uma alternativa para uma condição anterior.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // % = operador utilizado para obter o resto de uma divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  } else if (tipo%9===0) {

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // === = operador de comparação estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    if (cenarioAtual === 'serra') {

      // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
      // ctx = representa o contexto 2D usado para desenhar no canvas principal.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // * = operador utilizado para multiplicação.
      // #3f2d1d = código hexadecimal da cor cinza escuro.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ctx.fillStyle='#3f2d1d';ctx.fillRect(px-3*s,y-52*s,6*s,52*s);

      // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
      // ctx = representa o contexto 2D usado para desenhar no canvas principal.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // #143d27 = código hexadecimal da cor azul petróleo escuro.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ctx.fillStyle='#143d27';

      // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
      // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
      // for = inicia uma estrutura de repetição.
      // ctx = representa o contexto 2D usado para desenhar no canvas principal.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // < = operador de comparação que verifica se o valor da esquerda é menor.
      // + = operador utilizado para soma numérica ou concatenação de textos.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // * = operador utilizado para multiplicação.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // { = inicia o bloco de instruções ou objeto correspondente.
      // } = encerra o bloco de instruções ou objeto correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      for(let k=0;k<3;k++) { ctx.beginPath();ctx.moveTo(px,y-(95-k*22)*s);ctx.lineTo(px-(28-k*4)*s,y-(47-k*16)*s);ctx.lineTo(px+(28-k*4)*s,y-(47-k*16)*s);ctx.closePath();ctx.fill(); }

    // Define o bloco alternativo executado quando as condições anteriores não forem atendidas.
    // else = define uma alternativa para uma condição anterior.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    } else {

      // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
      // ctx = representa o contexto 2D usado para desenhar no canvas principal.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // * = operador utilizado para multiplicação.
      // #49371f = código hexadecimal da cor cinza escuro.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ctx.fillStyle='#49371f';ctx.fillRect(px-4*s,y-55*s,8*s,55*s);

      // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
      // Math.PI = constante que representa o valor de pi.
      // ctx = representa o contexto 2D usado para desenhar no canvas principal.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // * = operador utilizado para multiplicação.
      // #173e25 = código hexadecimal da cor azul petróleo escuro.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ctx.fillStyle='#173e25';ctx.beginPath();ctx.arc(px,y-70*s,28*s,0,Math.PI*2);ctx.fill();

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// ----------------------------- DESENHO DOS CARROS -----------------------------
// Define a função `poligonoCarro`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// poligonoCarro = nome atribuído à função definida nesta linha.
// c = parâmetro recebido pela função para fornecer o valor relacionado a `c`.
// ...p = parâmetro recebido pela função para fornecer o valor relacionado a `...p`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
function poligonoCarro(c,...p) {

  // Executa `c.beginPath` com os argumentos informados nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // for = inicia uma estrutura de repetição.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // += = operador de atribuição que soma o valor da direita ao valor atual.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  c.beginPath();c.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)c.lineTo(p[i],p[i+1]);c.closePath();c.fill();

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `desenharCarro`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// desenharCarro = nome atribuído à função definida nesta linha.
// x = parâmetro recebido pela função para fornecer o valor relacionado a `x`.
// y = parâmetro recebido pela função para fornecer o valor relacionado a `y`.
// largura = parâmetro recebido pela função para fornecer o valor relacionado a `largura`.
// cor = parâmetro recebido pela função para fornecer o valor relacionado a `cor`.
// tipo = parâmetro recebido pela função para fornecer o valor relacionado a `tipo`.
// jogadorLocal = parâmetro recebido pela função para fornecer o valor relacionado a `jogadorLocal`.
// inclinacao = parâmetro recebido pela função para fornecer o valor relacionado a `inclinacao`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function desenharCarro(x, y, largura, cor, tipo='super', jogadorLocal=false, inclinacao=0) {

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // return = encerra a função atual e devolve o valor informado.
  // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  if (largura < 2 || !isFinite(x) || !isFinite(y) || !isFinite(largura)) return;

  // Declara `proporcao` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // proporcao = identificador utilizado para armazenar ou acessar o valor relacionado a `proporcao`.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const proporcao = tipo==='gt' ? .64 : tipo==='sport' ? .55 : .58;

  // Declara `h` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // h = identificador utilizado para armazenar ou acessar o valor relacionado a `h`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  const h=largura*proporcao;

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.save();

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.translate(x,y);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.rotate(inclinacao);

  // Atualiza `ctx.shadowColor` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // rgba(0,0,0,.62) = define aproximadamente a cor preto pelos canais vermelho, verde e azul com alfa .62.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.shadowColor='rgba(0,0,0,.62)';ctx.shadowBlur=largura*.12;ctx.shadowOffsetY=largura*.07;

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // #080808 = código hexadecimal da cor preto.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle='#080808';

  // Declara `rodaH` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // rodaH = identificador utilizado para armazenar ou acessar o valor relacionado a `rodaH`.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // * = operador utilizado para multiplicação.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const rodaH=tipo==='gt' ? h*.48 : h*.43;

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillRect(-largura*.49,-h*.48,largura*.15,rodaH);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillRect(largura*.34,-h*.48,largura*.15,rodaH);

  // Declara `g` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // g = identificador utilizado para armazenar ou acessar o valor relacionado a `g`.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const g=ctx.createLinearGradient(0,-h,0,0);

  // Executa `g.addColorStop` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  g.addColorStop(0,cor);

  // Executa `g.addColorStop` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  g.addColorStop(.62,cor);

  // Executa `g.addColorStop` com os argumentos informados nesta linha.
  // #4b1111 = código hexadecimal da cor preto azulado.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  g.addColorStop(1,'#4b1111');

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle=g;

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  if (tipo==='gt') {

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.beginPath();

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.moveTo(-largura*.49,0);ctx.lineTo(-largura*.46,-h*.48);ctx.lineTo(-largura*.33,-h*.82);ctx.lineTo(-largura*.22,-h*.95);ctx.lineTo(largura*.22,-h*.95);ctx.lineTo(largura*.34,-h*.82);ctx.lineTo(largura*.46,-h*.48);ctx.lineTo(largura*.49,0);ctx.closePath();ctx.fill();

  // Testa uma condição alternativa quando a condição anterior não foi atendida.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // else = define uma alternativa para uma condição anterior.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  } else if (tipo==='sport') {

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.beginPath();

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.moveTo(-largura*.47,0);ctx.lineTo(-largura*.41,-h*.50);ctx.lineTo(-largura*.28,-h*.88);ctx.lineTo(largura*.28,-h*.88);ctx.lineTo(largura*.41,-h*.50);ctx.lineTo(largura*.47,0);ctx.closePath();ctx.fill();

  // Define o bloco alternativo executado quando as condições anteriores não forem atendidas.
  // else = define uma alternativa para uma condição anterior.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  } else {

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.beginPath();

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.moveTo(-largura*.48,0);ctx.lineTo(-largura*.42,-h*.54);ctx.lineTo(-largura*.25,-h*.90);ctx.lineTo(largura*.25,-h*.90);ctx.lineTo(largura*.42,-h*.54);ctx.lineTo(largura*.48,0);ctx.closePath();ctx.fill();

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // rgba(7,16,25,.88) = define aproximadamente a cor azul-marinho quase preto pelos canais vermelho, verde e azul com alfa .88.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle='rgba(7,16,25,.88)';

  // Declara `vidroTopo` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // vidroTopo = identificador utilizado para armazenar ou acessar o valor relacionado a `vidroTopo`.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const vidroTopo=tipo==='gt' ? -.94 : -.90;

  // Executa `poligonoCarro` com os argumentos informados nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  poligonoCarro(ctx,-largura*.24,-h*.70,largura*.24,-h*.70,largura*.17,h*vidroTopo,-largura*.17,h*vidroTopo);

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  if (tipo==='super') {

    // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // rgba(10,10,12,.76) = define aproximadamente a cor azul-marinho quase preto pelos canais vermelho, verde e azul com alfa .76.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.fillStyle='rgba(10,10,12,.76)';ctx.fillRect(-largura*.055,-h*.9,largura*.11,h*.72);

  // Testa uma condição alternativa quando a condição anterior não foi atendida.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // else = define uma alternativa para uma condição anterior.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  } else if (tipo==='gt') {

    // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // #0c0d11 = código hexadecimal da cor azul-marinho quase preto.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.fillStyle='#0c0d11';ctx.fillRect(-largura*.43,-h*.96,largura*.86,h*.07);

  // Define o bloco alternativo executado quando as condições anteriores não forem atendidas.
  // else = define uma alternativa para uma condição anterior.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  } else {

    // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // rgba(15,15,18,.68) = define aproximadamente a cor azul-marinho quase preto pelos canais vermelho, verde e azul com alfa .68.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.fillStyle='rgba(15,15,18,.68)';ctx.fillRect(-largura*.035,-h*.88,largura*.07,h*.67);

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Atualiza `ctx.shadowBlur` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // #ff1e16 = código hexadecimal da cor vermelho.
  // #ff3126 = código hexadecimal da cor laranja avermelhado.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.shadowBlur=largura*.08;ctx.shadowColor='#ff1e16';ctx.fillStyle='#ff3126';

  // Declara `lanternaL` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // lanternaL = identificador utilizado para armazenar ou acessar o valor relacionado a `lanternaL`.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const lanternaL=tipo==='sport' ? .15 : .18;

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillRect(-largura*.38,-h*.34,largura*lanternaL,h*.10);

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillRect(largura*(.38-lanternaL),-h*.34,largura*lanternaL,h*.10);

  // Atualiza `ctx.shadowBlur` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // #090a0d = código hexadecimal da cor azul-marinho quase preto.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.shadowBlur=0;ctx.fillStyle='#090a0d';ctx.fillRect(-largura*.37,-h*.10,largura*.74,h*.13);

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // #d5d5d5 = código hexadecimal da cor cinza claro.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle='#d5d5d5';ctx.fillRect(-largura*.05,-h*.05,largura*.1,h*.035);

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if (jogadorLocal && jogador.turboAtivo) {

    // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // #2cd9ff = código hexadecimal da cor ciano.
    // rgba(100,220,255,.92) = define aproximadamente a cor azul céu pelos canais vermelho, verde e azul com alfa .92.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.fillStyle='rgba(100,220,255,.92)';ctx.shadowColor='#2cd9ff';ctx.shadowBlur=16;

    // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // for = inicia uma estrutura de repetição.
    // of = faz uma estrutura for percorrer os valores de uma coleção.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
    // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    for (const lx of [-.16,.16]) {

      // Configura ou executa uma operação de desenho no canvas principal do jogo.
      // ctx = representa o contexto 2D usado para desenhar no canvas principal.
      // + = operador utilizado para soma numérica ou concatenação de textos.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // * = operador utilizado para multiplicação.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ctx.beginPath();ctx.moveTo(largura*lx,-h*.02);ctx.lineTo(largura*(lx-.04),h*.25);ctx.lineTo(largura*(lx+.04),h*.25);ctx.closePath();ctx.fill();

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.restore();

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `desenharCapo`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// desenharCapo = nome atribuído à função definida nesta linha.
// largura = parâmetro recebido pela função para fornecer o valor relacionado a `largura`.
// altura = parâmetro recebido pela função para fornecer o valor relacionado a `altura`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function desenharCapo(largura, altura) {

  // Declara `carro` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // carro = identificador utilizado para armazenar ou acessar o valor relacionado a `carro`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  const carro=CARROS[carroAtual];

  // Declara `y` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // y = identificador utilizado para armazenar ou acessar o valor relacionado a `y`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const y=altura*.89;

  // Declara `grad` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // grad = identificador utilizado para armazenar ou acessar o valor relacionado a `grad`.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const grad=ctx.createLinearGradient(0,y-100,0,altura);

  // Executa `grad.addColorStop` com os argumentos informados nesta linha.
  // #52110f = código hexadecimal da cor preto azulado.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  grad.addColorStop(0,carro.cor);grad.addColorStop(1,'#52110f');

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle=grad;

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.beginPath();ctx.moveTo(largura*.22,altura);ctx.lineTo(largura*.35,y);ctx.lineTo(largura*.65,y);ctx.lineTo(largura*.78,altura);ctx.closePath();ctx.fill();

  // Atualiza `ctx.fillStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // rgba(12,12,15,.72) = define aproximadamente a cor azul-marinho quase preto pelos canais vermelho, verde e azul com alfa .72.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.fillStyle='rgba(12,12,15,.72)';ctx.beginPath();ctx.moveTo(largura*.46,altura);ctx.lineTo(largura*.485,y);ctx.lineTo(largura*.515,y);ctx.lineTo(largura*.54,altura);ctx.closePath();ctx.fill();

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// ----------------------------- CRIAÇÃO DOS ADVERSÁRIOS -----------------------------
// Define a função `criarAdversarios`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// criarAdversarios = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function criarAdversarios() {

  // A câmera fica atrás do carro. Estes deslocamentos deixam todos os carros
  // próximos ao jogador na largada e ainda permitem enxergá-los na pista.
  // Cria uma lista de valores e armazena essa coleção em `gradeDistancias`.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // gradeDistancias = identificador utilizado para armazenar ou acessar o valor relacionado a `gradeDistancias`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  const gradeDistancias=[780,480,180,-220,-520,-820,-1120];

  // Cria uma lista de valores e armazena essa coleção em `gradeX`.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // gradeX = identificador utilizado para armazenar ou acessar o valor relacionado a `gradeX`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const gradeX=[-.52,.52,-.52,.52,-.52,.52,-.52];

  // Atualiza `adversarios` com o valor calculado ou informado nesta linha.
  // .map = cria um novo array transformando cada elemento da coleção.
  // => = define uma função de seta e separa seus parâmetros do corpo.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  adversarios = NOMES_IA.map((nome,i) => ({

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    nome,

    // Define a propriedade `cor` desta estrutura com o valor informado nesta linha.
    // cor = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
    // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    cor:CORES_IA[i],

    // Define a propriedade `carroKey` desta estrutura com o valor informado nesta linha.
    // carroKey = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
    // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    carroKey:TIPOS_IA[i],

    // Define a propriedade `x` desta estrutura com o valor informado nesta linha.
    // x = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
    // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    x:gradeX[i],

    // Define a propriedade `alvoX` desta estrutura com o valor informado nesta linha.
    // alvoX = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
    // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    alvoX:gradeX[i],

    // Define a propriedade `distancia` desta estrutura com o valor informado nesta linha.
    // distancia = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
    // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    distancia:gradeDistancias[i],

    // Define a propriedade `velocidade` desta estrutura com o valor informado nesta linha.
    // velocidade = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    velocidade:0,

    // Define a propriedade `terminou` desta estrutura com o valor informado nesta linha.
    // terminou = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    terminou:false,

    // Define a propriedade `tempoFim` desta estrutura com o valor informado nesta linha.
    // tempoFim = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    tempoFim:0,

    // Diferenças pequenas entre pilotos: todos continuam capazes de disputar a corrida.
    // Define a propriedade `personalidade` desta estrutura com o valor informado nesta linha.
    // personalidade = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    personalidade:.985 + (i%4)*.010,

    // Define a propriedade `mudancaFaixa` desta estrutura com o valor informado nesta linha.
    // mudancaFaixa = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    mudancaFaixa:.55 + i*.12,

    // Define a propriedade `erro` desta estrutura com o valor informado nesta linha.
    // Math.random = gera um número pseudoaleatório entre zero e um.
    // erro = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    erro:(Math.random()-.5),

    // Define a propriedade `colisaoCooldown` desta estrutura com o valor informado nesta linha.
    // colisaoCooldown = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    colisaoCooldown:0,

    // Define a propriedade `turbo` desta estrutura com o valor informado nesta linha.
    // turbo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    turbo:100,

    // Define a propriedade `turboAtivo` desta estrutura com o valor informado nesta linha.
    // turboAtivo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    turboAtivo:false,

    // Define a propriedade `impulsoLargada` desta estrutura com o valor informado nesta linha.
    // impulsoLargada = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    impulsoLargada:1.18 + (i%3)*.035,

    // Define a propriedade `decisaoTurbo` desta estrutura com o valor informado nesta linha.
    // Math.random = gera um número pseudoaleatório entre zero e um.
    // decisaoTurbo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    decisaoTurbo:.25 + Math.random()*.55

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }));

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// ----------------------------- INÍCIO DA CORRIDA -----------------------------
// Define a função `iniciarCorrida`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// iniciarCorrida = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function iniciarCorrida() {

  // Executa `AudioJogo.iniciar` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  AudioJogo.iniciar();

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  if (contadorContagem) { clearInterval(contadorContagem); contadorContagem=0; }

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // function = define uma nova função reutilizável.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // typeof = obtém o tipo do valor informado.
  // === = operador de comparação estrita que verifica valor e tipo.
  // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if (document.activeElement && typeof document.activeElement.blur === 'function') document.activeElement.blur();

  // Atualiza `totalVoltas` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  totalVoltas = Number(voltasEl.value) || 3;

  // Atualiza `dificuldadeAtual` com o valor calculado ou informado nesta linha.
  // in = verifica a presença de uma propriedade ou é utilizado em estruturas de repetição específicas.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // value = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  dificuldadeAtual = dificuldadeEl.value in CONFIG_DIFICULDADE ? dificuldadeEl.value : 'medio';

  // Atualiza `cenarioAtual` com o valor calculado ou informado nesta linha.
  // in = verifica a presença de uma propriedade ou é utilizado em estruturas de repetição específicas.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // value = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  cenarioAtual = cenarioEl.value in CENARIOS ? cenarioEl.value : 'costa';

  // Atualiza `carroAtual` com o valor calculado ou informado nesta linha.
  // in = verifica a presença de uma propriedade ou é utilizado em estruturas de repetição específicas.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // value = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  carroAtual = carroEl.value in CARROS ? carroEl.value : 'veloce';

  // Atualiza `modoAtual` com o valor calculado ou informado nesta linha.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  modoAtual = modoJogoEl.value === 'automatico' ? 'automatico' : 'manual';

  // Executa `construirPista` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  construirPista();

  // Atualiza `jogador.nome` com o valor calculado ou informado nesta linha.
  // .trim = remove espaços em branco do início e do final do texto.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // === = operador de comparação estrita que verifica valor e tipo.
  // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
  // == = operador de comparação que verifica igualdade de valores.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.nome = nomeJogadorEl.value.trim() || (modoAtual==='automatico' ? 'IA Piloto' : 'Jogador');

  // Atualiza `jogador.x` com o valor calculado ou informado nesta linha.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.x=0; jogador.distancia=0; jogador.velocidade=0; jogador.turbo=100; jogador.turboAtivo=false;

  // Atualiza `jogador.drift` com o valor calculado ou informado nesta linha.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.drift=false; jogador.velMax=0; jogador.terminou=false; jogador.tempoFim=0; jogador.pontos=0; jogador.invulneravel=0; jogador.colisaoCooldown=0;

  // Atualiza `jogador.autoAlvoX` com o valor calculado ou informado nesta linha.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.autoAlvoX=0; jogador.autoTimer=.4;

  // Executa `criarAdversarios` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  criarAdversarios();

  // Atualiza `cameraAtual` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  cameraAtual=0; melhorVolta=Infinity; inicioVolta=0; ultimaVoltaRegistrada=0;

  // Atualiza `posicaoAnterior` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  posicaoAnterior=posicaoJogador();

  // Atualiza `inicioCorrida` com o valor calculado ou informado nesta linha.
  // performance.now = obtém um marcador de tempo de alta precisão do navegador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  inicioCorrida=performance.now(); tempoPausadoAcumulado=0; mensagemTimer=0;

  // Executa `telaMenu.classList.remove` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  telaMenu.classList.remove('ativa'); telaJogo.classList.add('ativa');

  // Atualiza `estado` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  estado='contagem';

  // Executa `ajustarCanvas` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  ajustarCanvas();

  // Atualiza `hudModoIA.hidden` com o valor calculado ou informado nesta linha.
  // !== = operador de diferença estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // != = operador de comparação que verifica diferença de valores.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  hudModoIA.hidden = modoAtual !== 'automatico';

  // Atualiza `hudInfoCorrida.textContent` com o valor calculado ou informado nesta linha.
  // .toUpperCase = converte o texto para letras maiúsculas.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  hudInfoCorrida.textContent=`${CENARIOS[cenarioAtual].nome.toUpperCase()} • ${CARROS[carroAtual].nome.toUpperCase()}${modoAtual==='automatico'?' • IA NO VOLANTE':''}`;

  // Executa `canvas.focus` com os argumentos informados nesta linha.
  // canvas = representa o canvas principal utilizado para desenhar a corrida.
  // preventScroll = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // true = valor lógico verdadeiro utilizado para ativar ou confirmar a condição correspondente.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  canvas.focus({preventScroll:true});

  // Executa `iniciarContagem` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  iniciarContagem();

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  if (!animacaoId) {

    // Atualiza `ultimoTempoFrame` com o valor calculado ou informado nesta linha.
    // performance.now = obtém um marcador de tempo de alta precisão do navegador.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ultimoTempoFrame=performance.now();

    // Agenda o próximo quadro do ciclo de animação do jogo no navegador.
    // requestAnimationFrame = agenda a execução da função de animação no próximo quadro do navegador.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    animacaoId=requestAnimationFrame(loop);

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `iniciarContagem`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// iniciarContagem = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function iniciarContagem() {

  // Declara `numero` e armazena nessa variável ou constante o valor calculado nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // numero = identificador utilizado para armazenar ou acessar o valor relacionado a `numero`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  let numero=3;

  // Atualiza `contagemEl.textContent` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  contagemEl.textContent=numero;

  // Executa `AudioJogo.bip` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  AudioJogo.bip(360,.12,.08);

  // Atualiza `contadorContagem` com o valor calculado ou informado nesta linha.
  // => = define uma função de seta e separa seus parâmetros do corpo.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  contadorContagem=setInterval(()=>{

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // - = operador utilizado para subtração ou representação de valor negativo.
    numero--;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    if(numero>0) {

      // Atualiza `contagemEl.textContent` com o valor calculado ou informado nesta linha.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      contagemEl.textContent=numero;

      // Executa `AudioJogo.bip` com os argumentos informados nesta linha.
      // + = operador utilizado para soma numérica ou concatenação de textos.
      // * = operador utilizado para multiplicação.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      AudioJogo.bip(360+numero*30,.12,.08);

    // Testa uma condição alternativa quando a condição anterior não foi atendida.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // else = define uma alternativa para uma condição anterior.
    // === = operador de comparação estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    } else if(numero===0) {

      // Atualiza `contagemEl.textContent` com o valor calculado ou informado nesta linha.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      contagemEl.textContent='JÁ!';

      // Executa `AudioJogo.bip` com os argumentos informados nesta linha.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      AudioJogo.bip(780,.22,.1);

    // Define o bloco alternativo executado quando as condições anteriores não forem atendidas.
    // else = define uma alternativa para uma condição anterior.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    } else {

      // Executa `clearInterval` com os argumentos informados nesta linha.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      clearInterval(contadorContagem);

      // Atualiza `contadorContagem` com o valor calculado ou informado nesta linha.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      contadorContagem=0;

      // Atualiza `contagemEl.textContent` com o valor calculado ou informado nesta linha.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      contagemEl.textContent='';

      // Atualiza `estado` com o valor calculado ou informado nesta linha.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      estado='corrida';

      // Atualiza `inicioCorrida` com o valor calculado ou informado nesta linha.
      // performance.now = obtém um marcador de tempo de alta precisão do navegador.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      inicioCorrida=performance.now();

      // Atualiza `inicioVolta` com o valor calculado ou informado nesta linha.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      inicioVolta=inicioCorrida;

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  },850);

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// ----------------------------- CONTROLE AUTOMÁTICO DO JOGADOR -----------------------------
// Define a função `obterControleAutomatico`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// obterControleAutomatico = nome atribuído à função definida nesta linha.
// dt = parâmetro recebido pela função para fornecer o valor relacionado a `dt`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function obterControleAutomatico(dt) {

  // Declara `carro` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // carro = identificador utilizado para armazenar ou acessar o valor relacionado a `carro`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  const carro=CARROS[carroAtual];

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // -= = operador de atribuição que subtrai o valor da direita do valor atual.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.autoTimer-=dt;

  // Declara `seg` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // seg = identificador utilizado para armazenar ou acessar o valor relacionado a `seg`.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const seg=acharSegmento(jogador.distancia + 900);

  // Declara `seg2` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // seg2 = identificador utilizado para armazenar ou acessar o valor relacionado a `seg2`.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const seg2=acharSegmento(jogador.distancia + 2200);

  // Declara `curvaPrevista` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // curvaPrevista = identificador utilizado para armazenar ou acessar o valor relacionado a `curvaPrevista`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const curvaPrevista=seg.curve*.65 + seg2.curve*.35;

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // <= = operador de comparação que verifica se o valor da esquerda é menor ou igual ao da direita.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(jogador.autoTimer<=0) {

    // Atualiza `jogador.autoTimer` com o valor calculado ou informado nesta linha.
    // Math.random = gera um número pseudoaleatório entre zero e um.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    jogador.autoTimer=1.1+Math.random()*1.4;

    // Declara `alvo` e armazena nessa variável ou constante o valor calculado nesta linha.
    // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
    // alvo = identificador utilizado para armazenar ou acessar o valor relacionado a `alvo`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    let alvo=-curvaPrevista*.16;

    // Declara `maisPerto` e armazena nessa variável ou constante o valor calculado nesta linha.
    // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
    // maisPerto = identificador utilizado para armazenar ou acessar o valor relacionado a `maisPerto`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // null = representa explicitamente a ausência de um valor ou objeto.
    let maisPerto=null;

    // Declara `menor` e armazena nessa variável ou constante o valor calculado nesta linha.
    // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
    // menor = identificador utilizado para armazenar ou acessar o valor relacionado a `menor`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    let menor=Infinity;

    // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // for = inicia uma estrutura de repetição.
    // of = faz uma estrutura for percorrer os valores de uma coleção.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    for(const ai of adversarios) {

      // Declara `dz` e armazena nessa variável ou constante o valor calculado nesta linha.
      // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
      // dz = identificador utilizado para armazenar ou acessar o valor relacionado a `dz`.
      // jogador = representa os dados e o estado do carro controlado pelo jogador.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      const dz=ai.distancia-jogador.distancia;

      // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
      // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
      // Math.abs = retorna o valor absoluto do número informado.
      // jogador = representa os dados e o estado do carro controlado pelo jogador.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
      // > = operador de comparação que verifica se o valor da esquerda é maior.
      // < = operador de comparação que verifica se o valor da esquerda é menor.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // { = inicia o bloco de instruções ou objeto correspondente.
      // } = encerra o bloco de instruções ou objeto correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      if(dz>0 && dz<1500 && Math.abs(ai.x-jogador.x)<.34 && dz<menor) { maisPerto=ai; menor=dz; }

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // Math.random = gera um número pseudoaleatório entre zero e um.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(maisPerto) alvo=limitar(maisPerto.x + (Math.random()<.5?-.48:.48),-.78,.78);

    // Define o bloco alternativo executado quando as condições anteriores não forem atendidas.
    // else = define uma alternativa para uma condição anterior.
    // Math.random = gera um número pseudoaleatório entre zero e um.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    else alvo=limitar(alvo + (Math.random()-.5)*.24,-.72,.72);

    // Atualiza `jogador.autoAlvoX` com o valor calculado ou informado nesta linha.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    jogador.autoAlvoX=alvo;

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Declara `diferenca` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // diferenca = identificador utilizado para armazenar ou acessar o valor relacionado a `diferenca`.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const diferenca=jogador.autoAlvoX-jogador.x;

  // Declara `intensidadeCurva` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // intensidadeCurva = identificador utilizado para armazenar ou acessar o valor relacionado a `intensidadeCurva`.
  // Math.abs = retorna o valor absoluto do número informado.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const intensidadeCurva=Math.abs(curvaPrevista);

  // Declara `max` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // max = identificador utilizado para armazenar ou acessar o valor relacionado a `max`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const max=carro.max*20;

  // Declara `kmh` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // kmh = identificador utilizado para armazenar ou acessar o valor relacionado a `kmh`.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // / = operador utilizado para divisão.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const kmh=jogador.velocidade/20;

  // Declara `alvoKmh` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // alvoKmh = identificador utilizado para armazenar ou acessar o valor relacionado a `alvoKmh`.
  // Math.min = retorna o menor valor entre os valores informados.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const alvoKmh=carro.max*(1-Math.min(.30,intensidadeCurva*.09));

  // Declara `frear` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // frear = identificador utilizado para armazenar ou acessar o valor relacionado a `frear`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  const frear=kmh>alvoKmh+12;

  // Declara `turbo` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // turbo = identificador utilizado para armazenar ou acessar o valor relacionado a `turbo`.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const turbo=intensidadeCurva<.30 && jogador.turbo>28 && jogador.velocidade>max*.58;

  // Retorna o resultado desta linha para o ponto do programa que chamou a função atual.
  // return = encerra a função atual e devolve o valor informado.
  // { = inicia o bloco de instruções ou objeto correspondente.
  return {

    // Define a propriedade `acelerar` desta estrutura com o valor informado nesta linha.
    // acelerar = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    acelerar: !frear,

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    frear,

    // Define a propriedade `esquerda` desta estrutura com o valor informado nesta linha.
    // esquerda = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    esquerda: diferenca<-.035,

    // Define a propriedade `direita` desta estrutura com o valor informado nesta linha.
    // direita = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    direita: diferenca>.035,

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    turbo,

    // Define a propriedade `drift` desta estrutura com o valor informado nesta linha.
    // Math.abs = retorna o valor absoluto do número informado.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // drift = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    drift: intensidadeCurva>.85 && jogador.velocidade>max*.58 && Math.abs(diferenca)>.08

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  };

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// ----------------------------- FÍSICA DO JOGADOR -----------------------------
// Define a função `atualizarJogador`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// atualizarJogador = nome atribuído à função definida nesta linha.
// dt = parâmetro recebido pela função para fornecer o valor relacionado a `dt`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function atualizarJogador(dt) {

  // Declara `carro` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // carro = identificador utilizado para armazenar ou acessar o valor relacionado a `carro`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  const carro=CARROS[carroAtual];

  // Declara `controle` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // controle = identificador utilizado para armazenar ou acessar o valor relacionado a `controle`.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  const controle = modoAtual==='automatico' ? obterControleAutomatico(dt) : {

    // Define a propriedade `acelerar` desta estrutura com o valor informado nesta linha.
    // acelerar = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    acelerar: !!(teclas.ArrowUp || teclas.KeyW || toque.acelerar),

    // Define a propriedade `frear` desta estrutura com o valor informado nesta linha.
    // frear = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    frear: !!(teclas.ArrowDown || teclas.KeyS || toque.freio),

    // Define a propriedade `esquerda` desta estrutura com o valor informado nesta linha.
    // esquerda = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    esquerda: !!(teclas.ArrowLeft || teclas.KeyA || toque.esquerda),

    // Define a propriedade `direita` desta estrutura com o valor informado nesta linha.
    // direita = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    direita: !!(teclas.ArrowRight || teclas.KeyD || toque.direita),

    // Define a propriedade `turbo` desta estrutura com o valor informado nesta linha.
    // turbo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    turbo: !!(teclas.Space || toque.turbo),

    // Define a propriedade `drift` desta estrutura com o valor informado nesta linha.
    // drift = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    drift: !!(teclas.ShiftLeft || teclas.ShiftRight)

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  };

  // Declara `maxMundoBase` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // maxMundoBase = identificador utilizado para armazenar ou acessar o valor relacionado a `maxMundoBase`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const maxMundoBase=carro.max*20;

  // Declara `maxMundoTurbo` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // maxMundoTurbo = identificador utilizado para armazenar ou acessar o valor relacionado a `maxMundoTurbo`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const maxMundoTurbo=carro.turboMax*20;

  // Declara `resistencia` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // resistencia = identificador utilizado para armazenar ou acessar o valor relacionado a `resistencia`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  const resistencia=560;

  // Atualiza `jogador.turboAtivo` com o valor calculado ou informado nesta linha.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.turboAtivo = controle.turbo && jogador.turbo>0.5 && jogador.velocidade>maxMundoBase*.40;

  // Atualiza `jogador.drift` com o valor calculado ou informado nesta linha.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
  // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.drift = controle.drift && jogador.velocidade>maxMundoBase*.38 && (controle.esquerda || controle.direita);

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // += = operador de atribuição que soma o valor da direita ao valor atual.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(controle.acelerar) jogador.velocidade += carro.aceleracao*dt;

  // Define o bloco alternativo executado quando as condições anteriores não forem atendidas.
  // else = define uma alternativa para uma condição anterior.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // -= = operador de atribuição que subtrai o valor da direita do valor atual.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  else jogador.velocidade -= resistencia*dt;

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // -= = operador de atribuição que subtrai o valor da direita do valor atual.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(controle.frear) jogador.velocidade -= carro.frenagem*dt;

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(jogador.turboAtivo) {

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // += = operador de atribuição que soma o valor da direita ao valor atual.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    jogador.velocidade += 2050*dt;

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // -= = operador de atribuição que subtrai o valor da direita do valor atual.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    jogador.turbo -= 19.5*dt;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // Math.random = gera um número pseudoaleatório entre zero e um.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(Math.random()<.045) AudioJogo.turbo();

  // Define o bloco alternativo executado quando as condições anteriores não forem atendidas.
  // else = define uma alternativa para uma condição anterior.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  } else {

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // += = operador de atribuição que soma o valor da direita ao valor atual.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    jogador.turbo += 5.2*dt;

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Atualiza `jogador.turbo` com o valor calculado ou informado nesta linha.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.turbo=limitar(jogador.turbo,0,100);

  // Declara `limiteVel` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // limiteVel = identificador utilizado para armazenar ou acessar o valor relacionado a `limiteVel`.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // maxMundoTurbo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const limiteVel=jogador.turboAtivo?maxMundoTurbo:maxMundoBase;

  // Atualiza `jogador.velocidade` com o valor calculado ou informado nesta linha.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.velocidade=limitar(jogador.velocidade,0,limiteVel);

  // Declara `seg` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // seg = identificador utilizado para armazenar ou acessar o valor relacionado a `seg`.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const seg=acharSegmento(jogador.distancia);

  // Declara `steerFactor` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // steerFactor = identificador utilizado para armazenar ou acessar o valor relacionado a `steerFactor`.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // * = operador utilizado para multiplicação.
  // / = operador utilizado para divisão.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const steerFactor=.72 + jogador.velocidade/maxMundoBase*.92;

  // Declara `taxaDirecao` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // taxaDirecao = identificador utilizado para armazenar ou acessar o valor relacionado a `taxaDirecao`.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const taxaDirecao=(jogador.drift?1.52:1.0)*1.08*steerFactor*carro.controle;

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // -= = operador de atribuição que subtrai o valor da direita do valor atual.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(controle.esquerda) jogador.x-=taxaDirecao*dt;

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // += = operador de atribuição que soma o valor da direita ao valor atual.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(controle.direita) jogador.x+=taxaDirecao*dt;

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // -= = operador de atribuição que subtrai o valor da direita do valor atual.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.x -= seg.curve * (jogador.velocidade/maxMundoBase) * .40 * dt;

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // Math.abs = retorna o valor absoluto do número informado.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // -= = operador de atribuição que subtrai o valor da direita do valor atual.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(Math.abs(jogador.x)>1.02) jogador.velocidade-=1850*dt;

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // Math.abs = retorna o valor absoluto do número informado.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // -= = operador de atribuição que subtrai o valor da direita do valor atual.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(Math.abs(jogador.x)>1.45) jogador.velocidade-=2700*dt;

  // Atualiza `jogador.x` com o valor calculado ou informado nesta linha.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.x=limitar(jogador.x,-1.72,1.72);

  // Atualiza `jogador.velocidade` com o valor calculado ou informado nesta linha.
  // Math.max = retorna o maior valor entre os valores informados.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.velocidade=Math.max(0,jogador.velocidade);

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // -= = operador de atribuição que subtrai o valor da direita do valor atual.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(jogador.drift) jogador.velocidade-=340*dt;

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // += = operador de atribuição que soma o valor da direita ao valor atual.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.distancia += jogador.velocidade*dt;

  // Atualiza `jogador.velMax` com o valor calculado ou informado nesta linha.
  // Math.max = retorna o maior valor entre os valores informados.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.velMax=Math.max(jogador.velMax,jogador.velocidade/20);

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // Math.max = retorna o maior valor entre os valores informados.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(jogador.invulneravel>0) jogador.invulneravel=Math.max(0,jogador.invulneravel-dt);

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // Math.max = retorna o maior valor entre os valores informados.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(jogador.colisaoCooldown>0) jogador.colisaoCooldown=Math.max(0,jogador.colisaoCooldown-dt);

  // Executa `AudioJogo.atualizarMotor` com os argumentos informados nesta linha.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  AudioJogo.atualizarMotor(limitar(jogador.velocidade/maxMundoTurbo,0,1));

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// ----------------------------- COLISÕES ENTRE OS CARROS -----------------------------
// A versão anterior apenas reduzia a velocidade quando havia contato. Como não
// existia uma separação física, os carros ainda podiam continuar avançando e
// atravessar uns aos outros. Agora cada contato resolve a sobreposição antes do
// próximo quadro: batidas traseiras são separadas no eixo da pista e contatos
// laterais empurram os dois veículos para lados opostos.
// Define a função `limitarCarroNaPista`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// limitarCarroNaPista = nome atribuído à função definida nesta linha.
// carro = parâmetro recebido pela função para fornecer o valor relacionado a `carro`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function limitarCarroNaPista(carro) {

  // Atualiza `carro.x` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  carro.x=limitar(carro.x,-1.72,1.72);

  // Atualiza `carro.velocidade` com o valor calculado ou informado nesta linha.
  // Math.max = retorna o maior valor entre os valores informados.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  carro.velocidade=Math.max(0,carro.velocidade);

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `tocarSomColisao`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// tocarSomColisao = nome atribuído à função definida nesta linha.
// a = parâmetro recebido pela função para fornecer o valor relacionado a `a`.
// b = parâmetro recebido pela função para fornecer o valor relacionado a `b`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function tocarSomColisao(a,b) {

  // Declara `podeA` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // podeA = identificador utilizado para armazenar ou acessar o valor relacionado a `podeA`.
  // <= = operador de comparação que verifica se o valor da esquerda é menor ou igual ao da direita.
  // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const podeA=(a.colisaoCooldown||0)<=0;

  // Declara `podeB` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // podeB = identificador utilizado para armazenar ou acessar o valor relacionado a `podeB`.
  // <= = operador de comparação que verifica se o valor da esquerda é menor ou igual ao da direita.
  // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const podeB=(b.colisaoCooldown||0)<=0;

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // return = encerra a função atual e devolve o valor informado.
  // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  if(!podeA && !podeB) return;

  // Atualiza `a.colisaoCooldown` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  a.colisaoCooldown=.26;

  // Atualiza `b.colisaoCooldown` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  b.colisaoCooldown=.26;

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(a===jogador) jogador.invulneravel=.18;

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(b===jogador) jogador.invulneravel=.18;

  // Executa `AudioJogo.colisao` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  AudioJogo.colisao();

  // Executa `mostrarMensagem` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  mostrarMensagem('CONTATO ENTRE OS CARROS!',650);

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `resolverColisaoEntreCarros`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// resolverColisaoEntreCarros = nome atribuído à função definida nesta linha.
// a = parâmetro recebido pela função para fornecer o valor relacionado a `a`.
// b = parâmetro recebido pela função para fornecer o valor relacionado a `b`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function resolverColisaoEntreCarros(a,b) {

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // return = encerra a função atual e devolve o valor informado.
  // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
  // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(a.terminou || b.terminou) return false;

  // Declara `dx` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // dx = identificador utilizado para armazenar ou acessar o valor relacionado a `dx`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const dx=b.x-a.x;

  // Declara `dz` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // dz = identificador utilizado para armazenar ou acessar o valor relacionado a `dz`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const dz=b.distancia-a.distancia;

  // Declara `absX` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // absX = identificador utilizado para armazenar ou acessar o valor relacionado a `absX`.
  // Math.abs = retorna o valor absoluto do número informado.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const absX=Math.abs(dx);

  // Declara `absZ` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // absZ = identificador utilizado para armazenar ou acessar o valor relacionado a `absZ`.
  // Math.abs = retorna o valor absoluto do número informado.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const absZ=Math.abs(dz);

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // return = encerra a função atual e devolve o valor informado.
  // >= = operador de comparação que verifica se o valor da esquerda é maior ou igual ao da direita.
  // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  if(absX>=LARGURA_COLISAO_CARRO || absZ>=COMPRIMENTO_COLISAO_CARRO) return false;

  // Declara `sobreposicaoX` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // sobreposicaoX = identificador utilizado para armazenar ou acessar o valor relacionado a `sobreposicaoX`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  const sobreposicaoX=LARGURA_COLISAO_CARRO-absX;

  // Declara `sobreposicaoZ` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // sobreposicaoZ = identificador utilizado para armazenar ou acessar o valor relacionado a `sobreposicaoZ`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  const sobreposicaoZ=COMPRIMENTO_COLISAO_CARRO-absZ;

  // Declara `impacto` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // impacto = identificador utilizado para armazenar ou acessar o valor relacionado a `impacto`.
  // Math.abs = retorna o valor absoluto do número informado.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const impacto=Math.abs(a.velocidade-b.velocidade);

  // Quando os carros estão mais deslocados lateralmente, o contato é tratado
  // como uma raspada/fechada de porta. Isso impede que um carro atravesse o
  // outro durante uma mudança de faixa.
  // Declara `contatoLateral` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // contatoLateral = identificador utilizado para armazenar ou acessar o valor relacionado a `contatoLateral`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // * = operador utilizado para multiplicação.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const contatoLateral=absX>0.075 && (sobreposicaoX/LARGURA_COLISAO_CARRO)<(sobreposicaoZ/COMPRIMENTO_COLISAO_CARRO)*1.35;

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  if(contatoLateral) {

    // Declara `sinal` e armazena nessa variável ou constante o valor calculado nesta linha.
    // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
    // sinal = identificador utilizado para armazenar ou acessar o valor relacionado a `sinal`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    let sinal=Math.sign(dx);

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // Math.random = gera um número pseudoaleatório entre zero e um.
    // === = operador de comparação estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(sinal===0) sinal=Math.random()<.5?-1:1;

    // Declara `empurrao` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // empurrao = identificador utilizado para armazenar ou acessar o valor relacionado a `empurrao`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // / = operador utilizado para divisão.
    const empurrao=sobreposicaoX/2+MARGEM_SEPARACAO;

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // -= = operador de atribuição que subtrai o valor da direita do valor atual.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    a.x-=sinal*empurrao;

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // += = operador de atribuição que soma o valor da direita ao valor atual.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    b.x+=sinal*empurrao;

    // Raspadas tiram um pouco de velocidade, mas não param os carros.
    // Declara `perda` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // perda = identificador utilizado para armazenar ou acessar o valor relacionado a `perda`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const perda=impacto>900?.88:.94;

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // *= = operador de atribuição que multiplica o valor atual pelo valor da direita.
    // * = operador utilizado para multiplicação.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    a.velocidade*=perda;

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // *= = operador de atribuição que multiplica o valor atual pelo valor da direita.
    // * = operador utilizado para multiplicação.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    b.velocidade*=perda;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // !== = operador de diferença estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // != = operador de comparação que verifica diferença de valores.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(a!==jogador) a.alvoX=limitar(a.x-sinal*.18,-.88,.88);

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // !== = operador de diferença estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // != = operador de comparação que verifica diferença de valores.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(b!==jogador) b.alvoX=limitar(b.x+sinal*.18,-.88,.88);

  // Define o bloco alternativo executado quando as condições anteriores não forem atendidas.
  // else = define uma alternativa para uma condição anterior.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  } else {

    // Colisão dianteira/traseira: identifica quem está na frente e cria uma
    // distância mínima real entre os para-choques. Assim o carro de trás não
    // consegue atravessar o da frente, mesmo com turbo.
    // Declara `frente` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // frente = identificador utilizado para armazenar ou acessar o valor relacionado a `frente`.
    // b = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // >= = operador de comparação que verifica se o valor da esquerda é maior ou igual ao da direita.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
    const frente=dz>=0?b:a;

    // Declara `tras` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // tras = identificador utilizado para armazenar ou acessar o valor relacionado a `tras`.
    // a = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // >= = operador de comparação que verifica se o valor da esquerda é maior ou igual ao da direita.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
    const tras=dz>=0?a:b;

    // Declara `velocidadeTrasAntes` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // velocidadeTrasAntes = identificador utilizado para armazenar ou acessar o valor relacionado a `velocidadeTrasAntes`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const velocidadeTrasAntes=tras.velocidade;

    // Declara `velocidadeFrenteAntes` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // velocidadeFrenteAntes = identificador utilizado para armazenar ou acessar o valor relacionado a `velocidadeFrenteAntes`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const velocidadeFrenteAntes=frente.velocidade;

    // Atualiza `tras.distancia` com o valor calculado ou informado nesta linha.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    tras.distancia=frente.distancia-COMPRIMENTO_COLISAO_CARRO-MARGEM_SEPARACAO*SEGMENTO;

    // Declara `velocidadeContato` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // velocidadeContato = identificador utilizado para armazenar ou acessar o valor relacionado a `velocidadeContato`.
    // Math.min = retorna o menor valor entre os valores informados.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const velocidadeContato=Math.min(velocidadeTrasAntes,velocidadeFrenteAntes*.98+260);

    // Atualiza `tras.velocidade` com o valor calculado ou informado nesta linha.
    // Math.max = retorna o maior valor entre os valores informados.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    tras.velocidade=Math.max(0,velocidadeContato*.78);

    // Atualiza `frente.velocidade` com o valor calculado ou informado nesta linha.
    // Math.min = retorna o menor valor entre os valores informados.
    // Math.max = retorna o maior valor entre os valores informados.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    frente.velocidade=Math.max(velocidadeFrenteAntes,Math.min(velocidadeTrasAntes*.91,velocidadeFrenteAntes+620));

    // Um pequeno deslocamento lateral evita que dois carros fiquem presos
    // exatamente no mesmo eixo após a batida.
    // Declara `sinal` e armazena nessa variável ou constante o valor calculado nesta linha.
    // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
    // sinal = identificador utilizado para armazenar ou acessar o valor relacionado a `sinal`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    let sinal=Math.sign(tras.x-frente.x);

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // === = operador de comparação estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // % = operador utilizado para obter o resto de uma divisão.
    // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(sinal===0) sinal=((adversarios.indexOf(tras)+adversarios.indexOf(frente))%2===0)?-1:1;

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // += = operador de atribuição que soma o valor da direita ao valor atual.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    tras.x+=sinal*.035;

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // -= = operador de atribuição que subtrai o valor da direita do valor atual.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    frente.x-=sinal*.018;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // !== = operador de diferença estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // != = operador de comparação que verifica diferença de valores.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(tras!==jogador) tras.alvoX=limitar(tras.x+sinal*.22,-.88,.88);

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // !== = operador de diferença estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // != = operador de comparação que verifica diferença de valores.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(frente!==jogador) frente.alvoX=limitar(frente.x-sinal*.10,-.88,.88);

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Executa `limitarCarroNaPista` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  limitarCarroNaPista(a);

  // Executa `limitarCarroNaPista` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  limitarCarroNaPista(b);

  // Executa `tocarSomColisao` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  tocarSomColisao(a,b);

  // Retorna o resultado desta linha para o ponto do programa que chamou a função atual.
  // return = encerra a função atual e devolve o valor informado.
  // true = valor lógico verdadeiro utilizado para ativar ou confirmar a condição correspondente.
  return true;

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `verificarColisoes`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// verificarColisoes = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function verificarColisoes() {

  // Cria uma lista de valores e armazena essa coleção em `carros`.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // carros = identificador utilizado para armazenar ou acessar o valor relacionado a `carros`.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const carros=[jogador,...adversarios];

  // Mais de uma passada resolve engavetamentos sem permitir que o veículo do
  // meio seja empurrado para dentro do próximo carro.
  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // for = inicia uma estrutura de repetição.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  for(let iteracao=0;iteracao<3;iteracao++) {

    // Declara `houve` e armazena nessa variável ou constante o valor calculado nesta linha.
    // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
    // houve = identificador utilizado para armazenar ou acessar o valor relacionado a `houve`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
    let houve=false;

    // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
    // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
    // for = inicia uma estrutura de repetição.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    for(let i=0;i<carros.length-1;i++) {

      // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
      // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
      // for = inicia uma estrutura de repetição.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // < = operador de comparação que verifica se o valor da esquerda é menor.
      // + = operador utilizado para soma numérica ou concatenação de textos.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // { = inicia o bloco de instruções ou objeto correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      for(let j=i+1;j<carros.length;j++) {

        // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
        // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
        // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
        // true = valor lógico verdadeiro utilizado para ativar ou confirmar a condição correspondente.
        // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
        // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
        // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
        if(resolverColisaoEntreCarros(carros[i],carros[j])) houve=true;

      // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
      // } = encerra o bloco de instruções ou objeto correspondente.
      }

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // break = interrompe a estrutura atual.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    if(!houve) break;

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `verificarVoltaJogador`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// verificarVoltaJogador = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function verificarVoltaJogador() {

  // Declara `voltaConcluida` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // voltaConcluida = identificador utilizado para armazenar ou acessar o valor relacionado a `voltaConcluida`.
  // Math.floor = arredonda o valor para baixo.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const voltaConcluida=Math.floor(jogador.distancia/comprimentoPista);

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  if(voltaConcluida>ultimaVoltaRegistrada) {

    // Declara `agora` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // agora = identificador utilizado para armazenar ou acessar o valor relacionado a `agora`.
    // performance.now = obtém um marcador de tempo de alta precisão do navegador.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const agora=performance.now();

    // Declara `voltaTempo` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // voltaTempo = identificador utilizado para armazenar ou acessar o valor relacionado a `voltaTempo`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // - = operador utilizado para subtração ou representação de valor negativo.
    const voltaTempo=agora-inicioVolta;

    // Atualiza `melhorVolta` com o valor calculado ou informado nesta linha.
    // Math.min = retorna o menor valor entre os valores informados.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    melhorVolta=Math.min(melhorVolta,voltaTempo);

    // Atualiza `inicioVolta` com o valor calculado ou informado nesta linha.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    inicioVolta=agora;

    // Atualiza `ultimaVoltaRegistrada` com o valor calculado ou informado nesta linha.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    ultimaVoltaRegistrada=voltaConcluida;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    if(voltaConcluida<totalVoltas) {

      // Executa `AudioJogo.volta` com os argumentos informados nesta linha.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      AudioJogo.volta();

      // Executa `mostrarMensagem` com os argumentos informados nesta linha.
      // + = operador utilizado para soma numérica ou concatenação de textos.
      // / = operador utilizado para divisão.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // { = inicia o bloco de instruções ou objeto correspondente.
      // } = encerra o bloco de instruções ou objeto correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      mostrarMensagem(`VOLTA ${voltaConcluida+1}/${totalVoltas}`,1500);

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // >= = operador de comparação que verifica se o valor da esquerda é maior ou igual ao da direita.
  // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(!jogador.terminou && jogador.distancia>=comprimentoPista*totalVoltas) finalizarJogador();

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// ----------------------------- INTELIGÊNCIA ARTIFICIAL DOS ADVERSÁRIOS -----------------------------
// Define a função `atualizarIA`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// atualizarIA = nome atribuído à função definida nesta linha.
// dt = parâmetro recebido pela função para fornecer o valor relacionado a `dt`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function atualizarIA(dt) {

  // Declara `cfg` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // cfg = identificador utilizado para armazenar ou acessar o valor relacionado a `cfg`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  const cfg=CONFIG_DIFICULDADE[dificuldadeAtual];

  // Declara `tempoSegundos` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // tempoSegundos = identificador utilizado para armazenar ou acessar o valor relacionado a `tempoSegundos`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  const tempoSegundos=tempoCorridaAtual()/1000;

  // Declara `velocidadeJogador` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // velocidadeJogador = identificador utilizado para armazenar ou acessar o valor relacionado a `velocidadeJogador`.
  // Math.max = retorna o maior valor entre os valores informados.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const velocidadeJogador=Math.max(1,jogador.velocidade);

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // for = inicia uma estrutura de repetição.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  for(let i=0;i<adversarios.length;i++) {

    // Declara `ai` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // ai = identificador utilizado para armazenar ou acessar o valor relacionado a `ai`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
    // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
    const ai=adversarios[i];

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // Math.max = retorna o maior valor entre os valores informados.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(ai.colisaoCooldown>0) ai.colisaoCooldown=Math.max(0,ai.colisaoCooldown-dt);

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // continue = avança diretamente para a próxima iteração.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(ai.terminou) continue;

    // Declara `carroIA` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // carroIA = identificador utilizado para armazenar ou acessar o valor relacionado a `carroIA`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
    // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const carroIA=CARROS[ai.carroKey];

    // Declara `maxMundo` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // maxMundo = identificador utilizado para armazenar ou acessar o valor relacionado a `maxMundo`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // * = operador utilizado para multiplicação.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const maxMundo=carroIA.max*20;

    // Declara `maxTurboMundo` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // maxTurboMundo = identificador utilizado para armazenar ou acessar o valor relacionado a `maxTurboMundo`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // * = operador utilizado para multiplicação.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const maxTurboMundo=carroIA.turboMax*20;

    // A IA olha mais à frente do que na versão anterior. Isso permite frear antes
    // das curvas e aproveitar melhor as retas, sem depender apenas do segmento atual.
    // Declara `seg1` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // seg1 = identificador utilizado para armazenar ou acessar o valor relacionado a `seg1`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const seg1=acharSegmento(ai.distancia+650);

    // Declara `seg2` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // seg2 = identificador utilizado para armazenar ou acessar o valor relacionado a `seg2`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const seg2=acharSegmento(ai.distancia+1650);

    // Declara `seg3` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // seg3 = identificador utilizado para armazenar ou acessar o valor relacionado a `seg3`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const seg3=acharSegmento(ai.distancia+2900);

    // Declara `curvaPrevista` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // curvaPrevista = identificador utilizado para armazenar ou acessar o valor relacionado a `curvaPrevista`.
    // Math.abs = retorna o valor absoluto do número informado.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const curvaPrevista=Math.abs(seg1.curve)*.50+Math.abs(seg2.curve)*.32+Math.abs(seg3.curve)*.18;

    // Declara `curvaPenalidade` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // curvaPenalidade = identificador utilizado para armazenar ou acessar o valor relacionado a `curvaPenalidade`.
    // Math.min = retorna o menor valor entre os valores informados.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const curvaPenalidade=Math.min(.18,curvaPrevista*.055);

    // Pequena variação por piloto. Ela cria personalidade sem transformar alguns
    // rivais em carros muito mais lentos que o jogador.
    // Declara `habilidadeIndividual` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // habilidadeIndividual = identificador utilizado para armazenar ou acessar o valor relacionado a `habilidadeIndividual`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const habilidadeIndividual=.995 + ((i%5)-2)*.006;

    // Declara `alvo` e armazena nessa variável ou constante o valor calculado nesta linha.
    // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
    // alvo = identificador utilizado para armazenar ou acessar o valor relacionado a `alvo`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    let alvo=maxMundo*cfg.velocidadeIA*ai.personalidade*habilidadeIndividual*(1-curvaPenalidade);

    // --------------------- PELOTÃO COMPETITIVO / RUBBER BANDING JUSTO ---------------------
    // Não há teletransporte. A ajuda altera apenas aceleração e velocidade-alvo.
    // Quanto maior a distância perdida, maior a recuperação, sempre respeitando
    // limites compatíveis com o carro e com a dificuldade escolhida.
    // Declara `diferencaParaJogador` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // diferencaParaJogador = identificador utilizado para armazenar ou acessar o valor relacionado a `diferencaParaJogador`.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const diferencaParaJogador=ai.distancia-jogador.distancia;

    // Declara `bonusRecuperacao` e armazena nessa variável ou constante o valor calculado nesta linha.
    // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
    // bonusRecuperacao = identificador utilizado para armazenar ou acessar o valor relacionado a `bonusRecuperacao`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    let bonusRecuperacao=0;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // += = operador de atribuição que soma o valor da direita ao valor atual.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(diferencaParaJogador<-900)  bonusRecuperacao+=cfg.recuperacao*.28;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // += = operador de atribuição que soma o valor da direita ao valor atual.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(diferencaParaJogador<-2200) bonusRecuperacao+=cfg.recuperacao*.34;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // += = operador de atribuição que soma o valor da direita ao valor atual.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(diferencaParaJogador<-4200) bonusRecuperacao+=cfg.recuperacao*.38;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // += = operador de atribuição que soma o valor da direita ao valor atual.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(diferencaParaJogador<-7000) bonusRecuperacao+=cfg.recuperacao*.28;

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // *= = operador de atribuição que multiplica o valor atual pelo valor da direita.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    alvo*=1+bonusRecuperacao;

    // Se um rival abrir uma vantagem muito grande, ele reduz apenas alguns pontos
    // percentuais. Assim o jogador ainda pode buscar a liderança sem a IA "esperar" demais.
    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // *= = operador de atribuição que multiplica o valor atual pelo valor da direita.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(diferencaParaJogador>6500) alvo*=.965;

    // Testa uma condição alternativa quando a condição anterior não foi atendida.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // else = define uma alternativa para uma condição anterior.
    // *= = operador de atribuição que multiplica o valor atual pelo valor da direita.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    else if(diferencaParaJogador>3800) alvo*=.982;

    // Durante os primeiros segundos todos os adversários fazem uma arrancada de
    // corrida de verdade. Esse era o principal motivo de eles ficarem para trás.
    // Declara `multiplicadorAceleracao` e armazena nessa variável ou constante o valor calculado nesta linha.
    // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
    // multiplicadorAceleracao = identificador utilizado para armazenar ou acessar o valor relacionado a `multiplicadorAceleracao`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    let multiplicadorAceleracao=cfg.aceleracaoIA;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // *= = operador de atribuição que multiplica o valor atual pelo valor da direita.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(tempoSegundos<6.5) multiplicadorAceleracao*=ai.impulsoLargada;

    // Um carro que ficou atrás também acelera com mais decisão para voltar ao pelotão.
    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // *= = operador de atribuição que multiplica o valor atual pelo valor da direita.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(diferencaParaJogador<-2200) multiplicadorAceleracao*=1+cfg.recuperacao*.65;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // *= = operador de atribuição que multiplica o valor atual pelo valor da direita.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(diferencaParaJogador<-5000) multiplicadorAceleracao*=1+cfg.recuperacao*.55;

    // ----------------------------- TURBO DA IA -----------------------------
    // Os rivais agora têm sua própria reserva de turbo. Eles usam principalmente
    // em retas, na largada, em perseguição e para completar ultrapassagens.
    // Declara `retaBoa` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // retaBoa = identificador utilizado para armazenar ou acessar o valor relacionado a `retaBoa`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const retaBoa=curvaPrevista<.34;

    // Declara `perseguindo` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // perseguindo = identificador utilizado para armazenar ou acessar o valor relacionado a `perseguindo`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // - = operador utilizado para subtração ou representação de valor negativo.
    const perseguindo=diferencaParaJogador<-550;

    // Declara `pertoDoJogador` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // pertoDoJogador = identificador utilizado para armazenar ou acessar o valor relacionado a `pertoDoJogador`.
    // Math.abs = retorna o valor absoluto do número informado.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const pertoDoJogador=Math.abs(diferencaParaJogador)<1900;

    // Declara `temTurbo` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // temTurbo = identificador utilizado para armazenar ou acessar o valor relacionado a `temTurbo`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const temTurbo=ai.turbo>8;

    // Declara `podeTurbo` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // podeTurbo = identificador utilizado para armazenar ou acessar o valor relacionado a `podeTurbo`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // * = operador utilizado para multiplicação.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const podeTurbo=ai.velocidade>maxMundo*.43;

    // Declara `chanceTurbo` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // chanceTurbo = identificador utilizado para armazenar ou acessar o valor relacionado a `chanceTurbo`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // * = operador utilizado para multiplicação.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const chanceTurbo=cfg.turboIA*ai.decisaoTurbo;

    // Declara `turboLargada` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // turboLargada = identificador utilizado para armazenar ou acessar o valor relacionado a `turboLargada`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const turboLargada=tempoSegundos>2.2 && tempoSegundos<7.5 && retaBoa;

    // Declara `turboPerseguicao` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // turboPerseguicao = identificador utilizado para armazenar ou acessar o valor relacionado a `turboPerseguicao`.
    // Math.random = gera um número pseudoaleatório entre zero e um.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const turboPerseguicao=perseguindo && retaBoa && Math.random()<chanceTurbo*dt*2.8;

    // Declara `turboDisputa` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // turboDisputa = identificador utilizado para armazenar ou acessar o valor relacionado a `turboDisputa`.
    // Math.random = gera um número pseudoaleatório entre zero e um.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const turboDisputa=pertoDoJogador && retaBoa && cfg.agressividade>.45 && Math.random()<chanceTurbo*dt*1.4;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
    // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
    // true = valor lógico verdadeiro utilizado para ativar ou confirmar a condição correspondente.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(!ai.turboAtivo && temTurbo && podeTurbo && (turboLargada || turboPerseguicao || turboDisputa)) ai.turboAtivo=true;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // <= = operador de comparação que verifica se o valor da esquerda é menor ou igual ao da direita.
    // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
    // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(ai.turboAtivo && (!retaBoa || ai.turbo<=1 || curvaPrevista>.48)) ai.turboAtivo=false;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(ai.turboAtivo) {

      // Atualiza `alvo` com o valor calculado ou informado nesta linha.
      // Math.max = retorna o maior valor entre os valores informados.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // + = operador utilizado para soma numérica ou concatenação de textos.
      // * = operador utilizado para multiplicação.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      alvo=Math.max(alvo,maxTurboMundo*(.91+cfg.turboIA*.065));

      // Atualiza `ai.turbo` com o valor calculado ou informado nesta linha.
      // Math.max = retorna o maior valor entre os valores informados.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // * = operador utilizado para multiplicação.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ai.turbo=Math.max(0,ai.turbo-17.0*dt);

    // Define o bloco alternativo executado quando as condições anteriores não forem atendidas.
    // else = define uma alternativa para uma condição anterior.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    } else {

      // Atualiza `ai.turbo` com o valor calculado ou informado nesta linha.
      // Math.min = retorna o menor valor entre os valores informados.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // + = operador utilizado para soma numérica ou concatenação de textos.
      // * = operador utilizado para multiplicação.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ai.turbo=Math.min(100,ai.turbo+4.4*dt);

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

    // Erro pequeno e contínuo. Em vez de derrubar muito a velocidade, produz
    // oscilações discretas que diferenciam os níveis sem destruir a disputa.
    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // Math.sin = calcula o seno do ângulo informado.
    // *= = operador de atribuição que multiplica o valor atual pelo valor da direita.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    alvo*=1 + Math.sin(ai.distancia*.00009+i*1.7)*cfg.erroIA*.035;

    // Declara `limitePermitido` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // limitePermitido = identificador utilizado para armazenar ou acessar o valor relacionado a `limitePermitido`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const limitePermitido=ai.turboAtivo ? maxTurboMundo*1.015 : maxMundo*(1.015+cfg.recuperacao*.30);

    // Atualiza `alvo` com o valor calculado ou informado nesta linha.
    // Math.min = retorna o menor valor entre os valores informados.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    alvo=Math.min(alvo,limitePermitido);

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(ai.velocidade<alvo) {

      // Declara `aceleracao` e armazena nessa variável ou constante o valor calculado nesta linha.
      // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
      // aceleracao = identificador utilizado para armazenar ou acessar o valor relacionado a `aceleracao`.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // * = operador utilizado para multiplicação.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      let aceleracao=carroIA.aceleracao*multiplicadorAceleracao;

      // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
      // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
      // += = operador de atribuição que soma o valor da direita ao valor atual.
      // + = operador utilizado para soma numérica ou concatenação de textos.
      // * = operador utilizado para multiplicação.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      if(ai.turboAtivo) aceleracao+=1760+cfg.agressividade*520;

      // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
      // += = operador de atribuição que soma o valor da direita ao valor atual.
      // + = operador utilizado para soma numérica ou concatenação de textos.
      // * = operador utilizado para multiplicação.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ai.velocidade+=aceleracao*dt;

    // Define o bloco alternativo executado quando as condições anteriores não forem atendidas.
    // else = define uma alternativa para uma condição anterior.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    } else {

      // Freia de maneira proporcional para não perder dezenas de km/h sem necessidade.
      // Declara `excesso` e armazena nessa variável ou constante o valor calculado nesta linha.
      // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
      // excesso = identificador utilizado para armazenar ou acessar o valor relacionado a `excesso`.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      const excesso=ai.velocidade-alvo;

      // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
      // Math.min = retorna o menor valor entre os valores informados.
      // -= = operador de atribuição que subtrai o valor da direita do valor atual.
      // + = operador utilizado para soma numérica ou concatenação de textos.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // * = operador utilizado para multiplicação.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ai.velocidade-=Math.min(1550,620+excesso*.20)*dt;

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

    // Atualiza `ai.velocidade` com o valor calculado ou informado nesta linha.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ai.velocidade=limitar(ai.velocidade,0,limitePermitido);

    // ----------------------------- ULTRAPASSAGENS -----------------------------
    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // -= = operador de atribuição que subtrai o valor da direita do valor atual.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ai.mudancaFaixa-=dt;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // <= = operador de comparação que verifica se o valor da esquerda é menor ou igual ao da direita.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(ai.mudancaFaixa<=0) {

      // Atualiza `ai.mudancaFaixa` com o valor calculado ou informado nesta linha.
      // Math.random = gera um número pseudoaleatório entre zero e um.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // + = operador utilizado para soma numérica ou concatenação de textos.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // * = operador utilizado para multiplicação.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ai.mudancaFaixa=.55+Math.random()*(1.70-cfg.agressividade*.55);

      // Declara `alvoX` e armazena nessa variável ou constante o valor calculado nesta linha.
      // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
      // alvoX = identificador utilizado para armazenar ou acessar o valor relacionado a `alvoX`.
      // Math.random = gera um número pseudoaleatório entre zero e um.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // + = operador utilizado para soma numérica ou concatenação de textos.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // * = operador utilizado para multiplicação.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      let alvoX=-seg2.curve*.10+(Math.random()-.5)*cfg.erroIA*.55;

      // Cria uma lista de valores e armazena essa coleção em `todos`.
      // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
      // todos = identificador utilizado para armazenar ou acessar o valor relacionado a `todos`.
      // jogador = representa os dados e o estado do carro controlado pelo jogador.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
      // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      const todos=[...adversarios,jogador];

      // Declara `bloqueador` e armazena nessa variável ou constante o valor calculado nesta linha.
      // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
      // bloqueador = identificador utilizado para armazenar ou acessar o valor relacionado a `bloqueador`.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // null = representa explicitamente a ausência de um valor ou objeto.
      let bloqueador=null;

      // Declara `menorDistancia` e armazena nessa variável ou constante o valor calculado nesta linha.
      // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
      // menorDistancia = identificador utilizado para armazenar ou acessar o valor relacionado a `menorDistancia`.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      let menorDistancia=Infinity;

      // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
      // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
      // for = inicia uma estrutura de repetição.
      // of = faz uma estrutura for percorrer os valores de uma coleção.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // { = inicia o bloco de instruções ou objeto correspondente.
      for(const outro of todos) {

        // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
        // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
        // continue = avança diretamente para a próxima iteração.
        // === = operador de comparação estrita que verifica valor e tipo.
        // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
        // == = operador de comparação que verifica igualdade de valores.
        // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        if(outro===ai || outro.terminou) continue;

        // Declara `dz` e armazena nessa variável ou constante o valor calculado nesta linha.
        // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
        // dz = identificador utilizado para armazenar ou acessar o valor relacionado a `dz`.
        // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
        // - = operador utilizado para subtração ou representação de valor negativo.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        const dz=outro.distancia-ai.distancia;

        // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
        // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
        // Math.abs = retorna o valor absoluto do número informado.
        // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
        // > = operador de comparação que verifica se o valor da esquerda é maior.
        // < = operador de comparação que verifica se o valor da esquerda é menor.
        // - = operador utilizado para subtração ou representação de valor negativo.
        // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // { = inicia o bloco de instruções ou objeto correspondente.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        if(dz>0 && dz<1350 && Math.abs(outro.x-ai.x)<.31 && dz<menorDistancia) {

          // Atualiza `bloqueador` com o valor calculado ou informado nesta linha.
          // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
          bloqueador=outro;

          // Atualiza `menorDistancia` com o valor calculado ou informado nesta linha.
          // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
          menorDistancia=dz;

        // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
        // } = encerra o bloco de instruções ou objeto correspondente.
        }

      // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
      // } = encerra o bloco de instruções ou objeto correspondente.
      }

      // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
      // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // { = inicia o bloco de instruções ou objeto correspondente.
      if(bloqueador) {

        // Escolhe o lado com mais espaço em vez de trocar de faixa ao acaso.
        // Cria uma lista de valores e armazena essa coleção em `candidatos`.
        // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
        // candidatos = identificador utilizado para armazenar ou acessar o valor relacionado a `candidatos`.
        // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
        // + = operador utilizado para soma numérica ou concatenação de textos.
        // - = operador utilizado para subtração ou representação de valor negativo.
        // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
        // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
        // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        const candidatos=[limitar(ai.x-.50,-.84,.84),limitar(ai.x+.50,-.84,.84)];

        // Declara `melhor` e armazena nessa variável ou constante o valor calculado nesta linha.
        // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
        // melhor = identificador utilizado para armazenar ou acessar o valor relacionado a `melhor`.
        // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
        // - = operador utilizado para subtração ou representação de valor negativo.
        // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
        // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
        // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
        let melhor=candidatos[0], melhorFolga=-1;

        // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
        // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
        // for = inicia uma estrutura de repetição.
        // of = faz uma estrutura for percorrer os valores de uma coleção.
        // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // { = inicia o bloco de instruções ou objeto correspondente.
        for(const candidato of candidatos) {

          // Declara `folga` e armazena nessa variável ou constante o valor calculado nesta linha.
          // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
          // folga = identificador utilizado para armazenar ou acessar o valor relacionado a `folga`.
          // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
          let folga=10;

          // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
          // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
          // for = inicia uma estrutura de repetição.
          // of = faz uma estrutura for percorrer os valores de uma coleção.
          // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
          // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
          // { = inicia o bloco de instruções ou objeto correspondente.
          for(const outro of todos) {

            // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
            // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
            // continue = avança diretamente para a próxima iteração.
            // === = operador de comparação estrita que verifica valor e tipo.
            // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
            // == = operador de comparação que verifica igualdade de valores.
            // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
            // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
            // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
            if(outro===ai || outro.terminou) continue;

            // Declara `dz` e armazena nessa variável ou constante o valor calculado nesta linha.
            // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
            // dz = identificador utilizado para armazenar ou acessar o valor relacionado a `dz`.
            // Math.abs = retorna o valor absoluto do número informado.
            // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
            // - = operador utilizado para subtração ou representação de valor negativo.
            // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
            // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
            // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
            const dz=Math.abs(outro.distancia-ai.distancia);

            // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
            // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
            // Math.min = retorna o menor valor entre os valores informados.
            // Math.abs = retorna o valor absoluto do número informado.
            // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
            // < = operador de comparação que verifica se o valor da esquerda é menor.
            // - = operador utilizado para subtração ou representação de valor negativo.
            // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
            // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
            // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
            // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
            if(dz<1050) folga=Math.min(folga,Math.abs(outro.x-candidato));

          // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
          // } = encerra o bloco de instruções ou objeto correspondente.
          }

          // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
          // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
          // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
          // > = operador de comparação que verifica se o valor da esquerda é maior.
          // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
          // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
          // { = inicia o bloco de instruções ou objeto correspondente.
          // } = encerra o bloco de instruções ou objeto correspondente.
          if(folga>melhorFolga) { melhorFolga=folga; melhor=candidato; }

        // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
        // } = encerra o bloco de instruções ou objeto correspondente.
        }

        // Atualiza `alvoX` com o valor calculado ou informado nesta linha.
        // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
        alvoX=melhor;

        // Ao entrar numa disputa direta, a IA segura um pouco mais o acelerador.
        // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
        // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
        // Math.max = retorna o maior valor entre os valores informados.
        // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
        // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
        // > = operador de comparação que verifica se o valor da esquerda é maior.
        // + = operador utilizado para soma numérica ou concatenação de textos.
        // * = operador utilizado para multiplicação.
        // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
        // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
        // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
        if(cfg.agressividade>.5 && retaBoa) alvo=Math.max(alvo,maxMundo*(.995+cfg.agressividade*.035));

      // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
      // } = encerra o bloco de instruções ou objeto correspondente.
      }

      // Atualiza `ai.alvoX` com o valor calculado ou informado nesta linha.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ai.alvoX=limitar(alvoX,-.84,.84);

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

    // Declara `velocidadeLateral` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // velocidadeLateral = identificador utilizado para armazenar ou acessar o valor relacionado a `velocidadeLateral`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const velocidadeLateral=(.56+cfg.agressividade*.20)*dt;

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // += = operador de atribuição que soma o valor da direita ao valor atual.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ai.x += limitar(ai.alvoX-ai.x,-velocidadeLateral,velocidadeLateral);

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // Math.max = retorna o maior valor entre os valores informados.
    // += = operador de atribuição que soma o valor da direita ao valor atual.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ai.distancia += Math.max(0,ai.velocidade)*dt;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // >= = operador de comparação que verifica se o valor da esquerda é maior ou igual ao da direita.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(ai.distancia>=comprimentoPista*totalVoltas) {

      // Atualiza `ai.terminou` com o valor calculado ou informado nesta linha.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // true = valor lógico verdadeiro utilizado para ativar ou confirmar a condição correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ai.terminou=true;

      // Atualiza `ai.tempoFim` com o valor calculado ou informado nesta linha.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      ai.tempoFim=tempoCorridaAtual();

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// ----------------------------- RESULTADO E POSIÇÃO -----------------------------
// Define a função `participantesOrdenados`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// participantesOrdenados = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function participantesOrdenados() {

  // Cria uma lista de valores e armazena essa coleção em `todos`.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // todos = identificador utilizado para armazenar ou acessar o valor relacionado a `todos`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  const todos=[

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // nome = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // distancia = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // jogador = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // terminou = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // tempoFim = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // true = valor lógico verdadeiro utilizado para ativar ou confirmar a condição correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    {nome:jogador.nome,distancia:jogador.distancia,jogador:true,terminou:jogador.terminou,tempoFim:jogador.tempoFim},

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // .map = cria um novo array transformando cada elemento da coleção.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // nome = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // distancia = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // jogador = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // terminou = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // tempoFim = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // => = define uma função de seta e separa seus parâmetros do corpo.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ...adversarios.map(a=>({nome:a.nome,distancia:a.distancia,jogador:false,terminou:a.terminou,tempoFim:a.tempoFim}))

  // Encerra a chamada, lista ou estrutura iniciada nas linhas anteriores.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  ];

  // Retorna o resultado desta linha para o ponto do programa que chamou a função atual.
  // return = encerra a função atual e devolve o valor informado.
  // .sort = ordena os elementos do array usando a regra informada.
  // => = define uma função de seta e separa seus parâmetros do corpo.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  return todos.sort((a,b)=>{

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // return = encerra a função atual e devolve o valor informado.
    // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(a.terminou&&b.terminou) return a.tempoFim-b.tempoFim;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // return = encerra a função atual e devolve o valor informado.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(a.terminou) return -1;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // return = encerra a função atual e devolve o valor informado.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(b.terminou) return 1;

    // Retorna o resultado desta linha para o ponto do programa que chamou a função atual.
    // return = encerra a função atual e devolve o valor informado.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    return b.distancia-a.distancia;

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  });

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `posicaoJogador`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// posicaoJogador = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function posicaoJogador() {

  // Retorna o resultado desta linha para o ponto do programa que chamou a função atual.
  // return = encerra a função atual e devolve o valor informado.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // => = define uma função de seta e separa seus parâmetros do corpo.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  return participantesOrdenados().findIndex(p=>p.jogador)+1;

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `tempoCorridaAtual`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// tempoCorridaAtual = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function tempoCorridaAtual() {

  // Retorna o resultado desta linha para o ponto do programa que chamou a função atual.
  // return = encerra a função atual e devolve o valor informado.
  // Math.max = retorna o maior valor entre os valores informados.
  // performance.now = obtém um marcador de tempo de alta precisão do navegador.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // tempoFim = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // === = operador de comparação estrita que verifica valor e tipo.
  // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
  // == = operador de comparação que verifica igualdade de valores.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  return estado==='fim' && jogador.tempoFim ? jogador.tempoFim : Math.max(0,performance.now()-inicioCorrida-tempoPausadoAcumulado);

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `finalizarJogador`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// async = indica que a função pode trabalhar com operações assíncronas.
// finalizarJogador = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
async function finalizarJogador() {

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // return = encerra a função atual e devolve o valor informado.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if (jogador.terminou) return;

  // Atualiza `jogador.terminou` com o valor calculado ou informado nesta linha.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // true = valor lógico verdadeiro utilizado para ativar ou confirmar a condição correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.terminou=true;

  // Atualiza `jogador.tempoFim` com o valor calculado ou informado nesta linha.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.tempoFim=tempoCorridaAtual();

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // *= = operador de atribuição que multiplica o valor atual pelo valor da direita.
  // * = operador utilizado para multiplicação.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.velocidade*=.7;

  // Declara `pos` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // pos = identificador utilizado para armazenar ou acessar o valor relacionado a `pos`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  const pos=posicaoJogador();

  // Atualiza `estado` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  estado='fim';

  // Executa `AudioJogo.atualizarMotor` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  AudioJogo.atualizarMotor(0);

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(pos===1) AudioJogo.vitoria();

  // Declara `cfg` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // cfg = identificador utilizado para armazenar ou acessar o valor relacionado a `cfg`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  const cfg=CONFIG_DIFICULDADE[dificuldadeAtual];

  // Declara `pontos` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // pontos = identificador utilizado para armazenar ou acessar o valor relacionado a `pontos`.
  // Math.round = arredonda o valor para o número inteiro mais próximo.
  // Math.max = retorna o maior valor entre os valores informados.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const pontos=Math.max(10,Math.round(cfg.premio*(9-pos)/8));

  // Atualiza `jogador.pontos` com o valor calculado ou informado nesta linha.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  jogador.pontos=pontos;

  // Executa `document.getElementById` com os argumentos informados nesta linha.
  // document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
  // "resultadoSelo" = identificador do elemento HTML que será localizado no documento.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  document.getElementById('resultadoSelo').textContent=pos===1?'VITÓRIA!':'CORRIDA CONCLUÍDA';

  // Executa `document.getElementById` com os argumentos informados nesta linha.
  // document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
  // "resultadoTitulo" = identificador do elemento HTML que será localizado no documento.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  document.getElementById('resultadoTitulo').textContent=`${ordinal(pos)} LUGAR`;

  // Executa `document.getElementById` com os argumentos informados nesta linha.
  // document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
  // "fimPosicao" = identificador do elemento HTML que será localizado no documento.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  document.getElementById('fimPosicao').textContent=ordinal(pos);

  // Executa `document.getElementById` com os argumentos informados nesta linha.
  // document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
  // "fimTempo" = identificador do elemento HTML que será localizado no documento.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  document.getElementById('fimTempo').textContent=formatarTempo(jogador.tempoFim);

  // Executa `document.getElementById` com os argumentos informados nesta linha.
  // document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
  // "fimMelhorVolta" = identificador do elemento HTML que será localizado no documento.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // / = operador utilizado para divisão.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  document.getElementById('fimMelhorVolta').textContent=isFinite(melhorVolta)?formatarTempo(melhorVolta):formatarTempo(jogador.tempoFim/totalVoltas);

  // Executa `document.getElementById` com os argumentos informados nesta linha.
  // document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
  // Math.round = arredonda o valor para o número inteiro mais próximo.
  // "fimVelMax" = identificador do elemento HTML que será localizado no documento.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  document.getElementById('fimVelMax').textContent=`${Math.round(jogador.velMax)} km/h`;

  // Executa `document.getElementById` com os argumentos informados nesta linha.
  // document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
  // "fimCenario" = identificador do elemento HTML que será localizado no documento.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  document.getElementById('fimCenario').textContent=CENARIOS[cenarioAtual].nome;

  // Executa `document.getElementById` com os argumentos informados nesta linha.
  // document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
  // "fimCarro" = identificador do elemento HTML que será localizado no documento.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  document.getElementById('fimCarro').textContent=CARROS[carroAtual].nome;

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  await Banco.salvar({

    // Define a propriedade `nome` desta estrutura com o valor informado nesta linha.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // nome = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    nome:jogador.nome,

    // Define a propriedade `data` desta estrutura com o valor informado nesta linha.
    // new = cria uma nova instância do objeto ou classe indicado.
    // data = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    data:new Date().toISOString(),

    // Define a propriedade `posicao` desta estrutura com o valor informado nesta linha.
    // posicao = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    posicao:pos,

    // Define a propriedade `tempo` desta estrutura com o valor informado nesta linha.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // tempo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    tempo:jogador.tempoFim,

    // Define a propriedade `melhorVolta` desta estrutura com o valor informado nesta linha.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // melhorVolta = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // / = operador utilizado para divisão.
    // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    melhorVolta:isFinite(melhorVolta)?melhorVolta:jogador.tempoFim/totalVoltas,

    // Define a propriedade `velocidadeMax` desta estrutura com o valor informado nesta linha.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // velocidadeMax = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    velocidadeMax:jogador.velMax,

    // Define a propriedade `dificuldade` desta estrutura com o valor informado nesta linha.
    // dificuldade = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    dificuldade:dificuldadeAtual,

    // Define a propriedade `voltas` desta estrutura com o valor informado nesta linha.
    // voltas = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    voltas:totalVoltas,

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    pontos,

    // Define a propriedade `cenario` desta estrutura com o valor informado nesta linha.
    // cenario = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    cenario:cenarioAtual,

    // Define a propriedade `carro` desta estrutura com o valor informado nesta linha.
    // carro = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    carro:carroAtual,

    // Define a propriedade `modo` desta estrutura com o valor informado nesta linha.
    // modo = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    modo:modoAtual

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  });

  // Executa `abrirModal` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  abrirModal('modalFim');

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// ----------------------------- RENDERIZAÇÃO DA PISTA -----------------------------
// Define a função `renderizar`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// renderizar = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function renderizar() {

  // Declara `largura` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // largura = identificador utilizado para armazenar ou acessar o valor relacionado a `largura`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const largura=viewport.largura;

  // Declara `altura` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // altura = identificador utilizado para armazenar ou acessar o valor relacionado a `altura`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const altura=viewport.altura;

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.clearRect(0,0,largura,altura);

  // Executa `desenharCenario` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  desenharCenario(largura,altura);

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // return = encerra a função atual e devolve o valor informado.
  // segmentos = representa a coleção de segmentos que formam a pista.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(!segmentos.length) return;

  // Declara `cameraCfg` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // cameraCfg = identificador utilizado para armazenar ou acessar o valor relacionado a `cameraCfg`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  const cameraCfg=CAMERAS[cameraAtual];

  // CORREÇÃO IMPORTANTE:
  // a câmera deve ficar ATRÁS do carro. Na versão anterior, o recuo era somado
  // e a câmera acabava ficando à frente do jogador, fazendo os adversários sumirem.
  // Atualiza `cameraDistanciaRender` com o valor calculado ou informado nesta linha.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  cameraDistanciaRender=jogador.distancia-cameraCfg.recuo;

  // Declara `cameraPosicao` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // cameraPosicao = identificador utilizado para armazenar ou acessar o valor relacionado a `cameraPosicao`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  const cameraPosicao=mod(cameraDistanciaRender,comprimentoPista);

  // Declara `baseSegmento` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // baseSegmento = identificador utilizado para armazenar ou acessar o valor relacionado a `baseSegmento`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  const baseSegmento=acharSegmento(cameraPosicao);

  // Declara `baseIndice` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // baseIndice = identificador utilizado para armazenar ou acessar o valor relacionado a `baseIndice`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const baseIndice=baseSegmento.index;

  // Declara `percentBase` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // percentBase = identificador utilizado para armazenar ou acessar o valor relacionado a `percentBase`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  const percentBase=percentualNoSegmento(cameraPosicao);

  // Declara `playerSegment` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // playerSegment = identificador utilizado para armazenar ou acessar o valor relacionado a `playerSegment`.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const playerSegment=acharSegmento(jogador.distancia);

  // Declara `playerPercent` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // playerPercent = identificador utilizado para armazenar ou acessar o valor relacionado a `playerPercent`.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const playerPercent=percentualNoSegmento(jogador.distancia);

  // Declara `playerY` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // playerY = identificador utilizado para armazenar ou acessar o valor relacionado a `playerY`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const playerY=interpolar(playerSegment.p1.world.y,playerSegment.p2.world.y,playerPercent);

  // Declara `x` e armazena nessa variável ou constante o valor calculado nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // x = identificador utilizado para armazenar ou acessar o valor relacionado a `x`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  let x=0;

  // Declara `dx` e armazena nessa variável ou constante o valor calculado nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // dx = identificador utilizado para armazenar ou acessar o valor relacionado a `dx`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  let dx=-(baseSegmento.curve*percentBase);

  // Declara `maxY` e armazena nessa variável ou constante o valor calculado nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // maxY = identificador utilizado para armazenar ou acessar o valor relacionado a `maxY`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  let maxY=altura;

  // Cria uma lista de valores e armazena essa coleção em `visiveis`.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // visiveis = identificador utilizado para armazenar ou acessar o valor relacionado a `visiveis`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  const visiveis=[];

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // for = inicia uma estrutura de repetição.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  for(let n=0;n<DISTANCIA_DESENHO;n++) {

    // Declara `seg` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // seg = identificador utilizado para armazenar ou acessar o valor relacionado a `seg`.
    // segmentos = representa a coleção de segmentos que formam a pista.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
    // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const seg=segmentos[(baseIndice+n)%segmentos.length];

    // Atualiza `seg.looped` com o valor calculado ou informado nesta linha.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    seg.looped=seg.index<baseIndice;

    // Quando o índice volta ao começo da pista, deslocamos a câmera em um comprimento
    // completo para manter as coordenadas contínuas e evitar saltos visuais.
    // Declara `cameraZ` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // cameraZ = identificador utilizado para armazenar ou acessar o valor relacionado a `cameraZ`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // comprimentoPista = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const cameraZ=seg.looped ? cameraPosicao-comprimentoPista : cameraPosicao;

    // Executa `projetar` com os argumentos informados nesta linha.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    projetar(seg.p1,jogador.x*LARGURA_PISTA-x,cameraCfg.altura+playerY,cameraZ,largura,altura);

    // Executa `projetar` com os argumentos informados nesta linha.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    projetar(seg.p2,jogador.x*LARGURA_PISTA-x-dx,cameraCfg.altura+playerY,cameraZ,largura,altura);

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // += = operador de atribuição que soma o valor da direita ao valor atual.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    x+=dx;

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // += = operador de atribuição que soma o valor da direita ao valor atual.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    dx+=seg.curve;

    // Atualiza `seg.visivel` com o valor calculado ou informado nesta linha.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    seg.visivel=seg.p1.camera.z>PROFUNDIDADE_CAMERA && seg.p2.screen.y<maxY && seg.p2.screen.y<seg.p1.screen.y;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(seg.visivel) {

      // Executa `visiveis.push` com os argumentos informados nesta linha.
      // .push = adiciona um novo elemento ao final do array.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      visiveis.push(seg);

      // Atualiza `maxY` com o valor calculado ou informado nesta linha.
      // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      maxY=seg.p2.screen.y;

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // for = inicia uma estrutura de repetição.
  // >= = operador de comparação que verifica se o valor da esquerda é maior ou igual ao da direita.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  for(let i=visiveis.length-1;i>=0;i--) {

    // Declara `seg` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // seg = identificador utilizado para armazenar ou acessar o valor relacionado a `seg`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
    // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
    const seg=visiveis[i];

    // Executa `desenharSegmento` com os argumentos informados nesta linha.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    desenharSegmento(seg,largura,seg.index%12<7);

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // === = operador de comparação estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(seg.index%9===0) {

      // Executa `desenharObjetoLateral` com os argumentos informados nesta linha.
      // - = operador utilizado para subtração ou representação de valor negativo.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      desenharObjetoLateral(seg,.7,-1);

      // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
      // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
      // === = operador de comparação estrita que verifica valor e tipo.
      // == = operador de comparação que verifica igualdade de valores.
      // % = operador utilizado para obter o resto de uma divisão.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
      // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
      if(seg.index%18===0) desenharObjetoLateral(seg,.68,1);

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

    // Executa `desenharAdversariosNoSegmento` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    desenharAdversariosNoSegmento(seg);

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Declara `carro` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // carro = identificador utilizado para armazenar ou acessar o valor relacionado a `carro`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  const carro=CARROS[carroAtual];

  // Declara `velNorm` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // velNorm = identificador utilizado para armazenar ou acessar o valor relacionado a `velNorm`.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const velNorm=limitar(jogador.velocidade/(carro.turboMax*20),0,1);

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(velNorm>.58) desenharLinhasVelocidade(largura,altura,(velNorm-.58)/.42);

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(cameraCfg.carro) {

    // Declara `steer` e armazena nessa variável ou constante o valor calculado nesta linha.
    // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
    // steer = identificador utilizado para armazenar ou acessar o valor relacionado a `steer`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    let steer=0;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // === = operador de comparação estrita que verifica valor e tipo.
    // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
    // == = operador de comparação que verifica igualdade de valores.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(modoAtual==='manual') steer=(teclas.ArrowLeft||teclas.KeyA||toque.esquerda?-1:0)+(teclas.ArrowRight||teclas.KeyD||toque.direita?1:0);

    // Define o bloco alternativo executado quando as condições anteriores não forem atendidas.
    // else = define uma alternativa para uma condição anterior.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    else steer=limitar((jogador.autoAlvoX-jogador.x)*1.6,-1,1);

    // Declara `carW` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // carW = identificador utilizado para armazenar ou acessar o valor relacionado a `carW`.
    // Math.min = retorna o menor valor entre os valores informados.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const carW=Math.min(largura*.17,230)*cameraCfg.escalaJogador;

    // Executa `desenharCarro` com os argumentos informados nesta linha.
    // jogador = representa os dados e o estado do carro controlado pelo jogador.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // / = operador utilizado para divisão.
    // true = valor lógico verdadeiro utilizado para ativar ou confirmar a condição correspondente.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    desenharCarro(largura/2+jogador.x*largura*.018,altura*cameraCfg.yJogador,carW,carro.cor,carro.tipo,true,steer*.035);

  // Define o bloco alternativo executado quando as condições anteriores não forem atendidas.
  // else = define uma alternativa para uma condição anterior.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  } else {

    // Executa `desenharCapo` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    desenharCapo(largura,altura);

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Executa `desenharMiniMapa` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  desenharMiniMapa();

  // Executa `atualizarHUD` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  atualizarHUD();

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `desenharAdversariosNoSegmento`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// desenharAdversariosNoSegmento = nome atribuído à função definida nesta linha.
// seg = parâmetro recebido pela função para fornecer o valor relacionado a `seg`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function desenharAdversariosNoSegmento(seg) {

  // Declara `alcanceMax` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // alcanceMax = identificador utilizado para armazenar ou acessar o valor relacionado a `alcanceMax`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  const alcanceMax=DISTANCIA_DESENHO*SEGMENTO;

  // Cria uma lista de valores e armazena essa coleção em `carrosDoSegmento`.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // carrosDoSegmento = identificador utilizado para armazenar ou acessar o valor relacionado a `carrosDoSegmento`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  const carrosDoSegmento=[];

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // for = inicia uma estrutura de repetição.
  // of = faz uma estrutura for percorrer os valores de uma coleção.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  for(const ai of adversarios) {

    // Declara `relativoContinuo` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // relativoContinuo = identificador utilizado para armazenar ou acessar o valor relacionado a `relativoContinuo`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const relativoContinuo=ai.distancia-cameraDistanciaRender;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // continue = avança diretamente para a próxima iteração.
    // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    if(relativoContinuo<0 || relativoContinuo>alcanceMax) continue;

    // Declara `s` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // s = identificador utilizado para armazenar ou acessar o valor relacionado a `s`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const s=acharSegmento(ai.distancia);

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // continue = avança diretamente para a próxima iteração.
    // !== = operador de diferença estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // != = operador de comparação que verifica diferença de valores.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(s.index!==seg.index) continue;

    // Executa `carrosDoSegmento.push` com os argumentos informados nesta linha.
    // .push = adiciona um novo elemento ao final do array.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    carrosDoSegmento.push(ai);

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Primeiro os mais distantes; por último os mais próximos.
  // Executa `carrosDoSegmento.sort` com os argumentos informados nesta linha.
  // .sort = ordena os elementos do array usando a regra informada.
  // => = define uma função de seta e separa seus parâmetros do corpo.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  carrosDoSegmento.sort((a,b)=>b.distancia-a.distancia);

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // for = inicia uma estrutura de repetição.
  // of = faz uma estrutura for percorrer os valores de uma coleção.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  for(const ai of carrosDoSegmento) {

    // Declara `rel` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // rel = identificador utilizado para armazenar ou acessar o valor relacionado a `rel`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const rel=percentualNoSegmento(ai.distancia);

    // Declara `p1` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // p1 = identificador utilizado para armazenar ou acessar o valor relacionado a `p1`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const p1=seg.p1.screen;

    // Declara `p2` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // p2 = identificador utilizado para armazenar ou acessar o valor relacionado a `p2`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const p2=seg.p2.screen;

    // Declara `x` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // x = identificador utilizado para armazenar ou acessar o valor relacionado a `x`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const x=interpolar(p1.x,p2.x,rel)+interpolar(p1.w,p2.w,rel)*ai.x;

    // Declara `y` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // y = identificador utilizado para armazenar ou acessar o valor relacionado a `y`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const y=interpolar(p1.y,p2.y,rel);

    // Declara `w` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // w = identificador utilizado para armazenar ou acessar o valor relacionado a `w`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const w=interpolar(p1.w,p2.w,rel);

    // Declara `carW` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // carW = identificador utilizado para armazenar ou acessar o valor relacionado a `carW`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const carW=limitar(w*.24,2,184);

    // Declara `carroIA` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // carroIA = identificador utilizado para armazenar ou acessar o valor relacionado a `carroIA`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
    // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const carroIA=CARROS[ai.carroKey];

    // Executa `desenharCarro` com os argumentos informados nesta linha.
    // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    desenharCarro(x,y,carW,ai.cor,carroIA.tipo,false,0);

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `desenharLinhasVelocidade`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// desenharLinhasVelocidade = nome atribuído à função definida nesta linha.
// largura = parâmetro recebido pela função para fornecer o valor relacionado a `largura`.
// altura = parâmetro recebido pela função para fornecer o valor relacionado a `altura`.
// intensidade = parâmetro recebido pela função para fornecer o valor relacionado a `intensidade`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function desenharLinhasVelocidade(largura,altura,intensidade) {

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.save();

  // Atualiza `ctx.strokeStyle` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.strokeStyle=`rgba(255,255,255,${.06+intensidade*.11})`;

  // Atualiza `ctx.lineWidth` com o valor calculado ou informado nesta linha.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.lineWidth=1;

  // Declara `quantidade` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // quantidade = identificador utilizado para armazenar ou acessar o valor relacionado a `quantidade`.
  // Math.floor = arredonda o valor para baixo.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const quantidade=Math.floor(16+intensidade*26);

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // for = inicia uma estrutura de repetição.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  for(let i=0;i<quantidade;i++) {

    // Declara `lado` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // lado = identificador utilizado para armazenar ou acessar o valor relacionado a `lado`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // % = operador utilizado para obter o resto de uma divisão.
    // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
    const lado=i%2?1:-1;

    // Declara `y` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // y = identificador utilizado para armazenar ou acessar o valor relacionado a `y`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // * = operador utilizado para multiplicação.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    const y=(i*73%altura);

    // Declara `x` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // x = identificador utilizado para armazenar ou acessar o valor relacionado a `x`.
    // === = operador de comparação estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // % = operador utilizado para obter o resto de uma divisão.
    // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const x=lado===-1?(i*47%(largura*.18)):largura-(i*47%(largura*.18));

    // Configura ou executa uma operação de desenho no canvas principal do jogo.
    // ctx = representa o contexto 2D usado para desenhar no canvas principal.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+lado*35*intensidade,y+20*intensidade);ctx.stroke();

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.restore();

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// ----------------------------- HUD E MINIMAPA -----------------------------
// Define a função `atualizarHUD`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// atualizarHUD = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function atualizarHUD() {

  // Declara `pos` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // pos = identificador utilizado para armazenar ou acessar o valor relacionado a `pos`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  const pos=posicaoJogador();

  // Declara `volta` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // volta = identificador utilizado para armazenar ou acessar o valor relacionado a `volta`.
  // Math.floor = arredonda o valor para baixo.
  // Math.min = retorna o menor valor entre os valores informados.
  // Math.max = retorna o maior valor entre os valores informados.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const volta=Math.min(totalVoltas,Math.floor(Math.max(0,jogador.distancia)/comprimentoPista)+1);

  // Declara `kmh` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // kmh = identificador utilizado para armazenar ou acessar o valor relacionado a `kmh`.
  // Math.round = arredonda o valor para o número inteiro mais próximo.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const kmh=Math.round(jogador.velocidade/20);

  // Declara `carro` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // carro = identificador utilizado para armazenar ou acessar o valor relacionado a `carro`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  const carro=CARROS[carroAtual];

  // Atualiza `hudPosicao.innerHTML` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // / = operador utilizado para divisão.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  hudPosicao.innerHTML=`${pos}<small>/8</small>`;

  // Atualiza `hudVolta.innerHTML` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // / = operador utilizado para divisão.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  hudVolta.innerHTML=`${volta}<small>/${totalVoltas}</small>`;

  // Atualiza `hudVelocidade.textContent` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  hudVelocidade.textContent=kmh;

  // Atualiza `hudTempo.textContent` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  hudTempo.textContent=formatarTempo(tempoCorridaAtual());

  // Em vez de alterar WIDTH, usamos SCALE. Isso não recalcula o layout e impede
  // que a interface se desconfigure ao pressionar ou soltar o turbo.
  // Atualiza `hudTurbo.style.transform` com o valor calculado ou informado nesta linha.
  // .toFixed = formata o número com a quantidade informada de casas decimais.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  hudTurbo.style.transform=`scaleX(${(jogador.turbo/100).toFixed(4)})`;

  // Atualiza `hudRpm.style.transform` com o valor calculado ou informado nesta linha.
  // .toFixed = formata o número com a quantidade informada de casas decimais.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  hudRpm.style.transform=`scaleX(${limitar(kmh/carro.turboMax,0,1).toFixed(4)})`;

  // Executa `hud.classList.toggle` com os argumentos informados nesta linha.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  hud.classList.toggle('turbo-ativo',jogador.turboAtivo);

  // Atualiza `hudCamera.textContent` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  hudCamera.textContent=CAMERAS[cameraAtual].nome;

  // Declara `ordem` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // ordem = identificador utilizado para armazenar ou acessar o valor relacionado a `ordem`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  const ordem=participantesOrdenados();

  // Atualiza `placarPilotos.innerHTML` com o valor calculado ou informado nesta linha.
  // .map = cria um novo array transformando cada elemento da coleção.
  // .join = junta os elementos do array em um único texto usando o separador informado.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // => = define uma função de seta e separa seus parâmetros do corpo.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // / = operador utilizado para divisão.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  placarPilotos.innerHTML=ordem.map((p,i)=>`<div class="linha-piloto ${p.jogador?'jogador':''}"><b>${i+1}</b><span>${escapeHtml(p.nome)}</span></div>`).join('');

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // !== = operador de diferença estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // != = operador de comparação que verifica diferença de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  if(pos!==posicaoAnterior) {

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    if(pos<posicaoAnterior) mostrarMensagem(`VOCÊ SUBIU PARA ${ordinal(pos)}!`,950);

    // Testa uma condição alternativa quando a condição anterior não foi atendida.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // else = define uma alternativa para uma condição anterior.
    // POSIÇÃO = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // === = operador de comparação estrita que verifica valor e tipo.
    // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
    // == = operador de comparação que verifica igualdade de valores.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    else if(pos>posicaoAnterior && modoAtual==='manual') mostrarMensagem(`POSIÇÃO: ${ordinal(pos)}`,700);

    // Atualiza `posicaoAnterior` com o valor calculado ou informado nesta linha.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    posicaoAnterior=pos;

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `desenharMiniMapa`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// desenharMiniMapa = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function desenharMiniMapa() {

  // Declara `w` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // w = identificador utilizado para armazenar ou acessar o valor relacionado a `w`.
  // miniMapa = representa o canvas utilizado para exibir o minimapa.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const w=miniMapa.width,h=miniMapa.height;

  // Configura ou executa uma operação de desenho no canvas utilizado pelo minimapa.
  // miniCtx = representa o contexto 2D usado para desenhar o minimapa.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  miniCtx.clearRect(0,0,w,h);

  // Atualiza `miniCtx.fillStyle` com o valor calculado ou informado nesta linha.
  // Math.PI = constante que representa o valor de pi.
  // miniCtx = representa o contexto 2D usado para desenhar o minimapa.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // / = operador utilizado para divisão.
  // rgba(6,9,15,.84) = define aproximadamente a cor azul-marinho quase preto pelos canais vermelho, verde e azul com alfa .84.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  miniCtx.fillStyle='rgba(6,9,15,.84)';miniCtx.beginPath();miniCtx.arc(w/2,h/2,w*.48,0,Math.PI*2);miniCtx.fill();

  // Atualiza `miniCtx.strokeStyle` com o valor calculado ou informado nesta linha.
  // miniCtx = representa o contexto 2D usado para desenhar o minimapa.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // #fff = código hexadecimal da cor branco.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  miniCtx.strokeStyle='#fff';miniCtx.lineWidth=5;miniCtx.lineCap='round';miniCtx.beginPath();

  // Declara `cx` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // cx = identificador utilizado para armazenar ou acessar o valor relacionado a `cx`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // / = operador utilizado para divisão.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  const cx=w/2,cy=h/2;

  // Declara `fatorCenario` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // fatorCenario = identificador utilizado para armazenar ou acessar o valor relacionado a `fatorCenario`.
  // === = operador de comparação estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
  const fatorCenario=cenarioAtual==='neon'?4:cenarioAtual==='canion'?2:cenarioAtual==='serra'?3:3;

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // let = declara uma variável de escopo de bloco cujo valor pode ser alterado durante a execução.
  // for = inicia uma estrutura de repetição.
  // Math.floor = arredonda o valor para baixo.
  // Math.max = retorna o maior valor entre os valores informados.
  // segmentos = representa a coleção de segmentos que formam a pista.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // += = operador de atribuição que soma o valor da direita ao valor atual.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  for(let i=0;i<segmentos.length;i+=Math.max(1,Math.floor(segmentos.length/160))) {

    // Declara `t` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // t = identificador utilizado para armazenar ou acessar o valor relacionado a `t`.
    // Math.PI = constante que representa o valor de pi.
    // segmentos = representa a coleção de segmentos que formam a pista.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // * = operador utilizado para multiplicação.
    // / = operador utilizado para divisão.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const t=i/segmentos.length*Math.PI*2;

    // Declara `rX` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // rX = identificador utilizado para armazenar ou acessar o valor relacionado a `rX`.
    // Math.sin = calcula o seno do ângulo informado.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const rX=w*.30+Math.sin(t*fatorCenario)*w*.05;

    // Declara `rY` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // rY = identificador utilizado para armazenar ou acessar o valor relacionado a `rY`.
    // Math.cos = calcula o cosseno do ângulo informado.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const rY=h*.28+Math.cos(t*(fatorCenario-1))*h*.04;

    // Declara `px` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // px = identificador utilizado para armazenar ou acessar o valor relacionado a `px`.
    // Math.cos = calcula o cosseno do ângulo informado.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const px=cx+Math.cos(t)*rX;

    // Declara `py` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // py = identificador utilizado para armazenar ou acessar o valor relacionado a `py`.
    // Math.sin = calcula o seno do ângulo informado.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const py=cy+Math.sin(t)*rY;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // else = define uma alternativa para uma condição anterior.
    // miniCtx = representa o contexto 2D usado para desenhar o minimapa.
    // === = operador de comparação estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(i===0) miniCtx.moveTo(px,py); else miniCtx.lineTo(px,py);

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Configura ou executa uma operação de desenho no canvas utilizado pelo minimapa.
  // miniCtx = representa o contexto 2D usado para desenhar o minimapa.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  miniCtx.closePath();miniCtx.stroke();

  // Declara `desenharPonto` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // desenharPonto = identificador utilizado para armazenar ou acessar o valor relacionado a `desenharPonto`.
  // => = define uma função de seta e separa seus parâmetros do corpo.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  const desenharPonto=(dist,cor,tam)=>{

    // Declara `t` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // t = identificador utilizado para armazenar ou acessar o valor relacionado a `t`.
    // Math.PI = constante que representa o valor de pi.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // * = operador utilizado para multiplicação.
    // / = operador utilizado para divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const t=mod(dist,comprimentoPista)/comprimentoPista*Math.PI*2;

    // Declara `rX` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // rX = identificador utilizado para armazenar ou acessar o valor relacionado a `rX`.
    // Math.sin = calcula o seno do ângulo informado.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const rX=w*.30+Math.sin(t*fatorCenario)*w*.05;

    // Declara `rY` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // rY = identificador utilizado para armazenar ou acessar o valor relacionado a `rY`.
    // Math.cos = calcula o cosseno do ângulo informado.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const rY=h*.28+Math.cos(t*(fatorCenario-1))*h*.04;

    // Atualiza `miniCtx.fillStyle` com o valor calculado ou informado nesta linha.
    // Math.PI = constante que representa o valor de pi.
    // Math.sin = calcula o seno do ângulo informado.
    // Math.cos = calcula o cosseno do ângulo informado.
    // miniCtx = representa o contexto 2D usado para desenhar o minimapa.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // * = operador utilizado para multiplicação.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    miniCtx.fillStyle=cor;miniCtx.beginPath();miniCtx.arc(cx+Math.cos(t)*rX,cy+Math.sin(t)*rY,tam,0,Math.PI*2);miniCtx.fill();

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  };

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // for = inicia uma estrutura de repetição.
  // of = faz uma estrutura for percorrer os valores de uma coleção.
  // #f2f2f2 = código hexadecimal da cor branco fumaça.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  for(const ai of adversarios) desenharPonto(ai.distancia,'#f2f2f2',3.2);

  // Executa `desenharPonto` com os argumentos informados nesta linha.
  // jogador = representa os dados e o estado do carro controlado pelo jogador.
  // #ff2e1f = código hexadecimal da cor laranja avermelhado.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  desenharPonto(jogador.distancia,'#ff2e1f',6);

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `escapeHtml`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// escapeHtml = nome atribuído à função definida nesta linha.
// txt = parâmetro recebido pela função para fornecer o valor relacionado a `txt`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function escapeHtml(txt) {

  // Retorna o resultado desta linha para o ponto do programa que chamou a função atual.
  // return = encerra a função atual e devolve o valor informado.
  // => = define uma função de seta e separa seus parâmetros do corpo.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  return String(txt).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// ----------------------------- LOOP PRINCIPAL -----------------------------
// Define a função `loop`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// loop = nome atribuído à função definida nesta linha.
// agora = parâmetro recebido pela função para fornecer o valor relacionado a `agora`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function loop(agora) {

  // Declara `delta` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // delta = identificador utilizado para armazenar ou acessar o valor relacionado a `delta`.
  // Math.min = retorna o menor valor entre os valores informados.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // / = operador utilizado para divisão.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const delta=Math.min(.1,(agora-ultimoTempoFrame)/1000);

  // Atualiza `ultimoTempoFrame` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  ultimoTempoFrame=agora;

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // += = operador de atribuição que soma o valor da direita ao valor atual.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  acumulador+=delta;

  // Inicia uma repetição que continua enquanto a condição informada permanecer verdadeira.
  // while = inicia uma repetição baseada em condição.
  // >= = operador de comparação que verifica se o valor da esquerda é maior ou igual ao da direita.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  while(acumulador>=PASSO_FIXO) {

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // === = operador de comparação estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    if(estado==='corrida') {

      // Executa `atualizarJogador` com os argumentos informados nesta linha.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      atualizarJogador(PASSO_FIXO);

      // Executa `atualizarIA` com os argumentos informados nesta linha.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      atualizarIA(PASSO_FIXO);

      // Executa `verificarColisoes` com os argumentos informados nesta linha.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      verificarColisoes();

      // Executa `verificarVoltaJogador` com os argumentos informados nesta linha.
      // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
      verificarVoltaJogador();

    // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    }

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // -= = operador de atribuição que subtrai o valor da direita do valor atual.
    // - = operador utilizado para subtração ou representação de valor negativo.
    acumulador-=PASSO_FIXO;

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(telaJogo.classList.contains('ativa')) renderizar();

  // Agenda o próximo quadro do ciclo de animação do jogo no navegador.
  // requestAnimationFrame = agenda a execução da função de animação no próximo quadro do navegador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  animacaoId=requestAnimationFrame(loop);

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// ----------------------------- PAUSA -----------------------------
// Define a função `pausar`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// pausar = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function pausar() {

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // return = encerra a função atual e devolve o valor informado.
  // !== = operador de diferença estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // != = operador de comparação que verifica diferença de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  if(estado!=='corrida') return;

  // Atualiza `estado` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  estado='pausado';

  // Atualiza `inicioPausa` com o valor calculado ou informado nesta linha.
  // performance.now = obtém um marcador de tempo de alta precisão do navegador.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  inicioPausa=performance.now();

  // Executa `abrirModal` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  abrirModal('modalPausa');

  // Executa `AudioJogo.atualizarMotor` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  AudioJogo.atualizarMotor(0);

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `continuar`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// continuar = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function continuar() {

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // return = encerra a função atual e devolve o valor informado.
  // !== = operador de diferença estrita que verifica valor e tipo.
  // == = operador de comparação que verifica igualdade de valores.
  // != = operador de comparação que verifica diferença de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  if(estado!=='pausado') return;

  // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
  // performance.now = obtém um marcador de tempo de alta precisão do navegador.
  // += = operador de atribuição que soma o valor da direita ao valor atual.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  tempoPausadoAcumulado+=performance.now()-inicioPausa;

  // Atualiza `estado` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  estado='corrida';

  // Executa `fecharModal` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  fecharModal('modalPausa');

  // Executa `canvas.focus` com os argumentos informados nesta linha.
  // canvas = representa o canvas principal utilizado para desenhar a corrida.
  // preventScroll = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
  // true = valor lógico verdadeiro utilizado para ativar ou confirmar a condição correspondente.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  canvas.focus({preventScroll:true});

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `voltarMenu`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// voltarMenu = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function voltarMenu() {

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  if (contadorContagem) { clearInterval(contadorContagem); contadorContagem=0; }

  // Atualiza `estado` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  estado='menu';

  // Executa `fecharTodosModais` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  fecharTodosModais();

  // Executa `telaJogo.classList.remove` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  telaJogo.classList.remove('ativa');

  // Executa `telaMenu.classList.add` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  telaMenu.classList.add('ativa');

  // Executa `AudioJogo.atualizarMotor` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  AudioJogo.atualizarMotor(0);

  // Executa `hud.classList.remove` com os argumentos informados nesta linha.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  hud.classList.remove('turbo-ativo');

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// ----------------------------- RANKING -----------------------------
// Define a função `mostrarRanking`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// async = indica que a função pode trabalhar com operações assíncronas.
// mostrarRanking = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
async function mostrarRanking() {

  // Declara `resultados` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // resultados = identificador utilizado para armazenar ou acessar o valor relacionado a `resultados`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const resultados=await Banco.listar();

  // Declara `pilotos` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // new = cria uma nova instância do objeto ou classe indicado.
  // pilotos = identificador utilizado para armazenar ou acessar o valor relacionado a `pilotos`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  const pilotos=new Map();

  // Inicia uma estrutura de repetição para percorrer ou repetir os valores definidos nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // for = inicia uma estrutura de repetição.
  // of = faz uma estrutura for percorrer os valores de uma coleção.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  for(const r of resultados) {

    // Declara `chave` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // chave = identificador utilizado para armazenar ou acessar o valor relacionado a `chave`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const chave=(r.nome||'Jogador').toLowerCase();

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // nome = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // corridas = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // vitorias = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // pontos = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // melhor = propriedade ou chave utilizada nesta estrutura para armazenar o valor correspondente.
    // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(!pilotos.has(chave)) pilotos.set(chave,{nome:r.nome||'Jogador',corridas:0,vitorias:0,pontos:0,melhor:Infinity});

    // Declara `p` e armazena nessa variável ou constante o valor calculado nesta linha.
    // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
    // p = identificador utilizado para armazenar ou acessar o valor relacionado a `p`.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    const p=pilotos.get(chave);

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    p.corridas++;

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // === = operador de comparação estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    if(r.posicao===1) p.vitorias++;

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
    // += = operador de atribuição que soma o valor da direita ao valor atual.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    p.pontos+=Number(r.pontos)||0;

    // Atualiza `p.melhor` com o valor calculado ou informado nesta linha.
    // Math.min = retorna o menor valor entre os valores informados.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    p.melhor=Math.min(p.melhor,Number(r.tempo)||Infinity);

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Cria uma lista de valores e armazena essa coleção em `ranking`.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // ranking = identificador utilizado para armazenar ou acessar o valor relacionado a `ranking`.
  // .sort = ordena os elementos do array usando a regra informada.
  // => = define uma função de seta e separa seus parâmetros do corpo.
  // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const ranking=[...pilotos.values()].sort((a,b)=>b.pontos-a.pontos||b.vitorias-a.vitorias||a.melhor-b.melhor);

  // Localiza um elemento da página e armazena sua referência em `alvo` para uso posterior no jogo.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // alvo = identificador utilizado para armazenar ou acessar o valor relacionado a `alvo`.
  // document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
  // "rankingTabela" = identificador do elemento HTML que será localizado no documento.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const alvo=document.getElementById('rankingTabela');

  // Atualiza `alvo.innerHTML` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // < = operador de comparação que verifica se o valor da esquerda é menor.
  // + = operador utilizado para soma numérica ou concatenação de textos.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // / = operador utilizado para divisão.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  alvo.innerHTML='<div class="ranking-linha cabecalho"><span>#</span><span>Piloto</span><span>Pontos</span><span>Vitórias</span><span>Corridas</span><span>Melhor tempo</span></div>'+

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // .map = cria um novo array transformando cada elemento da coleção.
    // .join = junta os elementos do array em um único texto usando o separador informado.
    // => = define uma função de seta e separa seus parâmetros do corpo.
    // > = operador de comparação que verifica se o valor da esquerda é maior.
    // < = operador de comparação que verifica se o valor da esquerda é menor.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // / = operador utilizado para divisão.
    // ? : = operador condicional ternário que escolhe entre dois valores de acordo com uma condição.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // { = inicia o bloco de instruções ou objeto correspondente.
    // } = encerra o bloco de instruções ou objeto correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    (ranking.length?ranking.map((p,i)=>`<div class="ranking-linha"><span>${i+1}</span><span>${escapeHtml(p.nome)}</span><span>${p.pontos}</span><span>${p.vitorias}</span><span>${p.corridas}</span><span>${isFinite(p.melhor)?formatarTempo(p.melhor):'-'}</span></div>`).join(''):'<p class="subtexto">Ainda não existem corridas salvas. Complete uma corrida para entrar no ranking.</p>');

  // Executa `abrirModal` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  abrirModal('modalRanking');

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// ----------------------------- INTERFACE -----------------------------
// Define a função `abrirModal`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// abrirModal = nome atribuído à função definida nesta linha.
// id = parâmetro recebido pela função para fornecer o valor relacionado a `id`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function abrirModal(id) {

  // Localiza um elemento da página e armazena sua referência em `el` para uso posterior no jogo.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // el = identificador utilizado para armazenar ou acessar o valor relacionado a `el`.
  // document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const el=document.getElementById(id);

  // Executa `el.classList.add` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  el.classList.add('aberto');

  // Executa `el.setAttribute` com os argumentos informados nesta linha.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  el.setAttribute('aria-hidden','false');

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `fecharModal`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// fecharModal = nome atribuído à função definida nesta linha.
// id = parâmetro recebido pela função para fornecer o valor relacionado a `id`.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function fecharModal(id) {

  // Localiza um elemento da página e armazena sua referência em `el` para uso posterior no jogo.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // el = identificador utilizado para armazenar ou acessar o valor relacionado a `el`.
  // document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const el=document.getElementById(id);

  // Executa `el.classList.remove` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  el.classList.remove('aberto');

  // Executa `el.setAttribute` com os argumentos informados nesta linha.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // true = valor lógico verdadeiro utilizado para ativar ou confirmar a condição correspondente.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  el.setAttribute('aria-hidden','true');

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `fecharTodosModais`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// fecharTodosModais = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function fecharTodosModais() {

  // Executa `document.querySelectorAll` com os argumentos informados nesta linha.
  // .forEach = executa a função informada para cada elemento da coleção.
  // => = define uma função de seta e separa seus parâmetros do corpo.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  document.querySelectorAll('.modal').forEach(m=>{

    // Executa `m.classList.remove` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    m.classList.remove('aberto');

    // Executa `m.setAttribute` com os argumentos informados nesta linha.
    // - = operador utilizado para subtração ou representação de valor negativo.
    // true = valor lógico verdadeiro utilizado para ativar ou confirmar a condição correspondente.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    m.setAttribute('aria-hidden','true');

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  });

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `mostrarMensagem`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// mostrarMensagem = nome atribuído à função definida nesta linha.
// texto = parâmetro recebido pela função para fornecer o valor relacionado a `texto`.
// duracao = parâmetro recebido pela função para fornecer o valor relacionado a `duracao`.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
function mostrarMensagem(texto,duracao=1000) {

  // Atualiza `mensagemEl.textContent` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  mensagemEl.textContent=texto;

  // Executa `mensagemEl.classList.add` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  mensagemEl.classList.add('mostrar');

  // Executa `clearTimeout` com os argumentos informados nesta linha.
  // clearTimeout = cancela uma temporização criada anteriormente.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  clearTimeout(mensagemTimer);

  // Atualiza `mensagemTimer` com o valor calculado ou informado nesta linha.
  // setTimeout = agenda a execução de uma função depois do intervalo informado.
  // => = define uma função de seta e separa seus parâmetros do corpo.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  mensagemTimer=setTimeout(()=>mensagemEl.classList.remove('mostrar'),duracao);

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `ajustarCanvas`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// ajustarCanvas = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function ajustarCanvas() {

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // return = encerra a função atual e devolve o valor informado.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(!telaJogo.classList.contains('ativa')) return;

  // Declara `rect` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // rect = identificador utilizado para armazenar ou acessar o valor relacionado a `rect`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const rect=telaJogo.getBoundingClientRect();

  // Declara `largura` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // largura = identificador utilizado para armazenar ou acessar o valor relacionado a `largura`.
  // Math.floor = arredonda o valor para baixo.
  // Math.max = retorna o maior valor entre os valores informados.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const largura=Math.max(320,Math.floor(rect.width));

  // Declara `altura` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // altura = identificador utilizado para armazenar ou acessar o valor relacionado a `altura`.
  // Math.floor = arredonda o valor para baixo.
  // Math.max = retorna o maior valor entre os valores informados.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const altura=Math.max(240,Math.floor(rect.height));

  // Declara `dpr` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // dpr = identificador utilizado para armazenar ou acessar o valor relacionado a `dpr`.
  // Math.min = retorna o menor valor entre os valores informados.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const dpr=Math.min(2,window.devicePixelRatio||1);

  // Atualiza `viewport` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  viewport={largura,altura,dpr};

  // Declara `realW` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // realW = identificador utilizado para armazenar ou acessar o valor relacionado a `realW`.
  // Math.round = arredonda o valor para o número inteiro mais próximo.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const realW=Math.round(largura*dpr);

  // Declara `realH` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // realH = identificador utilizado para armazenar ou acessar o valor relacionado a `realH`.
  // Math.round = arredonda o valor para o número inteiro mais próximo.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // * = operador utilizado para multiplicação.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const realH=Math.round(altura*dpr);

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // canvas = representa o canvas principal utilizado para desenhar a corrida.
  // !== = operador de diferença estrita que verifica valor e tipo.
  // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
  // == = operador de comparação que verifica igualdade de valores.
  // != = operador de comparação que verifica diferença de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(canvas.width!==realW || canvas.height!==realH) {

    // Atualiza `canvas.width` com o valor calculado ou informado nesta linha.
    // canvas = representa o canvas principal utilizado para desenhar a corrida.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    canvas.width=realW;

    // Atualiza `canvas.height` com o valor calculado ou informado nesta linha.
    // canvas = representa o canvas principal utilizado para desenhar a corrida.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    canvas.height=realH;

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Configura ou executa uma operação de desenho no canvas principal do jogo.
  // ctx = representa o contexto 2D usado para desenhar no canvas principal.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ctx.setTransform(dpr,0,0,dpr,0,0);

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Define a função `atualizarPreviewMenu`, responsável por executar a rotina correspondente quando for chamada.
// function = define uma nova função reutilizável.
// atualizarPreviewMenu = nome atribuído à função definida nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
function atualizarPreviewMenu() {

  // Declara `carro` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // carro = identificador utilizado para armazenar ou acessar o valor relacionado a `carro`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const carro=CARROS[carroEl.value]||CARROS.veloce;

  // Declara `cenario` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // cenario = identificador utilizado para armazenar ou acessar o valor relacionado a `cenario`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const cenario=CENARIOS[cenarioEl.value]||CENARIOS.costa;

  // Atualiza `previewCarroNome.textContent` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  previewCarroNome.textContent=carro.nome;

  // Atualiza `previewCarroStats.textContent` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  previewCarroStats.textContent=carro.estatisticas;

  // Executa `miniCarro.style.setProperty` com os argumentos informados nesta linha.
  // - = operador utilizado para subtração ou representação de valor negativo.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  miniCarro.style.setProperty('--carro-cor',carro.cor);

  // Atualiza `previewCenarioNome.textContent` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  previewCenarioNome.textContent=cenario.nome;

  // Atualiza `previewCenarioDesc.textContent` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  previewCenarioDesc.textContent=cenario.descricao;

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// ----------------------------- EVENTOS DO TECLADO -----------------------------
// Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
// addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
// => = define uma função de seta e separa seus parâmetros do corpo.
// > = operador de comparação que verifica se o valor da esquerda é maior.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
window.addEventListener('keydown',e=>{

  // Declara `emJogo` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // emJogo = identificador utilizado para armazenar ou acessar o valor relacionado a `emJogo`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const emJogo=telaJogo.classList.contains('ativa');

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(emJogo && ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)) e.preventDefault();

  // Atualiza `teclas[e.code]` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // true = valor lógico verdadeiro utilizado para ativar ou confirmar a condição correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  teclas[e.code]=true;

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // === = operador de comparação estrita que verifica valor e tipo.
  // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(e.code==='KeyC' && !e.repeat && emJogo) {

    // Atualiza `cameraAtual` com o valor calculado ou informado nesta linha.
    // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
    // + = operador utilizado para soma numérica ou concatenação de textos.
    // % = operador utilizado para obter o resto de uma divisão.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    cameraAtual=(cameraAtual+1)%CAMERAS.length;

    // Executa `mostrarMensagem` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
    // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
    // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    mostrarMensagem(CAMERAS[cameraAtual].nome,650);

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // === = operador de comparação estrita que verifica valor e tipo.
  // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
  // || = operador lógico OU que aceita que pelo menos uma das condições seja verdadeira.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if((e.code==='Escape'||e.code==='KeyP') && !e.repeat && emJogo) {

    // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // === = operador de comparação estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    if(estado==='corrida') pausar();

    // Testa uma condição alternativa quando a condição anterior não foi atendida.
    // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
    // else = define uma alternativa para uma condição anterior.
    // === = operador de comparação estrita que verifica valor e tipo.
    // == = operador de comparação que verifica igualdade de valores.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    else if(estado==='pausado') continuar();

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// } = encerra o bloco de instruções ou objeto correspondente.
});

// Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
// addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
// => = define uma função de seta e separa seus parâmetros do corpo.
// > = operador de comparação que verifica se o valor da esquerda é maior.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
window.addEventListener('keyup',e=>{

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  if(telaJogo.classList.contains('ativa') && ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)) e.preventDefault();

  // Atualiza `teclas[e.code]` com o valor calculado ou informado nesta linha.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  teclas[e.code]=false;

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// } = encerra o bloco de instruções ou objeto correspondente.
});

// Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
// addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
// => = define uma função de seta e separa seus parâmetros do corpo.
// > = operador de comparação que verifica se o valor da esquerda é maior.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
window.addEventListener('blur',()=>{

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // === = operador de comparação estrita que verifica valor e tipo.
  // && = operador lógico E que exige que as condições combinadas sejam verdadeiras.
  // == = operador de comparação que verifica igualdade de valores.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  if(estado==='corrida' && modoAtual==='manual') pausar();

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// } = encerra o bloco de instruções ou objeto correspondente.
});

// Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
// addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
window.addEventListener('resize',ajustarCanvas);

// Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
// if = inicia uma estrutura condicional executada quando a condição é verdadeira.
// in = verifica a presença de uma propriedade ou é utilizado em estruturas de repetição específicas.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
if ('ResizeObserver' in window) {

  // Declara `ro` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // new = cria uma nova instância do objeto ou classe indicado.
  // ro = identificador utilizado para armazenar ou acessar o valor relacionado a `ro`.
  // => = define uma função de seta e separa seus parâmetros do corpo.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  const ro=new ResizeObserver(()=>ajustarCanvas());

  // Executa `ro.observe` com os argumentos informados nesta linha.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  ro.observe(telaJogo);

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// } = encerra o bloco de instruções ou objeto correspondente.
}

// Controles de toque/mouse.
// Executa `document.querySelectorAll` com os argumentos informados nesta linha.
// .forEach = executa a função informada para cada elemento da coleção.
// => = define uma função de seta e separa seus parâmetros do corpo.
// > = operador de comparação que verifica se o valor da esquerda é maior.
// - = operador utilizado para subtração ou representação de valor negativo.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
// ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
document.querySelectorAll('[data-controle]').forEach(btn=>{

  // Declara `nome` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // nome = identificador utilizado para armazenar ou acessar o valor relacionado a `nome`.
  // = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const nome=btn.dataset.controle;

  // Declara `ligar` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // ligar = identificador utilizado para armazenar ou acessar o valor relacionado a `ligar`.
  // === = operador de comparação estrita que verifica valor e tipo.
  // => = define uma função de seta e separa seus parâmetros do corpo.
  // == = operador de comparação que verifica igualdade de valores.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // true = valor lógico verdadeiro utilizado para ativar ou confirmar a condição correspondente.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const ligar=e=>{e.preventDefault(); if(modoAtual==='manual') toque[nome]=true;};

  // Declara `desligar` e armazena nessa variável ou constante o valor calculado nesta linha.
  // const = declara uma constante cujo identificador não pode receber uma nova referência depois da inicialização.
  // desligar = identificador utilizado para armazenar ou acessar o valor relacionado a `desligar`.
  // => = define uma função de seta e separa seus parâmetros do corpo.
  // > = operador de comparação que verifica se o valor da esquerda é maior.
  // false = valor lógico falso utilizado para desativar ou negar a condição correspondente.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  // [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
  // ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  const desligar=e=>{e.preventDefault(); toque[nome]=false;};

  // Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
  // addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  btn.addEventListener('pointerdown',ligar);

  // Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
  // addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  btn.addEventListener('pointerup',desligar);

  // Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
  // addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  btn.addEventListener('pointercancel',desligar);

  // Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
  // addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
  // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
  btn.addEventListener('pointerleave',desligar);

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// } = encerra o bloco de instruções ou objeto correspondente.
});

// Botões principais.
// Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
// "btnJogar" = identificador do elemento HTML que será localizado no documento.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
document.getElementById('btnJogar').addEventListener('click',iniciarCorrida);

// Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
// "btnComoJogar" = identificador do elemento HTML que será localizado no documento.
// => = define uma função de seta e separa seus parâmetros do corpo.
// > = operador de comparação que verifica se o valor da esquerda é maior.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
document.getElementById('btnComoJogar').addEventListener('click',()=>abrirModal('modalComoJogar'));

// Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
// "btnRanking" = identificador do elemento HTML que será localizado no documento.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
document.getElementById('btnRanking').addEventListener('click',mostrarRanking);

// Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
// "btnPausaRapida" = identificador do elemento HTML que será localizado no documento.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
document.getElementById('btnPausaRapida').addEventListener('click',pausar);

// Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
// "btnContinuar" = identificador do elemento HTML que será localizado no documento.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
document.getElementById('btnContinuar').addEventListener('click',continuar);

// Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
// "btnReiniciar" = identificador do elemento HTML que será localizado no documento.
// => = define uma função de seta e separa seus parâmetros do corpo.
// > = operador de comparação que verifica se o valor da esquerda é maior.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// } = encerra o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
document.getElementById('btnReiniciar').addEventListener('click',()=>{fecharTodosModais();iniciarCorrida();});

// Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
// "btnSairMenu" = identificador do elemento HTML que será localizado no documento.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
document.getElementById('btnSairMenu').addEventListener('click',voltarMenu);

// Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
// "btnJogarNovamente" = identificador do elemento HTML que será localizado no documento.
// => = define uma função de seta e separa seus parâmetros do corpo.
// > = operador de comparação que verifica se o valor da esquerda é maior.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// } = encerra o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
document.getElementById('btnJogarNovamente').addEventListener('click',()=>{fecharModal('modalFim');iniciarCorrida();});

// Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
// "btnFimMenu" = identificador do elemento HTML que será localizado no documento.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
document.getElementById('btnFimMenu').addEventListener('click',voltarMenu);

// Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
// async = indica que a função pode trabalhar com operações assíncronas.
// document.getElementById = localiza no documento HTML o elemento que possui o identificador informado.
// addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
// "btnLimparRanking" = identificador do elemento HTML que será localizado no documento.
// => = define uma função de seta e separa seus parâmetros do corpo.
// > = operador de comparação que verifica se o valor da esquerda é maior.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
document.getElementById('btnLimparRanking').addEventListener('click',async()=>{

  // Verifica a condição informada e executa o bloco seguinte somente quando ela for verdadeira.
  // if = inicia uma estrutura condicional executada quando a condição é verdadeira.
  // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
  // { = inicia o bloco de instruções ou objeto correspondente.
  if(confirm('Deseja realmente apagar todo o ranking?')) {

    // Executa a instrução desta linha como parte da lógica, interface ou renderização do jogo.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
    await Banco.limpar();

    // Executa `mostrarRanking` com os argumentos informados nesta linha.
    // ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    // ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
    mostrarRanking();

  // Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
  // } = encerra o bloco de instruções ou objeto correspondente.
  }

// Encerra o bloco de instruções ou a estrutura iniciada anteriormente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// } = encerra o bloco de instruções ou objeto correspondente.
});

// Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
// addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
// .forEach = executa a função informada para cada elemento da coleção.
// => = define uma função de seta e separa seus parâmetros do corpo.
// > = operador de comparação que verifica se o valor da esquerda é maior.
// - = operador utilizado para subtração ou representação de valor negativo.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// [ = inicia um array, acesso por índice ou outra estrutura baseada em colchetes.
// ] = encerra o array, acesso por índice ou estrutura baseada em colchetes.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
document.querySelectorAll('[data-fechar]').forEach(b=>b.addEventListener('click',()=>fecharModal(b.dataset.fechar)));

// Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
// addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
carroEl.addEventListener('change',atualizarPreviewMenu);

// Registra um evento da interface para executar a rotina informada quando a interação ocorrer.
// addEventListener = registra uma função para ser executada quando o evento informado ocorrer.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// , = separa argumentos, parâmetros, propriedades ou elementos presentes nesta linha.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
cenarioEl.addEventListener('change',atualizarPreviewMenu);

// Inicialização visual.
// Atualiza `cenarioAtual` com o valor calculado ou informado nesta linha.
// = = operador de atribuição utilizado para armazenar ou associar o valor da direita ao elemento da esquerda.
cenarioAtual='costa';

// Executa `construirPista` com os argumentos informados nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
construirPista();

// Executa `atualizarPreviewMenu` com os argumentos informados nesta linha.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
atualizarPreviewMenu();

// Executa `Banco.abrir` com os argumentos informados nesta linha.
// catch = captura o erro ocorrido no bloco try.
// => = define uma função de seta e separa seus parâmetros do corpo.
// > = operador de comparação que verifica se o valor da esquerda é maior.
// ( = abre a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// ) = fecha a lista de argumentos, parâmetros, condição ou agrupamento correspondente.
// { = inicia o bloco de instruções ou objeto correspondente.
// } = encerra o bloco de instruções ou objeto correspondente.
// . = acessa uma propriedade, método ou recurso pertencente ao objeto indicado antes do ponto.
Banco.abrir().catch(()=>{});
