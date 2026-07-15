function converterParaRomano() {
    /* Declara a função 'converterParaRomano', que é chamada 
                quando o usuário clica no botão correspondente 
                na interface do usuário. */

    const numeroEntrada = parseInt(document.getElementById('numeroEntrada').value);
    /* - Acessa o elemento HTML com o ID 'numeroEntrada' e 
                obtém o valor inserido pelo usuário.
    - Usa a função 'parseInt' para converter o valor de 
                entrada, que é uma string, em um número inteiro.
    - Armazena esse número inteiro na constante 'numeroEntrada' 
                para uso posterior na função. */

    const resultadoDiv = document.getElementById('numeroSaida');
    /* - Acessa o elemento HTML com o ID 'numeroSaida', que é 
                onde o resultado da conversão será exibido.
    - Armazena uma referência a esse elemento na 
                constante 'resultadoDiv'. */

    if (isNaN(numeroEntrada) || numeroEntrada <= 0) {
        /* - Verifica se o número convertido não é um número 
                    válido (isNaN) ou se é menor ou igual a zero.
        - A função 'isNaN' retorna verdadeiro se o valor não for um 
                    número, o que pode ocorrer se o campo estiver 
                    vazio ou contiver caracteres não numéricos. */

        resultadoDiv.value = "Por favor, insira um número decimal válido e maior que zero.";
        /* - Se o número não for válido ou for menor ou igual a zero, 
                    exibe uma mensagem de erro no elemento 'numeroSaida'.
        - Interrompe a execução da função retornando 
                    prematuramente. */
        return;
    }
    // Continua o processo de conversão se o número for
                // válido e maior que zero.


    const numerosRomanos = [
        { valor: 1000, simbolo: 'M' },
        { valor: 900, simbolo: 'CM' },
        { valor: 500, simbolo: 'D' },
        { valor: 400, simbolo: 'CD' },
        { valor: 100, simbolo: 'C' },
        { valor: 90, simbolo: 'XC' },
        { valor: 50, simbolo: 'L' },
        { valor: 40, simbolo: 'XL' },
        { valor: 10, simbolo: 'X' },
        { valor: 9, simbolo: 'IX' },
        { valor: 5, simbolo: 'V' },
        { valor: 4, simbolo: 'IV' },
        { valor: 1, simbolo: 'I' }
    ];
    /* - Define uma array de objetos 'numerosRomanos' que mapeiam os 
                valores decimais aos seus equivalentes em números romanos.
    - Cada objeto contém um 'valor' decimal e o 'simbolo' romano 
                correspondente, começando do maior para o menor para 
                facilitar a conversão sequencial. */
    
    let numeroRomano = '';
    // Inicializa uma string 'numeroRomano' que acumulará o
                // resultado da conversão do número decimal para romano.
    
    let numero = numeroEntrada;
    // Inicializa uma variável 'numero' que começa com o
                // valor do número de entrada.
    
    numerosRomanos.forEach((item) => {

        while (numero >= item.valor) {
            /* - Itera sobre cada item na array 'numerosRomanos'.
            - Para cada 'item', verifica se o 'numero' atual é 
                        maior ou igual ao 'valor' do item.
            - O laço while continua enquanto a condição for 
                        verdadeira, ou seja, enquanto o número ainda 
                        pode ser representado pelo símbolo romano atual. */

            numeroRomano += item.simbolo;
            // Adiciona o 'simbolo' romano ao resultado 'numeroRomano'.
    
            numero -= item.valor;
            // Subtrai o 'valor' do símbolo romano do 'numero', 
                        // reduzindo-o até que não possa mais ser
                        // representado por esse símbolo.

        }
    });
    
    resultadoDiv.value = numeroRomano;
    /* - Depois de iterar sobre todos os possíveis símbolos 
                romanos, atualiza o valor do elemento 'resultadoDiv' (uma 
                área de texto na interface do usuário) com o resultado 
                acumulado em 'numeroRomano'.
    - Isso exibe o número romano convertido ao usuário. */
    
}

function converterParaDecimal() {
    /* Declara a função 'converterParaDecimal', que é chamada 
                quando o usuário clica no botão correspondente para 
                converter um número romano em um número decimal. */

    const numeroEntrada = document.getElementById('numeroEntrada').value.toUpperCase();
    /* - Acessa o elemento HTML com o ID 'numeroEntrada' e 
                obtém o valor inserido pelo usuário.
    - O método 'toUpperCase()' é aplicado para converter o texto 
                para letras maiúsculas, garantindo que a comparação com os 
                números romanos no dicionário seja consistente, 
                independentemente da forma como o usuário digitou. */

    const resultadoDiv = document.getElementById('numeroSaida');
    /* - Acessa o elemento HTML com o ID 'numeroSaida', que é 
                onde o resultado da conversão será exibido.
    - Armazena uma referência a esse elemento na constante 'resultadoDiv' 
                para atualizações posteriores. */

    const numerosRomanos = {
        'M': 1000,
        'CM': 900,
        'D': 500,
        'CD': 400,
        'C': 100,
        'XC': 90,
        'L': 50,
        'XL': 40,
        'X': 10,
        'IX': 9,
        'V': 5,
        'IV': 4,
        'I': 1
    };
    /*  - Define um objeto 'numerosRomanos' que mapeia símbolos 
                romanos para seus valores decimais equivalentes.
    - Este mapeamento é usado para converter uma string de números 
                romanos em seu valor decimal correspondente. */

    let numeroDecimal = 0;
    /* Inicializa uma variável 'numeroDecimal' para acumular o 
                valor decimal total conforme o número romano é 
                processado. */

    let i = 0;
    /* Inicializa um índice 'i' em 0 para percorrer a 
                string do número romano na entrada. */


    while (i < numeroEntrada.length) {
        /* - Inicia um loop 'while' que continua enquanto 'i', o 
                    índice atual, for menor que o comprimento da 
                    string de entrada do número romano.
        - Isso garante que cada caractere na string de entrada 
                    seja avaliado. */
    
        if (i + 1 < numeroEntrada.length && numerosRomanos[numeroEntrada.substring(i, i + 2)]) {
            /* - Verifica se existe um próximo caractere na 
                        string (i + 1 < numeroEntrada.length) e se os 
                        dois caracteres atuais formam um número romano 
                        válido conhecido (como 'IV', 'IX', etc.), que é 
                        checado no objeto 'numerosRomanos'.
            - 'numeroEntrada.substring(i, i + 2)' extrai dois 
                        caracteres começando do índice 'i'. */
            
            numeroDecimal += numerosRomanos[numeroEntrada.substring(i, i + 2)];
            /* - Adiciona o valor decimal correspondente aos dois 
                        caracteres romanos ao total acumulado 'numeroDecimal'.
            - A operação de adição é feita acessando diretamente o 
                        valor no objeto 'numerosRomanos' usando a 
                        substring como chave. */
            
            i += 2;
            /* - Incrementa o índice 'i' em 2 para mover além dos dois 
                        caracteres que acabaram de ser processados.
            - Isso pula para o próximo caractere não avaliado na entrada. */
            
        } else {

            numeroDecimal += numerosRomanos[numeroEntrada[i]];
            /* - Adiciona o valor decimal correspondente ao 
                        caractere romano atual ao total 
                        acumulado 'numeroDecimal'.
            - A operação de adição usa o caractere no índice 'i' 
                        como chave para acessar o valor correspondente 
                        no objeto 'numerosRomanos'. */
    
            i += 1;
            /* - Incrementa 'i' em 1 para mover para o próximo 
                        caractere na string de entrada.
            - Isso garante que cada caractere seja processado 
                        sequencialmente. */

        }
    }
    

    if (numeroDecimal === 0) {
        /* - Verifica se o valor acumulado em 'numeroDecimal' é 
                    igual a zero após a tentativa de conversão.
        - Um valor de zero pode indicar que a entrada não continha 
                    nenhum número romano válido ou a entrada 
                    estava vazia. */

        resultadoDiv.value = "Por favor, insira um número romano válido.";
        /* - Se 'numeroDecimal' é zero, atualiza o valor do 
                    elemento 'resultadoDiv' com uma mensagem de erro.
        - Isso informa ao usuário que a entrada fornecida não foi 
                    reconhecida como um número romano válido e 
                    solicita a inserção de um número correto. */

    } else {

        resultadoDiv.value = numeroDecimal;
        /* - Caso 'numeroDecimal' não seja zero, atualiza o valor 
                    do elemento 'resultadoDiv' com o número 
                    decimal convertido.
        - Isso exibe o resultado da conversão de romano para 
                    decimal ao usuário, mostrando o valor decimal 
                    equivalente ao número romano que foi inserido. */

    }
    
}


function mostrarDica() {
    /*  Declara a função 'mostrarDica', responsável por 
                exibir o modal de dicas ao usuário.
    Esta função é chamada quando o usuário clica em um 
                botão específico na interface do usuário. */

    document.getElementById('modalDica').style.display = "block";
    /* - Acessa o elemento HTML com o ID 'modalDica', que 
                corresponde ao modal contendo as dicas sobre 
                números romanos.
    - Altera a propriedade de estilo 'display' do modal 
                para "block", o que torna o modal visível na tela.
    - Antes dessa alteração, o modal está oculto (display: none), 
                conforme definido inicialmente no CSS. */

}

function fecharDica() {
    /* Declara a função 'fecharDica', responsável por 
                ocultar o modal de dicas.
    Esta função é chamada quando o usuário clica 
                no ícone de fechar ('×') dentro do modal. */

    document.getElementById('modalDica').style.display = "none";
    /* - Acessa novamente o elemento HTML com o ID 'modalDica'.
    - Altera a propriedade de estilo 'display' do modal 
                para "none", o que oculta o modal da tela.
    - Isso remove o modal de dicas da visualização do usuário, 
                permitindo que eles continuem interagindo com 
                outras partes da interface sem interrupção. */

}


// Fecha o modal se o usuário clicar fora dele
window.onclick = function(event) {
    /*
    Adiciona um ouvinte de eventos ao objeto global 'window'. 
    Este evento 'onclick' é disparado sempre que um clique é 
                feito em qualquer lugar da janela.
    - 'event' é o objeto de evento que contém informações 
                sobre o evento de clique, incluindo qual 
                elemento foi clicado. */

    const modal = document.getElementById('modalDica');
    /* Acessa o elemento modal 'modalDica' que contém as 
                dicas sobre os números romanos. 
    Este elemento é utilizado para verificar se o clique 
                ocorreu dentro ou fora do modal. */

    if (event.target == modal) {
        /* Verifica se o elemento que foi clicado ('event.target') é 
                o mesmo que o modal ('modal'). 
        Se verdadeiro, isso significa que o usuário clicou na 
                área externa do conteúdo do modal, que é geralmente 
                uma área escura ou transparente ao redor do conteúdo. */

        modal.style.display = "none";
        /* Altera a propriedade de estilo 'display' do 
                modal para "none", ocultando o modal.
        Isso permite fechar o modal de dicas quando um clique é 
                registrado fora da área de conteúdo, melhorando a 
                usabilidade ao permitir que os usuários fechem o 
                modal clicando fora dele. */
                
    }
}