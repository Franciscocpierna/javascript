let exemplos = [];
// Cria um array 'exemplos' para armazenar os exemplos de
        // desafios ou questões geradas durante o jogo.

let score = 0;
// Inicializa uma variável 'score' para manter a pontuação do 
        // usuário, começando de zero.

function gerarNovoJogo() {
// Declara a função 'gerarNovoJogo', que é chamada para iniciar ou 
        // reiniciar o jogo com novos desafios.

    const letrasBase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Define uma constante 'letrasBase' contendo todas as letras do 
            // alfabeto, que será usada para gerar exemplos de jogos.

    const inicio = Math.floor(Math.random() * (letrasBase.length - 3));
    // Calcula um índice inicial aleatório para a seleção de letras. 
            // Subtrai 3 do comprimento total para evitar erros de 
            // índice no final do alfabeto.

    const letras = letrasBase.slice(inicio, inicio + 3).split("");
    // Seleciona 3 letras consecutivas a partir do índice 'inicio' no 
            // alfabeto e as divide em um array de letras individuais.

    // Gerar valores aleatórios para as letras
    const valores = {
        [letras[0]]: Math.floor(Math.random() * 10) + 1,
        [letras[1]]: Math.floor(Math.random() * 10) + 1,
        [letras[2]]: Math.floor(Math.random() * 10) + 1
    };
    // Cria um objeto 'valores' onde cada letra selecionada é mapeada 
            // para um valor inteiro aleatório entre 1 e 10. Isso é usado 
            // para criar exemplos de operações matemáticas.

    const operacoes = ["+", "-", "*"];
    // Define um array 'operacoes' contendo os símbolos das operações 
            // matemáticas básicas que serão usadas nos desafios do jogo.


    // Função auxiliar para gerar operação aleatória entre duas letras
    function gerarOperacaoAleatoria(letra1, letra2) {
        // Define a função 'gerarOperacaoAleatoria' que recebe 
                // duas letras como parâmetros.

        const operacao = operacoes[Math.floor(Math.random() * operacoes.length)];
        // Seleciona aleatoriamente uma operação matemática (+, -, *) do array 'operacoes'.

        // Variável para armazenar o resultado numérico da operação.
        let resultado; 

        // Variável para armazenar a representação textual da 
                // operação usando letras.
        let texto;     

        // Variável para armazenar a representação textual da 
                // operação usando números.
        let textoNumerico; 

        switch (operacao) {
            // Inicia uma estrutura de controle para executar diferentes 
                    // blocos de código, baseado na operação selecionada.
            
            case "+":
                // Bloco executado se a operação for soma.

                resultado = valores[letra1] + valores[letra2];
                // Calcula a soma dos valores associados a letra1 e letra2, 
                        // armazenando em 'resultado'.
                
                texto = `${letra1} + ${letra2}`;
                // Constrói a string da operação usando as letras, como "A + B".
                
                textoNumerico = `${valores[letra1]} + ${valores[letra2]}`;
                // Constrói a string da operação usando os valores numéricos 
                        // associados às letras, como "1 + 2".
                
                break; // Encerra o case "+".

            case "-":
                // Bloco executado se a operação for subtração.

                resultado = valores[letra1] - valores[letra2];
                // Calcula a subtração dos valores associados a letra1 e letra2.
                
                texto = `${letra1} - ${letra2}`;
                // Constrói a string da operação de subtração usando as letras.
                
                textoNumerico = `${valores[letra1]} - ${valores[letra2]}`;
                // Constrói a string da operação de subtração usando os valores numéricos.
                
                break; // Encerra o case "-".

            case "*":
                // Bloco executado se a operação for multiplicação.
                
                resultado = valores[letra1] * valores[letra2];
                // Calcula a multiplicação dos valores associados a letra1 e letra2.
                
                texto = `${letra1} * ${letra2}`;
                // Constrói a string da operação de multiplicação usando as letras.
                
                textoNumerico = `${valores[letra1]} * ${valores[letra2]}`;
                // Constrói a string da operação de multiplicação 
                        // usando os valores numéricos.
                
                break; // Encerra o case "*".

        }

        return { texto, textoNumerico, resultado };
        // Retorna um objeto contendo a representação textual da operação 
                // com letras, a representação textual com 
                // números, e o resultado numérico.

    }


    // Linha 1: Três itens iguais com operação de soma
    const linha1 = {
        // Cria uma constante chamada 'linha1' que é um objeto 
                // contendo três propriedades: 'texto', 'textoNumerico', e 'resposta'.

        texto: `${letras[0]} + ${letras[0]} + ${letras[0]} = ${valores[letras[0]] * 3}`,
        // Define a propriedade 'texto' do objeto. Aqui, ela é uma 
                // string que representa uma operação de soma
        // usando a mesma letra três vezes (ex.: "A + A + A = 3A"), 
                // onde 'A' é o primeiro elemento do array 'letras'.
        // O resultado é calculado multiplicando o valor 
                // associado a essa letra por 3.

        textoNumerico: `${valores[letras[0]]} + ${valores[letras[0]]} + ${valores[letras[0]]} = ${valores[letras[0]] * 3}`,
        // Define a propriedade 'textoNumerico'. Esta string representa a 
                // mesma operação de soma, mas usando valores numéricos
                // em vez de letras (ex.: "1 + 1 + 1 = 3"), onde '1' é o valor 
                // numérico associado à letra no objeto 'valores'.
        // É útil para mostrar ao usuário os valores reais sendo 
                // somados e o resultado da operação.

        resposta: valores[letras[0]] * 3
        // A propriedade 'resposta' armazena o resultado numérico da 
                // soma dos três valores idênticos (ex.: 3).
        // Este valor é usado para verificar se a resposta do 
                // usuário à pergunta é correta.

    };


    // Linha 2: Dois itens iguais e um item da primeira linha com operação aleatória
    const operacaoLinha2 = gerarOperacaoAleatoria(letras[1], letras[1]);
    // Invoca a função 'gerarOperacaoAleatoria' passando a segunda letra 
            // do array 'letras' como ambos os argumentos.
    // Esta função calcula uma operação matemática aleatória 
            // (soma, subtração ou multiplicação) entre os dois 
            // mesmos valores (ex.: B * B).
    // O resultado, que inclui a operação escolhida e os valores 
            // numéricos, é armazenado na variável 'operacaoLinha2'.

    const linha2 = {
        // Cria uma constante chamada 'linha2', que é um objeto contendo 
                // três propriedades: 'texto', 'textoNumerico', e 'resposta'.

        texto: `${letras[0]} + ${letras[1]} + ${letras[1]} = ${valores[letras[0]] + valores[letras[1]] * 2}`,
        // Define a propriedade 'texto' do objeto, que constrói uma 
                // expressão matemática usando uma combinação da letra
                // da primeira linha e duas ocorrências da letra da 
                // segunda linha (ex.: "A + B + B = resultado").
        // A expressão é calculada somando o valor da primeira letra 
                // com o dobro do valor da segunda letra.

        textoNumerico: `${valores[letras[0]]} + ${valores[letras[1]]} + ${valores[letras[1]]} = ${valores[letras[0]] + valores[letras[1]] * 2}`,
        // Define a propriedade 'textoNumerico', que mostra a 
                // operação de forma numérica (ex.: "1 + 2 + 2 = 5").
        // Este formato numérico facilita a compreensão visual do cálculo 
                // realizado, especialmente útil para aprendizado ou verificação.

        resposta: valores[letras[0]] + valores[letras[1]] * 2
        // A propriedade 'resposta' armazena o resultado numérico da 
                // operação, que é a soma do valor da primeira letra 
                // mais o dobro do valor da segunda letra. 
        // Este valor será usado para verificar se a resposta 
                // fornecida pelo usuário está correta.
    
    };


    // Linha 3: Operação aleatória entre duas letras com resultado direto
    const operacaoLinha3 = gerarOperacaoAleatoria(letras[1], letras[2]);
    // Chama a função 'gerarOperacaoAleatoria' passando a segunda e a 
            // terceira letras do array 'letras' como argumentos.
    // Esta função realiza uma operação matemática aleatória (+, -, *) 
            // entre esses dois valores e retorna um objeto contendo
            // tanto a representação textual da operação usando 
            // letras (ex: "B + C") quanto usando números (ex: "2 + 3"),
            // e o resultado numérico da operação.

    const linha3 = {
        // Cria um objeto chamado 'linha3' que armazenará a representação 
                // textual da operação, sua representação numérica, e 
                // o resultado da operação.

        texto: `${operacaoLinha3.texto} = ${operacaoLinha3.resultado}`,
        // Define a propriedade 'texto' como uma string que mostra a 
                // operação utilizando letras, seguida pelo resultado (ex: "B + C = 5").
        // Este formato ajuda a entender visualmente a operação 
                // realizada com as letras.

        textoNumerico: `${operacaoLinha3.textoNumerico} = ${operacaoLinha3.resultado}`,
        // Define a propriedade 'textoNumerico' como uma string que 
                // mostra a operação utilizando os valores numéricos das 
                // letras, seguida pelo resultado (ex: "2 + 3 = 5").
        // Este formato é útil para quem precisa ver a operação de forma 
                // numérica clara, facilitando a compreensão dos
                //  valores envolvidos.

        resposta: operacaoLinha3.resultado
        // Armazena o resultado numérico da operação na propriedade 'resposta'. 
                // Este valor será usado para verificar se a resposta 
                        // do usuário está correta.
    
    };


    // Linha 4: Operação final com combinação de letras e operações aleatórias
    const operacaoLinha4Parte1 = gerarOperacaoAleatoria(letras[2], letras[0]);
    // Chama a função 'gerarOperacaoAleatoria' com a terceira letra e 
            // a primeira letra do array 'letras' como argumentos.
    // Esta função realiza uma operação matemática aleatória (+, -, *) entre 
            // esses dois valores e retorna um objeto contendo
            // a representação textual da operação com letras (ex: "C * A"), a 
            // representação numérica (ex: "3 * 1"), e o resultado 
            // numérico da operação.

    const linha4 = {
        // Cria um objeto chamado 'linha4' que armazenará a representação 
                // textual da operação, sua representação numérica, e 
                // o resultado esperado.

        texto: `${operacaoLinha4Parte1.texto} + ${letras[1]} = ?`,
        // Define a propriedade 'texto' como uma string que mostra a 
                // operação inicial realizada entre a terceira e a 
                // primeira letra, seguida por uma adição com a segunda 
                // letra, mas deixa o resultado como um ponto de 
                // interrogação (ex: "C * A + B = ?").
        // Este formato apresenta um desafio para o usuário 
                // calcular o resultado final.

        textoNumerico: `${operacaoLinha4Parte1.textoNumerico} + ${valores[letras[1]]} = ${operacaoLinha4Parte1.resultado + valores[letras[1]]}`,
        // Define a propriedade 'textoNumerico' como uma string que 
                // mostra a operação inicial em forma numérica seguida pela 
                // adição do valor da segunda letra,
                // mostrando o resultado numérico final (ex: "3 * 1 + 2 = 5"). 
        // Este formato clarifica os valores numéricos envolvidos na operação.

        resposta: operacaoLinha4Parte1.resultado + valores[letras[1]]
        // Armazena o resultado numérico da soma da operação inicial 
                // com o valor da segunda letra na propriedade 'resposta'.
        // Este valor é o resultado final que o usuário deve calcular.

    };

    return [linha1, linha2, linha3, linha4];
    // Retorna um array contendo os objetos de cada linha, que 
            // representam cada um dos desafios ou operações 
            // matemáticas geradas para o jogo.
    // Esses objetos serão usados para apresentar as perguntas ao 
            // usuário e verificar suas respostas.

}



function carregarJogo() {
    // Declara a função 'carregarJogo', que é responsável por 
            // inicializar ou atualizar a interface do usuário 
            // com os novos desafios gerados.

    const exemplosDiv = document.getElementById("exemplos");
    // Obtém o elemento do DOM com o ID 'exemplos', que é o contêiner 
            // onde os exemplos de desafios serão exibidos.

    exemplosDiv.innerHTML = "";
    // Limpa o conteúdo atual do elemento 'exemplosDiv', removendo 
            // quaisquer desafios anteriores que estavam sendo exibidos.

    exemplos.forEach((exemplo, index) => {
        // Itera sobre o array 'exemplos', onde cada 'exemplo' é um 
                // objeto contendo os detalhes de um desafio 
                // matemático, e 'index' é o índice do item atual.

        const exemploLinha = document.createElement("p");
        // Cria um novo elemento de parágrafo ('p') para cada exemplo, 
                // que será usado para exibir o texto do desafio.

        exemploLinha.innerText = exemplo.texto;
        // Define o texto interno do elemento de parágrafo para o texto do 
                // desafio atual, que descreve a operação 
                // matemática a ser realizada.

        exemplosDiv.appendChild(exemploLinha);
        // Adiciona o elemento de parágrafo criado ao contêiner 'exemplosDiv', 
                // fazendo com que o desafio seja exibido na página.

        if (index === exemplos.length - 1) {
            // Verifica se o item atual é o último item do array 'exemplos'.

            document.getElementById("pergunta").innerText = exemplo.texto;
            // Se for o último desafio, também define o texto deste 
                    // desafio como o texto da pergunta principal, que é 
                    // exibido em uma área separada para resposta.

        }

    });

    document.getElementById("verResposta").style.display = "none";
    // Oculta o botão 'Ver Resposta' inicialmente quando o jogo é 
            // carregado, assumindo que o usuário ainda não 
            // necessita ver a resposta.

}


function verificarResposta() {
    // Declara a função 'verificarResposta' que é chamada quando o 
            // usuário tenta verificar se sua resposta ao desafio está correta.

    const respostaUsuario = parseInt(document.getElementById("resposta").value);
    // Recupera o valor numérico inserido pelo usuário no campo de 
            // entrada com o id 'resposta' e o converte para um inteiro.

    const exemploAtual = exemplos[exemplos.length - 1];
    // Acessa o último desafio do array 'exemplos', que é o desafio 
            // atual apresentado ao usuário para responder.

    if (respostaUsuario === exemploAtual.resposta) {
        // Verifica se a resposta fornecida pelo usuário é igual à 
                // resposta esperada para o desafio atual.

        score += 1;
        // Incrementa a pontuação do usuário em um ponto, indicando 
                // que ele respondeu corretamente.

        document.getElementById("resultado").innerText = "Resposta correta!";
        // Atualiza o texto do elemento com id 'resultado' para informar ao 
                // usuário que ele acertou a resposta.

        document.getElementById("resultado").style.color = "green";
        // Altera a cor do texto do resultado para verde, visualmente 
                // indicando uma resposta correta.

        exemplos = gerarNovoJogo();
        // Gera um novo conjunto de desafios para o jogo, 
                // redefinindo o array 'exemplos'.

        carregarJogo();
        // Chama a função 'carregarJogo' para atualizar a interface do 
                // usuário com os novos desafios gerados.

    } else {
        // Caso a resposta do usuário não seja correta, executa o 
                // bloco de código a seguir.

        document.getElementById("resultado").innerText = "Resposta incorreta, tente novamente!";
        // Informa ao usuário através do elemento com id 'resultado' 
                // que a resposta estava errada.

        document.getElementById("resultado").style.color = "red";
        // Altera a cor do texto do resultado para vermelho, visualmente 
                // indicando uma resposta incorreta.

        document.getElementById("verResposta").style.display = "inline-block";
        // Torna visível o botão 'Ver Resposta', permitindo ao 
                // usuário ver a resposta correta se desejar.

    }

    document.getElementById("score").innerText = `Pontuação: ${score}`;
    // Atualiza o elemento com id 'score' para mostrar a nova 
            // pontuação do usuário após a tentativa de resposta.

    document.getElementById("resposta").value = "";
    // Limpa o campo de entrada onde o usuário digita sua resposta, 
            // preparando-o para o próximo desafio.

}


function exibirResposta() {
    // Declara a função 'exibirResposta', que é responsável por 
            // mostrar as respostas numéricas dos desafios em um modal.

    const detalhesResposta = document.getElementById("detalhesResposta");
    // Obtém o elemento do DOM com o ID 'detalhesResposta', que é o 
            // contêiner dentro do modal onde as respostas serão exibidas.

    detalhesResposta.innerHTML = "";
    // Limpa qualquer conteúdo anterior no contêiner 'detalhesResposta' 
            // para garantir que as respostas anteriores não se acumulem.

    exemplos.forEach((exemplo) => {
        // Itera sobre cada 'exemplo' no array 'exemplos', que 
                // contém os desafios gerados para o jogo.

        const p = document.createElement("p");
        // Cria um novo elemento de parágrafo ('p') para exibir 
                // individualmente a resposta numérica de cada desafio.

        p.innerText = exemplo.textoNumerico;
        // Define o texto do parágrafo para a representação numérica 
                // do desafio, mostrando a operação matemática e seus valores.

        detalhesResposta.appendChild(p);
        // Adiciona o parágrafo criado ao contêiner 'detalhesResposta', 
                // permitindo que ele seja visualizado no modal.

    });

    document.getElementById("modal").style.display = "flex";
    // Altera o estilo de exibição do elemento modal para 'flex', 
            // tornando o modal visível na tela.
    // Esta mudança permite que o modal se adapte e centralize seu 
            // conteúdo usando as propriedades de flexbox.

}


function fecharModal() {
    // Declara a função 'fecharModal', que é responsável por 
            // ocultar o modal de respostas.

    document.getElementById("modal").style.display = "none";
    // Acessa o elemento do DOM com o ID 'modal' e altera seu 
            // estilo de exibição para 'none', efetivamente 
            // ocultando o modal da tela.
    // Isso permite que o usuário feche o modal de detalhes de 
            // resposta quando desejar.

}



// Inicializa o jogo
exemplos = gerarNovoJogo();
// Chama a função 'gerarNovoJogo' para criar um novo conjunto de 
        // desafios matemáticos, e armazena os desafios gerados 
        // no array 'exemplos'.

carregarJogo();
// Chama a função 'carregarJogo' para atualizar a interface do 
        // usuário com os novos desafios gerados, exibindo-os 
        // para o usuário começar a jogar.


document.getElementById("verificar").addEventListener("click", verificarResposta);
// Configura um ouvinte de eventos no botão com o ID 'verificar'. 
        // Este evento dispara a função 'verificarResposta' 
                // quando o botão é clicado.
// A função 'verificarResposta' é responsável por checar a 
        // resposta do usuário ao desafio atual e atualizar a 
        // interface com feedback apropriado.

document.getElementById("verResposta").addEventListener("click", exibirResposta);
// Adiciona um ouvinte de eventos no botão com o ID 'verResposta'. 
// Quando este botão é clicado, a função 'exibirResposta' é chamada.
// A função 'exibirResposta' mostra o modal com as respostas 
        // numéricas para os desafios, permitindo que o 
        // usuário veja as respostas corretas.

document.getElementById("fechar").addEventListener("click", fecharModal);
// Adiciona um ouvinte de eventos no elemento com o ID 'fechar'. 
// Este evento dispara a função 'fecharModal' quando o botão é clicado.
// Isso permite que o usuário feche o modal de respostas, 
        // retornando à tela principal do jogo.