/*
6: Verificação de número positivo, negativo ou zero

Peça ao usuário para inserir um número e determine se é 
positivo, negativo ou zero. Exiba o resultado correspondente.
*/



// Primeiro, o módulo 'readline' é importado utilizando 'require'.
// O módulo 'readline' permite a criação de uma interface interativa de linha de comando (CLI),
// habilitando a leitura de entradas do usuário através do terminal.
const readline = require('readline');

// Em seguida, a interface de 'readline' é criada utilizando o método 'createInterface'.
// Essa interface configura 'process.stdin' como a fonte de entrada (input), permitindo que o usuário digite informações,
// e 'process.stdout' como destino de saída (output), exibindo informações para o usuário no terminal.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Utiliza o método 'question' para exibir uma mensagem no terminal solicitando que o usuário insira um número.
// A mensagem é exibida, e o programa aguarda que o usuário digite uma resposta e pressione 'Enter'.
// A função callback é chamada assim que uma entrada é recebida, com a entrada do usuário passada como argumento 'numero'.
rl.question('Por favor, insira um número: ', (numero) => {

    // A string recebida na entrada do usuário é convertida para um número de ponto flutuante.
    // Isso é feito para garantir que operações matemáticas possam ser realizadas com o valor.
    const num = parseFloat(numero);

    // Uma estrutura condicional 'if' é utilizada para determinar se o número convertido é positivo, negativo ou zero.
    // Primeiro, verifica se 'num' é maior que 0, o que indicaria que é um número positivo.
    if (num > 0) {

        // Se o número é maior que 0, uma mensagem informando que o número é positivo é exibida no terminal.
        console.log('O número é positivo.');

    // Se o primeiro 'if' for falso, um 'else if' verifica se o número é menor que 0, o que indicaria um número negativo.
    } else if (num < 0) {

        // Se o número é menor que 0, uma mensagem informando que o número é negativo é exibida.
        console.log('O número é negativo.');

    // Se nem o 'if' nem o 'else if' forem verdadeiros, significa que o número não é nem positivo nem negativo, então é zero.
    } else {

        // Uma mensagem informando que o número é zero é exibida no terminal.
        console.log('O número é zero.');
    
    }

    // Por fim, a interface de 'readline' é fechada utilizando o método 'close'.
    // Fechar a interface é necessário para terminar o programa, evitando que o terminal fique aguardando mais entradas.
    rl.close();

});
