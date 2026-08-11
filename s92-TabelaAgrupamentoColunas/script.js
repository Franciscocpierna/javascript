let expandido = false;
// Declara uma variável 'expandido' inicialmente definida 
        // como false, usada para rastrear o estado de 
        // visibilidade das colunas ocultas na tabela.

document.addEventListener('DOMContentLoaded', function() {
    // Registra um evento que será executado quando o documento HTML 
            // completo for carregado e o DOM estiver totalmente construído.

    fetch('tabela_exemplo.xlsx')
    // Inicia uma requisição para buscar o arquivo 'tabela_exemplo.xlsx', 
            // que contém os dados a serem carregados na tabela.

        .then(response => response.arrayBuffer())
        // Recebe a resposta da requisição como um 'response' objeto e 
                // converte essa resposta para um ArrayBuffer, que é necessário 
                // para manipulação de arquivos binários como Excel.

        .then(data => {
            // Recebe os dados binários do arquivo Excel já convertidos 
                    // para ArrayBuffer.

            const workbook = XLSX.read(data, {type: 'array'});
            // Utiliza a biblioteca XLSX para ler os dados do arquivo Excel a 
                    // partir do ArrayBuffer, convertendo-o em um objeto 'workbook' 
                    // que permite acessar as planilhas.

            const nomePlanilha = workbook.SheetNames[0];
            // Acessa o nome da primeira planilha dentro do arquivo Excel 
                    // armazenado na propriedade SheetNames do 'workbook'.

            const planilha = workbook.Sheets[nomePlanilha];
            // Acessa os dados da planilha usando o nome obtido anteriormente, 
                    // que permite manipular os dados contidos nessa 
                    // planilha específica.

            const dadosJson = XLSX.utils.sheet_to_json(planilha);
            // Converte os dados da planilha do Excel em um formato JSON, 
                    // facilitando a manipulação e inserção desses 
                    // dados na tabela HTML.

            preencherTabela(dadosJson);
            // Chama a função 'preencherTabela' passando os dados em 
                    // formato JSON para que sejam criadas as linhas e 
                    // células correspondentes na tabela HTML.

        });
});

function preencherTabela(dados) {
    // Define a função 'preencherTabela' que aceita 'dados' como argumento. 
    // Esta função é responsável por inserir os dados recebidos em uma tabela HTML.

    const corpoTabela = document.getElementById('corpo-tabela');
    // Acessa o elemento <tbody> da tabela pelo seu ID 'corpo-tabela', 
            // permitindo manipular diretamente o corpo da tabela.

    // Limpa o conteúdo existente no corpo da tabela, preparando-o 
            // para receber novos dados.
    corpoTabela.innerHTML = ''; 

    dados.forEach(linha => {
        // Itera sobre cada 'linha' nos 'dados' recebidos. Cada 'linha' é 
                // um objeto representando uma linha da tabela a ser criada.

        const tr = document.createElement('tr');
        // Cria um novo elemento <tr>, que representa uma 
                // linha da tabela.

        const tdNome = document.createElement('td');
        // Cria um novo elemento <td>, que representa uma 
                // célula na linha da tabela.

        tdNome.textContent = linha.Nome;
        // Define o conteúdo de texto da célula 'tdNome' para o 
                // valor da propriedade 'Nome' da 'linha'.

        tr.appendChild(tdNome);
        // Anexa a célula 'tdNome' à linha 'tr'.

        const tdIdade = document.createElement('td');
        // Cria outra célula <td> para a propriedade 'Idade'.

        tdIdade.textContent = linha.Idade;
        // Define o conteúdo de texto da célula 'tdIdade' para o 
                // valor da propriedade 'Idade' da 'linha'.

        tdIdade.classList.add('coluna-oculta');
        // Adiciona a classe 'coluna-oculta' à célula 'tdIdade', 
                // fazendo com que inicialmente esta coluna fique oculta.

        tr.appendChild(tdIdade);
        // Anexa a célula 'tdIdade' à linha 'tr'.

        const tdCidade = document.createElement('td');
        // Cria outra célula <td> para a propriedade 'Cidade'.

        tdCidade.textContent = linha.Cidade;
        // Define o conteúdo de texto da célula 'tdCidade' para o 
                // valor da propriedade 'Cidade' da 'linha'.

        tdCidade.classList.add('coluna-oculta');
        // Adiciona a classe 'coluna-oculta' à célula 'tdCidade', 
                // fazendo com que esta coluna também fique oculta.

        tr.appendChild(tdCidade);
        // Anexa a célula 'tdCidade' à linha 'tr'.

        const tdProfissao = document.createElement('td');
        // Cria outra célula <td> para a propriedade 'Profissão'.

        tdProfissao.textContent = linha.Profissão;
        // Define o conteúdo de texto da célula 'tdProfissao' para o 
                // valor da propriedade 'Profissão' da 'linha'.

        tdProfissao.classList.add('coluna-oculta');
        // Adiciona a classe 'coluna-oculta' à célula 'tdProfissao', 
                // mantendo esta coluna oculta inicialmente.

        tr.appendChild(tdProfissao);
        // Anexa a célula 'tdProfissao' à linha 'tr'.

        const tdSalario = document.createElement('td');
        // Cria uma célula <td> para a propriedade 'Salário'.

        tdSalario.textContent = formatarSalario(linha.Salário);
        // Define o conteúdo de texto da célula 'tdSalario' para o 
                // valor da propriedade 'Salário' da 'linha', 
                // formatado como moeda.

        tr.appendChild(tdSalario);
        // Anexa a célula 'tdSalario' à linha 'tr'.

        corpoTabela.appendChild(tr);
        // Finalmente, anexa a linha completa 'tr' ao corpo 
                // da tabela 'corpoTabela'.

    });
}


function formatarSalario(valor) {
    // Define a função 'formatarSalario', que recebe um parâmetro 'valor'. 
    // Esta função é responsável por formatar valores numéricos como 
            // valores monetários, de acordo com as configurações regionais.

    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    // Retorna o 'valor' convertido para uma string formatada de acordo 
            // com as normas de moeda do Brasil ('pt-BR'). O objeto de
            //  opções { style: 'currency', currency: 'BRL' } especifica que o 
            // número deve ser formatado como uma quantia em moeda, 
            // especificamente em Real Brasileiro ('BRL'). 
    // O método 'toLocaleString' é usado para garantir que o formato de 
            // número, incluindo separadores de milhar e decimais, esteja 
            // correto e localizado.

}

function alternarColunas() {
    // Define a função 'alternarColunas', que é chamada quando o 
            // usuário clica no botão de alternância (toggle).

    const colunasOcultas = document.querySelectorAll('.coluna-oculta');
    // Seleciona todos os elementos com a classe 'coluna-oculta'. 
            // Esses elementos representam as colunas que podem ser 
            // ocultadas ou mostradas.

    const botaoToggle = document.getElementById('toggle');
    // Obtém o elemento do botão de alternância pelo seu ID 'toggle'. 
    // Este botão é usado para controlar a visibilidade 
            // das colunas ocultas.

    colunasOcultas.forEach(coluna => {
        // Itera sobre cada elemento (coluna) que foi 
                // selecionado como ocultável.

        coluna.style.display = expandido ? 'none' : 'table-cell';
        // Define a propriedade CSS 'display' para cada coluna. 
        // Se a variável 'expandido' for verdadeira, as colunas são 
                // ocultadas (display 'none'). Se for falsa, as colunas 
                // são mostradas (display 'table-cell').

    });

    botaoToggle.textContent = expandido ? '+' : '-';
    // Altera o texto do botão de alternância. Se as colunas 
            // estiverem atualmente expandidas (mostradas), o botão 
            // mostrará '+', indicando que um clique ocultará as colunas. 
    // Se estiverem ocultas, mostrará '-', indicando que um clique as mostrará.

    expandido = !expandido;
    // Inverte o valor da variável 'expandido'. Se verdadeiro, torna-se 
            // falso, e vice-versa. Isso muda o estado de visibilidade das 
            // colunas para a próxima vez que o botão for clicado.

}