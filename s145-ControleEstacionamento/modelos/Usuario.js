// modelos/Usuario.js

// Importa a biblioteca Mongoose, que é uma biblioteca 
//      de modelagem de objetos para o MongoDB, permitindo a 
//      criação e manipulação de esquemas (schemas)
const mongoose = require('mongoose');

// Define um esquema (schema) para os documentos da 
//      coleção "usuarios" no MongoDB
const usuarioSchema = new mongoose.Schema({

  // Campo "nome": Armazena o nome do usuário
  // Tipo: String (cadeia de caracteres)
  // Obrigatório: Sim (required: true) - O campo deve 
  //      ser preenchido obrigatoriamente
  nome: { type: String, required: true },

  // Campo "email": Armazena o endereço de e-mail do usuário
  // Tipo: String (cadeia de caracteres)
  // Obrigatório: Sim (required: true) - O campo deve 
  //      ser preenchido obrigatoriamente
  // Único: Sim (unique: true) - Garante que não existam 
  //      dois usuários com o mesmo e-mail no banco de dados
  email: { type: String, required: true, unique: true },

  // Campo "senha": Armazena a senha do usuário
  // Tipo: String (cadeia de caracteres)
  // Obrigatório: Sim (required: true) - O campo deve 
  //      ser preenchido obrigatoriamente
  senha: { type: String, required: true },

  // Campo "tipoUsuario": Define o tipo de usuário no sistema
  // Tipo: String (cadeia de caracteres)
  // Padrão: "operador" (se não for informado, assume 
  //      esse valor por padrão)
  tipoUsuario: { type: String, default: 'operador' }
  
});

// Exporta o modelo "Usuario" baseado no schema "usuarioSchema"
// Isso permite que o modelo seja utilizado em outras 
//      partes do código para criar, consultar, atualizar e 
//      deletar usuários no banco de dados MongoDB
module.exports = mongoose.model('Usuario', usuarioSchema);