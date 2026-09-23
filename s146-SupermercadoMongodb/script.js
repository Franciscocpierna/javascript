// Adiciona um ouvinte de evento ao documento para 
//      executar a função quando todo o conteúdo 
//      DOM (HTML, CSS e JavaScript) estiver completamente carregado.
document.addEventListener('DOMContentLoaded', () => {
  
  // Busca no documento um elemento com o ID 'loginForm'. 
  // Este é o formulário de login na página.
  const loginForm = document.getElementById('loginForm');
  
  // Verifica se o elemento 'loginForm' realmente existe 
  //      para evitar erros caso o elemento não esteja 
  //      presente na página.
  if (loginForm) {

    // Adiciona um ouvinte de evento ao formulário de login que 
    //        reage ao evento 'submit' (quando o formulário é submetido).
    loginForm.addEventListener('submit', async (e) => {

      // Previne o comportamento padrão do evento de submissão do 
      //      formulário, que é enviar os dados do formulário e
      //      recarregar a página.
      e.preventDefault();
      
      // Busca no documento o elemento com o ID 'emailLogin' e 
      //      obtém o valor atual do campo, que é o e-mail 
      //      inserido pelo usuário.
      const email = document.getElementById('emailLogin').value;
      
      // Busca no documento o elemento com o ID 'senhaLogin' e 
      //      obtém o valor atual do campo, que é a senha 
      //      inserida pelo usuário.
      const senha = document.getElementById('senhaLogin').value;


      // Inicia um bloco 'try', que é usado para testar um 
      //       bloco de código em busca de erros.
      try {

        // Executa uma chamada HTTP usando a função 'fetch'. 
        // Essa chamada é assíncrona e espera por uma resposta.
        const response = await fetch('http://localhost:3000/login', {

          // Especifica o método HTTP 'POST' como tipo de 
          //      requisição que será enviada ao servidor.
          method: 'POST',

          // Define os cabeçalhos da requisição, informando ao 
          //      servidor que o corpo da requisição está em formato JSON.
          headers: { 'Content-Type': 'application/json' },

          // Converte o objeto contendo o email e a senha em 
          //    uma string JSON para enviar no corpo da requisição.
          body: JSON.stringify({ email, senha })

        });

        // Verifica se a propriedade 'ok' da resposta não é verdadeira. 
        // A propriedade 'ok' retorna 'true' se o status da resposta 
        //      está entre 200 e 299, indicando que a requisição foi bem-sucedida.
        if (!response.ok) {

          // Caso a resposta não seja bem-sucedida (ou seja, algum 
          //      erro HTTP como 400 ou 500), executa o código 
          //      dentro deste bloco.

          // Aguarda a conversão da resposta para formato JSON. 
          // Isso é necessário porque a resposta do servidor vem em 
          //      um formato de stream, que precisa ser convertido para 
          //      um objeto JavaScript para ser acessível.
          const data = await response.json();
          
          // Exibe um alerta com a mensagem de erro retornada 
          //      pelo servidor. 
          // Se por algum motivo a mensagem não existir, 
          //      exibe 'Erro no login' como mensagem padrão.
          alert(data.message || 'Erro no login');
          
          // Encerra a execução da função, evitando que as 
          //      linhas de código seguintes sejam executadas após um erro.
          return;

        }

        // Caso a resposta tenha sido bem-sucedida, a função 
        //      continua para estas linhas:
        // Novamente converte a resposta para formato JSON para 
        //      acessar os dados retornados pelo servidor. 
        // Neste ponto, espera-se uma resposta bem-sucedida 
        //      com uma mensagem do servidor.
        const data = await response.json();

        // Exibe um alerta com a mensagem de sucesso retornada 
        //      pelo servidor. Por exemplo, pode ser algo 
        //      como "Login realizado com sucesso".
        alert(data.message);

        // Redireciona o navegador para 'telaPrincipal.html'. 
        // Isso é feito modificando a propriedade 'href' do 
        //      objeto global 'window.location', que controla o 
        //      URL atual no navegador.
        window.location.href = 'telaPrincipal.html';

      // O bloco 'catch' é usado para capturar erros que 
      //      ocorrem dentro do bloco 'try'. 
      // Se algum erro ocorrer durante a execução do código no 
      //      bloco 'try', a execução pula para este bloco 'catch'.
      // A variável 'error' contém informações sobre o 
      //      erro que ocorreu. 
      // Esta pode incluir uma mensagem de erro, o 
      //      nome do erro, entre outras informações úteis.
      } catch (error) {
        
        // Aqui, uma caixa de alerta é mostrada ao usuário 
        //      com uma mensagem personalizada que inclui a 
        //      descrição do erro.
        // 'Erro ao fazer login: ' é uma string fixa que 
        //      informa ao usuário que o erro está relacionado ao 
        //      processo de login.
        // O '+ error' concatena a descrição do erro específico 
        //      que foi capturado pelo bloco 'catch'.
        // Esta linha garante que o usuário seja informado 
        //      sobre o que deu errado, possibilitando uma 
        //      melhor experiência de usuário ao entender que o 
        //      login não foi bem-sucedido devido a um problema técnico.
        alert('Erro ao fazer login: ' + error);
        
      }

    });
  }

  // -------------------------
  // 1.1) CADASTRO USUÁRIO PÚBLICO
  // -------------------------

  // Busca no documento HTML um elemento pelo seu 
  //      identificador (ID) 'cadastroUsuarioPublicoForm'.
  // Este elemento é o formulário usado para o 
  //      cadastro público de usuários.
  const cadastroUsuarioPublicoForm = document.getElementById('cadastroUsuarioPublicoForm');

  // Verifica se o formulário existe no documento. Isso é 
  //      importante para prevenir erros em caso de o 
  //      formulário não estar presente na página.
  if (cadastroUsuarioPublicoForm) {

    // Adiciona um ouvinte de evento ao formulário para 
    //      interceptar o evento de 'submit', ou seja, 
    //      quando o usuário tenta enviar o formulário.
    cadastroUsuarioPublicoForm.addEventListener('submit', async (e) => {
      
      // Previne o comportamento padrão do evento de submissão, 
      //      que é enviar os dados do formulário e recarregar a página.
      e.preventDefault();

      // Busca e armazena o valor do campo de input com 
      //      ID 'nomeUsuarioPub', que é onde o usuário 
      //      insere seu nome no formulário.
      const nome = document.getElementById('nomeUsuarioPub').value;

      // Busca e armazena o valor do campo de input 
      //        com ID 'emailUsuarioPub', que é onde o 
      //        usuário insere seu email.
      const email = document.getElementById('emailUsuarioPub').value;

      // Busca e armazena o valor do campo de input 
      //        com ID 'senhaUsuarioPub', que é onde o 
      //        usuário insere sua senha.
      const senha = document.getElementById('senhaUsuarioPub').value;

      // Busca e armazena o valor do campo de input 
      //        com ID 'idadeUsuarioPub', converte esse 
      //        valor para um número inteiro usando 'parseInt'.
      // Isso é necessário porque os valores de input são 
      //        capturados como strings, e a idade precisa 
      //        ser manipulada como um número.
      const idade = parseInt(document.getElementById('idadeUsuarioPub').value);


      // Inicia um bloco 'try' que é usado para capturar 
      //      quaisquer erros que possam ocorrer durante a 
      //      execução das linhas de código dentro dele.
      try {

        // Executa uma chamada HTTP ao servidor usando a 
        //        função 'fetch'. 
        // Esta chamada é assíncrona e espera por 
        //        uma resposta do servidor.
        const resp = await fetch('http://localhost:3000/usuarios', {
        
          // Especifica que o método HTTP da requisição é 'POST', 
          //        que é usado para enviar dados para criação ou 
          //        atualização no servidor.
          method: 'POST',
        
          // Define os cabeçalhos da requisição para informar ao 
          //        servidor que o corpo da requisição 
          //        está em formato JSON.
          headers: { 'Content-Type': 'application/json' },
        
          // Converte o objeto contendo os dados do usuário (nome, 
          //        email, senha, idade) em uma string JSON 
          //        para enviar no corpo da requisição.
          body: JSON.stringify({ nome, email, senha, idade })

        });

        // Após receber a resposta do servidor, converte o 
        //        conteúdo da resposta de JSON para um objeto JavaScript.
        // O método 'json()' é uma função que lê o corpo da 
        //        resposta e tenta convertê-lo de JSON para um objeto.
        const data = await resp.json();

        // Verifica se a propriedade 'ok' da resposta não é 
        //        verdadeira. 
        // A propriedade 'ok' retorna 'true' se o status da 
        //        resposta está entre 200 e 299, indicando 
        //        que a requisição foi bem-sucedida.
        if (!resp.ok) {

          // Se a resposta não for bem-sucedida (status HTTP fora 
          //      do intervalo 200-299), executa o código 
          //      dentro deste bloco.
          // Exibe uma caixa de alerta com a mensagem de 
          //      erro retornada pelo servidor. Se por algum 
          //      motivo a mensagem não existir, exibe 'Erro ao 
          //      cadastrar usuário' como mensagem padrão.
          alert(data.message || 'Erro ao cadastrar usuário');
          
          // Interrompe a execução da função, evitando que as 
          //       linhas de código seguintes sejam 
          //        executadas após um erro.
          return;

        }

        // Caso a resposta tenha sido bem-sucedida, executa 
        //      as linhas de código seguintes:
        // Exibe uma caixa de alerta informando que o 
        //      usuário foi cadastrado com sucesso.
        alert('Usuário cadastrado com sucesso!');

        // Redireciona o navegador para a página 'login.html'. 
        // Isso é feito modificando a propriedade 'href' do objeto 
        //      global 'window.location', que controla o URL atual no navegador.
        // Este redirecionamento é típico após um cadastro bem-sucedido, 
        //      levando o usuário para a tela de login para que 
        //      possa entrar com suas novas credenciais.
        window.location.href = 'login.html';

      // O bloco 'catch' é usado para capturar exceções ou 
      //      erros que ocorrem no bloco 'try' associado.
      } catch (error) {

        // 'error' é a variável que contém informações sobre o 
        //      erro ocorrido. Pode incluir detalhes técnicos, 
        //      como a mensagem de erro ou outros atributos 
        //      dependendo do contexto do erro.

        // Aqui, uma caixa de alerta é mostrada ao usuário 
        //        com uma mensagem personalizada.
        // 'Erro ao cadastrar: ' é uma string fixa que informa ao 
        //        usuário que o erro está relacionado ao 
        //        processo de cadastro.
        // O '+ error' concatena a mensagem de erro específica 
        //        que foi capturada pelo bloco 'catch'.
        // Isso pode incluir detalhes técnicos fornecidos 
        //        pelo navegador ou pela resposta do servidor, 
        //        ajudando no diagnóstico do problema.
        // Esta linha assegura que o usuário seja informado 
        //        sobre o que deu errado, possibilitando uma melhor 
        //        experiência de usuário ao entender que a tentativa de 
        //        cadastro falhou devido a um problema técnico.
        alert('Erro ao cadastrar: ' + error);
        
      }

    });
  }

  // -------------------------
  // 2) TELA PRINCIPAL (VENDAS)
  // -------------------------

  // Procura no documento HTML um elemento com o ID 'btnAdicionar' e 
  //      armazena uma referência a ele na variável 'btnAdicionar'.
  // Este botão é usado para adicionar itens à venda atual.
  const btnAdicionar = document.getElementById('btnAdicionar');

  // Procura no documento HTML um elemento com o 
  //      ID 'btnFinalizarVenda' e armazena uma referência a 
  //      ele na variável 'btnFinalizarVenda'.
  // Este botão é usado para finalizar a venda, 
  //      processando todos os itens adicionados.
  const btnFinalizarVenda = document.getElementById('btnFinalizarVenda');

  // Procura no documento HTML um elemento com o 
  //      ID 'btnConfiguracoes' e armazena uma referência a 
  //      ele na variável 'btnConfiguracoes'.
  // Este botão é usado para acessar as configurações do 
  //      sistema de vendas, onde o usuário pode 
  //      ajustar parâmetros ou opções.
  const btnConfiguracoes = document.getElementById('btnConfiguracoes');

  // Procura no documento HTML um elemento com o 
  //       ID 'tabelaVendasBody' e armazena uma 
  //      referência a ele na variável 'tabelaVendasBody'.
  // Este elemento 'tbody' é usado para mostrar os itens 
  //      que estão sendo adicionados à venda atual.
  const tabelaVendasBody = document.getElementById('tabelaVendasBody');

  // Procura no documento HTML um elemento com o 
  //      ID 'valorTotalSpan' e armazena uma referência a 
  //      ele na variável 'valorTotalSpan'.
  // Este elemento 'span' é usado para mostrar o valor 
  //      total da venda baseado nos itens adicionados.
  const valorTotalSpan = document.getElementById('valorTotal');

  // Procura no documento HTML um elemento com o 
  //      ID 'cpfClienteVenda' e armazena uma referência a 
  //      ele na variável 'cpfClienteVenda'.
  // Este campo de entrada é usado para inserir o CPF do 
  //      cliente para quem a venda está sendo realizada.
  const cpfClienteVenda = document.getElementById('cpfClienteVenda');

  // Inicializa uma variável 'itensVenda' como um array vazio.
  // Este array será usado para armazenar os itens que o 
  //        usuário adiciona à venda, incluindo detalhes 
  //        como o produto, quantidade e preço.
  let itensVenda = [];


  // Verifica se os elementos 'btnAdicionar', 'tabelaVendasBody' e 
  //        'btnFinalizarVenda' existem na página.
  // Isso evita erros caso algum desses elementos não 
  //         esteja presente no documento HTML atual.
  if (btnAdicionar && tabelaVendasBody && btnFinalizarVenda) {
    
    // Adiciona um evento de clique ao botão 'btnAdicionar'.
    // Quando o usuário clica no botão, a função assíncrona é executada.
    btnAdicionar.addEventListener('click', async () => {

      // Obtém o valor do campo de entrada onde o usuário 
      //      digita o código do produto.
      // O método 'trim()' é usado para remover espaços em 
      //      branco antes e depois do código, evitando erros 
      //      causados por espaços indesejados.
      const codigoProduto = document.getElementById('codigoProduto').value.trim();

      // Verifica se o usuário não digitou nada no 
      //      campo de código do produto.
      if (!codigoProduto) {

        // Exibe um alerta informando que o código do 
        //      produto deve ser digitado.
        alert('Digite o código do produto!');

        // Retorna imediatamente, interrompendo a execução do código abaixo,
        // pois não faz sentido continuar se o código do 
        //      produto não foi fornecido.
        return;

      }

      // O bloco 'try' é usado para capturar e tratar erros 
      //      que podem ocorrer durante a execução deste código.
      try {
        
        // Realiza uma requisição HTTP para o servidor, buscando 
        //      informações sobre um produto com base no código 
        //      digitado pelo usuário.
        // `fetch()` é uma função assíncrona que faz essa 
        //      solicitação à URL especificada.
        // `await` é usado para esperar que a resposta do 
        //      servidor chegue antes de continuar a execução do código.
        const resp = await fetch(`http://localhost:3000/produtos/codigo/${codigoProduto}`);

        // Verifica se a resposta do servidor não foi bem-sucedida.
        // A propriedade 'ok' da resposta retorna 'true' 
        //      se o código de status estiver entre 200 e 299.
        if (!resp.ok) {
          
          // Converte a resposta do servidor de JSON para um objeto JavaScript.
          // 'await' é necessário porque a conversão de JSON 
          //      também é uma operação assíncrona.
          const data = await resp.json();
          
          // Exibe uma mensagem de erro na tela.
          // Se o servidor retornou uma mensagem específica 
          //      de erro, ela será mostrada no alerta.
          // Caso contrário, será exibida a mensagem 
          //      padrão 'Erro ao buscar produto'.
          alert(data.message || 'Erro ao buscar produto');
          
          // Retorna imediatamente para interromper a 
          //      execução do código abaixo,
          // pois não faz sentido continuar se não foi 
          //      possível obter o produto.
          return;
        }

        // Se a resposta for bem-sucedida, converte o JSON da 
        //      resposta para um objeto JavaScript e armazena 
        //      na variável 'produto'.
        const produto = await resp.json();

        // Verifica se o produto já está na lista de itens da venda.
        // A função 'find()' percorre o array 'itensVenda' e 
        //      retorna o primeiro item que tenha um 'produtoId' 
        //      igual ao '_id' do produto encontrado no servidor.
        // Se encontrar um item correspondente, a variável 'itemExistente' 
        //      armazenará esse item.
        // Se não encontrar, 'itemExistente' será 'undefined'.
        const itemExistente = itensVenda.find(i => i.produtoId === produto._id);

        // Verifica se o produto já está na lista de itens da venda.
        // Se 'itemExistente' não for 'undefined', significa 
        //      que o produto já foi adicionado anteriormente.
        if (itemExistente) {
          
          // Se o produto já estiver na lista de vendas, 
          //      aumenta a quantidade do item em 1.
          itemExistente.quantidade += 1;
          
          // Atualiza o subtotal do item multiplicando a nova 
          //      quantidade pelo preço unitário.
          // Isso garante que o subtotal reflita corretamente a 
          //      quantidade total do produto na venda.
          itemExistente.subtotal = itemExistente.quantidade * itemExistente.precoUnitario;

        } else {
          
          // Se o produto ainda não está na lista de itens da 
          //      venda, cria um novo objeto 'novoItem'.
          const novoItem = {
            
            // Armazena o ID do produto, para referência futura.
            produtoId: produto._id,
            
            // Armazena o nome do produto para exibição na tabela.
            nomeProduto: produto.nome,
            
            // Define a quantidade inicial como 1, pois é a 
            //      primeira vez que esse produto está sendo 
            //      adicionado à venda.
            quantidade: 1,
            
            // Armazena o preço unitário do produto, 
            //      conforme informado pelo servidor.
            precoUnitario: produto.preco,
            
            // O subtotal inicial é o mesmo que o preço unitário, 
            //      já que a quantidade começa em 1.
            subtotal: produto.preco

          };

          // Adiciona o novo item ao array 'itensVenda', que 
          //      armazena todos os produtos adicionados à venda atual.
          itensVenda.push(novoItem);

        }

        // Chama a função 'atualizarTabelaVendas()', que tem a 
        //      responsabilidade de atualizar a tabela de vendas na tela.
        // Isso é necessário para refletir a adição do novo 
        //      item ou a atualização da quantidade de um item existente.
        atualizarTabelaVendas();

        // Limpa o campo de entrada onde o usuário digita o código do produto.
        // Isso é feito para evitar que o usuário precise apagar 
        //      manualmente o código anterior antes de digitar um novo.
        document.getElementById('codigoProduto').value = '';

        // Define o foco (cursor) no campo de entrada do código do produto.
        // Isso melhora a experiência do usuário, permitindo que 
        //      ele continue digitando novos códigos sem precisar 
        //      clicar no campo manualmente.
        document.getElementById('codigoProduto').focus();

      // O bloco 'catch' captura qualquer erro que possa ocorrer 
      //      dentro do bloco 'try'.
      // Isso inclui erros de conexão com o servidor, falhas na 
      //      resposta da API ou problemas inesperados no código.
      } catch (error) {

        // Exibe um alerta na tela informando que houve um 
        //      erro ao buscar o produto.
        // A mensagem de erro capturada é concatenada à 
        //      string 'Erro ao buscar produto: ' para fornecer 
        //      mais detalhes sobre o problema.
        alert('Erro ao buscar produto: ' + error);

      }

    });

    // Finalizar venda
    // Adiciona um evento de clique ao botão 'btnFinalizarVenda'.
    // Quando o usuário clica nesse botão, a função 
    //      assíncrona abaixo é executada.
    btnFinalizarVenda.addEventListener('click', async () => {
      
      // Verifica se a lista de itens da venda está vazia.
      // 'itensVenda.length' retorna o número de produtos na venda.
      // Se for igual a 0, significa que nenhum produto foi adicionado.
      if (itensVenda.length === 0) {

        // Exibe um alerta informando que não há itens na 
        //      venda e que a operação não pode continuar.
        alert('Nenhum item na venda!');

        // O 'return' faz com que a execução da função 
        //      pare imediatamente aqui.
        // Isso impede que o código abaixo seja executado 
        //      caso não haja itens para finalizar a venda.
        return;
      }

      // Obtém a data atual do sistema.
      // 'new Date()' cria um objeto representando o momento 
      //      exato em que esse código é executado.
      const dataAtual = new Date();

      // Formata a data no padrão "YYYY-MM-DD" (Ano-Mês-Dia).
      // Isso é útil porque a maioria dos bancos de dados e 
      //      sistemas esperam datas nesse formato.
      const dataFormatada = `${dataAtual.getFullYear()}-${String(dataAtual.getMonth() + 1).padStart(2, '0')}-${String(dataAtual.getDate()).padStart(2, '0')}`;

      /*
      * Explicação da formatação:
      * - 'dataAtual.getFullYear()' obtém o ano completo (exemplo: 2025).
      * - 'dataAtual.getMonth()' retorna o mês, mas começa 
      *       em 0 (janeiro é 0, fevereiro é 1, etc.).
      *   - Por isso, somamos 1 para que os meses fiquem  
      *        corretos (1 a 12).
      *   - 'padStart(2, '0')' garante que o número tenha 
      *         sempre 2 dígitos (exemplo: "03" para março).
      * - 'dataAtual.getDate()' retorna o dia do mês.
      *   - Também usamos 'padStart(2, '0')' para garantir que 
      *       fique no formato correto (exemplo: "09" ao invés de "9").
      */

  
      try {

          // Faz uma requisição HTTP para o servidor na 
          //      URL 'http://localhost:3000/vendas'.
          // O objetivo dessa requisição é enviar os dados da 
          //      venda para serem processados e armazenados no banco de dados.
          const response = await fetch('http://localhost:3000/vendas', {
              
              // Define o método da requisição como 'POST', 
              //      indicando que estamos enviando dados 
              //      para serem armazenados.
              method: 'POST',
        
              // Define o cabeçalho da requisição para indicar que o 
              //      corpo da requisição está no formato JSON.
              headers: { 'Content-Type': 'application/json' },
        
              // O corpo da requisição contém os dados da 
              //      venda convertidos para JSON.
              body: JSON.stringify({
        
                  // 'itensVenda' é um array que contém os produtos 
                  //      que o usuário adicionou à venda.
                  itens: itensVenda,
        
                  // 'cpfClienteVenda.value.trim()' pega o valor 
                  //        digitado no campo CPF do cliente e remove 
                  //        espaços extras no início e no final.
                  // Isso evita problemas ao armazenar ou comparar os 
                  //        dados no banco de dados.
                  clienteCpf: cpfClienteVenda.value.trim(),
        
                  // 'dataVenda' recebe o valor da variável 'dataFormatada', 
                  //        que armazena a data no formato "YYYY-MM-DD".
                  // Isso é importante porque os bancos de dados 
                  //        geralmente armazenam datas nesse formato.
                  dataVenda: dataFormatada

              })
          });
      
  
          // Aguarda a resposta do servidor e converte os 
          //      dados da resposta para JSON.
          // A resposta pode conter informações sobre a 
          //      venda ou mensagens de erro.
          const data = await response.json();

          // Verifica se a resposta do servidor não foi bem-sucedida.
          // 'response.ok' retorna 'false' se o status HTTP 
          //      estiver fora da faixa de 200 a 299 (indicando erro).
          if (!response.ok) {
              
              // Exibe um alerta informando ao usuário que 
              //      houve um erro ao finalizar a venda.
              // Se o servidor enviou uma mensagem de erro, ela será exibida.
              // Caso contrário, será mostrado o texto padrão 
              //      'Erro ao finalizar venda'.
              alert(data.message || 'Erro ao finalizar venda');
              
              // 'return' interrompe a execução do código aqui, 
              //      evitando que a venda seja finalizada incorretamente.
              return;

          }

          // Se a venda foi finalizada com sucesso, exibe um 
          //      alerta informando ao usuário.
          // A mensagem exibida será a enviada pelo servidor, se 
          //      houver, ou um texto padrão de sucesso.
          alert(data.message || 'Venda realizada com sucesso!');

          // Limpa a lista de itens da venda, pois a venda foi 
          //      finalizada com sucesso.
          // Isso garante que, ao adicionar novos produtos, a venda   
          //       anterior não seja reutilizada por engano.
          itensVenda = [];

          // Chama a função 'atualizarTabelaVendas()' para 
          //      atualizar a tabela na tela.
          // Isso remove os itens que foram comprados e deixa a 
          //      tela pronta para uma nova venda.
          atualizarTabelaVendas();

          // Limpa o campo de CPF do cliente, removendo 
          //      qualquer informação digitada anteriormente.
          // Isso evita que o CPF de um cliente fique salvo 
          //      para a próxima venda, garantindo privacidade.
          cpfClienteVenda.value = '';

      // Captura qualquer erro que possa ocorrer dentro do bloco 'try'.
      // Isso inclui falhas na conexão com o servidor, 
      //      problemas ao processar a resposta ou erros inesperados.
      } catch (error) {

          // Exibe um alerta para o usuário informando que 
          //      ocorreu um erro ao finalizar a venda.
          // O erro capturado é concatenado à mensagem para 
          //      fornecer mais detalhes sobre o problema.
          alert('Erro ao finalizar venda: ' + error);

      }

    });
    
  

    // Verifica se o botão 'btnConfiguracoes' existe na página.
    // Isso evita erros caso esse elemento não esteja 
    //      presente em determinada tela.
    if (btnConfiguracoes) {

        // Adiciona um evento de clique ao botão 'btnConfiguracoes'.
        // Quando o usuário clicar no botão, a função será executada.
        btnConfiguracoes.addEventListener('click', () => {

            // Redireciona o usuário para a página 'menu.html'.
            // Isso faz com que a tela atual seja substituída 
            //      pela tela do menu de configurações.
            window.location.href = 'menu.html';

        });
    }

  }

  
  // Função responsável por atualizar a tabela de vendas na tela.
  // Sempre que um produto for adicionado ou removido, 
  //      essa função será chamada para refletir as mudanças.
  function atualizarTabelaVendas() {

    // Limpa todo o conteúdo da tabela antes de recriá-la.
    // Isso garante que a tabela não exiba itens 
    //      duplicados ao ser atualizada.
    tabelaVendasBody.innerHTML = '';

    // Inicializa uma variável para armazenar o total da venda.
    let total = 0;

    // Percorre a lista de itens adicionados à venda.
    itensVenda.forEach((item, idx) => {

      // Soma o subtotal de cada item ao total da venda.
      total += item.subtotal;

      // Cria um novo elemento de linha ('tr') na tabela.
      const tr = document.createElement('tr');

      // Define o conteúdo da linha ('tr') utilizando 
      //      template literals (criação dinâmica de HTML).
      // Cada item da lista de vendas será representado 
      //      como uma linha na tabela.
      tr.innerHTML = `

            <td>${item.nomeProduto}</td>

            <td>R$ ${item.precoUnitario.toFixed(2)}</td>

            <td>
                <input
                    type="number" // Tipo numérico, permitindo apenas números.
                    min="1" // Define que o valor mínimo permitido é 1 (não pode ser 0 ou negativo).
                    value="${item.quantidade}" // Exibe a quantidade atual do item.
                    style="width:60px" // Define a largura do campo de entrada.
                    onchange="atualizarQuantidade(${idx}, this.value)" // Chama a função 'atualizarQuantidade()' quando o valor for alterado.
                />
            </td>

            <td>R$ ${item.subtotal.toFixed(2)}</td>

            <td>
                <button class="delete" onclick="removerItem(${idx})">Remover</button>
            </td>
        `;

        // Adiciona a linha recém-criada dentro do 
        //      corpo da tabela de vendas.
        tabelaVendasBody.appendChild(tr);

    });

    // Verifica se o elemento 'valorTotalSpan' existe na página.
    // Isso evita erros caso o elemento não esteja 
    //      presente em determinada tela.
    if (valorTotalSpan) {

      // Atualiza o conteúdo de texto do elemento 'valorTotalSpan'.
      // O valor exibido representa o total acumulado da 
      //      venda, formatado com duas casas decimais.
      valorTotalSpan.textContent = total.toFixed(2);

    }

  }

  // Define a função 'removerItem' como uma propriedade do objeto 'window'.
  // Isso permite que a função seja acessível 
  //      globalmente no escopo do navegador.
  window.removerItem = (idx) => {

      // Remove um item da lista de vendas com base no índice fornecido.
      // O método 'splice' remove 1 elemento a partir da posição 'idx'.
      itensVenda.splice(idx, 1);

      // Atualiza a tabela de vendas na tela 
      //      após a remoção do item.
      // Isso garante que a interface seja atualizada 
      //      corretamente e não exiba itens excluídos.
      atualizarTabelaVendas();

  };

  // Define a função 'atualizarQuantidade' como 
  //      uma propriedade do objeto 'window'.
  // Isso permite que a função seja acessível 
  //      globalmente no navegador.
  window.atualizarQuantidade = (idx, novaQtd) => {

      // Converte o valor passado como parâmetro 
      //      para um número inteiro.
      // Isso garante que o valor seja tratado 
      //      corretamente, mesmo que venha como string.
      const qtd = parseInt(novaQtd);

      // Se a quantidade for menor ou igual a zero, a 
      //      função é interrompida sem fazer alterações.
      // Isso impede que o usuário defina um valor 
      //      inválido para a quantidade do item.
      if (qtd <= 0) return;

      // Atualiza a quantidade do item na lista de 
      //      vendas com o novo valor fornecido.
      itensVenda[idx].quantidade = qtd;

      // Atualiza o subtotal do item, multiplicando o 
      //      preço unitário pela nova quantidade.
      itensVenda[idx].subtotal = itensVenda[idx].precoUnitario * qtd;

      // Atualiza a tabela de vendas na interface do usuário.
      // Isso garante que a nova quantidade e o subtotal 
      //      atualizado sejam refletidos na tela.
      atualizarTabelaVendas();

  };


  // -------------------------
  // 3) CRUD - USUÁRIOS
  // -------------------------

  // Verifica se o elemento com o ID 'listaUsuarios' 
  //      existe na página.
  // Isso garante que o código só seja executado na 
  //      página correta, evitando erros.
  if (document.getElementById('listaUsuarios')) {

    // Chama a função 'carregarUsuarios()' para preencher a 
    //      tabela com os usuários cadastrados.
    carregarUsuarios();

    // Adiciona um evento ao campo de filtro de 
    //      usuários ('filtroUsuario').
    // Sempre que o usuário digitar algo no campo de 
    //      filtro, a função 'carregarUsuarios()' será 
    //      chamada novamente.
    // Isso permite que a lista de usuários seja filtrada 
    //      em tempo real conforme o usuário digita.
    document.getElementById('filtroUsuario').addEventListener('input', carregarUsuarios);

  }

  // Verifica se o formulário de cadastro de 
  //      usuário ('cadastroUsuarioForm') está presente na página.
  // Isso garante que o código só seja executado na 
  //      página correta, evitando erros caso o formulário não exista.
  if (document.getElementById('cadastroUsuarioForm')) {

      // Chama a função 'prepararFormularioUsuario()' 
      //      para configurar o formulário de cadastro.
      // Essa função pode carregar dados do usuário caso 
      //      seja uma edição ou apenas preparar o 
      //      formulário para um novo cadastro.
      prepararFormularioUsuario();

  }


  // -------------------------
  // 4) CRUD - FORNECEDORES
  // -------------------------

  // Verifica se a tabela de fornecedores ('listaFornecedores') existe na página.
  // Isso impede que o código rode em páginas onde a lista de 
  //      fornecedores não está presente.
  if (document.getElementById('listaFornecedores')) {

      // Chama a função 'carregarFornecedores()' para preencher a 
      //    tabela com os fornecedores cadastrados.
      carregarFornecedores();

      // Adiciona um evento ao campo de filtro de 
      //      fornecedores ('filtroFornecedor').
      // Sempre que o usuário digitar algo no campo, a 
      //      função 'carregarFornecedores()' será chamada novamente.
      // Isso permite que a lista de fornecedores seja 
      //      filtrada em tempo real conforme o usuário digita.
      document.getElementById('filtroFornecedor').addEventListener('input', carregarFornecedores);

  }

  // Verifica se o formulário de cadastro de fornecedor ('cadastroFornecedorForm') 
  //      está presente na página.
  // Isso garante que o código só seja executado se o formulário 
  //      existir, evitando erros caso ele não esteja na página.
  if (document.getElementById('cadastroFornecedorForm')) {

      // Chama a função 'prepararFormularioFornecedor()' para 
      //      configurar o formulário de cadastro de fornecedor.
      // Essa função pode carregar os dados de um fornecedor 
      //      caso seja uma edição ou apenas preparar o 
      //      formulário para um novo cadastro.
      prepararFormularioFornecedor();

  }


  // -------------------------
  // 5) CRUD - PRODUTOS
  // -------------------------

  // Verifica se a tabela de produtos ('listaProdutos') 
  //      existe na página.
  // Isso impede que o código rode em páginas onde a 
  //      lista de produtos não está presente.
  if (document.getElementById('listaProdutos')) {

      // Chama a função 'carregarProdutos()' para preencher a 
      //      tabela com os produtos cadastrados.
      carregarProdutos();

      // Adiciona um evento ao campo de filtro de produtos ('filtroProduto').
      // Sempre que o usuário digitar algo no campo, a 
      //      função 'carregarProdutos()' será chamada novamente.
      // Isso permite que a lista de produtos seja filtrada em 
      //      tempo real conforme o usuário digita.
      document.getElementById('filtroProduto').addEventListener('input', carregarProdutos);
      

  }

  // Verifica se o formulário de cadastro de produto ('cadastroProdutoForm') 
  //      está presente na página.
  // Isso garante que o código só seja executado se o 
  //      formulário existir, evitando erros caso ele 
  //      não esteja na página.
  if (document.getElementById('cadastroProdutoForm')) {

      // Chama a função 'prepararFormularioProduto()' para 
      //      configurar o formulário de cadastro de produto.
      // Essa função pode carregar os dados de um produto caso 
      //      seja uma edição ou apenas preparar o 
      //      formulário para um novo cadastro.
      prepararFormularioProduto();

  }


  // -------------------------
  // 6) CRUD - CLIENTES
  // -------------------------

  // Verifica se a tabela de clientes ('listaClientes') existe na página.
  // Isso impede que o código seja executado em páginas 
  //      onde a lista de clientes não está presente.
  if (document.getElementById('listaClientes')) {

      // Chama a função 'carregarClientes()' para 
      //      preencher a tabela com os clientes cadastrados.
      carregarClientes();

      // Adiciona um evento ao campo de filtro de clientes ('filtroCliente').
      // Sempre que o usuário digitar algo no campo, a 
      //      função 'carregarClientes()' será chamada novamente.
      // Isso permite que a lista de clientes seja filtrada em 
      //      tempo real conforme o usuário digita.
      document.getElementById('filtroCliente').addEventListener('input', carregarClientes);

  }

  // Verifica se o formulário de cadastro de cliente ('cadastroClienteForm') 
  //      está presente na página.
  // Isso garante que o código só seja executado se o formulário 
  //      existir, evitando erros caso ele não esteja na página.
  if (document.getElementById('cadastroClienteForm')) {

      // Chama a função 'prepararFormularioCliente()' para configurar o 
      //      formulário de cadastro de cliente.
      // Essa função pode carregar os dados de um cliente caso seja uma 
      //      edição ou apenas preparar o formulário para um novo cadastro.
      prepararFormularioCliente();

  }


  // -------------------------
  // 7) RELATÓRIO
  // -------------------------

  // Obtém a referência do botão "Buscar Relatório" na página.
  // Esse botão será usado para acionar a busca de 
  //      relatórios com base nos filtros selecionados.
  const btnBuscarRelatorio = document.getElementById('btnBuscarRelatorio');

  // Obtém a referência do botão "Exportar para Excel" na página.
  // Esse botão será usado para exportar os dados do relatório em formato Excel (CSV).
  const btnExportarExcel = document.getElementById('btnExportarExcel');

  // Obtém a referência do campo de seleção de fornecedor ('fornecedorFiltro').
  // Esse campo permite que o usuário selecione um fornecedor 
  //      para filtrar os resultados do relatório.
  const fornecedorFiltro = document.getElementById('fornecedorFiltro');

  // Obtém a referência do campo de seleção de produto ('produtoFiltro').
  // Esse campo permite que o usuário selecione um produto 
  //      específico para filtrar os resultados do relatório.
  const produtoFiltro = document.getElementById('produtoFiltro');

  // Verifica se o botão "Buscar Relatório" existe na página.
  // Isso garante que o código só será executado se 
  //      esse botão estiver presente.
  if (btnBuscarRelatorio) {

      // Chama a função 'carregarFornecedoresNoSelect()' para 
      //      preencher a lista de fornecedores no filtro.
      // Isso permite que o usuário selecione um fornecedor ao 
      //      gerar o relatório.
      carregarFornecedoresNoSelect(fornecedorFiltro);

      // Chama a função 'carregarProdutosNoSelect()' para 
      //      preencher a lista de produtos no filtro.
      // Isso permite que o usuário selecione um produto 
      //      ao gerar o relatório.
      carregarProdutosNoSelect(produtoFiltro);

      // ...pela nova forma:
      btnBuscarRelatorio.addEventListener('click', async () => {
        // Pegar filtros:
        const dataInicial = document.getElementById('dataInicial').value;
        const dataFinal   = document.getElementById('dataFinal').value;
        const fornecedor  = document.getElementById('fornecedorFiltro').value.trim();
        const produto     = document.getElementById('produtoFiltro').value.trim();
        const cpf         = document.getElementById('cpfFiltro').value.trim();

        // Chamar a nova função, passando esses parâmetros
        carregarRelatorio(dataInicial, dataFinal, fornecedor, produto, cpf);
      });

  }

  // Verifica se o botão "Exportar para Excel" existe na página.
  // Isso garante que o código só será executado se 
  //      esse botão estiver presente.
  if (btnExportarExcel) {

      // Adiciona um evento de clique ao botão "Exportar para Excel".
      // Quando o usuário clicar no botão, a função 
      //      'exportarRelatorioParaExcel()' será chamada.
      // Isso permite que os dados do relatório sejam 
      //      exportados para um arquivo Excel (CSV).
      btnExportarExcel.addEventListener('click', exportarRelatorioParaExcel);
      
  }

});


// ========================================================
// FUNÇÕES - USUÁRIOS
// ========================================================

// Define uma função assíncrona chamada 'carregarUsuarios'.
// Essa função será responsável por buscar a lista de 
//      usuários no servidor e exibi-la na página.
async function carregarUsuarios() {

  // Obtém o valor do campo de filtro de usuários ('filtroUsuario').
  // Converte o valor para letras minúsculas para garantir 
  //      que a busca seja feita de forma case-insensitive.
  const filtro = document.getElementById('filtroUsuario').value.toLowerCase();

  // Faz uma requisição assíncrona ao servidor para 
  //      obter a lista de usuários.
  // A URL 'http://localhost:3000/usuarios' é onde os 
  //     dados dos usuários estão armazenados no backend.
  const response = await fetch('http://localhost:3000/usuarios');

  // Converte a resposta da requisição para um formato JSON.
  // Isso transforma os dados recebidos do servidor em 
  //      um objeto JavaScript para facilitar a manipulação.
  const usuarios = await response.json();

  // Obtém a referência do elemento HTML que representa a 
  //      lista de usuários na tabela.
  // O ID 'listaUsuarios' pertence ao `<tbody>` onde os 
  //      usuários serão inseridos dinamicamente.
  const lista = document.getElementById('listaUsuarios');

  // Limpa qualquer conteúdo existente dentro do elemento 'lista'.
  // Isso garante que ao carregar novos usuários, a 
  //      tabela não fique com dados duplicados.
  lista.innerHTML = '';

  // Filtra os usuários com base no valor digitado no campo de filtro.
  // Verifica se o nome ou o email do usuário contém a 
  //      string digitada no filtro.
  // A conversão para minúsculas (toLowerCase()) é 
  //      usada para que a busca seja insensível a 
  //      maiúsculas e minúsculas.
  usuarios.filter(u => u.nome.toLowerCase().includes(filtro) || u.email.toLowerCase().includes(filtro))
  
  // Percorre a lista de usuários filtrados e cria uma 
  //      nova linha (<tr>) na tabela para cada usuário.
  .forEach(user => {
  
      // Cria um novo elemento HTML de linha (<tr>) para 
      //      armazenar as informações do usuário.
      const tr = document.createElement('tr');

      // Define o conteúdo HTML da linha da tabela.
      // Cada célula (<td>) exibe um dado do usuário: nome, email e idade.
      // A última célula contém dois botões de ação: "Editar" e "Excluir".
      tr.innerHTML = `
          <td>${user.nome}</td> <!-- Exibe o nome do usuário -->
          <td>${user.email}</td> <!-- Exibe o email do usuário -->
          <td>${user.idade}</td> <!-- Exibe a idade do usuário -->
          <td class="actions"> <!-- Contém os botões de edição e exclusão -->

              <!-- Botão de editar: chama a função editarUsuario() passando o ID do usuário -->
              <button class="edit" onclick="editarUsuario('${user._id}')">Editar</button>

              <!-- Botão de excluir: chama a função deletarUsuario() passando o ID do usuário -->
              <button class="delete" onclick="deletarUsuario('${user._id}')">Excluir</button>
          </td>
      `;

      // Adiciona a linha (<tr>) criada à tabela 
      //      de usuários na página.
      lista.appendChild(tr);

  });

}

// Função para redirecionar o usuário para a 
//      página de edição de usuário.
// Recebe como parâmetro o ID do usuário que será editado.
function editarUsuario(id) {

    // Altera a URL da página atual para 'cadastroUsuario.html', 
    //      passando o ID do usuário na query string.
    // Isso permite que a página de cadastro identifique qual 
    //      usuário será editado e carregue suas informações.
    window.location.href = `cadastroUsuario.html?id=${id}`;

}


// Função assíncrona para excluir um usuário do sistema
async function deletarUsuario(id) {

    // Exibe um alerta de confirmação para o usuário antes de excluir o registro
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        
        // Faz uma requisição HTTP ao servidor para excluir o 
        //      usuário com o ID fornecido
        // O método 'DELETE' indica que estamos removendo um 
        //      registro do banco de dados
        await fetch(`http://localhost:3000/usuarios/${id}`, { method: 'DELETE' });

        // Após a exclusão bem-sucedida, exibe um alerta 
        //      informando que o usuário foi removido
        alert('Usuário removido com sucesso!');

        // Atualiza a lista de usuários na interface chamando a 
        //      função responsável por recarregar os dados
        carregarUsuarios();
        
    }
}


// Declara uma função assíncrona chamada prepararFormularioUsuario, 
//      que será responsável por preencher 
//      o formulário caso um usuário esteja sendo editado.
async function prepararFormularioUsuario() {
  
  // Obtém os parâmetros da URL (por exemplo, "?id=123") 
  //      para verificar se há um ID de usuário presente.
  const urlParams = new URLSearchParams(window.location.search);

  // Extrai o valor do parâmetro 'id' da URL, que indica 
  //      que estamos editando um usuário específico.
  const usuarioId = urlParams.get('id');

  // Verifica se há um ID de usuário presente na URL (ou seja, 
  //      se estamos editando um usuário existente).
  if (usuarioId) {
    
    // Altera o título do formulário para "Editar Usuário", 
    //      pois não se trata de um novo cadastro.
    document.getElementById('tituloUsuario').textContent = 'Editar Usuário';

    // Realiza uma requisição para o servidor para obter os 
    //      dados do usuário correspondente ao ID fornecido.
    const response = await fetch(`http://localhost:3000/usuarios/${usuarioId}`);

    // Converte a resposta da requisição para um objeto JSON 
    //      contendo os dados do usuário.
    const usuario = await response.json();

    // Verifica se os dados do usuário foram recuperados 
    //      corretamente antes de preencher o formulário.
    if (usuario) {
      
      // Preenche o campo oculto do formulário com o ID do 
      //      usuário para referência na atualização.
      document.getElementById('usuarioId').value = usuario._id;

      // Preenche o campo "Nome" do formulário com o nome do 
      //      usuário recuperado do banco de dados.
      document.getElementById('nomeUsuario').value = usuario.nome;

      // Preenche o campo "E-mail" do formulário com o e-mail do usuário.
      document.getElementById('emailUsuario').value = usuario.email;

      // Preenche o campo "Senha" do formulário. Se a senha 
      //      não estiver disponível, deixa-o vazio.
      document.getElementById('senhaUsuario').value = usuario.senha || '';

      // Preenche o campo "Idade" com a idade do usuário.
      document.getElementById('idadeUsuario').value = usuario.idade;

    }
  }


// Seleciona o formulário de cadastro de usuário pelo ID e 
//      adiciona um evento para quando ele for enviado (submit).
document.getElementById('cadastroUsuarioForm').addEventListener('submit', async (e) => {

    // Impede que o comportamento padrão do formulário 
    //      ocorra (recarregar a página ao enviar).
    e.preventDefault();

    // Obtém o valor do campo oculto 'usuarioId', que 
    //      contém o ID do usuário caso seja uma edição.
    const id = document.getElementById('usuarioId').value;

    // Obtém o valor digitado no campo de nome do usuário.
    const nome = document.getElementById('nomeUsuario').value;

    // Obtém o valor digitado no campo de e-mail do usuário.
    const email = document.getElementById('emailUsuario').value;

    // Obtém o valor digitado no campo de senha do usuário.
    const senha = document.getElementById('senhaUsuario').value;

    // Obtém o valor digitado no campo de idade, 
    //      convertendo-o para um número inteiro.
    const idade = parseInt(document.getElementById('idadeUsuario').value);


    // Verifica se há um ID informado, ou seja, se o 
    //      usuário já existe e precisa ser atualizado.
    if (id) {

      // Faz uma requisição HTTP para atualizar os 
      //      dados do usuário existente.
      await fetch(`http://localhost:3000/usuarios/${id}`, {
      
          // Define o método HTTP como PUT, utilizado para 
          //      atualizar dados já existentes.
          method: 'PUT',
      
          // Especifica o cabeçalho da requisição para indicar 
          //      que o conteúdo é do tipo JSON.
          headers: { 'Content-Type': 'application/json' },
      
          // Converte o objeto contendo os dados do usuário em 
          //      JSON e o envia no corpo da requisição.
          body: JSON.stringify({ nome, email, senha, idade })

      });

      // Exibe um alerta informando que o usuário foi 
      //      atualizado com sucesso.
      alert('Usuário atualizado com sucesso!');

    } else {

      // Caso não haja ID, significa que um novo usuário deve ser cadastrado.
      // Faz uma requisição HTTP para criar um novo usuário no servidor.
      await fetch('http://localhost:3000/usuarios', {

          // Define o método HTTP como POST, utilizado para 
          //      criar novos registros no servidor.
          method: 'POST',

          // Especifica o cabeçalho da requisição para 
          //      indicar que o conteúdo é do tipo JSON.
          headers: { 'Content-Type': 'application/json' },
          
          // Converte o objeto contendo os dados do novo 
          //      usuário em JSON e o envia no corpo da requisição.
          body: JSON.stringify({ nome, email, senha, idade })

      });

      // Exibe um alerta informando que o novo usuário 
      //      foi cadastrado com sucesso.
      alert('Usuário cadastrado com sucesso!');

    }

    // Redireciona o usuário para a página de listagem de 
    //      usuários após o cadastro ou atualização.
    window.location.href = 'listaUsuarios.html';

  });
}

// ========================================================
// FUNÇÕES - FORNECEDORES
// ========================================================
// Define uma função assíncrona para carregar a lista de 
//      fornecedores do banco de dados.
async function carregarFornecedores() {

  // Obtém o valor digitado no campo de filtro e 
  //      converte para letras minúsculas,
  //      permitindo a busca sem diferenciação 
  //      entre maiúsculas e minúsculas.
  const filtro = document.getElementById('filtroFornecedor').value.toLowerCase();

  // Faz uma requisição assíncrona para buscar 
  //      todos os fornecedores no servidor.
  const response = await fetch('http://localhost:3000/fornecedores');

  // Converte a resposta do servidor de JSON 
  //      para um objeto JavaScript.
  const fornecedores = await response.json();

  // Obtém a referência do elemento HTML onde os 
  //      fornecedores serão listados.
  const lista = document.getElementById('listaFornecedores');

  // Limpa o conteúdo atual da lista para evitar 
  //      duplicação de informações.
  lista.innerHTML = '';

  // Filtra os fornecedores com base no texto 
  //      digitado no campo de filtro.
  // Apenas fornecedores cujo nome contenha o texto 
  //      digitado serão exibidos.
  fornecedores
  .filter(f => f.nome.toLowerCase().includes(filtro))
  .forEach(forn => {

    // Cria um novo elemento de linha (<tr>) para a 
    //      tabela de fornecedores.
    const tr = document.createElement('tr');

    // Define o conteúdo HTML da linha com as 
    //      informações do fornecedor.
    tr.innerHTML = `
      <td>${forn.nome}</td> <!-- Exibe o nome do fornecedor -->
      <td>${forn.telefone}</td> <!-- Exibe o telefone do fornecedor -->
      <td>${forn.email}</td> <!-- Exibe o e-mail do fornecedor -->
      <td class="actions"> <!-- Cria uma célula para ações (Editar e Excluir) -->

        <!-- Botão de edição: chama a função 'editarFornecedor' passando o ID do fornecedor -->
        <button class="edit" onclick="editarFornecedor('${forn._id}')">Editar</button>

        <!-- Botão de exclusão: chama a função 'deletarFornecedor' passando o ID do fornecedor -->
        <button class="delete" onclick="deletarFornecedor('${forn._id}')">Excluir</button>
      
      </td>
    `;

    // Adiciona a linha recém-criada à lista de 
    //      fornecedores na tabela.
    lista.appendChild(tr);

  });

}

// Função para redirecionar o usuário para a 
//      página de edição de fornecedores
// Parâmetro: 'id' - Identificador único do 
//      fornecedor que será editado.
function editarFornecedor(id) {

  // Atualiza a URL para abrir a página de cadastro de 
  //      fornecedores, passando o ID do fornecedor 
  //      como parâmetro na URL.
  window.location.href = `cadastroFornecedor.html?id=${id}`;

}


// Função assíncrona para deletar um fornecedor do sistema
// Parâmetro: 'id' - Identificador único do fornecedor que será excluído.
async function deletarFornecedor(id) {

  // Exibe uma caixa de confirmação para garantir que o 
  //      usuário deseja excluir o fornecedor.
  if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
    
    // Faz uma requisição HTTP para deletar o 
    //      fornecedor no servidor.
    await fetch(`http://localhost:3000/fornecedores/${id}`, { method: 'DELETE' });

    // Exibe um alerta informando que o fornecedor 
    //      foi removido com sucesso.
    alert('Fornecedor removido com sucesso!');

    // Atualiza a lista de fornecedores para 
    //      refletir a exclusão do fornecedor.
    carregarFornecedores();

  }
}


// Declara uma função assíncrona chamada "prepararFormularioFornecedor".
// "Assíncrona" significa que algumas partes do código 
//      podem levar tempo para serem executadas,
// e o JavaScript pode continuar rodando outras partes do 
//      código enquanto espera a resposta.
async function prepararFormularioFornecedor() {

  // Criamos um objeto que representa os parâmetros da URL atual.
  // Isso nos permite extrair informações que foram 
  //      passadas na URL, como o ID do fornecedor.
  const urlParams = new URLSearchParams(window.location.search);

  // Pegamos o valor do parâmetro "id" da URL, se existir.
  // Se um ID foi passado na URL, isso significa que o 
  //      usuário quer editar um fornecedor existente.
  // Se não houver ID, significa que o usuário quer   
  //      cadastrar um novo fornecedor.
  const fornecedorId = urlParams.get('id');

  // Se "fornecedorId" não for nulo (ou seja, se houver um ID na URL),
  // significa que estamos no modo de edição de um 
  //      fornecedor já cadastrado.
  if (fornecedorId) {

    // Encontra no documento HTML o elemento com o 
    //      ID "tituloFornecedor" e altera o seu texto.
    // Isso muda o título da página de "Cadastrar Fornecedor" 
    //      para "Editar Fornecedor",
    // informando ao usuário que ele está editando um 
    //      fornecedor existente.
    document.getElementById('tituloFornecedor').textContent = 'Editar Fornecedor';

    // Faz uma solicitação ao servidor para buscar os 
    //      dados do fornecedor que tem esse ID.
    // "fetch" é uma função que permite buscar informações 
    //      de um servidor remoto.
    // `await` faz com que o código espere até receber uma 
    //      resposta do servidor antes de continuar.
    const response = await fetch(`http://localhost:3000/fornecedores/${fornecedorId}`);

    // Converte a resposta do servidor de texto para um 
    //      formato JSON (um formato de dados estruturado).
    // JSON é um tipo de dado que o JavaScript entende 
    //      bem e pode manipular facilmente.
    const fornecedor = await response.json();

    // Verificamos se os dados do fornecedor foram encontrados.
    // Se o servidor retornou um fornecedor válido, então 
    //      podemos preencher os campos do formulário.
    if (fornecedor) {

      // Preenche o campo oculto "fornecedorId" no 
      //      formulário com o ID do fornecedor.
      // Esse ID é importante porque, ao salvar as alterações, 
      //      precisamos saber qual fornecedor está sendo atualizado.
      document.getElementById('fornecedorId').value = fornecedor._id;

      // Preenche o campo do nome do fornecedor com o nome que veio do servidor.
      // Isso permite que o usuário veja o nome atual e, se necessário, o edite.
      document.getElementById('nomeFornecedor').value = fornecedor.nome;

      // Preenche o campo de telefone com o número de telefone do fornecedor.
      // Assim, o usuário pode visualizar ou atualizar essa informação facilmente.
      document.getElementById('telefoneFornecedor').value = fornecedor.telefone;

      // Preenche o campo de e-mail com o e-mail do fornecedor.
      // Isso garante que o usuário possa editar ou 
      //      confirmar essa informação antes de salvar.
      document.getElementById('emailFornecedor').value = fornecedor.email;

    }

  }

  // Adiciona um evento ao formulário de cadastro de 
  //      fornecedores para capturar o envio do formulário.
  document.getElementById('cadastroFornecedorForm').addEventListener('submit', async (e) => {

    // Previne o comportamento padrão do formulário, que 
    //      seria recarregar a página ao enviar os dados.
    e.preventDefault();

    // Obtém o valor do campo oculto "fornecedorId", que 
    //      contém o ID do fornecedor.
    // Esse campo será preenchido apenas se estivermos 
    //      editando um fornecedor existente.
    const id = document.getElementById('fornecedorId').value;

    // Obtém o valor do campo "nomeFornecedor", que o 
    //      usuário digitou ou que já estava preenchido.
    // Esse será o nome do fornecedor salvo no banco de dados.
    const nome = document.getElementById('nomeFornecedor').value;

    // Obtém o valor do campo "telefoneFornecedor", que 
    //      representa o telefone do fornecedor.
    // O usuário pode editar esse campo antes de enviar o formulário.
    const telefone = document.getElementById('telefoneFornecedor').value;

    // Obtém o valor do campo "emailFornecedor", que 
    //      representa o e-mail do fornecedor.
    // Esse dado será salvo ou atualizado no banco de dados.
    const email = document.getElementById('emailFornecedor').value;


    // Verifica se o campo "id" está preenchido.
    // Se estiver preenchido, significa que estamos 
    //      editando um fornecedor existente.
    if (id) {

        // Faz uma requisição HTTP para a API do servidor 
        //      para atualizar os dados do fornecedor existente.
        await fetch(`http://localhost:3000/fornecedores/${id}`, {

            // Define o método HTTP como "PUT", que é usado para 
            //      atualizar informações já existentes no banco de dados.
            method: 'PUT',

            // Define o cabeçalho da requisição, informando que os 
            //      dados serão enviados no formato JSON.
            headers: { 'Content-Type': 'application/json' },

            // Converte os dados do fornecedor (nome, telefone, e-mail) em 
            //      formato JSON para serem enviados na requisição.
            body: JSON.stringify({ nome, telefone, email })
            
        });

        // Exibe um alerta para o usuário informando que a 
        //      atualização foi concluída com sucesso.
        alert('Fornecedor atualizado com sucesso!');
        
    } else {

        // Se o campo "id" estiver vazio, significa que 
        //      estamos cadastrando um novo fornecedor.
        // Nesse caso, a requisição será enviada para a API 
        //      para criar um novo fornecedor.
        await fetch('http://localhost:3000/fornecedores', {

            // Define o método HTTP como "POST", que é usado para 
            //      inserir novos dados no banco de dados.
            method: 'POST',

            // Define o cabeçalho da requisição, informando que os 
            //      dados serão enviados no formato JSON.
            headers: { 'Content-Type': 'application/json' },

            // Converte os dados do fornecedor (nome, telefone, e-mail) em 
            //      formato JSON para serem enviados na requisição.
            body: JSON.stringify({ nome, telefone, email })
            
        });

        // Exibe um alerta para o usuário informando que o 
        //      fornecedor foi cadastrado com sucesso.
        alert('Fornecedor cadastrado com sucesso!');

    }

    // Redireciona o usuário para a página que lista todos os
    //      fornecedores cadastrados após o cadastro ou edição.
    window.location.href = 'listaFornecedores.html';

  });
}

// ========================================================
// FUNÇÕES - PRODUTOS
// ========================================================
// Função assíncrona para carregar a lista de produtos do servidor
async function carregarProdutos() {

  // Obtém o valor do campo de filtro digitado pelo usuário e 
  //      converte para letras minúsculas.
  // Isso garante que a busca não seja sensível a 
  //      maiúsculas e minúsculas.
  const filtro = document.getElementById('filtroProduto').value.toLowerCase();

  // Faz uma requisição para o servidor buscando todos os 
  //      produtos cadastrados.
  const response = await fetch('http://localhost:3000/produtos');

  // Converte a resposta da requisição em um objeto 
  //      JavaScript (um array de produtos).
  const produtos = await response.json();

  // Obtém a referência do elemento da tabela onde os 
  //      produtos serão listados.
  const lista = document.getElementById('listaProdutos');

  // Limpa a lista de produtos antes de exibir os 
  //      novos resultados.
  lista.innerHTML = '';

  // Filtra os produtos com base no texto digitado  
  //      pelo usuário no campo de pesquisa.
  produtos

  // Converte o nome do produto para minúsculas e 
  //      verifica se contém o termo digitado.
  .filter(p => p.nome.toLowerCase().includes(filtro))
  
  // Para cada produto que passou no filtro, 
  //      executa a função abaixo.
  .forEach(p => { 

      // Verifica se o produto tem um fornecedor cadastrado.
      // Se tiver, armazena o nome do fornecedor; se 
      //      não, exibe um traço "-".
      const fornecedorNome = p.fornecedor ? p.fornecedor.nome : '-';

      // Cria um novo elemento de linha (`<tr>`) para ser 
      //      adicionado à tabela de produtos.
      const tr = document.createElement('tr');

      // Define o conteúdo HTML da linha, preenchendo cada 
      //      célula (`<td>`) com os dados do produto.
      tr.innerHTML = `

          <!-- Exibe o código do produto -->
          <td>${p.codigo}</td>

          <!-- Exibe o nome do produto -->
          <td>${p.nome}</td>

          <!-- Exibe o nome do fornecedor, ou "-" se não houver fornecedor associado -->
          <td>${fornecedorNome}</td>

          <!-- Exibe o preço do produto formatado com duas casas decimais -->
          <td>R$ ${p.preco.toFixed(2)}</td>

          <!-- Exibe a quantidade disponível do produto no estoque -->
          <td>${p.quantidadeEstoque}</td>

          <!-- Célula de ações, contendo botões de editar e excluir -->
          <td class="actions">

              <!-- Botão para editar o produto, passando o ID do produto como parâmetro -->
              <button class="edit" onclick="editarProduto('${p._id}')">Editar</button>

              <!-- Botão para excluir o produto, passando o ID do produto como parâmetro -->
              <button class="delete" onclick="deletarProduto('${p._id}')">Excluir</button>

          </td>
      `;

      // Adiciona a nova linha (`<tr>`) à tabela de 
      //      produtos na interface do usuário.
      lista.appendChild(tr);

  });

}

// Função para redirecionar o usuário para a página de 
//      edição de um produto específico.
function editarProduto(id) {

    // Define o endereço da página de cadastro do produto, 
    //      incluindo o ID do produto na URL.
    // Isso permite que a página de edição carregue os 
    //      dados do produto correspondente.
    window.location.href = `cadastroProduto.html?id=${id}`;

}


// Função assíncrona para excluir um produto do banco de dados
async function deletarProduto(id) {

    // Exibe uma caixa de confirmação para o usuário 
    //      antes de excluir o produto
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        
        // Faz uma requisição HTTP para deletar o 
        //      produto com o ID especificado
        await fetch(`http://localhost:3000/produtos/${id}`, { method: 'DELETE' });

        // Exibe um alerta informando que o produto 
        //      foi removido com sucesso
        alert('Produto removido com sucesso!');

        // Atualiza a lista de produtos na tela para 
        //      refletir a exclusão
        carregarProdutos();

    }
}


// Define uma função assíncrona para preparar o formulário de produto
// "Assíncrona" significa que essa função pode executar 
//      operações que demoram (como buscar dados do servidor)
//      sem travar o navegador.
async function prepararFormularioProduto() {

    // Pega o campo de seleção de fornecedores dentro do  
    //      formulário de cadastro/edição de produto.
    // Esse campo será preenchido com os fornecedores 
    //      cadastrados no sistema.
    const selForn = document.getElementById('fornecedorProduto');

    // Chama uma função que busca os fornecedores do banco 
    //      de dados e os coloca dentro do campo de seleção.
    // O "await" faz com que o código espere essa função 
    //      terminar antes de continuar.
    await carregarFornecedoresNoSelect(selForn);

    // Agora, pegamos os parâmetros da URL (o endereço da página). 
    // Isso serve para saber se estamos
    //      criando um novo produto ou editando um 
    //      produto que já existe.
    const urlParams = new URLSearchParams(window.location.search);

    // Aqui tentamos pegar o "id" do produto que pode estar na URL.
    // Exemplo: se estivermos na página "cadastroProduto.html?id=123", o 
    //      id do produto será "123".
    const produtoId = urlParams.get('id');

    // Se "produtoId" não for "null", significa que 
    //      estamos editando um produto que já existe
    if (produtoId) { 

    // Encontra o elemento HTML que tem o ID 'tituloProduto' e 
    //      altera seu texto para 'Editar Produto'.
    // Isso serve para indicar visualmente que o usuário está 
    //      editando um produto e não criando um novo.
    document.getElementById('tituloProduto').textContent = 'Editar Produto';

    // Faz uma requisição para o servidor para buscar os 
    //      dados do produto que será editado.
    // `fetch` é usado para buscar informações de um servidor. 
    //  Aqui, estamos acessando a API no endereço:
    //      "http://localhost:3000/produtos/" seguido do ID do 
    //      produto que foi passado pela URL.
    const response = await fetch(`http://localhost:3000/produtos/${produtoId}`);

    // Converte a resposta do servidor para um objeto JavaScript.
    // A resposta do `fetch` vem no formato JSON (um 
    //      tipo de texto estruturado). 
    // O `await response.json()` pega esse texto e transforma 
    //      ele em um objeto que podemos usar no código.
    const produto = await response.json();

    // Verifica se o produto foi encontrado na resposta da API
    if (produto) {
          
      // Preenche o campo oculto 'produtoId' com o ID do 
      //      produto para que ele seja enviado ao backend ao salvar a edição
      document.getElementById('produtoId').value = produto._id;

      // Preenche o campo de código do produto com o 
      //      código vindo do servidor
      document.getElementById('codigoProduto').value = produto.codigo;

      // Preenche o campo de nome do produto com o 
      //      nome vindo do servidor
      document.getElementById('nomeProduto').value = produto.nome;

      // Preenche o campo de descrição do produto com a 
      //      descrição salva no banco de dados
      document.getElementById('descricaoProduto').value = produto.descricao;

      // Preenche o campo de preço do produto com o 
      //      valor que está salvo no banco
      document.getElementById('precoProduto').value = produto.preco;

      // Preenche o campo de estoque do produto com a 
      //      quantidade disponível no banco de dados
      document.getElementById('estoqueProduto').value = produto.quantidadeEstoque;

      // Se o produto tem um fornecedor associado, seleciona o 
      //      fornecedor correto na lista suspensa
      if (produto.fornecedor) {
        selForn.value = produto.fornecedor._id;
      }
    }

  }

  // Seleciona o formulário de cadastro do produto e 
  //      adiciona um ouvinte de evento para o envio do formulário
  document.getElementById('cadastroProdutoForm').addEventListener('submit', async (e) => {

    // Previne o comportamento padrão do 
    //      formulário (que recarregaria a página)
    e.preventDefault();

    // Pega o valor do campo oculto 'produtoId', usado para 
    //      identificar se é uma edição ou um novo cadastro
    const id = document.getElementById('produtoId').value;

    // Obtém o código do produto digitado pelo usuário no campo de entrada
    const codigo = document.getElementById('codigoProduto').value;

    // Obtém o nome do produto digitado pelo usuário
    const nome = document.getElementById('nomeProduto').value;

    // Obtém a descrição do produto digitada pelo usuário
    const descricao = document.getElementById('descricaoProduto').value;

    // Obtém o preço do produto digitado e converte 
    //      para um número decimal (float)
    const preco = parseFloat(document.getElementById('precoProduto').value);

    // Obtém a quantidade em estoque digitada e 
    //      converte para um número inteiro (int)
    const quantidadeEstoque = parseInt(document.getElementById('estoqueProduto').value);

    // Obtém o fornecedor selecionado na lista 
    //      suspensa (dropdown), ou null caso nenhum tenha sido escolhido
    const fornecedor = selForn.value || null;

    // Verifica se existe um ID, ou seja, se estamos 
    //      editando um produto existente
    if (id) {

      // Envia uma requisição HTTP para atualizar os 
      //      dados do produto no servidor
      await fetch(`http://localhost:3000/produtos/${id}`, { 

          // Especifica que o método HTTP utilizado será "PUT", 
          //      que é usado para atualizar dados existentes
          method: 'PUT',

          // Define o cabeçalho da requisição, informando que 
          //      os dados estão no formato JSON
          headers: { 'Content-Type': 'application/json' },

          // Converte os dados do produto para um formato 
          //      JSON antes de enviá-los ao servidor
          body: JSON.stringify({ codigo, nome, descricao, preco, quantidadeEstoque, fornecedor })
      });

      // Exibe um alerta na tela informando que o produto 
      //      foi atualizado com sucesso
      alert('Produto atualizado com sucesso!');

    } else { // Se não houver um ID, significa que estamos 
             //      cadastrando um novo produto

      // Envia uma requisição HTTP para cadastrar um 
      //      novo produto no servidor
      await fetch('http://localhost:3000/produtos', { 

          // Especifica que o método HTTP utilizado será "POST", 
          //      que é usado para criar novos registros
          method: 'POST',

          // Define o cabeçalho da requisição, informando que os 
          //      dados estão no formato JSON
          headers: { 'Content-Type': 'application/json' },

          // Converte os dados do novo produto para um 
          //      formato JSON antes de enviá-los ao servidor
          body: JSON.stringify({ codigo, nome, descricao, preco, quantidadeEstoque, fornecedor })

      });

      // Exibe um alerta na tela informando que o 
      //      produto foi cadastrado com sucesso
      alert('Produto cadastrado com sucesso!');

    }

    // Após cadastrar ou atualizar o produto, redireciona o 
    //    usuário para a página de listagem de produtos
    window.location.href = 'listaProdutos.html';

  });
}

// ========================================================
// FUNÇÕES - CLIENTES
// ========================================================

// Define uma função assíncrona chamada 'carregarClientes', que 
//      será responsável por buscar e exibir os clientes na tela
async function carregarClientes() {

  // Obtém o valor digitado no campo de filtro de clientes e 
  //      converte para letras minúsculas para facilitar a busca
  const filtro = document.getElementById('filtroCliente').value.toLowerCase();

  // Faz uma requisição HTTP para buscar a lista de clientes do servidor
  const response = await fetch('http://localhost:3000/clientes');

  // Converte a resposta da requisição para um formato 
  //      JSON (estrutura de dados que podemos manipular no JavaScript)
  const clientes = await response.json();

  // Obtém a referência do elemento HTML onde a 
  //      lista de clientes será exibida
  const lista = document.getElementById('listaClientes');

  // Limpa a lista antes de adicionar novos clientes, 
  //      garantindo que os dados sejam sempre atualizados corretamente
  lista.innerHTML = '';

  // Filtra a lista de clientes com base no texto 
  //      digitado no campo de busca
  clientes

  .filter(c =>

      // Converte o nome do cliente para letras minúsculas e 
      //      verifica se contém o texto digitado no filtro
      c.nome.toLowerCase().includes(filtro) ||

      // Converte o CPF do cliente para letras minúsculas e 
      //      verifica se contém o texto digitado no filtro
      c.cpf.toLowerCase().includes(filtro)

  )

  .forEach(cli => {

      // Cria um novo elemento de linha (<tr>) para a tabela
      const tr = document.createElement('tr');

      // Define o conteúdo da linha usando `innerHTML`
      tr.innerHTML = `

          <!-- Exibe o CPF do cliente na primeira coluna -->
          <td>${cli.cpf}</td>
          
          <!-- Exibe o nome do cliente na segunda coluna -->
          <td>${cli.nome}</td>
          
          <!-- Exibe o telefone do cliente na terceira coluna; se não 
                  houver telefone, exibe uma string vazia -->
          <td>${cli.telefone || ''}</td>
          
          <!-- Exibe o endereço do cliente na quarta coluna; se não 
                  houver endereço, exibe uma string vazia -->
          <td>${cli.endereco || ''}</td>
          
          <!-- Adiciona os botões de ação na última coluna -->
          <td class="actions">

              <!-- Botão para editar o cliente, chamando a função 
                    editarCliente passando o ID do cliente -->
              <button class="edit" onclick="editarCliente('${cli._id}')">Editar</button>
              
              <!-- Botão para excluir o cliente, chamando a função 
                    deletarCliente passando o ID do cliente -->
              <button class="delete" onclick="deletarCliente('${cli._id}')">Excluir</button>

          </td>
      `;

      // Adiciona a nova linha criada dentro do elemento da tabela 
      //      onde a lista de clientes está sendo exibida
      lista.appendChild(tr);

  });

}

// Função para editar um cliente existente
function editarCliente(id) {

    // Redireciona o usuário para a página de cadastro de clientes
    // e passa o ID do cliente na URL como parâmetro
    window.location.href = `cadastroCliente.html?id=${id}`;

}


// Função assíncrona para excluir um cliente do sistema
async function deletarCliente(id) {
    
    // Exibe uma caixa de diálogo perguntando ao usuário se ele 
    //      tem certeza que deseja excluir o cliente
    // Isso evita que o usuário apague um cliente por engano
    if (confirm('Tem certeza que deseja excluir este cliente?')) {

        // Aqui, estamos fazendo uma requisição para o servidor 
        //      para excluir o cliente com o ID especificado
        // O `fetch` é uma função do JavaScript que permite fazer 
        //      chamadas para um servidor na internet
        // Estamos chamando o endereço `http://localhost:3000/clientes/${id}`
        // `localhost:3000` significa que estamos chamando um servidor 
        //      que está rodando na nossa própria máquina
        // `/clientes/${id}` significa que estamos acessando a API de 
        //      clientes e passando o ID do cliente que queremos excluir
        // O `{ method: 'DELETE' }` indica que queremos deletar um dado 
        //      do servidor (é um método HTTP chamado "DELETE")
        await fetch(`http://localhost:3000/clientes/${id}`, { method: 'DELETE' });

        // Se o servidor responder corretamente, exibimos um alerta 
        //      informando ao usuário que o cliente foi excluído
        alert('Cliente removido com sucesso!');

        // Como acabamos de excluir um cliente, precisamos atualizar a 
        //      lista na tela para que ele desapareça
        // Chamamos a função `carregarClientes()`, que vai buscar os 
        //      clientes novamente e atualizar a exibição
        carregarClientes();

    }
}


// Função assíncrona que prepara o formulário de 
//      cadastro/edição de clientes
async function prepararFormularioCliente() {
  
  // `URLSearchParams` é um objeto do JavaScript que 
  //      permite trabalhar com parâmetros da URL.
  // Aqui, estamos criando um novo objeto `urlParams` que 
  //      nos ajudará a obter informações da URL da página.
  const urlParams = new URLSearchParams(window.location.search);
  
  // `get('id')` busca o valor do parâmetro 'id' na URL.
  // Se a URL for algo como `cadastroCliente.html?id=12345`, 
  //      então `clienteId` receberá o valor `12345`.
  // Se não houver um parâmetro 'id' na URL, `clienteId` 
  //      será `null`, indicando que estamos cadastrando um novo cliente.
  const clienteId = urlParams.get('id');

  // Verifica se `clienteId` tem um valor (ou seja, se 
  //      estamos editando um cliente existente)
  if (clienteId) {
      
    // Atualiza o título da página para "Editar Cliente", 
    //      pois estamos modificando um cliente já cadastrado
    document.getElementById('tituloCliente').textContent = 'Editar Cliente';

    // Faz uma requisição HTTP para obter os dados do 
    //      cliente com o ID correspondente no backend
    // `fetch` envia um pedido para a URL 'http://localhost:3000/clientes/{clienteId}'
    const response = await fetch(`http://localhost:3000/clientes/${clienteId}`);
    
    // Converte a resposta recebida do backend para um objeto JavaScript
    // O backend retorna um JSON contendo os dados do cliente, e 
    //      `response.json()` transforma isso em um objeto
    const cliente = await response.json();

    // Se `cliente` não for `null` ou `undefined` (ou seja, se 
    //      os dados do cliente foram recebidos corretamente)
    if (cliente) {

        // Preenche o campo oculto `clienteId` com o ID do cliente 
        //      para ser usado na atualização posteriormente
        document.getElementById('clienteId').value = cliente._id;

        // Preenche o campo de CPF com o CPF do cliente obtido no banco de dados
        document.getElementById('cpfCliente').value = cliente.cpf;

        // Preenche o campo de Nome com o nome do cliente 
        //      obtido no banco de dados
        document.getElementById('nomeCliente').value = cliente.nome;

        // Preenche o campo de Telefone com o telefone do 
        //      cliente obtido no banco de dados
        document.getElementById('telefoneCliente').value = cliente.telefone;

        // Preenche o campo de Endereço com o endereço do 
        //      cliente obtido no banco de dados
        document.getElementById('enderecoCliente').value = cliente.endereco;

    }
  }

  // Adiciona um evento ao formulário de cadastro do cliente para 
  //      ser executado quando o botão de "Enviar" for clicado
  document.getElementById('cadastroClienteForm').addEventListener('submit', async (e) => {

    // Impede que o comportamento padrão do formulário 
    //      ocorra (ou seja, impede que a página seja recarregada)
    e.preventDefault();

    // Obtém o valor do campo oculto 'clienteId', que indica 
    //      se estamos editando um cliente existente
    const id = document.getElementById('clienteId').value;

    // Obtém o valor do campo 'cpfCliente', onde o 
    //      usuário digitou o CPF do cliente
    const cpf = document.getElementById('cpfCliente').value;

    // Obtém o valor do campo 'nomeCliente', onde o 
    //      usuário digitou o nome do cliente
    const nome = document.getElementById('nomeCliente').value;

    // Obtém o valor do campo 'telefoneCliente', onde o 
    //      usuário digitou o telefone do cliente
    const telefone = document.getElementById('telefoneCliente').value;

    // Obtém o valor do campo 'enderecoCliente', onde o 
    //      usuário digitou o endereço do cliente
    const endereco = document.getElementById('enderecoCliente').value;

    // Verifica se existe um ID no campo oculto 'clienteId'
    // Se existir, significa que estamos editando um 
    //      cliente já cadastrado
    if (id) {
        
      // Envia uma requisição HTTP para o backend (servidor) 
      //      para atualizar os dados do cliente existente
      await fetch(`http://localhost:3000/clientes/${id}`, { 
          
          // Especifica que estamos enviando uma requisição do 
          //      tipo PUT, usada para atualizar dados
          method: 'PUT',

          // Define o cabeçalho da requisição, informando que 
          //      estamos enviando dados no formato JSON
          headers: { 'Content-Type': 'application/json' },

          // Converte os dados do cliente (CPF, nome, telefone e 
          //      endereço) para o formato JSON e os envia para o servidor
          body: JSON.stringify({ cpf, nome, telefone, endereco }) 
      });

      // Exibe um alerta na tela informando que o cliente 
      //      foi atualizado com sucesso
      alert('Cliente atualizado com sucesso!');

    } else {
      
      // Se não houver um ID, significa que estamos 
      //      cadastrando um novo cliente

      // Envia uma requisição HTTP para o backend para criar um novo cliente
      await fetch('http://localhost:3000/clientes', {

          // Especifica que estamos enviando uma requisição do 
          //      tipo POST, usada para criar novos registros no banco de dados
          method: 'POST',

          // Define o cabeçalho da requisição, informando 
          //      que os dados estão no formato JSON
          headers: { 'Content-Type': 'application/json' },

          // Converte os dados do cliente (CPF, nome, telefone e endereço) 
          //      para o formato JSON e os envia para o servidor
          body: JSON.stringify({ cpf, nome, telefone, endereco }) 
      });

      // Exibe um alerta na tela informando que o 
      //      cliente foi cadastrado com sucesso
      alert('Cliente cadastrado com sucesso!');
    }

    // Redireciona o usuário para a página de listagem de 
    //      clientes após o cadastro ou edição
    window.location.href = 'listaClientes.html';

  });
}

// ========================================================
// FUNÇÕES AUXILIARES
// ========================================================

// Declara uma função assíncrona chamada 'carregarFornecedoresNoSelect' 
// que recebe como parâmetro um elemento <select> (caixa de seleção no HTML)
async function carregarFornecedoresNoSelect(selectElement) {

  // Faz uma requisição HTTP para o backend (servidor) 
  //      buscando a lista de fornecedores cadastrados
  const resp = await fetch('http://localhost:3000/fornecedores');

  // Converte a resposta do servidor de JSON para um 
  //      array de objetos JavaScript
  const fornecedores = await resp.json();

  // Percorre a lista de fornecedores obtida do servidor
  fornecedores.forEach(f => {

    // Cria um novo elemento <option> para ser inserido no <select>
    const opt = document.createElement('option');

    // Define o valor do <option> como o ID do fornecedor, 
    //      para identificar cada fornecedor de forma única
    opt.value = f._id;

    // Define o texto que será exibido dentro do <option> 
    //      como o nome do fornecedor
    opt.textContent = f.nome;

    // Adiciona o <option> criado dentro do <select>      
    //      passado como parâmetro para a função
    selectElement.appendChild(opt);

  });
}


// Declara uma função assíncrona chamada 'carregarProdutosNoSelect'
// que recebe como parâmetro um elemento <select> (caixa de seleção no HTML)
async function carregarProdutosNoSelect(selectElement) {

  // Faz uma requisição HTTP para o backend (servidor) 
  //      buscando a lista de produtos cadastrados
  const resp = await fetch('http://localhost:3000/produtos');

  // Converte a resposta do servidor de JSON para um 
  //      array de objetos JavaScript
  const produtos = await resp.json();

  // Percorre a lista de produtos obtida do servidor
  produtos.forEach(p => {

    // Cria um novo elemento <option> para ser inserido no <select>
    const opt = document.createElement('option');

    // Define o valor do <option> como o ID do produto, 
    //      para identificar cada produto de forma única
    opt.value = p._id;

    // Define o texto que será exibido dentro do <option> 
    //      como o nome do produto
    opt.textContent = p.nome;

    // Adiciona o <option> criado dentro do <select> 
    //      passado como parâmetro para a função
    selectElement.appendChild(opt);
    
  });
}


// ========================================================
// RELATÓRIO
// ========================================================

// Função assíncrona para carregar o relatório de Vendas,
// recebendo filtros de dataInicial, dataFinal, fornecedor, produto, e cpf
// Função assíncrona para carregar os dados do relatório de vendas
// Recebe como parâmetros opcionais: dataInicial, dataFinal, 
//      fornecedor, produto e CPF do cliente
// Se nenhum parâmetro for passado, assume valores padrão vazios ('')
async function carregarRelatorio(dataInicial = '', dataFinal = '', fornecedor = '', produto = '', cpf = '') {

  try {

    // Criamos um objeto `URLSearchParams` que será usado para 
    //      construir a string de parâmetros da URL
    // Essa abordagem facilita a criação de URLs dinâmicas sem 
    //      precisar concatenar manualmente os parâmetros
    const params = new URLSearchParams();

    // Verificamos se `dataInicial` foi fornecida. Se sim, 
    //      adicionamos ao objeto `params`
    // A função `.append(chave, valor)` adiciona um par chave-valor à URL
    if (dataInicial) params.append('dataInicial', dataInicial);

    // Se `dataFinal` foi fornecida, também adicionamos à URL
    if (dataFinal) params.append('dataFinal', dataFinal);

    // Se `fornecedor` foi informado, adicionamos o nome do 
    //      fornecedor como um parâmetro da URL
    if (fornecedor) params.append('fornecedorNome', fornecedor);

    // Se `produto` foi informado, adicionamos o nome do 
    //      produto como um parâmetro da URL
    if (produto) params.append('produtoNome', produto);

    // Se `cpf` foi informado, adicionamos o CPF do cliente 
    //      como um parâmetro da URL
    if (cpf) params.append('cpfCliente', cpf);


    // Criamos a URL da requisição para buscar o relatório de vendas
    // Concatenamos a base da URL (`http://127.0.0.1:3000/relatorio/vendas`) 
    //      com os parâmetros gerados anteriormente
    // `params.toString()` converte o objeto `URLSearchParams` em uma 
    //      string de consulta (query string), como:
    // "dataInicial=2025-03-10&dataFinal=2025-03-15&fornecedorNome=Nestle"
    const url = `http://127.0.0.1:3000/relatorio/vendas?${params.toString()}`;

    // Exibimos no console a URL final da requisição para depuração
    // Isso permite verificar se os parâmetros foram corretamente 
    //      adicionados à URL antes da requisição
    console.log('Carregando relatório:', url);

    // Usamos a função `fetch` para fazer a requisição HTTP para o servidor
    // `await` faz com que o código aguarde a resposta da 
    //      requisição antes de continuar
    const resposta = await fetch(url);

    // Verificamos se a resposta da requisição **não** foi 
    //      bem-sucedida (`resposta.ok === false`)
    // `resposta.ok` é `true` apenas para códigos de status 
    //      HTTP na faixa 200-299 (sucesso)
    // Se o status for 400, 500 ou outro erro, lançamos uma 
    //      exceção para tratamento posterior
    if (!resposta.ok) {
      throw new Error(`Erro ao buscar relatório. HTTP Status: ${resposta.status}`);
    }


    // Convertemos a resposta da requisição (resposta HTTP) 
    //      para um objeto JavaScript
    // Como a API retorna os dados em formato JSON (application/json), 
    //      usamos .json() para transformá-los em objeto/array
    // O `await` é necessário pois a conversão também é 
    //      uma operação assíncrona
    const vendas = await resposta.json();

    // Exibimos no console o conteúdo recebido da API, que será um array de vendas
    // Isso é útil para depuração, ajudando o desenvolvedor a 
    //      verificar se os dados foram carregados corretamente
    console.log('Vendas recebidas:', vendas);

    // Selecionamos o corpo da tabela HTML (dentro do <tbody>) 
    //      onde os dados serão inseridos
    // `document.querySelector('#tabela-relatorio tbody')` busca a 
    //      tabela que tem o ID 'tabela-relatorio' e acessa apenas o corpo da tabela (<tbody>)
    // É nesse local que as linhas da tabela serão dinamicamente 
    //      criadas e adicionadas
    const tabela = document.querySelector('#tabela-relatorio tbody');

    // Limpamos qualquer conteúdo anterior da tabela antes de 
    //      adicionar novas linhas
    // Isso é fundamental para evitar que os dados se acumulem toda 
    //      vez que um novo filtro for aplicado
    // Ou seja, se o usuário aplicar um filtro de datas ou produto, os 
    //      dados anteriores são removidos antes de mostrar os novos
    tabela.innerHTML = '';

    // Inicializamos uma variável `somaTotal` com o valor 0
    // Essa variável será usada para acumular o total geral de 
    //      todas as vendas exibidas na tabela
    // A soma será usada posteriormente para atualizar o valor 
    //      que aparece em "Total Geral" no rodapé
    let somaTotal = 0;


    // Iteramos sobre cada venda presente no array "vendas"
    // A função forEach é usada para executar uma ação para cada elemento do array
    // Cada "venda" é um objeto que representa uma venda registrada no sistema
    vendas.forEach(venda => {

      // Se o campo "data" estiver presente na venda, convertemos a 
      //      data para o formato local brasileiro (dd/mm/aaaa)
      // O operador condicional ternário verifica se o campo existe; 
      //      se sim, cria um objeto Date e converte para string formatada
      // Caso contrário (data ausente ou inválida), a variável 
      //      recebe uma string vazia
      const dataVenda = venda.data ? new Date(venda.data).toLocaleDateString('pt-BR') : '';

      // Captura o CPF do cliente associado à venda
      // Se o campo "clienteCpf" estiver ausente, usa string vazia 
      //      como valor padrão (evita erro na exibição)
      const cpfCliente = venda.clienteCpf || '';

      // Captura o valor total da venda. Se estiver ausente ou 
      //      for nulo/undefined, usa 0 como valor padrão
      // O valor é somado à variável "somaTotal" para atualizar o 
      //      total geral no final
      const valorTotal = venda.total || 0;
      somaTotal += valorTotal;

      // Verificamos se o campo "itens" existe e se é um array válido
      // Cada venda pode conter vários itens (produtos vendidos 
      //      individualmente), e esse bloco percorre todos os itens dessa venda
      if (Array.isArray(venda.itens)) {

        // Iteramos sobre todos os itens da venda com outro forEach
        // Cada "item" representa um produto vendido nessa venda, 
        //      com informações como nome, quantidade, subtotal, fornecedor etc.
        venda.itens.forEach(item => {

          // Captura o nome do fornecedor do produto vendido; se 
          //      estiver ausente, usa string vazia como fallback
          const fornecedorNome = item.nomeFornecedor || '';

          // Captura o nome do produto vendido; se não existir, 
          //      define como string vazia para evitar erros de exibição
          const produtoNome = item.nomeProduto || '';

          // Captura a quantidade vendida do produto. Se ausente, 
          //      assume 0 como valor padrão
          const qtd = item.quantidade || 0;

          // Captura o subtotal (valor total do item = preço unitário x 
          //      quantidade). Se ausente, assume 0
          const sub = item.subtotal || 0;

          // Criamos uma nova linha da tabela (<tr>) para inserir os 
          //      dados do item na interface HTML
          // O método document.createElement cria dinamicamente um  
          //      elemento HTML (aqui, uma linha de tabela)
          const tr = document.createElement('tr');

          // Definimos o conteúdo HTML da linha da tabela (<tr>) usando `innerHTML`
          // Esse conteúdo é montado dinamicamente com valores 
          //      de cada venda e item
          // A template string (entre crases ``) permite interpolar 
          //      variáveis dentro do HTML
          tr.innerHTML = `
          <td>${dataVenda}</td>                
          <td>${cpfCliente}</td>               
          <td>${fornecedorNome}</td>           
          <td>${produtoNome}</td>              
          <td>${qtd}</td>                      
          <td>R$ ${sub.toFixed(2)}</td>        
          <td>R$ ${valorTotal.toFixed(2)}</td> 
          `;


          // Adiciona a linha <tr> construída à tabela de relatório 
          //      no corpo da tabela (<tbody>)
          // `appendChild` insere o elemento como o último filho do 
          //      elemento pai (neste caso, adiciona a nova linha no final da tabela)
          // Isso permite construir a tabela dinamicamente, linha por 
          //      linha, com base nos dados retornados da API
          tabela.appendChild(tr);

        });
      }
    });

    // Localiza o elemento do DOM que possui o ID 'valorTotal'
    // Este é o <span> que está na parte inferior da tela e 
    //      mostra o total geral das vendas exibidas
    // document.getElementById retorna uma referência ao 
    //      elemento HTML correspondente
    const elementoTotal = document.getElementById('valorTotal');

    // Atualiza o conteúdo de texto (textContent) do elemento 'valorTotal'
    // O método `toFixed(2)` é usado para formatar o 
    //      número com 2 casas decimais, 
    // garantindo que o valor seja exibido como moeda, ex: "128.50" → "128.50"
    // Isso melhora a experiência visual do usuário, já que 
    //      todos os valores monetários aparecem com a mesma 
    //      quantidade de casas decimais, mesmo quando o valor 
    //      for exato como "120.00"
    elementoTotal.textContent = somaTotal.toFixed(2);

  // Início do bloco de tratamento de erro 'catch'
  // Este bloco será executado **somente** se ocorrer algum 
  //      erro dentro do 'try' acima
  // Por exemplo: falha na conexão com o servidor, URL 
  //      malformada, erro de rede, etc.
  } catch (erro) {

    // Exibe a mensagem de erro completa no console do navegador
    // Isso é extremamente útil para desenvolvedores 
    //      identificarem a causa do problema
    // O console pode mostrar o tipo do erro, a linha do código, e 
    //      até mesmo a stack trace
    console.error('Erro ao carregar relatório:', erro);

    // Mostra uma janela de alerta (alert) para o usuário 
    //      final com a mensagem de erro
    // Isso garante que o usuário saiba que houve uma falha e 
    //      que os dados não foram carregados corretamente
    // O '\n' insere uma quebra de linha, separando a mensagem 
    //      explicativa do erro técnico
    alert('Erro ao carregar relatório:\n' + erro.message);

  }

}

// Adicionando evento ao formulário para filtrar ao clicar em "Filtrar"
// Adiciona um ouvinte de evento ("event listener") ao 
//      formulário com o ID 'form-filtros'
// Este ouvinte será disparado quando o formulário for 
//      enviado (evento 'submit')
document.getElementById('form-filtros').addEventListener('submit', (ev) => {

  // Impede o comportamento padrão do formulário, que seria 
  //      recarregar a página (submit tradicional)
  // Usamos isso porque estamos tratando o envio via JavaScript (AJAX)
  ev.preventDefault();

  // Captura o valor digitado no campo de data inicial (input tipo 'date')
  // O valor retornado é uma string no formato 'YYYY-MM-DD' ou 
  //      uma string vazia se nada for preenchido
  const di = document.getElementById('dataInicial').value;

  // Captura o valor do campo de data final
  const df = document.getElementById('dataFinal').value;

  // Captura o valor do campo do fornecedor, removendo 
  //      espaços extras no início e fim com .trim()
  // Isso garante que não haja erros por digitação acidental de espaços
  const forn = document.getElementById('fornecedor').value.trim();

  // Captura o valor do campo de produto, também 
  //      removendo espaços desnecessários
  const prod = document.getElementById('produto').value.trim();

  // Captura o valor digitado no campo de CPF do cliente, 
  //      também com limpeza de espaços
  const cpf = document.getElementById('cpf').value.trim();

  // Chama a função 'carregarRelatorio' passando os filtros 
  //      capturados como argumentos
  // Esses valores serão usados para montar a URL com os 
  //      parâmetros da consulta ao servidor
  carregarRelatorio(di, df, forn, prod, cpf);

});


// Carrega os últimos 7 dias ao abrir a página
// Este código é executado assim que todo o conteúdo do DOM (HTML) 
//      for completamente carregado e analisado pelo navegador.
// A função de callback passada ao 'DOMContentLoaded' garante que o 
//      código abaixo só será executado quando a estrutura da 
//      página estiver pronta.
document.addEventListener('DOMContentLoaded', () => {

  // Cria um objeto de data representando a data atual (data do 
  //      sistema no momento em que a página foi carregada).
  const hoje = new Date();

  // Cria outro objeto de data, que será usado para representar a 
  //      data de exatamente 7 dias atrás.
  const seteDiasAtras = new Date();

  // Subtrai 7 dias da data atual (do objeto 'seteDiasAtras').
  // O método 'setDate' permite alterar o dia do mês do objeto Date.
  // Aqui, estamos dizendo: "pegue o dia atual e subtraia 7", 
  //      para obter a data de uma semana atrás.
  seteDiasAtras.setDate(hoje.getDate() - 7);

  // Converte a data de 7 dias atrás para o formato ISO (padrão 
  //      internacional: "YYYY-MM-DDTHH:MM:SSZ")
  // Em seguida, usamos 'split("T")[0]' para extrair apenas a 
  //      parte da data (ignora a hora).
  // O resultado será uma string no formato "YYYY-MM-DD", que é 
  //      compatível com o campo <input type="date">
  const dataIniStr = seteDiasAtras.toISOString().split('T')[0];

  // Faz o mesmo para a data de hoje, convertendo para string 
  //      no mesmo formato "YYYY-MM-DD"
  const dataFimStr = hoje.toISOString().split('T')[0];

  // Define o valor padrão do campo de data inicial (input) no 
  //      formulário como sendo a data de 7 dias atrás.
  // Isso preenche automaticamente o campo "Data Inicial" no 
  //      formulário, para o usuário não precisar digitar.
  document.getElementById('dataInicial').value = dataIniStr;

  // Define o valor do campo "Data Final" como a data de hoje.
  // Isso garante que ao abrir a página, já haja um intervalo 
  //      de 7 dias selecionado por padrão.
  document.getElementById('dataFinal').value = dataFimStr;

  // Chama a função que carrega os dados do relatório (via AJAX), 
  //      passando como filtro o intervalo padrão de datas.
  // Neste momento, nenhum filtro de fornecedor, produto ou CPF é 
  //      enviado — apenas o intervalo de datas.
  // A tabela será preenchida automaticamente com as vendas 
  //    ocorridas nos últimos 7 dias.
  carregarRelatorio(dataIniStr, dataFimStr);

});