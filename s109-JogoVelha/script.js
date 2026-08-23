// Cria uma variável chamada 'tabuleiro' e a inicializa 
    // com um array de 9 elementos vazios.
// Cada elemento do array representa uma célula no 
    // tabuleiro do jogo da velha.
let tabuleiro = ['', '', '', '', '', '', '', '', ''];

// Define a variável 'jogadorAtual' e atribui o valor 'X',
// indicando que o jogador 'X' será o primeiro a jogar.
let jogadorAtual = 'X';

// Inicializa a variável 'jogoAtivo' como true, indicando
// que o jogo está ativo e pode prosseguir.
let jogoAtivo = true;

// Define e inicializa a variável 'pontuacaoJogador' com 0.
// Esta variável armazena a pontuação do jogador humano
// durante a sessão de jogo.
let pontuacaoJogador = 0;

// Define e inicializa a variável 'pontuacaoComputador' com 0.
// Esta variável armazena a pontuação do computador
// durante a sessão de jogo.
let pontuacaoComputador = 0;

// Define e inicializa a variável 'pontuacaoEmpates' com 0.
// Esta variável conta o número de jogos que
// terminaram em empate.
let pontuacaoEmpates = 0;


// Cria uma constante chamada 'COMBINACOES_VITORIA' e a
// atribui a um array de arrays. 
// Cada sub-array contém os índices das posições no
// tabuleiro que formam uma linha, coluna ou diagonal completa.
const COMBINACOES_VITORIA = [

    [0, 1, 2], // Primeira linha: estes índices representam as células na primeira linha do tabuleiro de jogo da velha.
    [3, 4, 5], // Segunda linha: estes índices representam as células na segunda linha do tabuleiro.
    [6, 7, 8], // Terceira linha: estes índices representam as células na terceira linha do tabuleiro.

    [0, 3, 6], // Primeira coluna: estes índices representam as células na primeira coluna vertical do tabuleiro.
    [1, 4, 7], // Segunda coluna: estes índices representam as células na segunda coluna vertical.
    [2, 5, 8], // Terceira coluna: estes índices representam as células na terceira coluna vertical.

    [0, 4, 8], // Diagonal principal: estes índices vão do canto superior esquerdo ao canto inferior direito do tabuleiro.
    [2, 4, 6]  // Diagonal secundária: estes índices vão do canto superior direito ao canto inferior esquerdo.

];


// Define a função 'fazerJogada', que é responsável por
// processar uma jogada feita em uma célula específica do tabuleiro.
function fazerJogada(indiceCelula) {

    // Esta linha de código verifica duas condições antes
            // de proceder com a jogada:
    // 1. Se 'jogoAtivo' é falso, o que indica que o jogo não
            // está mais em progresso (talvez alguém já tenha
            // ganho ou o jogo acabou em empate),
            // a função irá parar imediatamente e não executará mais nada.
    // 2. Se a célula no 'tabuleiro' no índice especificado
            // 'indiceCelula' já contém um valor (ou seja,
            // não está vazia, indicado por ''),
            // a função também irá parar. Isso evita que uma célula
            // já ocupada seja sobreescrita, o que poderia
            // corromper o estado do jogo.
    if (!jogoAtivo || tabuleiro[indiceCelula] !== '') return;
    // A palavra-chave 'return' é usada aqui para sair da função
    // sem fazer mais nada se qualquer uma das condições acima for verdadeira.


    // Atribui o símbolo do jogador atual ('X' ou 'O') à
    // célula do tabuleiro no índice especificado.
    // Isso efetivamente faz a jogada colocando o símbolo
    // do jogador na posição escolhida.
    tabuleiro[indiceCelula] = jogadorAtual;

    // Chama a função 'renderizarTabuleiro' para atualizar
    // visualmente o tabuleiro na página,
    // refletindo a jogada que acabou de ser feita.
    renderizarTabuleiro();

    // Verifica se a jogada resultou em uma vitória.
    // A função 'verificarVitoria' checa todas as possíveis
    // combinações de vitória para ver se o jogador atual formou uma linha.
    if (verificarVitoria()) {

        // Se uma vitória foi detectada, define 'jogoAtivo' como false,
        // indicando que o jogo terminou e não devem ser
        // permitidas mais jogadas.
        jogoAtivo = false;

        // Atualiza as pontuações dos jogadores, incrementando a
        // pontuação do jogador atual.
        atualizarPontuacoes(jogadorAtual);

        // Usa 'setTimeout' para criar um pequeno atraso antes
        // de mostrar o alerta e reiniciar o jogo.
        // Isso é feito para garantir que o estado final do
        // jogo seja visível antes de qualquer interação.
        setTimeout(() => {

            // Mostra um alerta informando que o jogador atual venceu.
            alert(`${jogadorAtual} venceu!`);

            // Chama a função 'reiniciarJogo' para resetar o
            // tabuleiro e todas as variáveis relevantes,
            // começando um novo jogo.
            reiniciarJogo();

        }, 100); // O atraso é de 100 milissegundos.

        // A palavra-chave 'return' é usada para sair da
        // função imediatamente após uma vitória,
        // garantindo que nenhuma outra lógica ou jogada
        // seja processada após o término do jogo.
        return;

    }


    // Inicia uma condicional para verificar se o
    // jogo terminou em empate.
    // A função 'verificarEmpate' checa se todas as células do
    // tabuleiro estão preenchidas e se não há uma vitória.
    if (verificarEmpate()) {

        // Se um empate é detectado, a variável 'jogoAtivo' é definida como false.
        // Isso indica que o jogo terminou e novas jogadas não são permitidas.
        jogoAtivo = false;

        // Chama a função 'atualizarPontuacoes' com o argumento 'empate'.
        // Esta função incrementa a pontuação de empates e
        // atualiza a visualização das pontuações.
        atualizarPontuacoes('empate');

        // Utiliza 'setTimeout' para criar um pequeno atraso
        // antes de mostrar um alerta e reiniciar o jogo.
        // Esse atraso permite que os jogadores vejam o estado
        // final do tabuleiro antes do alerta ser mostrado.
        setTimeout(() => {

            // Mostra um alerta na tela com a mensagem 'Empate!',
            // indicando o resultado do jogo.
            alert('Empate!');

            // Chama a função 'reiniciarJogo' que prepara o
            // tabuleiro e as variáveis para um novo jogo,
            // resetando tudo para o estado inicial.
            reiniciarJogo();

        }, 100); // O atraso é de 100 milissegundos.

        // A palavra-chave 'return' é usada para sair da
        // função imediatamente após detectar um empate,
        // garantindo que nenhuma outra lógica ou jogada seja processada.
        return;

    }


    // Alterna o jogador atual. Se o jogador atual é 'X',
    // muda para 'O', e vice-versa.
    // Isso é feito usando um operador ternário: se a
    // condição 'jogadorAtual === 'X'' é verdadeira,
    // o jogadorAtual será definido como 'O'. Se for falsa,
    // será definido como 'X'.
    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';

    // Inicia uma condição para verificar se o jogador
    // atual é 'O' e se o jogo ainda está ativo.
    // Essa condição geralmente é usada para permitir que o
    // computador faça sua jogada automaticamente
    // quando é sua vez, simulando um jogo contra a máquina.
    if (jogadorAtual === 'O' && jogoAtivo) {

        // Utiliza a função 'setTimeout' para criar um
        // pequeno atraso antes da jogada do computador.
        // Isso pode ser útil para simular tempo de
        // pensamento e tornar o jogo mais realista.
        setTimeout(() => {

            // Chama a função 'movimentoComputador', que
            // contém a lógica de como o computador escolhe sua jogada.
            // Esta função vai determinar a melhor jogada possível
            // baseada na lógica implementada (por exemplo, um algoritmo minimax).
            movimentoComputador();

        }, 500); // O atraso é de 500 milissegundos (meio segundo).
        
    }

}

// Define a função 'movimentoComputador', que controla
// como o computador decide sua jogada.
function movimentoComputador() {

    // Inicializa a variável 'melhorPontuacao' com -Infinity,
    // que será usada para comparar e encontrar a melhor
    // pontuação possível entre as jogadas.
    let melhorPontuacao = -Infinity;
    
    // Declara a variável 'movimento', que armazenará o
    // índice da melhor jogada encontrada para o computador.
    let movimento;

    // Inicia um loop para percorrer cada célula do tabuleiro.
    for (let i = 0; i < tabuleiro.length; i++) {

        // Verifica se a célula atual está vazia, indicando
        // que é um lugar válido para fazer uma jogada.
        if (tabuleiro[i] === '') {

            // Temporariamente marca a célula com 'O', que é
            // o símbolo usado pelo computador.
            tabuleiro[i] = 'O';

            // Chama a função 'minimax' para avaliar a
            // pontuação dessa configuração de tabuleiro,
            // passando o tabuleiro atual, uma profundidade de
            // recursão inicial (0) e o indicador de que é a
            // vez do minimizador (false).
            let pontuacao = minimax(tabuleiro, 0, false);

            // Restaura a célula para vazia após a avaliação,
            // pois ainda não é a jogada final.
            tabuleiro[i] = '';

            // Compara a pontuação retornada com a melhor
            // pontuação já encontrada.
            if (pontuacao > melhorPontuacao) {

                // Se a nova pontuação for maior, atualiza
                // 'melhorPontuacao' com este novo valor.
                melhorPontuacao = pontuacao;

                // Registra o índice desta célula como a
                // melhor jogada possível até agora.
                movimento = i;

            }
        }
    }

    // Após encontrar a melhor jogada, chama a função 'fazerJogada'
    // com o índice da melhor célula encontrada,
    // efetivamente realizando a jogada no tabuleiro.
    fazerJogada(movimento);

}


// Define a função 'minimax', que é um algoritmo recursivo
// utilizado para determinar o melhor movimento em um jogo de turno.
// 'tabuleiro' é o estado atual do jogo, 'profundidade' indica
// quantos níveis de movimentos à frente estamos analisando,
// e 'estaMaximizando' é um booleano que diz se estamos
// maximizando ou minimizando a pontuação.
function minimax(tabuleiro, profundidade, estaMaximizando) {

    // Chama a função 'verificarVencedor' para verificar se
    // há um vencedor no estado atual do tabuleiro.
    let resultado = verificarVencedor();

    // Se 'resultado' não for null, significa que um
    // jogador venceu ou o jogo acabou em empate.
    if (resultado !== null) {

        // Retorna uma pontuação baseada no jogador que venceu.
        // Se 'O' é o vencedor, retorna 10 menos a profundidade.
                // Isso significa que quanto mais rápido o computador vencer,
        // melhor é a pontuação, pois o objetivo é maximizar a pontuação
                // do 'O' e minimizar a quantidade de movimentos até a vitória.
        // Se 'X' (o humano) venceu, retorna a profundidade menos 10,
                // indicando uma situação desfavorável para o computador.
        // A profundidade subtraída implica que uma derrota mais tardia é
                // menos prejudicial do que uma derrota imediata.
        return resultado === 'O' ? 10 - profundidade : profundidade - 10;
        
    }


    // Se 'estaMaximizando' for verdadeiro, estamos
    // avaliando os movimentos para o computador 'O'.
    if (estaMaximizando) {

        // Inicializa 'melhorPontuacao' como -Infinity para
        // garantir que qualquer pontuação inicial será maior.
        let melhorPontuacao = -Infinity;

        // Itera sobre cada célula do tabuleiro.
        for (let i = 0; i < tabuleiro.length; i++) {

            // Verifica se a célula atual do tabuleiro está vazia, o
            // que significa que ninguém jogou nessa posição.
            // Esta é uma verificação crucial porque só se pode jogar em
            // células que ainda não foram ocupadas.
            if (tabuleiro[i] === '') {

                // Simula uma jogada colocando o símbolo 'O' na célula atual.
                // Esta linha altera temporariamente o tabuleiro,
                // adicionando o 'O' na posição i.
                // Isso é feito para avaliar o impacto potencial
                // dessa jogada nas próximas etapas do jogo.
                tabuleiro[i] = 'O';

                // Chama a função 'minimax' recursivamente para avaliar o
                // tabuleiro depois da jogada simulada.
                // A profundidade é incrementada por 1, indicando que
                // estamos um nível mais profundo na árvore de jogadas.
                // O parâmetro 'false' significa que agora é a vez do
                // minimizador (o jogador humano, que usa 'X'),
                // para jogar, refletindo a alternância de turnos no jogo.
                let pontuacao = minimax(tabuleiro, profundidade + 1, false);

                // Desfaz a jogada simulada, removendo o 'O' e
                // retornando a célula ao estado vazio.
                // Isso é necessário porque a mesma célula será
                // considerada em futuras simulações de jogadas,
                // e para cada simulação, o tabuleiro precisa estar no
                // estado que estava antes da jogada ser feita.
                tabuleiro[i] = '';

                // Compara a pontuação obtida da simulação (que representa o
                // resultado de um conjunto de jogadas até o final do jogo
                // a partir dessa posição) com a melhor pontuação que já
                // foi encontrada para outras simulações no mesmo nível de profundidade.
                // 'Math.max' é usado para manter a melhor pontuação possível
                // para o maximizador, que neste caso é o computador jogando com 'O'.
                // Isso significa que o algoritmo está buscando a jogada que
                // leva ao melhor resultado possível assumindo que o oponente
                // também joga da melhor forma possível.
                melhorPontuacao = Math.max(pontuacao, melhorPontuacao);

            }

        }

        // Retorna a melhor pontuação encontrada para
        // essa ramificação de jogadas.
        return melhorPontuacao;

    } else {
        
        // Inicializa 'melhorPontuacao' como Infinity
        // para maximizar a pontuação do oponente.
        // Ao começar com Infinity, qualquer pontuação mais
        // baixa encontrada durante a simulação das jogadas será considerada,
        // pois buscamos a menor pontuação, que representa a
        // melhor jogada para o oponente e a pior para o computador.
        let melhorPontuacao = Infinity;

        // Itera sobre cada célula do tabuleiro. Esta iteração
        // permite explorar todas as possíveis jogadas que o oponente pode fazer.
        for (let i = 0; i < tabuleiro.length; i++) {

            // Verifica se a célula atual está vazia. Uma célula
            // vazia indica que é um local disponível para fazer uma jogada.
            if (tabuleiro[i] === '') {

                // Faz uma jogada simulada colocando 'X' na
                // célula, que é o símbolo do oponente humano.
                // Esta simulação é crucial para avaliar o impacto
                // potencial dessa jogada no resultado do jogo.
                tabuleiro[i] = 'X';

                // Chama 'minimax' recursivamente, mas agora com o
                // objetivo de maximizar a pontuação na próxima chamada,
                // pois a função alternará de volta para a perspectiva
                // do computador, que tentará maximizar sua pontuação.
                // A profundidade é incrementada por 1, significando
                // que estamos um nível mais profundo na árvore de decisão.
                let pontuacao = minimax(tabuleiro, profundidade + 1, true);

                // Desfaz a jogada simulada revertendo a célula para o estado vazio.
                // Este passo é essencial para manter o estado original
                // do tabuleiro, permitindo que futuras simulações sejam precisas.
                tabuleiro[i] = '';

                // Atualiza 'melhorPontuacao' para o menor valor
                // entre a pontuação obtida e a melhor pontuação anterior.
                // Usando 'Math.min', estamos buscando a menor
                // pontuação possível, o que equivale à melhor jogada para o humano e,
                // consequentemente, à pior para o computador. Este
                // processo é o cerne do minimizar no algoritmo minimax,
                // onde o objetivo é reduzir o sucesso potencial do adversário.
                melhorPontuacao = Math.min(pontuacao, melhorPontuacao);

            }
        

        }

        // Retorna a pior pontuação (do ponto de vista do
        // computador) encontrada para essa ramificação,
        // representando a melhor jogada defensiva para o humano.
        return melhorPontuacao;
    }

}

// Define a função 'verificarVencedor', que é chamada para
// verificar se há uma combinação vencedora no tabuleiro.
function verificarVencedor() {

    // Inicia um loop que percorre cada uma das
    // combinações de vitória possíveis.
    // 'COMBINACOES_VITORIA' é uma matriz pré-definida que
    // contém todas as combinações de índices do tabuleiro que
    // podem resultar em uma vitória (linhas, colunas, diagonais).
    for (let combinacao of COMBINACOES_VITORIA) {

        // Desestrutura a combinação atual para obter os três
        // índices que compõem uma linha, coluna ou diagonal.
        const [a, b, c] = combinacao;

        // Verifica se a célula no índice 'a' do tabuleiro não
        // está vazia e se os valores nas células dos índices
        // 'a', 'b' e 'c' são iguais. Essa é a condição para uma vitória:
        // 1. 'tabuleiro[a]' deve ser verdadeiro (não vazio).
        // 2. 'tabuleiro[a]' deve ser igual a 'tabuleiro[b]' e 'tabuleiro[c]'.
        // Isso significa que todas as três células na combinação
        // contêm o mesmo símbolo ('X' ou 'O'),
        // completando uma linha, coluna ou diagonal.
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[b] === tabuleiro[c]) {

            // Se encontrada uma combinação vencedora, retorna o valor da
            // célula (o símbolo do jogador que venceu).
            return tabuleiro[a];

        }
    }

    // Se o loop termina sem encontrar uma combinação vencedora,
    // retorna null, indicando que ainda não há um vencedor.
    return null;
    
}


// Define a função 'verificarVitoria', que é usada
// para determinar se há uma vitória no jogo.
function verificarVitoria() {

    // Chama a função 'verificarVencedor' para checar se há um vencedor.
    // 'verificarVencedor' retorna o símbolo do jogador ('X' ou 'O') se houver uma vitória,
    // ou retorna 'null' se ninguém tiver ganhado ainda.
    // A função 'verificarVitoria' retorna true se
    // 'verificarVencedor' retornar algo diferente de null,
    // o que significa que um jogador venceu. Caso contrário, retorna false.
    return verificarVencedor() !== null;

}


// Define a função 'verificarEmpate', utilizada
// para determinar se o jogo resultou em empate.
function verificarEmpate() {

    // Utiliza o método 'includes' do array para
    // verificar se o tabuleiro ainda contém alguma célula vazia ('').
    // Se todas as células estiverem preenchidas (não incluir ''),
    // isso indica que o tabuleiro está completo
    // e não há espaços vazios restantes para jogadas adicionais.
    // A função retorna true se não houver células
    // vazias (indicando um possível empate),
    // e false se ainda houver espaços onde os jogadores podem jogar.
    return !tabuleiro.includes('');
}


// Define a função 'atualizarPontuacoes', que é responsável
// por atualizar as pontuações do jogo com base no resultado de cada rodada.
function atualizarPontuacoes(vencedor) {

    // Verifica se o resultado da rodada foi um 'empate'.
    if (vencedor === 'empate') {

        // Se for um empate, incrementa o contador de empates.
        // 'pontuacaoEmpates' é uma variável que rastreia o
        // número total de jogos que terminaram sem um vencedor claro.
        pontuacaoEmpates++;

    } else if (vencedor === 'X') {

        // Caso o vencedor seja o jogador 'X', incrementa
        // a pontuação do jogador.
        // 'pontuacaoJogador' é uma variável que mantém a
        // contagem das vitórias do jogador humano.
        pontuacaoJogador++;

    } else {

        // Se o vencedor for 'O', que representa o computador
        // neste contexto, incrementa a pontuação do computador.
        // 'pontuacaoComputador' rastreia quantas vezes o computador ganhou.
        pontuacaoComputador++;
    }

    // Após atualizar a pontuação adequada, chama a
    // função 'renderizarPontuacoes'.
    // Esta função é responsável por atualizar a interface do
    // usuário para refletir as novas pontuações,
    // garantindo que os jogadores possam ver o estado
    // atual das pontuações em tempo real.
    renderizarPontuacoes();

}


// Define a função 'renderizarPontuacoes', responsável por
// atualizar a visualização das pontuações na interface do usuário.
function renderizarPontuacoes() {

    // Acessa o elemento HTML com o id 'pontuacao-jogador'.
    // 'document.getElementById' é um método do DOM (Document
    // Object Model) que retorna o elemento que possui o ID especificado.
    // Uma vez que o elemento é retornado, a propriedade
    // 'textContent' é usada para modificar o texto contido nesse elemento.
    // A pontuação atual do jogador humano é atribuída a esse
    // elemento, assim atualizando o valor visível na tela.
    document.getElementById('pontuacao-jogador').textContent = pontuacaoJogador;

    // Similar ao passo anterior, acessa o elemento com o id 'pontuacao-computador'.
    // Atualiza o texto desse elemento para refletir a pontuação atual do computador,
    // permitindo que os usuários vejam quantas vezes o computador ganhou.
    document.getElementById('pontuacao-computador').textContent = pontuacaoComputador;

    // Acessa o elemento com o id 'pontuacao-empates'.
    // Atualiza o conteúdo textual deste elemento para mostrar o
    // número de empates ocorridos até agora no jogo.
    // Isso fornece um feedback completo sobre todos os
    // resultados possíveis das partidas jogadas.
    document.getElementById('pontuacao-empates').textContent = pontuacaoEmpates;

}


// Define a função 'renderizarTabuleiro', que atualiza o
// tabuleiro visual na interface do usuário
// com base no estado atual do array 'tabuleiro', que
// contém os símbolos das jogadas ('X', 'O', ou vazio).
function renderizarTabuleiro() {

    // Inicia um loop que percorrerá cada elemento do array 'tabuleiro'.
    // 'tabuleiro.length' dá o número total de células no
    // tabuleiro, que é 9 num jogo da velha padrão (3x3).
    for (let i = 0; i < tabuleiro.length; i++) {

        // Acessa cada célula visual correspondente no HTML pelo
        // índice usando 'document.getElementsByClassName('celula')[i]'.
        // 'getElementsByClassName' retorna uma coleção de todos
        // elementos que possuem a classe especificada, neste caso, 'celula'.
        // '[i]' acessa o elemento da coleção correspondente ao
        // índice atual do loop, sincronizando os índices do array 'tabuleiro'
        // com os elementos da interface do usuário.
        const celula = document.getElementsByClassName('celula')[i];

        // Define o conteúdo de texto de cada célula visual no tabuleiro
        // para corresponder ao valor da célula no array 'tabuleiro'.
        // Se 'tabuleiro[i]' é 'X', 'O' ou '', o mesmo será mostrado
        // na célula correspondente na interface do usuário.
        // 'textContent' é uma propriedade que define ou retorna o
        // conteúdo de texto de um nó e de seus descendentes.
        celula.textContent = tabuleiro[i];

    }
}


// Define a função 'reiniciarJogo', que é responsável por
// resetar todas as variáveis e estados para seus valores iniciais,
// permitindo que um novo jogo seja iniciado sem
// interferência do estado anterior.
function reiniciarJogo() {

    // Redefine o array 'tabuleiro' para um novo
    // array de 9 strings vazias.
    // Isso limpa o tabuleiro, removendo todas as marcas
    // de 'X' e 'O' que foram feitas na partida anterior.
    tabuleiro = ['', '', '', '', '', '', '', '', ''];

    // Define 'jogadorAtual' para 'X', garantindo que o
    // jogador 'X' sempre comece o jogo.
    // Esta é uma convenção comum em jogos da velha, onde um
    // dos jogadores (neste caso, 'X') sempre inicia a partida.
    jogadorAtual = 'X';

    // Define a variável 'jogoAtivo' como true, indicando que o
    // jogo está ativo e que as jogadas podem ser feitas.
    // Isso é importante para permitir que o controle de fluxo do
    // jogo continue, como verificar vitórias ou empates.
    jogoAtivo = true;

    // Chama a função 'renderizarTabuleiro' para
    // atualizar visualmente o tabuleiro.
    // Isso assegura que o tabuleiro visual reflita o novo
    // estado limpo do array 'tabuleiro',
    // mostrando um tabuleiro vazio pronto para uma nova partida.
    renderizarTabuleiro();
}

// Chama a função 'renderizarPontuacoes' imediatamente.
// Isso é útil para garantir que as pontuações mostradas
// na tela sejam atualizadas para refletir quaisquer mudanças
// que possam ter acontecido no final do jogo anterior,
// como atualizar a contagem de empates ou pontuações de jogadores.
renderizarPontuacoes();