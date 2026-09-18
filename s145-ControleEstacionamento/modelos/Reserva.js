// modelos/Reserva.js

// Importa a biblioteca Mongoose, que permite 
//      interagir com o banco de dados MongoDB de 
//      forma estruturada e orientada a objetos
const mongoose = require('mongoose');

// Cria um esquema (schema) para a coleção "reservas" 
//      no banco de dados
// O schema define a estrutura que cada documento 
//      dentro dessa coleção deve seguir
const reservaSchema = new mongoose.Schema({

  // Define um campo chamado "dataHoraInicio" no schema
  // Este campo armazenará a data e hora de início da reserva
  dataHoraInicio: {

    // O tipo do dado será `Date`, o que significa que 
    //      ele armazenará valores de data e hora
    type: Date,

    // O atributo `required: true` indica que esse 
    //      campo é obrigatório, ou seja, uma reserva não 
    //      pode ser salva no banco sem fornecer um valor para este campo
    required: true

  },

  // Define um campo chamado "dataHoraFim" no schema
  // Este campo armazenará a data e hora de término da reserva
  dataHoraFim: {

    // O tipo do dado será `Date`, permitindo 
    //    armazenar valores de data e hora
    type: Date,

    // Define um valor padrão `null`, o que significa 
    //      que se esse campo não for preenchido,
    //      ele será automaticamente armazenado como `null`
    default: null

  },

  // Define um campo chamado "vaga" no schema
  // Este campo representará o número da vaga 
  //      onde o veículo será estacionado
  vaga: {

    // O tipo do dado será `Number`, garantindo que 
    //      apenas números possam ser armazenados
    type: Number,

    // O atributo `required: true` indica que esse campo é obrigatório,
    //      ou seja, uma reserva não pode ser criada sem 
    //      especificar o número da vaga
    required: true

  },

  // Define um campo chamado "placaVeiculo" no schema
  // Esse campo armazenará a placa do veículo 
  //      que está sendo estacionado
  placaVeiculo: {

    // O tipo do dado será `String`, pois placas de 
    //      veículos contêm caracteres alfanuméricos
    type: String,

    // O atributo `required: true` indica que esse campo é obrigatório,
    // ou seja, a reserva não pode ser criada sem informar a placa do veículo
    required: true

  },

  // Define um campo chamado "modeloVeiculo" no schema
  // Esse campo armazenará o modelo do 
  //      veículo (exemplo: Corolla, Civic, Gol)
  modeloVeiculo: {

    // O tipo do dado será `String`, pois modelos de 
    //      veículos são representados por texto
    type: String

  },

  // Define um campo chamado "corVeiculo" no schema
  // Esse campo armazenará a cor do veículo (exemplo: 
  //      Preto, Branco, Vermelho)
  corVeiculo: {

    // O tipo do dado será `String`, pois cores 
    //     são representadas por texto
    type: String

  },

  // Define um campo chamado "proprietarioVeiculo" no schema
  // Esse campo armazenará o nome do proprietário do veículo
  proprietarioVeiculo: {

    // O tipo do dado será `String`, pois nomes de 
    //     proprietários são representados por texto
    type: String

  },

  // Define um campo chamado "valorPago" no schema
  // Esse campo armazenará o valor pago pela reserva da vaga
  valorPago: {
  
    // O tipo do dado será `Number`, pois o valor pago será 
    //      um número (exemplo: 15.50, 30.00)
    type: Number,
  
    // O valor padrão será `0`, indicando que nenhuma 
    //      quantia foi paga inicialmente
    default: 0

  },

  // Define um campo chamado "status" no schema
  // Esse campo armazenará o status da reserva (se 
  //      está ativa ou finalizada)
  status: {

    // O tipo do dado será `String`, pois status 
    //      são representados por texto
    type: String,

    // O campo "enum" restringe os valores possíveis para 
    //      garantir consistência no banco de dados
    // Somente "reservado" ou "finalizado" serão 
    //      aceitos como valores válidos
    enum: ['reservado', 'finalizado'],

    // O valor padrão será "reservado", indicando que a 
    //      reserva está ativa no momento da criação
    default: 'reservado'

  }

});


// Exporta o modelo "Reserva" baseado no schema "reservaSchema",
//      permitindo sua utilização em outras partes do código
module.exports = mongoose.model('Reserva', reservaSchema);