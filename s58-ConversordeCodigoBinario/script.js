function converterParaBinario() {
    /* Declaração da função 'converterParaBinario', que 
            não recebe nenhum parâmetro e é chamada quando necessário. */

    const textoEntrada = document.getElementById('textoEntrada').value;
    /* Busca o elemento HTML com o ID 'textoEntrada' e obtém o 
               valor atual (o texto digitado pelo usuário).
       Este valor é armazenado na constante 'textoEntrada'. */

    let resultadoBinario = '';
    /* Declara uma variável 'resultadoBinario' inicializada 
               como uma string vazia.
       Esta variável acumulará o resultado final da conversão 
               de cada caractere de texto para binário. */

    for (let i = 0; i < textoEntrada.length; i++) {
        /* Um laço 'for' que itera sobre cada caractere da 
               string 'textoEntrada'.
           'i' é o índice do caractere atual na string, começando 
                  de 0 até o comprimento da string menos um. */

        const binario = textoEntrada.charCodeAt(i).toString(2).padStart(8, '0');
        /* - 'textoEntrada.charCodeAt(i)' obtém o código ASCII 
                  do caractere no índice 'i'.
           - '.toString(2)' converte esse código numérico para 
                  sua representação binária (base 2).
           - '.padStart(8, '0')' garante que a string binária 
                  tenha pelo menos 8 dígitos, preenchendo com 
                  zeros à esquerda se necessário.
           Essa operação é armazenada na constante 'binario'. */

        resultadoBinario += binario + ' ';
        /* Concatena o binário obtido ao 'resultadoBinario' 
                  atual e adiciona um espaço após cada binário 
                  para separá-los. */

    }


    document.getElementById('textoSaida').value = resultadoBinario.trim();
    /* Busca o elemento HTML com o ID 'textoSaida' e 
               define seu valor para 'resultadoBinario'.
       '.trim()' é usado para remover qualquer espaço extra 
               no final da string antes de definir o valor.
       Isso atualiza o campo de saída na página com a 
               string de binário convertida. */

}


function converterParaTexto() {
    /* Declaração da função 'converterParaTexto', que é 
               chamada quando necessário para converter 
               strings binárias em texto legível. */

    const textoEntrada = document.getElementById('textoEntrada').value;
    /* Acessa o elemento HTML com o ID 'textoEntrada' e 
               obtém o valor atual (o texto digitado pelo 
               usuário ou o código binário).
       Este valor é armazenado na constante 'textoEntrada'. */

    const arrayBinario = textoEntrada.split(' ');
    /* Divide a string 'textoEntrada' em um array de strings 
               usando espaços como delimitador.
       Isso é usado para separar cada código binário individual 
               na entrada, assumindo que cada parte binária 
               está separada por um espaço.
       O resultado é armazenado na constante 'arrayBinario'. */

    let resultadoTexto = '';
    /* Declara uma variável 'resultadoTexto' inicializada 
               como uma string vazia.
       Esta variável acumulará o resultado final da conversão de 
               cada código binário de volta para texto. */

    for (let i = 0; i < arrayBinario.length; i++) {
        /* Um laço 'for' que itera sobre cada elemento do 
               array 'arrayBinario'.
           'i' é o índice do elemento atual no array, 
               começando de 0 até o número de elementos 
               no array menos um. */

        const decimal = parseInt(arrayBinario[i], 2);
        /* Converte o código binário no índice 'i' 
                  de 'arrayBinario' para um número decimal.
           O segundo parâmetro '2' indica que a string deve 
                  ser interpretada como um número binário.
           O resultado da conversão é armazenado na 
                  constante 'decimal'. */

        resultadoTexto += String.fromCharCode(decimal);
        /* Converte o número decimal para o caractere ASCII 
                  correspondente.
           'String.fromCharCode(decimal)' retorna o caractere 
                  correspondente ao código ASCII 'decimal'.
           Concatena este caractere ao 'resultadoTexto' atual. */

    }

    document.getElementById('textoSaida').value = resultadoTexto;
    /*  Acessa o elemento HTML com o ID 'textoSaida' e define 
               seu valor para 'resultadoTexto'.
       Isso atualiza o campo de saída na página com o texto 
               convertido de binário. */

}

function mostrarExplicacao() {
    /* Declaração da função 'mostrarExplicacao', que é 
            chamada quando o usuário deseja ver a explicação de 
            como a conversão de texto para binário e 
            vice-versa é realizada. */

    document.getElementById('modalExplicacao').style.display = "block";
    /*  Acessa o elemento HTML com o ID 'modalExplicacao', 
            que é o modal de explicação.
       Define a propriedade de estilo 'display' desse 
            modal para "block", tornando-o visível na página.
       Quando o modal é definido como "block", ele passa a ocupar 
            espaço na tela e se torna visível para o usuário. */
            
}

function fecharExplicacao() {
    /* Declaração da função 'fecharExplicacao', que é 
            chamada quando o usuário deseja fechar o modal 
            de explicação. */

    document.getElementById('modalExplicacao').style.display = "none";
    /* Acessa novamente o elemento HTML com o ID 'modalExplicacao'.
       Define a propriedade de estilo 'display' do modal 
               para "none", ocultando-o da página.
       Quando o modal é definido como "none", ele não é 
               visível e não ocupa espaço na tela, efetivamente 
               fechando ou escondendo o modal. */

}


// Fecha o modal se o usuário clicar fora dele
window.onclick = function(event) {

    /* Define uma função anônima que será executada sempre que o 
               usuário clicar em qualquer lugar da janela (window).
       'event' é um objeto que representa o evento de clique, 
               contendo informações sobre o que foi clicado. */
    const modal = document.getElementById('modalExplicacao');

    /* Acessa o elemento HTML com o ID 'modalExplicacao' e 
               armazena uma referência a ele na constante 'modal'.
       Isso permite manipular o modal dentro da função. */
    if (event.target == modal) {

        /* Verifica se o alvo do clique ('event.target') é 
                  exatamente o modal.
           'event.target' refere-se ao elemento que foi clicado.
           Se o usuário clicou diretamente no modal (não no 
                  conteúdo dentro do modal), esta condição 
                  será verdadeira. */
        modal.style.display = "none";

        /* Define a propriedade de estilo 'display' do 
                  modal para "none", ocultando-o.
           Isso efetivamente fecha o modal se o usuário 
                  clicar fora do conteúdo interno do modal. */

    }
    
}