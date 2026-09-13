// Aguarda até que todo o documento HTML seja carregado antes
//          de executar o código
document.addEventListener('DOMContentLoaded', () => { 

    // Verifica se existe um elemento com o ID 'formularioCadastro', 
    //      indicando que o usuário está na página de cadastro ou edição
    if (document.getElementById('formularioCadastro')) { 

        // Se o formulário de cadastro existir, chama a função 
        //      prepararFormulario() para preencher os campos 
        //      caso seja uma edição
        prepararFormulario(); 

    } else { 

        // Se o formulário de cadastro não existir, significa que 
        //      estamos na página principal, então chama a função 
        //      carregarUsuarios() para exibir os usuários na tabela
        carregarUsuarios(); 
    }

    // Verifica se existe um campo de filtro com o ID 'campoFiltro', 
    //      que permite ao usuário pesquisar usuários pelo nome ou email
    if (document.getElementById('campoFiltro')) { 

        // Adiciona um evento de 'input' ao campo de filtro para 
        //      executar a função carregarUsuarios() sempre que o 
        //      usuário digitar algo no campo de busca
        document.getElementById('campoFiltro').addEventListener('input', () => { 

            // Chama a função carregarUsuarios() para atualizar a lista de 
            //      usuários filtrando pelos caracteres digitados
            carregarUsuarios(); 

        }); 
    } 
});


/* Função para carregar os usuários e aplicar o filtro */
// Declara a função assíncrona carregarUsuarios(), que busca e
//      exibe os usuários na tabela
async function carregarUsuarios() { 

    // Obtém o valor digitado no campo de filtro, se existir; caso 
    //      contrário, define uma string vazia
    const filtro = document.getElementById('campoFiltro') ? document.getElementById('campoFiltro').value.toLowerCase() : ''; 

    // Faz uma requisição para obter a lista de usuários do servidor 
    //      rodando em localhost na porta 3000
    const resposta = await fetch('http://localhost:3000/usuarios'); 

    // Converte a resposta da requisição para formato JSON e 
    //      armazena os dados na variável usuarios
    const usuarios = await resposta.json(); 

    // Seleciona o elemento da tabela que contém os usuários, 
    //      usando o ID 'tabelaUsuarios'
    const tabela = document.getElementById('tabelaUsuarios'); 

    // Limpa o conteúdo da tabela antes de adicionar novos usuários, 
    //      evitando duplicações ao recarregar os dados
    tabela.innerHTML = ''; 

    // Filtra os usuários, verificando se o nome ou email contém o texto 
    //      digitado no campo de filtro (ignorando maiúsculas e minúsculas)
    usuarios

        .filter(usuario => 

            // Converte o nome do usuário para minúsculas e verifica se 
            //      contém o valor digitado no filtro
            usuario.nome.toLowerCase().includes(filtro) || 

            // Converte o email do usuário para minúsculas e verifica se
            //      contém o valor digitado no filtro
            usuario.email.toLowerCase().includes(filtro)

        )

        // Percorre a lista de usuários filtrados e cria uma 
        //      linha na tabela para cada um.
        .forEach(usuario => { 

            // Cria um novo elemento <tr> (linha da tabela) para 
            //      exibir os dados do usuário
            const linha = document.createElement('tr'); 

            // Define o conteúdo HTML da linha, preenchendo os dados do 
            //      usuário dentro das células da tabela
            linha.innerHTML = `
                <td>${usuario.nome}</td> <!-- Exibe o nome do usuário -->
                <td>${usuario.email}</td> <!-- Exibe o email do usuário -->
                <td>${usuario.idade} anos</td> <!-- Exibe a idade do usuário com a palavra 'anos' ao lado -->
                <td class="acoes"> <!-- Coluna de ações (Editar e Excluir) -->

                    <!-- Botão para editar o usuário, chama a função editarUsuario passando o ID do usuário -->
                    <button class="editar" onclick="editarUsuario('${usuario._id}')">Editar</button> 

                    <!-- Botão para excluir o usuário, chama a função excluirUsuario passando o ID do usuário -->
                    <button class="excluir" onclick="excluirUsuario('${usuario._id}')">Excluir</button> 

                </td>
            `; 

            // Adiciona a nova linha criada dentro da tabela de usuários
            tabela.appendChild(linha); 

        });

}

/* Função para redirecionar para a página de edição do usuário */

// Declara uma função assíncrona chamada editarUsuario, que 
//      recebe como parâmetro o ID do usuário a ser editado
async function editarUsuario(idUsuario) { 

    // Redireciona o usuário para a página de cadastro, 
    //      passando o ID do usuário na URL como parâmetro
    // Isso permitirá que a página 'cadastro.html' identifique 
    //      que é uma edição e carregue os dados do usuário correspondente
    window.location.href = `cadastro.html?id=${idUsuario}`; 

}


/* Função para excluir o usuário */
// Declara uma função assíncrona chamada excluirUsuario, que 
//      recebe como parâmetro o ID do usuário a ser excluído
async function excluirUsuario(idUsuario) { 

    // Exibe uma caixa de confirmação para o usuário, perguntando se    
    //      ele deseja realmente excluir o usuário
    if (confirm('Tem certeza que deseja excluir este usuário?')) { 
    
        // Se o usuário confirmar, faz uma requisição HTTP DELETE 
        //      para remover o usuário do servidor
        await fetch(`http://localhost:3000/usuarios/${idUsuario}`, { method: 'DELETE' }); 

        // Exibe um alerta informando que o usuário foi removido com sucesso
        alert('Usuário removido com sucesso!'); 

        // Recarrega a lista de usuários na tabela para 
        //      atualizar a exibição após a exclusão
        carregarUsuarios(); 

    } 
}


/* Função para preparar o formulário de cadastro/edição */
// Declara uma função assíncrona chamada prepararFormulario, que 
//      verifica se o usuário está editando um cadastro e preenche os 
//      dados do formulário caso seja necessário
async function prepararFormulario() { 

    // Cria um objeto URLSearchParams para obter os parâmetros 
    //      da URL (neste caso, o ID do usuário)
    const parametrosURL = new URLSearchParams(window.location.search); 

    // Obtém o valor do parâmetro 'id' da URL, se existir, o que 
    //      indica que um usuário está sendo editado
    const idUsuario = parametrosURL.get('id'); 

    // Verifica se há um ID de usuário na URL, indicando 
    //      que estamos no modo de edição
    if (idUsuario) { 
    
        // Altera o texto do título da página para "Editar Usuário" ao 
        //      invés de "Cadastrar Usuário"
        document.getElementById('tituloPagina').textContent = 'Editar Usuário'; 

        // Faz uma requisição ao servidor para obter a lista 
        //      completa de usuários cadastrados
        const resposta = await fetch('http://localhost:3000/usuarios'); 

        // Converte a resposta do servidor para um objeto JSON e 
        //      armazena na variável listaUsuarios
        const listaUsuarios = await resposta.json(); 

        // Procura na lista de usuários aquele que tem o 
        //      mesmo ID que foi passado na URL
        const usuarioEncontrado = listaUsuarios.find(u => u._id === idUsuario); 

        // Se um usuário com o ID correspondente for encontrado, 
        //      preenche os campos do formulário com os dados dele
        if (usuarioEncontrado) { 
    
            // Define o campo oculto de ID do usuário com o valor do ID encontrado
            document.getElementById('idUsuario').value = usuarioEncontrado._id; 

            // Preenche o campo de nome com o nome do usuário encontrado
            document.getElementById('nome').value = usuarioEncontrado.nome; 

            // Preenche o campo de email com o email do usuário encontrado
            document.getElementById('email').value = usuarioEncontrado.email; 

            // Preenche o campo de idade com a idade do usuário encontrado
            document.getElementById('idade').value = usuarioEncontrado.idade; 
    
        }
    } 

    // Seleciona o formulário pelo ID 'formularioCadastro' e adiciona um
    //      evento para capturar o envio do formulário
    document.getElementById('formularioCadastro').addEventListener('submit', async (evento) => { 
        
        // Impede o comportamento padrão do formulário (recarregar a 
        //      página ao enviar), permitindo que o envio seja tratado via JavaScript
        evento.preventDefault(); 

        // Obtém o valor do campo oculto 'idUsuario', que indica se o 
        //      usuário está sendo editado (se tiver um valor) ou se é 
        //      um novo cadastro (se estiver vazio)
        const idUsuarioCampo = document.getElementById('idUsuario').value; 

        // Obtém o valor digitado no campo de nome do usuário
        const nomeUsuario = document.getElementById('nome').value; 

        // Obtém o valor digitado no campo de email do usuário
        const emailUsuario = document.getElementById('email').value; 

        // Obtém o valor digitado no campo de idade do usuário
        const idadeUsuario = document.getElementById('idade').value; 

        // Verifica se o campo 'idUsuarioCampo' possui um valor. 
        // Se tiver um valor, significa que o usuário já existe e deve ser atualizado. 
        // Se estiver vazio, significa que estamos cadastrando um novo usuário.
        if (idUsuarioCampo) { 

            // Envia uma requisição HTTP para atualizar os dados do 
            //      usuário no servidor.
            // A função `fetch()` é usada para se comunicar com o 
            //      backend e modificar os dados no banco de dados.
            await fetch(`http://localhost:3000/usuarios/${idUsuarioCampo}`, { 
                
                // Define o método da requisição como 'PUT', que é utilizado 
                //      para atualizar um registro existente no banco de dados.
                method: 'PUT', 
                
                // Define o cabeçalho da requisição para indicar que os 
                //      dados estão no formato JSON.
                headers: { 'Content-Type': 'application/json' }, 
                
                // Converte os dados do usuário em um formato JSON antes de 
                //      enviá-los ao servidor.
                // O `JSON.stringify()` transforma o objeto `{ nome, email, idade }` 
                //      em uma string JSON, que pode ser interpretada pelo backend.
                body: JSON.stringify({ nome: nomeUsuario, email: emailUsuario, idade: idadeUsuario }) 

            });

            // Exibe uma mensagem na tela informando que os dados do 
            //      usuário foram atualizados com sucesso.
            alert('Usuário atualizado com sucesso!'); 

        // Se 'idUsuarioCampo' estiver vazio, significa que um 
        //      novo usuário será cadastrado.
        } else { 

            // Envia uma requisição HTTP para cadastrar um novo usuário no banco de dados.
            // A função `fetch()` é usada novamente para comunicar-se com o servidor.
            await fetch('http://localhost:3000/usuarios', { 
                
                // Define o método da requisição como 'POST', que é utilizado 
                //      para criar novos registros no banco de dados.
                method: 'POST', 
                
                // Define o cabeçalho da requisição para indicar que os 
                //      dados enviados estão no formato JSON.
                headers: { 'Content-Type': 'application/json' }, 
                
                // Converte os dados do novo usuário em JSON antes de 
                //      enviá-los ao servidor.
                body: JSON.stringify({ nome: nomeUsuario, email: emailUsuario, idade: idadeUsuario }) 

            });

            // Exibe uma mensagem na tela informando que o novo 
            //      usuário foi cadastrado com sucesso.
            alert('Usuário cadastrado com sucesso!'); 

        }

        // Após a atualização ou o cadastro do usuário, redireciona o 
        //      usuário de volta para a página principal (index.html).
        // Isso garante que a lista de usuários seja recarregada e 
        //      atualizada automaticamente.
        window.location.href = 'index.html'; 

    });
    
}