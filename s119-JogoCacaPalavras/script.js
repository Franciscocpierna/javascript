const todasPalavras = [
    ['BANANA', 'MAÇÃ', 'UVA', 'PERA', 'MELANCIA'],
    ['MORANGO', 'ABACAXI', 'KIWI', 'PÊSSEGO', 'CEREJA'],
    ['LARANJA', 'LIMÃO', 'MANGA', 'COCO', 'ABACATE'],
    ['GOIABA', 'JACA', 'FIGO', 'TAMARINDO', 'AMÊNDOA'],
    ['PITANGA', 'ACEROLA', 'GRAVIOLA', 'CAJU', 'GUARANÁ'],
    ['PITAYA', 'ROMÃ', 'JABUTICABA', 'MARACUJÁ', 'FRAMBOESA'],
    ['MIRTILO', 'NECTARINA', 'CARAMBOLA', 'AMORA', 'DAMASCO'],
    ['SALSA', 'HORTELÃ', 'MANJERICÃO', 'ALECRIM', 'TOMILHO'],
    ['ORÉGANO', 'COENTRO', 'CEREFOLHO', 'LOURO', 'ERVA-DOCE'],
    ['TOMATE', 'ALFACE', 'RÚCULA', 'ESPINAFRE', 'AGRIÃO']
];
/* Define uma matriz que contém listas de palavras 
        agrupadas por categorias. Cada sub-lista representa um 
        conjunto de palavras a serem encontradas em 
        uma fase do jogo. */

const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÁÀÂÃÉÈÊÍÎÓÒÔÕÚÛÇ'.split('');
/* Cria uma matriz de letras dividindo a string fornecida. 
        Essas letras podem ser usadas para preencher as 
        células vazias da grade do jogo. */

const grid = document.getElementById('caça-palavras');
/* Seleciona o elemento HTML com o id 'caça-palavras' e o 
        armazena na constante 'grid'. Este elemento 
        representa a área onde o jogo será exibido. */

const listaPalavras = document.getElementById('lista-palavras');
/* Seleciona o elemento HTML com o id 'lista-palavras' e 
        o armazena na constante 'listaPalavras'. Este elemento 
        conterá a lista de palavras que o jogador 
        precisa encontrar. */

const mensagem = document.getElementById('mensagem');
/* Seleciona o elemento HTML com o id 'mensagem' e o 
        armazena na constante 'mensagem'. Este elemento 
        será usado para exibir mensagens ao jogador, 
        como quando todas as palavras são encontradas. */

const botaoDica = document.getElementById('botao-dica');
/* Seleciona o elemento HTML com o id 'botao-dica' e o 
        armazena na constante 'botaoDica'. Este botão 
        será usado para fornecer dicas ao jogador. */

const modalDica = document.getElementById('modal-dica');
/* Seleciona o elemento HTML com o id 'modal-dica' e o 
        armazena na constante 'modalDica'. Este elemento 
        representa um modal que pode ser exibido 
        para mostrar dicas. */

const caçaPalavrasDica = document.getElementById('caça-palavras-dica');
/* Seleciona o elemento HTML com o id 'caça-palavras-dica' e o 
        armazena na constante 'caçaPalavrasDica'. Este 
        elemento será usado para exibir a dica do 
        caça-palavras. */

const valorPontuacao = document.getElementById('valor-pontuacao');
/* Seleciona o elemento HTML com o id 'valor-pontuacao' e o 
        armazena na constante 'valorPontuacao'. Este 
        elemento exibirá a pontuação atual do jogador. */

const totalFases = 10;
/* Define uma constante que representa o número 
        total de fases no jogo. */


let palavras = [];
/* Declara uma variável 'palavras' como uma matriz 
        vazia. Esta matriz será usada para armazenar as 
        palavras da fase atual do jogo. */

let tamanho = 15;
/* Declara uma variável 'tamanho' e a inicializa com o 
        valor 15. Este valor representa o tamanho da 
        grade (15x15) do jogo de caça-palavras. */

let faseAtual = 0;
/* Declara uma variável 'faseAtual' e a inicializa com o 
        valor 0. Esta variável mantém o controle da 
        fase atual em que o jogador está. */

let pontos = 0;
/* Declara uma variável 'pontos' e a inicializa com o 
        valor 0. Esta variável será usada para 
        armazenar a pontuação atual do jogador. */

let encontradas = 0;
/* Declara uma variável 'encontradas' e a inicializa 
        com o valor 0. Esta variável rastreia o número de 
        palavras que o jogador encontrou até agora na 
        fase atual. */

let celulaInicial = null;
/* Declara uma variável 'celulaInicial' e a inicializa 
        com o valor null. Esta variável será usada para 
        armazenar a célula inicial selecionada pelo 
        jogador ao tentar formar uma palavra. */

let celulaFinal = null;
/* Declara uma variável 'celulaFinal' e a inicializa 
        com o valor null. Esta variável será usada para 
        armazenar a célula final selecionada pelo 
        jogador ao tentar formar uma palavra. */

let selecionando = false;
/* Declara uma variável 'selecionando' e a inicializa 
        com o valor false. Esta variável será usada 
        para rastrear se o jogador está atualmente no 
        processo de selecionar células para formar 
        uma palavra. */

const criarGrid = (elementoGrid) => {
    /* Declara uma constante 'criarGrid' que é uma 
            função que recebe um parâmetro 'elementoGrid'. 
            Esta função será usada para criar a 
            grade do jogo. */

    elementoGrid.innerHTML = '';
    /* Limpa o conteúdo HTML interno do elemento 
            passado como argumento, removendo quaisquer 
            células anteriores da grade. */
    
    for (let linha = 0; linha < tamanho; linha++) {
        /* Inicia um loop que itera de 0 até o valor 
                de 'tamanho' (15), criando uma linha de 
                células a cada iteração. */
        
        for (let coluna = 0; coluna < tamanho; coluna++) {
            /* Inicia um loop aninhado que itera de 0 até o 
                    valor de 'tamanho' (15), criando uma 
                    célula para cada coluna na linha atual. */
            
            const celula = document.createElement('div');
            /* Cria um novo elemento 'div' que representará 
                    uma célula na grade. */
            
            celula.classList.add('celula');
            /* Adiciona a classe 'celula' à nova 'div', 
                    aplicando estilos CSS específicos a 
                    este elemento. */
            
            celula.dataset.linha = linha;
            /* Define um atributo de dados 'linha' na célula, 
                    armazenando o número da linha atual para 
                    referência futura. */
            
            celula.dataset.coluna = coluna;
            /* Define um atributo de dados 'coluna' na célula, 
                    armazenando o número da coluna atual para 
                    referência futura. */
            
            celula.dataset.letra = '';
            /* Define um atributo de dados 'letra' na célula, 
                    inicialmente vazio, que será preenchido com a 
                    letra correspondente posteriormente. */
            
            elementoGrid.appendChild(celula);
            /* Adiciona a célula recém-criada como um filho do 
            elemento 'elementoGrid', construindo assim a grade. */

        }
    }
};

const colocarPalavras = (elementoGrid) => {
    /* Declara uma constante 'colocarPalavras' que é 
            uma função que recebe um parâmetro 'elementoGrid'. 
            Esta função posiciona as palavras da fase 
            atual na grade do jogo. */

    palavras.forEach(palavra => {
        /* Inicia um loop que percorre cada palavra na 
                matriz 'palavras' da fase atual. */

        let colocado = false;
        /* Inicializa uma variável 'colocado' como falsa, 
                usada para controlar se a palavra foi 
                colocada na grade com sucesso. */

        while (!colocado) {
            /* Inicia um loop que continuará até que a 
                    palavra seja colocada na grade 
                    com sucesso. */

            const direcao = Math.floor(Math.random() * 8);
            /* Gera uma direção aleatória para posicionar a 
                    palavra. Existem 8 direções possíveis (0 a 7). */

            const linhaInicial = Math.floor(Math.random() * tamanho);
            /* Gera um número aleatório para a linha 
                    inicial, que varia de 0 a 'tamanho' (15). */

            const colunaInicial = Math.floor(Math.random() * tamanho);
            /* Gera um número aleatório para a coluna 
                    inicial, que varia de 0 a 'tamanho' (15). */

            if (podeColocarPalavra(linhaInicial, colunaInicial, palavra, direcao, elementoGrid)) {
                /* Verifica se a palavra pode ser colocada na 
                        posição inicial especificada e na direção 
                        determinada, sem ultrapassar os limites 
                        da grade ou sobrepor outras letras. */

                colocarPalavra(linhaInicial, colunaInicial, palavra, direcao, elementoGrid);
                /* Coloca a palavra na grade na posição e 
                        direção especificadas. */

                colocado = true;
                /* Define 'colocado' como verdadeiro, 
                        encerrando o loop enquanto. */

            }
        }
    });
};


const podeColocarPalavra = (linha, coluna, palavra, direcao, elementoGrid) => {
    /* Declara uma constante 'podeColocarPalavra' que é 
            uma função que verifica se uma palavra pode ser 
            colocada em uma determinada posição e 
            direção na grade. */

    const comprimento = palavra.length;
    /* Obtém o comprimento da palavra e armazena na 
            constante 'comprimento'. */

    for (let i = 0; i < comprimento; i++) {
        /* Inicia um loop que itera através de 
                cada letra da palavra. */

        const r = linha + (direcao === 0 || direcao === 1 || direcao === 7 ? -i : direcao === 3 || direcao === 4 || direcao === 5 ? i : 0);
        /* Calcula a linha da célula com base na direção:
           - Direções 0, 1, e 7 movem para cima (-i)
           - Direções 3, 4, e 5 movem para baixo (+i)
           - Caso contrário, a linha não muda. */

        const c = coluna + (direcao === 1 || direcao === 2 || direcao === 3 ? i : direcao === 5 || direcao === 6 || direcao === 7 ? -i : 0);
        /* Calcula a coluna da célula com base na direção:
           - Direções 1, 2, e 3 movem para a direita (+i)
           - Direções 5, 6, e 7 movem para a esquerda (-i)
           - Caso contrário, a coluna não muda. */

        if (r < 0 || r >= tamanho || c < 0 || c >= tamanho) return false;
        /* Verifica se a célula calculada está fora dos 
                limites da grade. Se estiver, retorna false 
                indicando que a palavra não pode ser 
                colocada nesta posição. */

        const celula = obterCelula(r, c, elementoGrid);
        /* Obtém a célula na posição calculada (r, c) na grade. */

        if (celula.dataset.letra && celula.dataset.letra !== palavra[i]) return false;
        /* Verifica se a célula já tem uma letra diferente da 
                letra da palavra na posição atual. Se tiver, 
                retorna false indicando que a palavra não 
                pode ser colocada aqui. */

    }

    return true;
    /* Se todas as verificações passarem, retorna true 
            indicando que a palavra pode ser colocada na 
            posição e direção especificadas. */

};


const colocarPalavra = (linha, coluna, palavra, direcao, elementoGrid) => {
    /* Declara uma constante 'colocarPalavra' que é uma 
            função que posiciona uma palavra na grade a 
            partir de uma posição inicial e em uma 
            direção específica. */

    for (let i = 0; i < palavra.length; i++) {
        /* Inicia um loop que itera através de 
                cada letra da palavra. */

        const r = linha + (direcao === 0 || direcao === 1 || direcao === 7 ? -i : direcao === 3 || direcao === 4 || direcao === 5 ? i : 0);
        /* Calcula a linha da célula com base na direção:
           - Direções 0, 1, e 7 movem para cima (-i)
           - Direções 3, 4, e 5 movem para baixo (+i)
           - Caso contrário, a linha não muda. */

        const c = coluna + (direcao === 1 || direcao === 2 || direcao === 3 ? i : direcao === 5 || direcao === 6 || direcao === 7 ? -i : 0);
        /* Calcula a coluna da célula com base na direção:
           - Direções 1, 2, e 3 movem para a direita (+i)
           - Direções 5, 6, e 7 movem para a esquerda (-i)
           - Caso contrário, a coluna não muda. */

        const celula = obterCelula(r, c, elementoGrid);
        /* Obtém a célula na posição calculada (r, c) na grade. */

        celula.dataset.letra = palavra[i];
        /* Define o atributo de dados 'letra' da célula 
                para a letra atual da palavra. */

        celula.textContent = palavra[i];
        /* Define o conteúdo de texto da célula para a 
                letra atual da palavra, tornando-a visível 
                na célula. */

        celula.dataset.palavra = palavra;
        /* Define o atributo de dados 'palavra' da célula 
                para a palavra inteira, permitindo que 
                cada célula saiba a qual palavra pertence. */

    }
};


const obterCelula = (linha, coluna, elementoGrid) => {
    /* Declara uma constante 'obterCelula' que é uma 
            função que retorna a célula da grade na 
            posição especificada pela linha e coluna. */

    return elementoGrid.querySelector(`.celula[data-linha='${linha}'][data-coluna='${coluna}']`);
    /* Retorna a célula da grade que tem os atributos de 
            dados 'linha' e 'coluna' correspondentes aos 
            valores passados. Usa um seletor CSS para 
            encontrar o elemento. */

};


const preencherCelulasVazias = (elementoGrid) => {
    /* Declara uma constante 'preencherCelulasVazias' 
            que é uma função que recebe um parâmetro 'elementoGrid'. 
            Esta função preenche as células vazias da grade 
            com letras aleatórias. */

    const celulas = elementoGrid.querySelectorAll('.celula');
    /* Seleciona todas as células (elementos com a 
                classe 'celula') dentro do 'elementoGrid' e 
                as armazena na constante 'celulas'. */

    celulas.forEach(celula => {
        /* Inicia um loop que percorre cada célula 
                na NodeList 'celulas'. */

        if (!celula.dataset.letra) {
            /* Verifica se a célula não tem uma letra 
                    atribuída (atributo de dados 'letra' 
                    está vazio). */

            const letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
            /* Gera uma letra aleatória da matriz 'letras'. 
                    A função 'Math.random()' gera um número 
                    aleatório entre 0 e 1, que é multiplicado 
                    pelo comprimento da matriz 'letras'. 'Math.floor()' 
                    arredonda o número para baixo para obter um 
                    índice válido da matriz. */

            celula.dataset.letra = letraAleatoria;
            /* Atribui a letra aleatória gerada ao atributo 
                    de dados 'letra' da célula. */

            celula.textContent = letraAleatoria;
            /* Define o conteúdo de texto da célula para a 
                    letra aleatória gerada, tornando-a 
                    visível na célula. */

        }
    });
};




const iniciarFase = () => {
    /* Declara uma constante 'iniciarFase' que é 
            uma função para iniciar uma nova 
            fase do jogo de caça-palavras. */

    encontradas = 0;
    /*  Redefine a variável 'encontradas' para 0, 
            indicando que nenhuma palavra foi 
            encontrada na nova fase. */

    palavras = todasPalavras[faseAtual];
    /*  Define a variável 'palavras' como a 
            lista de palavras da fase atual.
    'todasPalavras' é uma matriz de todas as palavras 
            agrupadas por fases, e 'faseAtual' indica o 
            índice da fase atual. */

    listaPalavras.innerHTML = '';
    /*  Limpa o conteúdo HTML interno do elemento 'listaPalavras', 
            removendo quaisquer palavras listadas de 
            fases anteriores. */

    palavras.forEach(palavra => {
        /*  Itera sobre cada palavra na 
                lista de palavras da fase atual. */

        const li = document.createElement('li');
        /*  Cria um novo elemento de lista 'li' 
                para cada palavra. */

        li.textContent = palavra;
        /*  Define o conteúdo de texto do 
                elemento 'li' como a palavra atual. */

        listaPalavras.appendChild(li);
        /*  Adiciona o elemento 'li' ao elemento 'listaPalavras', 
                exibindo a palavra na lista de palavras a 
                serem encontradas. */
    });

    criarGrid(grid);
    /* Chama a função 'criarGrid' passando 'grid' 
            como argumento.
    Esta função cria a grade de células para a 
            nova fase do jogo. */

    colocarPalavras(grid);
    /* Chama a função 'colocarPalavras' 
            passando 'grid' como argumento.
    Esta função posiciona as palavras da 
            fase atual na grade. */

    preencherCelulasVazias(grid);
    /* Chama a função 'preencherCelulasVazias' 
            passando 'grid' como argumento.
    Esta função preenche as células vazias da 
            grade com letras aleatórias. */

};


const iniciarJogo = () => {
    /* Declara uma constante 'iniciarJogo' que é 
            uma função para inicializar o jogo 
            de caça-palavras.
    Esta função recupera os dados salvos do 
            jogo (pontos e fase) e inicia a 
            primeira fase. */

    pontos = parseInt(localStorage.getItem('cacaPalavrasPontos')) || 0;
    /* Obtém a pontuação armazenada no localStorage 
            com a chave 'cacaPalavrasPontos' e a 
            converte para um número inteiro.
    Se não houver pontuação armazenada, 
            define 'pontos' como 0.
    'localStorage.getItem' retorna o valor 
            armazenado como string ou null se 
            a chave não existir.
    'parseInt' converte a string para um 
            número inteiro.
    O operador '||' garante que 'pontos' seja 0 
            se 'parseInt' retornar NaN (Not a Number). */

    faseAtual = parseInt(localStorage.getItem('cacaPalavrasFase')) || 0;
    /*  Obtém a fase armazenada no localStorage com a 
            chave 'cacaPalavrasFase' e a converte 
            para um número inteiro.
    Se não houver fase armazenada, define 'faseAtual' como 0.
    'localStorage.getItem' retorna o valor armazenado 
            como string ou null se a chave não existir.
    'parseInt' converte a string para um número inteiro.
    O operador '||' garante que 'faseAtual' seja 0 
            se 'parseInt' retornar NaN (Not a Number). */

    valorPontuacao.textContent = pontos;
    /*  Atualiza o conteúdo de texto do elemento 'valorPontuacao' 
            para exibir a pontuação atual.
    Isso garante que a interface do usuário mostre a 
            pontuação correta ao iniciar o jogo. */

    iniciarFase();
    /*  Chama a função 'iniciarFase' para 
            iniciar a fase atual do jogo.
    Isso prepara a grade de palavras e exibe as 
            palavras a serem encontradas na 
            interface do usuário. */

};

iniciarJogo();


const mostrarDicas = () => {
    /* Declara uma constante 'mostrarDicas' que é 
            uma função responsável por exibir 
            dicas do caça-palavras.
    Esta função cria uma grade de dicas 
            com base na grade principal do jogo. */

    criarGrid(caçaPalavrasDica);
    /* Chama a função 'criarGrid' passando 
            'caçaPalavrasDica' como argumento.
    Esta função limpa e cria uma nova grade dentro 
            do elemento com o ID 'caça-palavras-dica'. */

    for (let linha = 0; linha < tamanho; linha++) {
        /* Inicia um loop que itera sobre 
                cada linha da grade.
        O loop continua enquanto 'linha' for menor 
                que 'tamanho' (15). */

        for (let coluna = 0; coluna < tamanho; coluna++) {
            /* Inicia um loop aninhado que itera 
                    sobre cada coluna da grade na linha atual.
            O loop continua enquanto 'coluna' for 
                    menor que 'tamanho' (15). */

            const celulaPrincipal = obterCelula(linha, coluna, grid);
            /* Obtém a célula da grade principal na 
                    posição especificada por 'linha' e 
                    'coluna' usando a função 'obterCelula'.
            Armazena a célula obtida na constante 'celulaPrincipal'. */

            const celulaDica = obterCelula(linha, coluna, caçaPalavrasDica);
            /* Obtém a célula da grade de dicas na 
                    posição especificada por 'linha' 
                    e 'coluna' usando a função 'obterCelula'.
            Armazena a célula obtida na constante 'celulaDica'. */

            celulaDica.dataset.letra = celulaPrincipal.dataset.letra;
            /* Copia o valor do atributo de dados 'letra' 
                    da 'celulaPrincipal' para a 'celulaDica'.
            Isso garante que a célula de dica tenha a 
                    mesma letra que a célula correspondente 
                    na grade principal. */

            celulaDica.textContent = celulaPrincipal.textContent;
            /* Copia o conteúdo de texto da 'celulaPrincipal' 
                    para a 'celulaDica'.
            Isso garante que a célula de dica exiba a 
                    mesma letra que a célula correspondente 
                    na grade principal. */

            if (celulaPrincipal.classList.contains('selecionada')) {
                /* Verifica se a 'celulaPrincipal' contém a 
                        classe 'selecionada'.
                Isso indica que a célula faz parte de uma 
                        palavra encontrada no jogo. */

                celulaDica.classList.add('selecionada');
                /* Se a condição for verdadeira, adiciona a 
                        classe 'selecionada' à 'celulaDica'.
                Isso destaca a célula de dica para corresponder à 
                        aparência da célula correspondente na 
                        grade principal. */
            }

            if (celulaPrincipal.dataset.palavra) {
                /* Verifica se a 'celulaPrincipal' tem 
                        um atributo de dados 'palavra'.
                Isso indica que a célula faz parte de 
                        uma palavra no jogo. */

                celulaDica.classList.add('dica');
                /* Se a condição for verdadeira, adiciona a 
                        classe 'dica' à 'celulaDica'.
                Isso destaca a célula de dica para indicar 
                        que ela faz parte de uma palavra na 
                        grade principal. */
            }
        }
    }

    modalDica.style.display = 'block';
    /* Define a propriedade 'display' do elemento 'modalDica' 
            para 'block'.
    Isso exibe o modal de dicas, tornando-o visível 
            para o usuário. */

};


const fecharModal = () => {
    /* Declara uma constante 'fecharModal' que é 
            uma função para fechar o modal de dicas. */

    modalDica.style.display = 'none';
    /* Define a propriedade 'display' do 
            elemento 'modalDica' para 'none'.
    Isso oculta o modal de dicas, tornando-o 
            invisível para o usuário. */
};



botaoDica.addEventListener('click', mostrarDicas);
/* Adiciona um ouvinte de evento ao elemento '
        botaoDica' para o evento 'click' (quando o 
        botão é clicado).
Quando o evento ocorre, a função 'mostrarDicas' 
        é chamada.
Este evento é usado para exibir dicas ao 
        jogador, mostrando onde as palavras 
        estão localizadas na grade. */


const selecionarPalavra = (inicio, fim) => {
    /* Declara uma constante 'selecionarPalavra' que é 
            uma função para lidar com a seleção de uma 
            palavra entre duas células, 'inicio' e 'fim'. */

    const linhaInicial = parseInt(inicio.dataset.linha);
    /* Converte o valor do atributo de dados 'linha' da 
            célula inicial para um número inteiro e 
            armazena na variável 'linhaInicial'. */

    const colunaInicial = parseInt(inicio.dataset.coluna);
    /* Converte o valor do atributo de dados 'coluna' da 
            célula inicial para um número inteiro e 
            armazena na variável 'colunaInicial'. */

    const linhaFinal = parseInt(fim.dataset.linha);
    /* Converte o valor do atributo de dados 'linha' da 
            célula final para um número inteiro e armazena 
            na variável 'linhaFinal'. */

    const colunaFinal = parseInt(fim.dataset.coluna);
    /* Converte o valor do atributo de dados 'coluna' da 
            célula final para um número inteiro e armazena 
            na variável 'colunaFinal'. */

    const palavra = [];
    /* Inicializa um array vazio 'palavra' que armazenará as 
            células da palavra selecionada. */

    let direcao = null;
    /* Inicializa a variável 'direcao' como null. Esta 
            variável determinará a direção da seleção 
            da palavra. */

    if (linhaInicial === linhaFinal) {
        /* Verifica se a palavra está em uma 
                linha horizontal. */

        direcao = colunaInicial < colunaFinal ? 2 : 6;
        /* Se a coluna inicial for menor que a coluna 
                final, a direção é 2 (direita); caso 
                contrário, é 6 (esquerda). */

    } else if (colunaInicial === colunaFinal) {
        /* Verifica se a palavra está em uma 
                coluna vertical. */

        direcao = linhaInicial < linhaFinal ? 4 : 0;
        /* Se a linha inicial for menor que a linha final, a 
                direção é 4 (baixo); caso contrário, é 0 (cima). */

    } else if (linhaInicial < linhaFinal && colunaInicial < colunaFinal) {
        /* Verifica se a palavra está em uma diagonal 
                descendente da esquerda para a direita. */

        direcao = 3;
        /* Define a direção como 3 (diagonal 
                    descendente direita). */

    } else if (linhaInicial < linhaFinal && colunaInicial > colunaFinal) {
        /* Verifica se a palavra está em uma diagonal 
                    descendente da direita para a esquerda. */

        direcao = 5;
        /* Define a direção como 5 (diagonal 
                    descendente esquerda). */

    } else if (linhaInicial > linhaFinal && colunaInicial < colunaFinal) {
        /* Verifica se a palavra está em uma 
                diagonal ascendente da esquerda 
                para a direita. */

        direcao = 1;
        /* Define a direção como 1 (diagonal 
                    ascendente direita). */

    } else if (linhaInicial > linhaFinal && colunaInicial > colunaFinal) {
        /* Verifica se a palavra está em uma 
                diagonal ascendente da direita 
                para a esquerda. */

        direcao = 7;
        /* Define a direção como 7 (diagonal 
                    ascendente esquerda). */

    }
    // Continuação da função para 
            // processamento das células selecionadas

    if (direcao !== null) {
        /* Verifica se uma direção válida foi 
                determinada para a seleção da palavra. */
    
        let r = linhaInicial;
        /* Inicializa a variável 'r' com o valor 
                de 'linhaInicial', que representa a 
                linha atual na iteração. */
    
        let c = colunaInicial;
        /* Inicializa a variável 'c' com o valor 
                de 'colunaInicial', que representa a 
                coluna atual na iteração. */
    
        while (r !== linhaFinal || c !== colunaFinal) {
            /* Inicia um loop que continua enquanto a 
                    linha ou a coluna atual não 
                    correspondem à linha ou coluna 
                    final da seleção. */
    
            const celula = obterCelula(r, c, grid);
            /* Obtém a célula na posição atual (r, c) da 
                    grade usando a função 'obterCelula'. */
    
            palavra.push(celula);
            /* Adiciona a célula atual ao array 'palavra'. */
    
            if (direcao === 0 || direcao === 1 || direcao === 7) r--;
            /* Se a direção for 0, 1 ou 7, decrementa 'r' 
                    para mover para cima na grade. */
    
            if (direcao === 3 || direcao === 4 || direcao === 5) r++;
            /* Se a direção for 3, 4 ou 5, incrementa 'r' 
                    para mover para baixo na grade. */
    
            if (direcao === 1 || direcao === 2 || direcao === 3) c++;
            /* Se a direção for 1, 2 ou 3, incrementa 'c' 
                    para mover para a direita na grade. */
    
            if (direcao === 5 || direcao === 6 || direcao === 7) c--;
            /* Se a direção for 5, 6 ou 7, decrementa 'c' 
                    para mover para a esquerda na grade. */

        }
    
        palavra.push(fim);
        /* Adiciona a célula final ao array 'palavra'. */
    
        if (verificarPalavraValida(palavra)) {
            /* Verifica se a seleção da palavra é válida, 
                    chamando a função 'verificarPalavraValida' 
                    com o array 'palavra'. */
    
            palavra.forEach(celula => celula.classList.add('selecionada'));
            /* Para cada célula no array 'palavra', adiciona a 
                    classe 'selecionada' para destacar 
                    visualmente a seleção. */
    
            riscarPalavra(palavra[0].dataset.palavra);
            /* Risca a palavra na lista de palavras a 
                    serem encontradas, chamando a 
                    função 'riscarPalavra' com a palavra 
                    selecionada. */
    
            encontradas++;
            /* Incrementa o contador de palavras 
                    encontradas. */
    
            verificarConclusao();
            /* Chama a função 'verificarConclusao' 
                    para checar se todas as palavras 
                    foram encontradas e atualizar o 
                    estado do jogo. */

        }
    }
    
};


const verificarConclusao = () => {
    /* Declara uma constante 'verificarConclusao' que é uma 
            função para verificar se todas as palavras 
            foram encontradas e, se sim, atualiza o 
            estado do jogo. */

    if (encontradas === palavras.length) {
        /* Verifica se o número de palavras encontradas é 
                igual ao número total de palavras na fase atual. */

        pontos += 10;
        /* Adiciona 10 pontos à pontuação atual. */

        localStorage.setItem('cacaPalavrasPontos', pontos);
        /* Armazena a pontuação atualizada no localStorage do 
                navegador, com a chave 'cacaPalavrasPontos'. */

        localStorage.setItem('cacaPalavrasFase', faseAtual);
        /* Armazena a fase atual no localStorage do navegador, 
                com a chave 'cacaPalavrasFase'. */

        valorPontuacao.textContent = pontos;
        /* Atualiza o texto do elemento 'valorPontuacao' 
                para refletir a nova pontuação. */

        mensagem.style.display = 'block';
        /* Exibe a mensagem de conclusão, alterando a 
                propriedade 'display' do elemento 'mensagem' 
                para 'block'. */

    }
};

const riscarPalavra = (palavra) => {
    /* Declara uma constante 'riscarPalavra' que é uma 
            função para riscar uma palavra na lista de 
            palavras a serem encontradas.
    Recebe como parâmetro a 'palavra', que é a palavra 
            encontrada no jogo. */

    const itens = listaPalavras.querySelectorAll('li');
    /* Seleciona todos os elementos 'li' (itens de lista) 
            dentro do elemento com o ID 'lista-palavras' e 
            armazena essa coleção de elementos em 'itens'.
    'querySelectorAll' retorna uma NodeList contendo 
            todos os itens de lista encontrados.*/

    itens.forEach(item => {
        /* Itera sobre cada item na NodeList 'itens' 
                usando o método 'forEach'.
        O método 'forEach' executa a função 
                fornecida uma vez para cada item na 
                NodeList.*/

        if (item.textContent === palavra) {
            /* Verifica se o conteúdo de texto do item 
                    de lista atual é igual à palavra 
                    fornecida como argumento.
            'textContent' retorna o texto contido no 
                    elemento e seus descendentes.*/

            item.style.textDecoration = 'line-through';
            /* Se a condição for verdadeira, aplica a 
                    decoração de texto 'line-through' ao 
                    item de lista.
            'line-through' é um valor CSS que risca o 
                    texto, indicando visualmente que a 
                    palavra foi encontrada. */
        }

    });
    /* A função 'forEach' continua até que todos os 
            itens na NodeList 'itens' tenham sido 
            verificados.
    Apenas os itens cujo texto corresponde à 
            'palavra' fornecida são riscados. */

};


const continuar = () => {
    /* Declara uma constante 'continuar' que é 
            uma função para continuar para a 
            próxima fase do jogo. */

    faseAtual++;
    /* Incrementa a variável 'faseAtual', 
            avançando para a próxima fase do jogo. */

    if (faseAtual >= totalFases) {
        /* Verifica se a 'faseAtual' é maior ou 
                igual ao número total de fases ('totalFases'). */

        alert('Parabéns! Você completou todas as fases!');
        /* Exibe um alerta informando ao jogador que 
                todas as fases foram completadas. */

        faseAtual = 0;
        /* Redefine a variável 'faseAtual' para 0, 
                reiniciando o jogo. */

        pontos = 0;
        /* Redefine a variável 'pontos' para 0, 
                zerando a pontuação do jogador. */

        localStorage.removeItem('cacaPalavrasPontos');
        /* Remove o item 'cacaPalavrasPontos' 
                do localStorage do navegador.
        Isso limpa a pontuação armazenada para o jogo. */

        localStorage.removeItem('cacaPalavrasFase');
        /* Remove o item 'cacaPalavrasFase' do 
                localStorage do navegador.
        Isso limpa a fase armazenada para o jogo. */

    }

    mensagem.style.display = 'none';
    /* Define a propriedade 'display' do 
            elemento 'mensagem' para 'none'.
    Isso oculta a mensagem de conclusão, tornando-a 
            invisível para o usuário. */

    iniciarFase();
    /*  Chama a função 'iniciarFase' para 
            iniciar a nova fase do jogo. */

};

const verificarPalavraValida = (palavra) => {
    /* Declara uma constante 'verificarPalavraValida' 
            que é uma função para verificar se a seleção de 
            células forma uma palavra válida. Recebe um 
            array de células 'palavra' como parâmetro. */

    const texto = palavra.map(celula => celula.dataset.letra).join('');
    /* Usa o método 'map' para criar um novo array 
            contendo as letras das células, extraindo o 
            atributo de dados 'letra' de cada célula. Em 
            seguida, usa 'join' para concatenar essas 
            letras em uma única string 'texto'. */

    return palavras.includes(texto);
    /* Retorna true se a string 'texto' estiver incluída 
            na lista de palavras da fase atual; caso 
            contrário, retorna false. */

};


const aoPressionarMouse = (e) => {
    /* Declara uma constante 'aoPressionarMouse' que é uma 
            função para lidar com o evento de pressionar o 
            botão do mouse. Recebe o evento 'e' como parâmetro. */

    selecionando = true;
    /* Define a variável 'selecionando' como verdadeira, 
            indicando que o processo de seleção de 
            células foi iniciado. */

    celulaInicial = e.target;
    /* Define 'celulaInicial' como o alvo do evento, 
            que é a célula onde o usuário pressionou o 
            botão do mouse. */

};

const aoSoltarMouse = (e) => {
    /* Declara uma constante 'aoSoltarMouse' que é uma 
            função para lidar com o evento de soltar o 
            botão do mouse. Recebe o evento 'e' 
            como parâmetro. */

    if (selecionando) {
        /* Verifica se o processo de seleção de 
                células está em andamento. */

        celulaFinal = e.target;
        /* Define 'celulaFinal' como o alvo do evento, 
                que é a célula onde o usuário 
                soltou o botão do mouse. */

        selecionarPalavra(celulaInicial, celulaFinal);
        /* Chama a função 'selecionarPalavra' passando as 
                células inicial e final para verificar e 
                processar a seleção da palavra. */

    }

    selecionando = false;
    /* Define 'selecionando' como falso, indicando que o 
            processo de seleção de células foi concluído. */

    celulaInicial = null;
    /* Redefine 'celulaInicial' para null, limpando a 
            referência à célula inicial. */

    celulaFinal = null;
    /* Redefine 'celulaFinal' para null, limpando a 
            referência à célula final. */

};


grid.addEventListener('mousedown', aoPressionarMouse);
/*  Adiciona um ouvinte de evento ao elemento 'grid' 
        para o evento 'mousedown' (quando o botão 
        do mouse é pressionado).
Quando o evento ocorre, a função 'aoPressionarMouse' 
        é chamada.
Este evento é usado para iniciar a seleção 
        de palavras no caça-palavras. */

grid.addEventListener('mouseup', aoSoltarMouse);
/*  Adiciona um ouvinte de evento ao elemento 'grid' 
        para o evento 'mouseup' (quando o botão 
        do mouse é solto).
Quando o evento ocorre, a função 'aoSoltarMouse' 
        é chamada.
Este evento é usado para finalizar a seleção 
        de palavras no caça-palavras. */


window.onclick = (event) => {
    /*  Adiciona um ouvinte de evento ao 
            objeto 'window' para o evento 'click' (quando 
            qualquer parte da janela é clicada).
    Quando o evento ocorre, a função anônima 
            fornecida é chamada, recebendo o 
            evento como um parâmetro. */

    if (event.target === modalDica) {
        /*  Verifica se o alvo do evento (o elemento 
                que foi clicado) é o modal de 
                dicas ('modalDica').
        Isso garante que o clique fora do conteúdo do 
                modal feche o modal. */

        modalDica.style.display = 'none';
        /*  Define a propriedade 'display' do 
                elemento 'modalDica' para 'none'.
        Isso oculta o modal de dicas, tornando-o 
                invisível para o usuário. */

    }
};
