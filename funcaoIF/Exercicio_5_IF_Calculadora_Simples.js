/*
Exercício 5: Calculadora simples

Crie uma calculadora que solicita dois números e uma
 operação matemática (+, -, *, /) ao usuário. Execute a
  operação e exiba o resultado.
*/


// Importa o módulo readline do Node.js. Esse módulo fornece uma interface para leitura de entrada (input) do usuário através do terminal.
// É utilizado para criar aplicações interativas que podem receber dados do usuário digitados no terminal.
const readline = require('readline');

// Utiliza a função 'createInterface' do módulo 'readline' para criar uma nova interface de entrada e saída.
// Essa interface permite interagir com o usuário, solicitando dados e exibindo informações.
// 'input: process.stdin' configura a entrada dos dados para vir do padrão de entrada do sistema, geralmente o teclado.
// 'output: process.stdout' configura para onde as saídas do programa serão enviadas, geralmente o terminal.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Utiliza o método 'question' da interface 'rl' para fazer a primeira pergunta ao usuário, solicitando o primeiro número.
// A string 'Insira o primeiro número: ' é exibida no terminal, e o programa espera pela entrada do usuário.
// Após o usuário inserir um valor e pressionar 'Enter', a resposta é passada como argumento
// para a função callback, aqui representada por '(num1) => {...}'.
rl.question('Insira o primeiro número: ', (num1) => {

    // Dentro da função callback do primeiro 'question', utiliza novamente o método 'question' para solicitar o segundo número ao usuário.
    // A função callback será chamada com a resposta do usuário, que é passada como argumento 'num2'.
    rl.question('Insira o segundo número: ', (num2) => {
        
        // Ainda dentro da função callback do segundo número, faz mais uma pergunta ao usuário, desta vez solicitando
        // que escolha uma operação matemática.
        // A string 'Escolha uma operação (+, -, *, /): ' é exibida, e o programa aguarda a escolha da operação pelo usuário.
        // A resposta do usuário, indicando a operação escolhida, é passada para a próxima função callback.
        rl.question('Escolha uma operação (+, -, *, /): ', (operacao) => {

            let resultado; // Declara uma variável 'resultado' para armazenar o resultado da operação matemática.

            // Converte as respostas 'num1' e 'num2' de strings para números de ponto flutuante.
            // Isso é necessário porque as respostas obtidas através do método 'question' são sempre strings,
            // e para realizar operações matemáticas, precisamos de valores numéricos.
            const numero1 = parseFloat(num1);
            const numero2 = parseFloat(num2);


            /* Após converter as entradas do usuário para números (floats), o próximo passo é realizar a operação matemática escolhida.
            A escolha da operação é feita com base na terceira entrada do usuário, armazenada na variável 'operacao'. */
            
            // Inicia a verificação da operação escolhida utilizando estruturas condicionais 'if' e 'else if'.
            if (operacao === '+') { // Verifica se o usuário escolheu soma, comparando se 'operacao' é igual a '+'.

                // Se a condição for verdadeira (ou seja, operação é soma), soma 'numero1' e 'numero2'.
                resultado = numero1 + numero2;

            } else if (operacao === '-') { // Verifica se o usuário escolheu subtração, comparando se 'operacao' é igual a '-'.

                // Se a condição for verdadeira (ou seja, operação é subtração), subtrai 'numero2' de 'numero1'.
                resultado = numero1 - numero2;

            } else if (operacao === '*') { // Verifica se o usuário escolheu multiplicação, comparando se 'operacao' é igual a '*'.

                // Se a condição for verdadeira (ou seja, operação é multiplicação), multiplica 'numero1' por 'numero2'.
                resultado = numero1 * numero2;

            } else if (operacao === '/') { // Verifica se o usuário escolheu divisão, comparando se 'operacao' é igual a '/'.

                // Antes de realizar a divisão, é importante verificar se o divisor ('numero2') é diferente de zero.
                if (numero2 !== 0) { // Se 'numero2' não é zero, a divisão pode ser realizada.

                    resultado = numero1 / numero2; // Realiza a divisão de 'numero1' por 'numero2'.

                } else {

                    // Se 'numero2' é zero, atribui uma mensagem de erro ao 'resultado', pois divisão por zero não é permitida.
                    resultado = 'Erro: Divisão por zero não é permitida.';

                }

            } else { // Se a entrada do usuário para 'operacao' não for '+', '-', '*' ou '/', considera-se uma operação inválida.

                // Atribui uma mensagem de erro ao 'resultado', indicando que a operação escolhida é inválida.
                resultado = 'Operação inválida.';

            }

            // Após determinar e calcular o resultado (ou atribuir uma mensagem de erro), exibe o resultado no terminal.
            console.log(`Resultado: ${resultado}`);

            // Por fim, após exibir o resultado da operação matemática, chama 'rl.close()' para fechar a interface de readline.
            // Fechar a interface é importante, pois libera o terminal para outras operações e assegura
            // que o programa seja encerrado corretamente.
            rl.close();

        });
    });
});

