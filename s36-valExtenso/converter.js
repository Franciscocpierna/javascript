// Declaração da função principal que converte um número inteiro em texto por extenso.
function numeroPorExtenso(numero) {

    // Arrays com as palavras correspondentes para cada dígito, dezena, centena, etc.
    const unidades = ["zero", "Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove"];
    const dezenas = ["", "Dez", "Vinte", "Trinta", "Quarenta", "Cinquenta", "Sessenta", "Setenta", "Oitenta", "Noventa"];
    const especiais = ["Onze", "Doze", "Treze", "Quatorze", "Quinze", "Dezesseis", "Dezessete", "Dezoito", "Dezenove"];
    const centenas = ["", "Cento", "Duzentos", "Trezentos", "Quatrocentos", "Quinhentos", "Seiscentos", "Setecentos", "Oitocentos", "Novecentos"];
    const classes = [["", ""], [" Mil", " Mil"], [" Milhão", " Milhões"], [" Bilhão", " Bilhões"], [" Trilhão", " Trilhões"]];

    // Subfunção que lida com a conversão de cada parte do número,
    // dependendo da sua grandeza.
    function converterParte(num) {

        // Se o número tem apenas um dígito.
        if (num < 10) return unidades[num];

        // Caso especial para o número 10.
        if (num === 10) return "Dez";

        // Se o número está entre 11 e 19, usa-se o array de
        // números 'especiais'.
        if (num < 20) return especiais[num - 11];

        // Se o número é uma dezena ou uma combinação de dezenas com unidades.
        if (num < 100) {

            // Obtém a dezena do número.
            let dec = Math.floor(num / 10);  // Math.floor(num / 10) divide o número por 10 e arredonda para baixo,
                                            // resultando no número de dezenas completas no número original.
                                            // Por exemplo, 87 dividido por 10 é 8.7, que arredondado para baixo dá 8.

            // Obtém a unidade do número.
            let uni = num % 10;              // num % 10 retorna o resto da divisão do número por 10,
                                            // o que equivale à parte das unidades do número.
                                            // Por exemplo, o resto de 87 dividido por 10 é 7.

            // Combina a dezena e a unidade com a conjunção "e", se necessário.
            // Verifica se há unidades para adicionar ao texto.
            return dezenas[dec] + (uni ? " e " + unidades[uni] : "");

            // dezenas[dec] acessa o array de dezenas para obter a palavra 
            // correspondente ao número de dezenas.
            // Se 'uni' não for zero, adiciona " e " seguido pela palavra 
            // para a unidade correspondente.
            // Se 'uni' for zero, apenas retorna a palavra da dezena.

        }


        // Se o número é uma centena ou uma combinação de centenas com dezenas ou unidades.
        let cen = Math.floor(num / 100);  // Math.floor(num / 100) divide o número por 100 e arredonda para baixo,
                                        // resultando no número de centenas completas no número original.
                                        // Por exemplo, 456 dividido por 100 é 4.56, que arredondado para baixo dá 4.

        let resto = num % 100;          // num % 100 retorna o resto da divisão do número por 100,
                                        // o que equivale à parte que consiste em dezenas e unidades.
                                        // Por exemplo, o resto de 456 dividido por 100 é 56.

        // Combina a centena com o resto do número, usando a conjunção "e", se necessário.
        return (cen === 1 && resto === 0 ? "Cem" : centenas[cen]) + (resto ? " e " + converterParte(resto) : "");

        // A expressão (cen === 1 && resto === 0 ? "Cem" : centenas[cen]) 
        // verifica se o número de centenas é 1 e não há resto.
        // Se verdadeiro, retorna "Cem" (a forma correta de escrever 100 em
        // português, sem a forma plural "Cento").
        // Caso contrário, acessa o array de centenas para obter a palavra
        // correspondente ao número de centenas.
        // Se 'resto' não for zero, adiciona " e " seguido pelo resultado
        // da função converterParte aplicada ao resto.
        // Isso permite decompor corretamente o resto em dezenas e unidades, se necessário.

    }

    // A função principal retorna o resultado final convertendo o
    // número absoluto (ignora sinais negativos).
    return formatarNumero(Math.abs(numero));


    // Define a função que formata números inteiros grandes em texto por extenso.
    // Esta função é responsável por converter um número inteiro dado (num) em sua
    // representação por extenso em palavras, segmentando o
    // número em grupos de até três dígitos.
    function formatarNumero(num) {

        // Verifica inicialmente se o número fornecido é zero.
        // Se for zero, a função retorna imediatamente a
        // string "Zero", pois não há necessidade
        // de processar mais nada; zero é diretamente
        // representado pela palavra "Zero".
        if (num === 0) return "Zero";

        // Inicializa um índice para acompanhar a "classe" do número.
        // Classes referem-se a unidades, milhares, milhões, etc.
        // O índice é usado para determinar o sufixo apropriado
        // (mil, milhão, bilhão, etc.) para cada grupo de três dígitos.
        let indice = 0;

        // Cria um array vazio chamado 'partes'.
        // Este array armazenará cada segmento do
        // número já convertido em palavras.
        // Por exemplo, 123456 se tornaria ["cento e vinte e
        // três mil", "quatrocentos e cinquenta e seis"]
        // antes de ser combinado.
        let partes = [];

        // Executa um loop enquanto ainda houver um número para processar.
        // O loop continua até que todo o número seja
        // decomposto em segmentos de três dígitos.
        while (num > 0) {

            // Calcula o pedaço do número tomando o resto da divisão por 1000.
            // Isso isola os três últimos dígitos do número,
            // permitindo processá-los separadamente.
            let pedaco = num % 1000;

            // Usa a função 'converterParte' para converter o
            // segmento atual do número em texto.
            // 'converterParte' lida com números até 999,
            // transformando-os em sua representação por extenso.
            let prefixo = converterParte(pedaco);

            // Verifica se o pedaço atual é maior que zero para processar.
            // Isso é necessário para evitar a adição de sufixos
            // desnecessários a segmentos que são zero,
            // o que poderia levar a representações
            // incorretas como "mil zero".
            if (pedaco > 0) {

                // Seleciona o sufixo apropriado da lista de classes
                // com base no índice atual e no valor do pedaço.
                // O sufixo é escolhido entre a forma singular ou
                // plural dependendo do valor do segmento (pedaço > 1).
                let sufixo = classes[indice][pedaco > 1 ? 1 : 0];

                // Adiciona o sufixo selecionado ao texto
                // convertido (prefixo).
                prefixo += sufixo;

                // Verifica se o texto convertido (com o sufixo
                // adicionado) não está vazio após remover espaços.
                // Isso é útil para evitar a adição de strings
                // vazias ao array 'partes'.
                if (prefixo.trim() !== "") {

                    // Adiciona o prefixo ao início do array de partes.
                    // 'unshift' é usado para inserir cada novo
                    // segmento convertido na frente do array,
                    // garantindo que os segmentos sejam armazenados
                    // na ordem correta (milhares antes de unidades, etc.).
                    partes.unshift(prefixo);

                }
            }

            // Divide o número original por 1000, descartando os
            // três últimos dígitos já processados.
            // Isso reduz o número para os próximos três dígitos a
            // serem convertidos no próximo ciclo do loop.
            num = Math.floor(num / 1000);

            // Incrementa o índice para mover para a próxima classe
            // numérica (de milhares para milhões, por exemplo).
            indice++;

        }

        // Junta todas as partes convertidas em uma string final.
        // 'join' é usado com " e " como separador, combinando todos
        // os segmentos em uma representação contínua do número.
        // A expressão regular no 'replace' remove espaços extras,
        // garantindo uma formatação limpa do texto final.
        return partes.length > 0 ? partes.join(" e ").replace(/\s+/g, ' ').trim() : "Zero";
        
    }

    return formatarNumero(Math.abs(numero));

}

// Define a função que irá converter o valor numérico de um input
// para sua representação por extenso em reais e centavos.
function converterParaExtenso() {

    // Extrai o número do campo de input, convertendo-o de string para float.
    let numero = parseFloat(document.getElementById('numeroInput').value);

    // Utiliza Math.floor para arredondar o número para baixo e
    // obter a parte inteira dos reais.
    let reais = Math.floor(numero);

    // Calcula os centavos subtraindo os reais do número original e
    // multiplicando por 100, depois arredondando com Math.round.
    let centavos = Math.round((numero - reais) * 100);

    // Converte a parte dos reais para texto por extenso, usando a função 'numeroPorExtenso'.
    // Adiciona a palavra 'Real' ou 'Reais' dependendo da quantidade.
    let extensoReais = numeroPorExtenso(reais) + (reais === 1 ? ' Real' : ' Reais');

    // Converte os centavos para texto por extenso, se houver algum centavo.
    // Adiciona a palavra 'Centavo' ou 'Centavos' dependendo da quantidade.
    let extensoCentavos = centavos > 0 ? numeroPorExtenso(centavos) + (centavos === 1 ? ' Centavo' : ' Centavos') : '';

    // Inicia a formação do resultado final, começando com o valor por extenso dos reais.
    let resultado = extensoReais;

    // Se existirem centavos, adiciona à string de resultado, precedendo com ' e '.
    if (extensoCentavos) resultado += ' e ' + extensoCentavos;

    // Atualiza o conteúdo do elemento HTML com id 'resultado' com o valor por extenso,
    // garantindo que a primeira letra esteja em maiúscula.
    document.getElementById('resultado').textContent = resultado.charAt(0).toUpperCase() + resultado.slice(1);

}


// Adiciona um ouvinte de evento ao documento que escuta pelo evento 'DOMContentLoaded'.
document.addEventListener('DOMContentLoaded', function() {

    // Este evento é disparado quando todo o conteúdo HTML foi completamente carregado,
    // incluindo todos os scripts dependentes, estilos, e imagens.
    
    // Obtém o elemento com o id 'numeroInput' e adiciona um
    // ouvinte de evento de 'keypress' a ele.
    document.getElementById('numeroInput').addEventListener('keypress', function(e) {
        
        // 'keypress' é um evento que é acionado toda vez que uma tecla é
        // pressionada no elemento especificado.

        // Verifica se a tecla pressionada foi a tecla 'Enter'.
        if (e.key === 'Enter') {

            // Se a tecla 'Enter' foi pressionada, executa o seguinte código:
            
            // 'e.preventDefault()' impede a ação padrão que pertence a essa tecla.
            // Para a tecla 'Enter' em um formulário, a ação padrão é submeter o formulário.
            // Impedindo isso, evita-se que a página seja recarregada.
            e.preventDefault();

            // Chama a função 'converterParaExtenso', que é definida em outro lugar no código.
            // Esta função é responsável por ler o valor do input,
            // converter esse valor para extenso,
            // e mostrar o resultado na página.
            converterParaExtenso();
            
        }
    });
});
