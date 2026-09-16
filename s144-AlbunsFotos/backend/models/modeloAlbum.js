// Importa o módulo "mongoose", que é uma biblioteca 
//      para trabalhar com bancos de dados MongoDB
const mongoose = require("mongoose");

// Define um esquema (estrutura) para armazenar 
//      informações de cada foto no banco de dados
// O esquema define quais campos cada documento (registro) 
//      de foto deve conter
const EsquemaFoto = new mongoose.Schema({

  // Campo "caminho" armazenará o caminho do arquivo da imagem no servidor
  // "type: String" indica que o valor deve ser uma string (texto)
  // "required: true" significa que este campo é obrigatório, ou 
  //      seja, cada foto deve ter um caminho de arquivo definido
  caminho: { type: String, required: true },

  // Campo "descricao" armazenará um texto descritivo 
  //      para a foto (opcional)
  // "type: String" indica que o valor será uma string
  // "default: ''" define um valor padrão vazio, caso o 
  //      usuário não forneça uma descrição
  descricao: { type: String, default: "" },

  // Campo "dataCriacao" armazenará a data em que a foto 
  //      foi adicionada ao banco de dados
  // "type: Date" indica que o valor será um objeto do tipo Data
  // "default: Date.now" define automaticamente a data e 
  //      hora atuais no momento em que a foto for salva
  dataCriacao: { type: Date, default: Date.now }

});


// Define um esquema (estrutura) para armazenar informações 
//      de um álbum no banco de dados
// Esse esquema define os campos que cada documento (registro) 
//      de álbum deve conter
const EsquemaAlbum = new mongoose.Schema({

  // Campo "nome" armazenará o nome do álbum
  // "type: String" indica que o valor será uma string (texto)
  // "required: true" significa que esse campo é obrigatório, ou 
  //      seja, todo álbum deve ter um nome
  nome: { type: String, required: true },

  // Campo "capa" armazenará o caminho da imagem de 
  //      capa do álbum (opcional)
  // "type: String" indica que será armazenado um texto (o 
  //      caminho da imagem no servidor)
  // "default: null" significa que, se o usuário não 
  //      escolher uma capa, o valor será nulo
  capa: { type: String, default: null },

  // Campo "fotos" armazenará um array (lista) de fotos 
  //      pertencentes ao álbum
  // O tipo do array é definido pelo "EsquemaFoto", garantindo 
  //      que cada item siga a estrutura definida anteriormente
  fotos: [EsquemaFoto],

  // Campo "dataCriacao" armazenará a data de criação do álbum
  // "type: Date" indica que o valor será um objeto de data
  // "default: Date.now" define automaticamente a data e hora 
  //      atuais no momento em que o álbum for salvo
  dataCriacao: { type: Date, default: Date.now }
  
});

// Exporta o modelo "Album" baseado no esquema definido acima
// Isso permite que o modelo seja utilizado em outras partes da 
//      aplicação para interagir com o banco de dados MongoDB
module.exports = mongoose.model("Album", EsquemaAlbum);