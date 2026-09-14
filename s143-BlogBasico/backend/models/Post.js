// Importa o módulo 'mongoose', que é uma biblioteca 
//      ODM (Object Data Modeling) para o MongoDB.
// O Mongoose permite definir esquemas e modelos para 
//      manipular os dados do banco de forma estruturada.
const mongoose = require("mongoose");

// Cria um novo esquema Mongoose para definir a estrutura dos 
//      documentos dentro da coleção 'posts' no banco de dados.
// O esquema funciona como um molde para garantir que os 
//      documentos armazenados sigam um formato predefinido.
const PostSchema = new mongoose.Schema(

  {

    // Define um campo chamado 'text' para armazenar o 
    //      conteúdo textual da postagem.
    text: {

      // O tipo do campo é definido como 'String', 
      //      indicando que ele armazenará texto.
      type: String,
      
      // Define que este campo é obrigatório e fornece uma mensagem de 
      //      erro personalizada caso esteja ausente.
      required: [true, "O campo texto é obrigatório."],

    },

    // Define um campo chamado 'image' para armazenar o nome do 
    //      arquivo de imagem associado à postagem.
    image: {
    
      // O tipo do campo é 'String', pois armazenará apenas o nome 
      //      do arquivo, e não o arquivo em si.
      type: String,
    
      // Define um valor padrão como 'null', o que significa que a 
      //      postagem pode ser criada sem uma imagem.
      default: null,
      
    },
  },

  {

    // Habilita a criação automática dos campos 'createdAt' e
    //       'updatedAt' no banco de dados.
    // 'createdAt' registra a data e hora em que a postagem foi criada.
    // 'updatedAt' registra a data e hora da última modificação na postagem.
    timestamps: true,

  }
);

// Exporta o modelo 'Post' baseado no esquema 'PostSchema'.
// O modelo permite que a aplicação interaja com a 
//      coleção 'posts' no banco de dados,
//      fornecendo métodos para criar, ler, atualizar e 
//      deletar postagens.
module.exports = mongoose.model("Post", PostSchema);