document.addEventListener("DOMContentLoaded", function() {
    /*  Adiciona um ouvinte de evento ao documento 
            para o evento "DOMContentLoaded". 
    Isso garante que a função será executada 
            somente após o documento HTML ter sido 
            completamente carregado e analisado. */

    const palavras5 = [
        "TERMO", "CARRO", "MACIO", "FLORA", "TERRA", "LIVRO", "MOUSE", "TECLA", "CORES", "PIZZA", 
        "LAPIS", "BOLSA", "TORRE", "MUNDO", "LENTO", "FORTE", "MAIOR", "VESTE", "CAMPO", "CRAVO",
        "VIDRO", "SONHO", "TROPA", "BICHO", "HUMOR", "VELHO", "CALOR", "BOMBA", "MAIOR", "FESTA"
    ];
    /* Define um array 'palavras5' que contém uma 
            lista de palavras com 5 letras cada. */

    const palavras8 = [
        "AVENTURA", "BALANCAR", "CACHORRO", "DESAFIOS", "ELEFANTE", "GIGANTES", "HARMONIA", "INTERNET", "HISTORIA",
        "MUSICAIS", "NEGOCIOS", "PACIENTE", "PALAVRAS", "MACHISTA", "PENSARES", "PODEROSO", "POLICIAL", "PRIMAVERA",
        "PROFESSOR", "QUADRADO", "RECEITAS", "SISTEMAS", "SOLUCOES", "TELEVISAO", "MADRINHA", "MANDIOCA"
    ];
    /*  Define um array 'palavras8' que contém uma 
            lista de palavras com 8 letras cada. */

    const palavras12 = [
        "APROVADAMENTE", "DOCUMENTARIO", "EXPERIMENTAL", "ALMOXARIFADO", "APERFEICOADO", "EMPREENDEDOR", "INDEPENDENTE", "JORNALISTICO",
        "INTERPRETADO", "INVESTIMENTO", "TRANSPORTADO", "ESPECIALISTA", "ESTRATEGISTA", "FACILITADORA", "LUMINOSIDADE", "FUNDAMENTAIS",
        "REDUCIONISMO", "REGULAMENTAR", "PROFISSIONAL",
    ];
    /* Define um array 'palavras12' que contém uma 
            lista de palavras com 12 letras cada. */

    let palavraCorreta = "";
    /* Declara uma variável 'palavraCorreta' que irá 
            armazenar a palavra correta a ser adivinhada.
    Inicialmente, é uma string vazia. */

    let tentativaAtual = "";
    /* Declara uma variável 'tentativaAtual' que 
            irá armazenar a tentativa atual do jogador.
    Inicialmente, é uma string vazia. */

    let linhaAtual = 0;
    /* Declara uma variável 'linhaAtual' que 
            irá armazenar o número da linha atual no 
            tabuleiro de jogo.
    Inicialmente, é 0. */

    let pontos = localStorage.getItem('pontos_termo') ? parseInt(localStorage.getItem('pontos_termo')) : 1;
    /* Declara uma variável 'pontos_termo' que irá 
            armazenar a pontuação do jogador.
    Obtém a pontuação armazenada no localStorage (se houver) e 
            converte para número inteiro.
    Se não houver pontuação armazenada, 
            define 'pontos_termo' como 0. */

            
    let dificuldade = 5;
    /* Declara uma variável 'dificuldade' que 
            define o nível de dificuldade do jogo.
    Inicialmente, é definida como 5, indicando 
            que o jogo começará com palavras de 5 letras. */

    const tabuleiro = document.getElementById("tabuleiro");
    /* Obtém o elemento HTML com o id 'tabuleiro' e o 
            armazena na constante 'tabuleiro'.
    Este elemento representa o tabuleiro do jogo 
            onde as palavras serão inseridas. */

    const tecladoDiv = document.getElementById("teclado");
    /* Obtém o elemento HTML com o id 'teclado' e o 
            armazena na constante 'tecladoDiv'.
    Este elemento representa o teclado virtual do jogo. */

    const botaoApagar = document.getElementById("apagar");
    /* Obtém o elemento HTML com o id 'apagar' e o 
            armazena na constante 'botaoApagar'.
    Este elemento é o botão que permite apagar a 
            última letra inserida. */

    const botaoEnviar = document.getElementById("enviar");
    /* Obtém o elemento HTML com o id 'enviar' e o 
            armazena na constante 'botaoEnviar'.
    Este elemento é o botão que permite enviar a 
            tentativa atual para verificação. */

    const botaoVerPalavra = document.getElementById("ver-palavra");
    /* Obtém o elemento HTML com o id 'ver-palavra' e 
            o armazena na constante 'botaoVerPalavra'.
    Este elemento é o botão que permite ao jogador ver a 
            palavra correta (como uma dica ou solução). */

    const botaoDificuldade = document.getElementById("dificuldade");
    /* Obtém o elemento HTML com o id 'dificuldade' e o 
            armazena na constante 'botaoDificuldade'.
    Este elemento é o botão que permite ao jogador 
            aumentar a dificuldade do jogo. */

    const botaoRegras = document.getElementById("regras");
    /* Obtém o elemento HTML com o id 'regras' e o 
            armazena na constante 'botaoRegras'.
    Este elemento é o botão que permite ao jogador 
            visualizar as regras do jogo. */

    const mensagemDiv = document.getElementById("mensagem");
    /* Obtém o elemento HTML com o id 'mensagem' e o 
            armazena na constante 'mensagemDiv'.
    Este elemento é uma divisão que exibe mensagens ao 
            jogador, como a confirmação de que a 
            palavra foi acertada. */

    const fimJogoDiv = document.getElementById("fim-jogo");
    /* Obtém o elemento HTML com o id 'fim-jogo' e o 
            armazena na constante 'fimJogoDiv'.
    Este elemento é uma divisão que exibe uma mensagem 
            quando o jogador usa todas as tentativas e o 
            jogo termina. */

    const modalRegras = document.getElementById("modal-regras");
    /* Obtém o elemento HTML com o id 'modal-regras' e o 
            armazena na constante 'modalRegras'.
    Este elemento é uma divisão que exibe um modal 
            com as regras do jogo. */

    const botaoProximaPalavra = document.getElementById("proxima-palavra");
    /* Obtém o elemento HTML com o id 'proxima-palavra' e o 
            armazena na constante 'botaoProximaPalavra'.
    Este elemento é o botão que permite ao jogador 
            iniciar uma nova palavra após acertar a anterior. */

    const botaoTentarNovamente = document.getElementById("tentar-novamente");
    /* Obtém o elemento HTML com o id 'tentar-novamente' e o 
            armazena na constante 'botaoTentarNovamente'.
    Este elemento é o botão que permite ao jogador tentar 
            novamente após o fim do jogo. */

    const botaoFecharRegras = document.getElementById("fechar-regras");
    /* Obtém o elemento HTML com o id 'fechar-regras' e o 
            armazena na constante 'botaoFecharRegras'.
    Este elemento é o botão que permite ao jogador fechar o 
            modal de regras do jogo. */

    const pontosSpan = document.getElementById("pontos");
    /* Obtém o elemento HTML com o id 'pontos' e o 
            armazena na constante 'pontosSpan'.
    Este elemento é um span que exibe a pontuação 
            atual do jogador. */

    pontosSpan.textContent = pontos;
    /*  Atualiza o conteúdo de texto do elemento 
            'pontosSpan' para exibir a pontuação 
            atual do jogador.
    Isso garante que a pontuação correta seja exibida ao 
            carregar a página. */



    function criarTabuleiro() {
        /* Declara uma função chamada 'criarTabuleiro' que 
                cria o tabuleiro de jogo com base na 
                dificuldade atual. */
    
        tabuleiro.innerHTML = '';
        /* Limpa o conteúdo HTML dentro do elemento 'tabuleiro', 
                removendo qualquer célula existente. */
    
        tabuleiro.style.gridTemplateColumns = `repeat(${dificuldade}, 1fr)`;
        /* Define o estilo do tabuleiro para ter um número de 
                colunas igual à dificuldade.
        'repeat(${dificuldade}, 1fr)' cria o número especificado de 
                colunas, cada uma com uma fração igual do 
                espaço disponível. */
    
        for (let i = 0; i < 6; i++) {
            /*  Inicia um loop que se repete 6 vezes, 
                    uma para cada linha do tabuleiro. */
    
            for (let j = 0; j < dificuldade; j++) {
                /*  Inicia um loop aninhado que se repete um 
                        número de vezes igual à dificuldade, 
                        uma para cada coluna na linha atual. */
    
                const letra = document.createElement("div");
                /*  Cria um novo elemento 'div' para representar 
                        uma célula no tabuleiro. */
    
                letra.classList.add("letra");
                /*  Adiciona a classe 'letra' ao elemento 'div', 
                        aplicando os estilos definidos para 
                        células do tabuleiro. */
    
                tabuleiro.appendChild(letra);
                /*  Adiciona o elemento 'div' recém-criado 
                        como um filho do elemento 'tabuleiro', 
                        inserindo a célula no tabuleiro. */
            }
        }
        /* Fecha os loops aninhados, garantindo que todas as 
                6 linhas e todas as colunas da dificuldade 
                atual sejam criadas. */

    }


    function criarTeclado() {
        /* Declara uma função chamada 'criarTeclado' 
                que cria o teclado virtual do jogo. */
    
        tecladoDiv.innerHTML = '';
        /* Limpa o conteúdo HTML dentro do 
                elemento 'tecladoDiv', removendo 
                qualquer tecla existente. */
    
        const teclado = [
            'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
            'Z', 'X', 'C', 'V', 'B', 'N', 'M'
        ];
        /*  Define um array chamado 'teclado' que contém 
                todas as letras que serão usadas no
                 teclado virtual. */
    
        teclado.forEach(letra => {
            /* Usa o método 'forEach' para iterar 
                    sobre cada letra no array 'teclado'.
            Para cada letra, executa a função fornecida. */
    
            const tecla = document.createElement("div");
            /* Cria um novo elemento 'div' para 
                    representar uma tecla no teclado virtual. */
    
            tecla.classList.add("tecla");
            /* Adiciona a classe 'tecla' ao elemento 'div', 
                    aplicando os estilos definidos para as teclas. */
    
            tecla.textContent = letra;
            /*  Define o conteúdo de texto do 
                    elemento 'div' como a letra atual do 
                    array 'teclado'.
            Isso faz com que a letra apareça dentro da tecla. */
    
            tecla.addEventListener("click", () => adicionarLetra(letra));
            /* Adiciona um ouvinte de evento ao elemento 'div' 
                    para o evento 'click'.
            Quando a tecla é clicada, chama a função 'adicionarLetra' 
                    passando a letra atual como argumento. */
    
            tecladoDiv.appendChild(tecla);
            /* Adiciona o elemento 'div' recém-criado como 
                    um filho do elemento 'tecladoDiv', inserindo a 
                    tecla no teclado virtual. */

        });
        /* Fecha o método 'forEach', garantindo que 
                todas as letras no array 'teclado' tenham '
                sido processadas e adicionadas ao 
                teclado virtual. */

    }
    

    function adicionarLetra(letra) {
        /* Declara uma função chamada 'adicionarLetra' 
                que adiciona uma letra à tentativa 
                atual do jogador.
        A função aceita um argumento 'letra', 
                que é a letra a ser adicionada. */
    
        if (tentativaAtual.length < dificuldade) {
            /* Verifica se o comprimento da 'tentativaAtual' 
                    é menor que a 'dificuldade'.
            Isso garante que o jogador não possa adicionar 
                    mais letras do que o permitido pela 
                    dificuldade atual (5, 8 ou 12 letras). */
    
            tentativaAtual += letra;
            /* Se a condição for verdadeira, concatena 
                    a 'letra' fornecida ao final da string 'tentativaAtual'.
            Isso adiciona a nova letra à tentativa atual do jogador. */
    
            atualizarTentativa();
            /* Chama a função 'atualizarTentativa' para 
                    atualizar a exibição da tentativa 
                    atual no tabuleiro.
            Isso garante que a interface do usuário 
                    reflita a adição da nova letra. */

        }
        /* Fecha a instrução 'if', garantindo que as ações 
                    dentro dela só ocorram se a 
                    condição for verdadeira. */

    }
    

    function atualizarTentativa() {
        /* Declara uma função chamada 'atualizarTentativa' 
                que atualiza a exibição da tentativa 
                atual no tabuleiro. */
    
        const letras = tabuleiro.children;
        /* Obtém todos os elementos filhos do 'tabuleiro' 
                e os armazena na constante 'letras'.
        Esses elementos representam as células do tabuleiro. */
    
        for (let i = 0; i < dificuldade; i++) {
            /* Inicia um loop que se repete um número de 
                    vezes igual à dificuldade atual.
            A variável 'i' é usada como contador do loop, 
                    começando em 0 e incrementando até 
                    ser menor que 'dificuldade'. */
    
            const letraDiv = letras[linhaAtual * dificuldade + i];
            /* Calcula o índice do elemento da linha atual 
                    no tabuleiro e o armazena na constante 'letraDiv'.
            'linhaAtual * dificuldade' dá o índice de início da 
                    linha atual, e '+ i' avança para a célula 
                    correta na linha. */
    
            letraDiv.textContent = tentativaAtual[i] || "";
            /* Define o conteúdo de texto do 'letraDiv' 
                    como a letra na posição 'i' da 'tentativaAtual'.
            Se não houver letra nessa posição (ou seja, 
                    'tentativaAtual[i]' é undefined), define o 
                    conteúdo de texto como uma string vazia.
            Isso garante que as células do tabuleiro mostrem a 
                    letra correta ou fiquem vazias se ainda 
                    não houver letra. */
        }
        /* Fecha o loop 'for', garantindo que todas as 
                células da linha atual sejam atualizadas. */

    }

    function apagarLetra() {
        /* Declara uma função chamada 'apagarLetra' que 
                remove a última letra da tentativa atual 
                do jogador. */
    
        if (tentativaAtual.length > 0) {
            /* Verifica se o comprimento da 'tentativaAtual' é 
                    maior que zero, garantindo que haja 
                    algo para apagar. */
    
            tentativaAtual = tentativaAtual.slice(0, -1);
            /* Usa o método 'slice' para remover a 
                    última letra da 'tentativaAtual'.
            'slice(0, -1)' retorna uma nova string que é 
                    uma cópia da original, excluindo o 
                    último caractere. */
    
            atualizarTentativa();
            /* Chama a função 'atualizarTentativa' para 
                    atualizar a exibição da tentativa 
                    atual no tabuleiro.
            Isso reflete a remoção da letra na 
                    interface do usuário. */

        }
        /* Fecha a instrução 'if'. Se a tentativaAtual 
                não tiver caracteres, a função 
                não faz nada. */

    }

    function validarTentativa() {
        /* Declara uma função chamada 'validarTentativa' 
                que verifica se a tentativa atual do 
                jogador está correta. */
    
        if (tentativaAtual.length === dificuldade) {
            /* Verifica se o comprimento da 'tentativaAtual' 
                    é igual à 'dificuldade'.
            Isso garante que o jogador só possa validar a 
                    tentativa se tiver inserido o número 
                    correto de letras. */
    
            const letras = tabuleiro.children;
            /* Obtém todos os elementos filhos do 'tabuleiro' 
                    e os armazena na constante 'letras'.
            Esses elementos representam as células do tabuleiro. */
    
            let acertos = 0;
            /* Declara uma variável 'acertos' que contará 
                    quantas letras estão na posição correta.
            Inicialmente, é definida como 0. */
    
            for (let i = 0; i < dificuldade; i++) {
                /* Inicia um loop que se repete um 
                        número de vezes igual à dificuldade atual.
                A variável 'i' é usada como contador do 
                        loop, começando em 0 e incrementando 
                        até ser menor que 'dificuldade'. */
    
                const letra = tentativaAtual[i];
                /* Obtém a letra na posição 'i' da 'tentativaAtual' 
                        e a armazena na constante 'letra'. */
    
                const letraDiv = letras[linhaAtual * dificuldade + i];
                /* Calcula o índice do elemento da linha atual 
                        no tabuleiro e o armazena na constante 'letraDiv'.
                'linhaAtual * dificuldade' dá o índice de início da 
                        linha atual, e '+ i' avança para a célula 
                        correta na linha. */
    
                if (letra === palavraCorreta[i]) {
                    /* Verifica se a letra na posição 'i' 
                            da 'tentativaAtual' é igual à 
                            letra na mesma posição da 'palavraCorreta'. */
    
                    letraDiv.classList.add("correta");
                    /* Se a letra estiver na posição correta, 
                            adiciona a classe 'correta' ao 'letraDiv', 
                            aplicando os estilos definidos para 
                            letras corretas. */
    
                    acertos++;
                    /* Incrementa a variável 'acertos' em 1. */
    
                } else if (palavraCorreta.includes(letra)) {
                    /* Se a letra não estiver na posição correta, 
                            verifica se a 'palavraCorreta' 
                            contém essa letra em outra posição. */
    
                    letraDiv.classList.add("incerta");
                    /* Se a letra estiver presente em outra posição, 
                            adiciona a classe 'incerta' ao 'letraDiv', 
                            aplicando os estilos definidos para 
                            letras incertas. */
    
                } else {
                    /* Se a letra não estiver presente na 
                            'palavraCorreta', ela é considerada incorreta. */
    
                    letraDiv.classList.add("errada");
                    /* Adiciona a classe 'errada' ao 'letraDiv', 
                            aplicando os estilos definidos para 
                            letras erradas. */
                }
    
                marcarTecla(letra, letraDiv.classList);
                /* Chama a função 'marcarTecla' para atualizar o 
                        estilo da tecla correspondente no teclado virtual.
                Passa a 'letra' e as classes do 'letraDiv' 
                        como argumentos. */
            }
            /* Fecha o loop 'for', garantindo que todas as 
                    letras da tentativa atual sejam verificadas 
                    e classificadas. */
               
            if (acertos === dificuldade) {
                /* Verifica se o número de 'acertos' é 
                        igual à 'dificuldade'.
                Isso significa que todas as letras da 
                        tentativa atual estão na posição correta. */
            
                mensagemDiv.classList.remove("hidden");
                /* Remove a classe 'hidden' do 'mensagemDiv', 
                        tornando a mensagem de sucesso visível 
                        para o jogador. */
            
                pontos++;
                /* Incrementa a variável 'pontos' em 1, 
                        aumentando a pontuação do jogador. */
            
                pontosSpan.textContent = pontos;
                /* Atualiza o conteúdo de texto do 'pontosSpan' 
                        para exibir a nova pontuação.
                Isso garante que a pontuação correta seja 
                        exibida na interface do usuário. */
            
                localStorage.setItem('pontos_termo', pontos);
                /* Armazena a nova pontuação no localStorage 
                        do navegador com a chave 'pontos_termo'.
                Isso permite que a pontuação seja persistida e 
                        recuperada mesmo após o jogador fechar e 
                        reabrir o navegador. */
            
            } else if (linhaAtual === 5) {

                /* Verifica se 'linhaAtual' é igual a 5.
                Isso significa que o jogador usou 
                        todas as 6 tentativas (0 a 5). */
            
                fimJogoDiv.classList.remove("hidden");
                /* Remove a classe 'hidden' do 'fimJogoDiv', 
                        tornando a mensagem de fim de jogo 
                        visível para o jogador. */

            }
            
            linhaAtual++;
            /* Incrementa a variável 'linhaAtual' em 1, 
                    passando para a próxima linha no tabuleiro 
                    para a próxima tentativa do jogador. */
            
            tentativaAtual = "";
            /* Reseta a 'tentativaAtual' para uma string vazia.
            Isso prepara a variável para a próxima 
                    tentativa do jogador. */
           
        }
    }

    function marcarTecla(letra, classes) {
        /* Declara uma função chamada 'marcarTecla' que 
                atualiza a aparência das teclas no 
                teclado virtual com base no resultado da 
                tentativa do jogador. A função aceita 
                dois argumentos: 
                
        'letra', que é a letra que o jogador inseriu, e 
        'classes', que é uma lista de classes CSS 
                indicando se a letra 
                estava correta, incerta ou errada. */
    
        const teclas = document.getElementsByClassName("tecla");
        /* Obtém todos os elementos com a classe 'tecla' e 
                os armazena na constante 'teclas'.
        Esses elementos representam as teclas do 
                teclado virtual no jogo. */
    
        for (let tecla of teclas) {
            /* Usa um loop 'for...of' para iterar 
                    sobre cada tecla no conjunto de 
                    elementos 'teclas'. */
    
            if (tecla.textContent === letra) {
                /* Verifica se o texto da tecla atual é 
                        igual à 'letra' fornecida.
                Isso identifica a tecla que corresponde à 
                        letra inserida pelo jogador. */
    
                tecla.classList.remove("correta", "incerta", "errada");
                /* Remove as classes 'correta', 'incerta' 
                        e 'errada' da tecla atual.
                Isso limpa o estado visual anterior da 
                        tecla para que possa ser atualizado 
                        com o novo estado. */
    
                if (classes.contains("correta")) {
                    /* Verifica se a lista de classes 'classes' 
                            contém a classe 'correta'. */
    
                    tecla.classList.add("correta");
                    /* Se a tecla estava correta, 
                            adiciona a classe 'correta' à tecla.
                    Isso altera a cor de fundo da tecla 
                            para indicar que a letra está 
                            correta e na posição correta. */
    
                } else if (classes.contains("incerta")) {
                    /* Verifica se a lista de classes 'classes' 
                            contém a classe 'incerta'. */
    
                    tecla.classList.add("incerta");
                    /* Se a tecla estava incerta, adiciona a 
                            classe 'incerta' à tecla.
                    Isso altera a cor de fundo da tecla para 
                            indicar que a letra está correta, 
                            mas na posição errada. */
    
                } else {
                    /* Se a tecla não estava correta nem 
                            incerta, assume que estava errada. */
    
                    tecla.classList.add("errada");
                    /* Adiciona a classe 'errada' à tecla.
                    Isso altera a cor de fundo da tecla para 
                            indicar que a letra está incorreta. */
                }
                break;
                /* Sai do loop uma vez que a tecla correspondente à 
                        letra foi encontrada e atualizada.
                Não é necessário verificar mais teclas. */

            }
        }
    }

    function verPalavra() {
        /* Declara uma função chamada 'verPalavra' 
                que mostra ao jogador a palavra correta. */
    
        alert(`A palavra correta é: ${palavraCorreta}`);
        /* Usa a função 'alert' para exibir uma mensagem de 
                alerta que informa ao jogador qual é a 
                palavra correta.
        O texto da mensagem é criado usando template 
                literals (` `), que permitem incorporar 
                expressões, como ${palavraCorreta}. */

    }

    function proximaPalavra() {
        /* Declara uma função chamada 'proximaPalavra' que 
                prepara o jogo para a próxima rodada após o 
                jogador acertar a palavra correta ou desejar 
                começar uma nova tentativa. */
    
        linhaAtual = 0;
        /* Reinicia a variável 'linhaAtual' para 0, que é o 
                índice da primeira linha do tabuleiro, 
                preparando o tabuleiro para uma nova palavra. */
    
        tentativaAtual = "";
        /* Limpa a 'tentativaAtual', definindo-a como uma 
                string vazia para remover quaisquer letras 
                restantes da tentativa anterior. */
    
        mensagemDiv.classList.add("hidden");
        /* Adiciona a classe 'hidden' ao 'mensagemDiv', 
                ocultando a mensagem de sucesso que pode 
                ter sido exibida na rodada anterior. */
    
        fimJogoDiv.classList.add("hidden");
        /* Adiciona a classe 'hidden' ao 'fimJogoDiv', 
                ocultando a mensagem de fim de jogo que 
                pode ter sido exibida. */

        escolherPalavra();
        /* Chama a função 'escolherPalavra' para 
                selecionar uma nova palavra correta 
                com base na dificuldade atual e na 
                progressão do jogo. */


        criarTabuleiro();
        /* Chama a função 'criarTabuleiro' para reiniciar o 
                layout físico do tabuleiro de jogo. Isso limpa 
                todas as entradas anteriores e prepara um novo 
                layout de células para a nova palavra. */
        
        criarTeclado();
        /* Chama a função 'criarTeclado' para reiniciar o 
                teclado virtual. Isso garante que todas as 
                teclas estejam resetadas e prontas para a 
                nova rodada, sem marcas de interações 
                anteriores. */
        

    }

    function aumentarDificuldade() {
        /*  Declara uma função chamada 'aumentarDificuldade' 
                que permite ao jogador escolher um nível de 
                dificuldade mais alto para o jogo. */
    
        let novaDificuldade = prompt("Escolha a dificuldade: 8 ou 12 letras");
        /* Exibe uma caixa de diálogo com uma mensagem 
                pedindo ao jogador para escolher uma 
                dificuldade entre 8 ou 12 letras.
        A escolha do jogador é armazenada na 
                variável 'novaDificuldade'. */
    
        if (novaDificuldade === "8" || novaDificuldade === "12") {
            /* Verifica se o valor em 'novaDificuldade' é "8" ou "12".
            Isso garante que a entrada do usuário seja 
                    uma das opções válidas. */
    
            dificuldade = parseInt(novaDificuldade);
            /* Converte o valor de 'novaDificuldade' de 
                    uma string para um número inteiro e 
                    atribui-o à variável global 'dificuldade'.
            Isso atualiza a dificuldade do jogo de 
                    acordo com a escolha do jogador. */
    
            proximaPalavra();
            /* Chama a função 'proximaPalavra' para reiniciar o 
                    jogo com a nova dificuldade escolhida.
            Isso permite que as alterações de dificuldade 
                    tenham efeito imediato, começando uma 
                    nova rodada com a dificuldade atualizada. */

        }
    }

    function tentarNovamente() {
        /* Declara uma função chamada 'tentarNovamente' que 
                reinicia o jogo depois que o jogador perde, 
                usando todas as tentativas sem adivinhar 
                corretamente a palavra. */
    
        linhaAtual = 0;
        /* Reinicia a variável 'linhaAtual' para 0, que é o 
                índice da primeira linha do tabuleiro. Isso 
                prepara o tabuleiro para uma nova rodada, 
                começando do início. */
    
        tentativaAtual = "";
        /* Limpa a variável 'tentativaAtual', definindo-a 
                como uma string vazia. Isso remove qualquer 
                letra que tenha sido inserida na tentativa 
                anterior, garantindo que a nova rodada 
                comece limpa. */
    
        fimJogoDiv.classList.add("hidden");
        /* Adiciona a classe 'hidden' ao elemento 'fimJogoDiv'. 
                Isso oculta a mensagem de fim de jogo que 
                foi mostrada quando o jogador perdeu, 
                limpando a tela para a nova rodada. */
    
        
    
        criarTabuleiro();
        /* Chama a função 'criarTabuleiro' para reiniciar o 
                layout físico do tabuleiro de jogo. Isso limpa 
                todas as entradas anteriores e prepara um novo 
                layout de células para a nova palavra. */
    
        criarTeclado();
        /* Chama a função 'criarTeclado' para reiniciar o 
                teclado virtual. Isso garante que todas as 
                teclas estejam resetadas e prontas para a 
                nova rodada, sem marcas de interações 
                anteriores. */

    }

    function mostrarRegras() {
        /* Declara uma função chamada 'mostrarRegras' que 
                torna visíveis as regras do jogo para o jogador. */
    
        modalRegras.classList.remove("hidden");
        /* Remove a classe 'hidden' do elemento 'modalRegras'. 
        Isso faz com que o modal de regras, que 
                estava oculto, se torne visível na 
                interface do usuário. */

    }
    
    function fecharRegras() {
        /* Declara uma função chamada 'fecharRegras' 
                que oculta o modal de regras. */
    
        modalRegras.classList.add("hidden");
        /* Adiciona a classe 'hidden' ao 
                elemento 'modalRegras'.
        Isso faz com que o modal de regras, que 
                estava visível, se torne oculto 
                novamente na interface do usuário. */

    }



    botaoApagar.addEventListener("click", apagarLetra);
    /* Adiciona um ouvinte de evento de 'click' 
            ao botão 'botaoApagar'.
    Quando o botão é clicado, a função 
            'apagarLetra' é chamada.
    Esta função remove a última letra da 
            tentativa atual do jogador. */


    botaoEnviar.addEventListener("click", validarTentativa);
    /* Adiciona um ouvinte de evento de 'click' ao 
            botão 'botaoEnviar'.
    Quando o botão é clicado, a função 
            'validarTentativa' é chamada.
    Esta função verifica se a tentativa atual 
            corresponde à palavra correta. */


    botaoVerPalavra.addEventListener("click", verPalavra);
    /* Adiciona um ouvinte de evento de 'click' 
            ao botão 'botaoVerPalavra'.
    Quando o botão é clicado, a função 'verPalavra' 
            é chamada.
    Esta função exibe a palavra correta para o 
            jogador como uma dica ou após o jogo terminar. */


    botaoProximaPalavra.addEventListener("click", proximaPalavra);
    /* Adiciona um ouvinte de evento de 'click' ao 
            botão 'botaoProximaPalavra'.
    Quando o botão é clicado, a função 
            'proximaPalavra' é chamada.
    Esta função reinicia o tabuleiro, o teclado e 
            escolhe uma nova palavra correta, 
            começando uma nova rodada do jogo. */

    botaoDificuldade.addEventListener("click", aumentarDificuldade);
    /* Adiciona um ouvinte de evento de 'click' ao 
            botão 'botaoDificuldade'.
    Quando o botão é clicado, a função 'aumentarDificuldade' 
            é chamada.
    Esta função permite ao jogador escolher uma nova 
            dificuldade para o jogo, tornando-o 
            mais desafiador. */


    botaoTentarNovamente.addEventListener("click", tentarNovamente);
        /* Adiciona um ouvinte de evento de 'click' ao 
                botão 'botaoTentarNovamente'.
        Quando o botão é clicado, a função 
                'tentarNovamente' é chamada.
        Esta função reinicia o jogo após uma derrota, 
                dando ao jogador uma nova chance de 
                acertar a palavra. */


    botaoRegras.addEventListener("click", mostrarRegras);
        /* Adiciona um ouvinte de evento de 'click' 
                ao botão 'botaoRegras'.
        Quando o botão é clicado, a função 
                'mostrarRegras' é chamada.
        Esta função exibe o modal com as regras 
                do jogo para o jogador. */

    botaoFecharRegras.addEventListener("click", fecharRegras);
        /* Adiciona um ouvinte de evento de 'click' 
                ao botão 'botaoFecharRegras'.
        Quando o botão é clicado, a função 
                'fecharRegras' é chamada.
        Esta função oculta o modal de regras, 
                permitindo ao jogador continuar o jogo. */


    
            
    function escolherPalavra() {
        /*  Declara uma função chamada 'escolherPalavra' que 
                seleciona uma palavra correta com base na 
                dificuldade e na pontuação atual do jogador. */
    
        let palavras;
        /*  Declara uma variável 'palavras' que será usada 
                para armazenar o conjunto de palavras 
                apropriado com base na dificuldade. */
    
        if (dificuldade === 5) {
            /* Verifica se a dificuldade atual é igual a 5. */
    
            palavras = palavras5;
            /* Se a dificuldade for 5, atribui o array 'palavras5' à 
                    variável 'palavras'. */
    
        } else if (dificuldade === 8) {
            /* Verifica se a dificuldade atual é igual a 8. */
    
            palavras = palavras8;
            /* Se a dificuldade for 8, atribui o array 
                    'palavras8' à variável 'palavras'. */
    
        } else {
            /* Se a dificuldade não for nem 5 nem 8, 
                    assume que é 12. */
    
            palavras = palavras12;
            /* Atribui o array 'palavras12' à 
                    variável 'palavras'. */

        }
    
        let indicePalavra = pontos % palavras.length - 1;
        /*  Calcula o índice da palavra correta 
                usando a pontuação atual.
        'pontos % palavras.length' dá o resto da 
                divisão da pontuação pelo comprimento 
                do array de palavras, garantindo um índice válido.
        Subtrai 1 para ajustar o índice, já que os 
                arrays são baseados em zero. */
    
        palavraCorreta = palavras[indicePalavra];
        /*  Atribui a palavra selecionada ao array 'palavras' 
                no índice calculado à variável 'palavraCorreta'.
        Esta será a palavra que o jogador deve adivinhar. */

    }


    document.addEventListener("keydown", (e) => {
        /* Adiciona um ouvinte de evento ao documento 
                para capturar todas as teclas 
                pressionadas ('keydown').
        A função recebe um argumento 'e', que é o 
                objeto evento contendo informações 
                sobre a tecla pressionada. */
    
        const letra = e.key.toUpperCase();
        /* Converte a tecla pressionada para letra 
                maiúscula, independentemente de como 
                foi digitada.
        Isso padroniza a entrada para facilitar o 
                manuseio posterior. */
    
        if (teclado.includes(letra)) {
            /* Verifica se a tecla pressionada está 
                    incluída no array 'teclado', que 
                    contém as letras permitidas. */
    
            adicionarLetra(letra);
            /* Se a tecla está incluída, chama a função 
                    'adicionarLetra' para adicionar 
                    essa letra à 'tentativaAtual'. */
    
        } else if (e.key === "Enter") {
            /* Verifica se a tecla pressionada 
                    foi a tecla "Enter". */
    
            validarTentativa();
            /* Se foi, chama a função 'validarTentativa' 
                    para verificar se a 'tentativaAtual' 
                    está correta. */
    
        } else if (e.key === "Backspace") {
            /* Verifica se a tecla pressionada foi a 
                    tecla "Backspace". */
    
            apagarLetra();
            /* Se foi, chama a função 'apagarLetra' para 
                    remover a última letra da 'tentativaAtual'. */


        }
    });

    escolherPalavra();
        /* Chama a função 'escolherPalavra' para 
                selecionar uma nova palavra correta 
                com base na dificuldade atual e na 
                progressão do jogo. */
    
    criarTabuleiro();
    /* Chama a função 'criarTabuleiro' para 
            reinicializar o tabuleiro de jogo, 
            limpando todas as entradas anteriores e 
            configurando-o para a nova palavra. */

    criarTeclado();
    /* Chama a função 'criarTeclado' para reinicializar o 
            teclado virtual, garantindo que todas as 
            teclas estejam disponíveis para a nova rodada. */


});