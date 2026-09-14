// Importa o módulo 'express', uma biblioteca de servidor HTTP 
//      para Node.js que facilita a criação de aplicações web e API.
const express = require("express");

// Importa o módulo 'mongoose', uma biblioteca ODM (Object Data Modeling) 
//      para MongoDB e Node.js.
// Ele gerencia relacionamentos entre dados, fornece validação de 
//      esquema e é usado para traduzir entre objetos no código e a 
//      representação desses objetos no MongoDB.
const mongoose = require("mongoose");

// Importa o módulo 'cors', que é um middleware para habilitar 
//      CORS (Cross-Origin Resource Sharing).
// CORS é uma segurança implementada nos navegadores para restringir 
//      recursos de uma web página a serem requisitados de outro domínio 
//      fora do domínio da origem da primeira web página.
const cors = require("cors");

// Importa o módulo 'path', uma utilidade integrada do Node.js para 
//       trabalhar com caminhos de arquivos e diretórios.
const path = require("path");

// Importa o módulo 'multer', um middleware para manipulação 
//        de 'multipart/form-data', 
//        principalmente usado para o upload de arquivos.
const multer = require("multer");

// Cria uma nova aplicação Express, instanciando o Express.
const app = express();

// Adiciona o middleware CORS à cadeia de middleware 
//          do aplicativo Express.
// Isso permite que sua API aceite solicitações de diferentes 
//          origens (domínios), essencial para quando sua API é 
//          consumida por clientes de diferentes domínios.
app.use(cors());

// Adiciona um middleware que analisa o corpo das 
//      solicitações entrantes como JSON.
// Isso é necessário para que o Express possa entender e 
//       converter o corpo da solicitação de JSON para 
//       objetos JavaScript.
app.use(express.json());

// Adiciona um middleware que analisa corpos de solicitações 
//      com payloads codificados em URL.
// O 'extended: true' especifica que o parser deve usar a 
//      biblioteca 'qs' que permite aninhar objetos, oferecendo mais 
//      capacidades do que quando 'false', que usa a biblioteca 'querystring'.
app.use(express.urlencoded({ extended: true }));

// Inicia uma conexão com o MongoDB usando o Mongoose.
mongoose

  // A string de conexão especifica o endereço do servidor 
  //      MongoDB (local, neste caso) e o nome do banco de dados.
  .connect("mongodb://127.0.0.1:27017/blog_simple", {

    // 'useNewUrlParser': Esta opção garante que o novo analisador 
    //      de URL do MongoDB seja usado.
    // É recomendado para lidar com a depreciação de funcionalidades 
    //      antigas relacionadas à análise de URLs no driver MongoDB.
    useNewUrlParser: true,

    // 'useUnifiedTopology': Habilita o uso do novo sistema de 
    //      gerenciamento de conexões do MongoDB.
    // Isso ajuda a manter a aplicação atualizada com as 
    //      recomendações mais recentes e melhorias de 
    //      desempenho do driver MongoDB.
    useUnifiedTopology: true,

  })

  // A função 'then' é executada se a conexão com o MongoDB 
  //      for estabelecida com sucesso.
  .then(() => {

    // Registra uma mensagem de sucesso no console indicando que a 
    //      conexão com o MongoDB foi bem-sucedida.
    console.log("✅ Conectado ao MongoDB Compass!");

  })

  // A função 'catch' é executada se houver um erro ao tentar 
  //      conectar ao MongoDB.
  .catch((err) => {

    // Registra o erro no console para diagnóstico, fornecendo detalhes 
    //      do erro que impediu a conexão com o MongoDB.
    console.error("❌ Erro ao conectar ao MongoDB:", err);

  });

// Carrega o módulo do modelo 'Post' que define a estrutura de 
//      dados para uma postagem no blog,
//      como parte da interação com a coleção 'posts' no MongoDB.
const Post = require("./models/Post");

// Configura o armazenamento de arquivos no disco utilizando o 'multer'.
// O objeto 'multer.diskStorage' permite configurar onde e como os 
//      arquivos devem ser armazenados no servidor.
const storage = multer.diskStorage({

  // 'destination' é uma função que determina o diretório 
  //      onde os arquivos devem ser salvos.
  // Esta função é chamada sempre que um arquivo é recebido.
  destination: function (req, file, cb) {
  
    // A função 'cb' (callback) é usada para especificar o 
    //      destino dos arquivos carregados.
    // O primeiro parâmetro é um possível erro (null se não 
    //      houver erro), e o segundo é o caminho do diretório.
    cb(null, "uploads");

  },

  // 'filename' é uma função que determina o nome do arquivo 
  //      dentro do diretório de destino.
  // Esta função também é chamada sempre que um arquivo é recebido.
  filename: function (req, file, cb) {

    // Gera um sufixo único para o arquivo para evitar 
    //      sobreposição de nomes.
    // 'Date.now()' fornece o timestamp atual e 'Math.round(Math.random() * 1e9)' 
    //      gera um número aleatório para garantir unicidade.
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    
    // A função callback 'cb' define o nome do arquivo. O primeiro 
    //      parâmetro é um possível erro (null se não houver erro),
    //      e o segundo é o nome do arquivo, que concatena o sufixo 
    //      único com o nome original do arquivo.
    cb(null, uniqueSuffix + "-" + file.originalname);

  },
});

// Cria uma instância de 'multer' com a configuração de 
//      armazenamento especificada.
// Esta instância 'upload' pode ser usada como middleware em 
//      rotas que recebem arquivos.
const upload = multer({ storage });


// Define uma rota POST no servidor Express para o 
//      endpoint '/api/posts'.
// Esta rota espera receber dados de postagem, incluindo um 
//      texto e, opcionalmente, uma imagem.
app.post("/api/posts", upload.single("image"), async (req, res) => {

  // Inicia um bloco de tentativa para capturar e gerenciar 
  //      erros que possam ocorrer durante o processamento da solicitação.
  try {

    // Loga no console do servidor que uma solicitação POST foi 
    //      recebida, mostrando o corpo da solicitação e o arquivo 
    //      de imagem recebido, se houver.
    // 'req.body' contém os dados não-arquivo (como texto), 
    //      enquanto 'req.file' contém dados sobre o arquivo enviado.
    console.log("Recebendo POST:", req.body, req.file);

    // Extrai a propriedade 'text' do corpo da solicitação, 
    //      assumindo que ela é obrigatória para a postagem.
    const { text } = req.body;

    // Verifica se o texto foi fornecido na solicitação. 
    // Se não, retorna uma resposta de erro ao cliente.
    if (!text) {

      // O status HTTP 400 indica uma solicitação mal-formada 
      //      onde o texto obrigatório não foi fornecido.
      return res.status(400).json({ message: "Texto é obrigatório" });

    }

    // Determina o caminho da imagem baseado na presença de 
    //      um arquivo na solicitação.
    // Se 'req.file' existir (ou seja, se um arquivo foi enviado e 
    //      processado pelo Multer), usa o nome do arquivo; caso 
    //      contrário, define 'imagePath' como null.
    let imagePath = req.file ? req.file.filename : null;

    // Cria uma nova instância do modelo 'Post', usando o texto 
    //      recebido e o caminho da imagem determinado na linha anterior.
    // 'text' e 'image' são as propriedades do documento 
    //      que será salvo no MongoDB.
    const newPost = new Post({ text, image: imagePath });

    // Salva o novo post no banco de dados de forma assíncrona.
    // 'await' é usado para esperar a operação de salvar 
    //      concluir antes de continuar.
    await newPost.save();

    // Loga no console do servidor que o post foi salvo com 
    //      sucesso, mostrando o objeto 'newPost' que inclui o 
    //      texto, a imagem e outros campos gerados 
    //      automaticamente, como o ID.
    console.log("✅ Post salvo:", newPost);

    // Envia uma resposta ao cliente com o status HTTP 201, que 
    //      indica que um recurso foi criado com sucesso.
    // O corpo da resposta inclui uma mensagem indicando 
    //      sucesso e o objeto 'post', que contém os detalhes 
    //      do post recém-criado.
    return res.status(201).json({ message: "Post criado com sucesso!", post: newPost });

  // O bloco 'catch' é usado para interceptar erros que ocorrem 
  //      durante a execução do bloco 'try' associado.
  } catch (error) {

    // Registra uma mensagem de erro no console do servidor. 
    // Isso ajuda a diagnosticar o problema ao fornecer uma saída 
    //      visual do erro no console do servidor.
    console.error("❌ Erro ao criar post:", error);

    // Envia uma resposta ao cliente com o status HTTP 500, que 
    //      indica que ocorreu um erro interno no servidor.
    // Isso informa ao cliente que algo deu errado do lado do 
    //      servidor que impediu a criação do post.
    return res.status(500).json({ message: "Erro ao criar post." });

  }

});


// Define uma rota GET para '/api/posts' que será usada para 
//      buscar todas as postagens disponíveis no banco de dados.
app.get("/api/posts", async (req, res) => {

  // Inicia um bloco 'try' que tenta executar o código que 
  //      pode lançar uma exceção.
  try {
  
    // Busca todas as postagens no banco de dados, usando o modelo 'Post'.
    // As postagens são ordenadas pela data de criação ('createdAt'), 
    //      com as mais recentes primeiro (-1 indica ordem decrescente).
    const posts = await Post.find().sort({ createdAt: -1 });

    // Retorna as postagens encontradas como uma resposta JSON para o cliente.
    // O uso de 'return' aqui garante que a função será encerrada 
    //      após o envio da resposta.
    return res.json(posts);

  // Bloco 'catch' para capturar e tratar qualquer erro que ocorra 
  //      durante a execução do bloco 'try'.
  } catch (error) {

    // Loga o erro no console do servidor para que possa ser 
    //      diagnosticado por desenvolvedores.
    console.error("Erro ao buscar posts:", error);

    // Envia uma resposta ao cliente com o status HTTP 500, indicando 
    //      que ocorreu um erro interno do servidor.
    // Além disso, envia uma mensagem explicativa sobre o erro.
    return res.status(500).json({ message: "Erro ao buscar posts." });

  }
});

// Configura um diretório estático para servir arquivos. 
// Neste caso, configura a pasta 'uploads' para ser acessível publicamente.
// '/uploads' será o caminho URL para acessar os arquivos, e 
//      'express.static' serve os arquivos de forma estática.
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Define uma constante 'PORT' que busca o valor da variável de 
//      ambiente 'PORT' ou, se não estiver definida, 
//      usa 3000 como padrão.
// Isso permite que o servidor seja configurado para rodar em 
//      diferentes portas, o que é útil para diferentes 
//      ambientes de desenvolvimento e produção.
const PORT = process.env.PORT || 3000;

// Inicia o servidor para escutar na porta especificada 
//      pela constante 'PORT'.
// O método 'listen' inicia o servidor HTTP do Express e 
//      fica aguardando por conexões.
app.listen(PORT, () => {

  // Loga uma mensagem no console do servidor quando este 
  //      começa a rodar, indicando em qual porta está ouvindo.
  // Isso é útil para confirmar que o servidor iniciou 
  //      corretamente e está pronto para receber requisições.
  console.log(`🚀 Servidor rodando na porta ${PORT}.`);

});


// Rota para deletar post
// Define uma rota DELETE para a URL '/api/posts/:id'.
// O parâmetro ':id' na URL representa o identificador 
//      único do post que será deletado.
// Essa rota é usada para remover uma postagem do banco 
//      de dados com base no seu ID.
app.delete("/api/posts/:id", async (req, res) => {

  // Inicia um bloco 'try' para capturar possíveis erros que 
  //      possam ocorrer durante a execução do código.
  try {
  
    // Extrai o 'id' dos parâmetros da URL. 
    // 'req.params' contém todos os parâmetros passados na
    //      URL da requisição.
    // Neste caso, 'id' representa o identificador único da 
    //      postagem a ser deletada.
    const { id } = req.params;

    // Utiliza o método 'findByIdAndDelete()' do Mongoose para 
    //      buscar e excluir a postagem pelo ID fornecido.
    // Essa operação é assíncrona, por isso utilizamos 'await' para 
    //      aguardar a conclusão antes de prosseguir.
    await Post.findByIdAndDelete(id);

    // Envia uma resposta JSON ao cliente confirmando que o 
    //      post foi deletado com sucesso.
    return res.json({ message: "Post deletado com sucesso!" });
  
  // Caso ocorra um erro durante a tentativa de deletar a postagem, o
  //        bloco 'catch' captura esse erro.
  } catch (error) {

    // Registra o erro no console do servidor para ajudar no
    //      diagnóstico do problema.
    console.error("Erro ao deletar post:", error);

    // Envia uma resposta ao cliente com status HTTP 500, 
    //      indicando um erro interno do servidor.
    // A mensagem de erro informa que não foi possível 
    //      concluir a solicitação de exclusão.
    return res.status(500).json({ message: "Erro ao deletar post." });

  }

});