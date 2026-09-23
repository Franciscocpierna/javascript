// Importa o módulo 'express' para criar e gerenciar o servidor web
const express = require('express');

// Importa o módulo 'mongoose' para interagir com o banco de dados MongoDB
const mongoose = require('mongoose');

// Importa o módulo 'cors' para permitir requisições entre 
//      diferentes domínios (Cross-Origin Resource Sharing)
const cors = require('cors');

// Cria uma instância do aplicativo Express, que 
//      será o servidor da aplicação
const app = express();

// Adiciona um middleware para permitir o uso de 
//      JSON nas requisições e respostas
// Isso permite que o servidor entenda dados no 
//      formato JSON enviados pelos clientes
app.use(express.json());

// Adiciona um middleware para habilitar o CORS (Cross-Origin Resource Sharing)
// Isso permite que clientes em diferentes domínios 
//      acessem a API sem restrições de segurança
app.use(cors());


// ======================================
// Conexão com MongoDB
// ======================================

// Conecta o aplicativo ao banco de dados MongoDB 
//      chamado "meu_supermercado" que está rodando localmente
mongoose.connect('mongodb://localhost:27017/meu_supermercado', {
  
  // Define que o MongoDB deve usar o novo analisador de URL de conexão
  // Esse novo analisador melhora o suporte a 
  //      conexões e novas funcionalidades
  useNewUrlParser: true,

  // Configura a conexão para usar o novo mecanismo de 
  //      gerenciamento de conexões do MongoDB
  // Isso evita problemas de compatibilidade e 
  //      melhora a performance da conexão
  useUnifiedTopology: true

});


// ======================================
// Schemas e Models
// ======================================

// ----------------- Usuário -----------------
// Criando uma estrutura de dados chamada "UsuarioSchema" 
//      utilizando o Mongoose.
// Um "Schema" (esquema) é um modelo que define a estrutura de 
//      um documento dentro de uma coleção no MongoDB.
// Ele especifica quais campos existirão e quais tipos de
//       dados cada campo pode armazenar.
const UsuarioSchema = new mongoose.Schema({ 

  // O campo "nome" armazenará o nome completo do usuário.
  // O tipo "String" significa que este campo pode conter apenas texto.
  nome: String,

  // O campo "email" armazenará o endereço de e-mail do usuário.
  // "type: String" define o tipo de dado como texto.
  // "unique: true" significa que nenhum outro usuário 
  //      pode ter o mesmo e-mail.
  // Isso impede que dois usuários se cadastrem com o 
  //      mesmo endereço de e-mail.
  email: { type: String, unique: true },

  // O campo "senha" armazenará a senha do usuário.
  // O tipo "String" indica que a senha será salva 
  //      como texto no banco de dados.
  // IMPORTANTE: Em aplicações reais, nunca armazene 
  //      senhas em texto puro.
  // É fundamental criptografar a senha antes de salvá-la no 
  //      banco para garantir segurança.
  senha: String,

  // O campo "idade" armazenará a idade do usuário em formato numérico.
  // O tipo "Number" significa que apenas valores numéricos 
  //      podem ser salvos neste campo.
  idade: Number

});

// Criando um modelo chamado "Usuario" baseado no esquema "UsuarioSchema".
// O modelo "Usuario" será utilizado para interagir com a 
//        coleção "usuarios" do banco de dados.
// Ele permite realizar operações como adicionar, 
//        buscar, atualizar e excluir usuários.
const Usuario = mongoose.model('Usuario', UsuarioSchema);



// ======================================
// Relatório de Vendas com filtros
// ======================================

// Rota GET para gerar um relatório de Vendas com filtros opcionais
// Endpoint: /relatorio/vendas
// Parâmetros de filtro: dataInicial, dataFinal, fornecedorNome, 
//      produtoNome, cpfCliente
// Se não forem passadas datas, usa os últimos 7 dias como padrão

// Criamos uma rota GET chamada "/relatorio/vendas"
// Essa rota recebe filtros via parâmetros da URL e retorna 
//      vendas filtradas conforme os critérios
app.get('/relatorio/vendas', async (req, res) => {
  
  try {

    // Extraímos os parâmetros da URL (query strings) enviados pelo cliente
    // Esses parâmetros podem conter filtros opcionais para restringir os resultados
    let { dataInicial, dataFinal, fornecedorNome, produtoNome, cpfCliente } = req.query;

    // Se o usuário não fornecer datas, definimos um padrão 
    //      de busca para os últimos 7 dias
    if (!dataInicial || !dataFinal) {

      // Criamos um objeto Date representando o dia de hoje
      const hoje = new Date();

      // Criamos outro objeto Date representando 7 dias atrás a partir de hoje
      const seteDiasAtras = new Date();
      
      // Ajustamos a data do objeto 'seteDiasAtras' subtraindo 7 dias do dia atual
      seteDiasAtras.setDate(hoje.getDate() - 7);

      // Convertendo as datas para o formato "YYYY-MM-DD", que é 
      //      mais fácil de manipular no banco
      // Utilizamos `toISOString().split('T')[0]` para extrair 
      //      apenas a parte da data (ignorando a hora)
      dataInicial = seteDiasAtras.toISOString().split('T')[0]; // Exemplo: "2025-03-04"
      dataFinal = hoje.toISOString().split('T')[0]; // Exemplo: "2025-03-11"
    }

    // Criar filtro de busca
    // Criamos um objeto chamado "filtro", que armazenará os 
    //      critérios de busca no banco de dados.
    // Esse objeto será passado posteriormente para a consulta ao 
    //      banco de dados para filtrar os resultados desejados.
    const filtro = { 

      // Definimos um intervalo de datas para a busca, garantindo 
      //      que apenas as vendas dentro desse período sejam retornadas.
      data: { 
        
        // "$gte" (Greater Than or Equal) indica que a data da venda 
        //      deve ser **maior ou igual** à dataInicial.
        // Criamos um objeto Date com a dataInicial ajustada 
        //      para "00:00:00" (meia-noite) para incluir todo o dia.
        $gte: new Date(`${dataInicial}T00:00:00.000Z`), 

        // "$lte" (Less Than or Equal) indica que a data da venda 
        //      deve ser **menor ou igual** à dataFinal.
        // Criamos um objeto Date com a dataFinal ajustada 
        //      para "23:59:59.999" para garantir que todas as 
        //      vendas daquele dia sejam incluídas.
        $lte: new Date(`${dataFinal}T23:59:59.999Z`) 
        
      }
    };

    // Verificamos se o usuário forneceu um CPF no filtro da requisição.
    // Caso o CPF tenha sido informado, adicionamos essa 
    //      condição ao objeto "filtro".
    if (cpfCliente) {

      // O campo "clienteCpf" no banco de dados precisa corresponder 
      //      exatamente ao CPF informado pelo usuário.
      // Utilizamos `.trim()` para remover espaços em branco antes e 
      //      depois da string, garantindo uma comparação precisa.
      filtro.clienteCpf = cpfCliente.trim();

    }


    // Criar array de filtros adicionais para fornecedores e produtos
    // Criamos um array chamado "filtroItens" que será usado para 
    //      armazenar filtros específicos dentro do array "itens".
    // O objetivo é permitir filtrar vendas que contenham produtos ou 
    //      fornecedores específicos dentro da lista de itens vendidos.
    const filtroItens = [];

    // Verificamos se o usuário forneceu um nome de fornecedor para o filtro.
    if (fornecedorNome) {

      // Criamos um critério de busca para verificar se algum dos 
      //      itens vendidos contém o nome do fornecedor informado.
      // Usamos "new RegExp(fornecedorNome, 'i')" para criar uma 
      //      expressão regular que permita busca parcial e **case-insensitive**.
      // A chave `"itens.nomeFornecedor"` se refere ao campo dentro 
      //      do array "itens" no banco de dados.
      filtroItens.push({ "itens.nomeFornecedor": new RegExp(fornecedorNome, 'i') });

    }

    // Verificamos se o usuário forneceu um nome de produto para o filtro.
    if (produtoNome) {

      // Criamos um critério de busca para verificar se algum dos itens 
      //      vendidos contém o nome do produto informado.
      // Assim como no fornecedor, usamos uma expressão regular para  
      //      buscas parciais e ignoramos diferenças de maiúsculas e minúsculas.
      // A chave `"itens.nomeProduto"` se refere ao campo dentro do 
      //      array "itens" no banco de dados.
      filtroItens.push({ "itens.nomeProduto": new RegExp(produtoNome, 'i') });

    }

    // Verificamos se algum filtro para itens foi adicionado 
    //      ao array "filtroItens".
    if (filtroItens.length > 0) {

      // Se houver filtros nos itens, adicionamos ao objeto "filtro" 
      //      utilizando o operador "$and".
      // "$and" garante que todas as condições dentro do array "filtroItens" 
      //      sejam aplicadas simultaneamente.
      // Isso significa que, se o usuário informou tanto um fornecedor 
      //      quanto um produto, **as vendas retornadas precisam conter ambos**.
      filtro.$and = filtroItens;

    }

    // Agora buscamos as vendas no banco de dados aplicando 
    //      todos os filtros definidos.
    // O método "Venda.find(filtro)" retorna todas as vendas que 
    //      correspondem aos critérios estabelecidos.
    const vendas = await Venda.find(filtro);


    // Filtrar apenas os itens corretos dentro de cada venda
    // Criamos um novo array chamado "vendasFiltradas", que será 
    //      baseado nas vendas retornadas da consulta ao banco de dados.
    // O objetivo dessa filtragem adicional é garantir que, se o 
    //      usuário forneceu um fornecedor ou um produto como critério de busca, 
    //      apenas os itens correspondentes dentro de cada venda sejam mantidos.
    const vendasFiltradas = vendas.map(venda => {
        
        // Criamos um novo array "itensFiltrados" que armazenará 
        //      apenas os itens da venda que correspondem aos critérios de filtro.
        const itensFiltrados = venda.itens.filter(item => {
            
            // Retornamos apenas os itens que atendem a todas as condições abaixo:
            return (

                // Se o usuário **NÃO** informou um fornecedor, **aceitamos 
                //      qualquer item** (true).
                // Se o usuário **informou** um fornecedor, verificamos se o 
                //      nome do fornecedor do item contém o valor informado.
                // O método `.match(new RegExp(fornecedorNome, 'i'))` faz 
                //      uma busca **parcial** e **ignora maiúsculas e minúsculas**.
                (!fornecedorNome || item.nomeFornecedor.match(new RegExp(fornecedorNome, 'i'))) && 

                // Se o usuário **NÃO** informou um produto, **aceitamos 
                //      qualquer item** (true).
                // Se o usuário **informou** um produto, verificamos se o 
                //      nome do produto do item contém o valor informado.
                (!produtoNome || item.nomeProduto.match(new RegExp(produtoNome, 'i')))

            );

        });

        // Retornamos um novo objeto de venda contendo os mesmos dados 
        //      da venda original, mas substituímos o array de itens 
        // pelo novo array "itensFiltrados", que contém apenas os 
        //      itens que passaram pelos filtros.
        // Usamos `{ ...venda._doc }` para clonar os dados originais da
        //      venda antes de modificar o campo "itens".
        return { ...venda._doc, itens: itensFiltrados };

    // Após mapear todas as vendas para que contenham apenas os itens 
    //      filtrados, fazemos uma segunda filtragem:
    // Mantemos apenas as vendas que **ainda possuem itens 
    //      após a filtragem**.
    }).filter(venda => venda.itens.length > 0); 

    // Retornamos o resultado final ao cliente no formato JSON, 
    //      contendo apenas as vendas que possuem itens que passaram pelo filtro.
    return res.status(200).json(vendasFiltradas);


  // Capturamos qualquer erro que possa ocorrer durante a 
  //      execução da função assíncrona.
  // Isso é fundamental para evitar que falhas inesperadas 
  //      interrompam a execução do servidor.
  } catch (erro) {

    // Exibe a mensagem de erro no console do servidor.
    // Isso ajuda na depuração, permitindo que o desenvolvedor 
    //      veja detalhes do erro no terminal.
    console.error('Erro ao gerar relatório:', erro);

    // Retornamos uma resposta HTTP ao cliente com o 
    //      status 500 (Erro Interno do Servidor).
    // O código 500 indica que o problema ocorreu no backend, e 
    //      não devido a uma requisição inválida do cliente.
    return res.status(500).json({

      // Enviamos uma mensagem genérica informando que houve 
      //      um erro no servidor.
      // Isso evita expor informações sensíveis ao usuário 
      //      final, garantindo mais segurança.
      mensagem: 'Erro interno do servidor.',

      // Retornamos um detalhe técnico do erro, que pode ser útil para depuração.
      // A propriedade `erro.message` contém a descrição exata 
      //      do problema ocorrido.
      // Em um ambiente de produção, essa informação pode ser 
      //      omitida para evitar vazamento de dados.
      erroDetalhado: erro.message

    });

  }

});


// ----------------- Fornecedor -----------------

// Criando um esquema (modelo) chamado "FornecedorSchema" usando Mongoose.
// O esquema define como os documentos da coleção 
//        "fornecedores" serão estruturados no MongoDB.
const FornecedorSchema = new mongoose.Schema({

  // O campo "nome" é uma string e armazenará o nome do fornecedor.
  nome: String,

  // O campo "telefone" é uma string e armazenará o telefone do fornecedor.
  // O telefone pode incluir caracteres como parênteses e 
  //      traços, por isso é salvo como string.
  telefone: String,

  // O campo "email" é uma string e armazenará o e-mail do fornecedor.
  email: String

});

// Criando um modelo chamado "Fornecedor" baseado no esquema "FornecedorSchema".
// Esse modelo permite interagir com a coleção "fornecedores" no banco de dados.
// Ele pode ser usado para criar, buscar, atualizar e excluir fornecedores no MongoDB.
const Fornecedor = mongoose.model('Fornecedor', FornecedorSchema);


// ----------------- Cliente -----------------

// Criando um esquema (modelo) chamado "ClienteSchema" utilizando o Mongoose.
// O esquema define como os documentos da coleção 
//       "clientes" serão organizados no banco de dados.
const ClienteSchema = new mongoose.Schema({

  // O campo "cpf" armazenará o CPF do cliente. 
  // Ele é do tipo String porque pode conter pontos e 
  //      traços no formato (ex: "123.456.789-00").
  // A propriedade "unique: true" significa que 
  //      cada CPF deve ser único, ou seja,
  // dois clientes não podem ter o mesmo CPF no banco de dados.
  cpf: { type: String, unique: true },

  // O campo "nome" armazenará o nome completo do cliente.
  // Ele é do tipo String, pois será um texto com letras.
  nome: String,

  // O campo "telefone" armazenará o número de telefone do cliente.
  // Ele é do tipo String, pois o número pode conter 
  //      caracteres como parênteses, espaços e traços.
  telefone: String,

  // O campo "endereco" armazenará o endereço do cliente.
  // Ele é do tipo String e pode conter ruas, números, bairros e cidades.
  endereco: String

});

// Criando um modelo chamado "Cliente" baseado no esquema "ClienteSchema".
// Esse modelo permite interagir com a coleção "clientes" 
//      dentro do banco de dados MongoDB.
// Ele pode ser usado para adicionar, buscar, atualizar e 
//      excluir registros de clientes no banco.
const Cliente = mongoose.model('Cliente', ClienteSchema);


// ----------------- Produto -----------------

// Criando um esquema chamado "ProdutoSchema" utilizando o Mongoose.
// Esse esquema define como os documentos da coleção "produtos" 
//      serão organizados no banco de dados.
const ProdutoSchema = new mongoose.Schema({

  // O campo "codigo" armazenará o código único do produto.
  // Ele é do tipo String porque pode conter letras e 
  //      números (exemplo: "A123").
  // A propriedade "unique: true" garante que cada 
  //      produto tenha um código único,
  //      impedindo a duplicação de códigos no banco de dados.
  codigo: { type: String, unique: true },

  // O campo "nome" armazenará o nome do produto.
  // Ele é do tipo String, pois será um texto contendo a 
  //      identificação do produto.
  nome: String,

  // O campo "descricao" armazenará uma descrição detalhada do produto.
  // Ele é do tipo String, permitindo textos maiores que 
  //      descrevam as características do produto.
  descricao: String,

  // O campo "preco" armazenará o preço do produto.
  // Ele é do tipo Number, pois precisa armazenar valores 
  //      numéricos com casas decimais (exemplo: 19.99).
  preco: Number,

  // O campo "quantidadeEstoque" armazenará a quantidade 
  //      disponível do produto no estoque.
  // Ele é do tipo Number porque representa um valor 
  //      numérico (exemplo: 100 unidades).
  quantidadeEstoque: Number,

  // O campo "fornecedor" armazenará o ID do fornecedor 
  //      relacionado ao produto.
  // Ele é do tipo ObjectId, pois referencia um documento 
  //      da coleção "fornecedores".
  // A propriedade "ref: 'Fornecedor'" indica que esse 
  //      campo se relaciona com a coleção "Fornecedor",
  //      permitindo que os dados do fornecedor sejam 
  //      acessados diretamente quando necessário.
  fornecedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Fornecedor' }

});

// Criando um modelo chamado "Produto" baseado no esquema "ProdutoSchema".
// Esse modelo permite interagir com a coleção "produtos" 
//      no banco de dados MongoDB.
// Ele pode ser usado para adicionar, buscar, atualizar e 
//      excluir registros de produtos no banco.
const Produto = mongoose.model('Produto', ProdutoSchema);


// ----------------- Venda -----------------

// Cada item terá agora fornecedorId e nomeFornecedor
// Criando um esquema chamado "ItemVendaSchema" utilizando o Mongoose.
// Esse esquema define a estrutura de um item dentro de 
//      uma venda no banco de dados.
const ItemVendaSchema = new mongoose.Schema({

  // O campo "produtoId" armazenará o identificador único do produto vendido.
  // Ele é do tipo ObjectId porque referencia um 
  //      documento da coleção "Produto".
  // O "ref: 'Produto'" indica que esse campo está 
  //      relacionado à coleção de produtos,
  //      permitindo buscar informações detalhadas do 
  //      produto diretamente.
  produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },

  // O campo "nomeProduto" armazenará o nome do produto vendido.
  // Ele é do tipo String para armazenar um texto com o nome do produto.
  nomeProduto: String,

  // O campo "quantidade" armazenará a quantidade do 
  //      produto vendido nesta venda.
  // Ele é do tipo Number para representar a quantidade 
  //      numérica do item (exemplo: 3 unidades).
  quantidade: Number,

  // O campo "precoUnitario" armazenará o preço de uma 
  //      unidade do produto no momento da venda.
  // Ele é do tipo Number para permitir valores numéricos 
  //      com casas decimais (exemplo: 9.99).
  precoUnitario: Number,

  // O campo "subtotal" armazenará o valor total 
  //      referente a esse item na venda.
  // Ele é calculado multiplicando a quantidade pelo 
  //      preço unitário (quantidade * precoUnitario).
  // Ele é do tipo Number para armazenar valores 
  //      numéricos (exemplo: 29.97).
  subtotal: Number,

  // O campo "fornecedorId" armazenará o identificador 
  //      único do fornecedor do produto vendido.
  // Ele é do tipo ObjectId porque referencia um 
  //      documento da coleção "Fornecedor".
  // O "ref: 'Fornecedor'" indica que esse campo está 
  //      relacionado à coleção de fornecedores,
  //      permitindo obter informações do fornecedor 
  //      do produto vendido.
  fornecedorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fornecedor' },

  // O campo "nomeFornecedor" armazenará o nome do 
  //      fornecedor do produto vendido.
  // Ele é do tipo String para armazenar um texto 
  //      com o nome do fornecedor.
  nomeFornecedor: String

});


// Criando um esquema chamado "VendaSchema" utilizando o Mongoose.
// Esse esquema define a estrutura de uma venda no banco de dados.
const VendaSchema = new mongoose.Schema({

  // O campo "data" armazena a data e hora em que a venda foi registrada.
  // Ele é do tipo Date, ou seja, armazena informações de data.
  // O "default: Date.now" define que, se a data não for informada,
  // a venda será automaticamente registrada com a data e hora atuais.
  data: { type: Date, default: Date.now },

  // O campo "itens" armazena a lista de produtos vendidos nesta venda.
  // Ele é um array de objetos que seguem a estrutura 
  //      do esquema "ItemVendaSchema".
  // Isso significa que cada venda pode conter 
  //      vários produtos vendidos.
  itens: [ItemVendaSchema],

  // O campo "total" armazena o valor total da venda.
  // Ele é do tipo Number para permitir valores numéricos 
  //      com casas decimais (exemplo: 99.99).
  total: Number,

  // O campo "clienteCpf" armazena o CPF do cliente que realizou a compra.
  // Ele é do tipo String e tem um valor padrão de uma string vazia ("").
  // Isso significa que, se o CPF não for informado, o campo ficará vazio.
  clienteCpf: { type: String, default: '' }

});

// Criamos um modelo chamado "Venda" baseado no esquema "VendaSchema".
// Esse modelo será usado para interagir com a 
//      coleção "vendas" no banco de dados MongoDB.
const Venda = mongoose.model('Venda', VendaSchema);


// ======================================
// Rotas de Login
// ======================================
// Criando uma rota para autenticação de usuários na 
//      URL '/login' utilizando o método HTTP POST
// Essa rota é chamada quando um usuário tenta fazer login no sistema
app.post('/login', async (req, res) => {

  try {
  
    // Extrai os dados do corpo da requisição (email e 
    //      senha) enviados pelo cliente (navegador, aplicativo, etc.)
    //      req.body contém os dados enviados no formato JSON
    const { email, senha } = req.body;

    // Busca no banco de dados um usuário que possua o 
    //      mesmo email e senha informados na requisição
    // O método `findOne` procura um único documento no 
    //      banco de dados MongoDB que corresponda aos critérios especificados
    const usuario = await Usuario.findOne({ email, senha });

    // Se nenhum usuário for encontrado no banco de 
    //      dados com essas credenciais...
    if (!usuario) {

      // Retorna um status HTTP 401 (Não Autorizado), 
      //      indicando que o login falhou
      // Também retorna um JSON com uma mensagem informando 
      //      que as credenciais são inválidas
      return res.status(401).json({ message: 'Credenciais inválidas' });

    }

    // Caso um usuário correspondente seja encontrado, 
    //      significa que o login foi bem-sucedido
    // Retorna um JSON contendo uma mensagem de sucesso e 
    //      os dados do usuário autenticado
    return res.json({ 

      // Mensagem de sucesso informando que o login foi feito corretamente
      message: 'Login realizado com sucesso', 

      // Retorna os dados do usuário autenticado, como 
      //      nome, email, idade, etc.
      usuario 

    });

  // Captura qualquer erro inesperado que possa ocorrer 
  //      durante o processo de login
  // Exemplo: erro de conexão com o banco de dados, erro 
  //      de sintaxe na consulta, falha no servidor, etc.
  } catch (error) {

    
    // Retorna um status HTTP 500 (Erro Interno do Servidor) 
    //      informando que ocorreu um problema inesperado
    return res.status(500).json({ 

      // Mensagem informando ao cliente que ocorreu um 
      //      erro ao tentar fazer login
      message: 'Erro ao efetuar login', 

      // Retorna detalhes técnicos do erro para facilitar a 
      //      depuração (caso necessário)
      error 

    });
  }
});


// ======================================
// CRUD - Usuários
// ======================================
// Define uma rota POST na URL '/usuarios', que será usada 
//      para cadastrar um novo usuário no banco de dados
app.post('/usuarios', async (req, res) => {

  try {

    // Extrai os dados enviados pelo cliente no corpo da requisição (JSON)
    // O cliente deve enviar os campos: nome, email,      
    //      senha e idade para criar um usuário
    const { nome, email, senha, idade } = req.body;

    // Cria um novo objeto do modelo `Usuario` usando os dados recebidos
    // Isso significa que estamos preparando um novo 
    //      documento para ser salvo no MongoDB
    const novoUsuario = new Usuario({ 

      nome,  // Nome completo do usuário
      email, // Endereço de e-mail do usuário (deve ser único no sistema)
      senha, // Senha do usuário (deve ser protegida com hash na prática, mas aqui não está sendo criptografada)
      idade  // Idade do usuário (deve ser um número)

    });

    // Insere o novo usuário no banco de dados MongoDB chamando o método `.save()`
    // Esse método salva o documento na coleção `usuarios`
    await novoUsuario.save();

    // Envia uma resposta ao cliente informando que o 
    //      usuário foi cadastrado com sucesso
    // A resposta é enviada no formato JSON com uma mensagem de sucesso
    res.json({ 

      // Mensagem de retorno indicando que a operação foi bem-sucedida
      message: 'Usuário cadastrado com sucesso!' 

    });

  // Captura qualquer erro que ocorra no processo de cadastro do usuário
  } catch (error) {
    
    // Envia uma resposta de erro ao cliente com o 
    //      status HTTP 500 (Erro interno do servidor)
    // Isso indica que houve um problema inesperado no backend
    res.status(500).json({ 

      // Mensagem informando que houve uma falha no cadastro
      message: 'Erro ao cadastrar usuário', 

      // Inclui detalhes do erro para facilitar a depuração (debugging)
      error 

    });
  }
});


// Define uma rota GET na URL '/usuarios', que será 
//      usada para buscar todos os usuários cadastrados no banco de dados
app.get('/usuarios', async (req, res) => {

  try {

    // Usa o método `find()` do modelo `Usuario` para 
    //      buscar todos os documentos na coleção de usuários
    // Isso retorna uma lista com todos os usuários 
    //      cadastrados no banco de dados
    const usuarios = await Usuario.find();

    // Envia a lista de usuários como resposta no formato JSON
    res.json(usuarios);

  // Captura qualquer erro que ocorra no processo de busca dos usuários
  } catch (error) {
    
    // Envia uma resposta de erro ao cliente com o 
    //      status HTTP 500 (Erro interno do servidor)
    // Isso indica que houve um problema inesperado ao buscar os dados
    res.status(500).json({ 

      // Mensagem informando que ocorreu um erro na 
      //      busca dos usuários
      message: 'Erro ao buscar usuários', 

      // Inclui detalhes do erro para facilitar a depuração (debugging)
      error 

    });
  }
});


// Define uma rota GET na URL '/usuarios/:id', onde ':id' 
//      representa um parâmetro dinâmico
// Essa rota é usada para buscar um único usuário pelo seu ID
app.get('/usuarios/:id', async (req, res) => {

  try {

    // Usa o método `findById()` do modelo `Usuario` para 
    //      buscar um usuário no banco de dados pelo ID fornecido na URL
    // `req.params.id` acessa o valor do parâmetro `id` enviado na requisição
    const usuario = await Usuario.findById(req.params.id);

    // Retorna os dados do usuário encontrado no formato JSON
    res.json(usuario);

  // Captura qualquer erro que ocorra durante a busca do usuário
  } catch (error) {
    

    // Envia uma resposta com status HTTP 500 (Erro interno do servidor)
    // Isso indica que houve um problema inesperado ao processar a requisição
    res.status(500).json({ 

      // Mensagem informando que ocorreu um erro na busca do usuário
      message: 'Erro ao buscar usuário', 

      // Inclui detalhes do erro para facilitar a depuração (debugging)
      error 

    });
  }
});


// Define uma rota PUT na URL '/usuarios/:id' para 
//      atualizar um usuário específico
// ':id' é um parâmetro que será substituído pelo ID real do usuário na URL
app.put('/usuarios/:id', async (req, res) => {
  
  try {

    // Extrai as informações de 'nome', 'email', 'senha' e 'idade' 
    //      do corpo da requisição
    const { nome, email, senha, idade } = req.body;

    // Atualiza o usuário no banco de dados usando seu ID
    // `req.params.id` acessa o valor do parâmetro `id` da URL
    // O segundo argumento é o objeto com as novas propriedades do usuário
    await Usuario.findByIdAndUpdate(req.params.id, { nome, email, senha, idade });

    // Retorna uma resposta JSON indicando que o 
    //      usuário foi atualizado com sucesso
    res.json({ message: 'Usuário atualizado com sucesso!' });

  // Captura qualquer erro que ocorra durante o 
  //      processo de atualização
  } catch (error) {
    
    // Envia uma resposta com status HTTP 500 (Erro interno do servidor)
    // A mensagem e o erro específico são retornados para facilitar a depuração
    res.status(500).json({ message: 'Erro ao atualizar usuário', error });

  }
});

// Define uma rota DELETE na URL '/usuarios/:id' para 
//      excluir um usuário específico
// ':id' é um parâmetro na URL que representa o ID do 
//      usuário a ser excluído
app.delete('/usuarios/:id', async (req, res) => {

  try {

    // Remove o usuário do banco de dados utilizando o ID fornecido
    // `req.params.id` acessa o valor do parâmetro `id` na URL
    await Usuario.findByIdAndDelete(req.params.id);

    // Retorna uma resposta JSON indicando que o usuário 
    //      foi removido com sucesso
    res.json({ message: 'Usuário removido com sucesso!' });

  // Captura qualquer erro que ocorra durante o processo de exclusão
  } catch (error) {

    // Envia uma resposta com status HTTP 500 (Erro interno do servidor)
    // A mensagem e o erro específico são retornados 
    //      para facilitar a depuração
    res.status(500).json({ message: 'Erro ao excluir usuário', error });

  }
});


// Define uma rota GET na URL '/usuarios/filtro/:termo' 
//      para buscar usuários por um termo de pesquisa.
// ':termo' é um parâmetro na URL que representa o texto de 
//      busca utilizado para filtrar usuários por nome ou email.
app.get('/usuarios/filtro/:termo', async (req, res) => {

  
  try {
  
    // Extrai o termo de busca dos parâmetros da URL. 'req.params' 
    //      contém os parâmetros da rota.
    const { termo } = req.params;
    
    // Busca usuários no banco de dados que correspondam ao 
    //      termo de busca no nome ou email.
    // `$regex` permite a busca por padrão, utilizando expressões 
    //      regulares para encontrar correspondências.
    // `$options: 'i'` torna a busca insensível a maiúsculas e 
    //      minúsculas, buscando por todos os casos que combinam.
    const usuarios = await Usuario.find({
      $or: [
        { nome: { $regex: termo, $options: 'i' } }, // Busca por 'termo' no campo 'nome'.
        { email: { $regex: termo, $options: 'i' } } // Busca por 'termo' no campo 'email'.
      ]
    });

    // Retorna os usuários encontrados em formato JSON, que é uma 
    //      maneira de enviar dados estruturados através da web.
    res.json(usuarios);

  // Captura e trata erros durante a busca. Essa estrutura 
  //      try/catch ajuda a lidar com exceções que podem ocorrer.
  } catch (error) {
    
    // Retorna uma resposta com status HTTP 500 (Erro interno do 
    //      servidor), indicando que algo deu errado no servidor.
    // Inclui uma mensagem de erro detalhada para ajudar na 
    //      depuração e entender o que causou o erro.
    res.status(500).json({ message: 'Erro ao filtrar usuários', error });

  }
});


// ======================================
// CRUD - Fornecedores
// ======================================

// Define uma rota POST para '/fornecedores'. Esta rota é 
//      usada para criar um novo fornecedor.
// As requisições para esta rota devem incluir um corpo 
//      com os dados do fornecedor.
app.post('/fornecedores', async (req, res) => {
  
  try {

    // Extrai as variáveis 'nome', 'telefone' e 'email' do corpo da requisição. 
    // O objeto 'req.body' contém os dados enviados na requisição.
    const { nome, telefone, email } = req.body;
    
    // Cria uma nova instância do modelo 'Fornecedor' usando os 
    //      dados extraídos do corpo da requisição.
    const novoFornecedor = new Fornecedor({ nome, telefone, email });

    // Salva o novo fornecedor no banco de dados. 
    // A função 'save' é uma operação assíncrona que pode demorar,
    // por isso é usada com 'await' para esperar que 
    //      ela termine antes de continuar.
    await novoFornecedor.save();

    // Se o fornecedor for salvo com sucesso, retorna uma 
    //      resposta em JSON com uma mensagem de sucesso.
    res.json({ message: 'Fornecedor cadastrado com sucesso!' });

  // Se ocorrer algum erro durante o processo de salvar o 
  //      novo fornecedor, entra no bloco catch.
  } catch (error) {
    
    // Retorna uma resposta com status HTTP 500, que 
    //      indica um erro interno do servidor,
    // junto com um objeto JSON contendo a mensagem de erro.
    res.status(500).json({ message: 'Erro ao cadastrar fornecedor', error });
  }

});

// Define uma rota GET para '/fornecedores' usada para 
//      obter uma lista de todos os fornecedores.
app.get('/fornecedores', async (req, res) => {
  
  try {

    // Busca todos os fornecedores no banco de dados 
    //      usando o método 'find()' do modelo 'Fornecedor'.
    // 'find()' sem argumentos retorna todos os documentos para esse modelo.
    const fornecedores = await Fornecedor.find();

    // Envia a lista de fornecedores como uma resposta em formato JSON.
    res.json(fornecedores);

  // Se ocorrer algum erro durante a busca, entra no bloco 'catch'.
  } catch (error) {
    
    // Envia uma resposta com status HTTP 500, indicando 
    //      um erro interno do servidor,
    // e inclui a mensagem de erro em formato JSON.
    res.status(500).json({ message: 'Erro ao buscar fornecedores', error });

  }
});


// Define uma rota GET para '/fornecedores/:id', onde ':id' é 
//      um parâmetro variável representando o ID do fornecedor.
app.get('/fornecedores/:id', async (req, res) => {
  
  try {

    // Utiliza o método 'findById' do modelo 'Fornecedor' 
    //      para buscar um documento pelo ID fornecido.
    // 'req.params.id' extrai o valor do ID da URL da requisição.
    const fornecedor = await Fornecedor.findById(req.params.id);

    // Se um fornecedor é encontrado, retorna-o em formato JSON.
    res.json(fornecedor);

  // Se ocorrer um erro durante a busca (por exemplo, ID mal 
  //      formatado ou problema de conexão com o banco de dados),
  //      o controle passa para o bloco 'catch'.
  } catch (error) {
    
    // Envia uma resposta com status HTTP 500, indicando 
    //      um erro interno do servidor, e a mensagem de 
    //      erro é enviada de volta ao cliente em formato JSON.
    res.status(500).json({ message: 'Erro ao buscar fornecedor', error });

  }
});


// Define uma rota PUT para '/fornecedores/:id', onde ':id' é 
//      um parâmetro que representa o ID do fornecedor.
app.put('/fornecedores/:id', async (req, res) => {
  
  try {

    // Extraí os dados 'nome', 'telefone', e 'email' do 
    //      corpo da requisição. Esses são os dados que 
    //      serão atualizados.
    const { nome, telefone, email } = req.body;

    // Utiliza o método 'findByIdAndUpdate' do modelo 'Fornecedor' 
    //      para atualizar o documento com o ID especificado.
    // 'req.params.id' captura o ID do URL e os dados de 'nome', 
    //      'telefone', e 'email' são usados para atualizar o fornecedor correspondente.
    await Fornecedor.findByIdAndUpdate(req.params.id, { nome, telefone, email });

    // Envia uma resposta JSON indicando que a atualização foi bem-sucedida.
    res.json({ message: 'Fornecedor atualizado com sucesso!' });

  // Se ocorrer um erro durante a atualização (por exemplo, 
  //      falha de validação ou problema de conexão com o banco de dados),
  //      o controle passa para o bloco 'catch'.
  } catch (error) {
    
    // Envia uma resposta com status HTTP 500, que 
    //      indica um erro interno do servidor, e a mensagem de 
    //      erro é enviada de volta ao cliente em formato JSON.
    res.status(500).json({ message: 'Erro ao atualizar fornecedor', error });

  }
});


// Define uma rota DELETE que recebe um ID como parâmetro na 
//      URL e exclui o fornecedor correspondente no banco de dados.
app.delete('/fornecedores/:id', async (req, res) => {

  try {

    // A função 'findByIdAndDelete' busca um fornecedor 
    //      pelo ID fornecido em 'req.params.id' e o remove 
    //      do banco de dados.
    // O ID é extraído da URL, permitindo que um cliente 
    //      especifique qual fornecedor deve ser excluído.
    await Fornecedor.findByIdAndDelete(req.params.id);

    // Após excluir o fornecedor com sucesso, retorna uma 
    //      resposta JSON com uma mensagem de sucesso.
    res.json({ message: 'Fornecedor removido com sucesso!' });

  // Se houver um erro durante a execução da exclusão, o 
  //       código entra no bloco 'catch'.
  // Pode ocorrer erro se o ID fornecido for inválido ou se 
  //       houver problemas na conexão com o banco de dados.
  } catch (error) {
    
    // Retorna uma resposta com status HTTP 500 (erro interno do 
    //      servidor) e envia uma mensagem de erro em JSON.
    res.status(500).json({ message: 'Erro ao excluir fornecedor', error });

  }
});


// ======================================
// CRUD - Clientes
// ======================================
// Define uma rota POST para criar um novo cliente no banco de dados
app.post('/clientes', async (req, res) => {
  
  try {

    // Extrai os dados enviados pelo cliente na 
    //      requisição (CPF, nome, telefone e endereço)
    // Estes dados devem ser enviados no corpo da 
    //      requisição (req.body) no formato JSON
    const { cpf, nome, telefone, endereco } = req.body;

    // Cria um novo objeto da classe Cliente com os dados recebidos
    // O objeto é criado a partir do modelo Cliente definido no Mongoose
    const novoCliente = new Cliente({ cpf, nome, telefone, endereco });

    // Salva o novo cliente no banco de dados de forma assíncrona
    // 'await' faz com que o código espere até que o 
    //      cliente seja salvo antes de continuar
    await novoCliente.save();

    // Se o cadastro for bem-sucedido, retorna uma 
    //      resposta JSON com a mensagem de sucesso
    res.json({ message: 'Cliente cadastrado com sucesso!' });

  // Se houver um erro durante a criação do 
  //       cliente (exemplo: CPF duplicado), ele será capturado aqui
  } catch (error) {
    

    // Retorna um erro HTTP 500 (erro interno do servidor)
    // A mensagem de erro também é retornada no JSON 
    //      para que o cliente (frontend) saiba o que aconteceu
    res.status(500).json({ message: 'Erro ao cadastrar cliente', error });

  }
});

// Define uma rota GET para listar todos os 
//      clientes cadastrados no banco de dados
app.get('/clientes', async (req, res) => {

  try {

    // Usa o modelo Cliente para buscar todos os 
    //      registros no banco de dados
    // 'Cliente.find()' retorna uma lista com todos os 
    //      clientes cadastrados
    // O 'await' faz com que o código espere até que a 
    //      consulta ao banco seja concluída
    const clientes = await Cliente.find();

    // Retorna a lista de clientes encontrada no formato JSON
    // O frontend receberá um array contendo os dados 
    //      de todos os clientes cadastrados
    res.json(clientes);

  // Se ocorrer um erro ao buscar os clientes no banco, 
  //      ele será capturado aqui
  } catch (error) {
    

    // Retorna um erro HTTP 500 (erro interno do servidor)
    // A mensagem de erro também é retornada no JSON 
    //      para que o frontend saiba o que aconteceu
    res.status(500).json({ message: 'Erro ao buscar clientes', error });

  }
});

// Rota GET para buscar um único cliente pelo ID
app.get('/clientes/:id', async (req, res) => {

  try {

    // Busca no banco de dados um cliente cujo ID 
    //      corresponde ao valor recebido na URL
    // 'req.params.id' captura o valor do ID passado na URL da requisição
    // 'Cliente.findById()' procura esse cliente no banco de dados
    const cliente = await Cliente.findById(req.params.id);

    // Retorna os dados do cliente encontrado no 
    //      formato JSON para o frontend
    res.json(cliente);

  // Caso ocorra um erro (exemplo: ID inválido ou 
  //      cliente não encontrado), ele será tratado aqui
  } catch (error) {
    

    // Retorna um erro HTTP 500 (erro interno do 
    //      servidor) e exibe uma mensagem de erro
    res.status(500).json({ message: 'Erro ao buscar cliente', error });

  }
});


// Define uma rota HTTP do tipo PUT para atualizar um 
//      cliente específico pelo ID.
// O método PUT é utilizado quando queremos modificar um 
//      recurso existente no banco de dados.
app.put('/clientes/:id', async (req, res) => {
  
  try {

    // Extrai os dados enviados pelo usuário no corpo da requisição.
    // Estes são os novos dados que substituirão os 
    //      antigos no banco de dados.
    const { cpf, nome, telefone, endereco } = req.body;

    // Procura no banco de dados um cliente com o ID 
    //      fornecido na URL (req.params.id)
    // e atualiza os seus dados com as novas informações 
    //      fornecidas no corpo da requisição.
    // O método 'findByIdAndUpdate' encontra o cliente e 
    //      atualiza os valores indicados.
    await Cliente.findByIdAndUpdate(req.params.id, { cpf, nome, telefone, endereco });

    // Se a atualização for bem-sucedida, retorna uma 
    //      mensagem de confirmação para o usuário.
    res.json({ message: 'Cliente atualizado com sucesso!' });

  } catch (error) {

    // Se ocorrer algum erro (por exemplo, o cliente 
    //      não existir ou erro no servidor),
    //      retorna uma mensagem de erro com status 
    //      HTTP 500 (erro interno do servidor).
    res.status(500).json({ message: 'Erro ao atualizar cliente', error });

  }
});


// Define uma rota HTTP do tipo DELETE para remover um 
//      cliente específico pelo ID.
// O método DELETE é utilizado quando queremos excluir 
//      um recurso do banco de dados.
app.delete('/clientes/:id', async (req, res) => {
  
  try {

    // Procura no banco de dados um cliente com o ID 
    //      fornecido na URL (req.params.id)
    //      e o remove do banco de dados.
    // O método 'findByIdAndDelete' localiza o cliente 
    //      pelo ID e o exclui permanentemente.
    await Cliente.findByIdAndDelete(req.params.id);

    // Se a remoção for bem-sucedida, retorna uma 
    //      mensagem de confirmação para o usuário.
    res.json({ message: 'Cliente removido com sucesso!' });

  } catch (error) {

    // Se ocorrer algum erro (por exemplo, o cliente 
    //      não existir ou erro no servidor),
    //      retorna uma mensagem de erro com status 
    //      HTTP 500 (erro interno do servidor).
    res.status(500).json({ message: 'Erro ao excluir cliente', error });

  }
});


// ======================================
// CRUD - Produtos
// ======================================

// Define uma rota HTTP do tipo POST para criar um 
//      novo produto no banco de dados.
// O método POST é utilizado para enviar dados ao 
//      servidor e criar um novo recurso.
app.post('/produtos', async (req, res) => {

  try {

    // Extrai os dados enviados no corpo da requisição (req.body).
    // Esses dados são fornecidos pelo cliente (navegador ou 
    //      sistema que faz a requisição).
    const { codigo, nome, descricao, preco, quantidadeEstoque, fornecedor } = req.body;

    // Cria um novo objeto Produto utilizando o modelo do Mongoose.
    // Esse objeto representa um novo produto a 
    //      ser salvo no banco de dados.
    const novoProduto = new Produto({
      codigo, // Código único do produto
      nome, // Nome do produto
      descricao, // Descrição detalhada do produto
      preco, // Preço do produto (tipo Number)
      quantidadeEstoque, // Quantidade disponível no estoque
      fornecedor // ID do fornecedor associado ao produto
    });

    // Salva o novo produto no banco de dados de forma assíncrona.
    // O método 'save()' persiste o objeto no MongoDB.
    await novoProduto.save();

    // Retorna uma resposta JSON informando que o 
    //      produto foi cadastrado com sucesso.
    res.json({ message: 'Produto cadastrado com sucesso!' });

  } catch (error) {

    // Captura qualquer erro que ocorra durante o cadastro do produto.
    // Retorna uma resposta com código HTTP 500 (erro interno do servidor)
    // e uma mensagem indicando a falha no cadastro do produto.
    res.status(500).json({ message: 'Erro ao cadastrar produto', error });

  }
});

// Define uma rota HTTP do tipo GET para buscar 
//      todos os produtos cadastrados no banco de dados.
// O método GET é utilizado para recuperar informações 
//      sem modificar os dados do servidor.
app.get('/produtos', async (req, res) => {
  
  try {

    // Busca todos os produtos cadastrados no banco de 
    //      dados utilizando o método find().
    // O método populate('fornecedor') preenche o 
    //      campo 'fornecedor' com os dados do fornecedor correspondente,
    // permitindo que os detalhes do fornecedor sejam 
    //      retornados junto com os produtos.
    const produtos = await Produto.find().populate('fornecedor');

    // Retorna a lista de produtos encontrados em 
    //      formato JSON para o cliente que fez a requisição.
    res.json(produtos);

  } catch (error) {

    // Captura qualquer erro que possa ocorrer durante a 
    //      busca dos produtos.
    // Retorna um status HTTP 500 (erro interno do 
    //      servidor) e uma mensagem de erro em formato JSON.
    res.status(500).json({ message: 'Erro ao buscar produtos', error });

  }
});


// Define uma rota HTTP do tipo GET para buscar um 
//      único produto pelo seu ID.
// O método GET é utilizado para recuperar informações 
//      sem modificar os dados do servidor.
app.get('/produtos/:id', async (req, res) => {
  
  try {

    // Busca no banco de dados um produto específico 
    //      utilizando o ID fornecido na URL.
    // O método findById(req.params.id) busca o produto 
    //      pelo ID informado na requisição.
    // O método populate('fornecedor') preenche automaticamente 
    //      os dados do fornecedor vinculado ao produto.
    const produto = await Produto.findById(req.params.id).populate('fornecedor');

    // Retorna o produto encontrado em formato JSON para o 
    //      cliente que fez a requisição.
    res.json(produto);

  } catch (error) {

    // Captura qualquer erro que possa ocorrer durante a 
    //      busca do produto.
    // Retorna um status HTTP 500 (erro interno do servidor) e 
    //      uma mensagem de erro em formato JSON.
    res.status(500).json({ message: 'Erro ao buscar produto', error });

  }
});


// Define uma rota HTTP do tipo PUT para atualizar um 
//      produto existente pelo seu ID.
// O método PUT é utilizado para modificar dados já 
//      existentes no servidor.
app.put('/produtos/:id', async (req, res) => {

  try {
  
    // Extrai os dados do corpo da requisição (JSON 
    //      enviado pelo cliente).
    const { codigo, nome, descricao, preco, quantidadeEstoque, fornecedor } = req.body;

    // Atualiza o produto no banco de dados com base      
    //      no ID fornecido na URL.
    // O método findByIdAndUpdate procura um produto 
    //      pelo ID e atualiza seus dados.
    await Produto.findByIdAndUpdate(

      // O ID do produto que será atualizado.
      req.params.id, 

      // Novos valores que substituirão os existentes.
      { codigo, nome, descricao, preco, quantidadeEstoque, fornecedor } 

    );

    // Retorna uma resposta JSON informando que a 
    //      atualização foi bem-sucedida.
    res.json({ message: 'Produto atualizado com sucesso!' });

  } catch (error) {

    // Captura qualquer erro que possa ocorrer durante a 
    //      atualização do produto.
    // Retorna um status HTTP 500 (erro interno do 
    //      servidor) e uma mensagem de erro em JSON.
    res.status(500).json({ message: 'Erro ao atualizar produto', error });

  }
});


// Define uma rota HTTP do tipo DELETE para remover um 
//      produto do banco de dados pelo seu ID.
app.delete('/produtos/:id', async (req, res) => {

  try {

    // Busca e remove o produto do banco de dados com 
    //      base no ID recebido na URL.
    // O método findByIdAndDelete encontra o 
    //      produto pelo ID e o exclui.
    await Produto.findByIdAndDelete(req.params.id);

    // Retorna uma resposta JSON informando que o 
    //      produto foi removido com sucesso.
    res.json({ message: 'Produto removido com sucesso!' });

  } catch (error) {

    // Captura qualquer erro que possa ocorrer 
    //      durante a exclusão do produto.
    // Retorna um status HTTP 500 (erro interno do 
    //      servidor) e uma mensagem de erro em JSON.
    res.status(500).json({ message: 'Erro ao excluir produto', error });

  }
});


// Define uma rota HTTP do tipo GET para buscar um 
//      produto pelo seu código único.
app.get('/produtos/codigo/:codigo', async (req, res) => {

  try {
  
    // Extrai o código do produto da URL
    const { codigo } = req.params;

    // Procura um produto no banco de dados que 
    //      tenha o código informado.
    // O método findOne retorna o primeiro documento que 
    //      corresponde à condição.
    // O populate('fornecedor') traz também os dados do 
    //      fornecedor associado ao produto.
    const produto = await Produto.findOne({ codigo }).populate('fornecedor');

    // Se o produto não for encontrado, retorna um 
    //      erro 404 informando que o produto não existe.
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado pelo código' });
    }

    // Se o produto for encontrado, retorna os dados do 
    //      produto como resposta em formato JSON.
    res.json(produto);

  } catch (error) {

    // Captura qualquer erro que possa ocorrer 
    //      durante a busca do produto.
    // Retorna um status HTTP 500 (erro interno do 
    //      servidor) e uma mensagem de erro em JSON.
    res.status(500).json({ message: 'Erro ao buscar produto pelo código', error });

  }
});


// ======================================
// Vendas - agora salvamos fornecedorId/nomeFornecedor
// ======================================

// Define uma rota HTTP do tipo POST para 
//      registrar uma nova venda no sistema.
app.post('/vendas', async (req, res) => {

  try {

    // Extrai os itens da venda e o CPF do 
    //      cliente do corpo da requisição.
    const { itens, clienteCpf } = req.body;

    // Verifica se a venda contém pelo menos um item.
    // Caso não tenha itens, retorna um erro HTTP 400
    //      (requisição inválida) com uma mensagem explicativa.
    if (!itens || itens.length === 0) {
      return res.status(400).json({ message: 'Nenhum item na venda' });
    }

    // Inicializa a variável 'total' que armazenará o 
    //      valor total da venda.
    let total = 0;


    // Processar cada item, buscar infos do produto e fornecedor
    // Cria uma constante `itensProcessados` que armazenará o 
    //      resultado de todas as operações assíncronas
    // `Promise.all` é utilizado para aguardar a conclusão de 
    //      todas as promessas geradas dentro do `map`
    const itensProcessados = await Promise.all(

      // `map` percorre cada item presente na lista 
      //      de `itens` enviada na requisição
      // Para cada item, será executada uma função assíncrona (`async`)
      itens.map(async (item) => {

        // `Produto.findById(item.produtoId).populate('fornecedor')` 
        //      busca no banco de dados o produto correspondente ao `produtoId`
        // O método `populate('fornecedor')` faz com que os dados 
        //      completos do fornecedor sejam carregados junto ao 
        //      produto, ao invés de apenas o ID dele
        const produto = await Produto.findById(item.produtoId).populate('fornecedor');

        // Verifica se o produto foi encontrado no banco de dados
        // Se `produto` for `null` ou `undefined`, significa que o 
        //      ID informado não corresponde a nenhum produto cadastrado
        if (!produto) {

          // Lança um erro informando que o produto não foi encontrado
          throw new Error(`Produto ${item.produtoId} não encontrado.`);

        }

        // Verifica se há quantidade suficiente no estoque 
        //       para atender ao pedido
        // `produto.quantidadeEstoque` representa o total 
        //      disponível no banco de dados
        // `item.quantidade` é a quantidade solicitada na venda
        if (produto.quantidadeEstoque < item.quantidade) {

          // Lança um erro indicando que não há estoque suficiente
          throw new Error(`Estoque insuficiente para o produto ${produto.nome}`); 

        }


        // Dar baixa no estoque
        // Atualiza o estoque do produto, subtraindo a quantidade vendida
        // `produto.quantidadeEstoque` representa a quantidade atual em estoque
        // `item.quantidade` é a quantidade comprada pelo cliente
        produto.quantidadeEstoque -= item.quantidade;

        // Salva a atualização do estoque no banco de dados
        // Isso garante que a nova quantidade disponível 
        //      do produto será armazenada
        await produto.save();

        // Calcula o subtotal da venda para esse item específico
        // Multiplica o preço unitário do produto pela quantidade comprada
        const subtotal = produto.preco * item.quantidade;

        // Soma o subtotal ao valor total da venda
        // `total` representa o valor acumulado de todos os 
        //      produtos vendidos até agora
        total += subtotal;


        // Retorna um objeto representando um item processado da venda
        return {

          // ID do produto vendido, obtido do banco de dados
          produtoId: produto._id,

          // Nome do produto vendido, usado para exibição na 
          //    interface do usuário
          nomeProduto: produto.nome,

          // Quantidade de unidades do produto vendidas 
          //      nessa transação
          quantidade: item.quantidade,

          // Preço unitário do produto no momento da venda
          precoUnitario: produto.preco,

          // Subtotal da venda desse item (preço unitário 
          //      multiplicado pela quantidade vendida)
          subtotal,

          // ID do fornecedor do produto, caso esteja registrado no banco de dados
          // Se o fornecedor não estiver associado, o valor será `null`
          fornecedorId: produto.fornecedor ? produto.fornecedor._id : null,

          // Nome do fornecedor do produto, para exibição nos 
          //      relatórios ou interface do usuário
          // Se o fornecedor não estiver cadastrado, o 
          //      campo será uma string vazia
          nomeFornecedor: produto.fornecedor ? produto.fornecedor.nome : ''

        };

      })
    );

    // Cria um novo objeto de venda com os dados processados
    const novaVenda = new Venda({

      // Lista de itens vendidos, contendo informações 
      //      detalhadas de cada item
      itens: itensProcessados,

      // Total da venda, que é a soma dos subtotais 
      //      de todos os itens
      total,

      // CPF do cliente que realizou a compra, caso tenha sido informado
      // Se não foi informado, atribui uma string vazia 
      //      para evitar erro no banco de dados
      clienteCpf: clienteCpf || '',

      // Data e hora exata da venda, definida automaticamente 
      //      como o momento da transação
      data: new Date()

    });


    // Salva a nova venda no banco de dados
    // "await" é utilizado para aguardar a operação 
    //      assíncrona de salvamento ser concluída
    await novaVenda.save();

    // Envia uma resposta para o cliente informando que a 
    //      venda foi realizada com sucesso
    // "res.json" retorna um objeto JSON contendo a mensagem 
    //      de sucesso e o ID da venda recém-criada
    // "vendaId" pode ser útil para exibição, 
    //      rastreamento ou geração de recibos
    res.json({ message: 'Venda realizada com sucesso!', vendaId: novaVenda._id });

  // Captura qualquer erro que tenha ocorrido durante o 
  //      processamento da venda
  } catch (error) {

    // Exibe o erro no console do servidor para facilitar a 
    //      depuração (debugging)
    console.error(error);

    // Retorna uma resposta HTTP com status 500 (erro interno do servidor)
    // Inclui uma mensagem de erro genérica para o cliente e o 
    //      detalhe do erro específico
    res.status(500).json({ message: 'Erro ao processar a venda', error: error.message });

  }

});

// Define uma rota GET para obter todas as vendas 
//      registradas no banco de dados
app.get('/vendas', async (req, res) => {

  try {

    // Utiliza o modelo Venda para buscar todas as vendas 
    //      armazenadas no banco de dados
    // Esse comando retorna um array contendo todas as 
    //      vendas já realizadas
    const vendas = await Venda.find();

    // Retorna a lista de vendas em formato JSON para o 
    //      cliente que fez a requisição
    res.json(vendas);

  // Caso ocorra algum erro durante a busca das vendas no 
  //      banco de dados, entra no bloco catch
  } catch (error) {

    // Envia uma resposta HTTP com status 500 (Erro interno do servidor)
    // Inclui uma mensagem indicando o erro ocorrido e o detalhe do erro
    res.status(500).json({ message: 'Erro ao buscar vendas', error });

  }
});




// ======================================
// Inicializar Servidor
// ======================================

// Inicia o servidor Express e faz com que ele escute as 
//      requisições na porta 3000
app.listen(3000, () => {

    // Exibe no console uma mensagem informando que o 
    //      servidor foi iniciado com sucesso
    console.log('Servidor rodando na porta 3000');

});