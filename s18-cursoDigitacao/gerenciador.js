/* Declara uma constante chamada 'textos', que é um array de 
    strings. Cada string é uma frase que serve como uma lição de digitação. 
    O array é usado para armazenar diferentes textos que o usuário 
    tentará digitar durante o curso. */
const textos = [
    "Aprender a digitar é essencial. Comece com práticas diárias.",
    "As crianças correm descalças na areia da praia, enquanto o sol se põe lentamente no horizonte dourado ao longe.",
    "Na tranquila tarde de verão, o vento suave balança as árvores, enquanto as flores exalam um doce perfume que enche o ar ao redor do jardim perfumado.",
    "Sob o céu estrelado da noite, os animais da floresta começam a se recolher em suas tocas, enquanto os grilos cantam sua sinfonia noturna, acompanhados pelo suave murmúrio do riacho que serpenteia entre as pedras.",
    "No coração da cidade agitada, o trânsito flui incessantemente, enquanto as luzes dos prédios brilham intensamente, refletindo-se nas águas calmas do rio que corta a metrópole, criando um cenário urbano de beleza única, onde o caos e a serenidade se encontram harmoniosamente."
];
    
/* Declara uma variável 'contadorCerto', inicializada com 0. Esta 
variável é usada para contar o número de letras que o 
usuário digitou corretamente. */
let contadorCerto = 0;
    
/* Declara uma variável 'contadorErrado', também inicializada com 0. 
    Esta variável conta o número de erros que o usuário comete ao 
    digitar as letras. */
let contadorErrado = 0;
    
/* Declara uma variável 'intervaloTempo', inicialmente sem 
        valor definido (undefined). 
    Esta variável será usada mais tarde para armazenar a referência de 
        um intervalo de tempo (usando setInterval), que controla a contagem 
        regressiva do tempo durante o curso. */
let intervaloTempo;
    
/* Declara uma variável 'tempoRestante', inicializada com 60. Representa o 
    tempo total em segundos que o usuário tem para completar a tarefa atual. */
let tempoRestante = 60;
    
/* Declara uma variável 'textoAtual', inicializada com uma string vazia ''. 
    Esta variável será usada para armazenar o texto que o usuário está 
    atualmente tentando digitar. */
let textoAtual = '';
    

/* Define a função 'iniciarContadorTempo', que é responsável por iniciar e 
gerenciar a contagem regressiva do tempo durante um teste de digitação. */
function iniciarContadorTempo() {

    /* Verifica se a variável 'intervaloTempo' já possui um valor atribuído, 
        indicando um intervalo ativo. 
        Se sim, usa 'clearInterval' para parar esse intervalo. Isso impede que 
        múltiplos intervalos se sobreponham, o que poderia acelerar a contagem do tempo. */
    if (intervaloTempo) clearInterval(intervaloTempo);

    /* Reinicializa a variável 'tempoRestante' para 60 segundos. Isso 
        garante que o tempo comece de um valor fixo sempre que a função for chamada. */
    tempoRestante = 60;

    /* Acessa o elemento HTML com o ID 'contadorTempo' e define seu 
        conteúdo de texto para o valor atual de 'tempoRestante', 
        atualizando visualmente o contador de tempo na página para 60 segundos. */
    document.getElementById('contadorTempo').textContent = tempoRestante;

    /* Inicia um novo intervalo de tempo que decrementa 'tempoRestante' em 1 a 
        cada 1000 milissegundos (ou seja, a cada segundo). 
    Esse intervalo é armazenado na variável 'intervaloTempo'. */
    intervaloTempo = setInterval(() => {

        /* Decrementa a variável 'tempoRestante' em 1 a cada execução do intervalo. */
        tempoRestante--;

        /* Novamente atualiza o conteúdo de texto do elemento 'contadorTempo' com o 
            novo valor de 'tempoRestante', 
            mostrando a contagem regressiva na tela. */
        document.getElementById('contadorTempo').textContent = tempoRestante;

        /* Verifica se 'tempoRestante' chegou a 0 ou menos. Se sim, executa as 
            seguintes ações dentro do bloco: */
        if (tempoRestante <= 0) {

            /* Usa 'clearInterval' para parar o intervalo de tempo armazenado 
                em 'intervaloTempo', efetivamente parando a contagem regressiva. */
            clearInterval(intervaloTempo);

            /* Chama a função 'verificarResultado', que não é mostrada aqui, mas 
                avalia o desempenho do usuário ao final do tempo e 
                exibe o resultado. */
            verificarResultado();

        }
    }, 1000);  // O valor 1000 milissegundos determina que o decremento e a 
                // atualização ocorrem a cada segundo.

}


/* Define a função 'verificarResultado', que é responsável por 
avaliar o desempenho do usuário após a conclusão de um exercício de digitação. */
function verificarResultado() {

    /* Calcula a 'porcentagemCerta', que é a razão entre o número 
        de letras que o usuário digitou corretamente ('contadorCerto') 
        e o comprimento total do texto que estava tentando digitar ('textoAtual.length'). 
    Essa razão é usada para determinar a precisão da digitação do usuário. */
    const porcentagemCerta = contadorCerto / textoAtual.length;

    /* Verifica se a 'porcentagemCerta' é igual ou superior a 80% (0.8). 
        Este valor é um limiar estabelecido para considerar se o usuário passou ou não. */
    if (porcentagemCerta >= 0.8) {

        /* Se a porcentagem certa for maior ou igual a 80%, exibe uma 
            mensagem de alerta parabenizando o usuário por ser aprovado no teste. */
        alert('Parabéns! Você foi aprovado.');

    } else {

        /* Se a porcentagem certa for menor que 80%, exibe uma mensagem de 
            alerta incentivando o usuário a tentar novamente, indicando que não 
            alcançou a precisão necessária. */
        alert('Tente novamente!');

    }

    /* Chama a função 'resetar', que não é mostrada aqui, mas que 
        redefine todas as variáveis e estados necessários para iniciar um novo teste. 
    Isso inclui limpar campos de texto, redefinir contadores e preparar o ambiente 
        para que o usuário possa tentar novamente ou tentar um novo texto. */
    resetar();

}
    

/* Define a função 'resetar', que é responsável por redefinir o 
estado da aplicação ao estado inicial, preparando tudo para um 
novo teste de digitação ou para uma nova tentativa do usuário. */
function resetar() {

    /* Acessa o elemento de entrada de texto com o ID 'entrada' no documento HTML. */
    const elementoEntrada = document.getElementById('entrada');

    /* Limpa qualquer texto que possa estar atualmente no campo de entrada, 
        configurando seu valor para uma string vazia. */
    elementoEntrada.value = '';

    /* Desabilita o campo de entrada para evitar que o usuário comece a 
        digitar antes que o teste seja reiniciado oficialmente. */
    elementoEntrada.disabled = true;

    /* Para e limpa o intervalo de tempo que estava contando o tempo restante, 
        usando a função 'clearInterval' e passando a variável 'intervaloTempo' que 
        mantém a referência do intervalo. */
    clearInterval(intervaloTempo);

    /* Acessa o elemento HTML com o ID 'contadorCerto' e redefine seu conteúdo de 
        texto para '0', zerando o contador de letras corretas. */
    document.getElementById('contadorCerto').textContent = '0';

    /* Acessa o elemento HTML com o ID 'contadorErrado' e redefine seu conteúdo de 
        texto para '0', zerando o contador de letras erradas. */
    document.getElementById('contadorErrado').textContent = '0';

    /* Acessa o elemento HTML com o ID 'contadorTempo' e redefine seu conteúdo de 
        texto para '60', redefinindo o contador de tempo para 60 segundos. */
    document.getElementById('contadorTempo').textContent = '60';

    /* Redefine a variável 'tempoRestante' para 60, preparando a variável para um 
        novo ciclo de contagem quando o teste for reiniciado. */
    tempoRestante = 60;

    /* Zera o contador de letras corretas, preparando-o para a próxima 
        tentativa do usuário. */
    contadorCerto = 0;

    /* Zera o contador de letras erradas, preparando-o para a próxima 
        tentativa do usuário. */
    contadorErrado = 0;

    /* Seleciona todos os elementos 'span' dentro do elemento com o ID 'texto' e 
        remove as classes 'certo' e 'errado' de cada 'span'.
    Essa ação limpa os estilos visuais que indicavam se o usuário havia digitado as 
        letras corretamente ou incorretamente na tentativa anterior. */
    [...document.getElementById('texto').children].forEach(span => {
        span.classList.remove('certo', 'errado');
    });

}


/* Define a função 'mudarNivel', que é responsável por alterar o nível de 
dificuldade do teste de digitação e preparar a interface para um novo teste. */
function mudarNivel(nivel) {

    /* Chama a função 'resetar' para limpar todos os contadores, remover estilos e 
        desabilitar o campo de entrada, garantindo que o ambiente esteja limpo antes 
        de começar um novo nível. */
    resetar();

    /* Atualiza a variável global 'textoAtual' com o texto 
        correspondente ao novo nível escolhido. 
    'nivel - 1' é usado porque os arrays em JavaScript são indexados a 
        partir de 0, enquanto os níveis são provavelmente apresentados começando 
        de 1 para os usuários. */
    textoAtual = textos[nivel - 1];

    /* Acessa o elemento HTML com o ID 'texto', que é onde o texto do teste 
        de digitação é exibido. */
    const elementoTexto = document.getElementById('texto');

    /* Atualiza o conteúdo interno do elemento 'texto'. 'split('')' quebra a 
            string 'textoAtual' em um array de caracteres.
    'map(char => `<span>${char}</span>`)' envolve cada caractere em uma 
            tag <span> para permitir estilização individual mais tarde.
    'join('')' junta todos os elementos do array em uma única string HTML. 
    Isso permite que cada caractere seja estilizado individualmente, por 
            exemplo, para mostrar corretamente quais caracteres foram digitados 
            corretamente ou não. */
    elementoTexto.innerHTML = textoAtual.split('').map(char => `<span>${char}</span>`).join('');

    /* Acessa o campo de entrada de texto novamente e habilita-o, permitindo 
            que o usuário comece a digitar o novo texto. */
    document.getElementById('entrada').disabled = false;

}


/* Adiciona um ouvinte de evento ao elemento de entrada de texto 
com ID 'entrada'. O evento 'input' é acionado sempre que o usuário 
altera o texto no campo de entrada. */
document.getElementById('entrada').addEventListener('input', function() {

    /* Verifica se 'tempoRestante' é igual a 60, o que sugere que o 
        teste está começando. Se verdadeiro, chama a função 'iniciarContadorTempo' 
        para começar a contagem regressiva do tempo. */
    if (tempoRestante === 60) iniciarContadorTempo();

    /* Acessa o valor atual do campo de entrada de texto, que contém o 
        que o usuário digitou até agora. */
    const entradaTexto = this.value;

    /* Verifica se o comprimento do texto digitado é maior que o 
        comprimento do texto do teste atual. 
    Isso pode ocorrer se o usuário continuar digitando além do 
        fim do texto proposto. */
    if (entradaTexto.length > textoAtual.length) {

        /* Se o texto digitado for maior, ele é truncado para corresponder 
            exatamente ao comprimento do texto do teste, evitando 
            entradas excessivas. */
        this.value = entradaTexto.substring(0, textoAtual.length);

        /* Sai prematuramente da função para evitar execuções 
            desnecessárias do código seguinte. */
        return;

    }

    /* Inicializa o contador de caracteres corretos como 0. Este 
        contador será incrementado a cada caractere correto digitado. */
    contadorCerto = 0;

    /* Inicializa o contador de caracteres errados como 0. Este 
        contador será incrementado a cada erro cometido pelo usuário. */
    contadorErrado = 0;

    /* Converte o elemento 'texto' em um array de seus filhos (cada <span> 
        que envolve um caractere do texto) e itera sobre cada um. */
    [...document.getElementById('texto').children].forEach((span, index) => {
        
        /* Verifica se o índice do caractere atual é menor que o 
            comprimento do texto digitado. 
        Isso verifica se o usuário já tentou digitar este 
            caractere específico. */
        if (index < entradaTexto.length) {

            /* Compara o caractere digitado no índice atual com o 
                caractere correspondente no texto. */
            if (entradaTexto[index] === span.textContent) {

                /* Se coincidir, adiciona a classe 'certo' ao <span> para 
                    estilizar o caractere como correto (geralmente verde). */
                span.classList.add('certo');

                /* Remove a classe 'errado', caso tenha sido adicionada anteriormente. */
                span.classList.remove('errado');

                /* Incrementa o contador de caracteres corretos. */
                contadorCerto++;

            } else {

                /* Se não coincidir, adiciona a classe 'errado' ao <span> para 
                    estilizar o caractere como incorreto (geralmente vermelho). */
                span.classList.add('errado');

                /* Remove a classe 'certo', caso tenha sido adicionada anteriormente. */
                span.classList.remove('certo');

                /* Incrementa o contador de caracteres errados. */
                contadorErrado++;

            }
        } else {

            /* Para caracteres que ainda não foram alcançados pelo 
                usuário (ou seja, além do comprimento do texto que foi digitado), 
                remove qualquer classe de 'certo' ou 'errado', resetando o 
                estilo para o padrão. */
            span.classList.remove('certo', 'errado');
            
        }
    });


    /* Acessa o elemento HTML com o ID 'contadorCerto'. Este elemento é 
        usado para exibir o número de caracteres que o usuário digitou corretamente. */
    document.getElementById('contadorCerto').textContent = contadorCerto;

    /* Define o conteúdo de texto do elemento para o valor da variável 'contadorCerto', 
        atualizando assim a interface do usuário para mostrar quantas letras 
        foram digitadas corretamente até o momento. */

    /* Acessa o elemento HTML com o ID 'contadorErrado'. Este elemento é 
        usado para exibir o número de caracteres que o usuário digitou incorretamente. */
    document.getElementById('contadorErrado').textContent = contadorErrado;

    /* Define o conteúdo de texto do elemento para o valor da 
        variável 'contadorErrado', atualizando assim a interface do usuário 
        para mostrar quantas letras foram digitadas incorretamente até o momento. */

    /* Verifica se o comprimento do texto que o usuário 
        digitou ('entradaTexto.length') é igual ao comprimento do texto do 
        teste ('textoAtual.length'). */
    if (entradaTexto.length === textoAtual.length) {

        /* Se os comprimentos são iguais, significa que o usuário 
            terminou de digitar todo o texto do teste. */
        verificarResultado();

        /* Chama a função 'verificarResultado' para avaliar o desempenho 
            do usuário baseado na quantidade de letras corretas e erradas e 
            executar ações adicionais, como mostrar uma mensagem de sucesso ou 
            fracasso e preparar para um novo teste se necessário. */

    }

});