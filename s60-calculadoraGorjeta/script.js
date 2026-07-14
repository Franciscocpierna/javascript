function calcularGorjeta() {
    /* Declara a função 'calcularGorjeta'. Esta função é 
            chamada quando o usuário clica no botão "Calcular" 
            na interface da Calculadora de Gorjeta. */

    const valorConta = parseFloat(document.getElementById('valorConta').value);
    /* Acessa o elemento do documento HTML com o ID 'valorConta' 
            para obter o valor da conta inserido pelo usuário.
    O método 'parseFloat' é usado para converter o valor de 
            entrada, que é uma string, em um número de ponto flutuante.
    Este número representa o valor total da conta em reais. */

    const percentualGorjeta = parseFloat(document.getElementById('percentualGorjeta').value);
    /* Similarmente, acessa o elemento com o ID 'percentualGorjeta' 
            para obter o percentual de gorjeta que o usuário 
            deseja aplicar.
    'parseFloat' também é usado aqui para garantir que o 
            valor seja tratado como um número decimal.
    Este valor representa a porcentagem da gorjeta em relação 
            ao valor total da conta. */

    const resultadoDiv = document.getElementById('resultado');
    /* Acessa o elemento do documento HTML com o ID 'resultado'. 
    Este elemento é usado para exibir o resultado do cálculo da gorjeta.
    Armazena uma referência a esse elemento em 'resultadoDiv' para que 
            possamos manipular seu conteúdo mais tarde. */

    if (isNaN(valorConta) || isNaN(percentualGorjeta)) {
        /* Verifica se algum dos valores numéricos obtidos ('valorConta' ou 
                'percentualGorjeta') não é um número válido.
        A função 'isNaN' (is Not a Number) retorna 'true' se o 
                valor não for um número, o que pode ocorrer se o 
                campo de entrada estiver vazio ou contiver 
                caracteres não numéricos. */

        resultadoDiv.innerHTML = "Por favor, insira valores válidos.";
        /* Se qualquer valor não for válido, o conteúdo do 
                elemento 'resultadoDiv' é atualizado para mostrar 
                uma mensagem solicitando que o usuário insira 
                valores válidos. */
        return;
        /* Encerra a execução da função prematuramente se um 
                dos valores não for um número válido, impedindo 
                que o cálculo prossiga com dados incorretos. */

    }
    
    // Continuação do código para realizar o cálculo será
                // implementada após este bloco.


    // Cálculo do valor da gorjeta com base no percentual fornecido.
    const valorGorjeta = (valorConta * percentualGorjeta) / 100;
    /* Calcula o valor da gorjeta multiplicando o 'valorConta' 
                pelo 'percentualGorjeta' e dividindo o resultado por 100.
    Isso converte o percentual em um decimal e calcula a parte do 
                valor da conta que corresponde à gorjeta.
    Por exemplo, se a conta é R$ 100 e a gorjeta é 10%, o valor da 
                gorjeta será R$ 10 (100 * 10 / 100). */

    // Cálculo do valor total a ser pago somando o valor original da
                // conta com o valor da gorjeta calculada.
    const valorTotal = valorConta + valorGorjeta;
    /* Soma o 'valorConta' original com o 'valorGorjeta' para 
                obter o 'valorTotal' que o cliente deve pagar.
    Isso inclui tanto o custo original da refeição quanto a gorjeta. */

    // Atualização do conteúdo do elemento 'resultadoDiv'
                // para mostrar os resultados do cálculo.
    resultadoDiv.innerHTML = `
        <p>Valor da Gorjeta: R$ ${valorGorjeta.toFixed(2)}</p>
        <p>Valor Total a Pagar: R$ ${valorTotal.toFixed(2)}</p>
    `;
    /* Atualiza o HTML dentro do elemento 'resultadoDiv' usando 
                template strings para incluir valores dinâmicos.
    - `${valorGorjeta.toFixed(2)}`: Converte 'valorGorjeta' para 
                uma string formatada com duas casas decimais, 
                garantindo que o valor monetário seja exibido 
                de forma precisa e formatada.
    - `${valorTotal.toFixed(2)}`: Similarmente, formata 'valorTotal' 
                para duas casas decimais.
    Os resultados são exibidos em duas linhas de parágrafo dentro do 
                elemento 'resultadoDiv', mostrando claramente o valor 
                da gorjeta e o total a pagar. */

}