/*
Exercício 2: Avaliação de desempenho

Crie um programa que pede ao usuário para inserir
uma nota de 0 a 100. Utilize um switch para determinar a
classificação correspondente com base na nota (por exemplo, 
    A para notas acima de 90, 
    B para notas entre 80 e 89, etc.) e exiba a classificação na tela.
*/



// Importa o módulo 'readline' do Node.js, que fornece uma interface para ler dados de entrada (input) do terminal.
// Este módulo é essencial para criar programas interativos que podem interagir com o usuário através do terminal.
const readline = require('readline');

// Cria uma interface de readline, configurando 'process.stdin' como a entrada (de onde os dados serão lidos, geralmente o teclado)
// e 'process.stdout' como a saída (para onde os dados serão escritos, geralmente o terminal).
// Isso permite que o programa faça perguntas e exiba respostas no terminal.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Utiliza o método 'question' para fazer uma pergunta ao usuário, solicitando que insira uma nota entre 0 e 100.
// Quando o usuário responde e pressiona 'Enter', a função callback é chamada com a resposta do usuário como argumento 'nota'.
rl.question('Insira uma nota de 0 a 100: ', (nota) => {

    // Converte a string recebida na entrada do usuário para um número inteiro usando 'parseInt'.
    // Isso é necessário porque a entrada do usuário é tratada como texto, e precisamos de um valor numérico para realizar operações matemáticas.
    const notaNumerica = parseInt(nota);
    let resultado; // Declara uma variável 'resultado' para armazenar a classificação da nota.

    // Divide a nota por 10 e utiliza 'Math.floor' para arredondar o resultado para baixo.
    // Isso agrupa as notas em categorias de 10 pontos (0-9, 10-19, ..., 90-100) para simplificar a classificação.
    const categoria = Math.floor(notaNumerica / 10);

    // Utiliza uma estrutura 'switch' para determinar a classificação com base na 'categoria' calculada.
    // Cada 'case' representa um intervalo de notas e atribui uma letra correspondente à variável 'resultado'.
    switch (categoria) {

        case 10: // Notas de 100 entram nesta categoria
        case 9:  // Notas de 90 a 99 entram nesta categoria

            resultado = 'A'; // Classificação A para notas de 90 a 100
            break;

        case 8:  // Notas de 80 a 89 entram nesta categoria

            resultado = 'B'; // Classificação B para notas de 80 a 89
            break;

        case 7:  // Notas de 70 a 79 entram nesta categoria

            resultado = 'C'; // Classificação C para notas de 70 a 79
            break;

        case 6:  // Notas de 60 a 69 entram nesta categoria

            resultado = 'D'; // Classificação D para notas de 60 a 69
            break;

        default: // Qualquer nota abaixo de 60 entra nesta categoria

            resultado = 'F'; // Classificação F para notas abaixo de 60
            break;
            
    }

    // Exibe a classificação da nota no terminal, utilizando a variável 'resultado'.
    console.log(`Classificação: ${resultado}`);

    // Fecha a interface de readline, encerrando o programa.
    // Isso é necessário para liberar o terminal após o programa terminar de executar.
    rl.close();

});