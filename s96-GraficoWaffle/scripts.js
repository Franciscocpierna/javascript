/* Este ouvinte de evento é acionado quando todo o 
            conteúdo da página (incluindo scripts, imagens, CSS, etc.) 
            foi completamente carregado. Ele chama a função 'filtrarPorProduto()' 
            para inicializar a visualização do gráfico 
            com os dados do primeiro produto selecionado, garantindo 
            que o gráfico seja exibido assim que a página estiver pronta. */

document.addEventListener("DOMContentLoaded", function() {
    filtrarPorProduto(); // Inicializar com o primeiro produto selecionado
});

function filtrarPorProduto() {

    var select = document.getElementById('selecionarProduto');
    /* Obtém o elemento de seleção do documento pelo seu ID 
               'selecionarProduto'. Este elemento permite 
               ao usuário escolher um produto para visualizar 
               suas vendas no gráfico. */

    var produto = select.value;
    /* Acessa o valor atual do elemento de seleção, que 
               corresponde ao produto selecionado pelo usuário. */

    var tabela = document.getElementById('tabelaVendas');
    /* Obtém a tabela de vendas pelo seu ID 'tabelaVendas'. 
               Esta tabela contém os dados de vendas de cada produto. */

    var vendas = 0;
    var meta = 100;
    /* Inicializa uma variável 'vendas' para armazenar o 
               número de vendas do produto selecionado.
       Define a 'meta' de vendas como 100, que é um valor 
               estático usado para calcular o percentual de desempenho. */

    for (var i = 1, linha; linha = tabela.rows[i]; i++) {
        /* Loop que percorre cada linha da tabela de vendas, 
                  começando da segunda linha (índice 1) porque
                  a primeira linha é o cabeçalho da tabela. */

        if (linha.cells[0].innerText === produto) {
            /* Verifica se o nome do produto na primeira célula (cells[0]) 
                     da linha atual é igual ao produto selecionado. */

            vendas = parseInt(linha.cells[1].innerText);
            /* Se for, converte o conteúdo da segunda célula (cells[1]), 
                        que contém o número de vendas, de texto para um número 
                        inteiro e o atribui à variável 'vendas'. */

            break;
            /* Sai do loop assim que o produto correspondente é encontrado, 
                        evitando verificações desnecessárias nas linhas restantes. */

        }
    }

    var desempenho = (vendas / meta) * 100;
    /* Calcula o desempenho do produto como um percentual das 
               vendas em relação à meta estabelecida. */

    desenharGraficoWaffle(desempenho);
    /* Chama a função 'desenharGraficoWaffle()' com o percentual 
               de desempenho calculado, que atualiza o gráfico de waffle
               para refletir visualmente o desempenho do produto selecionado. */

}


function desenharGraficoWaffle(valor) {
    
    var grade = document.querySelector('.grafico-waffle .grade');
    /* Acessa o elemento da grade dentro do gráfico de 
               waffle usando o método `querySelector`,
               que permite selecionar o primeiro elemento que 
               corresponde ao seletor CSS especificado.
       Aqui, seleciona a parte da grade onde os quadrados 
               serão preenchidos. */

    var percentual = document.querySelector('.grafico-waffle .percentual');
    /* Similarmente, acessa o elemento que exibe o percentual 
               dentro do gráfico de waffle.
       Este elemento mostra o percentual calculado de vendas 
               em relação à meta. */

    // Limpar a grade
    grade.innerHTML = '';
    /* Limpa o conteúdo HTML interno da grade, removendo 
               quaisquer elementos <div> existentes.
       Isso é necessário para garantir que a grade seja reiniciada 
               cada vez que a função é chamada,
               permitindo uma nova visualização dos dados sem 
               sobreposição de elementos antigos. */

    // Calcular o número de quadrados preenchidos
    var quadradosPreenchidos = Math.round((valor / 100) * 100);
    /* Calcula o número de quadrados que devem ser preenchidos 
               na grade, baseando-se no valor de desempenho
               passado para a função. O resultado é arredondado 
               para o inteiro mais próximo para garantir que
               apenas quadrados completos sejam exibidos. */

    for (var i = 0; i < 100; i++) {
        
        var quadrado = document.createElement('div');
        /* Dentro de um loop que itera 100 vezes, cria um novo 
                  elemento <div> a cada iteração.
           Cada <div> representa um quadrado na grade do 
                  gráfico de waffle. */

        if (i < quadradosPreenchidos) {

            quadrado.classList.add('preenchido');
            /* Se o índice atual é menor que o número de quadrados 
                     preenchidos, adiciona a classe 'preenchido'
                     ao quadrado. Isso muda a cor do quadrado para 
                     visualizar o percentual de vendas, conforme 
                     definido no CSS. */

        }

        // Inserir os quadrados de baixo para cima
        grade.prepend(quadrado);
        /* Usa o método `prepend` para adicionar cada 
                     novo quadrado ao início da grade.
           Isso resulta nos quadrados sendo adicionados de 
                     baixo para cima, preenchendo primeiro os 
                     quadrados inferiores. */

    }

    // Atualizar o percentual exibido
    percentual.innerText = Math.round(valor) + '%';
    /* Atualiza o texto dentro do elemento de percentual 
               para mostrar o valor arredondado do desempenho,
               seguido pelo símbolo de percentagem. Isso fornece 
               um feedback visual claro sobre o desempenho
               relativo à meta para o produto selecionado. */

}