// Adiciona um ouvinte de evento que executa o
        // código dentro da função assim que o conteúdo
        // do DOM (Documento Object Model) está completamente carregado.
document.addEventListener('DOMContentLoaded', () => {

    // Captura o elemento do tabuleiro inimigo pelo
            // seu ID para poder manipulá-lo mais tarde no código.
    const tabuleiroInimigo = document.getElementById('tabuleiro-inimigo');

    // Captura o elemento do tabuleiro modal, que é usado
            // para mostrar as posições dos navios em um modal.
    const tabuleiroModal = document.getElementById('tabuleiro-modal');

    // Obtém o elemento que mostra o número de vidas do jogador.
    const vidasElemento = document.getElementById('vidas');

    // Obtém o elemento que mostra a pontuação do jogador.
    const pontuacaoElemento = document.getElementById('pontuacao');

    // Captura o botão que, quando clicado, mostra os
            // navios no tabuleiro modal.
    const mostrarNavaisBtn = document.getElementById('mostrar-navais-btn');

    // Obtém o elemento modal usado para exibir o tabuleiro modal.
    const modal = document.getElementById('modal');

    // Captura o primeiro elemento com a classe 'close',
            // usado para fechar o modal.
    const closeModal = document.getElementsByClassName('close')[0];

    // Obtém o modal de reiniciar o jogo, que é mostrado
            // quando o jogo termina.
    const modalReiniciar = document.getElementById('modal-reiniciar');

    // Captura o elemento que será usado para mostrar
            // mensagens finais no modal de reiniciar.
    const mensagemFinal = document.getElementById('mensagem-final');

    // Captura o botão de reiniciar o jogo dentro do
            // modal de reiniciar.
    const reiniciarJogoBtn = document.getElementById('reiniciar-jogo-btn');

    // Define o tamanho do tabuleiro de jogo como
            // uma constante de valor 15.
    const TAMANHO_TABULEIRO = 15;

    // Define os tamanhos dos navios que serão usados no jogo.
    const TAMANHO_NAVIOS = [5, 4, 3, 3, 2];

    // Define e inicializa a quantidade de vidas do jogador.
    let vidas = 15;

    // Define e inicializa a pontuação do jogador.
    let pontuacao = 0;

    // Esconde o modal de reinício imediatamente ao carregar o
            // jogo para evitar que ele apareça sem ser chamado.
    modalReiniciar.style.display = "none";

    // Esconde o modal de visualização dos navios para que
            // ele só apareça quando o jogador clicar no
            // botão correspondente.
    modal.style.display = "none";

    // Invoca a função criarGrade para construir uma
            // nova matriz para o tabuleiro do jogo.
    // Esta matriz será usada para rastrear a
            // posição dos navios e dos tiros.
    const gradeInimigo = criarGrade();

    // Configura o tabuleiro inimigo na página,
            // associando-o com a matriz 'gradeInimigo'.
    // O parâmetro 'inimigo' especifica que este tabuleiro é
            // usado pelo jogador para atacar o oponente.
    inicializarTabuleiro(tabuleiroInimigo, gradeInimigo, 'inimigo');

    // Configura o tabuleiro no modal que será usado para
            // mostrar as posições dos navios.
    // O parâmetro 'modal' indica que este tabuleiro mostra
            // informações adicionais e não para interação direta do jogador.
    inicializarTabuleiro(tabuleiroModal, gradeInimigo, 'modal');

    
    // Chama a função para posicionar navios de forma
            // aleatória na matriz 'gradeInimigo'.
    // 'TAMANHO_NAVIOS' é um array que contém os
            // tamanhos dos navios a serem colocados no tabuleiro.
    posicionarNaviosAleatoriamente(gradeInimigo, TAMANHO_NAVIOS);

    // Atualiza a interface do usuário para mostrar o
            // número atual de vidas do jogador.
    // Esta função altera o conteúdo de texto do
            // elemento HTML que exibe as vidas.
    atualizarVidas();

    // Atualiza a interface do usuário para mostrar a
            // pontuação atual do jogador.
    // Altera o conteúdo de texto do elemento HTML
            // que exibe a pontuação.
    atualizarPontuacao();


    // Define o que acontece quando o usuário
            // clica no botão 'Mostrar Navios'.
    mostrarNavaisBtn.onclick = function() {

        // Executa a função que exibe visualmente os
                // navios no tabuleiro modal.
        // Isso permite ao jogador ver temporariamente onde
                // todos os navios estão localizados.
        mostrarNavios(gradeInimigo, tabuleiroModal);
        
        // Muda a propriedade de exibição do modal
                // para 'flex', o que torna o modal visível na tela.
        // O estilo 'flex' também ativa o layout flexível
                // para centralizar o conteúdo dentro do modal.
        modal.style.display = "flex";

    };


    // Define o que acontece quando o usuário
            // clica no botão de fechar o modal.
    closeModal.onclick = function() {

        // Esconde o modal alterando sua propriedade
                // de exibição para 'none'.
        modal.style.display = "none";

    };


    // Definição da função 'posicionarNaviosAleatoriamente' que
            // tem a responsabilidade de posicionar
    // todos os navios na grade (tabuleiro) de acordo com os tamanhos especificados.
    function posicionarNaviosAleatoriamente(grade, tamanhosNavios) {

        // 'tamanhosNavios' é um array que contém os tamanhos
                // dos diferentes navios a serem colocados no tabuleiro.
        // Por exemplo, se tamanhosNavios = [5, 4, 3, 3, 2],
                // isso significa que devemos posicionar
        // um navio de tamanho 5, um de tamanho 4, dois de
                // tamanho 3, e um de tamanho 2 na grade.

        // O loop 'for...of' é usado aqui para iterar sobre
                // cada elemento do array 'tamanhosNavios'.
        // Cada elemento 'tamanho' na iteração representa o
                // tamanho de um navio que precisa ser posicionado
        // na grade.
        for (const tamanho of tamanhosNavios) {

            // Chama a função 'posicionarNavio' para cada
                    // tamanho de navio especificado.
            // 'grade' é a matriz que representa o tabuleiro
                    // onde os navios serão posicionados.
            // 'tamanho' é o número de células que o navio ocupará na grade.
            
            // A função 'posicionarNavio' é responsável por
                    // encontrar uma localização válida na grade onde
            // o navio pode caber sem sobrepor outro navio já
                    // posicionado e respeitando os limites do tabuleiro.
            // Ela tentará posicionar o navio horizontalmente ou
                    // verticalmente (escolha aleatória),
            // e verificará se há espaço suficiente para o
                    // navio na direção escolhida.
            posicionarNavio(grade, tamanho);
            
        }
    }


    // Função 'posicionarNavio' posiciona um navio de
            // tamanho especificado na grade.
    function posicionarNavio(grade, tamanho) {
        
        // Inicializa uma variável booleana para
                // verificar se o navio foi posicionado.
        let posicionado = false;

        // Continua tentando posicionar o navio enquanto ele
                // não estiver corretamente posicionado.
        while (!posicionado) {

            // Gera aleatoriamente a orientação do
                    // navio: 'horizontal' ou 'vertical'.
            const orientacao = Math.random() < 0.5 ? 'horizontal' : 'vertical';

            // Seleciona uma linha aleatória dentro dos
                    // limites do tabuleiro para o início do navio.
            const linha = Math.floor(Math.random() * TAMANHO_TABULEIRO);

            // Seleciona uma coluna aleatória dentro dos
                    // limites do tabuleiro para o início do navio.
            const coluna = Math.floor(Math.random() * TAMANHO_TABULEIRO);

            // Verifica se o navio pode ser posicionado na
                    // posição e orientação escolhidas.
            // 'podePosicionarNavio' verifica se todas as células
                    // necessárias estão livres (valor 0) e dentro
                    // dos limites do tabuleiro.
            if (podePosicionarNavio(grade, linha, coluna, tamanho, orientacao)) {

                // Se o navio puder ser posicionado, o loop é
                        // executado 'tamanho' vezes para posicionar o
                        // navio na grade.
                for (let i = 0; i < tamanho; i++) {

                    // Se a orientação for horizontal, o navio é
                            // posicionado ao longo da mesma linha,
                            // incrementando colunas.
                    if (orientacao === 'horizontal') {
                        
                        // Marca a célula como ocupada por um navio (1).
                        grade[linha][coluna + i] = 1; 

                    } else {

                        // Se a orientação for vertical, o navio é
                                // posicionado ao longo da mesma
                                // coluna, incrementando linhas.
                        // Marca a célula como ocupada por um navio (1).
                        grade[linha + i][coluna] = 1; 
                    }
                }

                // Após posicionar o navio, altera a
                        // variável 'posicionado' para true, encerrando o loop.
                posicionado = true;

            }
        }
    }


    // Função que verifica se um navio pode ser posicionado na
            // grade do tabuleiro em uma posição e orientação específicas.
    function podePosicionarNavio(grade, linha, coluna, tamanho, orientacao) {

        // Verifica se a orientação do navio é horizontal.
        if (orientacao === 'horizontal') {

            // Se for horizontal, verifica se o navio cabe na
                    // grade sem ultrapassar o limite direito do tabuleiro.
            // Se a coluna inicial mais o tamanho do navio exceder o
                    // tamanho do tabuleiro, o navio não cabe, então retorna falso.
            if (coluna + tamanho > TAMANHO_TABULEIRO) return false;

            // Percorre cada célula onde o navio seria
                    // posicionado horizontalmente.
            for (let i = 0; i < tamanho; i++) {

                // Verifica se a célula já está ocupada (diferente de 0).
                // Se qualquer uma das células estiver ocupada, o
                        // navio não pode ser posicionado aqui, então retorna falso.
                if (grade[linha][coluna + i] !== 0) return false;

            }

        } else {

            // Se a orientação do navio é vertical.
            // Verifica se o navio cabe na grade sem ultrapassar o
                    // limite inferior do tabuleiro.
            // Se a linha inicial mais o tamanho do navio
                    // exceder o tamanho do tabuleiro, o navio
                    // não cabe, então retorna falso.
            if (linha + tamanho > TAMANHO_TABULEIRO) return false;

            // Percorre cada célula onde o navio seria
                    // posicionado verticalmente.
            for (let i = 0; i < tamanho; i++) {

                // Verifica se a célula já está ocupada (diferente de 0).
                // Se qualquer uma das células estiver ocupada, o
                        // navio não pode ser posicionado aqui, então retorna falso.
                if (grade[linha + i][coluna] !== 0) return false;

            }
        }

        // Se nenhuma das condições anteriores for
                // verdadeira (ou seja, o navio cabe na posição
                // desejada e nenhuma célula está ocupada),
        // retorna verdadeiro, indicando que o navio pode ser posicionado.
        return true;

    }

        
    // Definição da função 'criarGrade' que constrói e
            // retorna uma matriz (grade) bidimensional.
    function criarGrade() {

        // O método 'Array.from' é usado para criar um
                // novo array. Neste caso, ele cria um array principal
        // com um número de elementos igual ao 'TAMANHO_TABULEIRO'.
                // Cada elemento desse array principal
        // representará uma linha no tabuleiro de Batalha Naval.
        
        // O primeiro parâmetro de 'Array.from' é um objeto que
                // define a propriedade 'length'.
        // A propriedade 'length' é definida como 'TAMANHO_TABULEIRO',
                // que é uma constante
        // que especifica quantas linhas (ou colunas, já que o
                // tabuleiro é quadrado) o tabuleiro terá.
        
        // O segundo parâmetro é uma função que será chamada
                // para cada elemento do array principal
        // que 'Array.from' está criando. Esta função retorna
                // um novo array que representa uma linha
        // do tabuleiro, criando assim a segunda dimensão da matriz.
        
        // Dentro dessa função, 'Array(TAMANHO_TABULEIRO).fill(0)'
                // cria um array onde cada elemento
        // é inicialmente definido como 0. O método 'fill(0)'
                // preenche todos os elementos do array
        // com '0'. Aqui, '0' é usado para representar uma
                // célula vazia do tabuleiro.
        // Isso significa que cada célula do tabuleiro ainda não
                // foi utilizada ou não tem um navio colocado nela.        
        return Array.from({ length: TAMANHO_TABULEIRO }, () => Array(TAMANHO_TABULEIRO).fill(0));

    }


    // Função para inicializar o tabuleiro na interface do usuário.
    function inicializarTabuleiro(tabuleiro, grade, tipoTabuleiro) {

        // Limpa o conteúdo interno do elemento tabuleiro,
                // removendo quaisquer células anteriores.
        tabuleiro.innerHTML = '';
        
        // Loop para criar as linhas do tabuleiro.
        for (let linha = 0; linha < TAMANHO_TABULEIRO; linha++) {

            // Loop para criar as colunas dentro de cada linha.
            for (let coluna = 0; coluna < TAMANHO_TABULEIRO; coluna++) {

                // Cria um novo elemento div que representa
                        // uma célula no tabuleiro.
                const celula = document.createElement('div');

                // Adiciona a classe 'celula' ao elemento para
                        // aplicar estilos predefinidos.
                celula.classList.add('celula');

                // Define atributos de linha e coluna na célula
                        // para identificação durante o jogo.
                celula.dataset.linha = linha;
                celula.dataset.coluna = coluna;
                
                // Verifica se o tabuleiro é do tipo 'inimigo', ou seja,
                        // se é o tabuleiro que o jogador ataca.
                if (tipoTabuleiro === 'inimigo') {

                    // Adiciona um ouvinte de evento de clique que
                            // chama a função manejarAtaque quando a célula é clicada.
                    celula.addEventListener('click', () => manejarAtaque(celula, grade));

                }

                // Adiciona a célula criada ao elemento tabuleiro no DOM.
                tabuleiro.appendChild(celula);

            }
        }
    }

    // Função que lida com o ataque do jogador a uma
            // célula específica do tabuleiro.
    function manejarAtaque(celula, grade) {

        // Converte os atributos 'data-linha' e 'data-coluna' da
                // célula clicada de string para número inteiro.
        const linha = parseInt(celula.dataset.linha);
        const coluna = parseInt(celula.dataset.coluna);

        // Verifica se a célula atacada contém um navio.
        if (grade[linha][coluna] === 1) {

            // Se a célula contiver um navio, adiciona a
                    // classe 'acerto' para mudar a cor da célula.
            celula.classList.add('acerto');

            // Marca a célula na grade como acertada,
                    // mudando seu valor para 2.
            grade[linha][coluna] = 2;

            // Incrementa a pontuação do jogador porque
                    // acertou um navio.
            pontuacao++;

            // Exibe uma mensagem para o jogador
                    // informando que acertou um navio.
            alert("Você acertou um navio!");

            // Chama a função para verificar se o
                    // navio foi completamente afundado.
            verificarAfundou(grade, linha, coluna, celula);

        } else if (grade[linha][coluna] === 0) {

            // Se a célula estiver vazia (não contém um navio).
            // Adiciona a classe 'erro' para mudar a cor
                    // da célula, indicando um erro.
            celula.classList.add('erro');

            // Marca a célula na grade como um erro,
                    // mudando seu valor para 3.
            grade[linha][coluna] = 3;

            // Decrementa a vida do jogador porque o
                    // tiro foi na água.
            vidas--;

            // Exibe uma mensagem para o jogador informando
                    // que o tiro caiu na água.
            alert("Você acertou na água.");

        }

        // Atualiza a contagem de vidas do jogador na tela.
        atualizarVidas();

        // Atualiza a pontuação do jogador na tela.
        atualizarPontuacao();

        // Salva a pontuação atual no armazenamento
                // local para manter o progresso.
        salvarPontuacao();

        // Verifica se o jogador não tem mais vidas.
        if (vidas === 0) {

            // Se o jogador não tem mais vidas, exibe
                    // uma mensagem de fim de jogo.
            alert("Fim de jogo! Você perdeu.");

            // Mostra todos os navios no tabuleiro,
                    // revelando suas posições.
            mostrarNavios(grade, tabuleiroInimigo);

            // Desabilita o tabuleiro para que nenhum
                    // clique adicional seja possível.
            desabilitarTabuleiro(tabuleiroInimigo);

            // Mostra o modal de reinício para permitir ao
                    // jogador começar um novo jogo.
            mostrarModalReinicio("Você perdeu!");

        }
    }

    // Função que verifica se um navio foi completamente
            // afundado após um ataque bem-sucedido.
    function verificarAfundou(grade, linha, coluna, celula) {

        // Inicializa uma lista para armazenar as posições
                // das células que compõem o navio atacado.
        const navioPosicoes = [];

        // Define as quatro direções possíveis para
                // verificar a partir do ponto de impacto:
        // cima, baixo, esquerda, direita.
        const direcoes = [
            { linha: -1, coluna: 0 }, // Cima
            { linha: 1, coluna: 0 },  // Baixo
            { linha: 0, coluna: -1 }, // Esquerda
            { linha: 0, coluna: 1 }   // Direita
        ];

        // Itera sobre cada uma das direções definidas acima.
        for (const direcao of direcoes) {

            // Inicializa 'l' e 'c' com as
                    // coordenadas da célula atacada.
            let l = linha;
            let c = coluna;

            // Continua movendo na direção atual enquanto:
            // 1. As novas coordenadas 'l' e 'c' estiverem
                    // dentro dos limites do tabuleiro.
            // 2. A célula na posição [l][c] contiver um '2' (acerto)
                    // ou '1' (navio ainda não atingido).
            while (l >= 0 && l < TAMANHO_TABULEIRO && c >= 0 && c < TAMANHO_TABULEIRO && (grade[l][c] === 2 || grade[l][c] === 1)) {

                // Adiciona as coordenadas atuais à lista de posições do navio.
                navioPosicoes.push({ linha: l, coluna: c });

                // Move para a próxima célula na direção atual.
                l += direcao.linha;
                c += direcao.coluna;
            }
        }

        // Checa se todas as posições identificadas como parte de
                // um navio contêm o valor '2', indicando que todas foram acertadas.
        const afundado = navioPosicoes.every(pos => grade[pos.linha][pos.coluna] === 2);

        // Se todas as partes do navio foram acertadas ('afundado' é true),
        if (afundado) {

            // Adiciona uma classe de 'explosao' à célula para
                    // mostrar uma animação de explosão.
            celula.classList.add('explosao');

            // Define um temporizador que após 1 segundo, realiza
                    // uma função para cada posição do navio.
            setTimeout(() => {

                // Itera sobre cada posição do navio que foi afundado.
                navioPosicoes.forEach(pos => {

                    // Seleciona a célula específica do navio no
                            // tabuleiro inimigo usando os atributos de data.
                    const celulaNavio = tabuleiroInimigo.querySelector(`.celula[data-linha='${pos.linha}'][data-coluna='${pos.coluna}']`);
                    
                    // Adiciona uma classe de 'explosao' para iniciar a
                            // animação de explosão.
                    celulaNavio.classList.add('explosao');
                    
                    // Define outro temporizador que após 1 segundo
                            // remove a classe 'explosao',
                    // fazendo a célula retornar ao estado normal após a animação.
                    setTimeout(() => {
                        celulaNavio.classList.remove('explosao');
                    }, 1000);

                });
            }, 1000);

            // Exibe um alerta informando que um navio
                    // foi completamente afundado.
            alert("Você afundou um navio!");

        }

        // Verifica se todos os navios foram afundados.
        // A função 'every' é usada para verificar se
                // todas as linhas da grade,
        // e todas as células em cada linha, não contêm o
                // valor '1' (navio não atingido).
        const todosNaviosAfundados = grade.every(linha => linha.every(celula => celula !== 1));

        // Se todos os navios foram afundados,
        if (todosNaviosAfundados) {

            // Chama a função para mostrar o modal de
                    // reinício com uma mensagem de parabéns,
            // indicando que o jogador afundou todos os navios e venceu o jogo.
            mostrarModalReinicio("Parabéns! Você afundou todos os navios!");

        }

    }

    
    // Função que atualiza o display das vidas do
            // jogador na interface do usuário.
    function atualizarVidas() {

        // A propriedade 'textContent' do elemento HTML que
                // mostra as vidas é atualizada com o valor da variável 'vidas'.
        // Isso reflete a quantidade atual de vidas do jogador na tela.
        vidasElemento.textContent = vidas;

    }

    // Função que atualiza o display da pontuação do
            // jogador na interface do usuário.
    function atualizarPontuacao() {

        // Similar à função anterior, atualiza o conteúdo de
                // texto do elemento HTML que mostra a pontuação.
        // O valor da variável 'pontuacao' é usado para
                // atualizar o display na interface do usuário.
        pontuacaoElemento.textContent = pontuacao;

    }

    // Função que salva a pontuação atual do jogador no
            // armazenamento local do navegador.
    function salvarPontuacao() {

        // O método 'setItem' do objeto 'localStorage' é
                // usado para armazenar a pontuação.
        // O primeiro argumento é a chave ('batalhaNavalPontuacao'), e
                // o segundo é o valor (variável 'pontuacao').
        // Isso permite que a pontuação seja persistida entre
                // sessões do navegador, mesmo se a página for recarregada.
        localStorage.setItem('batalhaNavalPontuacao', pontuacao);

    }


    // Função que desabilita o tabuleiro ao final do
            // jogo, impedindo mais cliques.
    function desabilitarTabuleiro(tabuleiro) {

        // Seleciona todas as células dentro do tabuleiro
                // usando 'querySelectorAll' para encontrar
                // elementos com a classe '.celula'.
        const celulas = tabuleiro.querySelectorAll('.celula');

        // Itera sobre cada célula usando 'forEach'. Para cada
                // célula, o evento de clique associado à
                // função 'manejarAtaque' é removido.
        // Isso é feito usando o método 'removeEventListener', que
                // impede futuras interações de cliques nessas células.
        celulas.forEach(celula => {
            celula.removeEventListener('click', manejarAtaque);
        });
    }


    // Função que exibe todos os navios no tabuleiro, usada para
            // revelar onde os navios estão posicionados.
    function mostrarNavios(grade, tabuleiro) {

        // Itera sobre cada linha do tabuleiro. O tabuleiro tem um
                // tamanho definido pela constante 'TAMANHO_TABULEIRO'.
        for (let linha = 0; linha < TAMANHO_TABULEIRO; linha++) {

            // Dentro de cada linha, itera sobre cada coluna.
            for (let coluna = 0; coluna < TAMANHO_TABULEIRO; coluna++) {

                // Seleciona a célula específica usando o seletor CSS que
                        // identifica a célula pelas suas coordenadas de linha e coluna.
                const celula = tabuleiro.querySelector(`.celula[data-linha='${linha}'][data-coluna='${coluna}']`);

                // Remove as classes 'acerto' e 'erro' para limpar
                        // quaisquer estados visuais anteriores.
                // Isso é necessário para garantir que a visualização dos
                        // navios não seja obstruída por cores
                        // indicativas de acertos ou erros.
                celula.classList.remove('acerto', 'erro');

                // Verifica se a célula atual na grade contém um
                        // navio (valor 1 para navio não atingido
                        // ou 2 para navio atingido).
                if (grade[linha][coluna] === 1 || grade[linha][coluna] === 2) {

                    // Se a célula contém parte de um navio, adiciona a
                            // classe 'navio' para alterar visualmente a célula,
                            // para destacar a presença do navio.
                    celula.classList.add('navio');
                    
                } else {
                    
                    // Se não houver navio nesta célula, garante que a
                            // classe 'navio' seja removida caso estivesse presente.
                    // Isso é útil para limpar quaisquer estados visuais
                            // anteriores que poderiam indicar erroneamente a
                            // presença de um navio.
                    celula.classList.remove('navio');

                }
            }
        }
    }

    // Função que mostra o modal de reinício do jogo com
            // uma mensagem específica.
    function mostrarModalReinicio(mensagem) {

        // Define o texto do elemento 'mensagemFinal' para a
                // mensagem fornecida.
        // Esse elemento é parte do modal de reinício e mostra o
                // resultado do jogo ao usuário.
        mensagemFinal.textContent = mensagem;

        // Altera o estilo de exibição do modal de reinício
                // para 'flex', tornando-o visível.
        // Isso permite que o modal seja exibido de forma a
                // cobrir o jogo e oferecer opções de reinício.
        modalReiniciar.style.display = "flex";

    }

    // Função que carrega a pontuação salva do
            // armazenamento local do navegador.
    function carregarPontuacao() {

        // Recupera a pontuação do localStorage, onde foi
                // salva com a chave 'batalhaNavalPontuacao'.
        const pontuacaoSalva = localStorage.getItem('batalhaNavalPontuacao');

        // Verifica se existe uma pontuação salva.
        if (pontuacaoSalva) {

            // Converte a pontuação salva de string para número
                    // inteiro e atualiza a variável global 'pontuacao'.
            pontuacao = parseInt(pontuacaoSalva);

            // Chama a função 'atualizarPontuacao' para refletir a
                    // pontuação carregada na interface do usuário.
            atualizarPontuacao();

        }
    }

    // Chamada imediata da função 'carregarPontuacao' ao
            // carregar o script.
    // Isso garante que qualquer pontuação anteriormente salva
            // seja recuperada e mostrada ao usuário.
    carregarPontuacao();

    
    // Adiciona um ouvinte de evento ao objeto janela para
            // tratar cliques em qualquer lugar da página.
    window.onclick = function(event) {

        // Verifica se o local clicado é o próprio
                // modal (o fundo escuro ao redor do conteúdo do modal).
        if (event.target == modal) {

            // Se sim, esconde o modal alterando sua
                    // propriedade de exibição para 'none'.
            modal.style.display = "none";

        }

        // Verifica se o local clicado é o modal de reinício.
        if (event.target == modalReiniciar) {

            // Se sim, esconde o modal de reinício alterando sua
                    // propriedade de exibição para 'none'.
            modalReiniciar.style.display = "none";

        }
    };

    // Define o que acontece quando o usuário clica no
            // botão 'Reiniciar Jogo'.
    reiniciarJogoBtn.onclick = function() {

        // Chama a função reiniciarJogo, que contém a
                // lógica para começar um novo jogo.
        reiniciarJogo();

    };


});


// Função que reinicia o jogo recarregando a página.
function reiniciarJogo() {

    // Usa o método 'reload' do objeto 'location' para
            // recarregar a página atual.
    // Isso efetivamente reinicia todo o estado do jogo, limpando
            // todas as variáveis e reiniciando o script.
    location.reload();

}