// config/bancoDados.js

// Importa a biblioteca Mongoose, que facilita a 
//      interação com o banco de dados MongoDB no Node.js
const mongoose = require('mongoose');

// Define a URI de conexão com o MongoDB
// 'mongodb://' → Indica o protocolo usado para a 
//      conexão com o banco de dados
// '127.0.0.1' → Representa o endereço do servidor onde o 
//      MongoDB está rodando (localhost)
// ':27017' → Porta padrão do MongoDB
// '/estacionamento' → Nome do banco de dados que será usado. 
//  Caso não exista, será criado automaticamente.
const mongoURI = 'mongodb://127.0.0.1:27017/estacionamento';

// Define uma configuração para evitar avisos no console 
//      em versões mais recentes do Mongoose.
// Quando 'strictQuery' está ativado (true), o Mongoose 
//      exige que todas as consultas sigam exatamente o 
//      esquema definido.
// Definir como 'false' permite maior flexibilidade nas 
//      consultas, evitando erros desnecessários.
mongoose.set('strictQuery', false);

// Conecta o Mongoose ao banco de dados MongoDB 
//      usando a URI definida anteriormente
mongoose

  .connect(mongoURI, {

    // `useNewUrlParser: true` → Permite o uso do novo 
    //      mecanismo de análise de URL do MongoDB
    // Isso evita avisos no console e melhora a 
    //      compatibilidade com versões mais recentes
    useNewUrlParser: true,

    // `useUnifiedTopology: true` → Habilita o novo 
    //      mecanismo de gerenciamento de conexões do MongoDB
    // Isso melhora o suporte a servidores MongoDB em 
    //      clusters e reduz erros de conexão
    useUnifiedTopology: true
    
  })
  
  // Caso a conexão seja bem-sucedida, executa 
  //      esta função e exibe uma mensagem no console
  .then(() => console.log('Conexão com o MongoDB estabelecida com sucesso!'))

  // Caso ocorra um erro ao tentar conectar, 
  //      captura e exibe o erro no console
  .catch((erro) => console.error('Erro ao conectar ao MongoDB:', erro));

// Exporta o objeto `mongoose` para que possa ser 
//     utilizado em outros arquivos do projeto
module.exports = mongoose;