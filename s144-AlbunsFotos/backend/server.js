// Importa o módulo "express", que é um framework para 
//      criar aplicações web com Node.js
const expressao = require("express");

// Importa o módulo "mongoose", que facilita a conexão e 
//      manipulação do banco de dados MongoDB
const mongoose = require("mongoose");

// Importa o módulo "cors" (Cross-Origin Resource Sharing), 
//      que permite requisições entre diferentes domínios
// Isso é útil para permitir que um frontend hospedado em 
//      outro servidor se comunique com a API
const cors = require("cors");

// Importa o módulo "path", que fornece funcionalidades para 
//      manipular diretórios e caminhos de arquivos
const caminho = require("path");

// Importa o módulo "multer", que é usado para manipular 
//      uploads de arquivos, como imagens enviadas para a API
const multer = require("multer");

// Importa o modelo "Album" do arquivo "modeloAlbum.js"
// Esse modelo define a estrutura dos álbuns no banco de 
//      dados e permite realizar operações com eles
const Album = require("./models/modeloAlbum");
const { ifError } = require("assert");

// Cria uma instância do aplicativo Express
// Essa instância "app" será usada para definir rotas e 
//        configurar o servidor da API
const app = expressao();

// Aplica o middleware "cors()" para permitir requisições 
//        de diferentes origens
// Isso é necessário para evitar bloqueios de segurança ao 
//        acessar a API de um domínio diferente do servidor
app.use(cors());

// Aplica o middleware "express.json()" para permitir o 
//        envio e recebimento de dados em formato JSON
// Isso permite que a API processe requisições onde os 
//        dados são enviados no formato JSON
app.use(expressao.json());

// Aplica o middleware "express.urlencoded({ extended: true })" 
//        para permitir o envio de dados codificados em URLs
// "extended: true" permite manipular objetos aninhados dentro 
//        dos dados recebidos (exemplo: formulários complexos)
app.use(expressao.urlencoded({ extended: true }));

// Conecta ao banco de dados MongoDB usando o Mongoose
mongoose

  // URL do banco de dados local (localhost)
  .connect("mongodb://127.0.0.1:27017/album_fotos", { 
    
    // "useNewUrlParser: true" - Usa o novo analisador de URLs do 
    //      Mongoose para evitar avisos de compatibilidade
    useNewUrlParser: true,

    // "useUnifiedTopology: true" - Usa o novo mecanismo de 
    //      gerenciamento de conexões para evitar avisos obsoletos
    useUnifiedTopology: true 

  })
  
  // Se a conexão for bem-sucedida, executa a função dentro de "then()"
  // Exibe a mensagem "Conectado ao MongoDB!" no console do servidor
  .then(() => console.log("Conectado ao MongoDB!"))

  // Se houver um erro ao tentar conectar ao banco de 
  //      dados, captura o erro no "catch()"
  // Exibe a mensagem "Erro ao conectar ao MongoDB:" 
  //      seguida do erro no console
  .catch((erro) => console.error("Erro ao conectar ao MongoDB:", erro));


// Configuração do armazenamento de arquivos usando o Multer
// O Multer é um middleware para lidar com 
//      uploads de arquivos no Node.js
const armazenamento = multer.diskStorage({

  // Define o destino onde os arquivos enviados serão armazenados
  // A função recebe três parâmetros:
  // - "req" (requisição HTTP)
  // - "arquivo" (o arquivo enviado)
  // - "cb" (callback para definir o diretório de armazenamento)
  destination: (req, arquivo, cb) => {
    
    // Define a pasta "uploads" como destino para os
    //      arquivos enviados
    // O primeiro argumento "null" indica que não há 
    //      erro ao definir o diretório
    cb(null, "uploads");

  },

// Define o nome do arquivo ao ser salvo no servidor
// A função recebe três parâmetros:
// - "req" (requisição HTTP)
// - "arquivo" (o arquivo enviado)
// - "cb" (callback para definir o nome do arquivo)
filename: (req, arquivo, cb) => {

// Cria um sufixo único para evitar nomes de arquivos duplicados
// "Date.now()" obtém o timestamp atual (milissegundos desde 1970)
// "Math.random() * 1e9" gera um número aleatório grande
// "Math.round()" arredonda esse número aleatório para evitar decimais
const sufixoUnico = Date.now() + "-" + Math.round(Math.random() * 1e9);

// Define o nome do arquivo final concatenando o sufixo 
//      único com o nome original do arquivo
// Isso evita que arquivos com o mesmo nome 
//      sejam sobrescritos no servidor
cb(null, sufixoUnico + "-" + arquivo.originalname);

}
});


// Cria uma instância do Multer com a configuração de 
//      armazenamento definida anteriormente
// Isso permite que arquivos sejam armazenados no 
//      diretório especificado ("uploads")
const upload = multer({ storage: armazenamento });

// Configura o Express para servir arquivos estáticos da pasta "uploads"
// Isso permite que os arquivos enviados possam ser 
//      acessados publicamente através da URL "/uploads"
app.use("/uploads", expressao.static(caminho.join(__dirname, "uploads")));


// Criar Álbum (aceita capa opcional)
// Rota para criar um novo álbum
// Método HTTP: POST
// URL: "/api/albuns"
// Middleware "upload.single('capa')" é usado para processar o 
//      upload de um único arquivo (capa do álbum)
// A função assíncrona recebe dois parâmetros:
// - "req" (requisição enviada pelo cliente)
// - "res" (resposta a ser enviada de volta ao cliente)
app.post("/api/albuns", upload.single("capa"), async (req, res) => {

  try {

    // Extrai o nome do álbum do corpo da 
    //      requisição (enviado via JSON ou formulário)
    const { nome } = req.body;

    // Verifica se o nome do álbum foi informado
    // ".trim()" remove espaços extras no início e no   
    //      final do texto para evitar nomes inválidos
    if (!nome.trim()) {

      // Se o nome estiver vazio, retorna um erro 400 (Bad Request) e 
      //      uma mensagem informando que o nome é obrigatório
      return res.status(400).json({ mensagem: "O nome do álbum é obrigatório." });

    }

    // Verifica se um arquivo de capa foi enviado
    // Se "req.file" existir, significa que uma imagem 
    //      foi enviada com sucesso
    // "req.file.filename" contém o nome do arquivo salvo no servidor
    // Se não houver arquivo, o valor será "null"
    let capa = req.file ? req.file.filename : null;

    // Cria um novo documento (registro) no banco de 
    //      dados baseado no modelo "Album"
    // O álbum terá os seguintes campos:
    // - nome: nome fornecido pelo usuário
    // - capa: nome do arquivo de imagem (caso tenha sido enviado)
    const novoAlbum = new Album({ nome, capa });

    // Salva o novo álbum no banco de dados MongoDB
    // "await" é usado para aguardar a conclusão da 
    //      operação antes de continuar
    await novoAlbum.save();

    // Retorna uma resposta JSON com status 201 (Created), 
    //      confirmando que o álbum foi criado com sucesso
    // Também retorna os detalhes do álbum recém-criado
    return res.status(201).json({ mensagem: "Álbum criado!", album: novoAlbum });

  } catch (erro) {

    // Se ocorrer um erro inesperado durante a execução, 
    //      retorna um erro 500 (Internal Server Error)
    // Isso pode acontecer por falhas no banco de dados, 
    //      problemas no servidor ou erros de programação
    return res.status(500).json({ mensagem: "Erro ao criar álbum." });

  }

});

// Listar Álbuns
// Rota para obter a lista de todos os álbuns armazenados no banco de dados
// Método HTTP: GET
// URL: "/api/albuns"
// A função assíncrona recebe dois parâmetros:
// - "req" (requisição enviada pelo cliente, mas não há 
//      necessidade de dados no corpo da requisição neste caso)
// - "res" (resposta a ser enviada de volta ao cliente)
app.get("/api/albuns", async (req, res) => {

  try {
    
    // Busca todos os álbuns no banco de dados usando o modelo "Album"
    // ".find()" recupera todos os documentos da coleção de álbuns
    // ".sort({ dataCriacao: -1 })" ordena os álbuns do 
    //      mais recente para o mais antigo
    const albuns = await Album.find().sort({ dataCriacao: -1 });

    // Retorna a lista de álbuns como resposta no formato JSON
    return res.json(albuns);

  } catch (erro) {

    // Se ocorrer um erro inesperado durante a busca no banco de 
    //      dados, retorna um erro 500 (Internal Server Error)
    // Isso pode acontecer por falha na conexão com o 
    //      banco de dados ou erro na consulta
    return res.status(500).json({ mensagem: "Erro ao buscar álbuns." });

  }
});


// Obter Álbum específico
// Rota para obter os detalhes de um álbum 
//      específico com base no seu ID
// Método HTTP: GET
// URL: "/api/albuns/:id" (o ":id" é um parâmetro 
//      dinâmico que representa o ID do álbum a ser buscado)
app.get("/api/albuns/:id", async (req, res) => {

  try {
    
    // Extrai o ID do álbum a partir dos parâmetros da URL
    // "req.params" contém os parâmetros passados na 
    //      URL, e "id" é o identificador do álbum solicitado
    const { id } = req.params;

    // Procura o álbum no banco de dados pelo seu ID 
    //        usando o método "findById()"
    // Se o álbum existir, será retornado como um 
    //        objeto JavaScript
    const album = await Album.findById(id);

    // Verifica se o álbum foi encontrado no banco de dados
    if (!album) {

      // Se o álbum não existir, retorna um erro 404 (Not Found) 
      //        informando que o álbum não foi encontrado
      return res.status(404).json({ mensagem: "Álbum não encontrado." });

    }

    // Se o álbum for encontrado, retorna os dados do 
    //        álbum no formato JSON como resposta
    return res.json(album);

  } catch (erro) {

    // Se ocorrer um erro inesperado (como um ID mal 
    //      formatado ou erro de conexão com o banco),
    //      retorna um erro 500 (Internal Server Error) com 
    //      uma mensagem de erro genérica
    return res.status(500).json({ mensagem: "Erro ao buscar álbum." });

  }

});


// Adicionar Foto em um Álbum
// Rota para adicionar uma nova foto a um álbum existente
// Método HTTP: POST
// URL: "/api/albuns/:id/fotos" (o ":id" representa o 
//      identificador do álbum onde a foto será adicionada)
// Middleware "upload.single('imagem')" é usado para processar o 
//      upload de um único arquivo de imagem
app.post("/api/albuns/:id/fotos", upload.single("imagem"), async (req, res) => {

  try {

    // Extrai o ID do álbum a partir dos parâmetros da URL
    // "req.params" contém os parâmetros passados na URL, e "id" é 
    //      o identificador do álbum desejado
    const { id } = req.params;

    // Extrai a descrição da foto do corpo da   
    //      requisição (enviado via JSON ou formulário)
    const { descricao } = req.body;

    // Procura o álbum no banco de dados pelo seu ID usando "findById()"
    // Se o álbum existir, ele será retornado como um objeto
    const album = await Album.findById(id);

    // Verifica se o álbum foi encontrado no banco de dados
    if (!album) {

      // Se o álbum não existir, retorna um erro 404 (Not Found) 
      //      informando que o álbum não foi encontrado
      return res.status(404).json({ mensagem: "Álbum não encontrado." });

    }

    // Verifica se o usuário enviou um arquivo de imagem
    // "req.file" contém os dados do arquivo enviado, 
    //      incluindo o nome e o caminho
    if (!req.file) {

      // Se nenhum arquivo for enviado, retorna um erro 400 (Bad Request)
      // Isso impede o armazenamento de fotos sem uma imagem válida
      return res.status(400).json({ mensagem: "Imagem obrigatória." });

    }

    // Adiciona a nova foto ao array de fotos do álbum
    // "push()" insere um novo objeto no array "fotos" do álbum
    album.fotos.push({

      // O campo "caminho" armazenará o nome do arquivo da 
      //      imagem enviada pelo usuário
      // "req.file.filename" contém o nome do arquivo salvo 
      //      no servidor pelo Multer
      caminho: req.file.filename,

      // O campo "descricao" armazenará a descrição fornecida pelo usuário
      // Se nenhuma descrição for enviada, será armazenada uma 
      //      string vazia (""), garantindo que o campo nunca seja "undefined"
      descricao: descricao || ""

    });

    // Salva as alterações no banco de dados para 
    //      registrar a nova foto no álbum
    // "await" garante que a operação seja concluída 
    //      antes de continuar
    await album.save();

    // Retorna uma resposta JSON com status 201 (Created), 
    //      confirmando que a foto foi adicionada com sucesso
    // Também retorna os detalhes atualizados do álbum, incluindo a nova foto
    return res.status(201).json({ mensagem: "Foto adicionada!", album });

  } catch (erro) {

    // Se ocorrer um erro inesperado durante a execução (como 
    //      falha na conexão com o banco de dados ou erro interno),
    //      retorna um erro 500 (Internal Server Error) com 
    //      uma mensagem de erro genérica
    return res.status(500).json({ mensagem: "Erro ao adicionar foto." });

  }

});


// Deletar Álbum (opcional)
// Rota para excluir um álbum do banco de dados com base no seu ID
// Método HTTP: DELETE
// URL: "/api/albuns/:id" (o ":id" representa o identificador 
//      do álbum que será excluído)
app.delete("/api/albuns/:id", async (req, res) => {

  try {

    // Extrai o ID do álbum a partir dos parâmetros da URL
    // "req.params" contém os parâmetros passados na URL, 
    //      e "id" é o identificador do álbum desejado
    const { id } = req.params;

    // Procura e exclui o álbum no banco de dados pelo 
    //      seu ID usando "findByIdAndDelete()"
    // Essa função encontra o álbum correspondente e o 
    //      remove permanentemente do banco de dados
    await Album.findByIdAndDelete(id);

    // Retorna uma resposta JSON confirmando que o 
    //      álbum foi excluído com sucesso
    return res.json({ mensagem: "Álbum excluído." });

  } catch (erro) {

    // Se ocorrer um erro inesperado durante a exclusão (como 
    //      falha na conexão com o banco de dados),
    //      retorna um erro 500 (Internal Server Error) 
    //      com uma mensagem de erro genérica
    return res.status(500).json({ mensagem: "Erro ao excluir álbum." });

  }
});


// Deletar Foto de um Álbum (opcional)
// Rota para excluir uma foto específica de um 
//      álbum no banco de dados
// Método HTTP: DELETE
// URL: "/api/albuns/:id/fotos/:fotoId" (":id" representa o 
//      álbum e ":fotoId" representa a foto a ser excluída)
app.delete("/api/albuns/:id/fotos/:fotoId", async (req, res) => {

  try {
    
    // Extrai os IDs do álbum e da foto a partir dos parâmetros da URL
    // "id" representa o identificador do álbum que contém a foto
    // "fotoId" representa o identificador da foto a ser removida
    const { id, fotoId } = req.params;

    // Procura o álbum no banco de dados pelo seu ID
    // Se o álbum for encontrado, ele será retornado como um objeto
    const album = await Album.findById(id);

    // Verifica se o álbum foi encontrado no banco de dados
    if (!album) {
      
      // Se o álbum não existir, retorna um erro 404 (Not Found) 
      //      informando que o álbum não foi encontrado
      return res.status(404).json({ mensagem: "Álbum não encontrado." });

    }

    // Filtra a lista de fotos do álbum removendo a foto 
    //      com o ID correspondente a "fotoId"
    // "filter()" percorre o array de fotos e mantém apenas as 
    //      fotos que NÃO possuem o mesmo ID que "fotoId"
    // "foto._id.toString()" converte o ObjectId da foto 
    //      para string para comparação correta
    album.fotos = album.fotos.filter((foto) => foto._id.toString() !== fotoId);

    // Salva as alterações no banco de dados para 
    //      registrar a remoção da foto
    await album.save();

    // Retorna uma resposta JSON confirmando que a 
    //      foto foi excluída com sucesso.
    // Também retorna o álbum atualizado (sem a foto excluída)
    return res.json({ mensagem: "Foto excluída.", album });

  } catch (erro) {

    // Se ocorrer um erro inesperado durante a exclusão (como 
    //      falha na conexão com o banco de dados),
    // retorna um erro 500 (Internal Server Error) com 
    //      uma mensagem de erro genérica
    return res.status(500).json({ mensagem: "Erro ao excluir foto." });

  }
});


// Define a porta onde o servidor será executado
// "process.env.PORT" permite que a porta seja definida 
//      dinamicamente pelo ambiente de execução (exemplo: em 
//      um serviço de hospedagem como Heroku).
// Se nenhuma porta for definida no ambiente, o 
//      servidor usará a porta 3000 como padrão
const PORTA = process.env.PORT || 3000;

// Inicia o servidor Express na porta definida anteriormente
// "app.listen(PORTA, callback)" faz com que o servidor 
//      comece a escutar requisições HTTP na porta especificada
app.listen(PORTA, () => {
  
  // Exibe uma mensagem no console indicando que o 
  //      servidor está rodando
  // A template string `${PORTA}` insere dinamicamente o 
  //      número da porta na mensagem
  console.log(`Servidor rodando na porta ${PORTA}.`);
  
});