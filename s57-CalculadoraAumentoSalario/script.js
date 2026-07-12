function calcularAumento() {
    /* Declaração da função calcularAumento. Esta função 
               será chamada quando o usuário clicar no 
               botão 'Calcular'. */

    const salarioAntigo = parseFloat(document.getElementById('salarioAntigo').value);
    /* - `document.getElementById('salarioAntigo')` acessa o 
               elemento HTML que possui o ID 'salarioAntigo', 
               que é o campo onde o usuário insere o salário antigo.
       - `.value` obtém o valor desse campo de entrada como uma string.
       - `parseFloat()` converte essa string em um número de ponto 
               flutuante. Assim, `salarioAntigo` agora contém o 
               valor numérico do salário antigo. */

    const salarioNovo = parseFloat(document.getElementById('salarioNovo').value);
    /* - Similarmente, `document.getElementById('salarioNovo')` 
               acessa o elemento HTML do salário novo.
       - `.value` extrai o valor do campo, e `parseFloat()` o 
               converte de string para um número de ponto flutuante.
       - `salarioNovo` armazena o valor numérico do salário novo 
               inserido pelo usuário. */

    const resultadoDiv = document.getElementById('resultado');
    /* - `document.getElementById('resultado')` busca o 
               elemento HTML com o ID 'resultado', que é a div 
               onde o resultado do cálculo será exibido.
       - `resultadoDiv` é uma referência a esse elemento DOM, 
               permitindo manipulações futuras para exibir 
               os resultados. */


       if (isNaN(salarioAntigo) || isNaN(salarioNovo)) {
        /* A condição `isNaN` verifica se as variáveis 'salarioAntigo' 
                  ou 'salarioNovo' não são números.
           Isso pode ocorrer se o campo de entrada estiver 
                  vazio ou contiver caracteres não numéricos. */
        resultadoDiv.innerHTML = "Por favor, insira valores válidos.";
        /*  Se qualquer uma das condições for verdadeira, altera o 
                  HTML interno da div 'resultado' para mostrar 
                  uma mensagem de erro, pedindo ao usuário para 
                  inserir valores válidos. */
        return;
        /* Encerra a execução da função prematuramente se 
                  um erro de validação for encontrado,
                  evitando que o restante do código seja executado. */

    }
    
    const valorAumento = salarioNovo - salarioAntigo;
    /* Calcula o valor do aumento subtraindo o 'salarioAntigo' 
                  do 'salarioNovo'.
       O resultado é armazenado na variável 'valorAumento'. */
    
    const percentualAumento = (valorAumento / salarioAntigo) * 100;
    /* Calcula o percentual de aumento dividindo o 'valorAumento' 
                  pelo 'salarioAntigo' e multiplicando por 100.
       Isso transforma a razão em uma porcentagem, armazenada 
                  em 'percentualAumento'. */
    
    resultadoDiv.innerHTML = `
        <p>Valor do Aumento: R$ ${valorAumento.toFixed(2)}</p>
        <p>Percentual do Aumento: ${percentualAumento.toFixed(2)}%</p>
    `;
    /* Atualiza o HTML interno da div 'resultado' com o valor 
                  do aumento e o percentual de aumento, ambos 
                  formatados para duas casas decimais.
       - `${valorAumento.toFixed(2)}` formata 'valorAumento' para 
                  duas casas decimais, garantindo que o valor do 
                  dinheiro seja apresentado de forma limpa.
       - `${percentualAumento.toFixed(2)}%` formata 'percentualAumento' 
                  para duas casas decimais e adiciona um símbolo de 
                  percentagem ao final, mostrando claramente a 
                  porcentagem de aumento. */
    
}