document.addEventListener('DOMContentLoaded', () => {
    /* Adiciona um ouvinte de evento ao objeto 'document' 
            que espera até que todo o conteúdo do DOM 
            esteja carregado e pronto. 
       Isso garante que todos os elementos HTML estejam 
            disponíveis para manipulação pelo JavaScript. */

    const containerPuzzle = document.getElementById('container-puzzle');
    /* Obtém o elemento com ID 'container-puzzle' do DOM e 
            o armazena na constante 'containerPuzzle'. 
       Este container é onde o puzzle em 
            si é renderizado ou manipulado. */

    const botaoTestar = document.getElementById('botao-testar');
    /* Obtém o elemento com ID 'botao-testar' do DOM e o 
            armazena na constante 'botaoTestar'. 
       Esse botão é usado para iniciar ou testar o jogo,  
            permitindo que o usuário configure o puzzle para 
            um estado de teste. */

    const tamanhoTabuleiro = document.getElementById('tamanho-tabuleiro');
    /* Obtém o elemento com ID 'tamanho-tabuleiro' do DOM e 
            o armazena na constante 'tamanhoTabuleiro'. 
       Este elemento é um controle de seleção que permite ao 
            usuário escolher o tamanho do tabuleiro do puzzle. */

    const modalVitoria = document.getElementById('modal-vitoria');
    /* Obtém o elemento com ID 'modal-vitoria' do DOM e o 
            armazena na constante 'modalVitoria'. 
       Este modal é usado para informar ao usuário que ele 
            completou o puzzle com sucesso. */

    modalVitoria.style.display = "none";
    /* O modal é ocultado configurando sua propriedade 'display' 
            para 'none'. Isso permite fechar o modal. */

    const fecharModal = document.getElementById('fechar-modal');
    /* Obtém o elemento com ID 'fechar-modal' do DOM e o 
            armazena na constante 'fecharModal'. 
       Este elemento é  um botão ou ícone que permite ao 
            usuário fechar o modal de vitória. */

    const pontuacao = document.getElementById('pontuacao');
    /* Obtém o elemento com ID 'pontuacao' do DOM e o 
            armazena na constante 'pontuacao'. 
       Este elemento exibe a pontuação do usuário, 
            atualizando-a conforme o jogo progride. */

    let pontos = localStorage.getItem('pontos_puzzle') ? parseInt(localStorage.getItem('pontos_puzzle')) : 0;
    /* Tenta recuperar a pontuação do jogo ('pontos_puzzle') do 
            armazenamento local do navegador. Se existir, 
            converte o valor recuperado para um inteiro 
            usando parseInt. 
       Se não existir, inicializa 'pontos' como 0. Isso é 
            útil para manter o estado do jogo entre 
            sessões do navegador. */

    let ordemPecas;
    /* Declara a variável 'ordemPecas', que  será usada 
            para armazenar a ordem atual das peças no puzzle. 
       A ordem específica e o estado serão gerenciados 
            por esta variável. */

    let tamanhoAtual = 3;
    /* Inicializa a variável 'tamanhoAtual' com o valor 3, 
            presumivelmente o tamanho padrão do tabuleiro 
            quando o jogo é carregado pela primeira vez. 
       Este valor pode ser alterado com base na seleção do 
            usuário no controle 'tamanhoTabuleiro'. */

    pontuacao.innerText = `Pontos: ${pontos}`;
    /* Atualiza o texto do elemento 'pontuacao' para 
            mostrar os pontos atuais do usuário. 
       Utiliza template literals para inserir dinamicamente o 
            valor da variável 'pontos' no conteúdo 
            textual do elemento. */


    fecharModal.onclick = () => {
    /* Define um manipulador de eventos para o evento de 
            clique no botão 'fecharModal'. Quando o botão é 
            clicado, a função arrow é chamada. */

        modalVitoria.style.display = "none";
        /* A propriedade 'display' do modal de vitória é 
               definida como 'none', fazendo com que o modal 
               seja ocultado e não seja mais visível na página. */

    }
    

    window.onclick = (event) => {
        /* Adiciona um manipulador de evento ao objeto 
               global 'window' para capturar cliques em qualquer 
               parte da janela do navegador. */
    
        if (event.target === modalVitoria) {
            /* Verifica se o objeto que foi clicado (event.target) é 
                     o modalVitoria. Isso geralmente é usado para 
                     fechar o modal quando o usuário clica fora da 
                     área de conteúdo do modal, no 'overlay' escuro. */
    
            modalVitoria.style.display = "none";
            /* Se o objeto clicado for o modalVitoria, o modal é 
                     ocultado configurando sua propriedade 'display' 
                     para 'none'. Isso permite fechar o modal clicando 
                     fora de sua área de conteúdo principal. */

        }
    }


    tamanhoTabuleiro.addEventListener('change', () => {
        /* Adiciona um manipulador de evento de mudança ao 
                  elemento select 'tamanhoTabuleiro'. Esse evento é 
                  disparado sempre que o usuário altera a opção 
                  selecionada. */
    
        tamanhoAtual = parseInt(tamanhoTabuleiro.value);
        /* Atualiza a variável 'tamanhoAtual' com o valor 
                  numérico atualmente selecionado no 
                  controle 'tamanhoTabuleiro'. O método parseInt 
                  converte o valor string do atributo 'value' do 
                  option selecionado para um número inteiro. */
    
        inicializarJogo();
        /* Chama a função 'inicializarJogo', que  reinicia ou 
                  começa o jogo com o novo tamanho de tabuleiro 
                  especificado. Esta função deve preparar e 
                  renderizar o tabuleiro de acordo com o novo tamanho. */

    });


    botaoTestar.addEventListener('click', () => {
        /* Adiciona um manipulador de evento de clique ao 
                  botão 'botaoTestar'. Este manipulador é 
                  chamado sempre que o usuário clica no botão. */
    
        ordemPecas = criarOrdemTeste(tamanhoAtual);
        /* A variável 'ordemPecas' é atualizada com o 
                  resultado da função 'criarOrdemTeste', que 
                  gera uma ordem específica de peças baseada no 
                  tamanho atual do tabuleiro. Essa função  
                  configura o tabuleiro em um estado fácil de 
                  resolver para fins de teste. */
    
        renderizar();
        /* Chama a função 'renderizar', que atualiza a 
                  visualização do tabuleiro de puzzle na 
                  página com base na nova ordem de peças 
                  estabelecida. Isso inclui a colocação de 
                  todas as peças em suas posições correspondentes 
                  dentro do container do tabuleiro. */

    });


    function criarOrdemTeste(tamanho) {
        /* Define a função 'criarOrdemTeste', que 
                  aceita um único parâmetro: 'tamanho'.
           Esta função é projetada para gerar uma configuração 
                  de tabuleiro quase completa para fins de teste,
           onde o puzzle está quase resolvido, exceto por 
                  uma peça fora do lugar. */
    
        const ordem = [];
        /* Inicializa 'ordem' como um array vazio. Este array 
                  será usado para armazenar a ordem sequencial das peças,
           configurando o tabuleiro de uma maneira que seja 
                  fácil de completar durante os testes. */
    
        for (let i = 1; i < tamanho * tamanho - 1; i++) {
            /* Utiliza um loop for que começa com 'i' igual a 1 e 
                     continua até 'tamanho * tamanho - 1'.
               Este loop itera através de cada número que representa 
                     uma peça do puzzle, exceto pela última peça. */
    
            ordem.push(i);
            /* Adiciona cada número 'i' ao array 'ordem'. Cada 
                     número é considerado uma peça do puzzle, e
               o loop termina antes de incluir a última peça, 
                        configurando o tabuleiro quase completo. */
        }
    
        ordem.push(null);
        /* Adiciona 'null' ao final do array 'ordem'. 'null' 
                     aqui representa o espaço vazio no tabuleiro,
           que é necessário para permitir a movimentação das peças. 
                     Neste caso, o espaço é posicionado antes da 
                     última peça. */
    
        ordem.push(tamanho * tamanho - 1);
        /* Adiciona a última peça, que é a única peça fora do 
                     lugar no tabuleiro, após o espaço vazio.
           Isso cria uma situação de jogo onde o puzzle pode ser 
                     completado com uma única movimentação válida,
           tornando-o ideal para testar funcionalidades do jogo como a 
                     detecção de vitória e a movimentação de peças. */
    
        return ordem;
        /* Retorna o array 'ordem', que agora está quase completo 
                     com um único movimento necessário para resolver,
           configurado especificamente para testar a funcionalidade 
                     de resolver o jogo. */

    }


    function inicializarJogo() {
        /* Define a função 'inicializarJogo'. Esta 
                  função é chamada para preparar e iniciar o 
                  tabuleiro de jogo sempre que necessário, como 
                  após uma mudança no tamanho do tabuleiro ou 
                  ao reiniciar o jogo. */
        
        ordemPecas = criarOrdemInicial(tamanhoAtual);
        /* Chama a função 'criarOrdemInicial', passando o 
                  'tamanhoAtual' como argumento. Essa função 
                  gera uma lista representando a ordem inicial 
                  das peças no tabuleiro de acordo com o tamanho 
                  especificado. 
           A função deve retornar um array com elementos que 
                  representam cada peça, que é então armazenado na 
                  variável 'ordemPecas'. Essa lista é utilizada para 
                  rastrear a localização de cada peça durante o jogo. */
        
        embaralhar(ordemPecas);
        /* Chama a função 'embaralhar', que recebe a lista de 
                  peças 'ordemPecas'. Esta função randomiza a 
                  ordem das peças dentro do array para garantir 
                  que o tabuleiro comece em um estado misturado, 
                  tornando o puzzle jogável e desafiador. 
           Isso é essencial para que o jogo não comece resolvido e 
                  ofereça um desafio ao jogador. */
        
        criarTabuleiro(tamanhoAtual);
        /* Chama a função 'criarTabuleiro', passando o 
                  'tamanhoAtual' como argumento. Esta função é 
                  responsável por configurar a estrutura do 
                  tabuleiro do jogo de acordo com o tamanho 
                  especificado. 
           Ela  manipula o DOM para ajustar o layout do 
                  tabuleiro e acomodar o número correto de 
                  peças, configurando aspectos visuais como o 
                  grid e o tamanho das peças. */
        
        renderizar();
        /* Chama a função 'renderizar', que não recebe 
                  argumentos. Esta função atualiza a 
                  representação visual do tabuleiro de 
                  puzzle no navegador. 
           Ela lê a ordem atualizada das peças no 
                  array 'ordemPecas' e aplica essa 
                  configuração no DOM, de modo que o 
                  tabuleiro mostre as peças nas posições 
                  corretas conforme definido pela lista 
                  embaralhada. */

    }

    function criarOrdemInicial(tamanho) {
        /* Define a função 'criarOrdemInicial', que 
                  recebe um parâmetro 'tamanho'. 
           Esta função é designada para criar a lista 
                  inicial de peças do puzzle baseada no 
                  tamanho do tabuleiro especificado. 
           O 'tamanho' geralmente se refere à dimensão do 
                  tabuleiro, por exemplo, '3' para um tabuleiro 3x3. */
    
        const ordem = [];
        /* Inicializa uma variável 'ordem' como um array vazio. 
           Este array será usado para guardar a ordem 
                  sequencial das peças do tabuleiro de 
                  puzzle, que será então embaralhada. */
    
        for (let i = 1; i < tamanho * tamanho; i++) {
            /* Inicia um loop for que começa em 1 e continua 
                        até um número menor que 'tamanho * tamanho'.
               Por exemplo, para um tabuleiro 3x3, o loop 
                        itera de 1 a 8.
               O propósito do loop é preencher o array 'ordem' 
                        com uma sequência de números, cada um 
                        representando uma peça do tabuleiro. */
    
            ordem.push(i);
            /* Adiciona o número atual do loop (i) ao final 
                        do array 'ordem'. 
               Isso é feito a cada iteração, preenchendo o array 
                        com números de 1 até 'tamanho*tamanho - 1', 
               onde cada número representa uma peça colocada em 
                        ordem sequencial no puzzle. */

        }
    
        ordem.push(null);
        /* Adiciona 'null' ao final do array 'ordem' após o
                   término do loop.
           Este 'null' representa a peça faltante ou o espaço 
                  vazio no tabuleiro de puzzle, 
           essencial para que seja possível mover as 
                  outras peças ao jogar. */
    
        return ordem;
        /* Retorna o array 'ordem' completo, que agora contém 
                  números em sequência de 1 até 'tamanho*tamanho - 1', 
                  seguidos de 'null'.
           Este array é usado para inicializar ou reinicializar o 
                  estado do tabuleiro do puzzle. */

    }


    function embaralhar(array) {
        /* Define a função 'embaralhar', que aceita um 
                     parâmetro 'array'.
           Esta função embaralha os elementos de um array 
                     no local usando o algoritmo de Fisher-Yates,
           garantindo que cada permutação de elementos seja 
                     igualmente provável. */
    
        for (let i = array.length - 1; i > 0; i--) {
            /* Inicia um loop que percorre o array de 
                     trás para frente.
               Começa do último elemento (array.length - 1) e 
                     continua até o segundo elemento do 
                     array (i > 0).
               O loop não precisa chegar ao primeiro elemento 
                     porque não haveria outro elemento com o 
                     qual trocar. */
    
            const j = Math.floor(Math.random() * (i + 1));
            /* Gera um índice aleatório 'j' que vai de 0 
                        até 'i' (inclusive).
               'Math.random()' gera um número flutuante 
                        entre 0 (inclusive) e 1 (exclusivo),
                        que é então multiplicado por 'i + 1' para 
                        ajustar o intervalo do índice,
                        e 'Math.floor()' é usado para arredondar o 
                        número para baixo, resultando em um índice 
                        inteiro dentro dos limites do array. */
    
            [array[i], array[j]] = [array[j], array[i]];
            /* Realiza a troca de elementos no array. O elemento 
                        na posição 'i' é trocado com o elemento 
                        na posição 'j'.
               Isso é feito usando a sintaxe de atribuição de 
                        desestruturação, que torna a troca de 
                        valores entre duas variáveis mais 
                        concisa e fácil de ler.
               Essa linha efetivamente troca dois elementos 
                        escolhidos aleatoriamente, movendo-se 
                        sistematicamente do final do array 
                        para o início. */

        }
        /* A função não retorna nada porque ela modifica o array 
                  passado diretamente (embaralhamento no local). */

    }


    function criarTabuleiro(tamanho) {
        /* Define a função 'criarTabuleiro', que aceita 
                  um parâmetro 'tamanho'.
           Esta função cria a estrutura do tabuleiro de 
                  jogo, configurando o layout do grid
                  e inserindo as peças de acordo com o 
                  tamanho especificado. */
    
        containerPuzzle.style.gridTemplateColumns = `repeat(${tamanho}, 100px)`;
        /* Configura a propriedade 'gridTemplateColumns' do 
                  container do puzzle para criar um grid 
                  com 'tamanho' colunas, cada uma com 100 
                  pixels de largura. A função `repeat` permite 
                  criar facilmente o número necessário de colunas. */
    
        containerPuzzle.style.gridTemplateRows = `repeat(${tamanho}, 100px)`;
        /* Configura a propriedade 'gridTemplateRows' do 
                  container do puzzle para criar um grid 
                  com 'tamanho' linhas, cada uma com 100 pixels 
                  de altura. Isso complementa a configuração 
                  das colunas para formar um grid quadrado. */
    
        containerPuzzle.innerHTML = '';
        /* Limpa o conteúdo atual do container do puzzle, 
                  removendo todas as peças anteriores.
           Isso é necessário para garantir que o tabuleiro 
                  seja recriado do zero cada vez que a 
                  função é chamada. */
    
        for (let i = 1; i <= tamanho * tamanho; i++) {
            /* Inicia um loop que vai de 1 até 'tamanho * tamanho', 
                     iterando através de todos os índices que 
                     representam as peças do tabuleiro.
               Este loop cria e posiciona cada peça no tabuleiro. */
    
            const peca = document.createElement('div');
            /* Cria um novo elemento <div> para 
                        representar uma peça do tabuleiro.
               Este elemento será configurado e depois 
                        adicionado ao container do puzzle. */
    
            peca.classList.add('peca');
            /* Adiciona a classe 'peca' ao novo elemento <div>. 
               Essa classe aplica estilos específicos,
                        como tamanho, cor, e outras propriedades 
                        visuais definidas no CSS para todas 
                        as peças do tabuleiro. */
    
            if (i === tamanho * tamanho) {
                /* Verifica se o índice atual 'i' é igual a 
                           'tamanho * tamanho', ou seja, se é 
                           a última posição no grid.
                   Isso identifica a última peça, que será a 
                           peça vazia no tabuleiro. */
    
                peca.id = 'peca-vazia';
                /* Define o atributo 'id' da última peça 
                           como 'peca-vazia'.
                   Esse ID é usado para aplicar estilos 
                           específicos e manipulações de 
                           jogo para a peça vazia,
                           como a cor de fundo diferente e 
                           a lógica de movimentação no jogo. */

            } else {

                peca.id = `peca-${i}`;
                /* Define o atributo 'id' das outras peças 
                           como 'peca-1', 'peca-2', etc.
                   Isso cria um identificador único para 
                           cada peça, o que pode ser útil para 
                           manipulações específicas via JavaScript ou CSS. */
    
                peca.innerText = i;
                /* Define o texto interno da peça como o 
                           índice atual 'i'.
                   Esse texto é o número que será exibido na 
                           peça, ajudando o jogador a identificar e 
                           ordenar as peças no puzzle. */

            }
    
            containerPuzzle.appendChild(peca);
            /* Adiciona o novo elemento <div> (a peça do 
                        tabuleiro) ao container do puzzle.
               Isso insere a peça no DOM, tornando-a visível e 
                        posicionada corretamente no grid. */

        }
    }
    

    function renderizar() {
        /* Define a função 'renderizar'. Esta função 
                  atualiza a interface do tabuleiro de puzzle,
           posicionando as peças de acordo com a ordem 
                  especificada em 'ordemPecas'. */
    
        const pecas = Array.from(document.querySelectorAll('.peca'));
        /* Seleciona todos os elementos do DOM com a 
                  classe 'peca' e os converte em um 
                  array usando Array.from.
           Isso facilita a manipulação das peças do 
                  puzzle no código subsequente. */
    
        ordemPecas.forEach((valor, index) => {
            /* Utiliza o método 'forEach' para iterar sobre 
                        cada valor e índice do array 'ordemPecas'.
               Cada iteração processa uma peça do puzzle, 
                        atualizando sua posição e aparência 
                        conforme necessário. */
    
            if (valor !== null) {
                /* Verifica se o valor atual não é null. Valores 
                        não nulos representam peças numeradas do puzzle. */
    
                pecas[valor - 1].style.order = index;
                /* Define a propriedade 'order' da peça 
                        correspondente para o índice atual.
                   Isso reposiciona a peça dentro do container 
                        de puzzle baseado na ordem especificada 
                        pelo array 'ordemPecas'. */
    
                pecas[valor - 1].style.backgroundColor = '#ffdab9';
                /* Define a cor de fundo da peça para '#ffdab9', 
                        restaurando a cor padrão das peças numeradas.
                   Isso garante que as peças numeradas tenham uma 
                        aparência consistente. */

            } else {
                /* Se o valor for null, significa que esta 
                        posição corresponde à peça vazia. */
    
                const pecaVazia = document.getElementById('peca-vazia');
                /* Obtém a peça vazia do DOM usando seu ID 'peca-vazia'. */
    
                pecaVazia.style.order = index;
                /* Define a propriedade 'order' da peça vazia 
                        para o índice atual, posicionando-a 
                        corretamente no tabuleiro. */
    
                pecaVazia.style.backgroundColor = '#8b5a2b';
                /* Define a cor de fundo da peça vazia para '#8b5a2b', 
                        garantindo que ela se destaque das outras peças.
                   Isso ajuda o jogador a identificar facilmente a 
                        posição da peça vazia no tabuleiro. */

            }
        });
    
        verificarVitoria();
        /* Chama a função 'verificarVitoria', que 
                  verifica se o jogador completou o puzzle.
           Se o puzzle estiver completo, esta função pode 
                  exibir uma mensagem de vitória ou tomar 
                  outras ações apropriadas. */

    }


    function verificarVitoria() {
        /* Define a função 'verificarVitoria'. Esta função 
                  verifica se o jogador completou o puzzle 
                  com sucesso, colocando todas as peças na 
                  ordem correta. */
    
        const ordemCorreta = criarOrdemInicial(tamanhoAtual);
        /* Chama a função 'criarOrdemInicial' com o 'tamanhoAtual' 
                  para gerar a ordem correta das peças para um 
                  tabuleiro de tamanho atual.
           Esta função retorna um array que representa a 
                  configuração de um tabuleiro completado. */
    
        if (ordemPecas.every((val, index) => val === ordemCorreta[index])) {
            /* Verifica se todos os elementos em 'ordemPecas' 
                     correspondem aos elementos na 'ordemCorreta'.
               Utiliza o método 'every' do array, que retorna 'true' 
                     se a função fornecida retornar 'true' para 
                     cada elemento do array.
               A função fornecida verifica se o valor 'val' na 
                     posição 'index' em 'ordemPecas' é igual ao 
                     valor na mesma posição em 'ordemCorreta'. */
    
            pontos += 10;
            /* Incrementa a variável 'pontos' em 10, adicionando 
                     pontos à pontuação total do jogador para 
                     recompensá-lo por completar o puzzle. */
    
            localStorage.setItem('pontos_puzzle', pontos);
            /* Armazena a pontuação atualizada no armazenamento 
                     local do navegador sob a chave 'pontos_puzzle'.
               Isso permite que a pontuação seja persistida entre 
                     sessões do navegador, garantindo que o progresso 
                     do jogador seja salvo. */
    
            pontuacao.innerText = `Pontos: ${pontos}`;
            /* Atualiza o texto do elemento 'pontuacao' para 
                     refletir a nova pontuação do jogador.
               Utiliza template literals para inserir dinamicamente o 
                     valor atualizado da variável 'pontos'. */
    
            modalVitoria.style.display = "flex";
            /* Exibe o modal de vitória configurando sua 
                     propriedade 'display' para 'flex'.
               Isso torna o modal visível,  com uma mensagem de 
                     congratulação ao jogador por completar o puzzle. */
        }
        /* Se a condição 'ordemPecas.every' não for atendida, a 
                  função não faz nada e simplesmente retorna, 
                  permitindo que o jogador continue tentando 
                  resolver o puzzle. */

    }


    function jogadaValida(indexOrigem, indexDestino) {
        /* Define a função 'jogadaValida', que aceita dois 
                  parâmetros: 'indexOrigem' e 'indexDestino'.
           Esses parâmetros representam os índices das peças 
                  no array 'ordemPecas' que estão sendo movidas.
           A função verifica se a movimentação da peça 
                  de 'indexOrigem' para 'indexDestino' é válida. */
    
        const colunas = tamanhoAtual;
        /* Armazena o valor de 'tamanhoAtual' na constante 'colunas'.
           Isso representa o número de colunas no tabuleiro 
                  do puzzle e é usado para calcular as posições 
                  de linha e coluna das peças. */
    
        const linhaOrigem = Math.floor(indexOrigem / colunas);
        /* Calcula a linha da peça de origem dividindo 'indexOrigem' 
                  pelo número de colunas e arredondando para baixo.
           Isso determina em qual linha do tabuleiro a peça 
                  de origem está localizada. */
    
        const colunaOrigem = indexOrigem % colunas;
        /* Calcula a coluna da peça de origem usando o operador 
                  módulo (%), que retorna o resto da divisão 
                  de 'indexOrigem' pelo número de colunas.
           Isso determina em qual coluna do tabuleiro a peça 
                  de origem está localizada. */
    
        const linhaDestino = Math.floor(indexDestino / colunas);
        /* Calcula a linha da peça de destino dividindo 'indexDestino' 
                  pelo número de colunas e arredondando para baixo.
           Isso determina em qual linha do tabuleiro a peça 
                  de destino está localizada. */
    
        const colunaDestino = indexDestino % colunas;
        /* Calcula a coluna da peça de destino usando o 
                  operador módulo (%), que retorna o resto 
                  da divisão de 'indexDestino' pelo número 
                  de colunas.
           Isso determina em qual coluna do tabuleiro a 
                  peça de destino está localizada. */
    
        const distancia = Math.abs(linhaOrigem - linhaDestino) + Math.abs(colunaOrigem - colunaDestino);
        /* Calcula a distância entre a peça de origem e a 
                  peça de destino somando a diferença absoluta 
                  entre suas linhas e a diferença absoluta 
                  entre suas colunas.
           A soma das diferenças absolutas de linhas e colunas 
                  determina se a peça de origem é adjacente à 
                  peça de destino. */
    
        return distancia === 1;
        /* Retorna 'true' se a distância entre a peça de 
                  origem e a peça de destino for exatamente 1.
           Isso significa que as peças são adjacentes e a 
                  movimentação é válida.
           Retorna 'false' caso contrário, indicando que a 
                  movimentação não é válida (as peças não 
                  são adjacentes). */

    }

    document.addEventListener('click', (event) => {
        /* Adiciona um ouvinte de evento ao objeto 'document' 
                  que escuta por eventos de clique em 
                  qualquer lugar da página.
           A função fornecida como callback será executada 
                  sempre que um clique for detectado. */
    
        if (event.target.classList.contains('peca')) {
            /* Verifica se o elemento que foi clicado (event.target) 
                     contém a classe 'peca'.
               Isso garante que o código seguinte só será 
                     executado se uma peça do puzzle for 
                     clicada. */
    
            const indexPeca = ordemPecas.indexOf(parseInt(event.target.innerText));
            /* Obtém o índice da peça clicada no array 'ordemPecas'.
               O texto interno da peça (um número) é convertido 
                        para um inteiro e usado para encontrar a 
                        posição dessa peça no array. */
    
            const indexVazio = ordemPecas.indexOf(null);
            /* Obtém o índice da peça vazia (representada 
                        por 'null') no array 'ordemPecas'.
               Isso identifica a posição atual do espaço 
                        vazio no tabuleiro do puzzle. */
    
            if (jogadaValida(indexPeca, indexVazio)) {
                /* Verifica se a movimentação da peça clicada 
                           para o espaço vazio é válida.
                   A função 'jogadaValida' é chamada com os 
                           índices da peça clicada e do espaço 
                           vazio como argumentos.
                   Se a movimentação for válida (as peças são 
                           adjacentes), a função retorna 'true'. */
    
                [ordemPecas[indexPeca], ordemPecas[indexVazio]] = [ordemPecas[indexVazio], ordemPecas[indexPeca]];
                /* Troca os valores das posições 'indexPeca' e 
                           'indexVazio' no array 'ordemPecas'.
                   Isso move a peça clicada para o espaço vazio e 
                           vice-versa, atualizando a ordem das peças 
                           no tabuleiro. */
    
                renderizar();
                /* Chama a função 'renderizar' para atualizar a 
                           visualização do tabuleiro.
                   A nova ordem das peças é aplicada ao DOM, 
                           refletindo a movimentação feita pelo jogador. */

            }
        }
    });
    
    inicializarJogo();
    /* Chama a função 'inicializarJogo' para 
               configurar e começar o jogo.
       Esta função prepara o tabuleiro de puzzle, embaralha 
               as peças e renderiza o estado inicial do jogo.
       É chamada após a definição dos ouvintes de evento para 
               garantir que o jogo esteja pronto para interação. */


});