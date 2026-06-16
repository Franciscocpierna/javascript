// script.js
/* Este comentário indica que o código a seguir está contido 
    dentro de um arquivo chamado script.js, que é um arquivo 
    JavaScript externo usado para adicionar interatividade à página web. */

document.addEventListener('DOMContentLoaded', function() {
        /* Este ouvinte de eventos é acionado quando todo o conteúdo da 
                página (DOM) foi completamente carregado.
           Isso garante que nenhum script seja executado até que todos os 
                elementos da página estejam disponíveis para manipulação. */
      
        renderizarContatos();
        /* Chama a função `renderizarContatos()` assim que a página é 
                carregada. Esta função é responsável por 
                exibir os contatos armazenados no navegador do usuário na página. */
      
});

function salvarContatos(contatos) {
    /* Define a função `salvarContatos`, que é responsável por 
            armazenar a lista de contatos no armazenamento local do navegador. */
  
    localStorage.setItem('contatos', JSON.stringify(contatos));
    /* `localStorage.setItem('contatos', ...)`: Armazena ou atualiza o 
            item 'contatos' no armazenamento local.
       `JSON.stringify(contatos)`: Converte o array de contatos (ou objeto) em 
            uma string JSON antes de armazená-lo.
       Este método garante que qualquer lista de contatos fornecida seja 
            armazenada de forma persistente no navegador do usuário, permitindo 
            recuperá-la entre sessões do navegador. */
  
  }


function obterContatos() {
    /* Define a função `obterContatos`, que é responsável por 
            recuperar os contatos armazenados no armazenamento local do navegador. */
  
    return JSON.parse(localStorage.getItem('contatos') || '[]');
    /* `localStorage.getItem('contatos')`: Tenta recuperar o item 'contatos' do 
            armazenamento local, que contém os dados dos contatos em 
            forma de string JSON.
       `'[]'`: Se não houver nenhum contato armazenado, retorna 
            uma string de array vazio.
       `JSON.parse(...)`: Converte a string JSON recuperada (ou a 
            string de array vazio) de volta para um objeto JavaScript (neste caso, um array).
       Esta função retorna um array de contatos ou um array vazio 
            se nenhum contato estiver armazenado. */
  }
  
  
    
function adicionarContato() {
      /* Define a função `adicionarContato`, que é responsável 
            por criar um novo contato e adicionar esse contato 
            ao armazenamento local. */
  
      const nome = document.getElementById('nome').value;
      /* Acessa o elemento input com o id 'nome' e recupera o 
            valor atual (o que o usuário digitou). 
         Este valor é armazenado na constante 'nome'. */
  
      const email = document.getElementById('email').value;
      /* Acessa o elemento input com o id 'email' e recupera o valor atual. 
         Este valor é armazenado na constante 'email'. */
  
      const telefone = document.getElementById('telefone').value;
      /* Acessa o elemento input com o id 'telefone' e recupera o valor atual. 
         Este valor é armazenado na constante 'telefone'. */
  
      const novoContato = { id: Date.now(), nome, email, telefone };
      /* Cria um objeto `novoContato` que contém um identificador 
            único (id), que é o timestamp atual (Date.now()),
            e as propriedades 'nome', 'email', e 'telefone' coletadas dos inputs. 
            Usar Date.now() como ID garante que cada contato terá um identificador único. */
  
      const contatos = obterContatos();
      /* Chama a função `obterContatos` que recupera a lista atual de 
            contatos do armazenamento local, 
            retornando-a como um array de objetos. */
  
      contatos.push(novoContato);
      /* Adiciona o `novoContato` ao final do array de contatos recuperado. */
  
      salvarContatos(contatos);
      /* Chama a função `salvarContatos`, passando o array de contatos 
            atualizado (agora incluindo o novo contato).
         Esta função converte o array em uma string JSON e o salva de 
            volta ao armazenamento local. */
  
      renderizarContatos();
      /* Chama a função `renderizarContatos` que atualiza a 
            interface do usuário para mostrar todos os contatos,
            incluindo o recém-adicionado. Esta função lida com a exibição de 
            contatos na página. */
  
      limparCampos();
      /* Chama a função `limparCampos`, que limpa todos os 
            campos de entrada (nome, email, telefone),
         resetando-os para um estado vazio. Isso prepara a interface para a 
            adição de um novo contato sem necessidade de limpar manualmente os 
            campos após cada adição. */
  }
  
    
  function limparCampos() {
    /* Define a função `limparCampos`, que é usada para redefinir os 
          campos de entrada de texto no formulário para o estado vazio, 
          preparando-os para novas entradas após a inserção ou durante a 
          reinicialização do formulário. */
  
    document.getElementById('nome').value = '';
    /* Acessa o campo de entrada com o ID 'nome' no documento HTML.
       `.value = ''`: Define o valor desse campo para uma string vazia.
       Isso efetivamente limpa qualquer texto que o usuário possa ter 
          digitado no campo 'nome'. */
  
    document.getElementById('email').value = '';
    /* Acessa o campo de entrada com o ID 'email'.
       `.value = ''`: Define o valor deste campo para uma string vazia.
       Limpa qualquer texto que tenha sido inserido no campo 'email', removendo 
          qualquer endereço de e-mail que estava presente. */
  
    document.getElementById('telefone').value = '';
    /* Acessa o campo de entrada com o ID 'telefone'.
       `.value = ''`: Define o valor deste campo para uma string vazia.
       Remove qualquer número que o usuário tenha inserido no campo 'telefone'. */
  
  }
  

function renderizarContatos(contatos = obterContatos()) {
    /* Define a função `renderizarContatos` com um parâmetro padrão.
      `contatos = obterContatos()`: Se nenhum argumento for passado para a 
          função, ela chamará `obterContatos()` para obter uma lista de 
          contatos do armazenamento local.
      Isso assegura que sempre haverá dados para renderizar quando a 
          função for chamada, mesmo sem argumentos explícitos. */

    const tbody = document.getElementById('tabelaContatos').getElementsByTagName('tbody')[0];
    /* Acessa o primeiro elemento <tbody> dentro do elemento <table> 
          com o ID 'tabelaContatos'.
      Este <tbody> será usado para inserir as linhas de contatos. */

    tbody.innerHTML = '';
    /* Limpa o conteúdo atual de <tbody>, removendo quaisquer 
          linhas ou células existentes.
      Isso é importante para garantir que os contatos não sejam duplicados 
          na tabela quando a função for chamada novamente. */

    contatos.forEach(function(contato) {
      /* Itera sobre cada contato no array `contatos`.
        `contato` representa um único objeto de contato durante 
          cada iteração do loop. */

      const tr = document.createElement('tr');
      /* Cria um novo elemento <tr> (linha da tabela) para cada contato. */

      tr.innerHTML = `<td>${contato.nome}</td>
                      <td>${contato.email}</td>
                      <td>${contato.telefone}</td>
                      <td>
                        <button onclick="editarContato(${contato.id})">Alterar</button>
                        <button onclick="excluirContato(${contato.id})">Excluir</button>
                      </td>`;
      /* Define o conteúdo interno do <tr> usando template literals 
            para inserir dados do contato em células <td>.
        Inclui também dois botões: um para editar e outro para excluir o 
            contato, ambos com eventos `onclick` que chamam funções `editarContato` e 
            `excluirContato`, respectivamente, passando o `id` do contato como argumento.
        Isso permite a interação com cada contato para modificação ou remoção. */

      tbody.appendChild(tr);
      /* Adiciona o elemento <tr> preenchido ao <tbody> da tabela de contatos.
        Isso efetivamente coloca o contato na tabela visível na página web. */
    });

    atualizarTotalContatos(contatos.length);
    /* Chama a função `atualizarTotalContatos`, passando o número 
          total de contatos como argumento.
      Esta função atualiza elemento na interface 
          para mostrar quantos contatos estão atualmente armazenados. */
}


function atualizarTotalContatos(total) {
    /* Define a função `atualizarTotalContatos`, que é responsável por 
          atualizar a interface do usuário com o número atual de contatos.
      O parâmetro `total` é um número que representa a quantidade 
          total de contatos no momento. */

    document.getElementById('totalContatos').textContent = `Total de Contatos: ${total}`;
    /* Acessa o elemento do DOM com o ID 'totalContatos'. Este elemento é 
          destinado a mostrar o número total de contatos.
      `.textContent = ...`: Define o conteúdo de texto do elemento. Usando 
          template literals (`Total de Contatos: ${total}`), o número total de 
          contatos é inserido diretamente no conteúdo de texto do elemento, 
          permitindo uma atualização visual instantânea.
      Essa abordagem garante que os usuários tenham sempre uma visão clara e 
          precisa do número de contatos que foram salvos ou filtrados na aplicação. */

}

function editarContato(id) {
    /* Define a função `editarContato`, que é chamada 
          para editar um contato existente.
      O parâmetro `id` é o identificador único do contato que 
          se deseja editar. */

    const contatos = obterContatos();
    /* Chama a função `obterContatos` para recuperar todos os 
          contatos armazenados no localStorage.
      `contatos` é agora um array de todos os contatos salvos. */

    const contato = contatos.find(c => c.id === id);
    /* Usa o método `find` para procurar no array de contatos um 
          contato cujo `id` corresponda ao `id` fornecido.
      `contato` será o objeto do contato encontrado ou `undefined` se 
          nenhum contato com o `id` especificado for encontrado. */

    if (contato) {
      /* Verifica se um contato foi de fato encontrado com o `id` 
          fornecido. Se `contato` não for `undefined`, executa o 
          bloco de código a seguir. */

      document.getElementById('nome').value = contato.nome;
      /* Acessa o elemento de input com o id 'nome' e define seu 
            valor para o nome do contato encontrado.
        Isso preenche o campo de input com o nome do contato, permitindo ao
             usuário ver e modificar o nome atual. */

      document.getElementById('email').value = contato.email;
      /* Acessa o elemento de input com o id 'email' e define seu 
            valor para o email do contato encontrado.
        Isso preenche o campo de input com o email do contato, 
            facilitando a edição pelo usuário. */

      document.getElementById('telefone').value = contato.telefone;
      /* Acessa o elemento de input com o id 'telefone' e define seu 
            valor para o telefone do contato encontrado.
        Isso preenche o campo de input com o telefone do contato, 
            permitindo ao usuário editar o número atual. */

      excluirContato(id);
      /* Chama a função `excluirContato` passando o `id` do contato.
        Isso remove o contato atual do array de contatos para evitar 
            duplicidades, assumindo que o usuário irá re-salvar o contato 
            com informações atualizadas.
        Essa abordagem pressupõe que o contato será "recriado" como parte 
            de um processo de edição. */

    }
}


function excluirContato(id) {
    /* Define a função `excluirContato` que é responsável por remover 
            um contato específico do armazenamento local.
      O parâmetro `id` é o identificador único do contato que se deseja excluir. */

    let contatos = obterContatos();
    /* Chama a função `obterContatos` para recuperar a lista atual de 
            contatos armazenados no localStorage.
      `contatos` é agora um array contendo todos os contatos salvos. Esta 
            lista será modificada para remover o contato especificado. */

    contatos = contatos.filter(contato => contato.id !== id);
    /* Utiliza o método `filter` para criar um novo array que contém 
            todos os contatos, exceto aquele com o `id` especificado.
      `contato => contato.id !== id` é uma função que retorna `true` 
            para todos os contatos cujo `id` é diferente do `id` 
            fornecido, incluindo-os no novo array.
      Essencialmente, esta linha remove o contato desejado da lista de contatos. */

    salvarContatos(contatos);
    /* Chama a função `salvarContatos`, passando o novo array de 
            contatos (já sem o contato excluído).
      Esta função atualiza a lista de contatos no localStorage 
            para refletir a remoção feita. */

    renderizarContatos();
    /* Chama a função `renderizarContatos` para atualizar a 
            visualização dos contatos na interface do usuário.
      Isso garante que a tabela de contatos na página seja atualizada 
            para mostrar a lista corrente sem o contato que foi excluído. */

}


function filtrarContatos() {
    /* Define a função `filtrarContatos`, que é usada para buscar e 
          filtrar contatos com base em uma entrada de texto fornecida pelo usuário. */

    const filtro = document.getElementById('filtro').value.toLowerCase();
    /* Acessa o campo de entrada com o ID 'filtro' para obter o valor que o 
          usuário digitou como critério de pesquisa.
       O método `.toLowerCase()` é chamado para converter o texto de entrada em 
          letras minúsculas, garantindo que a busca seja insensível a 
          maiúsculas e minúsculas. */

    const contatos = obterContatos();
    /* Chama a função `obterContatos` para recuperar todos os contatos 
          armazenados no localStorage.
       `contatos` é agora um array de todos os contatos salvos. */

    const filtrados = contatos.filter(contato => 
        contato.nome.toLowerCase().includes(filtro) ||
        contato.email.toLowerCase().includes(filtro) ||
        contato.telefone.includes(filtro)
    );
    /* Utiliza o método `filter` para criar um novo array contendo apenas os 
            contatos que correspondem ao critério de busca.
       A função de filtro verifica se alguma das propriedades do contato (nome, 
            email ou telefone) contém o texto inserido no filtro:
       - `contato.nome.toLowerCase().includes(filtro)`: Verifica se o nome do 
            contato contém o texto de filtro, ambos em letras minúsculas.
       - `contato.email.toLowerCase().includes(filtro)`: Verifica se o e-mail do 
            contato contém o texto de filtro, também em letras minúsculas.
       - `contato.telefone.includes(filtro)`: Verifica se o telefone do 
            contato contém o texto de filtro.
       Essa abordagem garante que a busca seja realizada de forma eficaz e 
            eficiente, permitindo que o usuário encontre contatos por qualquer 
            um dos campos mencionados. */

    renderizarContatos(filtrados);
    /* Chama a função `renderizarContatos`, passando o array de 
            contatos filtrados como argumento.
       Isso atualiza a visualização dos contatos na página para mostrar 
            apenas aqueles que correspondem ao critério de busca, permitindo ao 
            usuário ver o resultado da filtragem. */

}
