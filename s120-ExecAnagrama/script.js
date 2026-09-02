const palavras = [
    'CASA', 'BOLA', 'GATO', 'CHUVA', 'SOL', 'AMIGO', 'LUA', 'FOGO', 'VENTO', 'PATO',
    'LIVRO', 'MESA', 'TOALHA', 'JANELA', 'CARRO', 'ESCOLA', 'FLORESTA', 'PRAIA', 'COMPUTADOR', 'TELEFONE',
    'CADERNO', 'LAMPADA', 'ESPADA', 'DINHEIRO', 'PERFUME', 'CHAVE', 'QUADRO', 'PLANTA', 'FILME', 'MUSICA',
    'REVISTA', 'BOTAO', 'CAIXA', 'SAPATO', 'CACHORRO', 'PASSARINHO', 'CEBOLA', 'TOMATE', 'CELULAR', 'RELOGIO',
    'GARRAFA', 'COPO', 'CANETA', 'LENCOL', 'TRAVESSEIRO', 'COLHER', 'GARFO', 'PRATO', 'CORTINA', 'ESPONJA'
  ];
  
  /* Declara uma constante chamada 'palavras' que é um array 
        de strings. Cada string é uma palavra que os jogadores 
        tentarão adivinhar no jogo de anagrama. */


let palavraAleatoria = '';
/* Declara uma variável 'palavraAleatoria' inicializada 
      como uma string vazia. Esta variável será usada para 
      armazenar uma das palavras do array 'palavras' 
      escolhida aleatoriamente. */

let tentativaAtual = '';
/* Declara uma variável 'tentativaAtual', inicialmente 
      vazia, que será utilizada para armazenar as entradas 
      do usuário à medida que tentam adivinhar a palavra 
      correta. */

let pontuacao = 0;
/* Declara uma variável 'pontuacao' e inicializa-a 
      com 0. Esta variável é usada para rastrear a 
      pontuação do jogador. */

function novaPalavra() {
  /* Define uma função chamada 'novaPalavra'. Esta 
      função é usada para selecionar uma nova palavra 
      aleatória do array e preparar o jogo para uma 
      nova rodada. */

  palavraAleatoria = palavras[pontuacao % palavras.length];
  /* Atribui à variável 'palavraAleatoria' uma palavra 
        do array 'palavras'. O índice é determinado pelo 
        resto da divisão da pontuação atual pelo número 
        de palavras no array. Isso garante que a seleção 
        de palavras seja cíclica e dependa da pontuação 
        do jogador. */

  document.getElementById('palavra').innerText = embaralharPalavra(palavraAleatoria);
  /* Localiza o elemento HTML com o id 'palavra' e 
        define seu texto interno para o valor retornado 
        pela função 'embaralharPalavra', passando 
        a 'palavraAleatoria' como argumento. 
  'embaralharPalavra' é uma função que presumivelmente 
        embaralha as letras da palavra para criar um 
        anagrama que o jogador deve resolver. */

  document.getElementById('resultado').innerText = '';
  /* Localiza o elemento HTML com o id 'resultado' e 
        limpa seu conteúdo, definindo-o para uma string 
        vazia. Isso é útil para remover mensagens ou 
        resultados de tentativas anteriores quando uma 
        nova palavra é apresentada. */

  tentativaAtual = '';
  /* Reinicia a variável 'tentativaAtual', limpando as 
        entradas anteriores do usuário ao começar 
        uma nova rodada. */

}


function embaralharPalavra(palavra) {
  /* Declaração da função 'embaralharPalavra' com um 
            parâmetro 'palavra', que é a string a 
            ser embaralhada. */

  let palavraEmbaralhada = '';
  /* Inicializa uma variável 'palavraEmbaralhada' como 
            uma string vazia. Esta variável armazenará a 
            versão embaralhada da palavra original à medida 
            que os caracteres são rearranjados. */

  const palavraArray = palavra.split('');
  /* Utiliza o método 'split('')' para dividir a string 'palavra' 
            em um array de caracteres. Por exemplo, 
            "CASA" torna-se ['C', 'A', 'S', 'A']. 
     Isso permite manipular cada caractere individualmente. */

  while (palavraArray.length > 0) {
    /* Inicia um loop 'while' que continua enquanto houver 
            caracteres no array 'palavraArray'. Este loop 
            repetirá até que todos os caracteres sejam removidos 
            do array original e adicionados à string embaralhada. */

    const indiceAleatorio = Math.floor(Math.random() * palavraArray.length);
    /* Gera um índice aleatório dentro do intervalo do 
              tamanho atual do array 'palavraArray'. 
       'Math.random()' gera um número decimal entre 0 e 1 (exclusivo), 
              que é então multiplicado pelo comprimento do 
              array para criar um número no intervalo necessário. 
       'Math.floor()' é utilizado para arredondar o número 
              para baixo, resultando em um índice válido de 
              array (que começa do 0). */

    palavraEmbaralhada += palavraArray.splice(indiceAleatorio, 1)[0];
    /* Utiliza o método 'splice()' para remover 1 elemento 
              no índice 'indiceAleatorio' do array 'palavraArray'. 
       'splice()' retorna um array contendo os itens 
              removidos, e '[0]' acessa o primeiro (e único) 
              elemento deste array. 
       Esse elemento é então concatenado à 
              string 'palavraEmbaralhada'. 
       Isso garante que cada caractere seja selecionado 
              aleatoriamente e movido da lista original para 
              a nova string embaralhada, sem repetição. */

  }

  return palavraEmbaralhada;
  /* Após o loop terminar, retorna a string 'palavraEmbaralhada', 
            que agora contém todos os caracteres da palavra 
            original em uma nova ordem aleatória. */

}

function criarTecladoVirtual() {
  /* Declara a função 'criarTecladoVirtual', utilizada 
            para construir dinamicamente um teclado na 
            interface do usuário, facilitando a entrada 
            de dados pelo jogador. */

    const tecladoContainer = document.getElementById('teclado-virtual');
    /* Localiza o elemento no DOM com o ID 'teclado-virtual', 
          que servirá como o contêiner principal para o teclado. 
          Este contêiner irá hospedar todas as teclas criadas 
          dinamicamente. */

    const linhasTeclado = [
      'QWERTYUIOP',
      'ASDFGHJKL',
      'ZXCVBNM'
    ];
    /* Define um array de strings, onde cada string 
            representa uma linha do teclado QWERTY. Essa 
            estrutura facilita a criação de teclas em linhas que 
            correspondem ao layout familiar de um teclado 
            físico. */

    linhasTeclado.forEach(linha => {
      /* Inicia um loop para iterar sobre cada linha do 
            teclado. 'linha' representa uma das strings no 
            array 'linhasTeclado'. */

      const linhaDiv = document.createElement('div');
      /* Cria um novo elemento <div> para cada linha de 
            teclas. Esse <div> atuará como um contêiner para
             um grupo de teclas, mantendo-as organizadas 
             por linha. */

      linha.split('').forEach(letra => {
        /* Divide a string 'linha' em caracteres 
              individuais (letras) e itera sobre cada letra. */

        const botao = document.createElement('button');
        /* Cria um novo elemento <button> para cada letra. 
              Este botão será uma tecla interativa no 
              teclado. */

        botao.innerText = letra;
        /* Define o texto do botão como a letra atual, fazendo 
              com que a tecla mostre a letra que ela representa. */

        botao.classList.add('tecla');
        /* Adiciona a classe 'tecla' ao botão, que pode ser 
              usada para estilização e identificação no CSS 
              ou JavaScript. */

        botao.onclick = () => adicionarLetra(letra);
        /* Atribui uma função ao evento 'onclick' do botão, 
              que será chamada quando a tecla for clicada. 
          A função 'adicionarLetra', que não é definida aqui, 
              atualiza a entrada do usuário com a 
              letra correspondente ao botão clicado. */

        linhaDiv.appendChild(botao);
        /* Adiciona o botão criado como um filho do <div> da 
              linha atual, inserindo efetivamente a tecla no 
              layout do teclado. */

      });

      tecladoContainer.appendChild(linhaDiv);
      /* Adiciona o <div> que contém a linha completa de 
              teclas ao contêiner do teclado, montando 
              progressivamente o layout completo do teclado 
              na página. */

    });

    const botaoApagar = document.createElement('button');
    /* Cria um novo botão que será usado para apagar 
              caracteres inseridos pelo usuário. */

    botaoApagar.innerText = 'Apagar';
    /* Define o texto do botão como 'Apagar', indicando 
              sua função. */

    botaoApagar.classList.add('tecla', 'tecla-apagar');
    /* Adiciona duas classes ao botão: 'tecla' para 
              estilização geral de teclas e 'tecla-apagar' 
              para estilização específica do botão de apagar. */

    botaoApagar.onclick = apagarUltimaLetra;
    /* Define a função que será chamada quando o botão de 
              apagar for clicado. 'apagarUltimaLetra' é uma 
              função que, remove o último 
              caractere da entrada atual do usuário. */

    tecladoContainer.appendChild(botaoApagar);
    /* Adiciona o botão de apagar ao contêiner principal do 
              teclado, colocando-o no teclado virtual como 
              uma tecla funcional. */

}


function adicionarLetra(letra) {
  /* Declaração da função 'adicionarLetra' com 'letra' como 
              parâmetro. Esta função é chamada quando uma 
              tecla do teclado virtual é pressionada. */

  tentativaAtual += letra;
  /* Adiciona a 'letra' pressionada ao fim da string 'tentativaAtual'. 
              Esta variável acumula as entradas do usuário à 
              medida que elas vão sendo inseridas. */

  atualizarTentativa();
  /* Chama a função 'atualizarTentativa' para atualizar o 
              display do jogo, mostrando a entrada 
              atualizada do usuário. */

}


function apagarUltimaLetra() {
  /* Declaração da função 'apagarUltimaLetra', que é 
              responsável por remover a última letra 
              inserida na 'tentativaAtual'. */

  tentativaAtual = tentativaAtual.slice(0, -1);
  /* Utiliza o método 'slice' para criar uma nova string, 
              removendo o último caractere da string 'tentativaAtual'. 
     O parâmetro '-1' indica que o corte deve ser feito até o 
              penúltimo caractere, efetivamente removendo o último. */

  atualizarTentativa();
  /* Após modificar 'tentativaAtual', chama 'atualizarTentativa' 
              para atualizar o display e mostrar a nova 
              string sem a última letra. */

}


function atualizarTentativa() {
  /* Declaração da função 'atualizarTentativa', que 
              atualiza a visualização da tentativa do 
              usuário na interface do jogo. */

  document.getElementById('resultado').innerText = tentativaAtual;
  /* Localiza o elemento HTML com o ID 'resultado' e 
              atualiza seu texto interno para o valor da 
              variável 'tentativaAtual', que contém as 
              letras inseridas pelo usuário até o momento.
     Isso exibe as letras escolhidas pelo usuário na tela, 
              permitindo-lhes acompanhar visualmente sua 
              progressão na formação da palavra. */

}


function verificarTentativa() {
  /* Declaração da função 'verificarTentativa', que é 
        chamada quando o jogador decide verificar se 
        a palavra digitada está correta. */

    if (tentativaAtual === palavraAleatoria) {
      /* Início de uma estrutura condicional que compara a 
            variável 'tentativaAtual' (a entrada do usuário) 
            com 'palavraAleatoria' (a palavra correta). 
            Se forem iguais, o bloco de código dentro 
            do if será executado. */

      pontuacao += 1;
      /* Incrementa a variável 'pontuacao' em 1, aumentando a 
            pontuação do jogador por acertar a palavra. */

      atualizarPontuacao();
      /* Chama a função 'atualizarPontuacao', que atualiza a 
            visualização da pontuação na interface do usuário. 
            Essa função manipula o DOM para 
            refletir a nova pontuação. */

      document.getElementById('resultado').innerText = 'Parabéns! Você acertou!';
      /* Acessa o elemento HTML com o ID 'resultado' e 
            define seu texto para 'Parabéns! Você acertou!', 
            fornecendo um feedback positivo ao jogador. */

      setTimeout(novaPalavra, 2000);
      /* Utiliza a função 'setTimeout' para chamar a 
            função 'novaPalavra' após um delay de 
            2000 milissegundos (2 segundos). Isso dá ao 
            jogador um tempo para ver a mensagem de 
            acerto antes de iniciar uma nova rodada. */

    } else {
      /* Parte do condicional que executa se 'tentativaAtual' 
            não for igual a 'palavraAleatoria' (ou seja, o 
              jogador errou a palavra). */

      mostrarModal('modal-erro');
      /* Chama a função 'mostrarModal' com o argumento 'modal-erro', 
              que exibe um modal de erro na tela, 
              informando ao jogador que ele não acertou a 
              palavra e incentivando uma nova tentativa. */

    }

    tentativaAtual = '';
    /* Reinicia a variável 'tentativaAtual', limpando a 
              entrada anterior do usuário, preparando para 
              uma nova tentativa ou nova palavra. */

    atualizarTentativa();
    /* Chama a função 'atualizarTentativa', que  
            atualiza algum elemento de interface do usuário 
            relacionado à entrada atual do jogador, 
            refletindo o reset da tentativa. */

}

function atualizarPontuacao() {
  /* Declara a função 'atualizarPontuacao', que é responsável 
            por atualizar a visualização da pontuação do 
            usuário na página web e armazenar essa pontuação 
            no localStorage. */

  document.getElementById('pontuacao').innerText = `Pontuação: ${pontuacao}`;
  /* Acessa o elemento HTML com o ID 'pontuacao' e atualiza 
            seu conteúdo de texto para mostrar a pontuação 
            atual do jogador.
     Usa-se a interpolação de string (com backticks) para 
            inserir dinamicamente o valor da variável 'pontuacao' 
            no texto. */

  localStorage.setItem('anagramaPontos', pontuacao);
  /* Usa o objeto 'localStorage' para armazenar permanentemente a 
            pontuação atual do usuário sob a chave 'anagramaPontos'.
     Isso permite que a pontuação seja persistida mesmo se a 
            página for fechada ou recarregada. */

}

function carregarPontuacao() {
  /* Declara a função 'carregarPontuacao', que é 
            responsável por carregar a pontuação do 
            jogador a partir do armazenamento local 
            quando a página é carregada ou atualizada. */

  const pontuacaoSalva = localStorage.getItem('anagramaPontos');
  /* Usa o método 'getItem' do objeto 'localStorage' para 
            recuperar o valor armazenado anteriormente sob a 
            chave 'anagramaPontos'.
     A pontuação recuperada é armazenada na 
            constante 'pontuacaoSalva'. */

  if (pontuacaoSalva) {
    /* Verifica se existe uma pontuação salva. Se a 
            variável 'pontuacaoSalva' contiver algum 
            valor (ou seja, se não for null ou undefined), o 
            bloco de código dentro do if será executado. */
  
    pontuacao = parseInt(pontuacaoSalva);
    /* Converte o valor de 'pontuacaoSalva' de uma string 
            para um número inteiro usando a função 'parseInt'.
       Isso é necessário porque os valores armazenados no 
            localStorage são sempre strings. A variável 'pontuacao' é 
            atualizada com esse valor numérico. */

  }
  
  atualizarPontuacao();
  /* Chama a função 'atualizarPontuacao' para atualizar a 
            interface do usuário com a pontuação carregada.
     Isso garante que a pontuação exibida na página seja 
            consistente com o valor recuperado do localStorage. */

}

function mostrarModal(modalId) {
  /* Declaração da função 'mostrarModal' com um 
            parâmetro 'modalId', que é o ID do modal a 
            ser mostrado. */

  const modal = document.getElementById(modalId);
  /* Obtém o elemento modal do DOM usando seu ID fornecido, 
            permitindo a manipulação do mesmo. */

  modal.style.display = 'flex';
  /* Altera a propriedade de estilo 'display' do modal 
            para 'flex', tornando-o visível. Isso ativa a 
            exibição do modal, que por padrão está 
            oculto (display: none), e o configura com 
            display flexível para centralizar o conteúdo 
            dentro dele. */

}

function fecharModal(modalId) {
  /* Declaração da função 'fecharModal' com um 
          parâmetro 'modalId', que é o ID do modal a 
          ser fechado. */

  const modal = document.getElementById(modalId);
  /* Semelhante à função 'mostrarModal', obtém o 
          elemento modal do DOM usando seu ID. */

  modal.style.display = 'none';
  /* Configura a propriedade de estilo 'display' do 
          modal para 'none', escondendo-o da visualização. 
          Isso é usado para fechar o modal quando 
          não é mais necessário, como após o usuário ler a 
          dica ou após fechar uma notificação de erro. */

}

function mostrarDica() {
  /* Declara a função 'mostrarDica', utilizada para mostrar a 
              palavra correta ao usuário como uma dica. */

  document.getElementById('dica-palavra').innerText = palavraAleatoria;
  /* Acessa o elemento HTML com o ID 'dica-palavra' e 
            define seu texto interno para a 
            variável 'palavraAleatoria', 
     que é a palavra corrente que o usuário precisa 
            adivinhar. Isso mostra a palavra diretamente 
            ao usuário como uma dica. */

  mostrarModal('modal-dica');
  /* Chama a função 'mostrarModal' com o argumento 'modal-dica', 
            que abre o modal onde a dica é exibida. */

}

// Chamadas de função para inicializar o jogo

carregarPontuacao();
/* Chama a função 'carregarPontuacao' ao iniciar o jogo 
          para recuperar e mostrar qualquer pontuação 
          anterior que tenha sido salva no localStorage. */

novaPalavra();
/* Chama a função 'novaPalavra' para iniciar o jogo com 
          uma nova palavra aleatória, dando ao usuário a 
          chance de começar ou continuar jogando. */

criarTecladoVirtual();
/* Chama a função 'criarTecladoVirtual' para construir o 
          teclado na interface do usuário, que o jogador usará 
          para inserir suas tentativas de adivinhar a palavra. */
