// Função para adicionar caracteres ao visor da calculadora.
function adicionarNoVisor(valor) {

    // Primeiro, obtém o elemento do DOM (Documento 
    // Object Model) com o ID 'visor'.
    // 'document.getElementById' é uma função que retorna o 
    // elemento HTML cujo ID é passado como argumento.
    // '.value' acessa o valor atual do elemento de entrada, que
    // neste caso é o visor da calculadora.
    // '+= valor' adiciona o valor passado à função ao final
    // do valor existente no visor.
    // Isso permite que números e operadores sejam adicionados
    // sequencialmente no visor.
    document.getElementById('visor').value += valor;

}

// Função para limpar todo o conteúdo do visor da calculadora.
function limparVisor() {
            
    // Acessa o elemento com o ID 'visor' e define seu
    // valor para uma string vazia '',
    // efetivamente limpando o visor.
    document.getElementById('visor').value = '';

}


// Função para calcular a expressão matemática atual
// no visor da calculadora.
function calcular() {

    // Primeiro, captura a expressão atual do visor.
    var expressao = document.getElementById('visor').value;
    
    // Utiliza a função 'eval' para avaliar a expressão
    // matemática contida na string 'expressao'.
    // 'eval' é uma função poderosa que executa código
    // representado como strings, mas deve ser usada com cuidado
    // devido a questões de segurança se a entrada não for bem controlada.
    var resultado = eval(expressao);

    // Checa se o resultado é um número finito usando 'Number.isFinite'.
    // Isso ajuda a tratar casos como divisões por zero ou
    // outras operações inválidas que não resultam em um número finito.
    if (Number.isFinite(resultado)) {

            // Se o resultado é um número válido, ele é formatado
            // para ter no máximo duas casas decimais usando 'toFixed(2)'.
            // Então, o valor formatado é mostrado no visor.
            document.getElementById('visor').value = resultado.toFixed(2);

    } else {

            // Se o resultado não for um número finito, mostra 'Erro' no visor.
            document.getElementById('visor').value = 'Erro';

    }
    
}


// Adiciona um ouvinte de evento ao documento inteiro para 
// capturar eventos de teclado ('keydown').
document.addEventListener('keydown', function(event) {

    // A função é chamada sempre que uma tecla é pressionada.
    // 'event.key' contém a representação em string da tecla pressionada.
    const tecla = event.key;

    // Checa se a tecla pressionada é um dos caracteres
    // válidos para a calculadora.
    // Isso inclui dígitos de 0 a 9, os operadores
    // matemáticos básicos (+, -, *, /), ponto decimal (.), e
    // teclas especiais como Enter, Backspace e Escape.
    if ((tecla >= '0' && tecla <= '9') || tecla === '.' || tecla === '+' || tecla === '-' || tecla === '*' || tecla === '/' || tecla === 'Enter' || tecla === 'Backspace' || tecla === 'Escape') {
            
            // Se a tecla 'Enter' for pressionada, a função 'calcular()' é
            // chamada para avaliar a expressão no visor da calculadora.
            if (tecla === 'Enter') {

                    calcular();
                    
            }
            // Se a tecla 'Escape' for pressionada, a função 'limparVisor()' é
            // chamada para limpar o visor.
            else if (tecla === 'Escape') {

                    limparVisor();

            }

            // Se a tecla 'Backspace' for pressionada, remove o
            // último caractere do visor.
            else if (tecla === 'Backspace') {

            // Primeiro, obtém o elemento do visor pelo ID 'visor'.
            const visor = document.getElementById('visor');

                    // Então, usa a função 'slice' para remover o último
                    // caractere do valor atual do visor.
                    // 'slice(0, -1)' extrai a parte do string desde o início
                    // até um caractere antes do final, efetivamente removendo
                    // o último caractere.
                    visor.value = visor.value.slice(0, -1);

            }

            // Para qualquer outra tecla válida pressionada (números ou
            // operadores), adiciona a tecla ao visor.
            else {

                    adicionarNoVisor(tecla);

            }

    }
});