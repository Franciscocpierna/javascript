// Adiciona um ouvinte de evento ao documento
        // para executar o código abaixo uma vez que o
        // conteúdo da DOM (Document Object Model)
        // esteja completamente carregado.
document.addEventListener("DOMContentLoaded", () => {

    // Define um array chamado 'niveis', contendo objetos
            // que representam cada nível do jogo. Cada objeto
            // possui duas propriedades: 'palavras' e 'letras'.
    // 'palavras' é um array de strings, onde cada string é
            // uma palavra que os jogadores precisam formar.
    // 'letras' é uma string contendo todas as letras disponíveis
            // para formar as palavras no nível correspondente.

    const niveis = [
        { palavras: ["PEDRA", "CARVAO", "SELVA", "LEAO"], letras: "PEDRCAVSLO" },
        { palavras: ["FLORESTA", "RIO", "MAR", "CEU"], letras: "FLORESTARIOMCEU" },
        { palavras: ["LUA", "SOL", "ESTRELA", "PLANETA"], letras: "LUASOLESTRELAPN" },
        { palavras: ["CARRO", "AVIAO", "NAVIO", "TREM"], letras: "CARONVIATREM" },
        { palavras: ["PAPEL", "LIVRO", "CANETA", "CADERNO"], letras: "PAPELIVROCANTD" },
        { palavras: ["FUTEBOL", "BASQUETE", "TENIS", "NATACAO"], letras: "FUTEBOLBSQTAENIC" },
        { palavras: ["GATO", "CACHORRO", "PASSARO", "PEIXE"], letras: "GATOCACHORROPEIXES" },
        { palavras: ["CASA", "APARTAMENTO", "SALA", "COZINHA"], letras: "CASAAPARTAMENTOSZLHI" },
        { palavras: ["ESCOLA", "FACULDADE", "CURSO", "AULA"], letras: "ESCOLAFACULDACRSO" },
        { palavras: ["MUSICA", "CANTO", "DANCA", "RITMO"], letras: "MUSICACANTODNCRITM" },
        { palavras: ["INVERNO", "VERAO", "OUTONO", "PRIMAVERA"], letras: "INVERONVERAOUTPRIMA" },
        { palavras: ["DOCE", "SALGADO", "AMARGO", "AZEDO"], letras: "DOCESLGAMARGAZEO" },
        { palavras: ["FELICIDADE", "TRISTEZA", "RAIVA", "MEDO"], letras: "FELICZDADTROSTERAVIME" },
        { palavras: ["PRATO", "GARFO", "FACA", "COLHER"], letras: "PRTAOGRFACOLHER" },
        { palavras: ["JARDIM", "FLOR", "PLANTA", "ARVORE"], letras: "JADRIMFLORPLENTARVO" },
        { palavras: ["COMPUTADOR", "MOUSE", "TECLADO", "MONITOR"], letras: "COPMUTDAORNOUSETILDR" },
        { palavras: ["MESA", "CADEIRA", "SOFA", "CAMA"], letras: "MSEACADERIASOFACAM" },
        { palavras: ["CINEMA", "TEATRO", "SHOW", "CONCERTO"], letras: "CIENMATETAROSHWC" },
        { palavras: ["FAMILIA", "AMIGO", "COLEGA", "VIZINHO"], letras: "FAMLIEANGIOCHLGVIZ" },
        { palavras: ["CIDADE", "VILA", "BAIRRO", "ESTADO"], letras: "CIADEVLIABAIROEST" },
        { palavras: ["CAMISETA", "CALÇA", "VESTIDO", "SAPATO"], letras: "CAMSIETLÇADSOVP" },
        { palavras: ["HOSPITAL", "CLINICA", "FARMACIA", "MEDICO"], letras: "HOSPCLINTCAFARMEDIC" },
        { palavras: ["RELOGIO", "CELULAR", "TABLET", "COMPUTADOR"], letras: "RELOGCILUTABCDMP" },
        { palavras: ["CHUVA", "TEMPESTADE", "NEVE", "GRANIZO"], letras: "CHVUATEMPSTIDONVZGRA" },
        { palavras: ["ESTUDANTE", "PROFESSOR", "DIRETOR", "BIBLIOTECARIO"], letras: "ESTUDPRACOPDFTNIBL" },
        { palavras: ["PIZZA", "HAMBURGUER", "SALADA", "SOPA"], letras: "PZIUAHDMBUGERSALSOP" },
        { palavras: ["TELEVISÃO", "RADIO", "INTERNET", "JORNAL"], letras: "TELEVISADONTERJ" },
        { palavras: ["CACHOEIRA", "PRAIA", "MONTANHA", "DESERTO"], letras: "CACHOEIRTPRMNHDES" },
        { palavras: ["BANANA", "MAÇÃ", "UVA", "LARANJA"], letras: "BANAMUVALARJÇ" },
        { palavras: ["VIAGEM", "FERIAS", "PASSPORT", "AVIÃO"], letras: "VIAGMFERIPASOTÃVI" }
    ];

    

    // Recupera o nível atual do jogo do armazenamento
            // local (localStorage) e o converte para um
            // número inteiro. Se não existir, define como 0.
    let nivelAtual = parseInt(localStorage.getItem('nivelAtual')) || 0;

    // Recupera os pontos do jogador do armazenamento
            // local e os converte para um número
            // inteiro. Se não existir, define como 0.
    let pontos = parseInt(localStorage.getItem('pontos')) || 0;

    // Obtém uma referência para o elemento da DOM que
            // representa a grade de palavras, onde as
            // palavras são formadas.
    const gradePalavras = document.getElementById("grade-palavras");

    // Obtém uma referência para o elemento da DOM que
            // representa o círculo de letras, de onde o
            // jogador seleciona letras.
    const circuloLetras = document.getElementById("circulo-letras");

    // Obtém uma referência para o elemento da DOM que
            // será usado para mostrar mensagens ao
            // jogador, como feedback de ações.
    const mensagem = document.getElementById("mensagem");

    // Obtém uma referência para o elemento da DOM que
            // mostra o total de moedas (pontos) que o
            // jogador acumulou.
    const totalMoedas = document.getElementById("total-moedas");

    // Obtém uma referência para o elemento da DOM que
            // mostra o nível atual no jogo.
    const nivelAtualElem = document.getElementById("nivel-atual");

    // Obtém uma referência para o elemento <canvas> usado
            // para desenhar linhas que conectam as
            // letras selecionadas.
    const canvas = document.getElementById("linha-conexao");

    // Obtém o contexto de renderização 2D para o
            // canvas, que é usado para desenhar as linhas.
    const ctx = canvas.getContext("2d");

    // Obtém uma referência para o botão que, quando
            // clicado, mostra uma dica para o jogador.
    const botaoDica = document.getElementById('botao-dica');

    // Obtém uma referência para o modal que é exibido
            // quando o botão de dica é clicado, mostrando as dicas.
    const modalDica = document.getElementById('modal-dica');

    // Obtém uma referência para o elemento da DOM que
            // mostra as palavras de dica dentro do modal.
    const palavrasDica = document.getElementById('palavras-dica');

    // Obtém uma referência para o botão dentro do
            // modal de dica que, quando clicado, fecha o modal.
    const fecharDica = document.getElementById('fechar-dica');

    // Atualiza o conteúdo textual do elemento que
            // mostra o total de moedas com o número
            // de pontos atual.
    totalMoedas.textContent = pontos;

    // Atualiza o conteúdo textual do elemento que
            // mostra o nível atual, incrementando o
            // valor armazenado em 1 para exibição.
    nivelAtualElem.textContent = nivelAtual + 1;

    // Declara uma variável para armazenar o identificador
            // de um timer que será usado para funções de
            // tempo, como o reset automático de seleções.
    let timer;

    // Declara uma string vazia para armazenar as letras
            // que o jogador seleciona ao formar palavras.
    let letrasSelecionadas = '';

    // Declara um array vazio que será usado para
            // armazenar as células DOM das letras
            // que o jogador seleciona.
    let celulasSelecionadas = [];


    // Definição da função 'reiniciarSelecao' que
            // gerencia o reset da seleção de letras no jogo.
    function reiniciarSelecao() {

        // Limpa o timer utilizando o método 'clearTimeout'. 
        // Isso é necessário para cancelar a ação de
                // reset automático que é configurada
                // para ocorrer após um intervalo de inatividade.
        clearTimeout(timer);

        // Reinicializa a string 'letrasSelecionadas'
                // como uma string vazia.
        // Isso limpa todas as letras que foram
                // previamente selecionadas pelo jogador.
        letrasSelecionadas = '';

        // Itera sobre o array 'celulasSelecionadas', que
                // contém referências aos elementos DOM das
                // células selecionadas.
        // Para cada célula no array, a cor de fundo é
                // alterada para "#ff4081", indicando que a
                // célula não está mais selecionada.
        celulasSelecionadas.forEach(celula => celula.style.backgroundColor = "#ff4081");

        // Reinicializa o array 'celulasSelecionadas'
                // como um array vazio.
        // Isso remove todas as referências às células
                // previamente selecionadas, efetivamente
                // resetando a seleção.
        celulasSelecionadas = [];

    }

    // Define a função 'criarGradePalavras' que recebe
            // um array de palavras como argumento e
            // constrói a grade visual onde essas
            // palavras serão formadas no jogo.
    function criarGradePalavras(palavras) {

        // Limpa todo o conteúdo HTML interno do
                // elemento 'gradePalavras', preparando-o
                // para uma nova configuração de palavras.
        // Isso é necessário para remover qualquer estado
                // anterior da grade de palavras, como em
                // um novo nível ou reinício de jogo.
        gradePalavras.innerHTML = '';

        // Itera sobre cada palavra no array 'palavras'
                // fornecido como argumento.
        palavras.forEach(palavra => {

            // Cria um novo elemento 'div' para cada
                    // palavra, que servirá como uma
                    // linha na grade para essa palavra.
            const linha = document.createElement("div");

            // Adiciona a classe 'linha-palavra' ao 'div'
                    // criado, o que permite aplicar estilos
                    // específicos definidos no CSS.
            linha.classList.add('linha-palavra');

            // Atribui a palavra atual como um data
                    // attribute 'data-palavra' ao elemento linha.
            // Isso pode ser usado para identificar facilmente o
                    // elemento e manipular baseado na
                    // palavra associada.
            linha.dataset.palavra = palavra;

            // Itera sobre cada letra na palavra atual.
            for (let i = 0; i < palavra.length; i++) {

                // Cria um novo elemento 'div' para cada
                        // letra, que funcionará como uma
                        // célula na linha.
                const celula = document.createElement("div");

                // Adiciona as classes 'celula-palavra' e
                        // 'vazio' ao 'div' criado.
                // 'celula-palavra' é usado para estilização
                        // geral e interação, enquanto 'vazio'
                        // indica que a célula ainda não foi preenchida.
                celula.classList.add('celula-palavra', 'vazio');

                // Adiciona a célula criada como um filho do
                        // elemento linha, colocando-a visualmente
                        // dentro da linha correspondente à palavra.
                linha.appendChild(celula);

            }

            // Adiciona a linha completa, agora contendo
                    // células para cada letra da palavra,
                    // ao elemento 'gradePalavras'.
            // Isso constrói a representação visual da
                    // grade onde as palavras serão formadas.
            gradePalavras.appendChild(linha);

        });
    }


    // Define a função 'criarCirculoLetras' que recebe
            // uma string de letras como argumento e
            // organiza essas letras em um layout circular.
    function criarCirculoLetras(letras) {
        
        // Limpa qualquer conteúdo anterior no
                // elemento 'circuloLetras', preparando-o
                // para receber novas letras.
        circuloLetras.innerHTML = '';

        // Cria um novo elemento 'div' que servirá
                // como o contêiner circular para as letras.
        const circulo = document.createElement("div");

        // Define a largura e a altura do círculo
                // para 500 pixels, garantindo que seja
                // suficientemente grande para acomodar
                // todas as letras.
        circulo.style.width = "500px";
        circulo.style.height = "500px";

        // Aplica um raio de borda de 50% para
                // transformar a 'div' em uma forma circular.
        circulo.style.borderRadius = "50%";

        // Define a posição do círculo como relativa para
                // que as letras dentro dele possam ser
                // posicionadas absolutamente em relação
                // a este contêiner.
        circulo.style.position = "relative";

        // Define a cor de fundo do círculo para um verde
            // claro (#81c784), proporcionando um contraste
            // visual com as letras.
        circulo.style.backgroundColor = "#81c784";

        // Adiciona o círculo recém-criado ao
                // elemento 'circuloLetras' no DOM.
        circuloLetras.appendChild(circulo);

        // Estabelece o raio mínimo e máximo para o
                // posicionamento das letras dentro do círculo.
        const minRadius = 200;  // Raio mínimo em pixels.
        const maxRadius = 250;  // Raio máximo em pixels.

        // Conta o número total de letras para
                // calcular o espaçamento entre elas.
        const numLetters = letras.length;

        // Calcula o raio efetivo do círculo, ajustando
                // com base no número de letras.
        // Isso assegura que o círculo seja grande o
                // suficiente para acomodar todas as
                // letras confortavelmente.
        const radius = Math.min(maxRadius, minRadius + numLetters * 5);

        // Calcula o passo angular entre cada letra,
                // dividindo o círculo completo (360 graus
                // ou 2*PI radianos) pelo número de letras.
        // Isso determina o ângulo de separação
                // entre cada letra no círculo.
        const angleStep = (2 * Math.PI) / numLetters;


        // Divide a string 'letras' em um array de
                // caracteres individuais e itera sobre
                // cada um, acessando tanto o
                // caractere (letra) quanto seu índice.
        letras.split('').forEach((letra, index) => {

            // Calcula o ângulo em radianos para cada
                    // letra, multiplicando o índice
                    // pela quantidade de espaço angular
                    // entre as letras (angleStep).
            const angle = index * angleStep;

            // Calcula a posição x da letra no círculo,
                    // usando o cosseno do ângulo para obter o
                    // componente horizontal, ajustando para o
                    // centro do círculo e centralizando a célula.
            const x = radius * Math.cos(angle) + circulo.offsetWidth / 2 - 40;

            // Calcula a posição y da letra, usando o
                    // seno do ângulo para obter o componente
                    // vertical, ajustando similarmente para o
                    // centro e centralizando a célula.
            const y = radius * Math.sin(angle) + circulo.offsetHeight / 2 - 40;

            // Cria um novo elemento 'div' para cada letra.
            const celula = document.createElement("div");

            // Define o conteúdo de texto da célula como a
                    // letra atual, tornando-a visível
                    // dentro da célula.
            celula.textContent = letra;

            // Aplica estilos CSS para posicionar absolutamente
                    // cada célula no círculo, usando as
                    // coordenadas x e y calculadas.
            celula.style.left = `${x}px`;
            celula.style.top = `${y}px`;
            celula.style.position = "absolute";

            // Define dimensões para a célula, fazendo-a
                    // suficientemente grande para exibir a
                    // letra de forma clara.
            celula.style.width = "80px";
            celula.style.height = "80px";

            // Aplica um raio de borda de 50% para
                    // arredondar a célula, dando-lhe
                    // uma forma circular.
            celula.style.borderRadius = "50%";

            // Define a cor de fundo da célula, usando uma
                    // cor vibrante para destaque.
            celula.style.backgroundColor = "#ff4081";

            // Utiliza Flexbox para centralizar o
                    // conteúdo (letra) dentro da célula.
            celula.style.display = "flex";
            celula.style.justifyContent = "center";
            celula.style.alignItems = "center";

            // Ajusta o tamanho da fonte e o peso, tornando a
                    // letra facilmente legível e
                    // visualmente impactante.
            celula.style.fontSize = "24px";
            celula.style.fontWeight = "bold";

            // Define a cor do texto para branco, criando um
                    // contraste alto com o fundo.
            celula.style.color = "#ffffff";

            // Adiciona uma borda sólida para melhor
                    // definir as bordas da célula no layout.
            celula.style.border = "2px solid #388e3c";

            // Muda o cursor para indicar que a
                    // célula é clicável.
            celula.style.cursor = "pointer";

            // Adiciona uma transição suave para
                    // mudanças de cor de fundo, que
                    // pode ocorrer durante interações.
            celula.style.transition = "background-color 0.3s";

            // Adiciona um ouvinte de evento que chama a
                    // função 'selecionarLetra' quando a
                    // célula é clicada, tratando a lógica de
                    // seleção de letras.
            celula.addEventListener("click", selecionarLetra);

            // Adiciona a célula configurada ao
                    // contêiner do círculo no DOM.
            circulo.appendChild(celula);

        });

        // Define a largura e a altura do elemento canvas
                // para corresponder às dimensões do
                // contêiner 'circuloLetras'.
        // Isso garante que o canvas cubra toda a área
                // necessária para possíveis efeitos gráficos,
                // como linhas conectando letras selecionadas.
        canvas.width = circuloLetras.offsetWidth;
        canvas.height = circuloLetras.offsetHeight;

    }


    // Define a função 'selecionarLetra', que é chamada
            // quando uma letra é clicada pelo usuário.
    function selecionarLetra(event) {

        // Obtém o elemento que foi clicado, através do
                // objeto de evento passado à função. Esse
                // elemento representa a célula da letra clicada.
        const letraClicada = event.target;

        // Adiciona o conteúdo de texto da célula
                // clicada (a letra) à string 'letrasSelecionadas'.
        // Isso acumula as letras clicadas em uma
                // sequência conforme o jogador forma palavras.
        letrasSelecionadas += letraClicada.textContent;

        // Adiciona a célula clicada ao array 'celulasSelecionadas'.
        // Este array rastreia quais células foram
                // selecionadas para poder modificar ou
                // redefinir seu estado mais tarde.
        celulasSelecionadas.push(letraClicada);

        // Muda a cor de fundo da célula clicada
                // para amarelo (#ffeb3b).
        // Isso serve como feedback visual para o
                // jogador, indicando que a letra foi selecionada.
        letraClicada.style.backgroundColor = "#ffeb3b";

        // Limpa o timer atual, se houver. Isso
                // evita que a seleção seja reiniciada
                // prematuramente se o jogador continuar
                // selecionando letras.
        clearTimeout(timer);

        // Define um novo timer que chamará a
                // função 'reiniciarSelecao' após 5000
                // milissegundos (5 segundos).
        // Isso reiniciará a seleção automaticamente se o
                // jogador não interagir dentro deste
                // intervalo, melhorando a jogabilidade e
                // prevenindo estados pendentes.
        timer = setTimeout(reiniciarSelecao, 5000);

        // Chama a função 'verificarPalavra' com a
                // string de 'letrasSelecionadas' como argumento.
        // Esta função verifica se as letras selecionadas até
                // agora formam uma palavra válida conforme
                // definido nos níveis do jogo.
        verificarPalavra(letrasSelecionadas);

    }


    // Define a função 'verificarPalavra', que é chamada
            // para verificar se uma sequência de letras
            // selecionadas forma uma palavra válida
            // conforme definido na grade de palavras do jogo.
    function verificarPalavra(palavra) {

        // Converte a coleção de elementos filhos
                // do 'gradePalavras' em um array para
                // facilitar a iteração.
        // 'gradePalavras.children' contém todos os
                // elementos que representam linhas de
                // palavras na interface do jogo.
        const linhas = Array.from(gradePalavras.children);

        // Inicializa uma variável booleana 'encontrou' para
                // indicar se a palavra foi encontrada na
                // grade de palavras.
        let encontrou = false;

        // Itera sobre cada 'linha' dentro da grade de
                // palavras. Cada linha corresponde a
                // uma palavra potencial que pode ser formada.
        linhas.forEach(linha => {

            // Verifica se a 'data-palavra' do elemento
                    // linha é igual à palavra formada
                    // pelas letras selecionadas.
            // A condição '!encontrou' garante que a
                    // busca pare assim que uma correspondência
                    // válida for encontrada, prevenindo
                    // verificações desnecessárias.
            if (linha.dataset.palavra === palavra && !encontrou) {

                // Chama a função 'preencherPalavraNaGrade',
                        // que visualmente marca a palavra como
                        // completa na interface do jogo.
                // Isso geralmente envolve alterar a cor das
                        // células da palavra para indicar que a
                        // palavra foi corretamente formada.
                preencherPalavraNaGrade(linha, palavra);

                // Define 'encontrou' como true, indicando que a
                        // palavra foi encontrada e correspondida na grade.
                encontrou = true;

            }
        });

        // Verifica se a palavra foi encontrada na
                // grade de palavras.
        if (encontrou) {

            // Atualiza o conteúdo de texto do elemento 'mensagem'
                    // para "Excelente!", fornecendo feedback
                    // positivo ao jogador.
            mensagem.textContent = 'Excelente!';

            // Acessa a lista de palavras do nível atual para manipulação.
            const palavras = niveis[nivelAtual].palavras;

            // Remove a palavra encontrada da lista de palavras
                    // do nível atual, evitando que seja
                    // encontrada novamente.
            palavras.splice(palavras.indexOf(palavra), 1);

            // Verifica se todas as palavras do
                    // nível foram encontradas.
            if (palavras.length === 0) {

                // Se todas as palavras foram encontradas, chama a
                        // função 'avancarNivel' para progredir
                        // para o próximo nível do jogo.
                avancarNivel();

            }

            // Altera a cor de fundo das células selecionadas
                    // para verde (#4caf50), indicando que a
                    // seleção foi correta.
            celulasSelecionadas.forEach(celula => celula.style.backgroundColor = "#4caf50");

            // Define um timer para reverter a cor das células
                    // para a cor original após 1 segundo.
            setTimeout(() => {

                // Volta à cor original
                celulasSelecionadas.forEach(celula => celula.style.backgroundColor = "#ff4081"); 

                // Limpa a lista de células selecionadas
                        // após a mudança de cor.
                celulasSelecionadas = []; 

            }, 1000);

            // Limpa a string 'letrasSelecionadas' para
                    // reiniciar o processo de formação
                    // de novas palavras.
            letrasSelecionadas = '';

            // Limpa o timer de reinicialização automática de
                    // seleção, evitando interrupções
                    // indesejadas após um sucesso.
            clearTimeout(timer);

        } else {

            // Caso a palavra formada não seja válida, limpa o
                    // texto do elemento 'mensagem'.
            mensagem.textContent = '';

        }

    }



    // Define a função 'preencherPalavraNaGrade', que recebe
            // como parâmetros uma 'linha' do DOM onde as células
            // de letras estão contidas e a 'palavra' que
            // foi corretamente formada pelo jogador.
    function preencherPalavraNaGrade(linha, palavra) {

        // Converte a coleção de filhos da linha (células
                // de letras) em um array para facilitar
                // a manipulação.
        const celulas = Array.from(linha.children);

        // Itera sobre cada letra na palavra fornecida.
                // O índice 'i' é usado para acessar
                // simultaneamente a letra na palavra e
                // a célula correspondente na linha.
        for (let i = 0; i < palavra.length; i++) {

            // Define o conteúdo textual de cada célula na
                    // linha para corresponder a cada
                    // letra na palavra.
            // Isso insere visualmente a letra correta na
                    // célula correspondente na grade.
            celulas[i].textContent = palavra[i];

            // Remove a classe 'vazio' da lista de
                    // classes da célula.
            // A classe 'vazio' pode ser usada para
                    // estilizar células que ainda não
                    // foram preenchidas ou confirmadas
                    // como parte de uma palavra correta.
            celulas[i].classList.remove('vazio');

            // Adiciona a classe 'preenchido' à
                    // lista de classes da célula.
            // A classe 'preenchido' é utilizada para
                    // aplicar um estilo específico a células
                    // que fazem parte de uma palavra corretamente
                    // formada, como uma cor de fundo diferente ou
                    // um indicativo de que a célula não
                    // pode mais ser modificada.
            celulas[i].classList.add('preenchido');

        }
    }


    // Define a função 'avancarNivel' que gerencia a
            // transição do jogador para o próximo nível do jogo.
    function avancarNivel() {

        // Incrementa os pontos do jogador em 1. Isso
                // recompensa o jogador por completar um nível.
        pontos += 1;

        // Incrementa o índice 'nivelAtual' para
                // avançar para o próximo nível.
        nivelAtual += 1;

        // Armazena o novo valor dos pontos no
                // localStorage, garantindo que o progresso
                // do jogador seja salvo e persistido
                // entre sessões de jogo.
        localStorage.setItem('pontos', pontos);

        // Armazena o novo nível atual no localStorage para
                // manter o rastreamento do progresso do
                // jogador através dos níveis.
        localStorage.setItem('nivelAtual', nivelAtual);

        // Verifica se ainda existem mais níveis para
                // serem jogados verificando se o índice do
                // nível atual é menor que o comprimento
                // do array 'niveis'.
        if (nivelAtual < niveis.length) {

            // Se houver mais níveis, chama a
                    // função 'carregarNivel' para
                    // configurar e iniciar o próximo nível.
            carregarNivel();

        } else {

            // Se não houver mais níveis disponíveis,
                    // atualiza o conteúdo textual do
                    // elemento 'mensagem' para parabenizar o jogador.
            mensagem.textContent = 'Parabéns! Você completou todos os níveis!';

        }

        // Atualiza o texto do elemento 'totalMoedas' para
                // refletir os novos pontos acumulados pelo jogador.
        totalMoedas.textContent = pontos;

        // Atualiza o texto do elemento 'nivelAtualElem' para
                // mostrar o novo nível atual, incrementado
                // em 1, na interface do usuário.
        nivelAtualElem.textContent = nivelAtual + 1;

    }

    
    // Define a função 'carregarNivel', responsável por
            // preparar e exibir o novo nível do jogo
            // após a transição de nível ou ao iniciar o jogo.
    function carregarNivel() {

        // Acessa os dados do nível atual a partir do
                // array 'niveis' usando o índice 'nivelAtual'.
        // Cada objeto de nível contém as 'palavras' que
                // precisam ser encontradas e as 'letras'
                // disponíveis para formar essas palavras.
        const nivel = niveis[nivelAtual];

        // Chama a função 'criarGradePalavras' passando as
                // palavras do nível atual como argumento.
        // Essa função configura a grade visual no jogo
                // onde os jogadores formarão as palavras.
        criarGradePalavras(nivel.palavras);

        // Chama a função 'criarCirculoLetras' com as
                // letras do nível atual.
        // Esta função organiza as letras em um layout
                // circular, permitindo que os jogadores
                // cliquem para formar as palavras.
        criarCirculoLetras(nivel.letras);

        // Limpa qualquer mensagem anterior que possa
                // estar sendo exibida no elemento 'mensagem'.
        // Isso é útil para remover mensagens de
                // erro ou sucesso do nível anterior.
        mensagem.textContent = '';

        // Reinicializa o array 'celulasSelecionadas' para vazio.
        // Esse array rastreia as células que foram
                // selecionadas durante a formação de palavras, e
                // limpá-lo garante que não haja resíduos
                // de seleções anteriores.
        celulasSelecionadas = [];

        // Reinicializa a string 'letrasSelecionadas' para vazia.
        // Essa string acumula as letras selecionadas pelos
                // jogadores enquanto tentam formar palavras, e
                // limpá-la permite começar a formação de
                // novas palavras do zero.
        letrasSelecionadas = '';

        

    }

    // Chama a função 'carregarNivel' ao iniciar o
            // jogo ou quando um novo nível precisa
            // ser configurado.
    // Essa função prepara o jogo com as palavras e
            // letras necessárias para o nível atual,
            // além de reiniciar qualquer estado
            // anterior do jogo.
    carregarNivel();


    // Adiciona um ouvinte de eventos de
            // clique ao botão 'botaoDica'.
    botaoDica.addEventListener('click', () => {

        // Acessa os dados do nível atual a partir do
                // array 'niveis' usando o índice 'nivelAtual'.
        const nivel = niveis[nivelAtual];

        // Atualiza o conteúdo do elemento 'palavrasDica' para
                // incluir uma lista formatada das palavras que
                // precisam ser encontradas no nível atual.
        // Utiliza a tag `<strong>` para destacar o texto "Palavras:" e
                // o método 'join' para concatenar todas as
                // palavras do nível atual com vírgulas entre elas.
        palavrasDica.innerHTML = `<strong>Palavras:</strong> ${nivel.palavras.join(', ')}`;

        // Altera o estilo de exibição do 'modalDica'
                // para 'block', tornando-o visível.
        // Isso efetivamente mostra o modal com as
                // dicas (palavras a serem encontradas),
                // proporcionando ajuda visual ao jogador.
        modalDica.style.display = 'block';

    });

    // Adiciona um ouvinte de eventos de
            // clique ao botão 'fecharDica'.
    fecharDica.addEventListener('click', () => {

        // Altera o estilo de exibição do 'modalDica'
                // para 'none', escondendo-o.
        // Isso permite ao jogador fechar o modal de
                // dicas quando desejado, mantendo a
                // interface limpa e focada no jogo.
        modalDica.style.display = 'none';

    });
    

});