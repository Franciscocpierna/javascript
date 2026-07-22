document.addEventListener('DOMContentLoaded', function() {
    // Adiciona um ouvinte de evento ao documento que será 
            // executado quando todo o conteúdo do DOM (HTML) 
            // for carregado e estiver pronto.

    var alunos = [
        { nome: 'Ana', notas: [8, 9, 7, 6] },
        { nome: 'Bruno', notas: [5, 4, 6, 7] },
        { nome: 'Carla', notas: [10, 9, 10, 8] },
        { nome: 'Daniel', notas: [2, 3, 4, 5] },
        { nome: 'Eduarda', notas: [7, 6, 5, 6] },
        { nome: 'Felipe', notas: [8, 8, 9, 7] },
        { nome: 'Gustavo', notas: [5, 6, 5, 5] },
        { nome: 'Helena', notas: [10, 10, 10, 10] },
        { nome: 'Igor', notas: [6, 7, 8, 6] },
        { nome: 'Julia', notas: [9, 9, 8, 9] }
    ];
    // Define um array de objetos 'alunos', onde cada objeto 
            // representa um aluno com um nome e um array de notas.

    var tabela = document.getElementById("tabelaAlunos").getElementsByTagName('tbody')[0];
    // Seleciona o elemento <tbody> da tabela com o 
            // ID 'tabelaAlunos'.
    // Isso é onde as novas linhas de dados dos alunos 
            // serão adicionadas.

    function exibirAlunos(alunosFiltrados) {
        // Função que exibe a lista de alunos filtrados na tabela.
    
        tabela.innerHTML = '';
        // Limpa todo o conteúdo do corpo da tabela para 
                // garantir que não haja dados duplicados.
    
        alunosFiltrados.forEach(aluno => {
            // Itera sobre cada aluno na lista de 
                    // alunos filtrados.
    
            var media = aluno.notas.reduce((a, b) => a + b, 0) / aluno.notas.length;
            // Calcula a média das notas do aluno somando todas as 
                    // notas e dividindo pelo número de notas.
            
            var status;
            // Declara uma variável para armazenar o status do 
                    // aluno (Aprovado, Exame, Reprovado).
            
            var statusClass;
            // Declara uma variável para armazenar a classe 
                    // CSS correspondente ao status do aluno.
    
            var icon;
            // Declara uma variável para armazenar o ícone 
                    // correspondente ao status do aluno.
    
            if (media >= 7) {
                // Se a média for maior ou igual a 7, o aluno 
                        // está aprovado.
    
                status = 'Aprovado';
                // Define o status do aluno como 'Aprovado'.
                
                statusClass = 'aprovado';
                // Define a classe CSS do status como 'aprovado', 
                        // que estiliza o texto como verde.
                
                icon = '✔️'; // Ícone de check
                // Define o ícone para um símbolo de check (✔️), 
                        // indicando aprovação.

            } else if (media >= 5) {
                // Se a média for maior ou igual a 5 mas menor 
                        // que 7, o aluno está de exame.
    
                status = 'Exame';
                // Define o status do aluno como 'Exame'.
                
                statusClass = 'exame';
                // Define a classe CSS do status como 'exame', 
                        // que estiliza o texto como laranja.
                
                icon = '⚠️'; // Ícone de aviso
                // Define o ícone para um símbolo de aviso (⚠️), 
                        // indicando exame.

            } else {
                // Se a média for menor que 5, o aluno 
                        // está reprovado.
    
                status = 'Reprovado';
                // Define o status do aluno como 'Reprovado'.
                
                statusClass = 'reprovado';
                // Define a classe CSS do status como 'reprovado', 
                        // que estiliza o texto como vermelho.
                
                icon = '❌'; // Ícone de X
                // Define o ícone para um símbolo de X (❌), 
                        // indicando reprovação.

            }
    

            var linha = document.createElement("tr");
            // Cria um novo elemento de linha de tabela <tr> 
                    // para representar os dados de um aluno.

            linha.innerHTML = `
                <td>${aluno.nome}</td>
                <td>${aluno.notas[0]}</td>
                <td>${aluno.notas[1]}</td>
                <td>${aluno.notas[2]}</td>
                <td>${aluno.notas[3]}</td>
                <td>${media.toFixed(2)}</td>
                <td class="${statusClass}"><span class="icon">${icon}</span> ${status}</td>
                
            `;

            tabela.appendChild(linha);
            // Adiciona a nova linha contendo os dados do aluno 
                    // ao corpo da tabela (<tbody>).

        });
    }

    // Exibe todos os alunos na tabela inicialmente
    exibirAlunos(alunos);

    // Adiciona um ouvinte de evento para o campo de filtro de nome
    document.getElementById('filtroNome').addEventListener('input', function() {

        // Obtém o valor atual do campo de filtro e 
                // converte para minúsculas
        var filtro = this.value.toLowerCase();

        // Filtra a lista de alunos com base no valor do filtro
        // Usa o método filter para criar um novo array 
                // contendo apenas os alunos
        // cujos nomes incluem o texto inserido no campo de filtro
        var alunosFiltrados = alunos.filter(aluno => aluno.nome.toLowerCase().includes(filtro));

        // Exibe os alunos filtrados na tabela
        exibirAlunos(alunosFiltrados);

    });

});