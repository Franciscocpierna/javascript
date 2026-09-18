// Importa o módulo "express", que é um framework 
//      para criar servidores web no Node.js.
const express = require('express');

// Importa o módulo "cors" para permitir requisições entre 
//      diferentes origens (Cross-Origin Resource Sharing).
const cors = require('cors');

// Importa o módulo "body-parser" para processar os dados 
//      enviados no corpo das requisições HTTP.
const bodyParser = require('body-parser');

// Importa o módulo "path" para manipular caminhos de 
//      arquivos e diretórios no sistema operacional.
const path = require('path');

// Importa a configuração do banco de dados, 
//      garantindo que a conexão seja estabelecida.
require('./config/bancoDados');

// Importa o modelo "Usuario" que representa a estrutura e 
//      os métodos relacionados aos usuários no banco de dados.
const Usuario = require('./modelos/Usuario');

// Importa o modelo "Veiculo" que define como os veículos 
//      são armazenados e manipulados no banco de dados.
const Veiculo = require('./modelos/Veiculo');

// Importa o modelo "Reserva" que gerencia as reservas 
//      de estacionamento no banco de dados.
const Reserva = require('./modelos/Reserva');

// Cria uma instância do aplicativo Express para 
//      gerenciar as requisições e respostas do servidor.
const app = express();

// Aplica o middleware "cors" para permitir que o 
//      servidor aceite requisições de diferentes origens.
app.use(cors());

// Aplica o middleware "body-parser" para converter os 
//      dados do corpo da requisição em formato JSON.
app.use(bodyParser.json());

// Configura o "body-parser" para lidar com dados     
//      codificados em URLs, permitindo o envio de formulários.
app.use(bodyParser.urlencoded({ extended: true }));

// Define a pasta "public" como diretório estático, permitindo 
//      que arquivos como HTML, CSS e JS sejam acessados pelo navegador.
app.use(express.static(path.join(__dirname, 'public')));


// =============================
// Rotas de Usuários
// =============================

// Cadastrar usuário
// Define uma rota para o endpoint '/api/usuarios/cadastrar', 
//      onde usuários podem ser cadastrados.
// Esta rota utiliza o método HTTP POST, pois está enviando 
//      dados ao servidor para serem armazenados.
app.post('/api/usuarios/cadastrar', async (req, res) => {

  try {

    // Extrai os valores de nome, email e senha do corpo da requisição (req.body).
    // Estes dados são enviados pelo cliente ao servidor no formato JSON.
    const { nome, email, senha } = req.body;

    // Verifica se já existe um usuário com o mesmo e-mail no banco de dados.
    // O método 'findOne' busca no banco um documento cujo 
    //      email seja igual ao fornecido.
    const existe = await Usuario.findOne({ email });

    // Se um usuário com o mesmo e-mail já existir, retorna uma 
    //      resposta com status 400 (Bad Request).
    // Também envia um objeto JSON informando que o e-mail já está cadastrado.
    if (existe) {
      return res.status(400).json({ mensagem: 'E-mail já cadastrado!' });
    }

    // Se o e-mail não estiver cadastrado, cria um novo 
    //      objeto da classe Usuario.
    // Este objeto é baseado no modelo definido no banco de 
    //      dados e contém os dados recebidos.
    const novo = new Usuario({ nome, email, senha });

    // Salva o novo usuário no banco de dados utilizando o método 'save'.
    await novo.save();

    // Retorna uma resposta com status 201 (Created), 
    //      indicando que o usuário foi cadastrado com sucesso.
    // Também envia uma mensagem de confirmação no formato JSON.
    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });

  } catch (erro) {

    // Captura qualquer erro inesperado que possa ocorrer 
    //      durante a execução da função.
    // Exibe a mensagem de erro no console para 
    //      facilitar a depuração do problema.
    console.error('Erro ao cadastrar usuário:', erro);

    // Retorna uma resposta com status 500 (Internal Server Error).
    // Indica que ocorreu um erro no servidor ao processar a requisição.
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });

  }

});


// Login de usuário
// Define uma rota para o endpoint '/api/usuarios/logar', 
//      onde usuários podem autenticar-se.
// Esta rota utiliza o método HTTP POST, pois está recebendo 
//      credenciais do usuário para validação.
app.post('/api/usuarios/logar', async (req, res) => {

  try {

    // Extrai os valores de email e senha do corpo da requisição (req.body).
    // Esses dados são enviados pelo cliente no formato JSON.
    const { email, senha } = req.body;

    // Busca um usuário no banco de dados cujo email corresponda ao 
    //      fornecido na requisição.
    // O método 'findOne' retorna um único usuário ou 'null' 
    //      caso não encontre.
    const usuario = await Usuario.findOne({ email });

    // Se o usuário não for encontrado, retorna uma resposta 
    //      com status 404 (Not Found).
    // Isso indica que o e-mail informado não está cadastrado no sistema.
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    // Verifica se a senha fornecida pelo usuário corresponde à 
    //      senha armazenada no banco de dados.
    // Se as senhas não coincidirem, retorna uma resposta com 
    //      status 401 (Unauthorized).
    // Isso indica que a senha fornecida está incorreta.
    if (usuario.senha !== senha) {
      return res.status(401).json({ mensagem: 'Senha incorreta.' });
    }

    // Retorna a resposta da API com status HTTP 200 (OK),  
    //      indicando que a requisição foi bem-sucedida.
    return res.status(200).json({
      
      // Adiciona uma mensagem indicando que o login foi 
      //      realizado com sucesso.
      mensagem: 'Login realizado com sucesso.',

      // Inclui o ID único do usuário no banco de dados, útil 
      //      para futuras interações no sistema.
      idUsuario: usuario._id,

      // Retorna o nome do usuário para ser utilizado na interface da 
      //      aplicação, por exemplo, para exibição no painel do usuário.
      nome: usuario.nome,

      // Retorna o tipo de usuário (exemplo: 'admin', 'operador'), o 
      //      que pode ser usado para definir permissões e acessos no sistema.
      tipoUsuario: usuario.tipoUsuario

    });

  // Captura qualquer erro que possa ocorrer 
  //      durante o processo de login
  } catch (erro) {

    // Exibe no console do servidor o erro detalhado 
    //      para fins de depuração
    console.error('Erro ao logar usuário:', erro);

    // Retorna uma resposta HTTP com status 500 (Erro interno do servidor)
    // Isso indica que ocorreu um problema inesperado na aplicação
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });

  }

});

// Listar todos os usuários
// Define uma rota GET para obter a lista de usuários 
//      cadastrados no banco de dados
app.get('/api/usuarios', async (req, res) => {

  try {
  
    // Busca todos os usuários na coleção do banco de dados
    const usuarios = await Usuario.find();

    // Retorna a lista de usuários em formato JSON com 
    //      status HTTP 200 (sucesso)
    return res.status(200).json(usuarios);

  } catch (erro) {

    // Caso ocorra um erro, exibe a mensagem de 
    //      erro no console do servidor
    console.error('Erro ao listar usuários:', erro);

    // Retorna uma resposta HTTP com status 500 (Erro interno do servidor)
    // Isso indica que ocorreu um problema inesperado na aplicação
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });

  }
});


// Buscar um usuário por ID
// Define uma rota GET para buscar um usuário específico 
//      pelo ID fornecido na URL.
// A rota segue o formato '/api/usuarios/:id', onde ':id' 
//      representa um valor dinâmico passado na URL
app.get('/api/usuarios/:id', async (req, res) => {

  try {
  
    // Captura o ID do usuário a partir dos parâmetros da URL
    // `req.params.id` acessa o valor do parâmetro dinâmico ':id'
    const usuarioId = req.params.id;

    // Usa o método `findById` do Mongoose para buscar um 
    //      usuário no banco de dados com o ID fornecido.
    // Esse método retorna um objeto contendo os dados do 
    //      usuário correspondente ou `null` caso não seja encontrado.
    const usuario = await Usuario.findById(usuarioId);

    // Verifica se o usuário foi encontrado no banco de dados
    // Caso não tenha sido encontrado, retorna uma 
    //      resposta HTTP 404 (não encontrado).
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    // Se o usuário for encontrado, envia os dados do 
    //      usuário como resposta em formato JSON.
    // O código HTTP 200 (OK) é implícito ao chamar `res.json()`, 
    //      indicando sucesso na requisição.
    return res.json(usuario);

  } catch (erro) {
    
    // Captura e exibe no console do servidor qualquer erro 
    //      ocorrido durante a busca no banco de dados.
    console.error('Erro ao buscar usuário:', erro);

    // Retorna uma resposta HTTP 500 (Erro interno do servidor)
    // Isso indica que ocorreu um problema inesperado no 
    //      processamento da requisição.
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });

  }
});


// Editar usuário
// Define uma rota PUT para atualizar os dados de um 
//      usuário específico pelo ID fornecido na URL.
// A rota segue o formato '/api/usuarios/:id', onde ':id' 
//      representa um valor dinâmico passado na URL.
app.put('/api/usuarios/:id', async (req, res) => {

  try {

    // Extrai os dados do corpo da requisição (nome, email, 
    //      senha e tipo de usuário).
    // O corpo da requisição é enviado pelo cliente no 
    //      formato JSON e contém os novos dados do usuário.
    const { nome, email, senha, tipoUsuario } = req.body;

    // Utiliza o método `findByIdAndUpdate` do Mongoose para encontrar e 
    //      atualizar o usuário pelo ID fornecido.
    // - `req.params.id` contém o ID do usuário passado na URL.
    // - O segundo argumento `{ nome, email, senha, tipoUsuario }` 
    //      especifica os campos a serem atualizados.
    // - A opção `{ new: true }` faz com que o método retorne o 
    //      usuário atualizado em vez do antigo
    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nome, email, senha, tipoUsuario },
      { new: true } // Retorna o usuário atualizado
    );

    // Verifica se o usuário foi encontrado e atualizado no banco de dados
    if (!usuarioAtualizado) {
    
      // Retorna uma resposta HTTP 404 (Not Found) caso o usuário não exista
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });

    }

    // Se a atualização foi bem-sucedida, retorna uma 
    //      resposta HTTP 200 (OK)
    return res.status(200).json({

      // Mensagem de sucesso indicando que o usuário foi 
      //      atualizado corretamente
      mensagem: 'Usuário atualizado com sucesso!',
      
      // Retorna os dados do usuário atualizado no formato JSON
      usuario: usuarioAtualizado

    });

  // Captura qualquer erro que ocorra durante a execução do bloco "try"
  } catch (erro) {
    
    // Exibe o erro detalhado no console para fins de depuração
    console.error('Erro ao editar usuário:', erro);

    // Retorna uma resposta HTTP 500 (Internal Server Error) 
    //      informando que houve um problema interno no servidor
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    
  }

});

// Excluir usuário
// Criando uma rota do tipo DELETE no servidor Express
// Essa rota será usada para excluir um usuário pelo seu ID
app.delete('/api/usuarios/:id', async (req, res) => {
  
  try {

    // Pegamos o ID do usuário que foi enviado na URL da requisição
    // req.params.id -> significa que estamos pegando o valor 
    //      que veio no parâmetro ":id" da URL
    // Exemplo: Se o cliente chamar a URL "/api/usuarios/123", req.params.id será "123"
    
    // O método findByIdAndDelete procura no banco de 
    //      dados um usuário com esse ID e o exclui
    // A palavra "await" indica que essa operação pode 
    //      demorar um pouco, então precisamos esperar o resultado
    const del = await Usuario.findByIdAndDelete(req.params.id);

    // Se nenhum usuário for encontrado com esse ID, significa 
    //      que ele não existe no banco de dados
    // Nesse caso, enviamos uma resposta com status 404 (não encontrado)
    if (!del) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    // Se chegou até aqui, significa que o usuário foi 
    //      encontrado e excluído com sucesso
    // Então enviamos uma resposta com status 200 (sucesso) e 
    //      uma mensagem de confirmação
    return res.status(200).json({ mensagem: 'Usuário excluído com sucesso!' });

  } catch (erro) {

    // Se algo der errado no processo, o erro será capturado 
    //      aqui no bloco "catch"
    // Exemplo de erro: o banco de dados pode estar fora do 
    //      ar, ou o ID pode estar mal formatado

    // Mostramos o erro no console para que o desenvolvedor 
    //      veja o que aconteceu
    console.error('Erro ao excluir usuário:', erro);

    // Enviamos uma resposta com status 500 (erro interno do 
    //      servidor) para avisar que algo deu errado
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });

  }
});


// =============================
// Rotas de Veículos
// =============================

// Cadastrar veículo

// Criamos uma rota do tipo POST no servidor Express
// Essa rota será usada para cadastrar um novo veículo no banco de dados
app.post('/api/veiculos/cadastrar', async (req, res) => {

  try {

    // Extraímos os dados enviados pelo cliente na requisição
    // req.body contém os dados que o cliente enviou no 
    //      corpo da requisição (JSON)
    // Aqui, estamos pegando os campos "placa", "modelo", "cor" e "proprietario"
    const { placa, modelo, cor, proprietario } = req.body;

    // Verificamos no banco de dados se já existe um veículo com a mesma placa
    // O método findOne busca um veículo cuja placa seja igual à informada
    // O objetivo é evitar o cadastro de veículos duplicados
    const veiculoExistente = await Veiculo.findOne({ placa });

    // Se a variável "veiculoExistente" não for null, 
    //      significa que já existe um veículo com essa placa
    // Neste caso, retornamos um erro 400 (Bad Request) com 
    //      uma mensagem informando que a placa já está cadastrada
    if (veiculoExistente) {
      return res.status(400).json({ mensagem: 'Já existe um veículo com esta placa!' });
    }

    // Criamos um novo objeto do modelo "Veiculo" com os dados recebidos
    // "new Veiculo({ placa, modelo, cor, proprietario })" 
    //      significa que estamos criando um novo veículo
    // Cada campo (placa, modelo, cor, proprietario) recebe 
    //      os valores que foram enviados pelo cliente
    const novoVeiculo = new Veiculo({ placa, modelo, cor, proprietario });

    // Salvamos o novo veículo no banco de dados
    // Como essa operação pode demorar um pouco, usamos "await" 
    //      para esperar até que o veículo seja salvo
    await novoVeiculo.save();

    // Se o veículo foi salvo com sucesso, retornamos uma 
    //      resposta 201 (Created)
    // Status 201 indica que um novo recurso (veículo) 
    //      foi criado com sucesso no banco de dados
    // Também enviamos uma mensagem informando que o 
    //      veículo foi cadastrado corretamente
    return res.status(201).json({ mensagem: 'Veículo cadastrado com sucesso!' });

  // Se ocorrer qualquer erro durante o processo, ele 
  //      será capturado aqui dentro do bloco "catch"
  } catch (erro) {
    
    // Mostramos o erro no console do servidor para que o 
    //      desenvolvedor possa ver o que aconteceu
    console.error('Erro ao cadastrar veículo:', erro);

    // Retornamos uma resposta com status 500 (Erro interno do servidor)
    // Isso indica ao cliente que houve um problema 
    //      inesperado ao tentar cadastrar o veículo
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });

  }

});

// Criamos uma rota GET para listar os veículos 
//      cadastrados no banco de dados
// Essa rota será acessada por meio da URL "/api/veiculos"
app.get('/api/veiculos', async (req, res) => {

  try {

    // Pegamos o parâmetro "placa" da URL, caso o usuário 
    //      tenha enviado um filtro na requisição
    // req.query é usado para capturar parâmetros opcionais 
    //      que o cliente pode enviar na URL
    // Exemplo: Se o usuário acessar "/api/veiculos?placa=ABC", 
    //      req.query.placa será "ABC"
    const { placa } = req.query;

    // Criamos uma variável "veiculos" para armazenar os 
    //      veículos encontrados no banco de dados
    let veiculos = [];

    // Se o usuário forneceu um número de placa na URL, 
    //      filtramos os veículos por essa placa
    if (placa) {

      // Usamos "new RegExp(placa, 'i')" para criar uma expressão 
      //      regular que faz a busca sem diferenciar maiúsculas e minúsculas
      // Isso significa que "abc-1234" e "ABC-1234" serão 
      //      considerados iguais na pesquisa
      veiculos = await Veiculo.find({ placa: new RegExp(placa, 'i') });

    } else {

      // Se o usuário NÃO enviou um filtro de placa, 
      //      buscamos TODOS os veículos cadastrados
      veiculos = await Veiculo.find();

    }

    // Retornamos os veículos encontrados com status 200 (sucesso)
    // O resultado será um array contendo os veículos do banco de dados
    return res.status(200).json(veiculos);

  // Se ocorrer algum erro durante a execução do código, 
  //      ele será capturado aqui no bloco "catch"
  } catch (erro) {
    
    // Exibimos o erro no console do servidor para ajudar na depuração
    console.error('Erro ao listar veículos:', erro);

    // Retornamos uma resposta com status 500 (Erro interno do servidor)
    // Isso indica que houve um problema no servidor ao 
    //      tentar buscar os veículos
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });

  }
});

// Buscar um veículo por ID
// Criamos uma rota GET para buscar um veículo específico pelo ID
// Essa rota será acessada por meio da URL "/api/veiculos/:id"
// O ":id" na URL significa que será um valor dinâmico (o ID do veículo)
app.get('/api/veiculos/:id', async (req, res) => {

  try {

    // Buscamos um veículo no banco de dados pelo ID fornecido na URL
    // "req.params.id" captura o valor do ID que o usuário enviou na URL
    // Exemplo: Se o usuário acessar "/api/veiculos/12345", 
    //      req.params.id será "12345"
    const veiculo = await Veiculo.findById(req.params.id);

    // Se não encontrar um veículo com esse ID, significa 
    //      que ele não existe no banco de dados
    // Retornamos uma resposta 404 (Não Encontrado) 
    //      para informar o cliente
    if (!veiculo) {
      return res.status(404).json({ mensagem: 'Veículo não encontrado.' });
    }

    // Se o veículo foi encontrado, retornamos os dados dele no formato JSON
    // O cliente receberá os detalhes do veículo em 
    //      formato de objeto JSON
    return res.json(veiculo);

  // Se ocorrer um erro durante a execução do código, ele 
  //      será capturado aqui no bloco "catch"
  } catch (erro) {

    // Exibimos o erro no console do servidor para ajudar na depuração
    console.error('Erro ao buscar veículo:', erro);

    // Retornamos uma resposta com status 500 (Erro interno do servidor)
    // Isso indica que houve um problema no servidor ao tentar buscar o veículo
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }

});


// Editar veículo
// Criamos uma rota PUT para editar (atualizar) um veículo no banco de dados
// O método PUT é usado para atualizar um recurso existente
// Essa rota será acessada por meio da URL "/api/veiculos/:id"
// O ":id" na URL significa que será um valor dinâmico (o ID do veículo)
app.put('/api/veiculos/:id', async (req, res) => {

  try {

    // Extraímos os dados enviados pelo cliente no corpo da requisição
    // O cliente precisa enviar um JSON contendo os novos dados do veículo
    const { placa, modelo, cor, proprietario } = req.body;

    // Buscamos o veículo pelo ID e atualizamos seus dados no banco de dados
    // "findByIdAndUpdate" encontra o veículo pelo ID e 
    //      atualiza com os novos valores fornecidos
    const atualizado = await Veiculo.findByIdAndUpdate(

      req.params.id, // O ID do veículo é extraído da URL
      { placa, modelo, cor, proprietario }, // Novos dados que queremos atualizar
      { new: true } // Opção "new: true" faz com que o MongoDB retorne o objeto atualizado

    );

    // Se não encontrar um veículo com esse ID, significa 
    //      que ele não existe no banco de dados
    // Retornamos uma resposta 404 (Não Encontrado) 
    //      para informar o cliente
    if (!atualizado) {
      return res.status(404).json({ mensagem: 'Veículo não encontrado.' });
    }

    // Se o veículo foi atualizado com sucesso, retornamos 
    //      uma resposta 200 (sucesso)
    // O JSON contém uma mensagem de confirmação e os dados 
    //      atualizados do veículo
    return res.status(200).json({
      mensagem: 'Veículo atualizado com sucesso!',
      veiculo: atualizado
    });

  // Se ocorrer um erro durante a execução do código, ele 
  //      será capturado aqui no bloco "catch"
  } catch (erro) {

    // Exibimos o erro no console do servidor para ajudar na depuração
    console.error('Erro ao editar veículo:', erro);

    // Retornamos uma resposta com status 500 (Erro interno do servidor)
    // Isso indica que houve um problema no servidor ao tentar editar o veículo
    return res.status(500).json({ mensagem: 'Erro interno ao editar veículo.' });

  }
});


// Excluir veículo
// Criamos uma rota DELETE para excluir um veículo pelo ID
// Essa rota será acessada por meio da URL "/api/veiculos/:id"
// O ":id" na URL indica que o valor do ID será fornecido pelo cliente
app.delete('/api/veiculos/:id', async (req, res) => {

  try {

    // Tentamos encontrar e excluir um veículo no banco de 
    //      dados com base no ID fornecido
    // "findByIdAndDelete" procura um veículo pelo ID e o remove do banco de dados
    // "req.params.id" captura o valor do ID que foi enviado na URL da requisição
    const del = await Veiculo.findByIdAndDelete(req.params.id);

    // Verificamos se um veículo com esse ID realmente 
    //      existia antes de ser excluído
    // Se "del" for null, significa que nenhum veículo foi 
    //      encontrado com esse ID
    if (!del) {

      // Retornamos uma resposta 404 (Não Encontrado) indicando 
      //      que o veículo não existe
      return res.status(404).json({ mensagem: 'Veículo não encontrado.' });

    }

    // Se o veículo foi encontrado e excluído com sucesso, 
    //      retornamos uma resposta 200 (OK)
    // Enviamos uma mensagem informando que a exclusão foi 
    //      realizada com sucesso
    return res.status(200).json({ mensagem: 'Veículo excluído com sucesso!' });

  // Se ocorrer qualquer erro durante a exclusão, ele será 
  //      capturado aqui no bloco "catch"
  } catch (erro) {

    // Exibimos o erro no console para ajudar na depuração
    console.error('Erro ao excluir veículo:', erro);

    // Retornamos uma resposta 500 (Erro Interno do Servidor)
    // Isso indica ao cliente que houve um problema inesperado no 
    //      servidor ao tentar excluir o veículo
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });

  }
});


// =============================
// Rotas de Reservas
// =============================

// Criar reserva
// Criamos uma rota POST para criar uma nova reserva
// Essa rota será acessada por meio da URL "/api/reservas"
// O método POST é usado porque estamos enviando dados para o 
//      servidor para criar um novo registro
app.post('/api/reservas', async (req, res) => {

  try {

    // Extraímos os dados enviados pelo cliente no 
    //      corpo da requisição (req.body)
    // O cliente precisa enviar um JSON com as seguintes informações:
    const {
      data,              // Data da reserva (Exemplo: "2025-03-20")
      hora,              // Hora da reserva (Exemplo: "14:00")
      vaga,              // Número da vaga reservada (Exemplo: "Vaga 12")
      placaVeiculo,      // Placa do veículo (Exemplo: "ABC-1234")
      modeloVeiculo,     // Modelo do veículo (Exemplo: "Honda Civic")
      corVeiculo,        // Cor do veículo (Exemplo: "Preto")
      proprietarioVeiculo // Nome do proprietário do veículo (Exemplo: "João Silva")
    } = req.body;

    // Quebramos a string "data" no formato "YYYY-MM-DD" em 
    //      três partes: ano, mês e dia
    // Exemplo: Se "data" for "2025-03-05", o resultado será:
    // year = "2025", month = "03", day = "05"
    const [year, month, day] = data.split('-');

    // Quebramos a string "hora" no formato "HH:MM" em 
    //      duas partes: hora e minuto
    // Exemplo: Se "hora" for "06:00", o resultado será:
    // hour = "06", minute = "00"
    const [hour, minute] = hora.split(':');

    // Criamos um objeto de data (Date) com as informações extraídas acima
    // A função new Date() recebe os valores numéricos e cria 
    //      um objeto de data e hora
    // O mês no JavaScript começa do índice 0 (Janeiro é 0, 
    //      Fevereiro é 1, etc.), então subtraímos 1 do mês
    // O último parâmetro "0" representa os segundos, 
    //      que definimos como zero
    const dataHoraInicio = new Date(
      parseInt(year),        // Ano convertido para número (Exemplo: 2025)
      parseInt(month) - 1,   // Mês convertido para número e ajustado (-1 para o índice do JS)
      parseInt(day),         // Dia convertido para número (Exemplo: 5)
      parseInt(hour),        // Hora convertida para número (Exemplo: 6)
      parseInt(minute || 0), // Minuto convertido para número (se for indefinido, assume 0)
      0                      // Segundos definidos como 0
    );

    // Criamos um novo objeto de data para representar o 
    //      horário de término da reserva
    // Copiamos "dataHoraInicio" para "dataHoraFim" para 
    //      iniciar com os mesmos valores
    const dataHoraFim = new Date(dataHoraInicio);

    // Adicionamos 1 hora ao horário de término da reserva
    // Pegamos a hora atual do objeto "dataHoraInicio" e 
    //      somamos +1 para definir a hora de fim
    dataHoraFim.setHours(dataHoraInicio.getHours() + 1);


    // Verificamos se já existe uma reserva para a mesma 
    //      vaga no mesmo horário
    // Isso evita conflitos onde duas pessoas tentam 
    //      reservar a mesma vaga ao mesmo tempo

    // Buscamos no banco de dados uma reserva existente 
    //      com as seguintes condições:
    const reservaExistente = await Reserva.findOne({

      // A vaga deve ser a mesma que está sendo 
      //      solicitada para a nova reserva
      vaga, 

      // Apenas verificamos reservas que ainda estão 
      //      ativas (status "reservado")
      status: 'reservado', 
      
      // Verificamos se há alguma reserva que tenha um 
      //      intervalo de tempo sobreposto
      // A condição $lt (menor que) verifica se a reserva 
      //      existente termina depois do novo início
      dataHoraInicio: { $lt: dataHoraFim },

      // A condição $gt (maior que) verifica se a reserva 
      //      existente começa antes do novo fim
      dataHoraFim: { $gt: dataHoraInicio }

    });

    // Se a consulta retornar um resultado, significa que já 
    //      existe uma reserva nesse horário
    if (reservaExistente) {

      // Retornamos um erro 400 (Bad Request), informando que a 
      //      vaga já está ocupada no período solicitado
      return res.status(400).json({ mensagem: 'Esta vaga já está reservada nesse horário.' });

    }

    // Criamos um novo objeto de reserva utilizando o modelo "Reserva"
    // Este objeto representa a nova reserva que será salva no banco de dados
    const novaReserva = new Reserva({
      dataHoraInicio,     // Data e hora em que a reserva começa (calculada anteriormente)
      dataHoraFim,        // Data e hora em que a reserva termina (calculada anteriormente)
      vaga,               // Número da vaga que está sendo reservada
      placaVeiculo,       // Placa do veículo que está sendo reservado
      modeloVeiculo,      // Modelo do veículo (exemplo: "Honda Civic")
      corVeiculo,         // Cor do veículo (exemplo: "Preto")
      proprietarioVeiculo,// Nome do proprietário do veículo
      status: 'reservado' // O status inicial da reserva é "reservado", indicando que está ativa
    });

    // Salvamos a nova reserva no banco de dados
    // Como essa operação pode demorar um pouco, usamos "await" para 
    //      esperar até que a reserva seja salva
    await novaReserva.save();

    // Se a reserva foi salva com sucesso, retornamos uma resposta 201 (Created)
    // Status 201 indica que um novo recurso (reserva) foi 
    //      criado com sucesso no banco de dados
    // Também enviamos uma mensagem informando que a 
    //      reserva foi realizada corretamente
    return res.status(201).json({ mensagem: 'Reserva realizada com sucesso!' });


  // Se ocorrer algum erro durante o processo de criação da 
  //      reserva, ele será capturado aqui no bloco "catch"
  } catch (erro) {

    // Exibimos o erro no console do servidor para ajudar na depuração
    // Isso permite que o desenvolvedor veja o que aconteceu e 
    //      corrija o problema, se necessário
    console.error('Erro ao criar reserva:', erro);

    // Retornamos uma resposta com status 500 (Erro interno do servidor)
    // Isso indica ao cliente que houve um problema inesperado 
    //      no servidor ao tentar criar a reserva
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });

  }

});

// Listar reservas de um dia (para exibir no mapa)

// Criamos uma rota GET para listar as reservas de uma data específica
// Essa rota será acessada por meio da URL "/api/reservas"
// O cliente deve fornecer uma data no formato "YYYY-MM-DD" 
//      como parâmetro de consulta
app.get('/api/reservas', async (req, res) => {

  try {

    // Pegamos a data enviada pelo cliente na URL como um 
    //      parâmetro de consulta
    // req.query é utilizado para capturar parâmetros 
    //      opcionais enviados na URL
    // Exemplo de chamada válida: "/api/reservas?data=2025-03-20"
    const { data } = req.query;

    // Se o cliente não enviar a data, retornamos um erro 400 (Bad Request)
    // O código verifica se a variável "data" está vazia ou indefinida
    if (!data) {
      return res.status(400).json({ mensagem: 'É necessário fornecer a data (YYYY-MM-DD).' });
    }


    // Converter para objeto Date
    // Criamos um objeto de data representando o início do dia, 
    //      com hora definida para 00:00:00
    // A string `${data}T00:00:00` cria uma data no 
    //      formato "YYYY-MM-DDT00:00:00" (onde 'T' separa a data da hora)
    // Exemplo: Se a data for "2025-03-20", "inicioDia" 
    //      será a data de "2025-03-20T00:00:00"
    const inicioDia = new Date(`${data}T00:00:00`);

    // Criamos um objeto de data representando o fim do dia, 
    //      com hora definida para 23:59:59
    // A string `${data}T23:59:59` cria uma data no 
    //      formato "YYYY-MM-DDT23:59:59"
    // Exemplo: Se a data for "2025-03-20", "fimDia" 
    //      será a data de "2025-03-20T23:59:59"
    const fimDia = new Date(`${data}T23:59:59`);

    // Buscamos as reservas no banco de dados que 
    //      tenham "dataHoraInicio" dentro do intervalo 
    //      de 00:00:00 até 23:59:59 do dia
    // Utilizamos a operação "$gte" (maior ou igual) para 
    //      verificar se a dataHoraInicio é maior ou igual ao início do dia
    // E "$lte" (menor ou igual) para verificar se a 
    //      dataHoraInicio é menor ou igual ao fim do dia
    // Isso garante que todas as reservas dentro desse 
    //      intervalo de tempo serão recuperadas
    const reservas = await Reserva.find({
      dataHoraInicio: { $gte: inicioDia, $lte: fimDia }
    });

    // Se a busca for bem-sucedida, retornamos uma 
    //      resposta com status 200 (sucesso)
    // Enviamos as reservas encontradas no banco de dados 
    //      como uma resposta em formato JSON
    return res.status(200).json(reservas);

  // Se ocorrer qualquer erro durante a execução do código de 
  //      busca de reservas, o erro será capturado aqui no bloco "catch"
  } catch (erro) {

    // Exibimos o erro no console para que o desenvolvedor 
    //      possa verificar o que aconteceu
    // Isso ajuda a identificar e corrigir problemas, caso ocorra 
    //      algum erro no banco de dados ou outra parte do código
    console.error('Erro ao buscar reservas:', erro);

    // Retornamos uma resposta com status 500 (Erro interno do servidor)
    // Isso indica ao cliente que houve um problema inesperado no 
    //      servidor enquanto ele tentava buscar as reservas
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });

  }

});

// Relatório (com dataInicio e dataFim)
// Criamos uma rota GET para gerar um relatório de reservas com filtros opcionais
// Essa rota será acessada por meio da URL "/api/reservas/relatorio"
// O cliente pode fornecer parâmetros como dataInicio, dataFim, 
//      placa e proprietario para filtrar o relatório
app.get('/api/reservas/relatorio', async (req, res) => {

  try {

    // Pegamos os parâmetros enviados na URL como query 
    //      strings (parametros de consulta)
    // req.query contém os parâmetros passados na URL (por 
    //      exemplo, "/api/reservas/relatorio?dataInicio=2025-03-01&dataFim=2025-03-10")
    let { dataInicio, dataFim, placa, proprietario } = req.query;

    // Inicializamos um objeto de filtro vazio, que será 
    //      preenchido conforme os parâmetros enviados pelo cliente
    // O filtro será usado para buscar as reservas que 
    //      atendem aos critérios solicitados
    const filtro = {};


    // Se não forem passadas datas, usar últimos 7 dias
    // Se os parâmetros de dataInicio ou dataFim não forem 
    //      fornecidos, definimos um intervalo padrão
    // Isso garante que, caso o cliente não forneça as datas, o 
    //      sistema use um intervalo de 7 dias atrás até o dia atual
    if (!dataInicio || !dataFim) {
      
      // Criamos um objeto de data para o dia atual (hoje)
      const hoje = new Date();

      // Criamos um novo objeto de data para 7 dias atrás
      const seteDiasAtras = new Date();

      // Subtraímos 7 dias da data de hoje
      seteDiasAtras.setDate(hoje.getDate() - 7); 

      // Definimos a data de início como 7 dias atrás e a 
      //      data de fim como o dia de hoje
      // A função toISOString() converte a data para o formato ISO 8601, 
      //      que é no formato "yyyy-MM-ddT00:00:00Z"
      // Usamos split('T')[0] para pegar apenas a parte "yyyy-MM-dd" e 
      //      ignorar a parte da hora
      dataInicio = seteDiasAtras.toISOString().split('T')[0]; // yyyy-MM-dd
      dataFim = hoje.toISOString().split('T')[0]; // yyyy-MM-dd

    }

    // Criamos um objeto de data para o início do 
    //      intervalo de datas (com hora 00:00:00)
    const inicio = new Date(`${dataInicio}T00:00:00.000Z`);

    // Criamos um objeto de data para o fim do intervalo de 
    //      datas (com hora 23:59:59)
    const fim = new Date(`${dataFim}T23:59:59.999Z`);

    // Definimos o filtro para a busca no banco de dados
    // Estamos dizendo que queremos encontrar reservas cuja 
    //      dataHoraInicio esteja dentro do intervalo
    filtro.dataHoraInicio = { $gte: inicio, $lte: fim };

    // Se o cliente forneceu o parâmetro "placa" na URL (por 
    //      exemplo, "/api/reservas/relatorio?placa=ABC1234")
    // Adicionamos um filtro para buscar reservas que tenham a 
    //      placa do veículo correspondente
    // A expressão regular (RegExp) é usada para fazer uma busca 
    //      que não diferencia maiúsculas de minúsculas (opção 'i')
    if (placa) {
      filtro.placaVeiculo = new RegExp(placa, 'i');
    }

    // Se o cliente forneceu o parâmetro "proprietario" na URL (por 
    //      exemplo, "/api/reservas/relatorio?proprietario=João")
    // Adicionamos um filtro para buscar reservas que tenham o 
    //      nome do proprietário correspondente
    // Novamente, usamos uma expressão regular para que a 
    //      busca não seja sensível a maiúsculas/minúsculas
    if (proprietario) {
      filtro.proprietarioVeiculo = new RegExp(proprietario, 'i');
    }

    // Buscamos no banco de dados todas as reservas que 
    //      atendem aos critérios definidos no objeto "filtro"
    // O método "Reserva.find(filtro)" irá aplicar os filtros 
    //      de data, placa e proprietário na busca
    const reservas = await Reserva.find(filtro);

    // Se as reservas forem encontradas, retornamos uma 
    //      resposta 200 (sucesso) com a lista de 
    //      reservas em formato JSON
    return res.status(200).json(reservas);

  // Se ocorrer qualquer erro durante a execução do código, 
  //      ele será capturado aqui no bloco "catch"
  } catch (erro) {

    // Exibimos o erro no console para que o desenvolvedor 
    //      possa verificar o que aconteceu
    // Isso ajuda na depuração, permitindo que o desenvolvedor 
    //      entenda o erro e corrija o problema
    console.error('Erro ao gerar relatório:', erro);

    // Retornamos uma resposta com status 500 (Erro interno do servidor)
    // O código 500 indica que houve um problema no servidor 
    //      enquanto ele tentava gerar o relatório
    // Além da mensagem genérica, também retornamos o erro 
    //      detalhado (erro.message) para ajudar na depuração
    return res.status(500).json({

      // Mensagem genérica para o cliente
      mensagem: 'Erro interno do servidor.', 
      
      // Mensagem detalhada do erro, para ajudar a 
      //      identificar o problema
      erroDetalhado: erro.message

    });
  }

});

// Buscar uma reserva por ID
// Criamos uma rota GET para buscar uma reserva específica pelo ID
// Essa rota será acessada por meio da URL "/api/reservas/:id"
// O ":id" na URL indica que o valor do ID será fornecido pelo cliente
app.get('/api/reservas/:id', async (req, res) => {

  try {

    // Buscamos uma reserva no banco de dados pelo ID fornecido na URL
    // O ID da reserva é extraído de "req.params.id", 
    //      que contém o valor enviado na URL
    // Exemplo: Se a URL for "/api/reservas/12345", 
    //      req.params.id será "12345"
    const reserva = await Reserva.findById(req.params.id);

    // Se não encontrar uma reserva com o ID fornecido, 
    //      retornamos um erro 404 (Não encontrado)
    // Isso significa que não há nenhuma reserva com 
    //      aquele ID no banco de dados
    if (!reserva) {
      return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
    }

    // Se a reserva for encontrada, retornamos os 
    //      dados da reserva no formato JSON
    // A resposta terá um status 200 (sucesso) com 
    //      os dados da reserva
    return res.json(reserva);

  // Se ocorrer um erro durante a execução do 
  //      código (exemplo: falha no banco de dados)
  // O erro será capturado aqui no bloco "catch"
  } catch (erro) {
    
    // Exibimos o erro no console para ajudar o 
    //      desenvolvedor a depurar o problema
    console.error('Erro ao buscar reserva:', erro);

    // Retornamos uma resposta com status 500 (Erro interno do servidor)
    // Isso indica que algo deu errado no servidor ao tentar buscar a reserva
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });

  }
});


// Finalizar reserva
// Criamos uma rota PUT para finalizar uma reserva pelo ID
// O método PUT é usado para atualizar o estado de um recurso existente
// Essa rota será acessada por meio da URL "/api/reservas/finalizar/:id"
// O ":id" na URL indica que o valor do ID será fornecido pelo cliente
app.put('/api/reservas/finalizar/:id', async (req, res) => {

  try {

    // Extraímos os dados enviados pelo cliente no corpo da requisição
    // O cliente deve fornecer a data e a hora de término da reserva
    const { dataFim, horaFim } = req.body;

    // Buscamos a reserva no banco de dados pelo ID fornecido na URL
    // O ID da reserva é extraído de "req.params.id", 
    //      que contém o valor enviado na URL
    // Exemplo: Se a URL for "/api/reservas/finalizar/12345", 
    //      req.params.id será "12345"
    const reserva = await Reserva.findById(req.params.id);

    // Se não encontrar uma reserva com o ID fornecido, 
    //      retornamos um erro 404 (Não encontrado)
    // Isso significa que não há nenhuma reserva com 
    //      aquele ID no banco de dados
    if (!reserva) {
      return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
    }

    // Verificamos se a reserva já foi finalizada anteriormente
    // Se o status da reserva for "finalizado", não 
    //      permitimos que o cliente finalize novamente
    if (reserva.status === 'finalizado') {
      return res.status(400).json({ mensagem: 'Reserva já finalizada.' });
    }

    // Criamos um objeto de data para a data e hora 
    //      de término da reserva
    // A string `${dataFim}T${horaFim}:00` cria uma data no 
    //      formato ISO 8601 (YYYY-MM-DDTHH:mm:ss)
    // Exemplo: Se "dataFim" for "2025-03-20" e "horaFim" 
    //      for "14:30", a data será "2025-03-20T14:30:00"
    const dataHoraFim = new Date(`${dataFim}T${horaFim}:00`);

    // Calculamos a diferença de tempo entre a dataHoraFim e a 
    //      dataHoraInicio da reserva em milissegundos
    // A operação "dataHoraFim - reserva.dataHoraInicio" 
    //      resulta na diferença em milissegundos
    const msDiff = dataHoraFim - reserva.dataHoraInicio;

    // Convertemos a diferença de milissegundos para horas
    // 1000 * 60 * 60 é o número de milissegundos em uma hora
    let horas = msDiff / (1000 * 60 * 60);

    // Arredondamos o número de horas para cima (ceil) para 
    //      garantir que qualquer fração de hora seja 
    //      contabilizada como uma hora inteira
    horas = Math.ceil(horas);

    // Calculamos o valor da reserva multiplicando o número de 
    //      horas pelo valor por hora (5 unidades monetárias por hora)
    const valor = horas * 5;

    // Atualizamos a reserva com a dataHoraFim, o valor 
    //      pago e o status "finalizado"
    reserva.dataHoraFim = dataHoraFim;  // Definimos a data de término da reserva
    reserva.valorPago = valor;          // Definimos o valor pago pela reserva
    reserva.status = 'finalizado';      // Alteramos o status da reserva para "finalizado"

    // Salvamos as alterações feitas na reserva no banco de dados
    // O método "save()" persiste as mudanças que 
    //      fizemos na reserva (como dataHoraFim, valorPago e status)
    await reserva.save();

    // Retornamos uma resposta 200 (sucesso) indicando 
    //      que a reserva foi finalizada corretamente
    // Enviamos uma mensagem de sucesso junto com o 
    //      número de horas e o valor pago pela reserva
    return res.status(200).json({
      mensagem: 'Reserva finalizada com sucesso!', // Mensagem informando que a reserva foi concluída
      horas, // Número de horas da reserva (calculado anteriormente)
      valor // O valor total pago pela reserva (calculado anteriormente)
    });

  // Se ocorrer qualquer erro durante a execução do 
  //      código, o erro será capturado aqui no bloco "catch"
  } catch (erro) {

    // Exibimos o erro no console para que o desenvolvedor 
    //      possa verificar o que aconteceu
    // Isso ajuda a entender a causa do erro, para que ele 
    //      possa ser corrigido posteriormente
    console.error('Erro ao finalizar reserva:', erro);

    // Retornamos uma resposta com status 500 (Erro interno do servidor)
    // O código 500 indica que houve um problema no servidor 
    //      enquanto ele tentava finalizar a reserva
    // Isso informa ao cliente que o processo falhou devido a 
    //      um erro inesperado no servidor
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });

  }

});

// Excluir reserva
// Criamos uma rota DELETE para excluir uma reserva pelo ID
// O método DELETE é utilizado para remover recursos no servidor
// Essa rota será acessada por meio da URL "/api/reservas/:id"
// O ":id" na URL indica que o valor do ID será fornecido pelo cliente
app.delete('/api/reservas/:id', async (req, res) => {

  try {

    // Buscamos e excluímos uma reserva no banco de 
    //      dados pelo ID fornecido na URL
    // O ID da reserva é extraído de "req.params.id", 
    //      que contém o valor enviado na URL
    // Exemplo: Se a URL for "/api/reservas/12345", 
    //      req.params.id será "12345"
    const del = await Reserva.findByIdAndDelete(req.params.id);

    // Se a reserva não for encontrada, "del" será null ou undefined
    // Nesse caso, retornamos um erro 404 (Não encontrado) 
    //      informando que a reserva não existe
    if (!del) {
      return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
    }

    // Se a reserva foi excluída com sucesso, retornamos 
    //      uma resposta 200 (OK)
    // Enviamos uma mensagem informando que a reserva 
    //      foi excluída com sucesso
    return res.status(200).json({ mensagem: 'Reserva excluída com sucesso!' });

  // Se ocorrer um erro durante o processo de exclusão (por 
  //      exemplo, erro no banco de dados)
  // O erro será capturado aqui no bloco "catch"
  } catch (erro) {

    // Exibimos o erro no console do servidor para ajudar na depuração
    console.error('Erro ao excluir reserva:', erro);

    // Retornamos uma resposta com status 500 (Erro interno do servidor)
    // Isso indica ao cliente que houve um problema 
    //      inesperado no servidor durante a exclusão
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });

  }
});


// Inicia o servidor
// Definimos a porta na qual o servidor vai ouvir as requisições
// A porta 3000 é um valor comum para desenvolvimento 
//      local em muitos servidores
const PORTA = 3000;

// Iniciamos o servidor na porta definida (3000)
// O método "app.listen" inicia o servidor e fica "ouvindo" 
//      por requisições na porta especificada
// A função de callback será chamada assim que o 
//      servidor começar a rodar
app.listen(PORTA, () => {
  
  // Quando o servidor estiver rodando, exibimos 
  //      uma mensagem no console
  // A mensagem informa ao desenvolvedor que o servidor 
  //      está ativo e na porta correta
  console.log(`Servidor rodando na porta ${PORTA}`);

});