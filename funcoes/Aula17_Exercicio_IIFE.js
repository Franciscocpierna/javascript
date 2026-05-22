/*
Exercício: Implementação de um Sistema de Notificações

O objetivo deste exercício é implementar um sistema de
notificações simples que utiliza IIFE para encapsular suas
variáveis e funções, evitando assim a poluição do escopo
global. O sistema deverá permitir registrar mensagens de
notificação e exibi-las todas de uma vez.

Requisitos:
Encapsulamento: Utilize uma IIFE para encapsular o código
do sistema de notificações, garantindo que variáveis internas
não sejam acessíveis fora da função imediatamente invocada.

Registro de Notificações: Dentro da IIFE, crie uma função
para registrar mensagens de notificação. Cada mensagem
deve ser armazenada em um array.

Exibição de Notificações: Crie também uma função para
exibir todas as mensagens de notificação registradas.
Ao exibir as notificações, cada mensagem deve ser
mostrada em um console.log separado.

Exposição de API: A IIFE deve expor um objeto com as
funções de registro e exibição de notificações, permitindo
que essas ações sejam realizadas de fora da IIFE.
*/

// Solução

// Declaração e inicialização da constante `sistemaDeNotificacoes` com uma IIFE.
// A IIFE cria um escopo fechado, permitindo encapsular variáveis e funções.
// Isso ajuda a prevenir interferências no escopo global e mantém o código organizado.
const sistemaDeNotificacoes = (function() {

    // Declaração de uma variável `notificacoes` no escopo da IIFE.
    // Esta variável é um array que vai armazenar strings, cada uma representando uma notificação.
    let notificacoes = [];
  
    // Definição da função `registrar` dentro do escopo da IIFE.
    // Esta função é responsável por adicionar uma nova notificação ao array `notificacoes`.
    function registrar(mensagem) {
  
      // Adiciona a `mensagem` recebida como argumento ao final do array `notificacoes`.
      notificacoes.push(mensagem);
  
      // Imprime uma confirmação no console, indicando que a notificação foi registrada.
      console.log(`Notificação registrada: "${mensagem}"`);

    }
  
    // Definição da função `exibir` dentro do escopo da IIFE.
    // Esta função é responsável por imprimir todas as notificações armazenadas no console.
    function exibir() {
  
      // Verifica se o array `notificacoes` está vazio.
      if (notificacoes.length === 0) {
  
        // Se estiver vazio, imprime uma mensagem indicando que não há notificações.
        console.log("Não há notificações.");
        return;
  
      }
  
      // Se o array não estiver vazio, imprime o cabeçalho seguido de cada notificação.
      console.log("Todas as notificações:");
  
      // Utiliza o método `forEach` para iterar sobre cada notificação no array.
      notificacoes.forEach((mensagem, index) => {
  
        // Para cada notificação, imprime o índice (começando de 1) e a mensagem.
        console.log(`${index + 1}: ${mensagem}`);
        
      });
    }
  
    // A IIFE retorna um objeto contendo referências às funções `registrar` e `exibir`.
    // Esse objeto permite interagir com o sistema de notificações de fora da IIFE.
    // As funções internas que manipulam o estado das notificações permanecem protegidas
    // dentro do escopo da IIFE.
    return {
      registrar,
      exibir
    };
  })();
  
// Demonstra como utilizar o sistema de notificações.
// Chama o método `registrar` para adicionar duas notificações.
sistemaDeNotificacoes.registrar("Bem-vindo ao sistema!");
sistemaDeNotificacoes.registrar("Você tem uma nova mensagem.");
sistemaDeNotificacoes.registrar("Boa noite, não esqueça de esquentar a comida quando chegar.");
sistemaDeNotificacoes.registrar("Também mude a senha do Wie-fie");
sistemaDeNotificacoes.registrar("Não esqueça do PIX.");

// Chama o método `exibir` para mostrar todas as notificações registradas no console.
sistemaDeNotificacoes.exibir();

