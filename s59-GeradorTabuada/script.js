function gerarTabuada() {
    /* Definição da função gerarTabuada, que é chamada 
            quando o usuário clica no botão 'Gerar Tabuada' no HTML. */

    const numero = parseFloat(document.getElementById('numero').value);
    /* A função document.getElementById('numero') busca no 
               documento HTML um elemento com o id 'numero'.
       O atributo .value obtém o valor atual do input desse elemento.
       A função parseFloat tenta converter esse valor em 
               string para um número de ponto flutuante.
       O resultado é armazenado na constante 'numero'.
       Isso permite que o script processe o valor numérico 
               inserido pelo usuário. */

    const resultado = document.getElementById('resultado');
    /* Busca no documento HTML um elemento com o id 'resultado' e 
               armazena uma referência a esse elemento na 
               constante 'resultado'.
       Esse elemento será usado para exibir a tabuada gerada. */

    resultado.innerHTML = '';
    /* Limpa qualquer conteúdo anterior dentro do 
               elemento 'resultado'.
       O atributo .innerHTML refere-se ao conteúdo HTML 
               interno do elemento.
       Atribuir uma string vazia ('') remove todo o conteúdo 
               existente, preparando o elemento para receber 
               novos dados.
       Isso é útil para garantir que resultados antigos não se 
               misturem com os novos ao gerar uma nova tabuada. */

       if (isNaN(numero)) {
        /* Verifica se o valor contido na variável 'numero' NÃO é um número.
           A função isNaN() é usada para determinar se um valor é NaN (Not a Number).
           Se o valor for NaN, o bloco de código dentro do if será executado. */
    
        resultado.innerHTML = '<p>Por favor, insira um número válido.</p>';
        /* Atualiza o conteúdo interno do elemento HTML 
                  identificado por 'resultado'.
           A string '<p>Por favor, insira um número válido.</p>' é 
                  definida como o novo conteúdo HTML,
           que é exibido ao usuário indicando que o valor 
                  inserido não é um número válido. */
    
        return;
        /* Encerra a execução da função gerarTabuada().
           Isso impede que o código subsequente seja executado 
                  caso 'numero' não seja um valor numérico válido. */

    }
    
    for (let i = 1; i <= 10; i++) {
        /* Inicia um loop que iterará 10 vezes, de i = 1 até i = 10.
           Esse loop é usado para gerar a tabuada do número 
                     fornecido pelo usuário. */
    
        const multiplicacao = numero * i;
        /* Calcula o produto do 'numero' inserido pelo 
                     usuário e o valor corrente de 'i' no loop.
           O resultado dessa multiplicação é armazenado na 
                     constante 'multiplicacao'. */
    
        const paragrafo = document.createElement('p');
        /* Cria um novo elemento <p> (parágrafo) no documento HTML.
           Esse parágrafo será usado para exibir uma linha da tabuada. */
    
        paragrafo.textContent = `${numero} x ${i} = ${multiplicacao}`;
        /* Define o conteúdo de texto do elemento <p> criado.
           O texto é uma string formatada que mostra a operação 
                     realizada (ex: '5 x 1 = 5'),
           utilizando template literals para inserir os valores 
                     das variáveis 'numero', 'i' e 'multiplicacao'. */
    
        resultado.appendChild(paragrafo);
        /* Adiciona o elemento <p> como um filho do elemento 'resultado'.
           Isso insere o parágrafo na página web, dentro do elemento 'resultado', 
           fazendo com que a linha da tabuada seja visível para o usuário. */

    }
    
}