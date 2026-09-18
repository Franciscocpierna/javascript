// modelos/Veiculo.js

// Importa a biblioteca Mongoose, que é utilizada 
//      para modelagem de dados no MongoDB
const mongoose = require('mongoose');

// Define um esquema (schema) para os documentos da 
//      coleção "veiculos" no MongoDB
const veiculoSchema = new mongoose.Schema({
  
  // Campo "placa": Armazena a placa do veículo
  // Tipo: String (cadeia de caracteres)
  // Obrigatório: Sim (required: true) - O campo deve ser 
  //      preenchido obrigatoriamente
  // Único: Sim (unique: true) - Garante que não existam 
  //      dois veículos com a mesma placa no banco de dados
  placa: {
    type: String,
    required: true,
    unique: true
  },

  // Campo "modelo": Armazena o modelo do veículo
  // Tipo: String (cadeia de caracteres)
  // Obrigatório: Sim (required: true) - O campo deve 
  //      ser preenchido obrigatoriamente
  modelo: { 
    type: String, 
    required: true 
  },

  // Campo "cor": Armazena a cor do veículo
  // Tipo: String (cadeia de caracteres)
  // Obrigatório: Sim (required: true) - O campo 
  //      deve ser preenchido obrigatoriamente
  cor: { 
    type: String, 
    required: true 
  },

  // Campo "proprietario": Armazena o nome do proprietário do veículo
  // Tipo: String (cadeia de caracteres)
  // Obrigatório: Sim (required: true) - O campo deve 
  //      ser preenchido obrigatoriamente
  proprietario: { 
    type: String, 
    required: true 
  },

  // Campo "historico": Armazena um array com informações 
  //      sobre as passagens do veículo pelo estacionamento
  // Tipo: Array de objetos - Cada objeto representa uma 
  //      entrada e saída do veículo no estacionamento
  historico: [
    {
      
      // Campo "entrada": Armazena a data e hora em que o 
      //      veículo entrou no estacionamento
      // Tipo: Date (formato de data do JavaScript)
      entrada: Date,

      // Campo "saida": Armazena a data e hora em que o 
      //      veículo saiu do estacionamento
      // Tipo: Date (formato de data do JavaScript)
      saida: Date,

      // Campo "pagamentoEfetuado": Indica se o pagamento pela 
      //      estadia no estacionamento foi realizado
      // Tipo: Boolean (true ou false)
      // Valor padrão: false (quando um novo registro é criado, 
      //      o pagamento não foi feito)
      pagamentoEfetuado: { 
        type: Boolean, 
        default: false 
      },

      // Campo "valorPago": Registra o valor pago pelo 
      //      estacionamento do veículo
      // Tipo: Number (número decimal)
      // Valor padrão: 0 (caso ainda não tenha sido 
      //       realizado um pagamento)
      valorPago: { 
        type: Number, 
        default: 0 
      }
    }
  ]

});


// Exportação do modelo "Veiculo" baseado no esquema "veiculoSchema"
// O mongoose.model() cria um modelo que será usado para 
//      interagir com o banco de dados MongoDB
// Primeiro parâmetro: Nome do modelo ('Veiculo')
// Segundo parâmetro: Esquema que define a estrutura do modelo (veiculoSchema)
// Esse modelo permitirá a criação, leitura, atualização e 
//      exclusão de documentos na coleção "veiculos" do banco de dados
module.exports = mongoose.model('Veiculo', veiculoSchema);