document.addEventListener('DOMContentLoaded', function() {
    // Adiciona um ouvinte de evento ao documento que 
            // espera até que todo o conteúdo do DOM (HTML) 
            // seja carregado e esteja pronto.
    
    fetch('Estados.xlsx')
    // Faz uma requisição para buscar o arquivo 'Estados.xlsx' 
            // do servidor.
    
        .then(response => response.arrayBuffer())
        // Quando a resposta da requisição é recebida, converte o 
                // corpo da resposta para um ArrayBuffer,
                // que é uma forma de representar dados 
                // binários em JavaScript.
        
        .then(data => {
            // Após os dados serem convertidos para ArrayBuffer, 
                    // esta função é executada.
            
            var workbook = XLSX.read(data, { type: 'array' });
            // Usa a biblioteca XLSX para ler os dados 
                    // binários como um arquivo Excel.
            // 'type: 'array'' indica que os dados de 
                    // entrada são um ArrayBuffer.
            
            var primeiraSheet = workbook.Sheets['Dados'];
            // Obtém a primeira planilha do workbook (arquivo Excel) 
                    // pelo nome 'Dados'.
            
            var dadosJSON = XLSX.utils.sheet_to_json(primeiraSheet);
            // Converte os dados da planilha Excel para um 
                    // formato JSON (JavaScript Object Notation),
                    // onde cada linha da planilha é representada 
                    // como um objeto.
            
            carregarDados(dadosJSON);
            // Chama a função 'carregarDados' passando os dados 
                    // convertidos para adicionar os dados à 
                    // tabela HTML.

        })
        
        .catch(error => console.error('Erro ao carregar os dados:', error));
        // Captura qualquer erro que ocorra durante o 
                // processo de requisição ou leitura do 
                // arquivo Excel e imprime uma mensagem 
                // de erro no console.

});


function carregarDados(dados) {
    // Função que carrega os dados fornecidos na tabela HTML.

    var tabela = document.getElementById("tabelaPopulacao").getElementsByTagName('tbody')[0];
    // Seleciona o elemento <tbody> da tabela 
            // com o ID 'tabelaPopulacao'.
    // Isso é onde as novas linhas de dados 
            // serão adicionadas.

    var estados = {};
    // Cria um objeto vazio que será usado para 
            // organizar os dados por estado.

    // Organiza os dados por estado
    dados.forEach(dado => {
        // Itera sobre cada item (linha) nos dados fornecidos.

        if (!estados[dado.Estado]) {
            // Verifica se o estado atual (dado.Estado) ainda 
                    // não está presente no objeto 'estados'.

            estados[dado.Estado] = {
                totalHabitantes: 0,
                cidades: []
            };
            // Se o estado não estiver presente, adiciona-o 
                    // ao objeto 'estados' com um objeto que contém
                    // a chave 'totalHabitantes' iniciada em 0 e 
                    // uma chave 'cidades' com um array vazio.

        }


        // Substitui pontos por nada e vírgulas por nada, 
                // depois converte para inteiro
        var totalHabitantesStr = dado['Total de Habitantes'].toString().replace(/\./g, '').replace(/,/g, '');
        // Acessa o valor da chave 'Total de Habitantes' no objeto 'dado'.
        // Converte esse valor para uma string para realizar substituições.
        // Usa o método 'replace' para remover todos os pontos (.) e vírgulas (,),
        // transformando a string em um formato adequado para conversão numérica.

        var totalHabitantes = parseInt(totalHabitantesStr, 10);
        // Converte a string 'totalHabitantesStr' em um número 
                // inteiro usando 'parseInt'.
        // O segundo parâmetro, 10, especifica que a base usada 
                // para a conversão é decimal.

        if (!isNaN(totalHabitantes)) {
            // Verifica se 'totalHabitantes' é um número 
                    // válido (não é NaN - Not-a-Number).

            estados[dado.Estado].totalHabitantes += totalHabitantes;
            // Adiciona 'totalHabitantes' ao total de 
                    // habitantes acumulado para o estado atual.

        }

        estados[dado.Estado].cidades.push(dado);
        // Adiciona o objeto 'dado' ao array 'cidades' 
                // do estado atual.
        // Isso armazena cada cidade e seus dados associados 
                // sob o estado correspondente.

    });

    // Adiciona os dados na tabela
    Object.keys(estados).forEach(estado => {
        // Itera sobre cada chave (nome do estado) no 
                // objeto 'estados'.
        // 'Object.keys(estados)' retorna um array com 
                // todos os nomes dos estados.

            var linhaEstado = document.createElement("tr");
            // Cria um novo elemento de linha de tabela <tr> 
                    // para representar um estado.

            linhaEstado.innerHTML = `
                <td class="expand-button" onclick="toggleEstado(this)">
                    ${estado} +
                </td>
                <td></td>
                <td>${estados[estado].totalHabitantes.toLocaleString('pt-BR')}</td>
            `;
            // Define o conteúdo HTML da linha de tabela.
            // A primeira célula <td> contém o nome do 
                    // estado e um botão expansível (+) com um 
                    // evento de clique que chama a função 'toggleEstado'.
            // A segunda célula <td> está vazia, reservada 
                    // para o layout.
            // A terceira célula <td> contém o total de 
                    // habitantes do estado, formatado para o 
                    // padrão brasileiro (pt-BR) com separadores de milhar.

            tabela.appendChild(linhaEstado);
            // Adiciona a linha de estado criada ao 
                    // corpo da tabela (<tbody>).


            estados[estado].cidades.forEach(cidade => {
            // Itera sobre cada cidade no array 'cidades' 
                    // do estado atual.
            
            var totalHabitantesStr = cidade['Total de Habitantes'].toString().replace(/\./g, '').replace(/,/g, '');
            // Acessa o valor da chave 'Total de Habitantes' 
                    // no objeto 'cidade'.
            // Converte esse valor para uma string para 
                    // realizar substituições.
            // Usa o método 'replace' para remover todos os 
                    // pontos (.) e vírgulas (,), transformando a 
                    // string em um formato adequado para 
                    // conversão numérica.
            
            var totalHabitantes = parseInt(totalHabitantesStr, 10);
            // Converte a string 'totalHabitantesStr' em um 
                    // número inteiro usando 'parseInt'.
            // O segundo parâmetro, 10, especifica que a base 
                    // usada para a conversão é decimal.
            
            var linhaCidade = document.createElement("tr");
            // Cria um novo elemento de linha de tabela <tr> 
                    // para representar uma cidade.
            
            linhaCidade.classList.add("hidden");
            // Adiciona a classe 'hidden' à linha da cidade, 
                    // fazendo com que ela esteja oculta por padrão.
            
            linhaCidade.innerHTML = `
                <td></td>
                <td>${cidade.Cidade}</td>
                <td>${!isNaN(totalHabitantes) ? totalHabitantes.toLocaleString('pt-BR') : 'N/A'}</td>
            `;
            // Define o conteúdo HTML da linha de tabela.
            // A primeira célula <td> está vazia, reservada 
                    // para o layout.
            // A segunda célula <td> contém o nome da cidade.
            // A terceira célula <td> contém o total de 
                    // habitantes da cidade, formatado para o 
                    // padrão brasileiro (pt-BR) com separadores de milhar.
            // Se 'totalHabitantes' não for um número 
                    // válido (NaN), exibe 'N/A'.
            
            tabela.appendChild(linhaCidade);
            // Adiciona a linha da cidade criada ao 
                    // corpo da tabela (<tbody>).

        });

    });
}

function toggleEstado(element) {
    // Função que alterna a visibilidade das linhas das 
            // cidades associadas a um estado quando o botão 
            // de expandir/colapsar é clicado.

    var linhas = element.parentElement.nextElementSibling;
    // Seleciona a próxima linha da tabela após a linha do 
            // estado atual. 'element.parentElement' é a 
            // linha <tr> que contém o estado,
            // e 'nextElementSibling' seleciona a linha seguinte.

    while (linhas && !linhas.classList.contains("expand-button") && linhas.firstElementChild.textContent === "") {
        // Continua iterando enquanto 'linhas' não for nulo, a 
                // linha não tiver a classe 'expand-button' e a 
                // primeira célula da linha estiver vazia.
        // Isso garante que apenas as linhas das cidades 
                // associadas ao estado atual serão processadas.

        linhas.classList.toggle("hidden");
        // Alterna a classe 'hidden' na linha atual. Se a 
                // linha estiver oculta, ela será mostrada; se 
                // estiver visível, será oculta.

        linhas = linhas.nextElementSibling;
        // Move para a próxima linha da tabela.

    }

    element.innerHTML = element.innerHTML.includes("+") ? element.innerHTML.replace("+", "-") : element.innerHTML.replace("-", "+");
    // Alterna o texto do botão de expandir/colapsar. Se o 
            // texto atual incluir "+", substitui por "-"; caso 
            // contrário, substitui "-" por "+".
    // Isso visualmente indica ao usuário se as linhas das 
            // cidades estão expandidas ou colapsadas.
            
}